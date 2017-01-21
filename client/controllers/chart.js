// meteor add maazalik:highcharts : This package was used to get the Pie Chart.

//  all the chart logic goes here:
Template.pollPartial.events({
  "click .voteButton": function () {
    // document.getElementById('voteBtn').style.display = "none";
    
    var pollId = event.target.dataset.id;
    console.log('chart function ' + pollId);
        // 'external' data
        var data = new Array();
        var poll = Polls.findOne({_id: pollId });
        for(i=0; i< poll.choices.length; i++){
             var tempObject = {name:poll.choices[i].text, y:poll.choices[i].votes};
            data.push(tempObject);
        }

        var divToUpdate = "#" + pollId;
        $(divToUpdate).highcharts({
            // $('.votebutton').hide();
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