<style scoped>
 .card {
        border-radius: 15px;
  }

  /* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
  
</style>

<template>

  <h3 class="pt-3">Dashboard</h3>

  <div class="row mb-4">
    <div class="col card-group">
      <!-- Start: Goals --> 
      <div class="card"> 
        <div class="card-body">

          <div v-if="goalSet==false">
            <h4 class="card-title">Set your Goals today!</h4>
            <img src="../assets/goal.png" style="width:100px; height:auto">
            <p class="card-text">Contribute to a more sustainable and eco-friendly lifestyle by setting a goal for yourself! Indicate how many grams of food you want to save by the end of each month!</p>
            <input type="number" placeholder="Grams of food" style="width: 250px;" v-model="goals">  
            <button class="btn btn-primary" @click="setGoal">Set Goal</button> 
          </div>

          <div v-else>
            <h4 class="card-title">Goal</h4>
            <p class="card-text">
              Your goal this month: {{ goals }} <br>
              You have saved: <br>
              
              <button class="btn" @click="editGoal">Edit Goal</button>
            </p>
          </div>
           
        </div> 
      </div> 
      <!-- End: Goals --> 
    </div>

    <div class="col card-group">
      
       <!-- BS card: Start --> 
       <div class="card" style="width: 18rem;"> 
           <div class="card-body"> 
               <h5 class="card-title">Card title</h5> 
               <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
           </div> 
           
           
       </div> 
       <!-- BS card: End --> 
      
    </div>
  </div>


  <h4>Your Analytics</h4>

  <div class="row mb-4">

    <div class="tab">
      <button class="tablinks" active @click="openGraph($event, 'month')">Month</button>
      <button class="tablinks" @click="openGraph($event, 'year')">Year</button>
    </div>

    <div id="month" class="tabcontent">
      <canvas id="monthChart" style="width:100%;max-width:700px"></canvas>
    </div>

    <div id="year" class="tabcontent">
      <canvas id="yearChart" style="width:100%;max-width:700px"></canvas>
    </div>


  </div>


  <h4>Today's News on the Climate</h4>

  <div class="row">
    <div class="col-lg-10 mx-auto">
      <!-- Start: News carousel --> 
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item" v-for="(post, index) in news" :key="index" :class="{ active: index === 0 }">

            <a :href="post.url" target="_blank">
              <img :src="post.thumbnail" class="d-block w-100" alt="...">
            </a>
            
            <div class="carousel-caption">
              <h5>{{ post.title }}</h5>
              <p>{{ post.abstract }}</p>
            </div>

          </div>
        </div>


        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"> 
          <span class="carousel-control-prev-icon" aria-hidden="true"></span> 
          <span class="visually-hidden">Previous</span> 
        </button> 

        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">  
          <span class="carousel-control-next-icon" aria-hidden="true"></span> 
          <span class="visually-hidden">Next</span> 
        </button> 

      </div> 
      <!-- End: News carousel --> 
    </div>
  </div>
  

 
   
</template>

<script>

  import axios from 'axios';
  import Chart from 'chart.js/auto';

  export default {
    data () {
      return {
        news: [],
        goals: 0,
        goalSet: false
      };
    },
    mounted () {
      const apikey = "TuFXqFiib4B8EKZzgUbOM6CH9UNIxMYr";

      const extractImage = (post) => {
        const defaultImg = {
          url: "http://placehold.it/210x140?text=N/A",
          caption: post.title,
        };

        if (!post.multimedia) {
          return defaultImg;
        }

        let imgObj = post.multimedia.find(
          media => media.format === "threeByTwoSmallAt2X"
        );

        return imgObj ? imgObj : defaultImg;
      };

      axios.get(`https://api.nytimes.com/svc/topstories/v2/climate.json?api-key=${apikey}`)
      .then(response => {
        var news = response.data.results;
        let posts = news.map(post => ({
                    title: post.title,
                    abstract: post.abstract,
                    url: post.url,
                    thumbnail: extractImage(post).url, 
                    caption: extractImage(post).caption
                  }));

        this.news = posts;
      });

      
      this.createGraph();
      


      
      
    },
    methods: {
      setGoal() {
        if (this.goals != 0) {
          this.goalSet = true;
        }
      },
      editGoal() {
        this.goalSet = false;
      },

      openGraph(evt, graph) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");

        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(graph).style.display = "block";
        evt.currentTarget.className += " active";
      },

      createGraph() {
        // month graph
        var x1Values = ["Italy", "France", "Spain", "USA", "Argentina"];
        var y1Values = [55, 49, 44, 24, 15];
        var barColors = ["red", "green","blue","orange","brown"];

        new Chart("monthChart", {
          type: "bar",
          data: {
            labels: x1Values,
            datasets: [{
              backgroundColor: barColors,
              data: y1Values
            }]
          },
          options: {
            legend: {display: false},
            title: {
              display: true,
              text: "World Wine Production 2018"
            }
          }
        });

        // year graph
        var x2Values = ["Italy", "France", "Spain", "USA", "Argentina"];
        var y2Values = [55, 49, 44, 24, 50];
        var barColors = ["red", "green","blue","orange","brown"];

        new Chart("yearChart", {
          type: "bar",
          data: {
            labels: x2Values,
            datasets: [{
              backgroundColor: barColors,
              data: y2Values
            }]
          },
          options: {
            legend: {display: false},
            title: {
              display: true,
              text: "World Wine Production 2018"
            }
          }
        });
      },

      updateGraph() {
        const now = new Date();
        let day = now.getDay();
        let month = now.getMonth();
        let date = now.getDate();

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // find the date of the last day of each month
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
          var lastDay = 31;
        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
          var lastDay = 30;
        } else {
          var lastDay = 29;
        }

        // get variables that i have to retrieve from backend
        var total_saved, x, coordinates;
        /*
          coordinates = {
            monthX: [],
            monthY: [],
            yearX: [],
            yearY: []
          }
        */

        var monthXValues = coordinates.monthX;
        var monthYValues = coordinates.monthY;
        var yearXValues = coordinates.yearX;
        var yearYValues = coordinates.yearY;

        var output = total_saved - x;  // outputs amount saved daily
        x = total_saved; // this needs to be saved in the backend daily

        var total_monthly_saved = 0;
        // populate year on the last day of each month
        if (day == lastDay) {
          for (let value of monthYValues) {
            total_monthly_saved += value;
          }

          yearXValues.push(months[month]);
          yearYValues.push(total_monthly_saved);
        }

        // clear prev month coordinates on the first day of each month
        else if (day == 1 && month != 0) {
          if (monthXValues.length != 0 || monthYValues.length != 0) {
            monthXValues = [];
            monthYValues = [];
          }
        }

        // clear both month and year on the first day of each year
        else if (day == 1 && month == 0) {
          if (monthXValues.length != 0 || monthYValues.length != 0 || yearXValues.length != 0 || yearYValues.length != 0) {
            monthXValues = [];
            monthYValues = [];
            yearXValues = [];
            yearYValues = [];
          }
        }

        // populate month values for the day, checks whether it is the first time user is loading the page that day
        const currentDate = new Date().toISOString().split('T')[0];
        const storedDate = localStorage.getItem('lastDate');

        if (currentDate !== storedDate) {
          localStorage.setItem('lastDate', currentDate);
          monthXValues.push(date);
          monthYValues.push(output);
        } else {
          monthYValues.pop();
          monthYValues.push(output);
        }
        
      }



    }
  };



    
</script>