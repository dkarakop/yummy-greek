import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(new Map())

  const totalAmountDishes = computed(() => {
    let total = 0
    cart.value.forEach((cartItem) => {
      total += cartItem.amount
    })
    return total
  })

  const totalPrice = computed(() => {
    let total = 0
    cart.value.forEach((cartItem) => {
      total += cartItem.item.price * cartItem.amount
    })
    return total
  })

  function addDish(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      cartItem.amount++
    } else {
      cartItem = new CartItem()
      cartItem.item = dish
      cart.value.set(dish.id, cartItem)
    }
  }

  function removeDish(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      cartItem.amount--
      if (cartItem.amount <= 0) {
        cart.value.delete(dish.id)
      }
    }
  }

  return {
    cart,
    totalAmountDishes,
    totalPrice,
    addDish,
    removeDish
  }
})

class CartItem {
  constructor() {
    this.item = null
    this.amount = 1
  }
}
