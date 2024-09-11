<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import MainHeader from '@/components/MainHeader.vue'
import DishAmountButtons from '@/components/DishAmountButtons.vue'

//Store
const cartStore = useCartStore()
</script>

<template>
  <MainHeader></MainHeader>
  <section>
    <div v-if="cartStore.totalAmountDishes !== 0">
      <ul>
        <li
          v-for="item in cartStore.cart.values()"
          :key="item.data.id"
          class="flex justify-between items-center bg-orange-200"
        >
          <img :src="item.data.image" :alt="'A delicious image of our plate: ' + item.data.name" />
          <p>{{ item.data.name }}</p>
          <p>{{ item.data.price }}</p>
          <DishAmountButtons :dish="item.data">
            <button
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              @click="cartStore.deleteDish(item.data)"
            >
              Delete
            </button></DishAmountButtons
          >
        </li>
      </ul>
      <p>Total Amount {{ cartStore.totalAmountDishes }}</p>
      <p>Total Price {{ cartStore.totalPrice }}</p>
    </div>
    <div v-if="cartStore.totalAmountDishes === 0">
      <p>You cart is empty</p>
    </div>

    <RouterLink to="/menu" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >Go back to menu</RouterLink
    >
    <RouterLink
      to="/confirmation"
      v-if="cartStore.totalAmountDishes !== 0"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >Finish your Order</RouterLink
    >
  </section>
</template>
