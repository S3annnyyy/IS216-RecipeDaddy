<template>
    <main class="row justify-content-center">
        <div class="col-lg-4 col-md-10 col-sm-10 image-menu-schedule-LHS">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <h3 class="recipe-title" v-if="placeholder.adhocRecipe.recipeTitle">{{
                        placeholder.adhocRecipe.recipeTitle }}</h3>
                    <AnimatedPlaceholder height="29px" width="442px" margin="1rem 0" borderRadius="10px" v-else />
                </div>
                <div class="row justify-content-center text-center">
                    <img :src="placeholder.adhocRecipe.recipeImg" class="recipe-image-cover"
                        v-if="placeholder.adhocRecipe.recipeImg">
                    <AnimatedPlaceholder height="300px" width="460px" borderRadius="30px" border="3px solid #194252"
                        margin="0 0 2rem 0" v-else />
                </div>
                <div class="row meal-schedule justify-content-center">
                    <button type="submit" class="addSchedule" @click="replaceMeal()"
                        v-if="placeholder.adhocRecipe.steps">Replace?</button>
                    <AnimatedPlaceholder height="50px" width="10rem" margin="1rem 0 0 0" borderRadius="50px"
                        padding="0.5rem" v-else />
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
            <AnimatedPlaceholder height="100%" width="100%" margin="0 0 2rem 0" borderRadius="10px" padding="1rem" v-else />
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import AnimatedPlaceholder from '../../components/AnimatedPlaceholder.vue'

export default {
    data() {
        return {
            timeOfDay: "TimeOfDay",
            inputDate: "",
            promptuuid: '',
            stepCount: 0,
            placeholder: {
                adhocRecipe: {
                    "recipeTitle": null,
                    "steps": null,
                    "recipeImg": null,
                }
            },
            id: this.$route.params.id,
            baseUrl: "http://127.0.0.1:8000",
            previousData: JSON.parse(this.$route.query.data),
            
        };
    },
    methods: {
        handleInput(elem) {
            console.log(`Selected TimeOfDay: ${elem}`);
            this.timeOfDay = elem;
        },
        convertToNum(tOD) {
            if (tOD === "Breakfast") { return 1 }
            else if (tOD === "Lunch") { return 2 }
            else { return 3 }
        },
        convertDate(inputDate) {
            // THIS FUNCTION CONVERTS ANY DATE STRING TO YYYY-MM-DD format 
            var parsedDate = new Date(inputDate); // try convert date

            if (!isNaN(parsedDate.getTime())) { // validation
                // Extract the year, month, and day components
                var year = parsedDate.getFullYear();
                var month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                var day = String(parsedDate.getDate()).padStart(2, '0');

                return year + '-' + month + '-' + day;
            } else {
                return "2023-27-10";  // Handle the case where the input date is not in a parseable format
            }
        },
        async getAuthToken(email, password) {
            const requestData = {
                email: email,
                password: password,
            };
            const response = await axios.post(`${this.baseUrl}/api/token`, requestData);
            this.token = response.data.access;
            return response.data.access;
        },
        async replaceMeal() {
            console.log(`Submitted! Selected date is ${this.convertDate(this.inputDate)}`);
            const user = "wowtest";
            const token = await this.getAuthToken(sessionStorage.getItem("email"), sessionStorage.getItem("password")); // Replace with your actual email and password
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            // format data 
            // concatenate alll the steps with \n
            let prepStepsConcat = ""
            for (let step in this.placeholder.adhocRecipe.steps) {
                prepStepsConcat += `${this.placeholder.adhocRecipe.steps[step].description}\n`
            }
            // add all ingredients inside an object
            let ingredientObject = {};
            for (let item in this.placeholder.adhocRecipe.ingredients) {
                ingredientObject[item] = "1EA"
            }
            // missing adding image url #TODO
            let jsonSubmissionTemplate = {
                "recipe_name": this.placeholder.adhocRecipe.recipeTitle,
                "image_url":this.placeholder.adhocRecipe.recipeImg,
                "have_ingredients": ingredientObject,
                "no_ingredients": null,
                "preparation_steps": prepStepsConcat,
                "canMake": false,
                "isCompleted": false,
            }
            // send to backend
            axios.put(`${this.baseUrl}/user-meal-plan?id=${this.id}`, jsonSubmissionTemplate, config).then((userMealPlanResponse) => {
                console.log('Response:', userMealPlanResponse.data);
            }).catch((err) => {
                console.log(`API Call for Post Not Successful: ${err}`)
            })


            // send to mealSchedule page as props 
            this.$router.push({ name: 'mealschedule', query: { data: JSON.stringify(this.data) } });

            // Add in logic to check backend whether there is any conflict with user's existing schedule?  


            // reset variables to default again
            this.timeOfDay = "TimeOfDay";
            this.inputDate = "";
        },
    },
    mounted() {
        // console.log(this.data) // data logging
        this.promptuuid = this.$route.params.id; // get promptuuid   
        console.log(this.previousData);

        // CALL GPT-305 daVinci endpoint with prompt as body
        const URL = "http://127.0.0.1:8000/get-ai-prompt"
        const userPrompt = `
        Create a recipe that is similar to ${this.previousData.recipe_name}, from the same cuisine but not have the same title and image using just the following ingredients: ${Object.keys(this.previousData.have_ingredients)}. DO NOT use any additional ingredients.Return the data as a JSON object
        You are also a prompt generator.
        You will create a prompt that could be used for image-generation based on your generated title of the dish description
        Once I described the image, include the following markdown. shown in the function call schema set_recipe under "imageUrl"
        https://image.pollinations.ai/prompt/{description}
        where {description} is:
        {sceneDetailed}%20{adjective}%20{charactersDetailed}%20{visualStyle}%20{genre}%20{artistReference}
        Make sure the prompts in the URL are encoded. Don't quote the generated markdown or put any code box around it.
        `;

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
                    "items": { "type": "string" }
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

        axios.post(URL, { userPrompt, schema })
            .then((res) => {
                console.log(typeof res);
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
                // Create an Image object to preload the image
                let image = new Image();

                image.onload = () => {
                // The image is loaded, so now you can update the Vue.js data property
                this.placeholder.adhocRecipe.recipeImg = image.src;
                };

                image.src = aiResponse.imageUrl; // Start loading the image
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
        background-color: #194252;
        color: var(--light);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        box-shadow: 0 8px 2px -2px var(--text-light-secondary);
    }
}
</style>