// meteor add maazalik:highcharts : This package was used to get the Pie Chart.

//  all the chart logic goes here:
Template.pollPartial.events({
  "click .voteButton": function () {
    var pollId = event.target.dataset.id;
    
        // 'external' data
        var data = new Array();

        data.push({
            name: 'vote 0',
            y: 10,
            color: '#55BF3B'
        });

        data.push({
            name: 'vote 1',
            y: 12,
            color: '#DDDF0D'
        });

        data.push({
            name: 'vote 2',
            y: 30,
            color: '#DF5353'
        });
        var divToUpdate = "#" + pollId;
        $(divToUpdate).highcharts({
            
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            
            title: {
                text: ''
            },
            
            credits: {
                enabled: false
            },
            
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            
            series: [{
                type: 'pie',
                name: 'Votes',
                data: data
            }]
        });
    }
})

/*
 * Call the function to built the chart when the template is rendered
 */
// Template.pieChart.rendered = function() {    
//     builtPie();
// }