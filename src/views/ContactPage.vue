<template>
    <div class="row justify-content-center mt-5">
        <div class="col-xl-4 col-lg-4 col-md-7 col-sm-10">
            <div class="signup-form">
                <h3>We would love to hear from you!</h3>
                <div class='divider'></div>
                    <div class="form-group">
                        <input type="email" id="input-email" class="form-control" placeholder=" " required v-model="inputEmail" autocomplete="email">
                        <label for="input-email" class="form-label">Your Email</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="first-name" class="form-control" placeholder=" " required v-model="inputName" autocomplete="given-name">
                        <label for="first-name" class="form-label">Your Name</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control2" placeholder="Leave your comments here!" id="floatingTextarea" required v-model="inputArea"></textarea>                       
                    </div>           
                <div class="form-group text-center">
                    <button class="contact-button" @click="sendEmail">
                        <span :class="buttonTextClass">{{ buttonText }}</span>                        
                    </button>
                </div>              
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {    
    data()  {
        return {
            inputEmail: "",
            inputName: "",
            inputArea: "",                 
            buttonText: "Send message",
            buttonTextClass: "button-text-transition"
        }
    },
    methods: {
        sendEmail() {
            this.buttonText = "Sending...";
            console.log(this.inputEmail, this.inputName, this.inputArea)
            const URL = "https://api.emailjs.com/api/v1.0/email/send"
            var data = {
                service_id: import.meta.env.VITE_SERVICE_ID,
                template_id: import.meta.env.VITE_TEMPLATE_ID,
                user_id: import.meta.env.VITE_USER_ID,
                template_params: {
                    "name": "Admin",
                    "user": this.inputName,
                    "reply_to": this.inputEmail,
                    "message": this.inputArea
                 }           
            }

            axios.post(URL, data, {
                headers:  {
                   'Content-Type': 'application/json'
                }
            })
            .then((res) => {
               console.log(res)
               this.inputArea = ""
               this.inputEmail = ""
               this.inputName = ""
               this.buttonText = "Submitted!"
               this.isLoading = false;
            })
            .catch((err) => {
               console.log(err)
               this.buttonText = "Failed:("
               this.isLoading = false;
            })
            
        }
    }
}
</script>

<style scoped>
    .button-text-transition {
        transition: opacity 0.3s ease-in-out;
    }
   .signup-form {
    animation: fadeInUp2s;
    animation-fill-mode: forwards;

    .divider {
        height: 3rem;
        background-color: var(--dark);
        clip-path: polygon(50% 0%, 100% 0, 100% 5%, 17% 5%, 15% 30%, 2% 30%, 0 0);
        opacity: 1;
        animation: fadeInUp 2s 2s;
        animation-fill-mode: forwards;
        margin: 1rem 0 2rem 0;
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
    .form-control2 {
        border: none;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        height: 10rem; 
        margin: 3rem 0;
    }
}

.contact-button {
    background: var(--primary);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
    padding: 1rem;
    width: 50%;
    outline: none;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;  
}
</style>