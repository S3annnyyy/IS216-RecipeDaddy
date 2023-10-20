<template>
    <!-- Original page  -->
    <div v-if="planning === false" class="row d-flex justify-content-center align-items-center" style="height: 80vh;">
        <div class="col-4 text-center">
            <h1>Meal Planner</h1>
            <p>Get meal plans specially curated for you!</p>
            <button @click="planMeal" class="btn btn-secondary">Get Started</button>
        </div>
    </div>
    <!-- enter meal parameters -->
    <div v-else class="row">
        <h1 class="text-center">Questionnaire</h1>
        <form action="#" class="was-validated col-12">
            <div class="row d-flex justify-content-center">
                <div class="col-lg-3 col-md-4 col-sm-7">
                    <label>How many people?</label>
                    <input v-model="people" class="form-control input-lg" type="number" min="1" id="people" placeholder="Number of people" required>
                    <div class="valid-feedback">Valid. Thanks!</div>
                    <div class="invalid-feedback">Please enter number of people</div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-7">
                    <label>How many days?</label>
                    <input v-model="days" @change="addDay" class="form-control" type="number" min="1" max="5" id="days" placeholder="Number of days" required>
                    <div class="valid-feedback">Valid. Thanks!</div>
                    <div class="invalid-feedback">Minimum 0, Maximum 5</div>
                </div>       

            </div>
        </form>
    </div>
    
    <!-- schedule table -->
    
    <div v-if="days > 0" class="row d-flex justify-content-center">
        <!-- have first bar always there, other bars repeat -->
        <div class="col-lg-2 col-md-3 col-sm-6 col-xs-6 d-flex justify-content-center">
            <div style="background-color: white; border: 1px solid lightgrey; padding:20px; border-radius: 20px;">
                <input v-model="enteredStartDate" @change="setDate" type="date" class="sameSize spacing"><br>

                <input type="checkbox" class="btn-check" id="breakfastD1" autocomplete="off">
                <label class="btn btn-outline-primary spacing sameSize" for="breakfastD1">Breakfast</label><br>

                <input type="checkbox" class="btn-check" id="lunchD1" autocomplete="off">
                <label class="btn btn-outline-primary spacing sameSize" for="lunchD1">Lunch</label><br>

                <input type="checkbox" class="btn-check" id="dinnerD1" autocomplete="off">
                <label class="btn btn-outline-primary sameSize" for="dinnerD1">Dinner</label>
            </div>
        </div>
        <!-- repeat based on number of days -->
        <div v-for="day in dayArr" class="col-lg-2 col-md-3 col-sm-6 col-xs-6 d-flex justify-content-center">
            <div style="background-color: white; border: 1px solid lightgrey; padding:20px; border-radius: 20px;">
                <input type="text" class="spacing sameSize sameHeight" disabled value="18/10/2023"> <br>

                <input type="checkbox" @change="assignBreakfastId" class="btn-check" :id="'breakfastD'+ day" autocomplete="off">
                <label class="btn btn-outline-primary spacing sameSize"  :for="'breakfastD'+ day">Breakfast</label><br>

                <input type="checkbox" class="btn-check" :id="'lunchD'+ day" autocomplete="off">
                <label class="btn btn-outline-primary spacing sameSize" :for="'lunchD' + day">Lunch</label><br>

                <input type="checkbox" class="btn-check" :id="'dinnerD' + day" autocomplete="off">
                <label class="btn btn-outline-primary sameSize" :for="'dinnerD' + day">Dinner</label>
            </div>
        </div>
    </div>

</template>

<script>
// when user clicks on mealPrep page 
// 1. check if preferences are set (check data base for that, current default is true)
// 2. if false, redirect to preferences page 
// 3. if true, remain on mealPrep page
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
        }
    },
    computed: {
        setDate() {
            // create empty dateArr 
            var dateArr = [];
            // get number of days from this.days 
            var days = this.days;
            var startDate = new Date(this.enteredStartDate);
            var currentDay = startDate.getDate();
            var currentMonth = startDate.getMonth() + 1;
            var currentYear = startDate.getFullYear();
            var lastDayOfMonth = new Date(startDate.getFullYear(), currentMonth, 0).getDate();

            console.log(`day: ${currentDay}, month: ${currentMonth}, days in month: ${lastDayOfMonth}`)

            // append dates into dateArr based on days and starting Date 
            for (var i = 0; i < days; i++) {
                
                // check if date is the last day of the month
                // if it is, store date inside dateArr, increment month, set date to 1 
                // it no, store date inside dateArr, increment date 

                if(currentDay === lastDayOfMonth) {
                    // format to dd/mm/yyyy
                    if(currentDay < 10) {
                        currentDay = '0' + currentDay;
                    }
                    if(currentMonth < 10) {
                        currentMonth = '0' + currentMonth;
                    }
                    var formattedDate = `${currentDay}/${currentMonth}/${currentYear}`;
                    dateArr.push(formattedDate)

                    currentMonth = parseInt(currentMonth) + 1;
                    currentDay = 1;
                }
                else {
                    //format to dd/mm/yyyy
                    if(currentDay < 10) {
                        currentDay = '0' + currentDay;
                    }
                    if(currentMonth < 10) {
                        currentMonth = '0' + currentMonth;
                    }
                    var formattedDate = `${currentDay}/${currentMonth}/${currentYear}`;
                    dateArr.push(formattedDate)
                    currentDay = parseInt(currentDay) + 1;
                }            
            }

            console.log(dateArr)

        }
    },
    methods: {
        checkPreferences() {
            // extract preferences from database, if preferences set --> preferences == true 
            // for now just set preferences as no database 
            if(this.preferences == false) {
                // redirect tp Preferences.vue
                this.$router.push('/preferences');
            }
        // remain on current page 
        },
        planMeal() {
            // clear contents in #content
            this.planning = true;
        },
        addDay() {
            this.dayArr = [];
            for(var i = 2; i <= this.days; i++) {
                this.dayArr.push(i);
            }
            console.log(this.dayArr);
        }
     },
    created() {
            this.checkPreferences(); // call check preferences when MealPrep is called 
    }
}

// make date for each generated div dynamic 
// record all info 

</script>

<style scoped>  
.spacing {
    margin-bottom:10px;
}
li{
    list-style-type: none;
}
.sameSize {
    width:120px;
}
.sameHeight{
    height:28px;
}
</style>