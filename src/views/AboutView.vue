<script setup>
import { defineProps } from 'vue'; // Import defineProps
import WasteSVG from '../assets/waste.svg';
import unsdgSVG from '../assets/unsdg.svg';
import { useMotion } from '@vueuse/motion'
import { ref, computed, onMounted } from 'vue'

const template = {
  initial: {
    opacity: 0,
    y: 100
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 800,

    }
  }
}
const targetEl = ref()
const targetEl2 = ref()
const targetEl3 = ref()
const targetEl4 = ref()

useMotion(targetEl, template)
useMotion(targetEl2, template)
useMotion(targetEl3, template)
useMotion(targetEl4, template)

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
  <main class="about-page">
    <!-- THE PROBLEM section -->

    <section class="section" id="the-problem" :class="target" ref="targetEl">
      <div class="container mx-0 p-0">
        <div class="row">
          <div class="col-md-8 p-0">
            <div class="image-container">
              <img :src="WasteSVG" alt="Waste Icon" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="content p-0">
              <!-- Add your existing content here -->
              <div class="container">
                <div class="row">
                  <div class="col">
                    <h1 style="font-size: 75px;width: 100%;">THE PROBLEM</h1>
                  </div>
                </div>
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    20%
                  </h2>
                  <div class="col">
                    Increase in food waste generation over the past decade
                  </div>
                </div>
              </div>

              <div class="row mt-5">
                <h2 class="col" style="font-size: 50px;font-weight: 900;">
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
    </section>

    <!-- OUR MISSION section -->
    <section class="section" id="our-mission" :class="target" ref="targetEl2">
      <div class="container mt-5 p-3">
        <div class="row" style="flex-wrap: nowrap;">
          <div class="col-md-6 mx-3">
            <h1 class="p-3" style="font-size: 75px;width: 100%;">OUR MISSION</h1>
            <p>RecipeDaddy addresses this issue by leveraging generative AI to provide you with creative recipes, ensuring
              that the ingredients are put to good use before they spoil. By doing so, we contribute to the reduction of
              overall food wastage in Singapore, aligning with the United Nations Sustainable Development Goal 12.</p>
          </div>
          <div class="col-md-6 order-md-12 mt-5" style="margin-left: 50px">
            <img :src="unsdgSVG" style="width:fit-content;" alt="UNSDG logo" id="unsdg">
          
          </div>
        </div>
      </div>
    </section>


    <!-- ABOUT US section -->
    <section class="section" id="about-us" :class="target" ref="targetEl3">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="text-center" style="font-size: 60px;margin-top: 60px;">ABOUT US</h1>
            <p class="text-center mt-5 mb-5">We are a group of individuals from SMU who are inspired to effect a change in the environment!
              <br>Our main goal is to reduce environmental waste and be greener.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MEET THE TEAM section -->
    <section class="section pb-5" id="meet-the-team" :class="target" ref="targetEl4">
      <div class="container pb-5">
        <div class="row pb-5">
          <div class="col-md-12">
            <h1 class="text-center p-5" style="font-size: 75px;">MEET THE TEAM</h1>

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
                  <img src="..." class="card-img-top" alt="syahmim">
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
