var currentStep = 0;
var currentRunning = 0;

var currentExerciseOKStep = 0;
var currentExerciseBadStep = 0;
var currentExerciseOKorBad = 0; // -1 for bad, 1 for ok
var currentExerciseSpeed = '';
var currentExerciseStatus = 0; // 0 for none, 1 for situp, 2 for squat, 3 for running
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

    var startSquatButton = document.getElementsByClassName('start-squat')[0];
    var startSitupButton = document.getElementsByClassName('start-situp')[0];
    var startRunningButton = document.getElementsByClassName('start-running')[0];

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
    let terminal = new BluetoothTerminal();
    connectButton.addEventListener('click', function () {
        terminal.connect().then(() => {
            connected = true
        });

    });

    let endExerciseButton = document.getElementsByClassName('end-exercise')[0]
    startSitupButton.addEventListener('click', function () {
        currentExerciseStatus = 1;
        currentExerciseBadStep = 0;
        currentExerciseOKStep = 0;
        terminal.send('start_situp');
        startSquatButton.classList.toggle('not-active');
        startSitupButton.classList.toggle('not-active');
        startRunningButton.classList.toggle('not-active');
        endExerciseButton.classList.toggle('not-active');
    });

    startSquatButton.addEventListener('click', function () {
        currentExerciseStatus = 2;
        currentExerciseOKStep = 0;
        currentExerciseBadStep = 0;
        terminal.send('start_squat');
        startSquatButton.classList.toggle('not-active');
        startSitupButton.classList.toggle('not-active');
        startRunningButton.classList.toggle('not-active');
        endExerciseButton.classList.toggle('not-active');
    });

    startRunningButton.addEventListener('click', function () {
        currentExerciseStatus = 3;
        currentExerciseBadStep = 0;
        currentExerciseOKStep = 0;
        terminal.send('start_running');
        startSquatButton.classList.toggle('not-active');
        startSitupButton.classList.toggle('not-active');
        startRunningButton.classList.toggle('not-active');
        endExerciseButton.classList.toggle('not-active');
    });

    endExerciseButton.addEventListener('click', function () {
        if (currentExerciseStatus == 1) {
            terminal.send('stop_situp');
        } else if (currentExerciseStatus == 2) {
            terminal.send('stop_squat');
        } else if (currentExerciseStatus == 3) {
            terminal.send('stop_running');
        }
        currentExerciseStatus = 0;
        startSquatButton.classList.toggle('not-active');
        startSitupButton.classList.toggle('not-active');
        startRunningButton.classList.toggle('not-active');
        endExerciseButton.classList.toggle('not-active');
    });

    terminal.receive = function (data) {

        console.log(data);
        if (data == "1") {
            currentStep++;
        } else if (data == "r") {
            currentRunning++;
        } else if (data == "ok_situp") {
            currentExerciseOKStep++;
        } else if (data == "bad_situp") {
            currentExerciseBadStep++;
        } else if (data == "ok_squat") {
            currentExerciseOKStep++;
        } else if (data == "bad_squat") {
            currentExerciseBadStep++;
        } else if (data == "fast") {
            currentExerciseOKorBad = 3;
        } else if (data == "slow") {
            currentExerciseOKorBad = 4;
        } else if (data == "good") {
            currentExerciseOKorBad = 2;
        }
    };
    var updateHTMLCounter = setInterval(function () {
        currentExerciseText = document.getElementById('current-exercise');
        var currentExerciseStatusText = document.getElementById('exercise-status');
        var exerciseDistanceText = document.getElementById('exercise-distance-text');
        var exerciseDistance = document.getElementById('exercise-distance');
        var exerciseDistanceUnit = document.getElementById('exercise-distance-unit');
        var caloriesBurnedText = document.getElementById('calories-burned-text');
        var caloriesBurned = document.getElementById('calories-burned');
        var stepDistance = document.getElementById('step-distance');
        var stepCalories = document.getElementById('step-calories');
        progress1.update([parseInt(currentStep / 100)]);
        stepText.innerHTML = (currentStep.toString() + "<br>steps");
        stepDistance.innerHTML = (currentStep * 0.00008).toFixed(3);
        stepCalories.innerHTML = (currentStep * 0.1).toFixed(2);
        if (currentExerciseStatus == 1) {
            currentExerciseText.innerHTML = "Current Sit-Uping";
            if (currentExerciseOKorBad == 1) {
                currentExerciseStatusText.innerHTML = "OK sit up";
            } else if (currentExerciseOKorBad == -1) {
                currentExerciseStatusText.innerHTML = "Bad sit up";
            }
            exerciseDistanceText.innerHTML = 'Sit-up count';
            exerciseDistance.innerHTML = currentExerciseBadStep + currentExerciseOKStep;
            exerciseDistanceUnit.innerHTML = 'time(s)';
            caloriesBurned.innerHTML = ((currentExerciseOKStep + currentExerciseBadStep) * 0.07).toFixed(3);

        }
        if (currentExerciseStatus == 2) {
            currentExerciseText.innerHTML = "Current Squat";
            if (currentExerciseOKorBad == 1) {
                currentExerciseStatusText.innerHTML = "OK squat";
            } else if (currentExerciseOKorBad == -1) {
                currentExerciseStatusText.innerHTML = "Bad squat";
            }
            exerciseDistanceText.innerHTML = 'Squat count';
            exerciseDistance.innerHTML = currentExerciseBadStep + currentExerciseOKStep;
            exerciseDistanceUnit.innerHTML = 'time(s)';
            caloriesBurned.innerHTML = ((currentExerciseOKStep + currentExerciseBadStep) * 0.09).toFixed(3);

        }

        if (currentExerciseStatus == 3) {
            currentExerciseText.innerHTML = "Current Running";
            if (currentExerciseOKorBad == 3) {
                currentExerciseStatusText.innerHTML = "Fast";
            } else if (currentExerciseOKorBad == 4) {
                currentExerciseStatusText.innerHTML = "Slow";
            } else if (currentExerciseOKorBad == 2) {
                currentExerciseStatusText.innerText = "Good speed";
            }
            exerciseDistanceText.innerHTML = 'Distance';
            exerciseDistance.innerHTML = ((currentExerciseBadStep + currentExerciseOKStep) * 0.00008).toFixed(3);
            exerciseDistanceUnit.innerHTML = 'km(s)';
            caloriesBurned.innerHTML = ((currentExerciseOKStep + currentExerciseBadStep) * 0.02).toFixed(3);

        }
        if (currentExerciseStatus == 0) {
            currentExerciseText.innerHTML = "Please select exercise";
            currentExerciseStatusText.innerHTML = "";

        }
    }, 200);
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
                label: '# of Steps',
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