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
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" class="menu-icon" :class="{ open: isMenuOpen, scrolled: scrolledPastVideo }">
                <path d="M22 6H2V4h20v2zM2 13h16v-2H2v2zm0 7h20v-2H2v2z"></path>
            </svg>
        </button>
        <div class="mobile-content" :class="{ open: isMenuOpen }">
            <div class="close-btn" @click="toggleMenu">
                <span class="material-icons">close</span>
            </div>
            <router-link
                v-for="(el, i) in contents"
                :key="i"
                :to="{ path: el.link }"
                class="mobile-button"
                @click="toggleMenu">
                <span class="text">{{ el.textName }}</span>
            </router-link>

            <div class="profile" v-if="isLoggedIn">
                <span class="material-icons">account_circle</span>
            </div>
            <div class="profile" v-else>
                <LoginModal/>
            </div>
        </div>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
    import { useRoute } from 'vue-router'
    import LoginModal from './LoginModal.vue';

    const isLoggedIn = ref(false); // placeholder for backend 
    const contents = [
    { textName: 'Home', icon: 'home', link: '/' },
    { textName: 'Recipe Search', icon: 'visibility', link: '/recipesearch' },
    { textName: 'Meal Prep', icon: 'group', link: '/mealprep' },
    { textName: 'Leaderboard', icon: 'group', link: '/leaderboard' },
    { textName: 'Contact Us', icon: 'email', link: '/contact' }
    ]; // routing contents + icons for navigation bar
    const isMenuOpen = ref(localStorage.getItem("isMenuOpen") === true); // Initialization for Mobile Navigation bar
    const route = useRoute(); // Initialization to access route for navbar video scroll navigation transition
    const scrolledPastVideo = ref(localStorage.getItem("scrolledPastVideo") === true); // Initialization for navbar video scroll navigation transition

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
        localStorage.setItem("isMenuOpen", isMenuOpen.value)
    };

    // This code segment depicts the Navbar scroll navigation transition
    // Comprises of 2 partsL handleScroll() and watch
    // Colour of text + loginModal in navbar changes colour once scrolled past the video element
    // handleScroll() function retrieves video id element and checks if scroll pixel is nearing bottom or null
    // Condition fulfilled will change scrolledPastVideo boolean indicator
    onMounted(() => {window.addEventListener('scroll', handleScroll);});
    onBeforeUnmount(() => {window.removeEventListener('scroll', handleScroll);});
    const handleScroll = () => {
        var videoElement = document.getElementById("video-obj")
        if (videoElement == null || videoElement.getBoundingClientRect().bottom <= 100) {
            scrolledPastVideo.value = true
        } else if (videoElement.getBoundingClientRect().bottom >= 0) {
            scrolledPastVideo.value = false
            }
        localStorage.setItem("scrolledPastVideo", scrolledPastVideo.value)
    };

    // Watch for route changes and set scrolledPastVideo to true for the About page
    // Set to false if it goes to HomePage
    watch(() => route.path, (newPath) => {
        if (newPath === '/home' || newPath === '/') {
            scrolledPastVideo.value = false;
        } else {
            scrolledPastVideo.value = true;
        }
        localStorage.setItem("scrolledPastVideo", scrolledPastVideo.value)
    });
</script>
  
<style scoped>
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
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

    .mobile-content {
        position: fixed;
        flex-direction: column;
        background-color: var(--dark);
        transition: right 0.3s ease-out;
        top: 0;
        right: -300rem;
        width: 80%;
        min-height: 100vh;
        padding: 3rem 1rem 0 1rem;
        &.open {
            display: flex;
            right: 0;
        }
    }

    .close-btn {
        position: absolute;
        right: 0;
        top: 0;
        padding: 1rem 2.6rem 1rem 1rem;

        .material-icons {
        font-size: 2rem;
        }
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
        filter: var(--light-svg)
    }

    .menu-icon.scrolled {
        filter: var(--dark-svg);
    }

    .menu-icon.open {
        transform: rotate(180deg);
    }

    /* Mobile responsiveness */
    @media (max-width: 900px) {
        .navbar {
            padding: 1rem calc(0.5rem + 32px);
            color: var(--light);
        }
        .menu-toggle {
            display: block; /* Display the menu button on smaller screens */
        }
        .section {
            display: none; /* Hide the desktop menu items on smaller screens */
        }
        .router-link-exact-active {
            .text {
                color: var(--primary);
            }
        }
    }
</style> 