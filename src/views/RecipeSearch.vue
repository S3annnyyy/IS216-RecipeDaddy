<template>
    <main class="row justify-content-center align-items-center " style="height: 80vh;">
        <div class="col-8">
            <div class="input-group input-group-lg search-bar">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 6vw;">{{ selectedInputType }}</button>
                <ul class="dropdown-menu">                             
                    <li v-for="item in inputFormat" :key="item" class="dropdown-item" @click="handleInputType(item)">{{ item }}</li>
                </ul>               
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 10vw;">{{ selectedCuisine }}</button>
                <ul class="dropdown-menu">
                    <li v-for="cuisine in inputCuisine" :key="cuisine" class="dropdown-item" @click="handleCuisineOption(cuisine)">{{ cuisine }}</li>
                </ul>
                <input type="text" class="form-control " aria-label="Text input for users to add in their ingredients" v-model="searchInput" @keydown.enter="handleEnter">
                <button class="btn btn-outline-secondary submit-button" type="submit" aria-expanded="false">
                    <span class="submit-button-content">
                        <svg width="32" height="32" viewBox="0 0 24 24" class="arrow">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/>
                        </svg>
                    </span>
                </button>
            </div>
            <div class="list-wrapper">
                <ul class="list-container">
                <li v-for="(item, index) in ingredientList" :key="index" class="ingredients ">
                    {{ item }}<span class="material-icons-outlined" @click="removeItem(item)">close</span>                    
                </li>
            </ul>
            </div>
        </div>        
    </main>
</template>

<script>
export default {
    data() {
        return {
            searchInput: '',
            ingredientList: [],
            selectedInputType: 'Input Type',
            selectedCuisine: 'Cuisine Type',
            inputFormat: ["Text", "OCR"],
            inputCuisine: ["Chinese", "Japanese", "Indian", "Peranakan", "Western"] 
        };
    },
    methods: {
        handleEnter() {
            // Add the input value to the search history array
            this.ingredientList.push(this.searchInput);

            // Clear the input box
            this.searchInput = '';

            console.log('Search History:', this.ingredientList);
            console.log(`Filled with ${this.ingredientList.length} item(s)`)
            // populate input as boxes
            // this.populateInput()
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
        }
    } 
};
</script>

<style scoped>  
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
    }

    .material-icons-outlined {
        cursor: pointer;
    }

    .list-wrapper {
        /* This prevents search bar from being pushed upwards when boxes are being populated  */
        height: 4rem;
    }

    .dropdown-toggle {
        border-radius: 50px;
    }

    .submit-button {
        border-radius: 50px;
        border-left: none;     
        transition: background-color 0.3s;   
    }

    .submit-button:hover {
        /* remove bootstrap default settings */
       background-color: var(--light);
       .submit-button-content {
        filter: invert(84%) sepia(9%) saturate(7000%) hue-rotate(166deg) brightness(108%) contrast(96%);;
       }
    }  

    .form-control {
        background-color: transparent;
        border: 1px solid #6c757d;
        border-right: none;
    }    
</style>