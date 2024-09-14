<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import BasePopup from '@/components/BasePopup.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const rating = ref(0)

const model = defineModel({ default: false })

const setRating = (value) => {
  rating.value = value
}
</script>

<template>
  <BasePopup v-model="model">
    <div class="flex flex-col justify-center items-center">
      <h1 class="title title--lg title--dark">YummyGreek</h1>
      <img
        src="../components/icons/yummy-greek-logo.png"
        alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
        class="w-32 mt-3 sm:w-48 md:w-48 lg:w-48 xl:w-48 object-cover mb-4"
      />
    </div>
    <p class="text__secondary--medium text-center text-darkBlue">
      <span class="font-bold text-2xl">Thank you </span><br />for your preference and for choosing
      us!<br />
      We look forward to serving you again!
    </p>
    <fieldset
      class="fieldsetEl shadow mt-20 p-4 sm:p-6 md:p-4 lg:p-4 max-w-full md:max-w-2xl mx-auto"
    >
      <legend class="header text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Your opinion matters to us!
      </legend>

      <p class="text__secondary--small text-sm sm:text-base md:text-lg lg:text-xl mt-4">
        We would greatly appreciate it if you could take a moment to share your feedback and help us
        improve our services.
      </p>

      <div class="mt-6">
        <!-- Rating section -->
        <div class="flex flex-col gap-2 md:space-x-4 space-y-4 md:space-y-0 mb-6">
          <label
            class="text__secondary--small text-darkGrey text-sm sm:text-base md:text-lg lg:text-xl text-left"
          >
            How would you rate your overall experience with us?
          </label>
          <div class="flex space-x-1 m-0 justify-center">
            <template v-for="n in 5" :key="n">
              <svg
                @click="setRating(n)"
                class="w-8 h-8 cursor-pointer"
                :class="n <= rating ? 'text-yellow' : 'text-grey'"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </template>
          </div>
        </div>

        <!-- Text Area for Critique -->
        <div>
          <label
            for="critique"
            class="text__secondary--small text-darkGrey text-sm sm:text-base md:text-lg lg:text-xl"
          >
            We'd love to hear your thoughts!
          </label>
          <textarea
            id="critique"
            rows="4"
            class="w-full mt-2 bg-lightGrey px-3 py-2 text-darkBlue text-base border rounded-lg focus:outline-none focus:ring focus:border-darkBlue"
            placeholder="Write your feedback here..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center items-start">
          <button class="btn btn__secondary--grey sm:mt-6">Submit</button>
        </div>
      </div>
    </fieldset>

    <div class="flex flex-col justify-center">
      <p class="text__secondary--large font-bold text-center text-darkBlue mt-10">
        We look forward to serving you again!
      </p>
      <div class="flex justify-center mt-2">
        <RouterLink to="/" class="btn btn__green">Pay €{{ cartStore.totalPrice }}</RouterLink>
      </div>
    </div>
  </BasePopup>
</template>
