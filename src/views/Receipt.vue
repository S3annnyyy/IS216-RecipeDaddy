<template>
    <div class="row justify-content-center">
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
            retrievedList: []
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
        console.log(this.retrievedList);
    },
}
</script>

<style scoped>
.receipt-content {
    height: 70vh;
    width: 30vw;
    background-color: white;
    margin-top: 2rem;
    box-shadow: 5px 5px 19px #ccc;
}

.invoice-header {
    background-color: #194252;
    color: white;
    margin-top: 1rem;
    border-radius: 20px;
    box-shadow: 0 4px 2px -2px var(--text-light-secondary);
    padding: 5px;
    display: flex;
    flex-direction: column;
}

.user-details {
    font-size: 0.8rem;
    text-align: left;
    margin-left: 1rem;

    .col>p {
        margin: 0
    }
}

.receipt-list-row {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.ingredients {
    margin: 0 1rem;
}

.flex-grow {
    flex: 1;
}

.bottom-message {
    margin-top: 1rem;
}

.flex-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* Make the container occupy the full height */
}
</style>