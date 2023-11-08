<template>
    <div>
        <main class="container">
            <div class="row g-5 mt-3">
                <!-- Probably do dynamic mapping of ingredients purchased here -->
                <div class="col-md-5 col-lg-4 order-md-last" v-if="this.selectedIngredients.length > 0">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-primary">Your cart</span>
                        <span class="badge bg-primary rounded-pill">{{ selectedIngredients.length }}</span>
                    </h4>
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-sm"
                            v-for="ingredient in shoppingListPrice">
                            <div>
                                <h6 class="my-0" style="text-transform: capitalize">{{ ingredient.name }}</h6>
                                <small class="text-muted">*Quantity is factored in</small>
                            </div>
                            <span class="text-muted">{{ ingredient.price }}</span>
                        </li>


                        <!-- Make this dynamic also -->
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Total (SGD)</span>
                            <strong>{{ calculateTotal }}</strong>
                        </li>
                    </ul>

                </div>
                <div class="col-md-5 col-lg-4 order-md-last" v-else>
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-primary">Your cart</span>
                        <span class="badge bg-primary rounded-pill">0</span>
                    </h4>
                </div>

                <!-- End of Shopping cart -->


                <div class="col-md-7 col-lg-8">
                    <h4 class="mb-3">Billing address</h4>
                    <div class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="firstName" class="form-label">First name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
                                <div class="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <label for="lastName" class="form-label">Last name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                                <div class="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address2" class="form-label">Address 2 <span
                                        class="text-muted">(Optional)</span></label>
                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
                            </div>

                            <div class="col-md-5">
                                <label for="country" class="form-label">Country</label>
                                <select class="form-select" id="country" required>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div class="col-md-4">
                                <label for="state" class="form-label">State</label>
                                <select class="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="zip" class="form-label">Zip</label>
                                <input type="text" class="form-control" id="zip" placeholder="" required>
                                <div class="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <h4 class="mb-3">Payment</h4>

                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label for="cc-name" class="form-label">Name on card</label>
                                <input type="text" class="form-control" id="cc-name" placeholder="" required>
                                <small class="text-muted">Full name as displayed on card</small>
                                <div class="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>

                            <div class="col-md-6">
                                <label for="cc-number" class="form-label">Credit card number</label>
                                <input type="text" class="form-control" id="cc-number" placeholder="" required>
                                <div class="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-expiration" class="form-label">Expiration</label>
                                <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                                <div class="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                                <div class="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <button class="w-100 btn btn-primary btn-lg" type="submit" @click="processPayment()">Continue to
                            checkout</button>
                    </div>
                </div>
            </div>
        </main>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2023 RecipeDaddy</p>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
    </div>



    <!-- <div class="payment-container">
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
                </div> -->

    <!-- Add more payment form fields as needed -->

    <!-- <button type="submit" class="submit-button">Submit Payment</button>
            </form>
        </div>
    </div> -->
</template>
  
<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            selectedIngredients: [], // Populate this array with selected ingredients
            cardNumber: '',
            cardName: '',
            // Add more payment form fields data
            retrievedData: null,
            uuid: uuidv4(),
            shoppingListPrice: [],
            randomPrices: [2, 3, 1, 4, 5, 2]
        };
    },
    computed: {
        calculateTotal() {
            // Calculate the total cost of the selected ingredients
            // You can use a library like Numeral.js to format the total
            let total = 0;
            for (const ingredient of this.shoppingListPrice) {
                total += ingredient.price;
            }
            return total; // Format the total to two decimal places
        },
    },
    methods: {
        processPayment() {
            // Handle the payment processing logic here
            // You can use a payment gateway or simulate a payment process
            // Upon successful payment, you can show a success message or navigate to a confirmation page
            // You can also use a library like Stripe for payment processing

            // once user click, parse data and relevant details to receiptPage
            console.log(this.uuid)
            // Prepare the data you want to pass to the Receipt component
            const dataToPass = {
                id: this.uuid,
                shoppingListPrice: this.shoppingListPrice,
            };


            console.log(dataToPass);

            // Use $router.push to navigate to the Receipt component and pass the data as route parameters
            this.$router.push({
                name: 'paymentreceipt',
                params: {
                    id: this.uuid,
                },
                query: {
                    shoppingListPrice: JSON.stringify(this.shoppingListPrice),
                }
            });

        },
        addPrices() {
            this.selectedIngredients = JSON.parse(this.$route.query.data);
            for (let ingredient of this.selectedIngredients) {
                let ingredientName = ingredient.no_ingredient.split(":")[0];
                let randomNum = Math.floor(Math.random() * 6); // Generate a random number from 0 to 5
                this.shoppingListPrice.push({ "price": randomNum, "name": ingredientName, "meal_id": ingredient.meal_id });
            }
        }
    },
    mounted() {
        this.addPrices();
        // Set focus to the first input element in the payment form
        this.$nextTick(() => {
            const firstInput = document.querySelector('.form-control'); // Adjust the selector as needed
            if (firstInput) {
                firstInput.focus();
            }
        });
        // idk how the fk the syntasx works but it does form validation HELP 
        (function () {
            'use strict'

            var forms = document.querySelectorAll('.needs-validation')

            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })()
    }
};
</script>
  
<style scoped></style>
  