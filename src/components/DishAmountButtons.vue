<script setup>
import { useCartStore } from '../stores/cart.js'
import { ref } from 'vue'

const props = defineProps({ dish: { type: Object } })

//Refs
const isSnackbarVisible = ref(false)
const snackbarMessage = ref('')
const showSnackbar = (message) => {
  snackbarMessage.value = message
  isSnackbarVisible.value = true
  setTimeout(() => {
    isSnackbarVisible.value = false
  }, 2000)
}

//Store
const cartStore = useCartStore()

// ------- Functions -------//
function addDish() {
  cartStore.addDish(props.dish)
  showSnackbar(props.dish.name + ' has been added to your cart!')
}

function removeDish() {
  cartStore.removeDish(props.dish)
  showSnackbar(props.dish.name + ' has been removed from your cart!')
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
      <div
        v-if="isSnackbarVisible"
        class="fixed text-center text__secondary--medium bottom-4 left-1/2 transform -translate-x-1/2 bg-darkBlue text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300"
        :class="{ 'opacity-0': !isSnackbarVisible, 'opacity-100': isSnackbarVisible }"
      >
        {{ snackbarMessage }}
      </div>
    </div>
  </div>
</template>
