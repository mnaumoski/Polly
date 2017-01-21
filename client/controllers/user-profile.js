
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
//

var options = {
  // Don't draw the line chart points
  showPoint: false,
  // Disable line smoothing
  lineSmooth: false,
  // X-Axis specific configuration
  axisX: {
    // We can disable the grid for this axis
    showGrid: true,
    // and also don't show the label
    showLabel: false
  },
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 60,
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
    labelInterpolationFnc: function(value) {
      return '$' + value + 'm';
    }
  }
};

