<script setup>
import MainHeader from '@/components/MainHeader.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import { getDishes } from '@/modules/api'
import { computed, ref } from 'vue'
import MenuList from '@/components/MenuList.vue'

const allDishes = ref([])

getDishes().then((dishes) => (allDishes.value = dishes))

const dishesComputed = computed(function () {
  console.log(filters.value)
  return allDishes.value
})

//Filters
const filters = ref({})
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
    <ul>
      <MenuList :dishes="dishesComputed" />
    </ul>
  </section>
  <FiltersModal v-model="showFilterModal" @filters="applyFilters" />
</template>

<style></style>
