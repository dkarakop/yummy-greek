<script setup>
import { useCartStore } from '../stores/cart.js'
import { ref } from 'vue'
import SnackbarComponent from './SnackbarComponent.vue'

const props = defineProps({ dish: { type: Object } })

const snackbar = ref(null)

//Store
const cartStore = useCartStore()

// ------- Functions -------//
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
      <button
        class="btn btn__secondary btn__secondary--green min-w-12 min-h-12 py-6 px-6 md:py-2 md:px-4 w-full md:w-auto text-2xl md:text-xl hover:no-underline focus:hover:no-underline"
        @click="removeDish"
        title="Decrease the amount of this dish by 1"
      >
        -
      </button>

      <p class="bg-white rounded-lg px-4 py-2 text__secondary--medium text-center w-full md:w-auto">
        {{ cartStore.getDishAmount(props.dish) }}
      </p>

      <button
        class="btn btn__secondary btn__secondary--green min-w-12 min-h-12 py-6 px-6 md:py-2 md:px-4 w-full md:w-auto text-2xl md:text-xl hover:no-underline focus:hover:no-underline"
        @click="addDish"
        title="Increase the amount of this dish by 1"
      >
        +
      </button>

      <!-- Snackbar -->
      <SnackbarComponent ref="snackbar"></SnackbarComponent>
    </div>
  </div>
</template>
