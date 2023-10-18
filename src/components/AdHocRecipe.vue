<template>
    <main class="row justify-content-center">
        <div class="col-lg-4 col-md-10 image-menu-schedule">
            <div class="row">
                <h3 class="result-title">Result:</h3>
            </div>
            <div class="row">
                <img src="../assets/test_image.jpg" style="max-height: 500px; max-width: 500px; border-radius: 30px;">
            </div>
            <div class="row meal-schedule">
                MealRecipe schedule#TODO
            </div>
            
        </div>
        <div class="col-lg-6 col-md-10 recipe-steps">
            <div class="recipe-desc"></div>
            <h3 class="recipe-title">{{ placeholder.testRecipe.guide }}</h3>
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
export default {
    data() {
        return {
            userId: '',
            data: JSON.parse(this.$route.query.data),
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
        this.userId = this.$route.params.id           
    }            
}
</script>

<style scoped>
    .image-menu-schedule {
        /* background-color: var(--border-grey); */
        height: 92vh;
        margin-right: 1rem;
        .result-title {
            margin-bottom: 1rem ;
        }       
    }
    .recipe-steps {
        /* background-color: var(--border-grey); */
        .recipe-guide {
            list-style: none;
            margin-left: -2rem;
        }
        .step {
            font-size: 1.5rem;
            background-color:#194252;
            color: var(--light);
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        .recipe-title {
            margin-bottom: 1rem;
        }
    }   
</style>