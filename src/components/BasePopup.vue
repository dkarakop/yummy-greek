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
    closePopup() // C
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
    <transition>
      <div v-if="model" class="overlay">
        <div class="popup">
          <!-- Popup Header: name & close button popup -->
          <div class="flex justify-between items-start">
            <h2 class="title title--dark">{{ props.popupName }}</h2>
            <button @click="closePopup" class="btn__exit" title="Close pop-up window">✕</button>
          </div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
