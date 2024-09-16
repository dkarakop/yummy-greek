<script setup>
import { reactive } from 'vue'
import BasePopup from './BasePopup.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseRadio from './BaseRadio.vue'

//---- Props, Refs & Vars ----//

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

//---- Computed, Watchers & Functions ----//

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
  <BasePopup popupName="Filters" v-model="model">
    <!----------- Filters section ----------->
    <div class="flex flex-col gap-6 md:flex-row pop-content w-full">
      <!-- Dietary Preferences Checkbox-->
      <fieldset class="fieldset mt-4 flex-1 shadow">
        <legend class="header__small">Dietary Preferences</legend>
        <BaseCheckbox label="Vegan" v-model="filters.vegan"></BaseCheckbox>
        <BaseCheckbox label="Vegetarian" v-model="filters.vegetarian"></BaseCheckbox>
        <BaseCheckbox label="Gluten-Free" v-model="filters.glutenFree"></BaseCheckbox>
        <BaseCheckbox label="Lactose-Free" v-model="filters.lactoseFree"></BaseCheckbox>
        <BaseCheckbox label="Nut-Free" v-model="filters.nutFree"></BaseCheckbox>
      </fieldset>

      <!-- Allergens Checkbox-->
      <fieldset class="fieldset mt-4 flex-1 shadow">
        <legend class="header__small">Allergens</legend>
        <BaseCheckbox label="Contains Nuts" v-model="filters.nutsAllergy"></BaseCheckbox>
        <BaseCheckbox label="Contains Gluten" v-model="filters.glutenAllergy"></BaseCheckbox>
        <BaseCheckbox label="Contains Lactose" v-model="filters.lasctoseAllergy"></BaseCheckbox>
        <BaseCheckbox label="Other Allergens" v-model="filters.otherAllergens"></BaseCheckbox>
        <BaseCheckbox label="Allergen-Free" v-model="filters.allergenFree"></BaseCheckbox>
      </fieldset>

      <!-- Price Range -->
      <BaseRadio
        :options="priceOptions"
        name="priceRange"
        v-model="filters.priceRange"
        class="fieldset mt-4 flex-1 shadow"
      ></BaseRadio>
    </div>

    <!----------- Buttons section ----------->
    <!-- Reset button: resets the selected filters to their default state -->
    <div class="mt-6 flex flex-col md:flex-row md:justify-between">
      <button
        class="btn btn--secondary btn--small mt-4 flex items-center justify-center bg-[url('../assets/reset.svg')] bg-no-repeat bg-center bg-contain w-10 h-10 md:w-12 md:h-12"
        @click="resetFilters"
        title="Reset the selected filters"
      ></button>
      <!-- Apply button: applies the user's selected filters and closes the popup -->
      <button
        class="btn btn--primary mt-4"
        @click="applyFilters"
        title="Apply the selected filters"
      >
        Apply
      </button>
    </div>
  </BasePopup>
</template>
