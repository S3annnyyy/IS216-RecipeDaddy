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
    width: 85%;
    margin-left: auto;
    margin-right: auto;
}

.food-item {
    text-align: left;
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
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
    border-radius: 25px;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
}

.view-recipe-button {
    background-color: #E6E3E3;
    border-radius: 25px;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
}

.delete-button {
    background-color: #E6E3E3;
    border-radius: 25px;
    border: none;
    padding: 5px 10px;
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
    height: 20vw;
    object-fit: cover;
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
                <img style="padding-right: 0.5rem; padding-bottom: 0.5rem;" src="../assets/chef-hat.png" alt="">
                <span >{{ currentWeekStartText }} - {{ currentWeekEndText }}</span>
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
                                            <div class="card" v-for="(date, index) in dates" :key="index">
                                                <div :id="`heading${index}`" class="card-header">
                                                    <h2 class="mb-0 text-center">
                                                        <button class="btn btn-link text-decoration-none" type="button"
                                                            data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`"
                                                            aria-expanded="true" :aria-controls="`collapse${index}`">
                                                            <span v-html="formatCordionDate(date)"></span>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div :id="`collapse${index}`" class="collapse show"
                                                    :aria-labelledby="`heading${index}`" data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="flexCheckDefault"> 
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                100g of chicken
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                1 cup of rice
                                                            </label>
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
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="redirectToPaymentPage">
                                            <span class="text-white text-decoration-none">Go to
                                                payment</span>
                                        </button>
                                        <!-- ... -->

                                    </div>
                                </div>
                            </div>
                        </div>
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


    <!-- Meals -->
    <main class="row w-85 py-1 mb-3 d-flex justify-content-center" id="food-section">
        <div class="col-sm-12 col-md-7 col-lg-4 card breakfast" v-if="mealSchedule.breakfast">
            <h3 class="card-title text-left pt-2">Breakfast</h3>
            <img src="../assets/pancakes.jpg" alt="Breakfast" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text breakfast-recipe text-center">Berries Pancake</div>
                <div class="buttons row d-flex justify-content-center">
                    <button class="view-recipe-button col-sm-6 col-md-8 col-lg-3 mt-1">View</button>
                    <!-- TO DO: add logic to redirect to recipe -->
                    <!-- <router-link
            :to="{ name: 'recipeSearch', params: { mealType: 'dinner' } }"
            class="view-recipe-button">
            View Recipe
          </router-link> -->
                    <button class="replace-button col-sm-6 col-md-8 col-lg-3 mt-1">Replace</button>
                    <button class="delete-button col-sm-6 col-md-8 col-lg-3 mt-1">Delete</button>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-7 col-lg-4 card lunch" v-if="mealSchedule.lunch">
            <h3 class="card-title text-left pt-2">Lunch</h3>
            <img src="../assets/burrito.jpg" alt="Lunch" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text lunch-recipe text-center">Grilled Chicken Burrito</div>
                <div class="buttons row d-flex justify-content-center">
                    <button class="view-recipe-button col-sm-6 col-md-7 col-lg-3 mt-1">View</button>
                    <button class="replace-button col-sm-6 col-md-7 col-lg-3 mt-1">Replace</button>
                    <button class="delete-button col-sm-6 col-md-7 col-lg-3 mt-1">Delete</button>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-7 col-lg-4 card dinner" v-if="mealSchedule.dinner">
            <h3 class="card-title text-left pt-2">Dinner</h3>
            <img src="../assets/teriyaki.jpeg" alt="Dinner" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text dinner-recipe text-center">Teriyaki Chicken Bowl</div>
                <div class="buttons row d-flex justify-content-center">
                    <button class="view-recipe-button col-sm-6 col-md-7 col-lg-3 mt-1">View</button>
                    <button class="replace-button col-sm-6 col-md-7 col-lg-3 mt-1">Replace</button>
                    <button class="delete-button col-sm-6 col-md-7 col-lg-3 mt-1">Delete</button>
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
import LoginFailed from "../components/LoginFailed.vue";

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
                breakfast: true,
                lunch: true,
                dinner: true,
                receivedData: null,

            },
            showLoginAlert: false,
        };
    },
    computed: {
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
    },
    methods: {
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
        },
        decrementWeek() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() - 7);
            this.currentDate = newDate;
        },
        setCurrentDate(date) {
            this.currentDate = date;
            this.getMealData();
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
                    data: JSON.stringify(this.mealSchedule)
                }
            });
        },
        async getMealData() {
            const email = "wowtest@gmail.com";
            const user = "wowtest";
            const password = "wowtest";
            const baseUrl = "http://127.0.0.1:8000";
            let token; // Define the token variable in a wider scope

            // Step 1: Get the token
            const requestData = {
                email: email,
                password: password,
            };
            const curDate = this.currentDate.toISOString().split('T')[0];

            this.$axios
                .post(`${baseUrl}/api/token`, requestData)
                .then((response) => {
                    // Successful request
                    token = response.data.access; // Assign the token
                    console.log('Token:', token);

                    // Step 2: Get meal schedule using the token
                    this.$axios
                        .get(`${baseUrl}/user-meal-plan?username=${user}&meal_date=${curDate}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((mealResponse) => {
                            console.log(mealResponse.data);
                            // Assuming you want to do something with the meal data
                            // this.mealSchedule.receivedData = mealResponse.data;
                        })
                        .catch((mealError) => {
                            console.error('Error fetching meal schedule:', mealError);
                        });
                })
                .catch((error) => {
                    // Request for token failed
                    console.error('Error fetching token:', error);
                });
        },
        // THESE FUNCTIONS ARE FOR USER AUTHENITCATION                
        routeBackToHome() {
            this.showLoginAlert = false
            this.$router.push( {path: '/'})
        },
        checkUserLoggedIn() {           
            if (!sessionStorage.getItem("AuthToken")) {this.showLoginAlert = true}               
        }         
    },
    mounted() {
        // check if user is loggedIn
        this.checkUserLoggedIn();
        this.getMealData();

    },
    components: {
        LoginFailed,
    }

};
</script>