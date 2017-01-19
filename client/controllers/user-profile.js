
document.addEventListener("DOMContentLoaded", function(event) {

    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
    });
});

// document.addEventListener("DOMContentLoaded", function(event) {

//     ctx = $("#myChart").get(0).getContext("2d");
    
//     var myLineChart = new Chart(ctx, {
//       type: 'line',
//       data: data,
//       options: options
//     });
// });

