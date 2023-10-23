<style scoped>
    .card {
        border-radius: 15px;
    }

    .countdown-label {
        font-size: 12px;
        color: #545454;
    }

    .countdown-numbers {
        font-size: 30px;
        font-weight: bold;
    }

    .countdown-header {
        font-size: 18px;
        font-weight: bold;
        word-wrap: normal;
    }

    main {
        margin-left: 25px;
        margin-right: 25px;
    }
</style>

<template>
<main>

    <h3 class="pt-3">Leaderboard</h3>

    <div class="row mb-4 d-flex justify-content-center">

        <!-- Start: Joined members card --> 
        <div class="col-lg-3 col-md-6 col-sm-12 card-group">
            <div class="card"> 
                <div class="card-body"> 
                    <img src="../assets/members.png" width="50px" height="auto">
                    <p class="card-text mt-3 mb-1" style="color: #545454;">Joined members</p>
                    <span style="font-size: 20px; font-weight: bold;">325+</span>
                </div> 
            </div> 
        </div>
        <!-- End: Joined members card -->

        
        <!-- Start: Personal metrics --> 
        <div class="col-lg-3 col-md-6 col-sm-12 card-group">
            <div class="col card">
                <div class="card-body"> 
                    <img src="../assets/members.png" width="50px" height="auto">
                    <p class="card-text mt-3">
                        You saved
                        <span style="font-size: 20px; font-weight: bold;">57g</span>
                        of food today!
                    </p>
                </div> 
            </div> 
        </div>
        <!-- End: Personal metrics -->
        

        <!-- Start: Countdown timer --> 
        <div class="col-lg-6 col-md-12 col-sm-12 card-group">
            <div class="col card"> 
                <div class="card-body"> 
                    
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 countdown-header">
                            Remaining time to completion 🔥
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="row text-center gx-0 pb-4">
                                <div class="col-3">
                                    <span id="day" class="countdown-numbers"></span>
                                    <div class="countdown-label">DAYS</div>
                                </div>

                                <div class="col-1">
                                    <span style="font-size: 35px; font-weight: bold;">:</span>
                                </div>

                                <div class="col-3">
                                    <span id="hour" class="countdown-numbers"></span>
                                    <div class="countdown-label">HOURS</div>
                                </div>

                                <div class="col-1">
                                    <span style="font-size: 35px; font-weight: bold;">:</span>
                                </div>

                                <div class="col-3">
                                    <span id="min" class="countdown-numbers"></span>
                                    <div class="countdown-label">MINUTES</div>
                                </div>
                            </div>  
                        </div>

                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <img src="../assets/members.png" width="50px" height="auto">
                        </div>
                    </div>
                    

                    <div class="row" style="border-top: 0.5px solid #545454;">
                        <span class="px-2 pt-1" style="font-size: 15px; color: #545454;">
                            Rewards are given to only the top 3 users each week.
                        </span>
                    </div>
                </div> 
            </div> 
        </div>
        <!-- End: Countdown timer -->

    </div>


    <h4>Current leaders</h4>

    <div class="row mb-4 card-group d-flex justify-content-center">

        <!-- Start: First place --> 
        <div class="col-lg-4 col-md-12 col-sm-12">
             <div class="card"> 
                 <div class="card-body"> 
                    <img src="../assets/profile.png" width="100px" height="auto">
                    <h5 class="card-title d-inline">Ilovecooking124</h5>
                    <p class="card-text">Total score: 2149</p>  
                 </div> 
             </div> 
        </div>
        <!-- End: First place -->

        <!-- Start: Second place --> 
        <div class="col-lg-4 col-md-6 col-sm-12">
             <div class="card"> 
                 <div class="card-body"> 
                    <img src="../assets/profile.png" width="100px" height="auto">
                    <h5 class="card-title d-inline">ChefAlberto</h5>
                    <p class="card-text">Total score: 2203</p> 
                 </div> 
             </div> 
        </div>
        <!-- End: Second place -->

        <!-- Start: Third place --> 
        <div class="col-lg-4 col-md-6 col-sm-12">
             <div class="card"> 
                 <div class="card-body"> 
                    <img src="../assets/profile.png" width="100px" height="auto">
                    <h5 class="card-title d-inline">KingBob</h5>
                    <p class="card-text">Total score: 2003</p>  
                 </div> 
             </div> 
        </div>
        <!-- End: Third place -->

    </div>


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

        <tbody>
            <tr>
                <td>1</td>
                <td>I💗cooking124</td>
                <td>Some chart hopefully</td>
                <td>2149</td>
            </tr>

            <tr>
                <td>2</td>
                <td>ChefAlberto</td>
                <td>Some chart hopefully</td>
                <td>2203</td>
            </tr>

            <tr>
                <td>3</td>
                <td>KingBob</td>
                <td>Some chart hopefully</td>
                <td>2003</td>
            </tr>

            <tr>
                <td>4</td>
                <td>KingBob</td>
                <td>Some chart hopefully</td>
                <td>2003</td>
            </tr>

            <tr>
                <td>5</td>
                <td>KingBob</td>
                <td>Some chart hopefully</td>
                <td>2003</td>
            </tr>

            <tr>
                <td>6</td>
                <td>KingBob</td>
                <td>Some chart hopefully</td>
                <td>2003</td>
            </tr>
        </tbody>
    </table>
    
</main>
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

    if (day != 0) {
        var x = date + (7 - day);
    } else {
        var x = date;
    }
    

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
        // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
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