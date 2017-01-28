// meteor add maazalik:highcharts : This package was used to get the Pie Chart.

//  all the chart logic goes here:

     function builtPie(id) {
    // document.getElementById('voteBtn').style.display = "none";

    // var pollId = event.target.dataset.id;
    var pollId = id;
    console.log('chart function ' + pollId);
        // 'external' data
        var data = new Array();
        var poll = Polls.findOne({_id: pollId });

        for(i=0; i< poll.choices.length; i++){
             var tempObject = {name:poll.choices[i].text, y:poll.choices[i].votes};
            data.push(tempObject);
        }
        var divToUpdate = ".chart-"+pollId;
        $(divToUpdate).highcharts({
            // $('.votebutton').hide();
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                height:200,
                width:500
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

    // var temp = [{"test": "testing"}];
    // return temp;
    }

  // Call the function to built the chart when the template is rendered

Template.pieChart.rendered = function() {
  var id = Template.currentData().id;
  builtPie(id);
}
