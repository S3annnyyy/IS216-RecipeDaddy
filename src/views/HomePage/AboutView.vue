<script setup>
import { defineProps } from 'vue'; // Import defineProps
import WasteSVG from '../../assets/waste.svg';
import unsdgSVG from '../../assets/unsdg.svg';
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
const targetEl = ref(null)
const targetEl2 = ref(null)
const targetEl3 = ref(null)
const targetEl4 = ref(null)

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

import SeanPortrait from "../../assets/portraits/sean.jpg"
import SyahmimPortrait from "../../assets/portraits/syahmim.jpg"
import GabrielPortrait from "../../assets/portraits/gabriel.jpg"
import JunKaiPortrait from "../../assets/portraits/junkai.jpg"
import HuixuanPortrait from "../../assets/portraits/huixuan.jpg"
import TheGodFather from "../../assets/portraits/chatgpt.png"

var people = [
  {name: "Sean Yap", imageSrc: SeanPortrait, about: "Y2 Information Systems Major", desc: '"You this read wrong."', githubLink: "https://github.com/S3annnyyy",linkedinLink: "https://www.linkedin.com/in/seanyckang/"},
  {name: "Neo Hui Xuan", imageSrc: HuixuanPortrait, about: "Y2 Information Systems Major", desc: '"I like to use vim"', githubLink: "https://github.com/huiixuan", linkedinLink: "https://www.linkedin.com/in/neo-hui-xuan-22928226b/"},     
  {name: "Syahmim Chukhan", imageSrc: SyahmimPortrait, about: "Y2 Software Engineering Major", desc: '"I am the carry"', githubLink: "https://github.com/syahmimscs", linkedinLink: "https://www.linkedin.com/in/syahmim-chukhan/"}, 
  {name: "Gabriel Loh", imageSrc: GabrielPortrait, about: "Y2 Software Engineering Major", desc: '"Dun cry because it happened smile because its over"', githubLink: "https://github.com/weeiner", linkedinLink: "https://www.linkedin.com/in/gabriel-loh-75053722a/"}, 
  {name: "Lim Jun Kai", imageSrc: JunKaiPortrait, about: "Y2 Software Engineering Major", desc: '"I hate frontend"', githubLink: "https://github.com/ljlimjk10", linkedinLink: "https://www.linkedin.com/in/lim-jun-kai-4a9633214/"}, 
  {name: "ChatGPT", imageSrc: TheGodFather, about: "Overworked LLM robot", desc: '"I was the real carry"', githubLink: "https://github.com/openai", linkedinLink: "https://www.linkedin.com/company/openai/"}, 
]

</script>


<template>
  <main class="about-page">
    <!-- THE PROBLEM section -->

    <section class="section" id="the-problem" :class="target" ref="targetEl">
      <div class="container mx-0 p-0">
        <div class="row">
          <div class="col-md-8 p-0">
            <div class="image-container d-none d-md-block">
              <img :src="WasteSVG" alt="Waste Icon" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="content p-0">
              <!-- Add your existing content here -->
              <div class="container">
                <div class="row d-flex justify-content-center">
                  <div class="col-12">
                    <h1 style="font-size: 4rem;width: 100%;">THE PROBLEM</h1>
                  </div>
                </div>
                <!-- Item 1 -->
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    20%
                  </h2>
                  <div class="col">
                    Increase in food waste generation over the past decade
                    asdas
                  </div>
                </div>
                <!-- Item 2 -->
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    744
                  </h2>
                  <div class="col">
                    Kg of food wasted in 2019 alone
                  </div>
                </div>
                <!-- Item 3 -->
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    144 
                  </h2>
                  <div class="col">
                    kg of food waste per capita.
                  </div>
                </div>

                <!-- Item 4 -->
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    342
                  </h2>
                  <div class="col">
                    Million dollars lost through food waste
                  </div>
                </div>
                <!-- Item 5 -->
                <div class="row mt-5">
                  <h2 class="col" style="font-size: 50px;font-weight: 900;">
                    40% 
                  </h2>
                  <div class="col">
                    of food waste was still fit for consumption
                  </div>
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
            <h1 class="p-3" style="font-size: 4rem;width: 100%;">Our Mission</h1>
            <p>RecipeDaddy addresses this issue by leveraging generative AI to provide you with creative recipes, ensuring
              that the ingredients are put to good use before they spoil. By doing so, we contribute to the reduction of
              overall food wastage in Singapore, aligning with the United Nations Sustainable Development Goal 12.</p>
          </div>
          <div class="col-md-6 order-md-12 mt-5 d-none d-md-block" style="margin-left: 50px">
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
            <h1 class="text-center" style="font-size: 4rem;margin-top: 60px;">About Us</h1>
            <p class="text-center mt-5 mb-5">We are a group of individuals from SMU who are inspired to effect a change in the environment!
              <br>Our main goal is to reduce environmental waste and be greener.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MEET THE TEAM section -->
    <section class="section pb-5" id="meet-the-team" :class="target" ref="targetEl4">
      <div class="container-fluid pb-5">
        <div class="row pb-5 justify-content-center">
          <div class="col-md-9 col-lg-9 justify-content-center">
            <h1 class="text-center p-5" style="font-size: 75px;">Our Team</h1>            
            <div class="row team-cards">            
            <!-- BS card: Start -->              
              <div class="col-lg-4 col-md-4 d-flex justify-content-center mb-4" v-for="person in people">
                <div class="card shadow" style="width: 18rem;">
                  <img :src="person.imageSrc" class="card-img-top" alt="sean" style="padding: 1rem;">
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ person.name }}</h5>
                    <p class="card-text">{{ person.about }}</p>
                    <p class="card-text">{{ person.desc }}</p>
                  </div>
                  <div class="card-body text-center" style="text-decoration: none;">
                    <!-- GitHub logo link -->
                    <a :href="person.githubLink" class="card-link" target="_blank">
                      <i class="fab fa-github"></i> GitHub
                    </a>
                    <!-- LinkedIn logo link -->
                    <a :href="person.linkedinLink" class="card-link" target="_blank">
                      <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>              
              <!-- BS card: End -->          
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

.card-link {
  text-decoration: none !important; 
}
</style>