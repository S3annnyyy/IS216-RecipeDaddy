<template>
    <main>
        <section class="section-signup" v-cloak>
            <div class="section-main">
                <div class="section-signup-1">
                    <div class="section-signup-1-main">
                        <h1 class="section-signup-1-title">Recipe Daddy</h1>
                        <p class="section-signup-1-text">Welcome!</p>
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
                                        <input type="email" id="input-email" class="form-control" placeholder=" " required v-model="signUpEmail" v-focus autocomplete="email">
                                        <label for="input-email" class="form-label">Your Email</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="first-name" class="form-control" placeholder=" " required v-model="firstName" autocomplete="given-name">
                                        <label for="first-name" class="form-label">Your First Name</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="last-name" class="form-control" placeholder=" " required v-model="lastName" autocomplete="family-name">
                                        <label for="last-name" class="form-label">Your Last Name</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="username" class="form-control" placeholder=" " required v-model="username" autocomplete="name">
                                        <label for="username" class="form-label">Your Username</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" id="input-password" class="form-control" placeholder=" " required v-model="signUpPw" autocomplete="current-password">
                                        <label for="input-password" class="form-label">Your Password</label>
                                    </div>
                                    <div class="form-group">
                                        <p><input type="checkbox" id="input-checkbox" @click="handleCheck()"> By creating an account, you agree to the 
                                            <router-link class="terms-conditions" :to="{path: '/PlAcEhOlDeR'}">Terms & Conditions.</router-link>
                                        </p>   
                                        <p style="color: red; height: 1rem;">{{ promptToCheck }}</p>                                     
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

<script>
import axios from 'axios';

export default {
    directives: {
        focus: {
            mounted(el) {
                el.focus();
            },
        },
    },
    data() {
        return {
            signUpEmail: '',
            firstName: '',
            lastName: '',
            signUpPw: '',
            username: '',
            checked: false,
            promptToCheck: '',
            authToken: '', 
        };
    },
    methods: {
        handleCheck() {
            this.checked = !this.checked
            if (this.checked) {this.promptToCheck = ''}            
        },
        async getAuthToken(email, password) {
            const URL = import.meta.env.VITE_BACKEND_BASE_URL
            const requestData = {
                email: email,
                password: password,
            }
            const response = await axios.post(`${URL}/api/token`, requestData)
            this.authToken = response.data.access           
            sessionStorage.setItem("AuthToken", response.data.access)
            return response.data.access
        },       
        handleSignUp() {
            if (this.checked) {
                console.log('form submitted');

                // CREATE ACCOUNT
                const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/user`
                const body = {
                    "username": this.username,
                    "email": this.signUpEmail,
                    "first_name": this.firstName,
                    "last_name": this.lastName,
                    "password": this.signUpPw
                } 

                axios.post(URL, body)
                .then((res) => {        
                    console.log(res)     
                   
                    // Get authentication token which will then store to localStorage and route user back home
                    const token = this.getAuthToken(this.signUpEmail, this.signUpPw)
                    console.log(token, typeof token) 
                    // Store token and username in session storage
                    // console.log(this.authToken)
                    // sessionStorage.setItem("AuthToken", token)
                    sessionStorage.setItem("user", this.username) 
                    sessionStorage.setItem("password", this.signUpPw)
                    sessionStorage.setItem("email", this.signUpEmail)                   
                    // route user back home + make sure modal is close
                    localStorage.setItem("isModalOpen", false)
                    this.$router.push({path: '/'})                                                          
                })
                .catch((err) => {
                    console.log(err.response.data)

                    let errorMsg = []
                    if (err.response.data.email) {
                        errorMsg.push(err.response.data.email)
                        this.signUpEmail = ''
                    }
                    if (err.response.data.username) {
                        errorMsg.push(err.response.data.username)
                        this.username = ''
                    }
                    alert(errorMsg.join("\n"))               
                })                
            } else {
                this.promptToCheck = "Please confirm that you have read and agree to T&Cs"    
            }
        },
    },
    };
</script>

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
    padding: 0 10px;   
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
            font-size: 1rem;
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
