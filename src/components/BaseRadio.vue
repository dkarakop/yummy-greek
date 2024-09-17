<script setup>
//---- Props, Refs & Vars ----//

const props = defineProps({
  options: { type: Array, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true }
})

const model = defineModel()

//---- Computed, Watchers & Functions ----//

function selectedOption(e) {
  return (model.value = e.target.value)
}
</script>

<template>
  <fieldset class="fieldset mt-4">
    <legend class="header__small">{{ props.title }}</legend>
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
