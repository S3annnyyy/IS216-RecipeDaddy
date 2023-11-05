<style scoped>
.box {
    background-color: #194252;
    padding: 1rem;
    color: var(--light);
    border-radius: 10px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
   
}

.shopping-list-button {   
    background-color: var(--light);
    border-radius: 10px;
    padding: 0.5rem 1rem;    
    border: 1px solid #194252;      
    box-shadow: 0 6px 2px -2px var(--dark); 
    width: 100%;
}

/* shopping list styles */
.modal-title, .card {
    color: var(--dark);
}
.center {
    text-align: center;
    padding: 1%;
    font-size: large;
}

.dates {
    border-radius: 10px;
    padding: 5px;
}

/* Additional styles for the food section */
#food-section {
    margin-top: 20px;
    /* width: 100%; */
    margin-left: auto;
    margin-right: auto;
   
}

.food-item {
    text-align: left;
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
}

.meal-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
}

.food-item img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
}

.buttons {
    margin-top: 10px;
}

.replace-button {
    background-color: #E6E3E3;
    border-radius: 20px;
    border: none;
    padding: 5px 5px;
    margin-right: 5px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
}

.view-recipe-button {
    background-color: #E6E3E3;
    border-radius: 20px;
    border: none;
    padding: 5px 5px;
    margin-right: 5px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
}

.delete-button {
    background-color: #E6E3E3;
    border-radius: 20px;
    border: none;
    padding: 5px 5px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
}

.breakfast-recipe {
    font-size: 17px;

}

.lunch-recipe {
    font-size: 17px;
}

.dinner-recipe {
    font-size: 17px;
}

.selected-date {
    background-color: var(--light);
    color: var(--dark);    
    /* Change this color to your preferred light blue color */
}

.card-img-top {
    width: 100%;
    /* height: 20vw; */
    /* object-fit: cover; */
}

.indivDate {
    border: 1px solid var(--light);
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
    cursor: pointer
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.login-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    text-align: center;
}
</style>

<template>
    <!-- Meal Schedule header  -->
    <main class="row mx-lg-5 mx-md-2 mx-sm-2">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <h1>Meal Schedule</h1>
            <div>
                <img style="padding-right: 0.5rem; padding-bottom: 0.5rem;" src="../../assets/chef-hat.png" alt="">
                <span>{{ currentWeekStartText }} - {{ currentWeekEndText }}</span>
            </div>
        </div>
        <div class="col">
        </div>
    </main>


    <!-- Current Week  -->
    <main class="row mx-lg-5 mx-md-2 mx-sm-2">
        <div class="col-lg-3 col-md-3 col-sm-12 box text-center">
            <h6>CURRENT WEEK</h6>
            <div>
                <span class="fa-solid fa-angle-left" @click="decrementWeek"></span>
                {{ formatCurrentDate() }}
                <span class="fa-solid fa-angle-right" @click="incrementWeek"></span>
                <div class="row">

                    <div class="col">
                        <button type="button" class="shopping-list-button mt-4" data-bs-toggle="modal"
                            data-bs-target="#overviewRecipe">Shopping List
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="overviewRecipe" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Your Shopping List (Selected Week)
                                        </h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span class="material-icons-outlined">close</span>        
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="accordion" id="accordionExample">
                                            <div class="card" v-for="(date, index) in formattedDates" :key="index">
                                                <div :id="`heading${index}`" class="card-header">
                                                    <h2 class="mb-0 text-center">
                                                        <button class="btn btn-link text-decoration-none" type="button"
                                                            data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`"
                                                            aria-expanded="true" :aria-controls="`collapse${index}`">
                                                            <span v-html="date"></span>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div :id="`collapse${index}`" class="collapse"
                                                    :aria-labelledby="`heading${index}`" data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <div v-if="shoppingListMap[date]">
                                                            <div v-for="(no_ingredient, itemIndex) in shoppingListMap[date]"
                                                                :key="itemIndex">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox"
                                                                        :id="`check${itemIndex}`" @click="addToCart(no_ingredient)">
                                                                    <label class="form-check-label"
                                                                        :for="`check${itemIndex}`">
                                                                        {{ no_ingredient }}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-else>
                                                            No shopping items for this date.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <!-- ... -->
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                            @click="redirectToPaymentPage()">
                                            <span class="text-white text-decoration-none">Go to payment</span>
                                        </button>
                                        <!-- ... -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- end modal -->
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Calendar -->
    <div class="row mx-lg-5 mx-md-2 mx-sm-2 mt-3 box dates">
        <div @click="setCurrentDate(date)" class="col center indivDate" v-for="(date, index) in weekDates" :key="index"
            :class="{ 'selected-date': isDateSelected(date) }">
            <span v-html="formatDate(date)"></span>
        </div>
    </div>

    <!-- Food Section -->
    <main class="row py-1 mb-3 d-flex justify-content-center" id="food-section">
    <h4 v-if="mealSchedule.receivedData == null || mealSchedule.receivedData.length == 0" class="text-center">
        Generate a meal and add it to your schedule!
    </h4>

    <div v-else-if="mealSchedule.receivedData.length > 0"
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-3 mb-3 border meal-card" v-for="(meal, index) in mealSchedule.receivedData" :key="index">
        <h3 class="card-title text-left pt-2 text-center">{{ formatMealType(meal.meal_type) }}</h3>
        <img :src="extractLinkFromParentheses(meal.image_url)" alt="Meal" class="card-img-top img-fluid" style="object-fit: contain;" />
        <div class="card-body" style="width:100%;">
            <div class="card-text breakfast-recipe text-center">{{ meal.recipe_name }}</div>
            <div class="buttons row d-flex justify-content-center">
                <button class="view-recipe-button col-sm-6 col-md-7 col-lg-3 mt-1" @click="viewRecipe(meal)">View
                    Recipe</button>
                <button class="replace-button col-sm-6 col-md-7 col-lg-3 mt-1"
                    @click="replaceMeal(meal)">Replace</button>
                <button class="delete-button col-sm-6 col-md-7 col-lg-3 mt-1" @click="deleteMeal(meal)">Delete</button>
            </div>
        </div>
    </div>
</main>

    <!-- THIS PORTION IS FOR USER AUTHENTICATION CHECK -->
    <div v-if="showLoginAlert" class="overlay" @click="routeBackToHome"></div>
    <div v-if="showLoginAlert" class="login-alert">
        <LoginFailed />
        <p>Please log in first to access this feature.</p>
    </div>
    <!-- END OF USER AUTHENTICATION CHECK -->
</template>
<script>
/* questions  = {
    NoOfPax: 3,
    NoOfDays: 2,
    Dates: {
        "19/08/23": {
            breakfast: true,
            lunch: true,
            dinner: false
        },
        "20/08/23": {
            breakfast: false,
            lunch: true,
            dinner: true,
        }
    }
} */
import { formatDate } from "@vueuse/core";
import axios from "axios";
import LoginFailed from "../../components/LoginFailed.vue";
import { handleError } from "vue";

Date.prototype.GetFirstDayOfWeek = function () {
    const firstDayOfWeek = new Date(this);
    if (firstDayOfWeek.getDay() === 0) {
        firstDayOfWeek.setDate(this.getDate() - 6);
    } else {
        firstDayOfWeek.setDate(this.getDate() - (this.getDay() - 1));
    }
    return firstDayOfWeek;
};

Date.prototype.GetLastDayOfWeek = function () {
    const lastDayOfWeek = new Date(this);
    if (lastDayOfWeek.getDay() === 0) {
        lastDayOfWeek.setDate(this.getDate());
    } else {
        lastDayOfWeek.setDate(this.getDate() + (7 - this.getDay()));
    }
    return lastDayOfWeek;
};

export default {
    data() {
        return {
            currentDate: new Date(),
            dates: [],
            mealSchedule: {
                breakfast: false,
                lunch: false,
                dinner: false,
                receivedData: null,

            },
            showLoginAlert: false,
            baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
            token: null,
            username: sessionStorage.getItem("user"),
            shoppingListMap: {},
            shoppingCart: [],
        };
    },
    watch: {
        dates: {
            handler() {
                this.getShoppingList();
            },
            deep: true
        }
    },
    computed: {
        formattedDates() {
            return this.dates.map(date => date.toISOString().split("T")[0]);
        }
        ,
        weekDates() {
            this.dates = [];
            const currentWeekStart = this.currentDate.GetFirstDayOfWeek();
            for (let i = 0; i < 7; i++) {
                const date = new Date(currentWeekStart);
                date.setDate(currentWeekStart.getDate() + i);
                this.dates.push(date);
            }
            // console.log(this.dates);
            return this.dates;
        },
        currentWeekEnd() {
            return this.currentDate.GetLastDayOfWeek();
        },
        currentWeekStartText() {
            return this.currentDate.GetFirstDayOfWeek().toDateString();
        },
        currentWeekEndText() {
            return this.currentDate.GetLastDayOfWeek().toDateString();
        },
        getColumnClass() {
            return (itemCount) => {
                if (itemCount === 1) {
                    return 'col col-md-6 offset-md-3';
                } else if (itemCount === 2) {
                    return 'col col-md-6';
                } else if (itemCount >= 3) {
                    return 'col col-md-4';
                }
            };
        },
    },
    methods: {
        addToCart(item) {
            const index = this.shoppingCart.indexOf(item);
            if (index === -1) {
                // Item is not in the cart, so add it
                this.shoppingCart.push(item);
            } else {
                // Item is already in the cart, so remove it
                this.shoppingCart.splice(index, 1);
            }
        },
        incrementDate() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() + 1);
            this.currentDate = newDate;
        },
        decrementDate() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() - 1);
            this.currentDate = newDate;
        },
        formatDate(date) {
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = daysOfWeek[date.getDay()];
            const dayOfMonth = date.getDate();
            return `${dayOfWeek}<br> ${dayOfMonth}`;
        },
        formatCordionDate(date) {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = daysOfWeek[date.getDay()];
            const dayOfMonth = date.getDate();
            const month = date.getMonth();
            return `${dayOfWeek}<br> ${dayOfMonth}/${month}/${date.getFullYear()}`;
        },
        formatCurrentDate() {
            return this.currentDate.toDateString();
        },
        isDateSelected(date) {
            return (
                date.getDate() === this.currentDate.getDate() && date.getMonth() === this.currentDate.getMonth() && date.getFullYear() === this.currentDate.getFullYear()
            );
        },
        incrementWeek() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() + 7);
            this.currentDate = newDate;
            this.getShoppingList();
            this.getMealData(this.username, this.currentDate.toISOString().split("T")[0], this.token);
        },
        decrementWeek() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() - 7);
            this.currentDate = newDate;
            this.getShoppingList();
            this.getMealData(this.username, this.currentDate.toISOString().split("T")[0], this.token);

        },
        setCurrentDate(date) {
            this.currentDate = date;
            this.getMealData(this.username, this.currentDate.toISOString().split("T")[0], this.token);
        },
        closeOverviewModal() {
            // Use Bootstrap's modal method to close the modal
            $(this.$refs.modalElement).modal('hide');
        },
        redirectToPaymentPage() {
            this.closeOverviewModal();
            this.$router.push({
                name: "payment",
                query: {
                    data: JSON.stringify(this.shoppingCart)
                }
            });
        },
        async getMealData(username, date, token) {

            axios
                .get(`${this.baseUrl}/user-meal-plan?username=${username}&meal_date=${date}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((mealResponse) => {
                    console.log(mealResponse.data);
                    // Assuming you want to do something with the meal data
                    const mealTypeOrder = {
                        1: 1,
                        2: 2,
                        3: 3,
                    }
                    mealResponse.data.sort((a, b) => {
                        return mealTypeOrder[a.meal_type] - mealTypeOrder[b.meal_type];
                    })
                    mealResponse.data = mealResponse.data.filter((item) => {
                        return item.isCompleted == false;
                    });

                    this.mealSchedule.receivedData = mealResponse.data;
                })
                .catch((mealError) => {
                    console.error('Error fetching meal schedule:', mealError);
                });
        },
        formatMealType(num) {
            if (num == "1") {
                return "Breakfast"
            } else if (num == "2") {
                return "Lunch"
            } else if (num == "3") {
                return "Dinner"
            }
        },
        extractLinkFromParentheses(input) {
            // Define a regular expression to match the link inside parentheses
            const regex = /\((.*?)\)/;

            // Use the regular expression to extract the link
            const match = regex.exec(input);

            // Check if a match is found
            if (match && match.length > 1) {
                // The link will be in match[1]
                return match[1];
            } else {
                // No match found
                return input;
            }
        },
        viewRecipe(meal) {
            this.$router.push({
                name: "mealschedulegenerated",
                params: {
                    id: meal.id

                },
                query: {
                    id: meal.id, data: JSON.stringify(meal)
                }
            });
        },
        replaceMeal(meal) {
            this.$router.push({
                name: "replacement",
                params: {
                    id: meal.id
                },
                query: {
                    id: meal.id, data: JSON.stringify(meal)
                }


            });
        },
        deleteMeal(meal) {
            const mealId = meal.id;
            axios
                .delete(`${this.baseUrl}/user-meal-plan?id=${mealId}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                .then(response => {
                    console.log(`Meal plan with ID ${mealId} deleted.`);
                    // Optionally, you can handle any further actions, such as updating the UI.
                })
                .catch(error => {
                    console.error(`Error deleting meal plan: ${error}`);
                    // Handle the error as needed, e.g., show an error message.
                });
            this.mealSchedule.receivedData = this.mealSchedule.receivedData.filter(item => item.id !== mealId);

        },
        async getShoppingList() {
            // Create a temporary array to store ISO date strings
            const isoDates = this.dates.map((date) => date.toISOString().split("T")[0]);

            // Initialize an array to store shopping items
            const shoppingItems = [];

            // Use Promise.all to make multiple API requests concurrently
            Promise.all(
                isoDates.map((isoDate) =>
                    axios
                        .get(`${this.baseUrl}/user-meal-plan?username=${this.username}&meal_date=${isoDate}`, {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },
                        })
                        .then((mealResponse) => {
                            const shop = mealResponse.data.filter((item) => {
                                return item.isCompleted === false && item.no_ingredients != null;
                            });
                            shoppingItems.push(...shop);
                        })
                        .catch((mealError) => {
                            console.error(`Error fetching meal schedule for date ${isoDate}:`, mealError);
                        })
                )
            )
                .then(() => {
                    // At this point, shoppingItems contains all the shopping items for the selected week
                    console.log(shoppingItems);
                    shoppingItems.forEach((item) => {
                        const date = item.meal_date;
                        const no_ingredients = item.no_ingredients;
                        if (!this.shoppingListMap[date]) {
                            this.shoppingListMap[date] = [];
                        }
                        for (let no_ingredient in no_ingredients) {
                            this.shoppingListMap[date].push(no_ingredient + ": " + no_ingredients[no_ingredient]);
                        }
                    })

                    // You can process shoppingItems as needed
                })
                .catch((error) => {
                    console.error('Error fetching shopping list:', error);
                });
        },
        routeBackToHome() {
            this.showLoginAlert = false
            this.$router.push({ path: '/' })
        },
        checkUserLoggedIn() {
            if (!sessionStorage.getItem("AuthToken")) { this.showLoginAlert = true }

        }
    },
    mounted() {
        this.checkUserLoggedIn();
        const user = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("AuthToken");

        // Ensure that the token is available before calling getMealData
        if (token) {
            this.token = token;
            this.getMealData(user, this.currentDate.toISOString().split("T")[0], token);
            this.getShoppingList();
        } else {
            // Handle the case where the token is not available
            console.error("Authentication token not found in sessionStorage");
        }
    },
    components: {
        LoginFailed,
    }

}


</script>
