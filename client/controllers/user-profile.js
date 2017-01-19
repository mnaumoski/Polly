document.addEventListener("DOMContentLoaded", function(event) {

    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
    });
});