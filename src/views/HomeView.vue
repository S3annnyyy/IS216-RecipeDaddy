<template>
  <main class="row">
    <div class="video-container">
      <video src="../assets/video.mp4" muted loop autoplay class="video-obj" id="video-obj"></video>
    </div>

    <div class="content-container">
      <div>
        <AboutView/>

      </div>

      <div class="target" ref="targetEl">

      </div>

      <div class="target" ref="targetEl2">

      </div>

      <div class="target" ref="targetEl2">

      </div>
    </div>
  </main>
</template>

<script setup>
import { useMotion } from '@vueuse/motion'
import { ref, computed, onMounted } from 'vue'
import AboutView from './AboutView.vue'

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

useMotion(targetEl, template)
useMotion(targetEl2, template)
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

.content-container {
  position: relative;
  padding-top: 100vh;
}
</style>
