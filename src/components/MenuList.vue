<script setup>
import DishModal from './DishModal.vue'
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import DishAmountButtons from './DishAmountButtons.vue'

const props = defineProps({
  dishes: {
    type: Array,
    required: true
  }
})
//Refs
const showDishModal = ref(false)
const currentDish = ref()
//Store
const cartStore = useCartStore()

function addDishItem(dish) {
  currentDish.value = dish
  cartStore.addDish(dish)
}

//Dish Modal

function selectDish(dish) {
  currentDish.value = dish
  showDishModal.value = true
}
</script>

<template>
  <li
    class="flex justify-between items-center bg-orange-200"
    v-for="dish in props.dishes"
    :key="dish.id"
  >
    <img :src="dish.image" :alt="'An image of our delicious dish' + dish.name" />
    <p>{{ dish.name }}</p>
    <p>{{ dish.price }} €</p>
    <button class="px-5 py-0.3 bg-yellow-600 rounded" @click="selectDish(dish)">Details</button>
    <!-- SOS -->
    <p v-if="cartStore.getDishAmount(dish) === 0">{{ cartStore.getDishAmount(dish) }}</p>

    <button
      v-if="cartStore.getDishAmount(dish) === 0"
      class="px-5 py-0.3 bg-yellow-600 rounded"
      @click="addDishItem(dish)"
    >
      Add to Card
    </button>
    <DishAmountButtons v-else :dish="dish">
      <button @click="cartStore.resetDishAmount(dish)">Reset Amount</button></DishAmountButtons
    >
  </li>
  <DishModal :dish="currentDish" v-model="showDishModal"></DishModal>
</template>
