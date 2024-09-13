<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')

let timeoutId = null

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
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center bg-darkBlue text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 opacity-0 opacity-100 z-50"
      :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    >
      {{ message }}
    </div>
  </teleport>
</template>
