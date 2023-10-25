<template>
    <main class="row justify-content-center">
        <div class="col-lg-4 col-md-10 col-sm-10 image-menu-schedule-LHS">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <h3 class="recipe-title" v-if="placeholder.testRecipe.recipeTitle">{{ placeholder.testRecipe.recipeTitle }}</h3>
                    <AnimatedPlaceholder height="29px" width="442px" margin="1rem 0" borderRadius="10px" v-else/>
                </div>
                <div class="row justify-content-center text-center">
                    <img :src="placeholder.testRecipe.recipeImg" class="recipe-image-cover"  v-if="placeholder.testRecipe.recipeImg">
                    <AnimatedPlaceholder height="300px" width="460px" borderRadius="30px" border="3px solid #194252" margin="0 0 2rem 0" v-else />
                </div>
                <div class="row meal-schedule justify-content-center">                               
                    <div class="input-group datepicker" v-if="placeholder.testRecipe.steps">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ timeOfDay }}</button>
                        <ul class="dropdown-menu">                             
                            <li class="dropdown-item" @click="handleInput('Breakfast')">Breakfast</li>
                            <li class="dropdown-item" @click="handleInput('Lunch')">Lunch</li>
                            <li class="dropdown-item" @click="handleInput('Dinner')">Dinner</li>
                        </ul>   
                        <input type="date" class="form-control" v-model="inputDate"/>                
                    </div>
                    <AnimatedPlaceholder height="50px" width="442px" margin="1rem 0" borderRadius="10px" v-else/>
                    <button type="submit" class="addSchedule" @click="addToSchedule()" v-if="placeholder.testRecipe.steps">Add to schedule</button>
                    <AnimatedPlaceholder height="50px" width="10rem" margin="1rem 0 0 0" borderRadius="50px" padding="0.5rem" v-else/>
                </div> 
            </div>           
        </div>       
        
        <div class="col-lg-6 col-md-10 col-sm-10 recipe-steps">       
            <div class="recipe-desc">
                1&nbsp;<span class="material-icons">restaurant</span>{{ stepCount }} steps                
            </div>
            <ul class="recipe-guide" v-if="placeholder.testRecipe.steps">
                <li v-for="step in placeholder.testRecipe.steps" :key="step.step" class="step">
                    <h4>Step: {{ step.step }}</h4>
                    <p>{{ step.description }}</p>                   
                </li>
            </ul>
            <AnimatedPlaceholder height="100%" width="100%" margin="0 0 2rem 0" borderRadius="10px" padding="1rem" v-else/>
        </div>        
    </main>
</template>

<script>
import axios from 'axios'
import AnimatedPlaceholder from '../components/AnimatedPlaceholder.vue'

export default {
    data() {
        return {
            timeOfDay: "TimeOfDay",
            inputDate: "",
            promptuuid: '',
            data: JSON.parse(this.$route.query.data),
            stepCount: 0,
            placeholder: {
                testRecipe: {
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
        addToSchedule() {
            console.log(`Submitted! Selected date is ${this.inputDate}`);
            // reset variables to default again
            this.timeOfDay = "TimeOfDay";
            this.inputDate = "";
            // send to mealSchedule & backend once mealSchedule is set up
            this.$router.push({ name: 'mealschedule', query: { data: JSON.stringify(this.data) } });
            // TODO
            // Add in logic to check backend whether there is any conflict with user's existing schedule?  
        },       
    },
    mounted() {          
        // console.log(this.data) // data logging
        this.promptuuid = this.$route.params.id; // get promptuuid                    
     

        // CALL GPT-305 daVinci endpoint with prompt as body
        const URL = "http://127.0.0.1:8000/get-ai-prompt"
        const userPrompt = JSON.parse(this.$route.query.data).prompt
        console.log(userPrompt)

        axios.post(URL, {userPrompt})
        .then((res) => {            
            let aiResponse = JSON.parse(res.data.generated_text)
            console.log(aiResponse)
            console.log(typeof aiResponse)
            
            // initialize recipe title
            this.placeholder.testRecipe.recipeTitle = aiResponse.dish

            // initialize step count
            this.stepCount = aiResponse.instructions.length

            // initialize steps
            this.placeholder.testRecipe.steps = aiResponse.instructions

            // initialize recipe image
            // this.placeholder.testRecipe.recipeImg = new URL("../assets/test_image.jpg", import.meta.url).href;
        })
        .catch((err) => {
            console.log(`API Call Not Successful: ${err}`)
        })
     
    },
    components: { AnimatedPlaceholder }
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