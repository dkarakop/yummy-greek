<script setup>
import { RouterLink } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import { useCartStore } from '../stores/cart.js'

//Store
const cartStore = useCartStore()
</script>

<template>
  <MainHeader></MainHeader>
  <section>
    <ul>
      <li
        v-for="item in cartStore.cart.values()"
        :key="item.data.id"
        class="flex justify-between items-center bg-orange-200"
      >
        <img :src="item.data.image" :alt="'A delicious image of our plate: ' + item.data.name" />
        <p>{{ item.data.name }}</p>
        <p>{{ item.data.price }}</p>

        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="cartStore.removeDish(item.data)"
        >
          -
        </button>
        <p>{{ item.amount }}</p>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="cartStore.addDish(item.data)"
        >
          +
        </button>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="cartStore.deleteDish(item.data)"
        >
          Delete
        </button>
      </li>
    </ul>

    <RouterLink to="/menu" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >Go back to menu</RouterLink
    >
    <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
      Finish your Order
    </button>
  </section>
</template>
