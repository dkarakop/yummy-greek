import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(new Map())
  const isCartVisible = ref(true)

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
      total += cartItem.data.price * cartItem.amount
    })
    return total.toFixed(2)
  })

  function addDish(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      cartItem.amount++
    } else {
      cartItem = new CartItem()
      cartItem.data = dish
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

  function deleteDish(dish) {
    cart.value.delete(dish.id)
  }

  function getDishAmount(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      return cartItem.amount
    } else {
      return 0
    }
  }

  function resetDishAmount(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      return (cartItem.amount = 0)
    } else {
      return 0
    }
  }

  function clearCart() {
    cart.value = new Map()
  }

  return {
    cart,
    isCartVisible,
    totalAmountDishes,
    totalPrice,
    addDish,
    removeDish,
    getDishAmount,
    deleteDish,
    resetDishAmount,
    clearCart
  }
})

class CartItem {
  constructor() {
    this.data = {}
    this.amount = 1
  }
}
