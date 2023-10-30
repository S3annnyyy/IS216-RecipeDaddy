<style scoped>

</style>

<template>

  <h3 class="pt-3">Dashboard</h3>

  <div class="row mb-4">
    
    <div class="col">
      <!-- Start: Goals --> 
      <div class="card"> 
        <div class="card-body"> 
          <h4 class="card-title" v-if="goals == 0">Set your Goals today!</h4>
          <h4 class="card-title" v-else>Goal</h4> 

          <p class="card-text" v-if="goals != 0">
            Your goal this month: {{ goals }}g <br>
            You have saved: 383g <br>

            <button class="btn btn-primary">Edit</button>
          </p>

           
        </div> 
      </div> 
      <!-- End: Goals --> 
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

    export default {
      data () {
        return {
          news: [],
          goals: 2348
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
      },
      methods: {
        
      }
    };
</script>