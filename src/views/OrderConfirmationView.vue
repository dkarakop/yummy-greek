<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import AppHeader from '@/components/AppHeader.vue'
import OrderPopup from '@/components/OrderPopup.vue'
import ReviewPopup from '@/components/ReviewPopup.vue'

const cartStore = useCartStore()
cartStore.isCartVisible = false

//---- Props, Refs & Vars ----//

const showOrderPopup = ref(false)
const showReviewPopup = ref(false)
</script>

<template>
  <AppHeader></AppHeader>
  <main v-if="cartStore.totalAmountDishes !== 0" class="main">
    <!-- Page content displayed when the order is confirmed -->
    <div class="flex flex-col items-center mb-8">
      <!-- Message -->
      <p class="text--large font-extrabold text-center mt-4">Your order is being prepared!</p>

      <img
        src="../assets/granny.webp"
        alt="A cheerful elderly Greek woman, dressed in traditional black clothing and a headscarf, holding a plate with delicious Greek food. The background features Greek pottery, olive branches, and a stylized image of the Parthenon"
        class="image"
      />

      <p class="text md:mt-0 text-center">
        We're preparing your meal with the same love and care as a Greek grandma,<br />
        making sure you’re more than satisfied.<br />
        <span class="text md:mt-0 text-center font-bold"
          >Get ready—your delicious dish is on its way!</span
        >
      </p>

      <!-- MyOrder button: opens OrderPopup -->
      <button
        @click="showOrderPopup = true"
        class="btn btn--secondary btn--small"
        title="See the ordered dishes"
      >
        My order
      </button>
    </div>

    <!-- Buttons Section -->
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
      <!-- Menu button: navigates the user to the Menu page -->
      <RouterLink to="/menu" class="btn btn--secondary" title="Return to the menu">
        &lsaquo; I want More</RouterLink
      >

      <!-- Pay button: opens ReviewPopup -->
      <button @click="showReviewPopup = true" class="btn btn--primary" title="Pay your check">
        I would like to pay &rsaquo;
      </button>
    </div>
  </main>

  <!---------------------------------------------------------->
  <!-- Page content displayed when something goes wrong with the order -->
  <main v-else class="main flex flex-col items-center gap-3 mb-8">
    <!-- Message -->
    <p class="text items-center text-center">
      <span class="font-bold text--large">Oops! </span><br />
      Looks like your order got lost in translation...<br />maybe it was the tzatziki that threw us
      off.
    </p>
    <img
      src="../assets/something-wrong.webp"
      alt="A funny cartoon illustration of Greek waiters and waitresses trying to figure out what went wrong in the restaurant. "
      class="image"
    />
    <p class="text items-center text-center">
      Try again, and we promise your souvlaki will be on its way in no time!
    </p>
    <!-- Menu button: navigates the user back to the Menu page to try ordering again -->
    <RouterLink to="/menu" class="btn btn--primary" title="Return to the menu"> Menu</RouterLink>
  </main>

  <!-- Popups -->
  <OrderPopup v-model="showOrderPopup"></OrderPopup>
  <ReviewPopup v-model="showReviewPopup"></ReviewPopup>
</template>
