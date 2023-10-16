<template>
    <main class="row d-flex justify-content-center align-content-center">
        <div class="col-4">
            <div>
                <h1>Meal Planner</h1>
                <p>Get meal plans specially curated for you !</p>
            </div>
        </div>
    </main> 
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
                preferences: true
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
            }
        },
        created() {
                this.checkPreferences(); // call check preferences when MealPrep is called 
        }
    }
</script>

<style scoped>

</style>