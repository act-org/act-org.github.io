---
layout: default
title: ACT Team Profiles 2014
section: standards/team-profiles-2014
---
# Overview
ACT is preparing to collect and publish a set of standards and processes that will support and inform ACT software development practices. This effort is driven by a need to:

* have a list of approved software elements to direct internal development as well as development contracted with consultants.
* decrease the amount of money we spend on overlapping software tool licenses.

The scope involves "software construction" and "software testing" (see [SWEBOK, 2014](#swebok2014)) and may include support for:

* Tools
* Techniques
* Platforms
* Frameworks
* Languages
* Best Practices

From a process perspective, we wish to define lightweight processes that can be followed to:

* Introduce, review and accept NEW standards
* Review, refresh and retire EXISTING standards on a continuous basis

In the past, organizations have attempted to build/deliver monolithic software development standards as a top-down, management-driven pronouncement that would filter down to the individual teams. In the more recent agile context though companies encourage teams to be  self-organizing. Typically self-organizing teams can be trusted to manage their own internal standards within a larger organizational context ([Thomas, 2000](#thomas2000)). We believe that those involved in the organizational standards effort can act as competency leaders that work with people and teams to discuss their own internal standards, not simply management-imposed standards ([Appelo, 2010](#appelo2010)). Bottom up synergy can be created between teams that leads towards optimization across the organization. 

In order to support this organic, bottom-up, team-focused approach we need to get an understanding of the current software development team structure in the organization. This includes an understanding of:

* team names and sizes
* reporting structures
* employee, consultant ratios
* primary technology/platform focus areas
* geographic configurations

Based on this understanding of teams we can determine how to drive the overall organizational standards effort, e.g. 

* do we need one committee?
* several committees? 
* which teams might we look to drive certain standards?
* etc.

This document summarizes the understanding we gathered by informally reviewing information about software teams with 10 of ACT's managers/leaders responsible for software development activities. A similar effort will also be conducted with ACT managers/leaders responsible for software testing activities as well.

## Structure

Starting with reporting structure, we can see that this review involved all teams doing software development within ACT "Corporate Systems" (CS). There are two divisions of teams, those under "Business Technology" (BT) and those under "Data Management" (DM).

<div id='org1_div' style="overflow:auto;"></div>

### Breakdowns

Business technology houses most of the software development teams/people with **67.3%** of the pie. Nearly a third of all resources across BT/DM are consultants (**31.1%**). Nearly ten percent of the team resources discussed here are "embedded testers" (**9.7%**). 

<div id="pie1_div" style="width: 900px; height: 500px;"></div>

Breaking this out by teams we can get a sense for team sizes and developer/consultant ratios. Setting aside the current "team-of-1" teams the average/mean team size was 7.5 people (with a median of 7 and a mode of 5):

<div id='bar1_div' style="overflow:auto;"></div>

Most teams reported a primary focus on Java/JEE in the discussion:

<div id="pie2_div" style="width: 900px; height: 500px;"></div>

Oracle database dependencies were present in nearly every team with only a few cases where Microsoft SQL Server was used and legacy uses of Microsft Access Databases were discussed. Notable exceptions included G3 reporting a mysql option, ACTProfile's use of MongoDB and Neo4J and data integration web team's use of MongoDB.

Looking at the geographic splits we can see this mix of resource locations (74 resources (or around 70%) working onsite in Iowa and 32 (or around 30%) outside of Iowa:

<div id="geo1_div" style="width: 900px; height: 500px;"></div>

with about half the teams having some mixture of onsite/offsite resources (9/17 teams) and half the teams being entirely onsite in Iowa City (8/17 teams). 

A vast majority of teams reported that they are following scrum or some agile process (with exceptions for some teams that were doing non-project work, e.g. responding to support tickets, etc).

## Findings

TBD

## References

* <a name="swebok2014"></a>[SWEBOK v3.0](http://www.computer.org/portal/web/swebok/swebokv3), edited by Bourque P., Fairley R.E. – IEEE, 2014
* <a name="thomas2000"></a>Thomas, Kenneth. Intrinsic Motivation at Work. San Francisco: Berrett-Koehler Publishers, 2000.
* <a name="appelo2010"></a>Appelo, Jurgen. Management 3.0: Leading Agile Developers, Developing Agile Leaders, Addison-Wesley Professional, December 28, 2010.

<script type='text/javascript' src='https://www.google.com/jsapi'></script>
<script type='text/javascript' src='/assets/js/google-org1.js'></script>
<script type='text/javascript' src='/assets/js/google-bar1.js'></script>
<script type='text/javascript' src='/assets/js/google-pie1.js'></script>
<script type='text/javascript' src='/assets/js/google-pie2.js'></script>
<script type='text/javascript' src='/assets/js/google-geo1.js'></script>
