<template>
    <div class="payment-container">
        <h1>Payment</h1>

        <div class="selected-ingredients">
            <h2>Selected Ingredients</h2>
            <ul>
                <li v-for="(ingredient, index) in selectedIngredients" :key="index">
                    <input type="checkbox" v-model="ingredient.selected" class="checkbox" />
                    <label class="ingredient-label">{{ ingredient.name }}</label>
                </li>
            </ul>
        </div>

        <div class="payment-form">
            <h2>Payment Information</h2>
            <form @submit.prevent="processPayment">
                <div class="form-group">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" class="form-control" v-model="cardNumber" />
                </div>

                <div class="form-group">
                    <label for="name">Name on Card</label>
                    <input type="text" id="name" class="form-control" v-model="cardName" />
                </div>

                <!-- Add more payment form fields as needed -->

                <button type="submit" class="submit-button">Submit Payment</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedIngredients: [], // Populate this array with selected ingredients
            cardNumber: '',
            cardName: '',
            // Add more payment form fields data
        };
    },
    methods: {
        processPayment() {
            // Handle the payment processing logic here
            // You can use a payment gateway or simulate a payment process
            // Upon successful payment, you can show a success message or navigate to a confirmation page
            // You can also use a library like Stripe for payment processing
        },
    },
    mounted() {
        // Set focus to the first input element in the payment form
        this.$nextTick(() => {
            const firstInput = document.querySelector('.form-control'); // Adjust the selector as needed
            if (firstInput) {
                firstInput.focus();
            }
        });
    }
};
</script>
  
<style scoped>
.payment-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.selected-ingredients {
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

.checkbox {
    margin-right: 10px;
}

.ingredient-label {
    font-weight: bold;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}
.modal-backdrop {
  background-color: transparent; /* Make the backdrop transparent */
}

/* Custom styles for the modal content */
.modal-content {
  background-color: #fff; /* Set the content background color */
  border: none; /* Remove borders if needed */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}
</style>
  