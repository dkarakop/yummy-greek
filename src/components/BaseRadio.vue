<script setup>
//---- Props, Refs & Vars ----//

const props = defineProps({
  options: { type: Array, required: true },
  name: { type: String, required: true }
})

const model = defineModel()

//---- Computed, Watchers & Functions ----//

function selectedOption(e) {
  return (model.value = e.target.value)
}
</script>

<template>
  <fieldset class="fieldsetEl mt-4">
    <legend class="text-lg font-semibold text-slate-800">Price Range</legend>
    <div v-for="(option, index) in props.options" :key="index">
      <input
        type="radio"
        :id="`option-${index}`"
        :name="props.name"
        :value="option.value"
        @change="selectedOption"
        :checked="model === option.value"
        class="w-4 h-4 mr-2 mb-3"
      />
      <label :for="`option-${index}`" class="text text-base mb-3"> {{ option.label }}</label>
    </div>
  </fieldset>
</template>
