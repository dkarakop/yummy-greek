<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import { getDishes } from '@/modules/api'
import AppHeader from '@/components/AppHeader.vue'
import FiltersPopup from '@/components/FiltersPopup.vue'
import DishMenuItem from '@/components/DishMenuItem.vue'

const cartStore = useCartStore()
cartStore.isCartVisible = true

//---- Props, Refs & Vars ----//

const allDishes = ref([])
const filters = ref({})
const showFilterModal = ref(false)
const priceOrder = ref('disabled')
const alphabeticalOrder = ref('disabled')

// Get all dishes from api.js
getDishes().then((dishes) => {
  allDishes.value = dishes
})

//---- Computed, Watchers & Functions ----//

/**
 * Returns the entire menu or a filtered list of dishes based on selected filters and sorting criteria (alphabetical or by price).
 * @returns {Array} An array of all menu items, filtered and sorted based on the criteria, or an empty array if no dishes match the selected filters.
 */
const dishesComputed = computed(function () {
  const result = []

  // Dietary Preferences --->
  // Vegan
  if (filters.value.vegan) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.vegan === true)
    filtered.forEach((dish) => result.push(dish))
  }

  // Vegetarian
  if (filters.value.vegetarian) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.vegetarian === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Gluten-free
  if (filters.value.glutenFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.gluten !== true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Lactose-free
  if (filters.value.lactoseFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.lactose !== true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Nut-free
  if (filters.value.nutFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.nuts !== true)
    filtered.forEach((dish) => result.push(dish))
  }

  // Allergens --->
  // Nuts-Allergy
  if (filters.value.nutsAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.nuts === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Gluten-Allergy
  if (filters.value.glutenAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.gluten === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Lactose-Allergy
  if (filters.value.lasctoseAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.lactose === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Other Allergens
  if (filters.value.otherAllergens) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.other === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Allergens Free
  if (filters.value.allergenFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.allergenFree === true)
    filtered.forEach((dish) => result.push(dish))
  }

  // No-filters ---->
  const allFilters = [
    filters.value.vegan,
    filters.value.vegetarian,
    filters.value.glutenFree,
    filters.value.lactoseFree,
    filters.value.nutFree,
    filters.value.nutsAllergy,
    filters.value.glutenAllergy,
    filters.value.lasctoseAllergy,
    filters.value.otherAllergens,
    filters.value.allergenFree
  ]
  const noFilters = allFilters.every((filter) => filter === false || filter === undefined)
  if (noFilters) {
    allDishes.value.forEach((dish) => result.push(dish))
  }

  // Price ---->
  // under €10
  if (filters.value.priceRange === 'under10') {
    return result.filter((dish) => dish.price <= 10)
  }
  // €10 - €20
  if (filters.value.priceRange === '10to20') {
    return result.filter((dish) => dish.price >= 10 && dish.price <= 20)
  }
  // €20 - €30
  if (filters.value.priceRange === '20to30') {
    return result.filter((dish) => dish.price >= 20 && dish.price <= 30)
  }
  // €30 - €40
  if (filters.value.priceRange === '30to40') {
    return result.filter((dish) => dish.price >= 30 && dish.price < 40)
  }
  // over €40
  if (filters.value.priceRange === 'over40') {
    return result.filter((dish) => dish.price >= 40)
  }

  const uniqueDishes = new Set(result) // new Set for preventing duplicate dishes
  const dishesArray = Array.from(uniqueDishes)

  // Sorting ---->
  // Price Order
  if (priceOrder.value === 'ascending') {
    dishesArray.sort((a, b) => {
      return b.price - a.price
    })
  }
  if (priceOrder.value === 'descending') {
    dishesArray.sort((a, b) => {
      return a.price - b.price
    })
  }

  // Alphabetical Order
  if (alphabeticalOrder.value === 'AZ') {
    dishesArray.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (alphabeticalOrder.value === 'ZA') {
    dishesArray.sort((a, b) => b.name.localeCompare(a.name))
  }

  return dishesArray
})

const toggleAlphabeticalOrderName = computed(() => {
  if (alphabeticalOrder.value === 'AZ') {
    return 'A&rarr;Z'
  } else if (alphabeticalOrder.value === 'ZA') {
    return 'Z&rarr;A'
  } else {
    return '-'
  }
})

const togglePriceOrderName = computed(() => {
  if (priceOrder.value === 'ascending') {
    return '&darr;'
  } else if (priceOrder.value === 'descending') {
    return '&uarr;'
  } else {
    return '-'
  }
})

function applyFilters(newFilters) {
  filters.value = newFilters
}

const openFilterModel = () => {
  showFilterModal.value = true
}

function toggleAlphabeticalOrder() {
  if (alphabeticalOrder.value === 'AZ') {
    alphabeticalOrder.value = 'ZA'
    priceOrder.value = 'disabled'
  } else if (alphabeticalOrder.value === 'ZA') {
    alphabeticalOrder.value = 'disabled'
  } else if (alphabeticalOrder.value === 'disabled') {
    alphabeticalOrder.value = 'AZ'
    priceOrder.value = 'disabled'
  }
}

function togglePriceOrder() {
  if (priceOrder.value === 'ascending') {
    priceOrder.value = 'descending'
    alphabeticalOrder.value = 'disabled'
  } else if (priceOrder.value === 'descending') {
    priceOrder.value = 'disabled'
  } else if (priceOrder.value === 'disabled') {
    priceOrder.value = 'ascending'
    alphabeticalOrder.value = 'disabled'
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <main class="main">
    <!-- Page header -->
    <h1 class="header header--medium-emphasis">Our menu</h1>

    <!-- Page content displaying all dishes or only those that match the user's selected filters -->
    <div
      v-if="dishesComputed.length !== 0"
      class="flex flex-col gap-2 md:flex-row justify-between items-start mb-6"
    >
      <!-- Filter button: opens the FilterPopup -->
      <button @click="openFilterModel" class="btn btn--secondary btn--small" title="Filter Dishes">
        Filters
      </button>

      <!-- Sorting buttons for price and alphabetical order (only one can be active at a time) -->
      <div class="flex flex-col gap-2 md:flex-row items-start">
        <div class="flex items-center">
          <!-- Price sorting button: sorts dishes by price in ascending, descending, and default (initial display order) -->
          <button
            @click="togglePriceOrder"
            class="btn btn--secondary btn--small"
            title="Sort dishes by price order"
          >
            Price
            <span v-html="togglePriceOrderName" class="font-bold"></span>
          </button>
        </div>

        <!-- Alphabetical sorting button: sorts dishes by A->Z, Z->A, and default (initial display order) -->
        <div class="flex items-center">
          <button
            @click="toggleAlphabeticalOrder"
            class="btn btn--secondary btn--small"
            title="Sort dishes by alphabetical order"
          >
            Alphabetical
            <span v-html="toggleAlphabeticalOrderName" class="font-bold"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- List displaying all dishes or filtered dishes -->
    <ul>
      <DishMenuItem :dishes="dishesComputed" />
    </ul>

    <!---------------------------------------------------------->
    <!-- Page content displayed when no dishes match the selected filters -->
    <div v-if="dishesComputed.length === 0" class="flex flex-col items-center gap-3 mb-8">
      <!-- Message  -->
      <p class="text items-center text-center">Sorry, no dishes match your selected filters.</p>
      <img
        src="../components/icons/empty-plate.webp"
        alt=" illustrated cartoon of a sad Greek chef. It captures the emotion of disappointment, as if there are no dishes matching the selected filters. "
        class="image"
      />
      <p class="text items-center text-center">Please adjust your preferences and</p>

      <!-- Try Again button: reopens the FiltersPopup -->
      <button
        @click="openFilterModel"
        class="btn btn--primary"
        title="Refine filters and try again"
      >
        Try again
      </button>
    </div>
  </main>
  <!-- Popup -->
  <FiltersPopup v-model="showFilterModal" @filters="applyFilters" />
</template>
