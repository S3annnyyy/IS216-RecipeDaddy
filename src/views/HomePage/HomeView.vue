<template>
  <main class="row justify-content-center">
    <div class="video-container">
      <video src="../../assets/video.mp4" muted loop autoplay class="video-obj" id="video-obj"></video>      
      <div class="video-text">
        <WordAnimation />
      </div>       
    </div>

    <div class="content-container">
      <div class="target" ref="targetEl">
        <AboutView/>
      </div>
      <div class="target2" ref="targetEl2">
        <Footer/>
      </div>
    </div>
  </main>
</template>



<script setup>
import { useMotion } from '@vueuse/motion'
import { ref, onMounted } from 'vue'
import AboutView from '../HomePage/aboutview.vue'
import Footer from '../../components/Footer.vue'
import WordAnimation from '../../components/WordAnimation.vue'

const template = {
  initial: {
    opacity: 0,
    y: 100
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 400,
    }
  }
}

const targetEl = ref(null)
// const targetEl2 = ref(null)

useMotion(targetEl, template)
// useMotion(targetEl2, template)
</script>

<style scoped>
.video-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-container video {
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  color: var(--light);  
  text-align: center; 
  width: 100%; 
}

.content-container {
  position: relative;
  padding-top: 100vh;
}
</style>
