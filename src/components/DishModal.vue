<script setup>
import { useCartStore } from '../stores/cart.js'
import ModalWindow from '@/components/ModalWindow.vue'
import DishAmountButtons from './DishAmountButtons.vue'
import SnackbarComponent from './SnackbarComponent.vue'
import { ref } from 'vue'

//Props
const props = defineProps({
  dish: { type: Object }
})
//Refs
const snackbar = ref(null) //SnackBar for Add toCart Btn
//Model
const model = defineModel({ default: false })
//Store
const cartStore = useCartStore()

function addDishItem(dish) {
  cartStore.addDish(dish)
  snackbar.value.showMessage(dish.name + ' has been added to your cart!')
}
</script>

<template>
  <ModalWindow v-model="model">
    <div class="flex flex-col justify-between w-full gap-3">
      <!-- Dish Name, tags & price -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4"
      >
        <div class="flex flex-col gap-2 md:flex-row items-start md:items-center">
          <!-- Name -->
          <h2 class="header header__secondary mb-0">{{ props.dish.name }}</h2>

          <!-- Dietary Preferences Tags -->
          <div
            v-if="props.dish.tags?.dietaryPreferences.length !== 0"
            class="flex flex-wrap items-center md:mt-0"
          >
            <div
              v-for="(tag, index) in props.dish.tags?.dietaryPreferences"
              :key="tag + '-' + index"
              class="tags tags--dietary"
              :title="'Dietary Preferences tag: ' + props.dish.tags?.dietaryPreferences[index]"
            >
              {{ tag }}
            </div>
          </div>

          <!-- Allergens Tags -->
          <div
            v-if="props.dish.tags.allergens?.length !== 0"
            class="flex flex-wrap items-center md:mt-0"
          >
            <div
              v-for="(tag, index) in props.dish.tags.allergens"
              :key="tag + '-' + index"
              class="tags tags--allergnen"
              :title="'Allergen tag: ' + props.dish.tags.allergens[index]"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <!--  Price -->
        <p class="text__secondary--medium md:mt-0">
          {{ '€' + props.dish.price }}
        </p>
      </div>

      <!--Image, description & ingredients -->
      <div class="flex flex-col md:flex-row gap-4 items-start">
        <img
          :src="props.dish.image"
          :alt="'A picture of our delicious dish ' + props.name"
          class="rounded-lg w-full h-full object-cover flex-1"
        />
        <div class="flex flex-col md:flex-row items-start justify-between w-full gap-4s">
          <!-- Description  -->
          <div>
            <h3 class="text-lg font-semibold text-slate-800">Description</h3>
            <p class="text-base mb-0 mt-0 md:mb-2 max-w-4xl text-left border-b-2 pb-3">
              {{ props.dish.description }}
            </p>
            <!-- Ingredients -->
            <div class="my-4">
              <h3 class="text-lg font-semibold text-slate-800">Ingredients</h3>
              <p>{{ props.dish.ingredients.join(', ') }}</p>
            </div>
            <!-- Buttons Section -->
            <div class="flex flex-col justify-between items-end h-full w-full">
              <DishAmountButtons
                :dish="dish"
                v-if="cartStore.getDishAmount(dish) !== 0"
                class="mt-4 md:w-auto"
              >
                <button
                  @click="cartStore.resetDishAmount(dish)"
                  class="btn btn__help font-normal"
                  title="Reset the selected amount"
                >
                  Reset
                </button>
              </DishAmountButtons>
              <button
                v-else
                class="btn btn__secondary btn__secondary--green min-w-48 px-8 py-2 w-full text-center md:w-auto"
                @click="addDishItem(dish)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWindow>
  <SnackbarComponent ref="snackbar"></SnackbarComponent>
</template>
