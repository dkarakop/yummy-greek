<script setup>
const props = defineProps({
  options: { type: Array, required: true },
  name: { type: String, required: true }
})

//v-model
const model = defineModel()

function selectedOption(e) {
  return (model.value = e.target.value)
}
</script>

<template>
  <fieldset class="mt-4 border border-gray-300 p-4 rounded-md">
    <legend class="text-lg font-semibold text-slate-800">Price Range</legend>
    <div v-for="(option, index) in props.options" :key="index">
      <input
        type="radio"
        :id="`option-${index}`"
        :name="props.name"
        :value="option.value"
        @change="selectedOption"
      />
      <label
        :for="`option-${index}`"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {{ option.label }}</label
      >
    </div>
  </fieldset>
</template>
