<script setup>
import { ref } from 'vue'

//---- Props, Refs & Vars ----//

const isVisible = ref(false)
const message = ref('')

let timeoutId = null

//---- Computed, Watchers & Functions ----//

function showMessage(newMessage) {
  message.value = newMessage
  isVisible.value = true
  // Clear any existing timeout to avoid overlapping
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  // Start a new timeout
  timeoutId = setTimeout(() => {
    isVisible.value = false
    timeoutId = null // Clear the timeout ID after it runs
  }, 2000)
}

defineExpose({ showMessage })
</script>

<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="fixed bottom-4 mx-4 left-1/2 transform -translate-x-1/2 text-center bg-darkBlue text-white px-4 py-2 sm:px-6 md:px-8 lg:px-10 xl:px-12 rounded-lg shadow-md transition-opacity opacity-0 opacity-100 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    >
      {{ message }}
    </div>
  </teleport>
</template>
