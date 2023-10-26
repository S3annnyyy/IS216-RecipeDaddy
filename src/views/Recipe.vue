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
                    <div class="input-group datepicker" v-if="placeholder.adhocRecipe.steps">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ timeOfDay }}</button>
                        <ul class="dropdown-menu">                             
                            <li class="dropdown-item" @click="handleInput('Breakfast')">Breakfast</li>
                            <li class="dropdown-item" @click="handleInput('Lunch')">Lunch</li>
                            <li class="dropdown-item" @click="handleInput('Dinner')">Dinner</li>
                        </ul>   
                        <input type="date" class="form-control" v-model="inputDate"/>                
                    </div>
                    <AnimatedPlaceholder height="50px" width="442px" margin="1rem 0" borderRadius="10px" v-else/>
                    <button type="submit" class="addSchedule" @click="addToSchedule()" v-if="placeholder.adhocRecipe.steps">Add to schedule</button>
                    <AnimatedPlaceholder height="50px" width="10rem" margin="1rem 0 0 0" borderRadius="50px" padding="0.5rem" v-else/>
                </div> 
            </div>           
        </div>       
        
        <div class="col-lg-6 col-md-10 col-sm-10 recipe-steps">       
            <div class="recipe-desc">
                1&nbsp;<span class="material-icons">restaurant</span>{{ stepCount }} steps                
            </div>
            <ul class="recipe-guide" v-if="placeholder.adhocRecipe.steps">
                <li v-for="step in placeholder.adhocRecipe.steps" :key="step.step" class="step">
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
        addToSchedule() {
            console.log(`Submitted! Selected date is ${this.inputDate}`);
            
            // send to mealSchedule page as props 
            this.$router.push({ name: 'mealschedule', query: { data: JSON.stringify(this.data) } });
            
            // format data 
            // concatenate alll the steps with \n
            let prepStepsConcat = ""
            for (step in this.placeholder.adhocRecipe.steps) {
                prepSteps += `${step.description}\n`
            }
            // add all ingredients inside an object
            let ingredientObject = {};
            for (item in this.placeholder.adhocRecipe.ingredients) {
                ingredientObject[item] = "1EA" 
            }
            // missing adding image url #TODO
            let jsonSubmissionTemplate = {
                "id": 66, // MISSING ID FUNCTION #TODO
                "meal_date": this.inputDate,
                "meal_type": this.convertToNum(this.timeOfDay), // convert timeofday to numbers
                "recipe_name": this.placeholder.adhocRecipe.recipeTitle,
                "have_ingredients": ingredientObject,
                "no_ingredients": null,
                "preparation_steps": prepStepsConcat,
                "canMake": false,
                "isCompleted": true,
                "user": 1
            }
            // send to backend
            const URL = "http://127.0.0.1:8000/user-meal-plan"
            axios.get(URL, {jsonSubmissionTemplate})
            .then((res) => {            
                console.log(`Data sent to backend ${res}`)
            })
            .catch((err) => {
                console.log(`API Call Not Successful: ${err}`)
            })
            // Add in logic to check backend whether there is any conflict with user's existing schedule?  

            // reset variables to default again
            this.timeOfDay = "TimeOfDay";
            this.inputDate = "";            
        },       
    },
    mounted() {          
        // console.log(this.data) // data logging
        this.promptuuid = this.$route.params.id; // get promptuuid   

        // CALL GPT-305 daVinci endpoint with prompt as body
        const URL = "http://127.0.0.1:8000/get-ai-prompt"
        const userPrompt = JSON.parse(this.$route.query.data).prompt
        
        const schema = { //Define schema for JSON response
            "type": "object",
            "properties": {
                "imageUrl": {
                    "type": "string",
                    "link": "URL link"
                },
                "dish": {
                    "type": "string",
                    "description": "Descriptive title of the dish"
                },
                "ingredients": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "instructions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "step": {
                                "type": "integer",
                                "description": "Step number, numbering from 1"
                            },
                            "description": {
                                "type": "string",
                                "description": "Steps to prepare the recipe."
                            }
                        }
                    }
                }
            }
        }
        console.log(userPrompt)

        axios.post(URL, {userPrompt, schema})
        .then((res) => {   
            let aiResponse = JSON.parse(res.data.generated_text)
            console.log(aiResponse)
            console.log(typeof aiResponse)
            
            // initialize recipe title
            this.placeholder.adhocRecipe.recipeTitle = aiResponse.dish

            // initialize step count
            this.stepCount = aiResponse.instructions.length

            // initialize steps
            this.placeholder.adhocRecipe.steps = aiResponse.instructions

            // initialize recipe image
            this.placeholder.adhocRecipe.recipeImg = aiResponse.imageUrl
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