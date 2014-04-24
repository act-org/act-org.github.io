
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChartPie1);
function drawChartPie1() {
        var data = google.visualization.arrayToDataTable([
          ['Resource', 'Count'],
          ['BT - Developers',     48],
          ['BT - Consultants',      19.25],
		  ['BT - Tester',  9],
		  ['DM - Developers',     19],
          ['DM - Consultants',      16],		  
          ['DM - Tester',  2],		  
        ]);

        var options = {
          title: 'Software Development Resources By Area',
		  is3D: true,
        };

  var pchart1 = new   google.visualization.PieChart(document.getElementById('pie1_div'));
  pchart1.draw(data, options);
}