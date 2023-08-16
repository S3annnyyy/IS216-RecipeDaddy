<script setup>

</script>

<template>
  <div class="app">

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
    --dark-alt: #334155;
    --light: #f1f5f9;
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
  }

  button {
    cursor: default;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  .app {
    display: flex;
  }
</style>
