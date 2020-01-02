currentStep = 0;
currentExerciseStep = 0;
currentExerciseSpeed = '';
currentExerciseStatus = 0;
$(document).ready(function () {
    var connected = false;


    let date_container = document.getElementById("date-container")
    let health_container = document.getElementById("health-container");
    let help_container = document.getElementById("help-container")
    let date_button = document.getElementById("datetime");
    let health_button = document.getElementById("health");
    let help_button = document.getElementById("help");
    var charts = document.getElementById('meter');
    var stepText = document.getElementById("meter-text");
    var exerciseContainer = document.getElementById('exercise-record');
    var exerciseButton = document.getElementById('exercise-data-button');
    var exerciseBack = document.getElementById('back');
    var startExerciseButton = document.getElementById('start-exercise-button');
    var startExerciseContainer = document.getElementById('start-exercise');
    var startExerciseBack = document.getElementById('start-exercise-back');
    var bodyDataBack = document.getElementById('body-data-back');
    var bodyDataContainer = document.getElementById('body-data');
    var bodyDataButton = document.getElementById('body-data-button');
    var dark_color = getComputedStyle(document.documentElement)
        .getPropertyValue('--main-dark-color');
    var userData = {}
    $.getJSON('getdata', function (data) {
        userData = data;
        console.log(data);
        currentStep = data['current_walk']

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
        if (help_container.classList.contains('active')) {
            help_container.classList.add('active')
        } else {
            help_container.classList.remove('active')
        }
    });
    bodyDataButton.addEventListener('click', function () {
        bodyDataContainer.classList.toggle('not-active');
    })
    var progress1 = new CircularProgress(charts, {fill: dark_color, width: 250, innerRadius: 250 / 2 * (9 / 10)});
    progress1.update([55]);
    exerciseButton.addEventListener('click', function () {
        exerciseContainer.classList.toggle('not-active');
    });
    exerciseBack.addEventListener('click', function () {
        exerciseContainer.classList.toggle('not-active');
    });

    startExerciseButton.addEventListener('click', function () {
        startExerciseContainer.classList.toggle('not-active');
    });
    startExerciseBack.addEventListener('click', function () {
        startExerciseContainer.classList.toggle('not-active');
    });
    var connectButton = document.getElementById("connect");
    bodyDataBack.addEventListener('click', function () {
        bodyDataContainer.classList.toggle('not-active');
    })
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
        } else if (data == "r") {

        } else if (data == "ok_situp") {

        } else if (data == "bad_situp") {

        } else if (data == "ok_squat") {

        } else if (data == "bad_squat") {

        }
    };
    var updateHTMLCounter = setInterval(function () {
        stepText.innerHTML = (currentStep.toString() + "<br>steps");
        if (currentExerciseStatus) {

        }
    }, 500);
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
    }, 2000);
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['12/14', '12/15', '12/16', '12/17', '12/18', '12/19'],
            datasets: [{
                label: '# of Votes',
                data: [5000, 5500, 6000, 8000, 4500, 6500],
                backgroundColor: [
                    dark_color,
                    /*'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',
                    'rgba(101, 97, 111, 1)',*/
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
            responsive: true,
            responsiveAnimationDuration: 100,

            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{

                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });

    // setInterval(function(){progress1.update([Math.floor(Math.random()*100) + 1])},1000);
});