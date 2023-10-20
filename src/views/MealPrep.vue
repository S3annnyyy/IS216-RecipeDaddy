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
        <div v-for="(day, ind) in dayArr" class="col-lg-2 col-md-3 col-sm-6 col-xs-6 d-flex justify-content-center">
            <div style="background-color: white; border: 1px solid lightgrey; padding:20px; border-radius: 20px;">
                <input type="text" class="spacing sameSize sameHeight" disabled :value="mealDates[ind + 1]" > <br>

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
            mealDates: []
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

            for (var i = 0; i < days - 1; i++) {
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
            console.log(dateArr);
            this.mealDates = dateArr;
            // console.log(this.mealDates)
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