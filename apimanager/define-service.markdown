---
layout: default
title: API Manager -  Overview
section: apimanager/overview
---
  
<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>

# Defining the API

Service providers will be given an account to define their services and provided the url for each environment (dev, test, stress, prod) to the WSO2 API Manager publisher webapp. 

![Add Service](img/define-service-add.png "Add Service")

As part of defining the service, API resources are configured that map to the underlying service methods.

![Add API](img/define-service-api.png "Add API")

The publisher app also gives service providers:

* control over what service level they would like to offer down to the method level, i.e. how frequently can a subscriber invoke their service
* control over what kind of security is required, e.g. none, just an app subscription, a user login, or both a user login and an app subscription.
* a tag mechanism to help identify what the service is to service consumers
* a way to add/attach documentation for service consumers to find/review 
* an area to list the business and technical service owners contact information 
	
<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>