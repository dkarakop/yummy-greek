<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-darkBlue py-4 px-8 shadow-lg z-50">
    <div
      class="w-full mx-auto flex md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div class="flex gap-2 items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
        <RouterLink to="/">
          <img
            src="./icons/yummy-greek-logo.png"
            alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
            class="w-16 h-auto p-1 shadow-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
            title="Go to Homepage"
          />
        </RouterLink>
        <h1 class="title text-3xl text-yellow hidden md:block">YummyGreek</h1>
      </div>

      <!-- Cart button for small screens  -->
      <RouterLink
        v-if="cartStore.totalAmountDishes !== 0 && cartStore.isCartVisible"
        to="/cart"
        class="btn btn__secondary--lightGreen btn__secondary--lightGreen --interactions mt-0 md:flex justify-end items-center space-x-4 md:block block md:hidden"
        title="Go to your order"
      >
        <span class="text-base">Cart</span>
        <span
          class="bg-white rounded-lg px-3 py-1 text-base hover:bg-white text-black no-underline focus:bg-white focus:text-black"
          title="Total number of dishes in your cart"
        >
          {{ cartStore.totalAmountDishes }}
        </span>
      </RouterLink>

      <!-- Cart button for big screens  -->
      <RouterLink
        v-if="cartStore.totalAmountDishes !== 0 && cartStore.isCartVisible"
        to="/cart"
        class="btn btn__secondary--lightGreen btn__secondary--lightGreen --interactions md:flex justify-center items-center space-x-4 hidden md:block"
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
