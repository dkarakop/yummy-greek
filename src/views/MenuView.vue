<script setup>
import MainHeader from '@/components/MainHeader.vue'
import { getDishes } from '@/modules/api'
import { computed, ref } from 'vue'
import MenuList from '@/components/MenuList.vue'

const allDishes = ref([])

getDishes().then((dishes) => (allDishes.value = dishes))

const dishesComp = computed(function () {
  return allDishes.value
})

// import ListItmes from '@/components/ListItmes.vue'
</script>

<template>
  <MainHeader> <button class="px-5 py-0.3 bg-yellow-600 rounded">Filters</button> </MainHeader>
  <section class="mx-7 p-2.5 bg-yellow-300">
    <h2 class="text-2xl text-center font-bold">Our Menu</h2>
    <ul>
      <MenuList :dishes="dishesComp" />
    </ul>
  </section>
</template>

<style></style>
