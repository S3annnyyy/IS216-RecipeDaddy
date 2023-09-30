<template>
    <div class="navbar" :class="{ scrolled: scrolledPastVideo }">
        <router-link class="logo" :to="{ name: 'home' }">
            <img src="../assets/logo.png" alt="website-logo" style="max-width: 200px;">
        </router-link>
  
        <div class="section">
            <router-link
                v-for="(el, i) in contents"
                :key="i"
                :to="{ path: el.link }"
                class="button">
                <span class="text" :class="{ scrolled: scrolledPastVideo }">{{ el.textName }}</span>
            </router-link>
  
            <div class="profile"  :class="{ scrolled: scrolledPastVideo }" v-if="isLoggedIn">
                <span class="material-icons">account_circle</span>
            </div>
            <div class="profile" v-else>
                <LoginModal :class="{ scrolled: scrolledPastVideo }"/>
            </div>
        </div>

        <!-- Mobile navigation bar -->
        <button class="menu-toggle" @click="toggleMenu">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" class="menu-icon" :class="{ open: isMenuOpen }">
                <path d="M22 6H2V4h20v2zM2 13h16v-2H2v2zm0 7h20v-2H2v2z"></path>
            </svg>
        </button>
        <div class="mobile-menu" :class="{ open: isMenuOpen }">
            <router-link
                v-for="(el, i) in contents"
                :key="i"
                :to="{ path: el.link }"
                class="mobile-button">
                <span class="text" :class="{ scrolled: scrolledPastVideo }">{{ el.textName }}</span>
            </router-link>

            <div class="profile" :class="{ scrolled: scrolledPastVideo }" v-if="isLoggedIn">
                <span class="material-icons">account_circle</span>
            </div>
            <div class="profile" v-else>
                <LoginModal :class="{ scrolled: scrolledPastVideo }"/>
            </div>
        </div>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import LoginModal from './LoginModal.vue';

    const isLoggedIn = ref(false); // placeholder for backend 
    const contents = [
    { textName: 'Home', icon: 'home', link: '/' },
    { textName: 'About', icon: 'visibility', link: '/about' },
    { textName: 'Team', icon: 'group', link: '/team' },
    { textName: 'Contact Us', icon: 'email', link: '/contact' }
    ]; // routing contents + icons for navigation bar
    const scrolledPastVideo = ref(false); // Initialization for navbar video scroll navigation transition
    const isMenuOpen = ref(false); // Initialization for Mobile Navigation bar

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    // This code segment depicts the Navbar scroll navigation transition
    // Colour of text + loginModal in navbar changes colour once scrolled past the video element
    // handleScroll() function retrieves video id element and checks if scroll pixel is nearing bottom or null
    // Condition fulfilled will change scrolledPastVideo boolean indicator
    onMounted(() => {window.addEventListener('scroll', handleScroll);});
    onBeforeUnmount(() => {window.removeEventListener('scroll', handleScroll);});
    const handleScroll = () => {
    var videoElement = document.getElementById("video-obj")
    if (videoElement.getBoundingClientRect().bottom <= 100 || videoElement == null) {
        scrolledPastVideo.value = true
    } else if (videoElement.getBoundingClientRect().bottom >= 0) {
        scrolledPastVideo.value = false
        }
    };
</script>
  
<style scoped>
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        position: fixed;
        padding: 0.5rem calc(2rem + 32px);
        z-index: 99;

        transition: background-color border-bottom  0.3s ease;
    }

    .material-icons {
        font-size: 1.5rem;
        color: var(--white);
    }

    .logo {
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    .logo img {
        max-width: 200px;
    }

    .section {
        display: flex;
        align-items: center;
    }

    .button {
        text-decoration: none;
        margin: 0 15px;
        display: flex;
        align-items: center;
    }

    .button .material-icons {
        margin-right: 5px;
    }   

    .text {
        color: var(--light);
        transition: color 0.3s ease; 
    }

    .text.scrolled, .profile.scrolled {
        color: var(--dark);
    }

    .navbar.scrolled {
        background-color: var(--light);
        border-bottom: 2px solid var(--border-grey);
    }

    .profile {
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    

    /* Mobile Navigation styling portion */
    .menu-toggle {
        display: none; 
    }

    .mobile-menu {
        position: fixed;
        display: none;
        flex-direction: column;
        background-color: var(--dark);
        transition: right 0.3s ease-out;

        top: 4rem;
        right: -30rem;
        width: 80%;
        min-height: 100vh;
    }

    .mobile-menu.open {
        display: flex;
        right: 0;
    }

    .mobile-button {
        text-decoration: none;
        margin: 0 15px;
        display: flex;
        align-items: center;
        padding: 10px;
    }

    .menu-icon {
        transition: transform 0.3s ease;
        filter: invert(93%) sepia(7%) saturate(160%) hue-rotate(174deg) brightness(104%) contrast(95%);
    }

    .menu-icon.open {
        transform: rotate(180deg);
    }

    /* Add media query for mobile responsiveness */
    @media (max-width: 768px) {
        .navbar {
            padding: 1rem calc(0.5rem + 32px);;
        }
        .menu-toggle {
            display: block; /* Display the menu button on smaller screens */
        }

        .section {
            display: none; /* Hide the desktop menu items on smaller screens */
        }
    }
</style>
  