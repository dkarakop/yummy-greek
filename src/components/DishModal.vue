<script setup>
import ModalWindow from '@/components/ModalWindow.vue'

const props = defineProps({
  dish: { type: Object, required: true }
})
</script>

<template>
  <ModalWindow>
    <div>
      <img :src="props.dish.image" :alt="'A picture of our delicious dish ' + props.name" />
      <h2>{{ props.dish.name }}</h2>
      <p>{{ 'Price: ' + props.dish.price + '€' }}</p>
      <p>{{ props.dish.description }}</p>
      <div>
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(ingredient, index) in props.dish.ingredients" :key="ingredient + '-' + index">
            {{ ingredient }}
          </li>
        </ul>
        <div>
          <div v-if="props.dish?.tags?.dietaryPreferences.length !== 0">
            <div
              v-for="(tag, index) in props.dish.tags.dietaryPreferences"
              :key="tag + '-' + index"
              class="bg-green-700"
            >
              {{ tag }}
            </div>
          </div>
          <div v-if="props.dish?.tags?.allergens.length !== 0">
            <div
              v-for="(tag, index) in props.dish.tags.allergens"
              :key="tag + '-' + index"
              class="bg-red-600"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWindow>
</template>
