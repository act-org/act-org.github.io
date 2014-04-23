---
layout: default
title: ACT Team Profiles 2014
section: standards/team-profiles-2014
---
<script type='text/javascript' src='https://www.google.com/jsapi'></script>
<script type='text/javascript'>
      google.load('visualization', '1', {packages:['orgchart']});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');
        data.addRows([
          [{v:'Pat', f:'Pat<div style="color:red; font-style:italic">SVP</div>'}, '', ''],
          [{v:'Scott', f:'Scott<div style="color:red; font-style:italic">AVP</div>'}, 'Pat', ''],
          [{v:'Julie', f:'Julie<div style="color:red; font-style:italic">VP</div>'}, 'Pat', ''],
          ['Eleanor', 'Scott', ''],
          ['Validus', 'Eleanor', ''],
          ['Barney', 'Scott', ''],
          ['Core EBiz', 'Barney', ''],
		  ['EPass/ EBiz Int.', 'Barney', ''],
		  ['SF.com', 'Barney', ''],
		  ['Solution Eng', 'Barney', ''],
		  ['Rajni', 'Scott', ''],
		  ['Prod Support', 'Rajni', ''],
		  ['Lance', 'Scott', ''],
		  ['VITA', 'Lance', ''],		  
		  ['Common Scoring', 'Lance', ''],
		  ['Bradley/Ed', 'Scott', ''],
		  ['G3', 'Bradley/Ed', ''],		  
		  ['ACT Profile', 'Bradley/Ed', ''],
		  ['Manish', 'Scott', ''],
		  ['Web', 'Manish', ''],		  
		  ['KeyTrain', 'Manish', ''],
		  ['Peggy', 'Julie', ''],
		  ['Reporting', 'Peggy', ''],		  
		  ['Randy', 'Julie', ''],
		  ['Data Int.', 'Randy', ''],
		  ['Data Int. Web', 'Randy', ''],
		  ['Tools', 'Randy', '']		  		  		  		  		  	
        ]);
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        chart.draw(data, {allowHtml:true,allowCollapse:true,size:'medium'});
		$(".google-visualization-orgchart-node").css('border','0');
      } 
</script>	
# Overview
TBD

## Structure

<div id='chart_div' style="overflow:auto;"></div>


