<script setup>
import DishModal from './DishModal.vue'
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import DishAmountButtons from './DishAmountButtons.vue'
import SnackbarComponent from './SnackbarComponent.vue'

const props = defineProps({
  dishes: {
    type: Array,
    required: true
  }
})
//Refs
const showDishModal = ref(false)
const currentDish = ref()
const snackbar = ref(null) //SnackBar for Add toCart Btn

//Store
const cartStore = useCartStore()

function addDishItem(dish) {
  currentDish.value = dish
  cartStore.addDish(dish)
  snackbar.value.showMessage(dish.name + ' has been added to your cart!')
}

//Dish Modal

function selectDish(dish) {
  currentDish.value = dish
  showDishModal.value = true
}
</script>

<template>
  <li
    class="flex flex-col md:flex-row rounded-lg bg-white md:items-center bg-orange-200 p-4 space-y-4 md:space-y-0 md:space-x-4 w-full mb-4 border shadow-md"
    v-for="dish in props.dishes"
    :key="dish.id"
  >
    <img
      :src="dish.image"
      :alt="'An image of our delicious dish' + dish.name"
      class="rounded-lg w-full md:w-1/4"
    />

    <div class="flex flex-col md:flex-row justify-between w-full">
      <div class="flex flex-col justify-between items-start h-full w-full md:w-3/6">
        <h2 class="header header__secondary">{{ dish.name }}</h2>

        <p class="text__secondary--small mb-0 mt-0 md:mb-2 md:mt-4">
          {{ dish.ingredients.join(', ') }}
        </p>

        <button
          class="btn btn__info mt-2"
          @click="selectDish(dish)"
          title="See more details about this dish"
        >
          Details
        </button>
      </div>

      <div class="flex flex-col justify-between items-end h-full w-full md:w-2/6">
        <p class="text__secondary--large">€ {{ dish.price }}</p>
        <button
          v-if="cartStore.getDishAmount(dish) === 0"
          class="btn btn__secondary btn__secondary--green mt-4 px-8 py-2 w-full text-center md:w-auto"
          @click="addDishItem(dish)"
          title="Add this dish to your cart"
        >
          Add to Cart
        </button>
        <DishAmountButtons v-else :dish="dish" class="mt-4 md:w-auto">
          <button
            @click="cartStore.resetDishAmount(dish)"
            class="btn btn__help font-normal"
            title="Reset the selected amount"
          >
            Reset
          </button>
        </DishAmountButtons>
      </div>
    </div>
  </li>
  <DishModal :dish="currentDish" v-model="showDishModal"></DishModal>
  <SnackbarComponent ref="snackbar"></SnackbarComponent>
</template>
