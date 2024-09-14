<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-darkBlue py-4 px-8 shadow-lg z-50">
    <div class="w-full mx-auto flex md:flex-row justify-between items-center">
      <div class="flex gap-1 items-center">
        <!-- Logo Button - Navigates to HomeView -->
        <RouterLink to="/">
          <img
            src="./icons/yummy-greek-logo.png"
            alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
            class="w-16 h-auto p-1 shadow-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
            title="Go to Homepage"
          />
        </RouterLink>
        <!-- Title disappears for small screens -->
        <h1 class="title text-3xl text-yellow hidden md:block">YummyGreek</h1>
      </div>

      <!-- Cart button for small screens  -->
      <RouterLink
        v-if="cartStore.totalAmountDishes !== 0 && cartStore.isCartVisible"
        to="/cart"
        class="btn btn--primary btn--light-focus relative md:flex justify-end items-center md:hidden"
        title="Go to your order"
      >
        <span class="text-base"> Cart </span>
        <span class="badge" title="Total number of dishes in your cart">
          {{ cartStore.totalAmountDishes }}
        </span>
      </RouterLink>

      <!-- Cart button for big screens  -->
      <RouterLink
        v-if="cartStore.totalAmountDishes !== 0 && cartStore.isCartVisible"
        to="/cart"
        class="btn btn--primary btn--light-focus relative md:flex justify-center items-center hidden md:block"
        title="Go to your order"
      >
        <span class="badge" title="Total number of dishes in your cart">
          {{ cartStore.totalAmountDishes }}
        </span>
        <span class="text-base"
          >My Cart
          <strong>{{ cartStore.totalPrice == 0.0 ? '' : '€' + cartStore.totalPrice }}</strong></span
        >
      </RouterLink>
    </div>
  </header>
</template>
