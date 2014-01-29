---
layout: default
title: API Manager -  Overview
section: apimanager/overview
---
  

# Overview
As part of the move to WSO2 [API Manager](http://wso2.com/products/api-manager/) there are several elements to consider. We will make the distinction between **services** that are registered and published and **APIs** that are managed which expose access to them. 

## Publisher/API Provider

Software teams manage and publish services that will be accessed by various consumers as managed APIs. Providers can define their API/service methods and what level of service access they would like to offer.

- [Defining the API](define-service)
- [Publishing to the Gateway](publish-service)
- [JWT: Identifying the Consumer](jwt)
- [Reviewing API Statistics](stats-service)

## Store/API Consumer

Application teams that need access to published APIs will visit a store where they can register the application and subscribe to managed APIs.

- [Defining the Consumer](define-consumer)
- [Test Invoke API](test-consumer)
- [Client invocation](client-consumer)

## Gateway

The gateway is responsible for:

- dispatching all of the required API traffic with identifying [JWT](jwt) data
- cache management of service responses where designated
- ensuring that the appropriate security credentials have been provided
- recording activity to the BAM

## Business Activity Monitor
The [BAM](http://wso2.com/products/business-activity-monitor/) provides the statistics that appear in the API Manager dashboard views.

## Governance

- [Approval workflow management](governance)