<script setup>
import MainHeader from '@/components/MainHeader.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import { getDishes } from '@/modules/api'
import { computed, ref } from 'vue'
import MenuList from '@/components/MenuList.vue'

const allDishes = ref([])
const filters = ref({})
const showFilterModal = ref(false)
const priceOrder = ref('disabled')
const alphabeticalOrder = ref('disabled')

//Get all dishes from api.js
getDishes().then((dishes) => {
  allDishes.value = dishes
})

const dishesComputed = computed(function () {
  const result = []

  //////-----Dietary Preferences----/////
  //Vegan
  if (filters.value.vegan) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.vegan === true)
    filtered.forEach((dish) => result.push(dish))
  }

  //Vegetarian
  if (filters.value.vegetarian) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.vegetarian === true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Gluten-free
  if (filters.value.glutenFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.gluten !== true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Lactose-free
  if (filters.value.lactoseFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.lactose !== true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Nut-free
  if (filters.value.nutFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.nuts !== true)
    filtered.forEach((dish) => result.push(dish))
  }

  //////-----Allergens----/////
  //Nuts-Allergy
  if (filters.value.nutsAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.nuts === true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Gluten-Allergy
  if (filters.value.glutenAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.gluten === true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Lactose-Allergy
  if (filters.value.lasctoseAllergy) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.lactose === true)
    filtered.forEach((dish) => result.push(dish))
  }
  //Other Allergens
  if (filters.value.otherAllergens) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.other === true)
    filtered.forEach((dish) => result.push(dish))
  }
  // Allergens Free
  if (filters.value.allergenFree) {
    const filtered = allDishes.value.filter((dish) => dish.processedTags.allergenFree === true)
    filtered.forEach((dish) => result.push(dish))
  }

  //No-filters
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

  //////-----Price ----/////
  //under €10
  if (filters.value.priceRange === 'under10') {
    return result.filter((dish) => dish.price <= 10)
  }
  //€10 - €20
  if (filters.value.priceRange === '10to20') {
    return result.filter((dish) => dish.price >= 10 && dish.price <= 20)
  }
  //€20 - €30
  if (filters.value.priceRange === '20to30') {
    return result.filter((dish) => dish.price >= 20 && dish.price <= 30)
  }
  //€30 - €40
  if (filters.value.priceRange === '30to40') {
    return result.filter((dish) => dish.price >= 30 && dish.price < 40)
  }
  //over €40
  if (filters.value.priceRange === 'over40') {
    return result.filter((dish) => dish.price >= 40)
  }

  const uniqueDishes = new Set(result) // new Set for preventing duplicate dishes
  const dishesArray = Array.from(uniqueDishes)

  //Sorting: Price Order
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

  //Sorting: Alphabetical Order
  if (alphabeticalOrder.value === 'AZ') {
    dishesArray.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (alphabeticalOrder.value === 'ZA') {
    dishesArray.sort((a, b) => b.name.localeCompare(a.name))
  }

  return dishesArray
})

//Filters
function applyFilters(newFilters) {
  filters.value = newFilters
}

//Price Order
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

const togglePriceOrderName = computed(() => {
  if (priceOrder.value === 'ascending') {
    return '&darr;'
  } else if (priceOrder.value === 'descending') {
    return '&uarr;'
  } else {
    return '-'
  }
})

//Alphabetical Order
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

const toggleAlphabeticalOrderName = computed(() => {
  if (alphabeticalOrder.value === 'AZ') {
    return 'A&rarr;Z'
  } else if (alphabeticalOrder.value === 'ZA') {
    return 'Z&rarr;A'
  } else {
    return '-'
  }
})

const openFilterModel = () => {
  showFilterModal.value = true
}
</script>

<template>
  <MainHeader></MainHeader>
  <!-- <main class="pt-80 md:pt-64 lg:pt-48 xl:pt-32 mx-7 p-2.5 bg-yellow-300"> -->
  <main class="pt-56 md:pt-32 lg:pt-24 xl:pt-32 mx-7 p-2.5 bg-yellow-300">
    <h1 class="header header__main">Our Menu</h1>
    <div
      v-if="dishesComputed.length !== 0"
      class="flex flex-col gap-2 md:flex-row justify-between items-start mb-6"
    >
      <button
        @click="openFilterModel"
        class="btn btn__help interactions font-normal"
        title="Filter Dishes"
      >
        Filters
      </button>
      <div class="flex flex-col gap-2 md:flex-row items-start">
        <div class="flex items-center">
          <button
            @click="togglePriceOrder"
            class="btn btn__help interactions font-normal"
            title="Sort dishes by price order"
          >
            Price
            <span v-html="togglePriceOrderName" class="font-bold"></span>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="toggleAlphabeticalOrder"
            class="btn btn__help interactions"
            title="Sort dishes by alphabetical order"
          >
            Alphabetical
            <span v-html="toggleAlphabeticalOrderName" class="font-bold"></span>
          </button>
        </div>
      </div>
    </div>

    <ul>
      <MenuList :dishes="dishesComputed" />
    </ul>
    <div v-if="dishesComputed.length === 0" class="flex flex-col items-center gap-3 mb-8">
      <p class="text__secondary--medium items-center text-center">
        Sorry, no dishes match your selected filters.
      </p>
      <img
        src="../components/icons/empty-plate.webp"
        alt=""
        class="w-32 mt-3 sm:w-48 md:w-64 lg:w-80 xl:w-96 object-cover mb-4 rounded-full"
      />
      <p class="text__secondary--medium items-center text-center">
        Please adjust your preferences and
      </p>
      <button
        @click="openFilterModel"
        class="btn btn__secondary px-4 py-2"
        title="Refine filters and try again"
      >
        try again.
      </button>
    </div>
  </main>
  <FiltersModal v-model="showFilterModal" @filters="applyFilters" />
</template>
