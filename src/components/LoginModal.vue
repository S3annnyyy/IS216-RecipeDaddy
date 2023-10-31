<template>
    <div :class="{ scrolled: scrolledPastVideo }">
        <button @click="toggleModal" class="navbar-login-button">
            <span class="material-icons-outlined">account_circle</span>
            Sign in
        </button>
        <Teleport to="body">
            <Transition name="modal">
                <div class="login-modal-bg" v-if="isModalOpen">
                    <div class="login-modal" ref="modal">
                        <span class="material-icons" @click="toggleModal">close</span>
                        <div class='login-form-wrapper'>
                            <form class="login-form" @submit.prevent="handleLogin">
                                <h1 class="login-header">Login</h1>
                                <div class='divider'></div>
                                <div class='form-group'>
                                    <input type="email" placeholder=" " required="required" class='form-control'
                                        v-model='userEmail' v-focus autocomplete="email" />
                                    <label class='form-label'>Your Email</label>
                                </div>
                                <div class='form-group'>
                                    <input type="password" placeholder=" " required="required" class='form-control'
                                        v-model='userPassword' autocomplete="current-password" />
                                    <label class='form-label'>Your Password</label>
                                </div>
                                <div class="button-wrapper">
                                    <button type='submit' class='login-button' name='login'>
                                        <span class="login-button-content">
                                            <svg width="24" height="24" viewBox="0 0 24 24" class="arrow">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z" />
                                            </svg>
                                            Login
                                        </span>
                                    </button>
                                    <router-link class="signup-redirect" :to="{ name: 'signup' }">Create
                                        account</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

// saving state of specific user event loginModal > signup > loginModal
// Implementation allows modal to remain popped up until told to disappear
const isModalOpen = ref(localStorage.getItem("isModalOpen") === "true")
const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
    localStorage.setItem("isModalOpen", isModalOpen.value)
}

const modal = ref(null)
onClickOutside(modal, () => (toggleModal()))

// custom v-focus param <==> autofocus in html input tag 
const vFocus = {
    mounted: (el) => el.focus()
}

// Props parsed from navbar
const props = defineProps({
    scrolledPastVideo: Boolean,
});

// backend essential data
const userEmail = ref("")
const userPassword = ref("")
const authToken = ref("")
const URL = "http://127.0.0.1:8000"

function handleLogin() {
    console.log('Form submitted');

    // retrieve token from backend       
    const requestData = {
        email: userEmail.value,
        password: userPassword.value,
    }

    axios.post(`${URL}/api/token`, requestData)
        .then((res) => {
            authToken.value = res.data.access
            sessionStorage.setItem("AuthToken", authToken.value)
            console.log(authToken.value)
            getUsername()
        })
        .catch((err) => {
            alert("Wrong credentials")
        })
    // RESET INPUT & page
    // userEmail.value = ""
    // userPassword.value = ""
    toggleModal()
}

async function getUsername() {
    console.log(userEmail.value)
    const response = await axios.get(`${URL}/user?email=${userEmail.value}`, {
        headers: {
            Authorization: `Bearer  ${authToken.value}`
        }
    })
    console.log(response.data);
    // extract username 
    const currentUser = response.data.username
    console.log(currentUser)
    // store in sessionstorage
    sessionStorage.setItem("user", currentUser)
    window.location.reload();
}

</script>
  
<style scoped>
.navbar-login-button {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 1rem;
    color: var(--light);
    border: 2px solid var(--border-grey);
    border-radius: .8rem;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    transition: color 0.3s ease;

    .material-icons-outlined {
        padding-right: 0.2rem;
        font-weight: 100;
    }

    /* &:hover {
        background-color: var(--primary-alt2);
       } */
}

.scrolled {
    .navbar-login-button {
        color: var(--dark);
        border: 2px solid var(--dark);
    }

}

.login-modal-bg {
    /* always fix modal to viewport */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* ensures sidebar unclickable when modal is active */
    z-index: 999;

    background-color: var(--blur-color-scheme);
    backdrop-filter: blur(3px);

    display: flex;
    justify-content: center;
    align-items: center;
}

.login-modal {
    /* to position button */
    position: relative;

    background: white;
    padding: 30px 100px;
    border-radius: 1rem;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);

    .material-icons {
        /* put icon in the top right */
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}

/* login form components styling */
.login-form {
    .divider {
        height: 3rem;
        background-color: var(--dark);
        clip-path: polygon(50% 0%, 100% 0, 100% 5%, 17% 5%, 15% 30%, 2% 30%, 0 0);
        opacity: 1;
        animation: fadeInUp 2s 2s;
        animation-fill-mode: forwards;
    }

    .form-group {
        width: 30vmax;
        position: relative;
        font-size: 1.2rem;
        color: var(--grey);

        &+& {
            margin-top: 2.5rem;
        }

        .form-label {
            position: absolute;
            left: 0;
            top: -0.3rem;
            transition: .4s;
        }

        .form-control {
            width: 100%;
            position: relative;
            z-index: 3;
            font-size: 1.2rem;
            background: none;
            border: none;
            padding: 0.5rem;
            transition: .5s;
            border-bottom: 1px solid var(--grey);

            &:not(:placeholder-shown):not(:focus):invalid {
                outline: none;
                box-shadow: 0 1px var(--red);
                border-color: var(--red);

                +.form-label {
                    font-size: 1rem;
                    color: var(--red);
                    transform: translateY(-20px);
                }
            }

            &:focus,
            &:valid {
                outline: none;
                box-shadow: 0 2px var(--primary);
                border-color: var(--primary);

                +.form-label {
                    font-size: 1rem;
                    color: var(--primary);
                    transform: translateY(-20px);
                }
            }
        }
    }
}

.button-wrapper {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .login-button {
        margin-top: 0.8rem;
        padding: 10px 15px;
        letter-spacing: var(--spacing);
        font-size: 1.2rem;
        background: var(--primary);
        color: var(--dark);
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            transition-duration: 0.3s;
        }

        .login-button-content {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;

            .arrow {
                margin-right: 1rem;
            }
        }
    }

    .signup-redirect {
        margin-top: 0.8rem;
        padding: 10px 15px;
        letter-spacing: var(--spacing);
        text-decoration: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--primary-alt);

        &:hover {
            text-decoration: underline;
        }
    }
}</style>