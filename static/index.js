var currentStep = 0;

$(document).ready(function () {
    var connected = false;


    let date_container = document.getElementById("date-container")
    let health_container = document.getElementById("health-container");
    let help_container = document.getElementById("help-container")
    let date_button = document.getElementById("datetime");
    let health_button = document.getElementById("health");
    let help_button = document.getElementById("help");
    var userData = {}
    $.getJSON('getdata', function (data) {
        userData = data;
        console.log(data);
    })
    date_button.addEventListener('click', function () {
        if (date_button.classList.contains('active')) {
            date_container.classList.add('active')
        } else {
            date_container.classList.remove('active')
        }
    });
    health_button.addEventListener('click', function () {
        if (health_button.classList.contains('active')) {
            health_container.classList.add('active');
        } else {
            health_container.classList.remove('active')
        }
    });
    help_button.addEventListener('click', function () {
        if (help_button.classList.contains('active')) {
            help_container.classList.add('active')
        } else {
            help_container.classList.remove('active')
        }
    });
    var charts = document.getElementById('meter');
    var dark_color = getComputedStyle(document.documentElement)
        .getPropertyValue('--main-dark-color');
    var progress1 = new CircularProgress(charts, {fill: dark_color, width: 250, innerRadius: 250 / 2 * (9 / 10)});
    progress1.update([55]);
    var stepText = document.getElementById("meter-text");
    var exerciseContainer = document.getElementById('exercise-record');
    var exerciseButton = document.getElementById('exercise-button');
    exerciseButton.addEventListener('click', function () {
        exerciseContainer.classList.toggle('not-active');
    });
    var exerciseBack = document.getElementById('back');
    exerciseBack.addEventListener('click', function () {
        exerciseContainer.classList.toggle('not-active');
    });

    var connectButton = document.getElementById("connect");

    const terminal = new BluetoothTerminal();
    connectButton.addEventListener('click', function () {
        terminal.connect().then(() => {
            connected = true
        });

    });

    terminal.receive = function (data) {
        // console.log(data);
        if (data == "1") {
            currentStep++;
        } else console.log(data)
    };
    var updateHTMLCounter = setInterval(function () {

    }, 100);
    var postCounter = setInterval(function () {
        let data = {
            'steps': currentStep,

        };
        $.ajax({
            type: 'POST',
            url: '/putdata',
            data: JSON.stringify(data),
            success: function (data) {
                //alert('data: ' + data);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }, 1000);
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['12/14', '12/15', '12/16', '12/17', '12/18', '12/19'],
            datasets: [{
                label: '# of Votes',
                data: [5000, 5500, 6000, 8000, 4500, 6500],
                backgroundColor: [
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // setInterval(function(){progress1.update([Math.floor(Math.random()*100) + 1])},1000);
});