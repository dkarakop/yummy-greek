<script setup>
import GenericCheckbox from './GenericCheckbox.vue'
import GenericRadio from './GenericRadio.vue'
import { reactive } from 'vue'
import ModalWindow from './ModalWindow.vue'

const filters = reactive({
  // Dietary Preferences
  vegan: false,
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
})

const priceOptions = [
  { label: 'Under €10', value: 'under10' },
  { label: '€10 - €20', value: '10to20' },
  { label: '€20 - €30', value: '20to30' },
  { label: '€30 - €40', value: '30to40' },
  { label: 'Over €40', value: 'over40' }
]
</script>

<template>
  <ModalWindow modalName="Filters">
    <!-- Modal Body -->
    <div class="flex gap-6">
      <!-- Dietary Preferences Checkbox-->
      <fieldset class="mt-4 border border-gray-300 p-4 rounded-md grow">
        <legend class="text-lg font-semibold text-slate-800">Dietary Preferences</legend>
        <GenericCheckbox label="Vegan" v-model="filters.vegan"></GenericCheckbox>
        <GenericCheckbox label="Gluten-Free" v-model="filters.glutenFree"></GenericCheckbox>
        <GenericCheckbox label="Lactose-Free" v-model="filters.lactoseFree"></GenericCheckbox>
        <GenericCheckbox label="Nut-Free" v-model="filters.nutFree"></GenericCheckbox>
      </fieldset>

      <!-- Allergens Checkbox-->
      <fieldset class="mt-4 border border-gray-300 p-4 rounded-md grow">
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
      ></GenericRadio>
    </div>
    <!-- Modal Footer -->
    <div class="mt-6 flex justify-between">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Reset Filters
      </button>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Apply Filters
      </button>
    </div>
  </ModalWindow>
</template>
