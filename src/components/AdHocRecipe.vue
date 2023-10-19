<template>
    <main class="row justify-content-center">
        <div class="col-lg-4 col-md-10 col-sm-10 image-menu-schedule-LHS">
            <div class="container-fluid">
                <div class="row">
                    <h3 class="recipe-title">{{ placeholder.testRecipe.guide }}</h3>
                </div>
                <div class="row justify-content-center text-center">
                    <img src="../assets/test_image.jpg" class="recipe-image-cover">
                </div>
                <div class="row meal-schedule justify-content-center">                               
                    <div class="input-group datepicker">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">TimeOfDay</button>
                        <ul class="dropdown-menu">                             
                            <li class="dropdown-item">Breakfast</li>
                            <li class="dropdown-item">Lunch</li>
                            <li class="dropdown-item">Dinner</li>
                        </ul>   
                        <input type="date" class="form-control" id="date"/>                
                    </div>
                    <button type="submit" class="addSchedule">Add to schedule</button>
                </div> 
            </div>           
        </div>

        <div class="col-lg-6 col-md-10 col-sm-10 recipe-steps">       
            <div class="recipe-desc">
                1&nbsp;<span class="material-icons">restaurant</span>{{ stepCount }} steps                
            </div>
            <ul class="recipe-guide">
                <li v-for="step in placeholder.testRecipe.steps" :key="step.step" class="step">
                    <h4>Step: {{ step.step }}</h4>
                    <p>{{ step.instruction }}</p>                   
                </li>
            </ul>
        </div>        
    </main>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: '',
            data: JSON.parse(this.$route.query.data),
            stepCount: 0,
            placeholder: {
                phImage: "../assets/test_image.jpg",
                testRecipe: {
                "guide": "Beef Wellington Recipe",
                "steps": [
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
                ]
                }
            }
        }
    },
    methods: {
       
    },
    mounted() {
        // get userId
        this.userId = this.$route.params.id

        // get recipe step count
        this.stepCount = this.placeholder.testRecipe.steps.length       
        
        // make API calls here
        // axios.get("https://api.kanye.rest/")
        // .then((res) => {
        //     console.log(res.data)
        // })
        // .catch((err) => {
        //     console.log("API Call Not successful")
        // }) 
    }               
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