<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import BaseSnackbar from './BaseSnackbar.vue'
import DishAmountButtons from './DishAmountButtons.vue'
import DishPopup from './DishPopup.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const props = defineProps({
  dishes: {
    type: Array,
    required: true
  }
})

const showDishPopup = ref(false)
const currentDish = ref({})
const snackbar = ref(null)

//---- Computed, Watchers & Functions ----//

function addDishItem(dish) {
  currentDish.value = dish
  cartStore.addDish(dish)
  snackbar.value.showMessage(dish.name + ' has been added to your cart!')
}

function selectDish(dish) {
  currentDish.value = dish
  showDishPopup.value = true
}

function resetBtn(dish) {
  cartStore.resetDishAmount(dish)
  cartStore.deleteDish(dish)
}
</script>

<template>
  <ul>
    <li
      class="flex flex-col md:flex-row rounded-lg bg-white w-full md:items-center p-4 space-y-4 md:space-y-0 md:space-x-4 w-full mb-4 border shadow-md"
      v-for="dish in props.dishes"
      :key="dish.id"
    >
      <!-- Dish: image -->
      <img
        :src="dish.image"
        :alt="'An image of our delicious dish' + dish.name"
        class="rounded-lg w-full md:w-1/4"
      />

      <!-- Dish: name, ingredients and details button -->
      <div class="flex flex-col md:flex-row justify-between w-full">
        <div class="flex flex-col justify-between items-start h-full w-full md:auto">
          <!-- Name -->
          <h2 class="header header--my-0">{{ dish.name }}</h2>
          <!-- Ingredients -->
          <p class="text mb-0 mt-0 md:mb-2 md:mt-4">
            {{ dish.ingredients.join(', ') }}
          </p>
          <!-- Details button: opens DishPopup -->
          <button
            class="btn btn--secondary btn--small mt-2"
            @click="selectDish(dish)"
            title="See more details about this dish"
          >
            Details
          </button>
        </div>

        <!-- Dish: price & amount buttons (toggle between AddToCart and DishAmountButtons) -->
        <div class="flex flex-col justify-between items-end h-full w-full gap-4">
          <!-- Price -->
          <p class="text--large">€ {{ dish.price }}</p>

          <!-- AddToCart button: adds one dish to the cart and then disappears -->
          <button
            v-if="cartStore.getDishAmount(dish) === 0"
            class="btn btn--primary w-full md:w-auto"
            @click="addDishItem(dish)"
            title="Add this dish to your cart"
          >
            Add to Cart
          </button>

          <!-- DishAmountButtons: appears when AddToCart is clicked. Includes buttons to add/remove a dish and a Reset button -->
          <DishAmountButtons v-else :dish="dish" class="mt-4 md:w-auto">
            <!-- Reset button: sets the selected dish amount to zero and disappears along with the DishAmountButtons -->
            <button
              @click="resetBtn(dish)"
              class="btn btn--secondary btn--small flex items-center justify-center bg-[url('reset.svg')] bg-[length:22px_22px] bg-no-repeat bg-center bg-contain w-10 h-10 md:w-12 md:h-12"
              title="Reset the selected amount"
            ></button>
          </DishAmountButtons>
        </div>
      </div>
    </li>
  </ul>

  <DishPopup :dishId="currentDish.id" v-model="showDishPopup"></DishPopup>

  <!-- Snackbar: displays a message when the dish amount is increased or decreased. -->
  <BaseSnackbar ref="snackbar"></BaseSnackbar>
</template>
