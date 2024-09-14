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
</script>

<template>
  <div class="flex items-center mb-4">
    <input :id="id" type="checkbox" @change="updateValue" class="w-5 h-5 mr-2" :checked="model" />
    <label :for="id" class="text text-base">{{ props.label }}</label>
  </div>
</template>
