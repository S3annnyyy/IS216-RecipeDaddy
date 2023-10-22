<template>
    <div v-if="pageOneValidation">
        <!-- Original page  -->
        <div v-if="planning === false" class="row d-flex justify-content-center align-items-center" style="height: 80vh;">
            <div class="col-4 text-center">
                <h1>Meal Planner</h1>
                <p>Get meal plans specially curated for you!</p>
                <button @click="planMeal" class="btn btn-secondary">Get Started</button>
            </div>
        </div>
        
        <div v-else class="row">
            <h1 class="text-center">Questionnaire</h1>
            <form action="#" class="was-validated col-12">
                <!-- enter meal parameters -->
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-3 col-md-4 col-sm-7">
                        <label>How many people?</label>
                        <input v-model="people" class="form-control input-lg" type="number" min="1" id="people" placeholder="Number of people" required>
                        <div class="valid-feedback">Valid. Thanks!</div>
                        <div class="invalid-feedback">Please enter number of people</div>
                    </div>
                    <div v-show="people > 0" class="col-lg-3 col-md-4 col-sm-7">
                        <label>How many days?</label>
                        <input v-model="days" @change="addDay" class="form-control" type="number" min="1" max="5" id="days" placeholder="Number of days" required>
                        <div class="valid-feedback">Valid. Thanks!</div>
                        <div class="invalid-feedback">Minimum 0, Maximum 5</div>
                    </div>  
                    
                    <!-- schedule table -->
                    <div class="row d-flex justify-content-center">
                        <div v-if="days > 0" class="col-lg-2 col-md-4 col-sm-12 d-flex mt-3 justify-content-center">
                            <div style="background-color: white; border: 1px solid lightgrey;padding:20px; border-radius: 20px;">
                                <input v-model="enteredStartDate" @change="setDate" type="date" class="sameSize spacing form-control" style="height:30px" required >
                                <div class="invalid-feedback">Please enter date</div><br>
                                

                                <!-- breakfast -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 1'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 1'">Breakfast</label><br>
                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 1'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 1'">Breakfast</label><br>
                                </div>

                                <!-- lunch -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 2'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 2'">Lunch</label><br>
                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 2'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 2'">Lunch</label><br>
                                </div>
                                <!-- dinner -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 3'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 3'">Dinner</label><br>
                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[0] + ' 3'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[0] + ' 3'">Dinner</label><br>
                                </div>

                            </div>
                        </div>
                        <!-- repeat based on number of days -->
                        <div v-for="(day, ind) in dayArr" class="col-lg-2 col-md-4 col-sm-12 d-flex mt-3 justify-content-center">
                            <div style="background-color: white; border: 1px solid lightgrey; padding:20px; border-radius: 20px;">
                                <input type="text" class="spacing sameSize sameHeight form-control" disabled :value="mealDates[ind + 1]" > <br>

                                <!-- breakfast -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 1'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 1'">Breakfast</label><br>
                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 1'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 1'">Breakfast</label><br>
                                </div>

                                <!-- lunch -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 2'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 2'">Lunch</label><br>
                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 2'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 2'">Lunch</label><br>
                                </div>

                                <!-- dinner -->
                                <div v-if="enteredStartDate == ''">
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 3'" autocomplete="off" disabled>
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 3'">Breakfast</label><br>

                                </div>
                                <div v-else>
                                    <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 3'" autocomplete="off">
                                    <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 3'">Breakfast</label><br>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- submit button -->
                    <div v-if="mealValidation" @click="submitClick" class="d-grid col-2 mx-auto mt-3">
                        <button class="btn btn-primary" type="button">Continue!</button>
                    </div>
                    
                </div>

            </form>
        </div>
    </div>

    <div v-if="!pageOneValidation">
        <main class="row justify-content-center align-items-center " style="height: 92vh;">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10">
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
                    <li v-for="(item, index) in ingredientList" :key="index" class="ingredients ">
                        {{ item }}<span class="material-icons-outlined" @click="removeItemAvoid(item)">close</span>                    
                    </li>
                </ul>
                </div>
            </div>        
        </main>
    </div>


    <div v-if="pageTwoValidation">
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
                            <li v-for="(item, index) in mealPrepIngredientList" :key="index" class="ingredients ">
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
                            <input type="text" class="form-control ingredient" placeholder="Enter ingredient, unit & amount and press enter!" v-model="mealPrepSearchInput">
                            
                            <input type="number" class="form-control amount" placeholder="Amount" v-model="mealPrepSelectedAmount" v-on:change="handleAmount">

                            <button class="btn dropdown-toggle unit" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ mealPrepSelectedUnit }}</button>   
                            <ol class="dropdown-menu">
                                <li v-for="unit in mealPrepInputUnits" :key="unit" class="dropdown-item" @click="handleUnit(unit)">{{ unit }}</li>
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
    </div>


    

</template>

<script>
export default {
    data() {
        return {
            // change to true to redirect to MealPrep page 
            preferences: true,
            planning: false,
            people: 0,
            days:0,
            enteredStartDate:'',
            dayArr: [],
            mealDates: [],
            outputObject: {},
            mealCount: 0,
            mealCountArr: [],
            mealValidation: false,
            pageOneValidation: true,
            pageTwoValidation: false,

            // ingredientsToAvoid searchbar (same as recipeSearch)
            searchInput: '',
            ingredientList: [],
            selectedInputType: 'Input Type',
            selectedCuisine: 'Cuisine Type',
            inputFormat: ["Text", "OCR"],
            inputCuisine: ["Chinese", "Japanese", "Indian", "Peranakan", "Western"],
            uuid: crypto.randomUUID(), 


            // mealPrepSearch data
            mealPrepSearchInput: '',
            mealPrepSelectedUnit: 'Unit',
            mealPrepSelectedAmount: 0, 
            mealPrepIngredientList: [],          
            mealPrepInputUnits: ["ml", "litre", "g", "kg", "item-quantity"],
            uuidMealPrep: crypto.randomUUID() 
            
        }
    },
    computed: {
        setDate() {
            // create empty dateArr 
            var dateArr = [];
            // get number of days from this.days 
            var startDate = new Date(this.enteredStartDate);
            var currentDay = startDate.getDate();
            var currentMonth = startDate.getMonth() + 1;
            var currentYear = startDate.getFullYear();
            var lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

            // format startDate
            var parts = this.enteredStartDate.split('-');
            var formattedStartDate = parts[2] + '/' + parts[1] + '/' + parts[0];

            dateArr.push(formattedStartDate);

            // append dates into dateArr based on days and starting Date 
            // Format and push the initial date
            var formattedDay = currentDay < 10 ? '0' + currentDay : currentDay;
            var formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
            var formattedDate = `${formattedDay}/${formattedMonth}/${currentYear}`;

            for (var i = 0; i < 4; i++) {
                // check if date is the last day of the month
                // if it is, increment month, set date to 1 
                // if it's also the last day of the year, increment year
                // if no, increment date 
                if(currentDay === lastDayOfMonth) {
                    // increment month and reset day to 1
                    currentMonth++;
                    currentDay = 1;
                    // check if it's the last day of the year
                    if (currentMonth === 13) {
                        currentYear++;
                        currentMonth = 1;
                    }
                }
                else {
                    currentDay++;
                }
                //format to dd/mm/yyyy
                formattedDay = currentDay < 10 ? '0' + currentDay : currentDay;
                formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
                formattedDate = `${formattedDay}/${formattedMonth}/${currentYear}`;
                dateArr.push(formattedDate);
            }

            this.mealDates = dateArr;
            // add cooking dates into outputObject
            this.outputObject = {};
            for(i = 0; i < this.days; i++) {
                var dateStr = dateArr[i].toString();
                this.outputObject[dateStr] = [];
            }
        }
    },
    methods: {
        planMeal() {
            // clear contents in #content
            this.planning = true;
        },
        addDay() {
            this.dayArr = [];
            for(var i = 2; i <= this.days; i++) {
                this.dayArr.push(i);
            }

            this.enteredStartDate = '';
            this.mealDates = [];

            // set mealCountArr to empty when changing days 
            this.mealCountArr = [];

            console.log(this.mealCountArr)
        }, 
        addMeal(event){
            // get meal info, mealdate, mealnumber, mealstatus 
            var mealInfo = event.target.getAttribute('id').split(' ');
            var mealDate = mealInfo[0];
            var mealNum = mealInfo[1];
            var mealStatus = event.target.checked;

            // if mealstatus = true, 
            // select mealdate in outputObject, and append mealnum into outputObject[mealDate] 
            // else, get rid of mealnum from specified key in outputObject[mealDate] 

            if(mealStatus) {
                this.outputObject[mealDate].push(mealNum);
            }
            else {
                // get index of element to remove 
                var index = this.outputObject[mealDate].indexOf(mealNum);
                this.outputObject[mealDate].splice(index, 1);
            }

            // console.log(this.outputObject)
            // console.log('mealDate: ' + mealDate, 'mealNum: ' + mealNum, 'mealStatus: ' + mealStatus);

            // change the way submit button appears 
            // each date must have at lease one selected meal for submit button to appear 

   
            this.mealCountArr = [];
            for (let date in this.outputObject){
                // console.log(date);
                // console.log(this.outputObject[date]);

                var mealCount = this.outputObject[date].length;
                // console.log(date + " mealCount: " + mealCount);
                // store all meal counts in 1 array. 
                // if the array has elemnt 0, button will not appear
                // if elment does not have 0, button will appear 
                this.mealCountArr.push(mealCount);
            }

            console.log(this.mealCountArr)

            this.mealValidation = true;
            for (var i = 0; i < this.mealCountArr.length; i++) {
                // if (this.mealCountArr[i])'
                if (this.mealCountArr[i] == 0){
                    this.mealValidation = false;
                }
            }

            console.log(this.mealValidation)
            console.log(this.outputObject);
        },
        submitClick() {
            this.pageOneValidation = false;
            console.log(this.pageOneValidation);
        },

        // ingredientsToAvoid methods 
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
        removeItemAvoid(item) {
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
            let result = `Create me a ${cuisineType} cuisine recipe using just the following ingredients: ${ingredients}. DO NOT use any additional ingredients`
            return result
        },
        validateInputAvoid() {
            let errors = [ ]
            if (this.ingredientList.length === 0) {errors.push("You can't create a recipe with 0 ingredients you dumb fuck")}
            if (this.selectedInputType === "Input Type") {errors.push("Please select one method of input")}
            if (this.selectedCuisine === "Cuisine Type") {errors.push("Please select one cuisine type")}
            if (errors.length === 0) {
                return ["", true]
            } else {
                return [errors, false]
            }
            
        },
        parseDataToRecipePage() {
            // validate inputs
            if (this.validateInputAvoid()[1]) {
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
                let errors = this.validateInputAvoid()[0].join(",\n")
                alert(errors)
            }
            
        },

        // end of IngredientsToAvoid methods 


        // mealPrepSearch methods 


        handleSubmit() {
            // validate input for amount and units
            if (this.validateInput()[1]) {
                // push to ingredient list as a string                
                this.mealPrepIngredientList.push(`${this.mealPrepSelectedAmount} ${this.mealPrepSelectedUnit} of ${this.mealPrepSearchInput}`)
                console.log(`Added ${this.mealPrepSearchInput} into ingredient list`, this.mealPrepIngredientList)
                // reset input
                this.mealPrepSearchInput =''
            } else {
                // populate errors on alert
                let errors = this.validateInput()[0]
                let errorMsg = errors.join("")
                alert(errorMsg)
            }           
        },
        validateInput() {
            let errors = []
            if (this.mealPrepSelectedAmount === 0) {errors.push("Please input an appropriate amount\n")}
            if (this.mealPrepSelectedUnit === "Unit") {errors.push("Please add in an appropriate unit\n")}
            if (this.mealPrepSearchInput === "") {errors.push("Input cannot be empty\n")}

            if (errors.length > 0) {
                return [errors, false]
            } else {
                return [errors, true]
            }
        },
        handleAmount() {
            console.log(`${this.mealPrepSelectedAmount} chosen`)            
        },
        handleUnit(unit) {
            console.log(`${unit} chosen`)
            this.mealPrepSelectedUnit = unit
        },  
        removeItem(item_index) {
            // params is item_index, rm from list
            this.mealPrepIngredientList.splice(item_index, 1)
        },
        generateMealPlan()  {
            // validate Input if empty
            if (this.mealPrepIngredientList.length === 0) {
                alert("List cannot be empty")
            } else {
                //TODO BY GABRIEL
            }            
        }    
        
        // end of mealPrepSearch methods 
     }
}

</script>

<style scoped>  
    .spacing {
        margin-bottom:10px;
    }
    li{
        list-style-type: none;
    }
    .sameSize {
        width:160px;
    }
    .sameHeight{
        height:28px;
    }

    /* ingredientsToAvoid styles */
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

    .material-icons-outlined {
        cursor: pointer;
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
    .search-bar {
        border-radius: 50px;
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
        border: 1px solid #6c757d;
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
    /* END OF INGREDIENTS TO SEARCH STLES */



    /* mealPrepSearch styles */
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
    /* END OF MEALPREPSEARCH STYLES */

</style>