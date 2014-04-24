google.load('visualization', '1', {'packages': ['geochart']});
     google.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['State', 'Location'],
          ['Iowa', 74],
		  [{v:'Illinois', f:'Not Iowa'}, 32],
		  [{v:'Wisconsin', f:'Not Iowa'}, 32],
		  [{v:'Nebraska', f:'Not Iowa'}, 32],
		  [{v:'Missouri', f:'Not Iowa'}, 32],	
		  [{v:'Minnesota', f:'Not Iowa'}, 32],
		  [{v:'South Dakota', f:'Not Iowa'}, 32],			  
        ]);

        var options = {region:'US-IA',resolution:'provinces'};

        var chart = new google.visualization.GeoChart(document.getElementById('geo1_div'));
        chart.draw(data, options);
    };