<script setup>
const props = defineProps({
  modalName: { type: String }
})

const model = defineModel({ default: false })

const closeModal = () => {
  model.value = false
}
</script>

<template>
  <Teleport to="body">
    <transition>
      <div
        v-if="model"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white rounded-lg shadow-lg p-6 relative w-10/12">
          <!-- Modal Header -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl text-center font-bold">{{ props.modalName }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              ✕ <span>Close</span>
            </button>
          </div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
