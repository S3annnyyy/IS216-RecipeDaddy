<script setup>
import { ref } from 'vue';

// placeholder while backend is being implemented
const signUpEmail = ref("");
const name = ref("");
const signUpPw = ref("");

function handleSignUp() {
    console.log('form submitted');
}

</script>

<template>
    <main>
        <section class="section-signup" v-cloak>
            <div class="section-main">
                <div class="section-signup-1">
                    <div class="section-signup-1-main">
                        <h1 class="section-signup-1-title">Name Placeholder</h1>
                        <p class="section-signup-1-text">text placeholder</p>
                        <div class="section-signup-1-img">
                            <img src="../assets/mockup_signup.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="section-signup-2">
                    <div class="section-signup-2-main">
                        <h1 class="section-signup-2-title">Sign Up</h1>
                            <form class="section-signup-2-form" @submit.prevent="handleSignUp">
                                <div class="signup-form">
                                    <div class='divider'></div>
                                    <div class="form-group">
                                        <input type="email" id="input-email" class="form-control" placeholder=" " required v-model="signUpEmail">
                                        <label for="input-email" class="form-label">Your Email</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="input-name" class="form-control" placeholder=" " required v-model="name">
                                        <label for="input-name" class="form-label">Your Full Name</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" id="input-password" class="form-control" placeholder=" " required v-model="signUpPw">
                                        <label for="input-password" class="form-label">Your Password</label>
                                    </div>
                                    <div class="form-group">
                                        <p><input type="checkbox" id="input-checkbox"> By creating an account, you agree to the 
                                            <router-link class="terms-conditions" :to="{path: '/PlAcEhOlDeR'}">Terms & Conditions.</router-link>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                        <button class="signup-button">Create an Account</button>
                                    </div>
                                    <div class="form-group">
                                        <p>Already have an account? 
                                            <router-link class="signin" :to="{ name: 'home'}">Sign in</router-link>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                        <p><router-link :to="{name: 'home'}" class="link"><span class="material-icons">home</span></router-link></p>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

img {
  width: 100%;
  display: block;
}
.section-signup {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.section-main {
    width: 60%;
    height: auto;
    display: flex;
}

.section-signup-1, .section-signup-2 {
    background: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.section-signup-1-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-top: 50px;
    width: 100%;
    height: 100%;
}

.section-signup-1-title {
    font-size: 2rem;
    color: var(--text-light-primary);
}

.section-signup-1-text {
    font-size: 1rem;
    color: var(--text-light-secondary);
}

.section-signup-2-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 50px;
    background: var(--text-light-primary);
}

.section-signup-2-title {
    font-size: 2rem;
}

.section-signup-2-form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-top: 30px;
}

.signup-form {
    .divider {
        height: 3rem;
        background-color: var(--dark);
        clip-path: polygon(50% 0%, 100% 0, 100% 5%, 17% 5%, 15% 30%, 2% 30%, 0 0);
        opacity: 1;
        animation: fadeInUp 2s 2s;
        animation-fill-mode: forwards;
        }
    .form-group {
        position: relative;
        font-size: 1.2rem;
        &+& {
            margin-top: 2.5rem;
        }
        
    }

    .form-label {
        position: absolute;
        left: 0;
        top: -0.3rem;
        transition: .4s;
        font-weight: 500;
        font-size: 15px;
    }

    .form-control{
            width: 100%;
            position: relative;
            z-index: 3;
            font-size: 1.2rem;
            background: none;
            border:none;
            padding: 0.5rem ;
            transition: .5s;
            border-bottom: 1px solid var(--grey);

            &:not(:placeholder-shown):not(:focus):invalid {
            outline: none;
            box-shadow: 0 1px var(--red);
            border-color: var(--red);
            + .form-label{
                font-size: 1rem;
                color: var(--red);
                transform: translateY(-20px);
                }
            }
            &:focus, &:valid{
            outline: none;
            box-shadow: 0 2px var(--primary);
            border-color: var(--primary);
            + .form-label{
                font-size: 1rem;
                color:  var(--primary);
                transform: translateY(-20px);
                }   
            }
        }
}

.signup-button {
    background: var(--primary);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
    padding: 1rem;
    width: 100%;
    outline: none;
    border: 0;
    font-size: 1rem;
    cursor: pointer;  
}

.material-icons {
    color: var(--dark);
}

/* for anchor tags and text accompanying it */
.form-group p a {
  font-weight: bold;
  color: var(--primary-alt);
}
.form-group p {
  font-size: 14px;
  text-align: center;
}

@media only screen and (max-width: 1200px) {
  .section-signup-1-main, .section-signup-2-main {
    width: 85%;
  }
  .section-signup-1-title, .section-signup-1-form {
    margin-top: 35px;
  }
  .section-main {
    width: 75%;
  }
}

@media only screen and (max-width: 900px) {
  .section-main {
    padding: 35px 0;
  }
  .section-signup-1-main, .section-signup-2-main {
    width: 90%;
  }
  .section-signup-1-main {
    height: 90%;
  }
  .section-signup-1-title, .section-signup-1-form {
    margin-top: 25px;
  }
  .section-main {
    flex-direction: column;
    width: 75%;
    padding: 50px 0;
  }
  .section-signup-1, .section-signup-2 {
    width: 100%;
  }
  .section-signup {
    height: unset;
  }
}

@media only screen and (max-width: 600px) {
  .section-main {
    width: 100%;
    padding: 0;
  }
  .section-signup-2-main {
    padding: 35px 25px;
  }
}
</style>
