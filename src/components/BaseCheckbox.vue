<script setup>
import { computed } from 'vue'

//---- Props, Refs & Vars ----//

const props = defineProps({
  label: { type: String, required: true }
})

const model = defineModel()

// Create a unique id
const id = computed(function () {
  return 'checkbox-' + props.label.toLowerCase().replace(' ', '-')
})

//---- Computed, Watchers & Functions ----//

function updateValue(e) {
  model.value = e.target.checked
}

// Handle 'Enter' key press for checked/unchecked box
function onEnterPress(e) {
  if (e.key === 'Enter') {
    model.value = !model.value
  }
}
</script>

<template>
  <div class="flex items-center mb-4">
    <input
      :id="id"
      type="checkbox"
      @change="updateValue"
      @keydown.enter="onEnterPress"
      class="w-5 h-5 mr-2"
      :checked="model"
    />
    <label :for="id" class="text text-base">{{ props.label }}</label>
  </div>
</template>
