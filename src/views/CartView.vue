<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import AppHeader from '@/components/AppHeader.vue'
import DishAmountButtons from '@/components/DishAmountButtons.vue'

const cartStore = useCartStore()
cartStore.isCartVisible = false
</script>

<template>
  <AppHeader></AppHeader>
  <main class="main">
    <!-- Page header -->
    <h1 class="header header--medium-emphasis">Your cart</h1>

    <!-- Page content when the cart is not empty -->
    <div
      v-if="cartStore.totalAmountDishes !== 0"
      class="flex flex-col md:flex-row rounded-lg bg-white md:items-center p-4 space-y-4 md:space-y-0 md:space-x-4 w-full mb-4 border shadow-md"
    >
      <div class="flex flex-col w-full">
        <!-- Order list with selected dishes, amounts, prices, and options to edit the dish quantities -->
        <ul>
          <li
            v-for="item in cartStore.cart.values()"
            :key="item.data.id"
            class="flex w-full flex-col md:flex-row bg-white md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full p-4 border-b-2 last:border-b-4 last:border-double last:border-grey last:pb-6 last:mb-3"
          >
            <!-- Dish: image -->
            <img
              :src="item.data.image"
              :alt="'A delicious image of our plate: ' + item.data.name"
              class="rounded-lg w-full md:w-1/6 flex-1"
            />

            <!-- Dish: name -->
            <div class="flex w-full">
              <p class="header mb-0">{{ item.data.name }}</p>
            </div>

            <!-- DishAmountButtons: add/remove a dish and Delete button -->
            <DishAmountButtons :dish="item.data" class="md:auto items-end">
              <!-- Dish: price -->
              <p class="md:mt-0">
                {{ '€' + item.data.price }}
              </p>

              <!-- Delete button with background image -->
              <button
                class="btn btn--secondary btn--small flex items-center justify-center bg-[url('../assets/delete.svg')] bg-no-repeat bg-center bg-contain w-10 h-10 md:w-12 md:h-12"
                @click="cartStore.deleteDish(item.data)"
                :title="'Delete ' + item.data.name + ' from your cart'"
              >
                <!-- No <img> tag needed, the background image is applied directly to the button -->
              </button>
            </DishAmountButtons>
          </li>
        </ul>

        <!-- Final amount and price of order -->
        <div class="flex flex-col">
          <p class="text text-right mb-2 mt-4">
            Total Amount: <span class="font-bold">{{ cartStore.totalAmountDishes }}</span>
            <br />
            Total Price: <span class="font-bold">€{{ cartStore.totalPrice }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Buttons section -->
    <div
      class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8"
      v-if="cartStore.totalAmountDishes !== 0"
    >
      <!-- Menu button: navigates the user to the Menu page -->
      <RouterLink to="/menu" class="btn btn--secondary" title="Return to the menu">
        &lsaquo; Go back to menu</RouterLink
      >
      <!-- Finish Order button: navigates the user to the confirmation page to review order details -->
      <RouterLink to="/confirmation" class="btn btn--primary" title="Review your order details">
        Finish Order &rsaquo;</RouterLink
      >
    </div>

    <!---------------------------------------------------------->
    <!-- Page content when the cart is empty -->
    <div v-else class="flex flex-col items-center gap-3 mb-8">
      <!-- Message -->
      <p class="text items-center text-center">You cart is <span class="font-bold">empty</span>!</p>
      <img
        src="../assets/waiter.webp"
        alt="An illustration of the sad Greek waiter shrugging his shoulders, indicating confusion due to the user's empty order. "
        class="image"
      />
      <p class="text items-center text-center">
        Go back to our menu and explore our delicious dishes!
      </p>
      <!-- Menu button: navigates the user back to the Menu page -->
      <RouterLink to="/menu" class="btn btn--primary" title="Return to the menu">Menu</RouterLink>
    </div>
  </main>
</template>
