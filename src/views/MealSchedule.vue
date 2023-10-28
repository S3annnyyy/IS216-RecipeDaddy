<style scoped>
.box {
    background-color: #D9D9D9;
}

.button {
    background-color: #E6E3E3;
    border-radius: 10%;
    margin-bottom: 5px;
    padding: 5px;
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
    border-radius: 20%;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
}

.view-recipe-button {
    background-color: #E6E3E3;
    border-radius: 20%;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
}

.delete-button {
    background-color: #E6E3E3;
    border-radius: 20%;
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
    background-color: lightblue;
    /* Change this color to your preferred light blue color */
}

.card-img-top {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}

.indivDate {
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
    cursor: pointer
}
</style>

<template>
    <main class="row mt-3 mx-5">
        <div class="col-3">
            <h1>Meal Schedule</h1>
            <div style="white-space: nowrap;">
                <img src="../assets/chef-hat.png" alt="">
                <p style="white-space: nowrap;">{{ currentWeekStartText }} - {{ currentWeekEndText }}</p>
            </div>

        </div>
        <div class="col mt-2">
            <h3>Progress</h3>
        </div>
        <div class="col">
        </div>
    </main>

    <main class="row mx-5">
        <div class="col-3 box">
            <h6>CURRENT WEEK</h6>
            <div>
                <span class="fa-solid fa-angle-left" @click="decrementWeek"></span>
                {{ formatCurrentDate() }}
                <span class="fa-solid fa-angle-right" @click="incrementWeek"></span>
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <button type="button" class="button" data-bs-toggle="modal"
                            data-bs-target="#overviewRecipe">Shopping List</button>
                        <!-- Modal -->
                        <div class="modal fade" id="overviewRecipe" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Your Shopping List (Selected Week)
                                        </h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
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
        <div class="col">
            charts
        </div>
    </main>

    <div class="row mx-5 mt-3 box dates">
        <div @click="setCurrentDate(date)" class="col center indivDate" v-for="(date, index) in weekDates" :key="index"
            :class="{ 'selected-date': isDateSelected(date) }">
            <span v-html="formatDate(date)"></span>
        </div>
    </div>

    <main class="row w-85 py-5 mb-5" id="food-section">
        <div class="col card breakfast" v-if="mealSchedule.breakfast">
            <h3 class="card-title text-left">Breakfast</h3>
            <img src="../assets/pancakes.jpg" alt="Breakfast" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text breakfast-recipe">Berries Pancake</div>
                <div class="buttons">
                    <button class="view-recipe-button">View Recipe</button>
                    <!-- TO DO: add logic to redirect to recipe -->
                    <!-- <router-link
            :to="{ name: 'recipeSearch', params: { mealType: 'dinner' } }"
            class="view-recipe-button">
            View Recipe
          </router-link> -->
                    <button class="replace-button">Replace</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        <div class="col card lunch" v-if="mealSchedule.lunch">
            <h3 class="card-title text-left">Lunch</h3>
            <img src="../assets/burrito.jpg" alt="Lunch" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text lunch-recipe">Grilled Chicken Burrito</div>
                <div class="buttons">
                    <button class="view-recipe-button">View Recipe</button>
                    <button class="replace-button">Replace</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        <div class="col card dinner" v-if="mealSchedule.dinner">
            <h3 class="card-title text-left">Dinner</h3>
            <img src="../assets/teriyaki.jpeg" alt="Dinner" class="card-img-top img-fluid">
            <div class="card-body">
                <div class="card-text dinner-recipe">Teriyaki Chicken Bowl</div>
                <div class="buttons">
                    <button class="view-recipe-button">View Recipe</button>
                    <button class="replace-button">Replace</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
    </main>
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

            }
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
        }

    },
    mounted() {
        this.getMealData();

    },

};
</script>