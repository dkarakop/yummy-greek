<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

//---- Props, Refs & Vars ----//
const props = defineProps({
  popupName: { type: String }
})

const model = defineModel({ default: false })

//---- Computed, Watchers & Functions ----//

const closePopup = () => {
  model.value = false
}

// Handle "Esc" key press handler
function onEscapePress(e) {
  if (e.key === 'Escape') {
    closePopup()
  }
}

// Attach and remove the EvenListener for '"Esc"' key
onMounted(() => {
  window.addEventListener('keydown', onEscapePress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEscapePress)
})
</script>

<template>
  <Teleport to="body">
    <!-- Overlay for the popup, shown when `model` is true -->
    <div v-if="model" class="overlay">
      <!-- Popup content -->
      <div class="popup">
        <div class="flex justify-between items-start">
          <!-- Popup Header: name -->
          <h2 class="title title--dark">{{ props.popupName }}</h2>
          <!-- Exit button: closes popup -->
          <button @click="closePopup" class="btn__exit" title="Close pop-up window">✕</button>
        </div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
