---
layout: default
title: API Manager -  Overview
section: apimanager/overview
---
  
<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>

# JWT: Who should I say is calling?

When API providers are invoked they may need to access runtime information about who is currently calling their service. API Manager is configured to provide service publishers with data that can provide that information.

Consider this HTTP GET REST service invocation that arrived at a service provider requesting a list of data. 

	GET /api/rest/v0.1/students 200 20ms - 822b
	{ host: 'act-rest-api.pcfapps.vsel-canopy.com',
  		'user-agent': 'Synapse-PT-HttpComponents-NIO',
  	  	connection: 'close',
  	  'content-type': 'application/x-www-form-urlencoded',
	  via: '1.1 inwwf01.corporate.act.org:80 (Cisco-IronPort-WSA/7.5.0-826)',
	  'x-forwarded-for': '151.148.122.100, 10.116.60.153',
	  'x-forwarded-proto': 'http',
	  'x-imforwards': '20',
	  'x-jwt-assertion': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTZ3aXRoUlNBIiwieDV0IjoiTm1KbU9HVXhNelpsWWpNMlpEUmhOVFpsWVRBMVl6ZGhaVFJpT1dFME5XSTJNMkptT1RjMVpBPT0ifQ==.eyJpc3MiOiJ3c28yLm9yZy9wcm9kdWN0cy9hbSIsImV4cCI6MTM5MDkyOTAyOTM2OCwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9zdWJzY3JpYmVyIjoiYWRtaW4iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2FwcGxpY2F0aW9uaWQiOiIyIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9hcHBsaWNhdGlvbm5hbWUiOiJNeSBBQ1QgQXBwbGljYXRpb24iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2FwcGxpY2F0aW9udGllciI6IlVubGltaXRlZCIsImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvYXBpY29udGV4dCI6Ii9yZXN0IiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy92ZXJzaW9uIjoiMS4wLjAiLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL3RpZXIiOiJVbmxpbWl0ZWQiLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2tleXR5cGUiOiJQUk9EVUNUSU9OIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy91c2VydHlwZSI6IkFQUExJQ0FUSU9OIiwiaHR0cDovL3dzbzIub3JnL2NsYWltcy9lbmR1c2VyIjoiYWRtaW4iLCJodHRwOi8vd3NvMi5vcmcvY2xhaW1zL2VuZHVzZXJUZW5hbnRJZCI6Ii0xMjM0IiwgImh0dHA6Ly93c28yLm9yZy9jbGFpbXMvcm9sZSI6ImFkbWluLHN1YnNjcmliZXIsSW50ZXJuYWwvZXZlcnlvbmUifQ==.P2LsMGoqmLbZNnZ2QMyz8AoWp6gxQn8Ekj+TGdQ/O/Su4TiDvH1Y0gcnmkg7YWkhfiBO64xOPQYw6XIAY5Y66oLJI5cW85oGBtZ8ohX1FSpjfYPIopXDQ6jxEoLSvR/dtpgzVhe4lZdZ2t3+JB64b8dtZyEg1lLVmG1RQ+SvX3A=',
	  'accept-encoding': 'gzip' }


Looking at the HTTP headers we can see that the HTTP request comes with a 'x-jwt-assertion' header. This header value contains a JSON Web Token ([JWT](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-15)).  API Manager uses JWT to pass enduser credentials of the API invoker to the backend API implementation. When the JWT is signed - as it is here -  the general form of the JWT is {...}.{...}.{...} - Three strings delimited by periods. ([more information on the JWT creation](http://docs.wso2.org/pages/viewpage.action?pageId=32350971)). These three parts represent:

	  * JWT Header
	  * JWT Claims Set
	  * JSON Web Signature (JWS)
 
Each of these components of the JWT are [base64-encoded](http://en.wikipedia.org/wiki/Base64). When a service provider receives a JWT they can split the token and decode the values. For example, if our services were implemented with Node.js express we might have a route handler for students.js that accessed the JWT Claims Set


	exports.list = function(req, res) {
		var jwt = req.headers['x-jwt-assertion'];
		if(jwt) {
			var jwtArray = jwt.split('.');
			var jwtHeader = new Buffer(jwtArray[0], 'base64');
			var jwtClaims = new Buffer(jwtArray[1], 'base64');
			var jws = new Buffer(jwtArray[2], 'base64');
		...	
	};


The decoded JWT Header from the example provides:

	{"typ":"JWT","alg":"SHA256withRSA","x5t":"NmJmOGUxMzZlYjM2ZDRhNTZlYTA1YzdhZTRiOWE0NWI2M2JmOTc1ZA=="}	
 
As we can see, the JWT was signed using SHA256/RSA. The "x5t" (x.509 certificate thumbprint) header parameter provides a base64url encoded SHA-256 thumbprint (a.k.a. digest) of the DER encoding of an X.509 certificate that can be used to match a certificate., e.g.

	6bf8e136eb36d4a56ea05c7ae4b9a45b63bf975d

The JWT Claims Set is where we get the caller identifying information:

	{
		"iss": "wso2.org/products/am",
		"exp": 1390934717295,
		"http://wso2.org/claims/subscriber": "admin",
		"http://wso2.org/claims/applicationid": "2",
		"http://wso2.org/claims/applicationname": "My ACT Application",
		"http://wso2.org/claims/applicationtier": "Unlimited",
		"http://wso2.org/claims/apicontext": "/rest",
		"http://wso2.org/claims/version": "1.0.0",
		"http://wso2.org/claims/tier": "Unlimited",
		"http://wso2.org/claims/keytype": "PRODUCTION",
		"http://wso2.org/claims/usertype": "APPLICATION",
		"http://wso2.org/claims/enduser": "admin",
		"http://wso2.org/claims/enduserTenantId": "-1234",
		"http://wso2.org/claims/role": "admin,subscriber,Internal/everyone"
	}	

<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>