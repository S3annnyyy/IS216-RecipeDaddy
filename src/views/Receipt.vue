<template>
    <div class="row justify-content-center mt-5">
        <div class="col-10 receipt-content">
            <div class="container justify-content-center text-center">
                <div class="row">
                    <h4 class="invoice-header">Invoice</h4>
                </div>

                <div class="row flex-grow euser-details">
                    <div class="col flex-container">
                        <p><b>Payment made on:</b> {{ todayDate }}</p>
                        <p><b>Name: </b>{{ userName }}</p>
                        <p><b>Email: </b>{{ userEmail }}</p>
                        <p><b>Order id: </b>{{ orderid }}</p>
                    </div>
                </div>
                <hr>
                <!-- Ingredients purchased -->
                <div class="row ingredients">
                    <div class="receipt-list-row" v-for="item in retrievedList">
                        <dt class="receipt-item" style="text-transform: capitalize">{{ item.name }}</dt>
                        <dd class="receipt-cost">S${{ item.price }}</dd>
                    </div>
                </div>

                <hr>
                <div class="row ingredients">
                    <div class="receipt-list-row">
                        <dt class="receipt-item">Total</dt>
                        <dd class="receipt-cost">S$ {{ calculateTotal }}</dd>

                    </div>
                </div>
                <div class="row bottom-message">
                    <p>Thank you for making a purchase with us {{ userName }}!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            userName: sessionStorage.getItem("user"),
            userEmail: sessionStorage.getItem("email"),
            todayDate: new Date().toLocaleDateString(),
            orderid: this.$route.params.id,
            ingredientList: [
                { price: "6.99", name: "chicken" },
                { price: "6.99", name: "chicken" },
                { price: "6.99", name: "chicken" },
            ],
            retrievedList: [],
            baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
            token: sessionStorage.getItem("AuthToken")
        }
    },
    computed: {
        calculateTotal() {
            let total = 0;
            for (let everyItem of this.retrievedList) {
                console.log(everyItem);
                total += everyItem.price;
            }
            return total;
        }
    },
    mounted() {
        const shoppingListPrice = this.$route.query.shoppingListPrice;
        this.retrievedList = JSON.parse(shoppingListPrice);
        for (let each of this.retrievedList) {
            let currentMeal = this.updateRetrievedList(each.meal_id);

        }





    },
    methods: {
        async fetchMealsWithId(id) {
            try {
                const response = await this.$axios.get(`${this.baseUrl}/user-meal-plan`, {
                    params: {
                        id: id
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error(error);
                throw error; // Handle the error appropriately
            }
        },
        async updateRetrievedList(id) {
            try {
                // Fetch meals with the specified ID
                const meals = await this.fetchMealsWithId(id);
                const eachMeal = meals[0]
                let no_ingredients_original = eachMeal.no_ingredients;
                for (let keyToDelete of this.retrievedList) {
                    delete no_ingredients_original[keyToDelete.name];
                }


                // Send a PUT request to update the data
                await this.$axios.put(`${this.baseUrl}/user-meal-plan?id=${id}`, {
                    no_ingredients: no_ingredients_original
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
            } catch (error) {
                console.error(error);
                // Handle the error appropriately
            }
        }
    },
}
</script>

<style scoped>
.receipt-container {
    display: flex;
    justify-content: center;
}

.receipt-content {
    width: 100%;
    max-width: 400px;
    /* Adjust the maximum width as needed for mobile screens */
    background-color: white;
    box-shadow: 5px 5px 19px #ccc;
    padding: 1rem;
}

.invoice-header {
    background-color: #194252;
    color: white;
    border-radius: 20px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
    padding: 5px;
    text-align: center;
}

.euser-details {
    text-align: left;
}

.ingredients {
    margin-top: 1rem;
}

.receipt-list-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.receipt-item {
    flex: 1;
    text-transform: capitalize;
}

.receipt-cost {
    flex: 1;
    text-align: right;
}

.bottom-message {
    margin-top: 1rem;
    text-align: center;
}
</style>