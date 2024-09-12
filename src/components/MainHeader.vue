<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
//Store
const cartStore = useCartStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-darkBlue py-4 px-8 shadow-lg z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <RouterLink to="/">
          <img
            src="./icons/yummy-greek-logo.png"
            alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
            class="w-20 h-auto p-1 shadow-2xl rounded-lg md:w-16 focus:outline-none focus:ring-2 focus:ring-yellow"
            aria-label="Go to homepage"
            tabindex="0"
            role="button"
            title="Go to Homepage"
          />
        </RouterLink>
        <h1 class="text text-xl font-bold text-yellow">YummyGreek</h1>
      </div>

      <RouterLink to="/cart" class="btn btn__cart btn__cart--interactions">
        <span
          class="bg-white rounded-lg px-4 py-2 text-base mr-4 hover:bg-white text-black underline-none focus:bg-white focus:text-black"
          title="Total number of dishes in your cart"
        >
          {{ cartStore.totalAmountDishes }}</span
        >See your Cart
        <span class="text-lg">
          {{ cartStore.totalPrice == 0.0 ? '' : '€' + cartStore.totalPrice }}</span
        >
      </RouterLink>
    </div>
  </header>
</template>
