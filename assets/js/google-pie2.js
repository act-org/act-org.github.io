
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChartPie2);
function drawChartPie2() {
        var data = google.visualization.arrayToDataTable([
          ['Resource', 'Count'],
          ['Java Developers/Consultants', 58],
          ['.NET', 4],		  
          ['Informatica', 17],	
		  ['Other (e.g. PHP, SAS, OBIEE, BI Publisher, PL/SQL)', 22],	
        ]);

        var options = {
          title: 'Java Centric Resources',
		  is3D: true,
        };

  var pchart = new   google.visualization.PieChart(document.getElementById('pie2_div'));
  pchart.draw(data, options);
}