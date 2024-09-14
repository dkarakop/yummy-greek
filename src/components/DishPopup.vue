<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '../stores/cart.js'
import { getDish } from '@/modules/api.js'
import BasePopup from '@/components/BasePopup.vue'
import BaseSnackbar from './BaseSnackbar.vue'
import DishAmountButtons from './DishAmountButtons.vue'

const cartStore = useCartStore()

//---- Props, Refs & Vars ----//

const props = defineProps({
  dishId: { type: Number }
})

const model = defineModel({ default: false })

const snackbar = ref(null)
const dish = ref({})

//---- Computed, Watchers & Functions ----//

// Watch for dishId changes and update the dish data
watch(
  () => props.dishId,
  (id) => {
    getDish(id).then((response) => {
      dish.value = response
    })
  }
)

function addDishItem(dish) {
  cartStore.addDish(dish)
  snackbar.value.showMessage(dish.name + ' has been added to your cart!')
}
function resetBtn(dish) {
  cartStore.resetDishAmount(dish)
  cartStore.deleteDish(dish)
}
</script>

<template>
  <BasePopup v-model="model" :popupName="dish.name">
    <div class="flex flex-col justify-between w-full gap-3">
      <!-- Dish: tags & price -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-md:mt-2"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <!-- Tags: Dietary Preferences -->
          <div
            v-if="dish.tags?.dietaryPreferences.length !== 0"
            class="flex flex-wrap items-center"
          >
            <div
              v-for="(tag, index) in dish.tags?.dietaryPreferences"
              :key="tag + '-' + index"
              class="tags tags--dietary"
              :title="'Dietary Preferences tag: ' + dish.tags?.dietaryPreferences[index]"
            >
              {{ tag }}
            </div>
          </div>

          <!-- Tags: Allergens -->
          <div v-if="dish.tags?.allergens?.length !== 0" class="flex flex-wrap items-center">
            <div
              v-for="(tag, index) in dish.tags?.allergens"
              :key="tag + '-' + index"
              class="tags tags--allergnen"
              :title="'Allergen tag: ' + dish.tags.allergens[index]"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <!-- Price -->
        <p class="text font-semibold">
          {{ '€' + dish.price }}
        </p>
      </div>

      <!-- Dish: image, description, ingredients & amount buttons (toggle between AddToCart and DishAmountButtons) -->
      <div class="flex flex-col md:flex-row gap-4 items-start">
        <!-- Image -->
        <img
          :src="dish.image"
          :alt="'A picture of our delicious dish ' + dish.name"
          class="rounded-lg w-full h-full object-cover flex-1"
        />
        <div class="flex flex-col md:flex-row items-start justify-between w-full gap-4s">
          <!-- Description -->
          <div>
            <h3 class="header__small">Description</h3>
            <p class="mb-0 mt-0 md:mb-2 max-w-4xl text-left border-b-2 pb-3">
              {{ dish.description }}
            </p>

            <!-- Ingredients -->
            <div class="my-4">
              <h3 class="header__small">Ingredients</h3>
              <p>{{ dish.ingredients?.join(', ') }}</p>
            </div>

            <!-- Amount buttons -->
            <div class="flex flex-col justify-between items-end h-full w-full">
              <!-- DishAmountButtons: appears when AddToCart is clicked. Includes buttons to add/remove a dish and a Reset button -->
              <DishAmountButtons
                :dish="dish"
                v-if="cartStore.getDishAmount(dish) !== 0"
                class="mt-4 md:w-auto"
              >
                <!-- Reset button: sets the selected dish amount to zero and disappears along with the DishAmountButtons -->
                <button
                  @click="resetBtn(dish)"
                  class="btn btn--secondary btn--small"
                  title="Reset the selected amount"
                >
                  Reset
                </button>
              </DishAmountButtons>
              <!-- AddToCart button: adds one dish to the cart and then disappears -->
              <button v-else class="btn btn--primary" @click="addDishItem(dish)">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePopup>
  <!-- Snackbar: displays a message when the dish amount is increased or decreased. -->
  <BaseSnackbar ref="snackbar"></BaseSnackbar>
</template>
