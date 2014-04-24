
      google.load('visualization', '1', {packages:['orgchart']});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');
        data.addRows([
          [{v:'Pat', f:'Pat<div style="color:red; font-style:italic">CS</div>'}, '', ''],
          [{v:'Scott', f:'Scott<div style="color:red; font-style:italic">BT</div>'}, 'Pat', ''],
          [{v:'Julie', f:'Julie<div style="color:red; font-style:italic">DM </div>'}, 'Pat', ''],
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
		  ['ADS', 'Scott', ''],
		  ['Peggy', 'Julie', ''],
		  ['Reporting', 'Peggy', ''],		  
		  ['Randy', 'Julie', ''],
		  ['Data Int.', 'Randy', ''],
		  ['Data Int. Web', 'Randy', ''],
		  ['Tools', 'Randy', ''],
		  ['Jonie', 'Julie', ''],		  		  		  		  	
		  ['MDM', 'Jonie', '']		  	
        ]);
        var chart = new google.visualization.OrgChart(document.getElementById('org1_div'));
        chart.draw(data, {allowHtml:true,allowCollapse:false,size:'medium'});
		$(".google-visualization-orgchart-node").css('border','0');
       }
	 