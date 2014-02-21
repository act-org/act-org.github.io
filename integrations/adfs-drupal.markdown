---
layout: default
title: ADFS and Drupal -  Overview
section: integrations/adfs-drupal
---
  
<ul class="pager">
  <li class="previous"><a href="/">&larr; Back</a></li>
</ul>

# ADFS Integration with Drupal 7

ACT is using the [Drupal](https://drupal.org/) content management platform to drive some of its content management activities. The Drupal deployment is hosted at [Pantheon](https://www.getpantheon.com/). As part of the deployment a decision was made to integrate access to this content management server with the ACT [Active Directory](http://en.wikipedia.org/wiki/Active_Directory) service. This provides:	

* Uniform account/credential usage for end users across ACT services
* An ability to centrally disable access to this service 
* Single sign on between this and other enabled services	

---

### ADFS Configuration

In order to integrate ACT's Active Directory with Drupal it was decided that this would be accomplished with [Active Directory Federation Services (ADFS)](http://en.wikipedia.org/wiki/Active_Directory_Federation_Services). 

	"Active Directory Federation Services (AD FS) ... provide users with single sign-on access to systems and applications located across organizational boundaries. It uses a claims-based access control authorization model to maintain application security and implement federated identity.
	
	Claims-based authentication is the process of authenticating a user based on a set of claims about its identity contained in a trusted token. Such a token is often issued and signed by an entity that is able to authenticate the user by other means, and that is trusted by the entity doing the claims-based authentication."	

ACT already had a public facing ADFS that it was using to integrate with other services. Under the ADFS federation service properties ...

![ADFS1](img/adfs1.jpg "Properties")

we can confirm the "federation service identifier" to use for this integration. This will be used on the drupal side to configure the access.

![ADFS2](img/adfs2.jpg "Check info")

Next we needed to add a new "relying party trust" to ADFS. In the ADFS 2.0 Management console this can be done by selecting "Relying Party Trusts" and "add Relaying party Trust" from the top right corner of the window. Using the wizard we had requested the following configuration:

* AD FS 2.0 Profile
* SAML 2.0 WebSSO protocol
* Identifier: urn:drupal:adfs-abg
* Permit all users
* Relying party service URL: https://live-act-abg.gotpantheon.com/simplesaml/module.php/saml/sp/saml2-acs.php/default-sp
 
 ![ADFS3](img/adfs3.png "info")
 
 We also required editing of the claim rules so that we had outgoing claim types of UPN, E-Mail Address, Name, Name ID that were all matched against relevant AD attributes.

![ADFS4](img/adfs4.png "Check info")

Finally, we also required a copy of the token-signing certificate from ADFS that we would be able to use on the drupal side. This involved browsing to the certificates in ADFS management console, e.g.

* Right-click the certificate and select View Certificate.
* Select the Details tab.
* Click Copy to File... The Certificate Export Wizard launches. etc.

The certificate is stored in a single file (.cer or .crt).

### Drupal Configuration

With ADFS access setup for drupal to be a relying party we could setup the drupal side. The first part involved installing and enabling the Drupal [SAML](http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) module: [simplesamlphp_auth](https://drupal.org/project/simplesamlphp_auth). At this time of writing we used: recommended release 7.x-2.0-alpha2 (2013-Feb-11).

Next, we followed [Pantheon instructions](http://helpdesk.getpantheon.com/customer/portal/articles/555188) to download and install simplesamlphp-1.11.0 into our git repo at private/simplesamlphp-1.11.0. We added the symlink as suggested from
 
*  /simplesaml to /private/simplesaml-1.11.x/www

and copied the certificate from the ADFS process to private/simplesaml-1.11.0/cert.

We followed the advice to modify our /private/simplesaml-1.11.x/config/config.php with:

```php
if (!ini_get('session.save_handler')) {
  ini_set('session.save_handler', 'file');
}

$ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
$host = $_SERVER['HTTP_HOST'];
$drop_id = $ps['conf']['pantheon_binding'];
$db = $ps['databases']['default']['default'];

$config = array (
  'baseurlpath'           => 'https://'. $host .'/simplesaml/',
  'certdir'               => 'cert/',
  'loggingdir'            => 'log/',
  'datadir'               => 'data/',
  'tempdir'               => '/srv/bindings/'. $drop_id .'/tmp/simplesaml',
# Your $config array continues for a while...
# until we get to the "store.type" value, where we put in DB config...
  'store.type' => 'sql',
  'store.sql.dsn' => 'mysql:host='. $db['host'] .';port='. $db['port'] .';dbname='. $db['database'],
  'store.sql.username' => $db['username'],
  'store.sql.password' => $db['password'],
```

and also modified our /sites/default/settings.php with:

```php
$ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
$conf['simplesamlphp_auth_installdir'] = '/srv/bindings/'. $ps['conf']['pantheon_binding'] .'/code/private/simplesamlphp-1.11.0';
```

We modified our 
/private/simplesaml-1.11.0/config/authsources.php to support both core and federated SAML configurations. NOTE: The idp matches the federation service identifier we pointed out above.

```php
<?php
$config = array(
   'admin' => array(
      'core:AdminPassword',
   ),
   'default-sp' => array(
      'saml:SP',
      'entityID' => 'urn:drupal:adfs-abg',         
      'idp' => 'http://sts.act.org/adfs/services/trust',
      'NameIDPolicy' => NULL,
   ),
);
```

Then we configured the /private/simplesaml-1.11.0/metadata/saml20-idp-remote.php as follows:

```php
<?php
  $metadata['http://sts.act.org/adfs/services/trust'] = array(
        'name' => array(
          'en' => 'ACT ADFS',
        ),
        'description'          => 'ACT ADFS Setup',
        'SingleSignOnService'  => 'https://sts.act.org/adfs/ls/',
        'certificate'          => 'act-adfs.crt',
);
```

There were some additional security/production measures we took with the /private/simplesaml-1.11.x/config/config.php configuration including:

* set the secretsalt value to a new, unique random value
* set the technicalcontact_name and technicalcontact_email to project specific values
* session.cookie.secure to TRUE, i.e. the user will only access via HTTPS
* changed baseurl path protocol to https

Finally, we configured the simplesamlphp_auth module from the console:

![simple1](img/simple1.png "info")

---

We checked the activate and force https options and double-checked the installation directory and auth source. 

![simple2](img/simple2.png "info")

---

Then we plugged in the attribute data from the claims to map into the Drupal user attributes.

![simple3](img/simple3.png "info")

---

### Running Live

With both ADFS setup and Drupal configured with the simplesamlphp module live we can now navigate to the homepage. The idea here is that we will follow a flow similar to this one where Drupal is in the role of the ASP.NET Web Portal.

![flow](img/adfs-flow.png "info")

That is, we will go to the Drupal site, redirect to the ADFS STS site where we will present our credentials which will then redirect us back to Drupal with the appropriate claims data. As we can see from this home screen, we now have a "Federated Log In" link.

![flow1](img/flow1.png "info")

---

When we click that we are taken to the ADFS login.

![flow2](img/flow2.png "info")

---

This involved making a SAML AuthnRequest assertion (which we can trace using [SAML tracer](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/) )

![flow3](img/flow3.png "info")

---

On the successful presentation of account credentials we are redirected back into the Drupal site. If the user account didn't already in Drupal it is provisioned automatically.

![flow4](img/flow4.png "info")

---

This involved accepting the SAML response.

![flow5](img/flow5.png "info")

--- 

### Additional Info

It should also be mentioned that the simple SAML module provides a nice little console where you can inspect and troubleshoot your SAML configuration. You simply navigate to '/simplesaml' and are presented with tabs relating to configuration, federation and authentication.

![ss1](img/ss1.png "info")

--- 
![ss2](img/ss2.png "info")

--- 
![ss3](img/ss3.png "info")

--- 


### Resources

This approach heavily followed and borrowed from these excellent resources:

* [Swapnil Patil: ADFS Configuration and SAML 2.0 with Drupal](http://www.drupalinnovations.com/blog/adfs-configuration-and-saml-20-drupal)
* [Pantheon Technical Article: Using SimpleSAMLphp with Shibboleth SSO](http://helpdesk.getpantheon.com/customer/portal/articles/555188) 

	
<ul class="pager">
  <li class="previous"><a href="/">&larr; Back</a></li>
</ul>