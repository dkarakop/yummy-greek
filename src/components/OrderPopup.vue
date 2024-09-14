<script setup>
import { useCartStore } from '../stores/cart.js'
import BasePopup from './BasePopup.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const model = defineModel({ default: false })
</script>

<template>
  <BasePopup modalName="Your Order" v-model="model">
    <ul>
      <li
        v-for="item in cartStore.cart.values()"
        :key="item.data.id"
        class="flex w-full flex-col md:flex-row bg-white md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full p-4 border-b-2 last:border-b-4 last:border-double last:border-grey last:pb-6 last:mb-3"
      >
        <img
          :src="item.data.image"
          :alt="'A delicious image of our plate: ' + item.data.name"
          class="rounded-lg w-full md:w-1/6 flex-1"
        />
        <div class="flex w-full">
          <p class="header mb-0">{{ item.data.name }}</p>
        </div>
        <p
          class="text__secondary--medium md:mt-0 text-left md:text-right"
          :title="'Price of: ' + item.data.name"
        >
          {{ '€' + item.data.price }}

          <span
            class="text__secondary--medium md:mt-0 font-bold"
            :title="'Total amount of ordered dish: ' + item.data.name"
          >
            [x{{ cartStore.getDishAmount(item.data) }}]
          </span>
        </p>
      </li>
    </ul>
    <div class="flex flex-col items-end">
      <p class="text__secondary--medium text-darkBlue mb-0 mt-0 md:mb-2 md:mt-4">
        Total Amount: <span class="font-bold">{{ cartStore.totalAmountDishes }}</span>
      </p>
      <p class="text__secondary--medium text-darkBlue mb-0 mt-0 md:mb-2 md:mt-4">
        Total Price: <span class="font-bold">€{{ cartStore.totalPrice }}</span>
      </p>
    </div>
  </BasePopup>
</template>
