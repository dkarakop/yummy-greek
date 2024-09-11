<script setup>
import { useCartStore } from '../stores/cart.js'

const props = defineProps({ dish: { type: Object } })

//Store
const cartStore = useCartStore()
</script>

<template>
  <div class="flex justify-between items-center bg-orange-200">
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      @click="cartStore.removeDish(props.dish)"
    >
      -
    </button>
    <p>{{ cartStore.getDishAmount(props.dish) }}</p>
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      @click="cartStore.addDish(props.dish)"
    >
      +
    </button>
    <slot></slot>
  </div>
</template>
