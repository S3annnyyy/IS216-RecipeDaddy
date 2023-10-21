<template>
    <main class="row justify-content-center align-items-center" style="height: 92vh;">        
        <div class="col-xl-6 col-l-6 col-md-6 col-sm-12 ingredient-list-LHS">
            <div class="container-fluid ingredient-list-box position-relative">
                <div class="row title">
                    <div class="col-12">
                        <h3>Ingredient List:</h3>
                    </div>
                </div>
                <div class="row ingredients-list-wrapper">
                    <div class="col-10">
                        <ol class="list-container">
                            <li v-for="(item, index) in ingredientList" :key="index" class="ingredients ">
                                <div class="item-content">
                                    <span>{{ item }}</span>
                                    <span class="material-icons-outlined" @click="removeItem(index)">close</span>
                                </div>                  
                            </li>
                        </ol>  
                    </div>                  
                </div>                
                <button class=" position-absolute bottom-0 end-0 m-4 submit-meal-plan-btn" @click="generateMealPlan">Generate meal plan</button>                
            </div>
        </div>
        
               
        <div class="col-xl-6 col-l-6 col-md-6 col-sm-12 search-bar-RHS">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-xxl-10 col-xl-10 col-l-12 col-md-12 col-sm-12 text-center">
                        <div class="input-group input-group-md search-bar-content">
                            <input type="text" class="form-control ingredient" placeholder="Enter ingredient, unit & amount and press enter!" v-model="searchInput">
                            
                            <input type="number" class="form-control amount" placeholder="Amount" v-model="selectedAmount" v-on:change="handleAmount">

                            <button class="btn dropdown-toggle unit" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ selectedUnit }}</button>   
                            <ol class="dropdown-menu">
                                <li v-for="unit in inputUnits" :key="unit" class="dropdown-item" @click="handleUnit(unit)">{{ unit }}</li>
                            </ol>      

                            <button class="btn submit-button" type="submit" aria-expanded="false" @click="handleSubmit">                   
                                <span class="submit-button-content">
                                <svg width="32" height="32" viewBox="0 0 24 24" class="arrow"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>                        
                                </span>                    
                            </button>   
                            <button type="button" class="btn submit-button2"  @click="handleSubmit">Add Recipe</button>                         
                        </div>                       
                    </div>
                </div>
            </div>           
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            searchInput: '',
            selectedUnit: 'Unit',
            selectedAmount: 0, 
            ingredientList: [],          
            inputUnits: ["ml", "litre", "g", "kg", "item-quantity"],
            uuid: crypto.randomUUID() 
        };
    },
    methods: {
        handleSubmit() {
            // validate input for amount and units
            if (this.validateInput()[1]) {
                // push to ingredient list as a string                
                this.ingredientList.push(`${this.selectedAmount} ${this.selectedUnit} of ${this.searchInput}`)
                console.log(`Added ${this.searchInput} into ingredient list`, this.ingredientList)
                // reset input
                this.searchInput =''
            } else {
                // populate errors on alert
                let errors = this.validateInput()[0]
                let errorMsg = errors.join("")
                alert(errorMsg)
            }           
        },
        validateInput() {
            let errors = []
            if (this.selectedAmount === 0) {errors.push("Please input an appropriate amount\n")}
            if (this.selectedUnit === "Unit") {errors.push("Please add in an appropriate unit\n")}
            if (this.searchInput === "") {errors.push("Input cannot be empty\n")}

            if (errors.length > 0) {
                return [errors, false]
            } else {
                return [errors, true]
            }
        },
        handleAmount() {
            console.log(`${this.selectedAmount} chosen`)            
        },
        handleUnit(unit) {
            console.log(`${unit} chosen`)
            this.selectedUnit = unit
        },  
        removeItem(item_index) {
            // params is item_index, rm from list
            this.ingredientList.splice(item_index, 1)
        },
        generateMealPlan()  {
            // validate Input if empty
            if (this.ingredientList.length === 0) {
                alert("List cannot be empty")
            } else {
                //TODO BY GABRIEL
            }            
        }       
    } 
};
</script>

<style scoped> 
    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {  
        opacity: 1;
    }
    
    .ingredient-list-LHS {
        vertical-align: middle;
        color: var(--light);
        .ingredient-list-box {
            background-color: #194252;
            height: 90vh;
            /* width: 45vw; */
            padding: 1rem 2rem;
            border-radius: 20px;
        }       
        .item-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            margin-bottom: 0.1rem;

            .material-icons-outlined {
                background-color: red;
                cursor: pointer;
                border-radius: 5px;
            }
        }
        
        .submit-meal-plan-btn {
            background-color: var(--light);
            border-radius: 50px;
            box-shadow: 0 4px 2px -2px var(--dark);
            padding: 1rem;
            transition: border 0.2s ease-in-out;  
        }

        .submit-meal-plan-btn:hover {
           border: 5px solid green;
        }
                
    }
    .search-bar-content {
        border-radius: 50px;
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
        border: 1px solid #6c757d;
        .submit-button2 {
            display: none;
        }
        .ingredient {
            border-radius: 50px;
        }
        .amount {
            max-width: 6vw;
        } 
        .unit {
            max-width:8vw;
        }       
    }    

    @media (max-width: 700px) {        
        .search-bar-content {
            margin: 1rem 0rem;          
            display: block;                        
            border-radius: 10px;
            box-shadow: none;
                        
            .ingredient, .amount, .unit {
                max-width: none;
                border-radius: 0;
                width: 100%;                
                margin-left: 0 !important;    
                                      
            }
            .ingredient {
                border-top-right-radius: 10px !important;
                border-top-left-radius: 10px !important;
            }
            .ingredient::placeholder {
                font-size: 0.7rem;
                text-align: center;
            }           
            .dropdown-menu {
                width: 100%;
            }
            .submit-button2 {
                display: block;
                width: 100%;
                background-color: #194252;
                color: var(--light) ;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
            }
            .submit-button {
                display: none;
            }
            
        }
        
    }
</style>