<style scoped>
</style>

<script>

    import axios from 'axios';
    const apikey = "TuFXqFiib4B8EKZzgUbOM6CH9UNIxMYr";

    axios.get(`https://api.nytimes.com/svc/topstories/v2/climate.json?api-key=${apikey}`)
    .then(response => {
        console.log(response.data.results)
        var news = response.data.results;
        let posts = news.map(post => ({
                        title: post.title,
                        abstract: post.abstract,
                        url: post.url,
                        // img
                        thumbnail: extractImage(post).url, 
                        caption: extractImage(post).caption,
                        byline: post.byline,
                        published_date: post.published_date,
                    }));

        // var output = "";
        // for (var item of posts) {
            // console.log(item)
            // if (news.indexOf(item) == 0) {
            //     output += "<div class='carousel-item active'>"
            // } else {
            //     output += "<div class='carousel-item'>"
            // }

            // output += `
            //     <img src='${item.thumbnail}' class="d-block w-100" alt="...">
            //     <div class="carousel-caption d-none d-md-block">
            //         <h5>${item.title}</h5>
            //         <p>${item.abstract}</p>
            //     </div>
            // </div>`

        // }

        // document.getElementById("news").innerHTML = output;

    })

    function extractImage(post) {
            const defaultImg = {
                url: "http://placehold.it/210x140?text=N/A",
                caption: post.title,
            }
            if (!post.multimedia) {
                return defaultImg
            }
            let imgObj = post.multimedia.find(
                media => media.format === "threeByTwoSmallAt2X"
            )
            return imgObj ? imgObj : defaultImg
        }
</script>


<template>
    <!-- BS carousel: start --> 
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/food.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/logo.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    <!-- BS carousel: end --> 

</template>