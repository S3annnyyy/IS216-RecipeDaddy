<style scoped>
.body {
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.member {
    background-color: #f2fff2;
    height: 150px;
    border-radius: 20px;
    margin-right: 35px;
}

.meals {
    background-color: #e9edff;
    height: 150px;
    border-radius: 20px;
    margin-right: 35px;
    text-align: center;
}

.countdown {
    background-color: #fefbf2;
    height: 150px;
    border-radius: 20px;
}


.lead {
    border: 0.5px solid #545454;
    border-radius: 20px;
    height: 200px;
}

table, tr {
    width: 100%;
}

th, td {
    text-align: center;
}

.time {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}

.word {
    font-size: 25px;
    font-weight: bold;
    padding-left: 20px;
    padding-top: 30px;
}

.small {
    font-size: 10px;
    display: inline;
    color: #545454;
    text-align: center;
}

.leader-content {
    border-top: 0.5px solid #545454;
    text-align: center;
}
</style>

<template>
    <div class="body">
        <h3>Leaderboard</h3>
        <main class="row mt-3">
            <div class="col-2 member">
                <img src="">
                <p style="color: #545454">Joined Members</p>
                <p style="font-weight: bold; font-size: 25px;">325+</p>
            </div>

            <div class="col-2 meals">
                <div class="m-auto">
                    <p style="color: #545454;">You have saved</p>
                    <p style="font-weight: bold; font-size: 25px;">520g</p>
                    <p style="color: #545454;">of food!</p>
                </div>
            </div>

            <div class="col countdown">
                <div class="row">

                    <div class="col word">
                        Remaining time to completion 🔥
                    </div>

                    <div class="col pt-3">
                        <div class="row">
                            <div class="col time">
                                <span id="day"></span>
                            </div>

                            <div class="col">
                                <h1 class="pt-2">:</h1>
                            </div>

                            <div class="col time">
                                <span id="hour"></span>
                            </div>

                            <div class="col">
                                <h1 class="pt-2">:</h1>
                            </div>

                            <div class="col time">
                                <span id="min"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col small">DAYS</div>
                            <div class="col"></div>
                            <div class="col small">HOURS</div>
                            <div class="col"></div>
                            <div class="col small">MINUTE</div>
                        </div>
                    </div>

                    <div class="col-2">
                        trophy
                    </div>
                    
                </div>

                <div class="row small" style="padding-left: 20px;">
                    Rewards are only awarded to the top 3 winners each week
                </div> 
                
            </div>
        </main>

        <h4 class="mt-5 mb-3">Current Leaders</h4>
        <main class="row mb-5">
            <div class="col lead" style="margin-right: 30px;">
                <div class="row">
                    <div class="col">
                        profile picture
                    </div>

                    <div class="col">
                        Username
                        <p>Total Score: 2482</p>
                    </div>

                    <div class="col">
                        Number 1
                    </div>
                </div>

                <div class="row">
                    <div class="col" style="border-right: 0.5px solid #545454;">WINS</div>
                    <div class="col">Today's Metrics</div>
                </div>
                

                
            </div>

            <div class="col lead" style="margin-right: 30px;">

            </div>

            <div class="col lead">

            </div>
        </main>

        <h4>National Ranking</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Today's Metrics</th>
                    <th>Total Score</th>
                </tr>
            </thead>

            <tbody class="table-light">
                <tr>
                    <td>1</td>
                    <td>Why the fuck won't this centralise</td>
                    <td>Some chart hopefully</td>
                    <td>2342</td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Going insane</td>
                    <td>Some chart hopefully</td>
                    <td>2043</td>
                </tr>

                <tr>
                    <td>3</td>
                    <td>Why won't the image become round asdjhgfd</td>
                    <td>Some chart hopefully</td>
                    <td>1489</td>
                </tr>
            </tbody>
        </table>
    </div>

    
</template>

<script>
// Countdown timer
    // Create a string that sets countdown date to every sunday of the week
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var day = d.getDay();

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var x = date + (7 - day);

    var input = months[month] + " " + x + ", " + year + " 23:59:59";
    
   // Set the date we're counting down to
    var countDownDate = new Date(input).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("day").innerHTML = days;
        document.getElementById("hour").innerHTML = hours;
        document.getElementById("min").innerHTML = minutes;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);



</script>