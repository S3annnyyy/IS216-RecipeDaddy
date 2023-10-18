<script setup>
  import Navbar from './components/NavBar.vue'
  
</script>

<template>
  <div class="app">
    <div class="container-fluid">
      <div class="row sticky-top">
        <Navbar v-if="$route.meta.hideNavbar !== true"/>
      </div>
      <router-view/>
    </div>
    
  </div>
</template>

<style>
  /* main app styling for all pages */
  :root {
    --primary: #68e2fa;
    --primary-alt: #00c3ea;
    --primary-alt2: #cff7ff;
    --blur-color-scheme: #00000066;
    --dark: #1e293b;
    --dark-svg: invert(13%) sepia(22%) saturate(975%) hue-rotate(177deg) brightness(101%) contrast(95%);
    --dark-alt: #334155;
    --light: #f1f5f9;
    --light-svg:invert(93%) sepia(7%) saturate(160%) hue-rotate(174deg) brightness(104%) contrast(95%); 
    --text-light-primary: #fff;
    --text-light-secondary: #9ca2a8;
    --sidebar-width: 300px;
    --grey: #9ca2a8;
    --red: #ff0000;
    --border-grey: #cacaca;
    --spacing: 0.3px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--light);
    overflow-x: hidden;
  }

  button {
    cursor: default;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  /* .app {
    display: flex;
  } */

  /* custom scroll-bar */
  body::-webkit-scrollbar {
    width: 12px;
  }

  body::-webkit-scrollbar-track {
    background: var(--light);
  }

  body::-webkit-scrollbar-thumb {
    background: var(--grey);
    border-radius: 1.625rem;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box
  }
</style>
