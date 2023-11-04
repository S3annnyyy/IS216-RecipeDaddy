<template>
    <main class="row justify-content-center align-items-center " style="height: 92vh;">
        <Blob class="blob-background"/>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10">
            <div class="search-text">
                <h3>Generate recipe with your leftovers</h3>
            </div>
            <div class="input-group input-group-lg search-bar">
                <button class="btn dropdown-toggle input" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 8vw;">{{ selectedInputType }}</button>
                <ul class="dropdown-menu">                             
                    <li v-for="item in inputFormat" :key="item" class="dropdown-item" @click="handleInputType(item)">{{ item }}</li>
                </ul>               
                <button class="btn dropdown-toggle cuisine" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 10vw;">{{ selectedCuisine }}</button>
                <ul class="dropdown-menu">
                    <li v-for="cuisine in inputCuisine" :key="cuisine" class="dropdown-item" @click="handleCuisineOption(cuisine)">{{ cuisine }}</li>
                </ul>
                <input type="text" class="form-control " placeholder="Enter an ingredient and press Enter! " v-model="searchInput" @keydown.enter="handleEnter">
                <button class="btn submit-button" type="submit" aria-expanded="false" @click="parseDataToRecipePage()">                   
                        <span class="submit-button-content">
                        <svg width="32" height="32" viewBox="0 0 24 24" class="arrow"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>                        
                        </span>                    
                </button>
                <button type="button" class="btn submit-button2"  @click="parseDataToRecipePage()">Create Recipe</button>
            </div>               
            <div class="list-wrapper">
                <ul class="list-container">
                <li v-for="(item, index) in ingredientList" :key="index" class="ingredients">
                    {{ item }}<span class="material-icons-outlined" @click="removeItem(item)">close</span>                    
                </li>
            </ul>
            </div>
        </div>        
    </main>
</template>

<script>
import Blob from "../../components/Blob.vue"

export default {
    data() {
        return {
            searchInput: '',
            ingredientList: [],
            selectedInputType: 'Input Type',
            selectedCuisine: 'Cuisine Type',
            inputFormat: ["Text", "OCR"],
            inputCuisine: ["Chinese", "Japanese", "Indian", "Peranakan", "Western"],
            uuid: crypto.randomUUID(),           
        };
    },
    methods: {
        handleEnter() {
            // check if input is valid
            if (this.searchInput === '') {
                alert("Please enter a valid input!")
            } else {
                 // Add the input value to the search history array
                this.ingredientList.push(this.searchInput);

                // Clear the input box
                this.searchInput = '';

                console.log('Search History:', this.ingredientList);
                console.log(`Filled with ${this.ingredientList.length} item(s)`)
                // populate input as boxes
                // this.populateInput()
            }
           
        },        
        removeItem(item) {
            console.log(`rm btn clicked for ${item} list item`)     
            
            // remove item for ingredientList
            let item_index = this.ingredientList.indexOf(item)
            this.ingredientList.splice(item_index, 1)
        },
        handleInputType(selectedOption) {
            this.selectedInputType = selectedOption
        },
        handleCuisineOption(selectedOption) {
            this.selectedCuisine = selectedOption
        },
        populatePrompt(item_list, cuisineType) {
            let ingredients = item_list.join(", ")
            let result = `Create a ${cuisineType} cuisine recipe using just the following ingredients: ${ingredients}. DO NOT use any additional ingredients.Return the data as a JSON object
            You are also a prompt generator. 
            You will create a prompt that could be used for image-generation based on your generated title of the dish description  
            Once I described the image, include the following markdown. shown in the function call schema set_recipe under "imageUrl"
            https://image.pollinations.ai/prompt/{description}
            where {description} is:
            {sceneDetailed}%20{adjective}%20{charactersDetailed}%20{visualStyle}%20{genre}%20{artistReference}
            Make sure the prompts in the URL are encoded. Don't quote the generated markdown or put any code box around it.`            
            return result
        },
        validateInput() {
            let errors = [ ]
            if (this.ingredientList.length === 0) {errors.push("You can't create a recipe with 0 ingredients")}
            if (this.selectedInputType === "Input Type") {errors.push("Please select one method of input")}
            if (this.selectedCuisine === "Cuisine Type") {errors.push("Please select one cuisine type")}
            if (errors.length === 0) {
                return ["", true]
            } else {
                return [errors, false]
            }
            
        },
        parseDataToRecipePage() {
            // check if user is loggedIn by matching token on sessionStorage
            if (!sessionStorage.getItem("AuthToken")) {
                alert("Please log in before creating a recipe!")
                this.$router.push({path: '/'})
            } else {
                // validate inputs
                if (this.validateInput()[1]) {
                    let LLM_PROMPT = this.populatePrompt(this.ingredientList, this.selectedCuisine);
                    let recipeObject = {
                        unique_id: this.uuid, 
                        cuisine: this.selectedCuisine, 
                        format: this.selectedInputType, 
                        prompt: LLM_PROMPT
                    }
                    
                    this.$router.push({
                        path: `recipesearch/${this.uuid}`,
                        query: {data: JSON.stringify(recipeObject)}
                    })
                } else {
                    let errors = this.validateInput()[0].join(",\n")
                    alert(errors)
                }
            }
            
        }
    },
    components: {
        Blob
    }

};
</script>

<style scoped>   
    .blob-background {
        margin-top: 5rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80%;
        z-index: -1; 
        /* opacity: 0.3;  */
    }
    .submit-button2 {
        display: none;
    }
    .list-container {
        display: flex;
        flex-direction: row;       
        overflow-x: auto;  
    }

    .ingredients {
        display: flex;
        align-items: center;
        flex-direction: row;

        margin: 1rem;
        padding: 0.7rem;
        border-radius: 5px;
        list-style: none;
        background-color: #194252;        
        color: var(--light);     
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
    }

    .list-wrapper {
        /* This prevents search bar from being pushed upwards when boxes are being populated  */
        height: 4rem;
    }   
    .submit-button {
        border-radius: 50px;        
        border-left: none;            
        transition: background-color 0.3s;   
    }

    .submit-button:hover {      
       .submit-button-content {
        filter: invert(84%) sepia(9%) saturate(7000%) hue-rotate(166deg) brightness(108%) contrast(96%);
       }
    }  

    .form-control {
        background-color: transparent;        
        border-radius: 50px;
    }
    .search-text {
        position: absolute;
        top: 40%;
        left: 50%; 
        transform: translateX(-50%);
        z-index: 1; 
        text-align: center;
    }

    .search-text {       
        color: var(--light); 
        /* margin-top: -3.8rem; */
    }    
    .search-bar {
        border-radius: 50px;
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
        border: 1px solid #6c757d;
        background-color: var(--light);
    }
    .dropdown-item {
        cursor: pointer;
    }
    
    /* mobile responsive for seach bar  */
    @media (max-width: 700px) {
        .search-bar {
            border-radius: 10px;
            display: flex;
            flex-direction: column;

            .form-control {
                width: 100%;
                border: 0;
            }
            .form-control::placeholder {
                font-size: 16px;
                text-align: center;
            }
            .dropdown-toggle {
                border-radius: 10px;
            }
            .dropdown-menu {
                width: 100%;
                background-color: #194252;                
                text-align: center;                
                .dropdown-item {
                    color: var(--light);
                }
            }

            .submit-button {
                display: none;
            }

            .submit-button2 {
                display: block;             
                background-color: #194252;     
                color: var(--light);
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                
            }
        }
    }
</style>