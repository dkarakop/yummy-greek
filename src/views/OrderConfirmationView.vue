<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import { ref } from 'vue'
import MainHeader from '@/components/AppHeader.vue'
import DisplayOrderModal from '@/components/OrderPopup.vue'
import ReviewModal from '@/components/ReviewPopup.vue'

//Store
const cartStore = useCartStore()
cartStore.isCartVisible = false

const showDisplayOrderModal = ref(false)
const showReviewModal = ref(false)
</script>

<template>
  <MainHeader></MainHeader>
  <main v-if="cartStore.totalAmountDishes !== 0" class="main--size">
    <div class="flex flex-col items-center mb-8">
      <p class="text__secondary--large text-darkBlue font-extrabold text-center mt-4">
        Your order is being prepared!
      </p>
      <button
        @click="showDisplayOrderModal = true"
        class="btn btn__secondary px-4 py-2"
        title="See the ordered dishes"
      >
        See your order
      </button>
      <img
        src="../components/icons/yummy-greek.webp"
        alt="A cheerful elderly Greek woman, dressed in traditional black clothing and a headscarf, holding a plate with delicious Greek food. The background features Greek pottery, olive branches, and a stylized image of the Parthenon"
        class="w-32 mt-3 sm:w-48 md:w-64 lg:w-80 xl:w-96 object-cover mb-4 rounded-full"
      />
      <p class="text__secondary--small md:mt-0 text-center text-darkBlue">
        We're preparing your meal with the same love and care as a Greek grandma,<br />
        making sure you’re more than satisfied.
      </p>
      <p class="text__secondary--small md:mt-0 text-center font-bold text-darkBlue">
        Get ready—your delicious dish is on its way!
      </p>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
      <RouterLink to="/menu" class="btn btn__backToMenu" title="Return to the menu">
        &lsaquo; I want More</RouterLink
      >

      <button @click="showReviewModal = true" class="btn btn__green" title="Pay your check">
        I would like to pay &rsaquo;
      </button>
    </div>
  </main>
  <DisplayOrderModal v-model="showDisplayOrderModal"></DisplayOrderModal>
  <ReviewModal v-model="showReviewModal"></ReviewModal>
</template>
