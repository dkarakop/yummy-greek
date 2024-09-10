<script setup>
import MainHeader from '@/components/MainHeader.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import { getDishes } from '@/modules/api'
import { computed, ref } from 'vue'
import MenuList from '@/components/MenuList.vue'

const allDishes = ref([])
const filters = ref({})

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
  return Array.from(uniqueDishes)
})

//Filters
function applyFilters(newFilters) {
  filters.value = newFilters
}

//Filters Modal
const showFilterModal = ref(false)
</script>

<template>
  <MainHeader>
    <button
      @click="showFilterModal = true"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Filters
    </button>
  </MainHeader>
  <section class="mx-7 p-2.5 bg-yellow-300">
    <h2 class="text-2xl text-center font-bold">Our Menu</h2>
    <div>
      <p>Sort Price:</p>
      <button
        @click="orderToggle()"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {{ ascendingOrder === true ? 'Highest to Lowest' : 'Lowest to Highest' }}
      </button>
    </div>

    <ul>
      <MenuList :dishes="dishesComputed" />
    </ul>
  </section>
  <FiltersModal v-model="showFilterModal" @filters="applyFilters" />
</template>
