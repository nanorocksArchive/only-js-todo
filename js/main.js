window.onload = function (e) {

    var options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'Tasks from Todo List',
            data: [30,91,125]
        }],
        xaxis: {
            categories: [1991, 1998,1999]
        },
        fill: {
            colors: ['rgb(250, 162, 28)']
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();

};