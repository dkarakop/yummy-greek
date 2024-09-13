<script setup>
import GenericCheckbox from './GenericCheckbox.vue'
import GenericRadio from './GenericRadio.vue'
import { reactive } from 'vue'
import ModalWindow from './ModalWindow.vue'

const model = defineModel({ default: false })

const initialFilters = {
  // Dietary Preferences
  vegan: false,
  vegetarian: false,
  glutenFree: false,
  lactoseFree: false,
  nutFree: false,
  //Allergens
  nutsAllergy: false,
  glutenAllergy: false,
  lasctoseAllergy: false,
  otherAllergens: false,
  allergenFree: false,
  //PriceRange
  priceRange: null
}
const filters = reactive({
  ...initialFilters
})

const priceOptions = [
  { label: 'Under €10', value: 'under10' },
  { label: '€10 - €20', value: '10to20' },
  { label: '€20 - €30', value: '20to30' },
  { label: '€30 - €40', value: '30to40' },
  { label: 'Over €40', value: 'over40' }
]

const emit = defineEmits(['filters'])
const applyFilters = () => {
  emit('filters', { ...filters })
  model.value = false
}

const resetFilters = () => {
  emit('filters', {
    initialFilters
  })
  filters.vegan = false
  filters.vegetarian = false
  filters.glutenFree = false
  filters.lactoseFree = false
  filters.nutFree = false
  filters.nutsAllergy = false
  filters.glutenAllergy = false
  filters.lasctoseAllergy = false
  filters.otherAllergens = false
  filters.allergenFree = false
  filters.priceRange = null
  model.value = true
}
</script>

<template>
  <ModalWindow modalName="Filters" v-model="model">
    <div class="flex flex-col gap-6 md:flex-row pop-content w-full">
      <!-- Dietary Preferences Checkbox-->
      <fieldset class="fieldsetEl flex-1 shadow">
        <legend class="header header__titles">Dietary Preferences</legend>
        <GenericCheckbox label="Vegan" v-model="filters.vegan"></GenericCheckbox>
        <GenericCheckbox label="Vegetarian" v-model="filters.vegetarian"></GenericCheckbox>
        <GenericCheckbox label="Gluten-Free" v-model="filters.glutenFree"></GenericCheckbox>
        <GenericCheckbox label="Lactose-Free" v-model="filters.lactoseFree"></GenericCheckbox>
        <GenericCheckbox label="Nut-Free" v-model="filters.nutFree"></GenericCheckbox>
      </fieldset>

      <!-- Allergens Checkbox-->
      <fieldset class="fieldsetEl flex-1 shadow">
        <legend class="text-lg font-semibold text-slate-800">Allergens</legend>
        <GenericCheckbox label="Contains Nuts" v-model="filters.nutsAllergy"></GenericCheckbox>
        <GenericCheckbox label="Contains Gluten" v-model="filters.glutenAllergy"></GenericCheckbox>
        <GenericCheckbox
          label="Contains Lactose"
          v-model="filters.lasctoseAllergy"
        ></GenericCheckbox>
        <GenericCheckbox label="Other Allergens" v-model="filters.otherAllergens"></GenericCheckbox>
        <GenericCheckbox label="Allergen-Free" v-model="filters.allergenFree"></GenericCheckbox>
      </fieldset>

      <!-- Price Range -->
      <GenericRadio
        :options="priceOptions"
        name="priceRange"
        v-model="filters.priceRange"
        class="fieldsetEl flex-1 shadow"
      ></GenericRadio>
    </div>

    <div class="mt-6 flex flex-col md:flex-row md:justify-between">
      <button
        class="btn btn__help mt-4 px-8 py-2 text-center shrink-0 md:mr-auto"
        @click="resetFilters"
        title="Reset the selected filters"
      >
        Reset
      </button>
      <button
        class="btn btn__secondary btn__secondary--green mt-4 px-8 py-2 w-full text-center md:w-auto"
        @click="applyFilters"
        title="Apply the selected filters"
      >
        Apply
      </button>
    </div>
  </ModalWindow>
</template>
