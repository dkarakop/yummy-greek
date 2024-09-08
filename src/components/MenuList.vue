<script setup>
import { ref } from 'vue'
import DishModal from './DishModal.vue'

const props = defineProps({
  dishes: {
    type: Array,
    required: true
  }
})
//Dish Modal
const showDishModal = ref(false)
const currentDish = ref()

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
    <img :src="dish.image" :alt="dish.name" />
    <p>{{ dish.name }}</p>
    <p>{{ dish.price }} €</p>
    <button class="px-5 py-0.3 bg-yellow-600 rounded" @click="selectDish(dish)">Details</button>
    <button class="px-5 py-0.3 bg-yellow-600 rounded">Add to Card</button>
  </li>
  <DishModal :dish="currentDish" v-model="showDishModal"></DishModal>
</template>
