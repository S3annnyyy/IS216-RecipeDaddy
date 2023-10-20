
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
    background-color: lightblue; /* Change this color to your preferred light blue color */
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
                <span class="fa-solid fa-angle-left" @click="decrementDate"></span>
                {{ formatCurrentDate() }}
                <span class="fa-solid fa-angle-right" @click="incrementDate"></span>
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                    <button type="button" class="button">Shopping List</button>
                </div>
                </div>
            </div>
        </div>
        <div class="col">
            charts
        </div>
    </main>

    <div class="row mx-5 mt-3 box dates">
        <div class="col center" v-for="(date, index) in weekDates" :key="index" :class="{'selected-date':isDateSelected(date)}">
         <span v-html="formatDate(date)"></span>
        </div>
    </div>

    <main class="row w-85" id="food-section">
        <div class="col breakfast">
            <div class="food-item">
                <h3 class="text-left">Breakfast</h3>
                <img src="../assets/pancakes.jpg" alt="Breakfast">
                <div class="breakfast-recipe">Berries Pancake</div>
                <div class="buttons">
                    <button class="replace-button">Replace</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        <div class="col lunch">
            <div class="food-item">
                <h3>Lunch</h3>
                <img src="../assets/burrito.jpg" alt="Lunch">
                <div class="lunch-recipe">Grilled Chicken Burrito</div>
                <div class="buttons">
                    <button class="replace-button">Replace</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        <div class="col dinner">
            <div class="food-item">
                <h3>Dinner</h3>
                <img src="../assets/teriyaki.jpeg" alt="Dinner">
                <div class="dinner-recipe">Teriyaki Chicken Bowl</div>
                <div class="buttons">
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
import pancakes from "../assets/pancakes.jpg";

Date.prototype.GetFirstDayOfWeek = function () {
    const firstDayOfWeek = new Date(this);
    firstDayOfWeek.setDate(this.getDate() - (this.getDay() - 1 + 7) % 7);
    return firstDayOfWeek;
};

Date.prototype.GetLastDayOfWeek = function () {
    const lastDayOfWeek = new Date(this);
    lastDayOfWeek.setDate(this.getDate() + (7 - this.getDay()));
    return lastDayOfWeek;
};

export default {
    data() {
        return {
            currentDate: new Date(),
        };
    },
    computed: {
        weekDates() {
            const dates = [];
            const currentWeekStart = this.currentDate.GetFirstDayOfWeek();
            for (let i = 0; i < 7; i++) {
                const date = new Date(currentWeekStart);
                date.setDate(currentWeekStart.getDate() + i);
                dates.push(date);
            }
            console.log(dates);
            return dates;
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
        formatCurrentDate() {
            return this.currentDate.toDateString();
        },
        isDateSelected(date){
            return (
                date.getDate() === this.currentDate.getDate() && date.getMonth() === this.currentDate.getMonth() && date.getFullYear() === this.currentDate.getFullYear()
            );
        }
    },
};
</script>