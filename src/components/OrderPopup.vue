<script setup>
import { useCartStore } from '../stores/cart.js'
import BasePopup from './BasePopup.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const model = defineModel({ default: false })
</script>

<template>
  <BasePopup popupName="Order" v-model="model">
    <!-- Order list with selected dishes, amounts, and prices -->
    <ul>
      <li
        v-for="item in cartStore.cart.values()"
        :key="item.data.id"
        class="flex w-full flex-col md:flex-row bg-white md:items-center md:space-x-4 w-full p-4 border-b-2 last:border-b-4 last:border-double last:border-grey last:pb-6 last:mb-3"
      >
        <!-- Dish: name -->
        <div class="flex w-full">
          <p class="header header--medium-emphasis mb-0">{{ item.data.name }}</p>
        </div>

        <!-- Dish: price and total amount of this dish -->
        <p class="text md:mt-0 text-left md:text-right" :title="'Price of: ' + item.data.name">
          {{ '€' + item.data.price }}
          <span
            class="md:mt-0 font-bold"
            :title="'Total amount of ordered dish: ' + item.data.name"
          >
            [x{{ cartStore.getDishAmount(item.data) }}]
          </span>
        </p>
      </li>
    </ul>

    <!-- Final amount and price of order -->
    <!-- Final amount and price of order -->
    <div class="flex flex-col items-end">
      <p class="text text-right mb-2 mt-4">
        Total Amount: <span class="font-bold">{{ cartStore.totalAmountDishes }}</span>
        <br />
        Total Price: <span class="font-bold">€{{ cartStore.totalPrice }}</span>
      </p>
    </div>
  </BasePopup>
</template>
