<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import BaseSnackbar from './BaseSnackbar.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const props = defineProps({ dish: { type: Object } })

const snackbar = ref(null)

//---- Computed, Watchers & Functions ----//

function addDish() {
  cartStore.addDish(props.dish)
  snackbar.value.showMessage(props.dish.name + ' has been added to your cart!')
}

function removeDish() {
  cartStore.removeDish(props.dish)
  snackbar.value.showMessage(props.dish.name + ' has been removed from your cart!')
}
</script>

<template>
  <div class="flex flex-col md:flex-row w-full items-start md:items-center gap-4">
    <slot></slot>

    <div class="flex justify-between items-center gap-4 w-full">
      <!-- Decrease btn:decreases the amount of selected dish by 1  -->
      <button
        class="btn btn--primary min-w-12 min-h-12 hover:no-underline focus:hover:no-underline"
        @click="removeDish"
        title="Decrease the amount of this dish by 1"
      >
        -
      </button>

      <p class="bg-white rounded-lg px-4 py-2 text-center w-full md:w-auto">
        {{ cartStore.getDishAmount(props.dish) }}
      </p>
      <!-- Increase btn:increases the amount of selected dish by 1  -->
      <button
        class="btn btn--primary min-w-12 min-h-12 hover:no-underline focus:hover:no-underline"
        @click="addDish"
        title="Increase the amount of this dish by 1"
      >
        +
      </button>
    </div>
  </div>
  <!-- Snackbar: displays a message when the dish amount is increased or decreased. -->
  <BaseSnackbar ref="snackbar"></BaseSnackbar>
</template>
