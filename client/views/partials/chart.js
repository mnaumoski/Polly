// meteor add maazalik:highcharts : This package was used to get the Pie Chart.

//  all the chart logic goes here:

function builtPie() {
    
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