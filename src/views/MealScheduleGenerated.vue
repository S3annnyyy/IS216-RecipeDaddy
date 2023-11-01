<template>
    <main class="row justify-content-center">
        <div class="col-lg-4 col-md-10 col-sm-10 image-menu-schedule-LHS">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <h3 class="recipe-title" v-if="placeholder.adhocRecipe.recipeTitle">{{ placeholder.adhocRecipe.recipeTitle }}</h3>
                    <AnimatedPlaceholder height="29px" width="442px" margin="1rem 0" borderRadius="10px" v-else/>
                </div>
                <div class="row justify-content-center text-center">
                    <img :src="placeholder.adhocRecipe.recipeImg" class="recipe-image-cover"  v-if="placeholder.adhocRecipe.recipeImg">
                    <AnimatedPlaceholder height="300px" width="460px" borderRadius="30px" border="3px solid #194252" margin="0 0 2rem 0" v-else />
                </div>
                <div class="row meal-schedule justify-content-center">                       
                    <button type="submit" class="addSchedule" @click="replaceMeal()" v-if="placeholder.adhocRecipe.steps">Replace Meal</button>
                    <button type="submit" class="addSchedule" @click="completeMeal()" v-if="placeholder.adhocRecipe.steps">Complete Meal</button>
                    <AnimatedPlaceholder height="50px" width="10rem" margin="1rem 0 0 0" borderRadius="50px" padding="0.5rem" v-else/>
                </div> 
            </div>           
        </div>       
        
        <div class="col-lg-6 col-md-10 col-sm-10 recipe-steps">       
            <div class="recipe-desc">
                1&nbsp;<span class="material-icons">restaurant</span>{{ stepCount }} steps                
            </div>
            <ul class="recipe-guide" v-if="placeholder.adhocRecipe.steps">
                <li v-for="(step,index) in placeholder.adhocRecipe.steps" :key="step.step" class="step">
                    <h4>Step: {{ index + 1}}</h4>
                    <p>{{ step }}</p>                   
                </li>
            </ul>
            <AnimatedPlaceholder height="100%" width="100%" margin="0 0 2rem 0" borderRadius="10px" padding="1rem" v-else/>
        </div>        
    </main>
</template>

<script>
import axios from 'axios'
import AnimatedPlaceholder from '../components/AnimatedPlaceholder.vue'
import LoginFailed from '../components/LoginFailed.vue'

export default {
    data() {
        return {
            timeOfDay: "TimeOfDay",
            inputDate: "",
            promptuuid: '',
            data: JSON.parse(this.$route.query.data),
            stepCount: 0,
            placeholder: {
                adhocRecipe: {
                    "recipeTitle": null,
                    "steps": null,
                    "recipeImg": null,
                }
            }
        };
    },
    methods: {
        handleInput(elem) {
            console.log(`Selected TimeOfDay: ${elem}`);
            this.timeOfDay = elem;
        },
        convertToNum(tOD) {
            if (tOD === "Breakfast") {return 1}
            else if (tOD === "Lunch") {return 2}
            else {return 3}
        },
        convertDate(inputDate) {
            // THIS FUNCTION CONVERTS ANY DATE STRING TO YYYY-MM-DD format 
            var parsedDate = new Date(inputDate); // try convert date

            if (!isNaN(parsedDate.getTime())) { // validation
                // Extract the year, month, and day components
                var year = parsedDate.getFullYear();
                var month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
                var day = String(parsedDate.getDate()).padStart(2, '0');

                return  year + '-' + month + '-' + day;
            } else {
            return "2023-27-10";  // Handle the case where the input date is not in a parseable format
            }
        },  
        replaceMeal() {
            // send to mealSchedule page as props 
            this.$router.push({ name: 'replacement', query: { data: JSON.stringify(this.data) }, params: { id: this.data.id } });  
        },
        completeMeal(){
            axios.put(`http://127.0.0.1:8000/user-meal-plan?id=${this.data.id}`, {
                "isCompleted":true
            },{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch( error => {
                    console.error(error);
                });
            this.$router.push({ name: 'leaderboard' });

        },
        routeBackToHome() {
            this.showLoginAlert = false
            this.$router.push({ path: '/' })
        },
        checkUserLoggedIn() {
            if (!sessionStorage.getItem("AuthToken")) { this.showLoginAlert = true }

        }
    },
    created(){
        console.log(this.data);
        this.placeholder.adhocRecipe.recipeTitle = this.data.recipe_name
        this.placeholder.adhocRecipe.steps = this.data.preparation_steps.split("\n");
        this.placeholder.adhocRecipe.recipeImg = this.data.image_url
        this.stepCount = this.placeholder.adhocRecipe.steps.length



    },
    mounted(){
        this.checkUserLoggedIn();
        const user = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("AuthToken");
        if (token){
            this.token = token;
        }

    },
    components: { AnimatedPlaceholder, LoginFailed }

    
    // mounted() {          
    //     // console.log(this.data) // data logging
    //     this.promptuuid = this.$route.params.id; // get promptuuid   

    //     // CALL GPT-305 daVinci endpoint with prompt as body
    //     const URL = "http://127.0.0.1:8000/get-ai-prompt"
    //     const userPrompt = JSON.parse(this.$route.query.data).prompt
        
    //     const schema = { //Define schema for JSON response
    //         "type": "object",
    //         "properties": {
    //             "imageUrl": {
    //                 "type": "string",
    //                 "link": "URL link"
    //             },
    //             "dish": {
    //                 "type": "string",
    //                 "description": "Descriptive title of the dish"
    //             },
    //             "ingredients": {
    //                 "type": "array",
    //                 "items": {"type": "string"}
    //             },
    //             "instructions": {
    //                 "type": "array",
    //                 "items": {
    //                     "type": "object",
    //                     "properties": {
    //                         "step": {
    //                             "type": "integer",
    //                             "description": "Step number, numbering from 1"
    //                         },
    //                         "description": {
    //                             "type": "string",
    //                             "description": "Steps to prepare the recipe."
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     console.log(userPrompt)

    //     axios.post(URL, {userPrompt, schema})
    //     .then((res) => {   
    //         console.log(typeof res);
    //         let aiResponse = JSON.parse(res.data.generated_text)
    //         console.log(aiResponse)
    //         console.log(typeof aiResponse)
            
    //         // initialize recipe title
    //         this.placeholder.adhocRecipe.recipeTitle = aiResponse.dish

    //         // initialize step count
    //         this.stepCount = aiResponse.instructions.length

    //         // initialize steps
    //         this.placeholder.adhocRecipe.steps = aiResponse.instructions

    //         // initialize recipe image
    //         console.log(aiResponse.imageUrl);
    //         this.placeholder.adhocRecipe.recipeImg = aiResponse.imageUrl
    //     })
    //     .catch((err) => {
    //         console.log(`API Call Not Successful: ${err}`)
    //     })
     
    // },
}
</script>

<style scoped>
.image-menu-schedule-LHS {    
    max-height: 92vh;    
    
    .recipe-title {        
        margin: 1rem 0;
    }
    .recipe-image-cover {
        border-radius: 30px;
        padding-left: 0;
        padding-right: 0;
        padding: 5px;
        margin-bottom: 2rem;
        border: 3px solid #194252;      
        box-shadow: 0 8px 2px -2px var(--text-light-secondary); 
    }
    .datepicker {
        padding-left: 0;
        padding-right: 0;
        border: none;
        border-radius: 10px;
        border: 1px solid #6c757d;
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
        .form-control {
            border-radius: 10px;
        }
    }
    .addSchedule {
        width: 10rem;
        background-color: #194252;
        color: var(--light);
        border-radius: 50px;
        margin-top: 1rem;
        padding: 0.5rem;
    }
}

.recipe-steps {    
    .recipe-guide {
        list-style: none;
        margin-left: -2rem;
    }
    .recipe-desc {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        margin: 1rem 0 1rem 0.5rem;
        color: var(--text-light-secondary);
        .material-icons {
            margin-right: 3rem;            
        }
    }
    .step {
        font-size: 1.5rem;
        background-color:#194252;
        color: var(--light);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        box-shadow: 0 8px 2px -2px var(--text-light-secondary);
    }    
}
</style>