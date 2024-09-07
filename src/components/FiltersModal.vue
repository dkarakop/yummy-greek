<script setup>
import GenericCheckbox from './GenericCheckbox.vue'
import { reactive } from 'vue'
const props = defineProps({
  isVisible: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])
const closeFilterModal = () => {
  emit('close')
}

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
  allergenFree: false
})
</script>

<template>
  <Teleport to="body">
    <transition>
      <div
        v-if="props.isVisible"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white rounded-lg shadow-lg p-6 relative w-10/12">
          <!-- Modal Header -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl text-center font-bold">Filters</h2>
            <button @click="closeFilterModal" class="text-gray-400 hover:text-gray-500">✕</button>
          </div>

          <!-- Modal Body -->
          <!-- Dietary Preferences Checkbox-->
          <div class="mt-4">
            <h2 class="text-xl font-bold">Dietary Preferences</h2>
            <GenericCheckbox label="Vegan" v-model="filters.vegan"></GenericCheckbox>
            <GenericCheckbox label="Gluten-Free" v-model="filters.glutenFree"></GenericCheckbox>
            <GenericCheckbox label="Lactose-Free" v-model="filters.lactoseFree"></GenericCheckbox>
            <GenericCheckbox label="Nut-Free" v-model="filters.nutFree"></GenericCheckbox>
          </div>

          <!-- Allergens Checkbox-->
          <div class="mt-4">
            <h2 class="text-xl font-bold">Allergens</h2>
            <GenericCheckbox label="Contains Nuts" v-model="filters.nutsAllergy"></GenericCheckbox>
            <GenericCheckbox
              label="Contains Gluten"
              v-model="filters.glutenAllergy"
            ></GenericCheckbox>
            <GenericCheckbox
              label="Contains Lactose"
              v-model="filters.lasctoseAllergy"
            ></GenericCheckbox>
            <GenericCheckbox
              label="Other Allergens"
              v-model="filters.otherAllergens"
            ></GenericCheckbox>
            <GenericCheckbox label="Allergen-Free" v-model="filters.allergenFree"></GenericCheckbox>
          </div>

          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end">
            <button
              @click="closeFilterModal"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
