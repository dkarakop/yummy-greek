<script setup>
import { useCartStore } from '../stores/cart.js'
import ModalWindow from './ModalWindow.vue'

//Store
const cartStore = useCartStore()

const model = defineModel({ default: false })
</script>

<template>
  <ModalWindow modalName="Your Order" v-model="model">
    <div v-if="cartStore.totalAmountDishes !== 0">
      <ul>
        <li
          v-for="item in cartStore.cart.values()"
          :key="item.data.id"
          class="flex justify-between items-center bg-orange-200"
        >
          <p>{{ cartStore.getDishAmount(item.data) }}</p>
          <img :src="item.data.image" :alt="'A delicious image of our plate: ' + item.data.name" />
          <p>{{ item.data.name }}</p>
          <p>{{ item.data.price }}</p>
        </li>
      </ul>
      <p>Total Amount {{ cartStore.totalAmountDishes }}</p>
      <p>Total Price {{ cartStore.totalPrice }}</p>
    </div>
  </ModalWindow>
</template>
