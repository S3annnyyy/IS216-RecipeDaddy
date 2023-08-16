<script setup>
    import { ref } from 'vue'
    import LoginModal from './LoginModal.vue';

    // placeholder until backend is implemented
    const isLoggedIn = ref(false)
</script>

<template>
    <div class="navbar">
        <router-link class="logo" :to="{ name: 'home' }">
            <img src="../assets/logo.svg" alt="placeholder-logo">
        </router-link>
        <div class="search-bar">
        <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value="" />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <span class="material-icons">search</span>
        </button>
        </div>
        <div class="profile" v-if="isLoggedIn">
            <span class="material-icons">account_circle</span>
        </div>
        <div class="profile" v-else>
            <LoginModal />
        </div>
    </div>
</template>

<style scoped>
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        width: 100vw;
        height: calc(1rem + 32px);
        position: fixed;
        padding: 0 calc(1rem + 32px);
        background-color: var(--light);
        z-index: 99;
    }

    .logo {
        margin: 5px;
        width: 2rem;
    }

    .search-bar {
        width: 48%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #searchQueryInput {
    width: 100%;
    height: 2.5rem;
    outline: none;
    border: none;
    border-radius: 1.625rem;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1rem;
    }

    #searchQuerySubmit {
    border-radius: 0 1.625rem 1.625rem 0;
    width: 3.5rem;
    height: 2.5rem;
    margin-left: -3.5rem;
    outline: none;
    border: none;
    }

    #searchQuerySubmit:hover {
    cursor: pointer;
    }

    .material-icons {
        font-size: 1.5rem;
    }
</style>