<script setup>
import { useCartStore } from '../stores/cart.js'
import ModalWindow from '@/components/ModalWindow.vue'
import DishAmountButtons from './DishAmountButtons.vue'

//Props
const props = defineProps({
  dish: { type: Object }
})

//Store
const cartStore = useCartStore()

const model = defineModel({ default: false })

function closeModal() {
  model.value = false
}
</script>

<template>
  <ModalWindow v-model="model">
    <div>
      <img :src="props.dish.image" :alt="'A picture of our delicious dish ' + props.name" />
      <h2>{{ props.dish.name }}</h2>
      <p>{{ 'Price: ' + props.dish.price + '€' }}</p>
      <p>{{ props.dish.description }}</p>
      <div>
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(ingredient, index) in props.dish.ingredients" :key="ingredient + '-' + index">
            {{ ingredient }}
          </li>
        </ul>
        <div>
          <div v-if="props.dish.tags?.dietaryPreferences.length !== 0">
            <div
              v-for="(tag, index) in props.dish.tags?.dietaryPreferences"
              :key="tag + '-' + index"
              class="px-5 py-0.3 rounded bg-green-700"
            >
              {{ tag }}
            </div>
          </div>
          <div v-if="props.dish.tags.allergens?.length !== 0">
            <div
              v-for="(tag, index) in props.dish.tags.allergens"
              :key="tag + '-' + index"
              class="px-5 py-0.3 bg-red-600 rounded"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <DishAmountButtons :dish="dish" v-if="cartStore.getDishAmount(dish) !== 0">
        <button @click="cartStore.resetDishAmount(dish)">Reset Amount</button></DishAmountButtons
      >
      <button v-else class="px-5 py-0.3 bg-yellow-600 rounded" @click="cartStore.addDish(dish)">
        Add to Card
      </button>
      <button class="px-5 py-0.3 bg-yellow-600 rounded" @click="closeModal">Go to Menu</button>
    </div>
  </ModalWindow>
</template>
