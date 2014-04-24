     
	  google.load("visualization", "1", {packages:["corechart"]});
	  google.setOnLoadCallback(drawChart1);
	  function drawChart1() {
		  var data = google.visualization.arrayToDataTable([
		         ['Member', 'ACT Developer', 'Consultant', 'Tester', { role: 'annotation' } ],
		         ['Validus', 6, 0, 1, ''],
				 ['Core EBiz', 5, 0, 0, ''],
				 ['EPass/ EBiz Int.', 7, 0, 0, ''],	
				 ['SF.com', 0, 1, 0, ''],
				 ['Solution Eng', 1, 0, 0, ''],	
				 ['Prod Support', 7, 0, 2, ''],	
				 ['VITA', 6, 2, 3, ''],					 			 
				 ['Common Scoring', 4, 3, 1, ''],
				 ['G3', 3.5, .5, 1, ''],		
				 ['ACTProfile', 2.5, 7.75, 0, ''],
				 ['Web', 6, 0, 0, ''],						 				 ['KeyTrain', 3, 0, 0, ''],
				 ['ADS', 0, 5, 1, ''],
				 ['Reporting', 6, 3, 2, ''],
				 ['Data Int.', 4, 13, 0, ''],
				 ['Data Int. Web', 5, 0, 0, ''],
				 ['Tools', 3, 0, 0, ''],
				 ['MDM', 1, 0, 0, ''],
				 										 				 		
		       ]);

		       var options = {
		         width: 900,
		         height: 400,
				 orientation: 'horizontal',
		         legend: { position: 'top', maxLines: 3 },
		 	bar: { groupWidth: '75%' },
		         isStacked: true,
		       };

	          var chart = new google.visualization.BarChart(document.getElementById('bar1_div'));
	          chart.draw(data, options);
	  } 
	