<script setup>
import { ref } from 'vue'

// saving state of user interaction eg expanded menu > refreshed > remains
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}

// iteration list for sidebar content
const contents = [
    {textName: 'Home', icon: 'home', link: "/"},
    {textName: 'About', icon: 'visibility', link: "/about"},
    {textName: 'Team', icon: 'group', link: "/team"},
    {textName: 'Contact Us', icon: 'email', link: "/contact"}
]
</script>

<template>
  <aside :class="`${is_expanded ? 'is-expanded': ''}`">
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="menu-icon" data-menu="true" data-open="false"><path d="M22 6H2V4h20v2zM2 13h16v-2H2v2zm0 7h20v-2H2v2z"></path></svg>
      </button>
    </div>
    
    <div class="menu">
      <router-link 
        v-for="(el, i) in contents"
        :key="i"
        :to="{ path: el.link }"
        class="button">
        <span class="material-icons">{{ el.icon }}</span>
        <span class="text">{{ el.textName }}</span>
      </router-link>
    </div>

    <div class="flex"></div>
      <div class="menu">
      <router-link class="button" to="/settings">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
      </div>
  </aside>
</template>

<style scoped>
  aside {
    /* ensures sidebar sticks upon scroll */
    position: fixed;
    z-index: 99;

    display: flex;
    flex-direction: column;
    width: calc(1rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;

    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;

    .flex {
      flex: 1 1 0%;
    }

    .menu-toggle-wrap {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2rem;

      position: relative;
      top: 0;
      left: .4rem;
      transition: 0.2s ease-out;

      .menu-toggle {
      transition: 0.2s ease-out;

      .menu-icon {
        transition: 0.2s ease-out;
        filter: invert(93%) sepia(7%) saturate(160%) hue-rotate(174deg) brightness(104%) contrast(95%);
        font-size: 1.5rem;
      }

      &:hover {
        .menu-icon {
          filter: invert(69%) sepia(82%) saturate(383%) hue-rotate(159deg) brightness(105%) contrast(96%);
        }
      }
    }
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 1.5rem;
        color: var(--light);
        transition: 0.2 ease-out;
      }

      .text {
        opacity: 0;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: var(--primary);
        }
      }
    }
  }

  .router-link-exact-active {
      border-right: 3px solid var(--primary);
    }

  &.is-expanded {
      width: var(--sidebar-width);

      .menu-toggle-wrap {
        .menu-toggle {
          transform: rotate(-180deg);
        }
      }

      .button {
        .text {
          opacity: 1;
        }
        .material-icons {
          margin-right: 1rem;
        }
      }
    }
  }
</style>