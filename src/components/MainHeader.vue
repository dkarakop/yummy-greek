<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'

//Store
const cartStore = useCartStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-darkBlue py-4 px-8 shadow-lg z-50">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div
        class="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0"
      >
        <RouterLink to="/">
          <img
            src="./icons/yummy-greek-logo.png"
            alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
            class="w-16 h-auto p-1 shadow-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
            aria-label="Go to homepage"
            tabindex="0"
            role="button"
            title="Go to Homepage"
          />
        </RouterLink>
        <h1 class="text text-xl font-bold text-yellow">YummyGreek</h1>
      </div>

      <RouterLink
        v-if="cartStore.totalAmountDishes !== 0"
        to="/cart"
        class="btn btn__cart btn__cart--interactions w-full md:w-auto flex justify-center items-center space-x-4"
        title="Go to your order"
      >
        <span
          class="bg-white rounded-lg px-4 py-2 text-base hover:bg-white text-black no-underline focus:bg-white focus:text-black"
          title="Total number of dishes in your cart"
        >
          {{ cartStore.totalAmountDishes }}
        </span>
        <span class="text-base"
          >See your Cart
          <strong>{{ cartStore.totalPrice == 0.0 ? '' : '€' + cartStore.totalPrice }}</strong></span
        >
      </RouterLink>
    </div>
  </header>
</template>
