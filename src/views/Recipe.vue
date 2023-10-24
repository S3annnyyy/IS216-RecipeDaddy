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
                    <div class="input-group datepicker" v-if="placeholder.testRecipe.recipeImg">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ timeOfDay }}</button>
                        <ul class="dropdown-menu">                             
                            <li class="dropdown-item" @click="handleInput('Breakfast')">Breakfast</li>
                            <li class="dropdown-item" @click="handleInput('Lunch')">Lunch</li>
                            <li class="dropdown-item" @click="handleInput('Dinner')">Dinner</li>
                        </ul>   
                        <input type="date" class="form-control" v-model="inputDate"/>                
                    </div>
                    <AnimatedPlaceholder height="50px" width="442px" margin="1rem 0" borderRadius="10px" v-else/>
                    <button type="submit" class="addSchedule" @click="addToSchedule()" v-if="placeholder.testRecipe.recipeImg">Add to schedule</button>
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
                    <p>{{ step.instruction }}</p>                   
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
        }
    },
    mounted() {          
        // console.log(this.data) // data logging
        this.promptuuid = this.$route.params.id; // get promptuuid                    
        // make mock API call 
        setTimeout(() => {
            axios.get("https://api.kanye.rest/")
                .then((res) => {
                console.log(res.data);
                // initialize recipe response
                this.placeholder.testRecipe.steps = [
                    {
                        "step": 1,
                        "instruction": "Season a beef tenderloin with salt and pepper. Sear it in a hot pan with olive oil until browned on all sides."
                    },
                    {
                        "step": 2,
                        "instruction": "Remove the beef from the pan and let it cool. Brush the beef with Dijon mustard."
                    },
                    {
                        "step": 3,
                        "instruction": "Prepare the mushroom duxelles by sautéing mushrooms, shallots, garlic, and thyme until the mixture is dry. Let it cool."
                    },
                    {
                        "step": 4,
                        "instruction": "Roll out puff pastry into a rectangle. Place the mushroom duxelles in the center."
                    },
                    {
                        "step": 5,
                        "instruction": "Place the seared beef on top of the mushroom duxelles."
                    },
                    {
                        "step": 6,
                        "instruction": "Wrap the puff pastry around the beef, sealing the edges. Trim any excess pastry."
                    },
                    {
                        "step": 7,
                        "instruction": "Brush the pastry with beaten egg for a golden finish."
                    },
                    {
                        "step": 8,
                        "instruction": "Bake in a preheated oven at 400°F (200°C) for 30-40 minutes or until the pastry is golden brown and the beef is cooked to your liking."
                    },
                    {
                        "step": 9,
                        "instruction": "Let the Beef Wellington rest for a few minutes before slicing."
                    },
                    {
                        "step": 10,
                        "instruction": "Serve with your favorite sauce or gravy. Enjoy!"
                    }
                ];
                // initialize recipe title
                this.placeholder.testRecipe.recipeTitle = "Beef Wellington Recipe";
                // initialize recipe img               
                this.placeholder.testRecipe.recipeImg = new URL("../assets/test_image.jpg", import.meta.url).href;
                this.stepCount = this.placeholder.testRecipe.steps.length // get recipe step count   
            })
                .catch((err) => {
                console.log("API Call Not Successful");
            });
        }, 5000);
        // CALL lLama endpoint with prompt as body
        // const URL = "http://127.0.0.1:8000/get-ai-prompt"
        // axios.get(URL)
        // .then((res) => {            
        //     let aiResponse = res.data
        //     console.log(aiResponse)
        //     console.log(type(aiResponse))
        // })
        // .catch((err) => {
        //     console.log("API Call Not successful")
        // }) 
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