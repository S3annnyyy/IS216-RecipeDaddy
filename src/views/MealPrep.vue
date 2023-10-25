<template>
    <!-- Page One -->
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
            
            <h1 class="text-center" style="margin-top: 5%;">Questionnaire</h1>
            <form action="#" class="was-validated col-12">
                <!-- enter meal parameters -->
                <div class="row d-flex justify-content-center" style="margin-top: 3%;">
                    <div class="col-lg-3 col-md-4 col-sm-7">
                        <label>How many people?</label>
                        <input v-model="people" class="form-control input-lg" type="number" min="1" id="people" required>
                        <div class="valid-feedback">Valid. Thanks!</div>
                        <div class="invalid-feedback">Please enter number of people</div>
                    </div>
                    <div v-show="people > 0" class="col-lg-3 col-md-4 col-sm-7">
                        <label>How many days?</label>
                        <select class="form-select form-select-md" v-model="days" @change="addDay" id="days" required>
                            <option selected>Please select days</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <!-- <input v-model="days" @change="addDay" class="form-control" type="number" min="1" max="5" id="days" placeholder="Number of days" required> -->
                        <div class="valid-feedback">Valid. Thanks!</div>
                        <div class="invalid-feedback">Minimum 0, Maximum 5</div>
                    </div>  
                    
                    <!-- Schedule -->
                    <div class="row d-flex justify-content-center">
                        <!-- Each Col holds one day -->
                        <div v-if="days > 0" class="col-lg-2 col-md-4 col-sm-7">
                            <div class="card shadow-sm text-center" style="margin-top: 3%;">
                                <div class="card-body ">
                                    <input v-model="enteredStartDate" @change="setDate" type="date" class="sameSize spacing form-control" style="height:30px; margin-left: auto; margin-right: auto;" required>
                                    <br>
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
                        </div>

                        <!-- repeat based on number of days -->
                        <div v-for="(day, ind) in dayArr" class="col-lg-2 col-md-4 col-sm-7">
                            <div class="card shadow-sm" style="margin-top: 3%;">
                                <div class="card-body text-center">
                                    <input type="text" class="spacing sameSize sameHeight form-control" disabled :value="mealDates[ind + 1]" style="margin-left: auto; margin-right: auto;" required>
                                    <br>
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
                                        <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 3'">Dinner</label><br>
                                    </div>
                                    <div v-else>
                                        <input @click="addMeal" type="checkbox" class="btn-check" :id="mealDates[ind + 1] + ' 3'" autocomplete="off">
                                        <label class="btn btn-outline-primary spacing sameSize" :for="mealDates[ind + 1] + ' 3'">Dinner</label><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- submit button -->
                    <div v-if="mealValidation" @click="submitClick" class="d-flex justify-content-center col-4 mt-3 mb-3" >
                        <button class="btn btn-primary" type="button">Continue!</button>
                    </div>
                    
                </div>

            </form>
        </div>
    </div>

    <!-- Page two: Ingredients To Avoid -->

    <div v-if="pageTwoValidation">
        <main class="row justify-content-center align-items-center " style="height: 92vh;">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10">
                <h1 class="text-center">Please Enter Ingredients to avoid!</h1>
                <div class="input-group input-group-lg search-bar">
                    <input type="text" class="form-control" placeholder="Enter ingredients you would like to avoid!" v-model="avoidInput" @keydown.enter="handleEnter">
                    <button class="btn submit-button" type="submit" @click="submitClick2" aria-expanded="false">                   
                        <span class="submit-button-content">
                        <svg width="32" height="32" viewBox="0 0 24 24" class="arrow"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>                        
                        </span>                    
                    </button>
                    <button type="button" class="btn submit-button2"  @click="submitClick2">Create Recipe</button>
                </div>
                <div class="list-wrapper">
                    <ul class="list-container-toAvoid">
                    <li v-for="(item, index) in avoidList" :key="index" class="ingredients-toAvoid">
                        {{ item }}<span class="material-icons-outlined" @click="removeItemAvoid(item)">close</span>                    
                    </li>
                </ul>
                </div>
            </div>        
        </main>
    </div>

    <!-- Page Three: Ingredients to cook with -->

    <div v-if="pageThreeValidation">
        <main class="row justify-content-center align-items-center" style="height: 92vh;">        
        <div class="col-xl-6 col-l-6 col-md-6 col-sm-12 mealPrepIngredient-list-LHS">
            <div class="container-fluid mealPrepIngredient-list-box position-relative">
                <div class="row title">
                    <div class="col-12">
                        <h3>Ingredient List:</h3>
                    </div>
                </div>
                <div class="row ingredients-list-wrapper">
                    <div class="col-10">
                        <ol class="list-container">
                            <li v-for="(item, index) in mealPrepIngredientList" :key="index" class="ingredients ">
                                <div class="mealPrepItem-content">
                                    <span>{{ index + 1 }}. {{ item }}</span>
                                    <span class="material-icons-outlined" @click="mealPrepRemoveItem(index)">close</span>
                                </div>                  
                            </li>
                        </ol>  
                    </div>                  
                </div>                
                <button class=" position-absolute bottom-0 end-0 m-4 mealPrepSubmit-meal-plan-btn" @click="mealPrepGenerateMealPlan">Generate meal plan</button>                
            </div>
        </div>
        
               
        <div class="col-xl-6 col-l-6 col-md-6 col-sm-12 search-bar-RHS">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-xxl-10 col-xl-10 col-l-12 col-md-12 col-sm-12 text-center">
                        <div class="input-group input-group-md mealPrepSearch-bar-content">
                            <input type="text" class="form-control mealPrepIngredient" placeholder="Enter ingredient, unit & amount and press enter!" @keydown.enter="mealPrepHandleSubmit" v-model="mealPrepSearchInput">
                            
                            <input type="number" class="form-control amount" placeholder="Amount" v-model="mealPrepSelectedAmount" v-on:change="mealPrepHandleAmount">

                            <button class="btn dropdown-toggle unit" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ mealPrepSelectedUnit }}</button>   
                            <ol class="dropdown-menu">
                                <li v-for="unit in mealPrepInputUnits" :key="unit" class="dropdown-item" @click="mealPrepHandleUnit(unit)">{{ unit }}</li>
                            </ol>
                        </div>                       
                    </div>
                    <div class="form-check col-xxl-10 col-xl-10 col-l-12 col-md-12 col-sm-12" style="padding-left: 2.7rem; padding-top: 0.5rem;">
                        <input @change="limitIngredient" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault" style="font-size: small;">
                            Only specified ingredients
                        </label>
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
            people: 0,  // EXTRACT PEOPLE COUNT FOR SEAN 
            days:0,
            enteredStartDate:'',
            dayArr: [],
            mealDates: [],
            outputObject: {}, // EXTRACT DATE AND MEALS FOR SEAN
            mealCountArr: [],
            mealValidation: false,
            pageOneValidation: true,
            pageTwoValidation: false,
            pageThreeValidation: false, 

            // ingredientsToAvoid searchbar (same as recipeSearch)
            avoidInput: '',
            avoidList: [], // EXTRACT INGREDIENTS TO AVOID FOR SEAN
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
            uuid: crypto.randomUUID(),
            mealPrepLimitIngedient: false,

            // FINAL OUTPUT OBJECT (JUN KAI)
            // res --> FINAL OUTPUT OBJECT (SEAN)
            // number of res output depends on number of mealCount
            resJunKai: {},
            resSean: {}

            
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

            this.mealValidation = true;
            for (var i = 0; i < this.mealCountArr.length; i++) {
                // if (this.mealCountArr[i])'
                if (this.mealCountArr[i] == 0){
                    this.mealValidation = false;
                }
            }
        },
        submitClick() {
            this.pageOneValidation = false;
            this.pageTwoValidation = true;
        },

        // ingredientsToAvoid methods 
        handleEnter() {
            // Add the input value to the search history array
            this.avoidList.push(this.avoidInput);

            // Clear the input box
            this.avoidInput = '';

            console.log('Food to avoid:', this.avoidList);
            console.log(`Filled with ${this.avoidList.length} item(s)`)
            // populate input as boxes
            // this.populateInput()
        },        
        removeItemAvoid(item) {
            console.log(`rm btn clicked for ${item} list item`)     
            
            // remove item for avoidList
            let item_index = this.avoidList.indexOf(item)
            this.avoidList.splice(item_index, 1)
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
            if (this.avoidList.length === 0) {errors.push("You can't create a recipe with 0 ingredients you dumb fuck")}
            if (this.selectedInputType === "Input Type") {errors.push("Please select one method of input")}
            if (this.selectedCuisine === "Cuisine Type") {errors.push("Please select one cuisine type")}
            if (errors.length === 0) {
                return ["", true]
            } else {
                return [errors, false]
            }
            
        },

        submitClick2() {
            this.pageTwoValidation = false;
            this.pageThreeValidation = true;
        },

        // end of IngredientsToAvoid methods 


        // mealPrepSearch methods 


        mealPrepHandleSubmit() {
            // validate input for amount and units
            if (this.mealPrepValidateInput()[1]) {
                // push to ingredient list as a string                
                this.mealPrepIngredientList.push(`${this.mealPrepSelectedAmount} ${this.mealPrepSelectedUnit} of ${this.mealPrepSearchInput}`)
                console.log(`Added ${this.mealPrepSearchInput} into ingredient list`, this.mealPrepIngredientList)
                // reset input
                this.mealPrepSearchInput =''
            } else {
                // populate errors on alert
                let errors = this.mealPrepValidateInput()[0]
                let errorMsg = errors.join("")
                alert(errorMsg)
            }           
        },
        mealPrepValidateInput() {
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
        mealPrepHandleAmount() {
            console.log(`${this.mealPrepSelectedAmount} chosen`)            
        },
        mealPrepHandleUnit(unit) {
            console.log(`${unit} chosen`)
            this.mealPrepSelectedUnit = unit
        },  
        mealPrepRemoveItem(item_index) {
            // params is item_index, rm from list
            this.mealPrepIngredientList.splice(item_index, 1)
        },
        mealPrepGenerateMealPlan()  {
            // validate Input if empty
            if (this.mealPrepIngredientList.length === 0) {
                alert("List cannot be empty")
            } else {
                // return number of people 
                console.log("Number of people: " + this.people);
                // return dates and meals 
                console.log(this.outputObject);
                // return ingredients to avoid 
                console.log(this.avoidList);
                // return ingrients to cook with 
                console.log(this.mealPrepIngredientList);
                // return only use entered ingredients?
                console.log("Cook with specified ingredients only?: " + this.mealPrepLimitIngedient);

                // num of meals (num of objects in final output obj)
                var mealCount = 0;
                for(var i = 0; i < this.mealCountArr.length; i++) {
                    mealCount += this.mealCountArr[i];
                }
                console.log(mealCount);


                // generate output for sean 
                // this.resSean will change everytime user presses generate recipe, you will have to do data manipulation here 
                this.resSean["people"] = this.people;
                this.resSean["dates and meals"] = this.outputObject;
                this.resSean["avoidList"] = this.avoidList;
                this.resSean["ingreients"] = this.mealPrepIngredientList;
                this.resSean["cook_with_specified"] = this.mealPrepLimitIngedient;
            

                console.log(this.resSean);

                // 
            }           
        },
        
        limitIngredient(event) {
            this.mealPrepLimitIngedient = event.target.checked;
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
        width:90%;
    }
    .sameHeight{
        height:28px;
    }

    /* ingredientsToAvoid styles */
    .submit-button2 {
        display: none;
    }
    .list-container-toAvoid {
        display: flex;
        flex-direction: row;       
        overflow-x: auto;  
    }

    .ingredients-toAvoid {
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
    /* END OF INGREDIENTS TO AOVID STLES */



    /* mealPrepSearch styles */
    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {  
        opacity: 1;
    }
    
    .mealPrepIngredient-list-LHS {
        vertical-align: middle;
        color: var(--light);
        .mealPrepIngredient-list-box {
            background-color: #194252;
            height: 90vh;
            /* width: 45vw; */
            padding: 1rem 2rem;
            border-radius: 20px;
        }       
        .mealPrepItem-content {
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
        
        .mealPrepSubmit-meal-plan-btn {
            background-color: var(--light);
            border-radius: 50px;
            box-shadow: 0 4px 2px -2px var(--dark);
            padding: 1rem;
            transition: border 0.2s ease-in-out;  
        }

        .mealPrepSubmit-meal-plan-btn:hover {
           border: 5px solid green;
        }
                
    }
    .mealPrepSearch-bar-content {
        border-radius: 50px;
        box-shadow: 0 4px 2px -2px var(--text-light-secondary);
        border: 1px solid #6c757d;
        .mealPrepSubmit-button2 {
            display: none;
        }
        .mealPrepIngredient {
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
        .mealPrepSearch-bar-content {
            margin: 1rem 0rem;          
            display: block;                        
            border-radius: 10px;
            box-shadow: none;
                        
            .mealPrepIngredient, .amount, .unit {
                max-width: none;
                border-radius: 0;
                width: 100%;                
                margin-left: 0 !important;    
                                      
            }
            .mealPrepIngredient {
                border-top-right-radius: 10px !important;
                border-top-left-radius: 10px !important;
            }
            .mealPrepIngredient::placeholder {
                font-size: 0.7rem;
                text-align: center;
            }           
            .dropdown-menu {
                width: 100%;
            }
            .mealPrepSubmit-button2 {
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