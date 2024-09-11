<script setup>
import { useCartStore } from '../stores/cart.js'
import { ref } from 'vue'
import ModalWindow from '@/components/ModalWindow.vue'

//Refs
const rating = ref(0)

//Store
const cartStore = useCartStore()

const model = defineModel({ default: false })

const setRating = (value) => {
  rating.value = value
}
</script>

<template>
  <ModalWindow v-model="model">
    <h1>YummyGreek</h1>
    <h2>Thank you for your preference and for choosing us!We look forward to serving you again!</h2>
    <h2>Your opinion matters to us!</h2>
    <p>
      We would greatly appreciate it if you could take a moment to share your feedback and help us
      improve our services.
    </p>

    <input type="text" />
    <div>
      <div class="flex items-center space-x-2 mb-4">
        <label class="text-gray-600">How would you rate your overall experience with us?</label>
        <div class="flex space-x-1">
          <template v-for="n in 5" :key="n">
            <svg
              @click="setRating(n)"
              class="w-6 h-6 cursor-pointer"
              :class="n <= rating ? 'text-yellow-500' : 'text-gray-400'"
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
      <div class="mb-4">
        <label for="critique" class="block text-gray-600 mb-2"
          >We'd love to hear your thoughts!
        </label>
        <textarea
          id="critique"
          rows="4"
          class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your feedback here..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Submit Your Feedback
      </button>
    </div>
    <h2>We look forward to serving you again!</h2>
    <button class="px-5 py-0.3 bg-yellow-600 rounded">Pay €{{ cartStore.totalPrice }}</button>
  </ModalWindow>
</template>
