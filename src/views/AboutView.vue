<script setup>
import { defineProps } from 'vue'; // Import defineProps
import WasteSVG from '../assets/waste.svg';
import unsdgSVG from '../assets/unsdg.svg';
import { onMounted } from 'vue';

// Smooth scrolling function
function scrollToSection(sectionId) {
  const targetSection = document.querySelector(`#${sectionId}`);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth',
    });
  }
}

// Set up smooth scrolling on section links
onMounted(() => {
  const sectionLinks = document.querySelectorAll('.section-link');
  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute('href').slice(1);
      scrollToSection(sectionId);
    });
  });
});

const props = defineProps(); // Define props

</script>
<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <main class="about-page">
    <!-- THE PROBLEM section -->
    <section class="section" id="the-problem">
      <div class="container">
        <div class="row">
          <div class="col-md-8 p-0">
            <div class="image-container">
              <img :src="WasteSVG" alt="Waste Icon" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="content">
              <h1>THE PROBLEM</h1>
              <!-- Add your existing content here -->
              <div class="container">
                <div class="row">
                  <h2 class="col">
                    20%
                  </h2>
                  <div class="col">
                    Increase in food waste generation over the past decade
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <h2 class="col">
                    744m
                  </h2>
                  <div class="col">
                    Kg of food wasted in 2019 alone
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OUR MISSION section -->
    <section class="section" id="our-mission">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h1>OUR MISSION</h1>
            <p>RecipeDaddy addresses this issue by leveraging generative AI to provide you with creative recipes, ensuring
              that the ingredients are put to good use before they spoil. By doing so, we contribute to the reduction of
              overall food wastage in Singapore, aligning with the United Nations Sustainable Development Goal 12.</p>
          </div>
          <div class="col-md-6">
            <img :src="unsdgSVG" alt="UNSDG logo" id="unsdg">
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT US section -->
    <section class="section" id="about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>ABOUT US</h1>
            <p>We are a group of individuals from SMU who are inspired to effect a change in the environment!
              Our main goal is to reduce environmental waste and be greener.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MEET THE TEAM section -->
    <section class="section" id="meet-the-team">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>MEET THE TEAM</h1>

            <!-- Card container with three columns -->
            <div class="row team-cards">
              <!-- BS card: Start -->
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                  <img src="..." class="card-img-top" alt="sean">
                  <div class="card-body">
                    <h5 class="card-title">Sean Yap</h5>
                    <p class="card-text">Cool cool cool cool.</p>
                  </div>
                  <div class="card-body">
                    <!-- GitHub logo link -->
                    <a href="https://github.com/your-github-profile" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <!-- BS card: End -->

              <!-- Repeat the card for two more team members -->
              <!-- BS card: Start -->
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                  <img src="..." class="card-img-top" alt="huixuan">
                  <div class="card-body">
                    <h5 class="card-title">Hui Xuan</h5>
                    <p class="card-text">Cool cool cool cool.</p>
                  </div>
                  <div class="card-body">
                    <!-- GitHub logo link -->
                    <a href="https://github.com/your-github-profile" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <!-- BS card: End -->

              <!-- BS card: Start -->
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                  <img src="../assets/syahmim.jpg" class="card-img-top" alt="syahmim">
                  <div class="card-body">
                    <h5 class="card-title">Syahmim</h5>
                    <p class="card-text">Cool cool cool cool.</p>
                  </div>
                  <div class="card-body">
                    <!-- GitHub logo link -->
                    <a href="https://github.com/your-github-profile" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <!-- BS card: End -->
            </div>

            <!-- Additional two team members -->
            <div class="row team-cards">
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                  <img src="..." class="card-img-top" alt="sean">
                  <div class="card-body">
                    <h5 class="card-title">Gabriel Loh</h5>
                    <p class="card-text">Cool cool cool cool.</p>
                  </div>
                  <div class="card-body">
                    <!-- GitHub logo link -->
                    <a href="https://github.com/your-github-profile" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                  <img src="..." class="card-img-top" alt="sean">
                  <div class="card-body">
                    <h5 class="card-title">Lim Jun Kai</h5>
                    <p class="card-text">Cool cool cool cool.</p>
                  </div>
                  <div class="card-body">
                    <!-- GitHub logo link -->
                    <a href="https://github.com/your-github-profile" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- Card container ends -->
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

.image-container {
  height: 100vh;
  /* Set the height to the full viewport height */
  overflow: hidden;
  padding-left: 0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Make the image cover the entire container */
}

.content {
  padding: 3rem;
}



#unsdg {
  width: 200px;
  height: 200px;
}

.section-link {
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.section-link:hover {
  color: #0056b3;
}
</style>
