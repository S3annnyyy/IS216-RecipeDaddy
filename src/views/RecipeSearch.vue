<template>
    <main class="row justify-content-center align-items-center " style="height: 80vh;">
        <div class="col-8">
            <div class="input-group input-group-lg">

                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Input type</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action before</a></li>
                    <li><a class="dropdown-item" href="#">Another action before</a></li>               
                </ul>

                
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Cuisine type</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Western</a></li>
                    <li><a class="dropdown-item" href="#">Mediterranean</a></li>
                    <li><a class="dropdown-item" href="#">French</a></li>
                    <li><a class="dropdown-item" href="#">Asian</a></li>
                </ul>
                <input type="text" class="form-control" aria-label="Text input for users to add in their ingredients" v-model="searchInput" @keydown.enter="handleEnter">
                <button class="btn btn-outline-secondary" type="submit" aria-expanded="false">
                    <span class="submit-button-content">
                        <svg width="32" height="32" viewBox="0 0 24 24" class="arrow">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/>
                        </svg>
                    </span>
                </button>
            </div>
            <ul class="list-container">
                <li v-for="(item, index) in ingredientList" :key="index" class="ingredients ">
                    {{ item }}<span class="material-icons-outlined" @click="removeItem(item)">close</span>                    
                </li>
            </ul>
        </div>        
    </main>
</template>

<script>
export default {
    data() {
        return {
            searchInput: '',
            ingredientList: [],
        };
    },
    methods: {
        handleEnter() {

            // Add the input value to the search history array
            this.ingredientList.push(this.searchInput);

            // Clear the input box
            this.searchInput = '';

            console.log('Search History:', this.ingredientList);
            // populate input as boxes
            this.populateInput()
        },
        populateInput() {
            // check if ingredientList is empty first, if it is do nothing else populate items as text boxes
            if (this.ingredientList.length !== 0) {
                console.log(`Filled with ${this.ingredientList.length} item(s)`)
            } else {
                console.log("empty")
            }
        },
        removeItem(item) {
            console.log(`rm btn clicked for ${item} list item`)     
            
            // remove item for ingredientList
            let item_index = this.ingredientList.indexOf(item)
            this.ingredientList.splice(item_index, 1)
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
        background-color: var(--grey);                
    }

    .material-icons-outlined {
        cursor: pointer;
    }
</style>