<script setup>
//---- Props, Refs & Vars ----//
const props = defineProps({
  modalName: { type: String }
})

const model = defineModel({ default: false })

//---- Computed, Watchers & Functions ----//

const closeModal = () => {
  model.value = false
}
</script>

<template>
  <Teleport to="body">
    <transition>
      <div v-if="model" class="popup">
        <div
          class="bg-white rounded-lg shadow-lg p-6 relative w-10/12 overflow-y-auto max-h-[90vh]"
        >
          <!-- Modal Header -->
          <div class="flex justify-between items-start">
            <h2 class="title title--dark">{{ props.modalName }}</h2>
            <button @click="closeModal" class="btn__exit" title="Close pop-up window">✕</button>
          </div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
