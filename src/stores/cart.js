import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  //----  Refs & Vars ----//

  // Reactive Map to store cart items, mapping (dish.id) to their corresponding cartItem
  const cart = ref(new Map())
  const isCartVisible = ref(true)

  //---- Computed & Functions ----//

  /**
   * Computed property that calculates the total number of dishes in the cart
   * @returns {number} The total quantity of all dishes in the cart
   */
  const totalAmountDishes = computed(() => {
    let total = 0
    cart.value.forEach((cartItem) => {
      total += cartItem.amount
    })
    return total
  })

  /**
   * Computed property that calculates the total price of all items in the cart.
   * @returns {string} The total price of all items in the cart, formatted as a string with two decimal places.
   */
  const totalPrice = computed(() => {
    let total = 0
    cart.value.forEach((cartItem) => {
      total += cartItem.data.price * cartItem.amount
    })
    return total.toFixed(2) // number with 2 decimals
  })

  /**
   * Adds a dish to the cart or increases the quantity if it's already in the cart.
   * @param {Object} dish - The dish object to be added to the cart.
   */
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

  /**
   * Removes a dish from the cart or decreases its quantity
   * @param {Object} dish - The dish object to be removed or updated in the cart.
   */
  function removeDish(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      cartItem.amount--
      if (cartItem.amount <= 0) {
        deleteDish(dish)
      }
    }
  }

  /**
   * Removes a dish from the cart.
   * @param {Object} dish - The dish object to be removed
   */
  function deleteDish(dish) {
    cart.value.delete(dish.id)
  }

  /**
   * Retrieves the quantity of a specific dish in the cart
   * @param {Object} dish - The dish object to check in the cart.
   * @returns {number} The quantity of the dish in the cart or 0 if not present.
   */
  function getDishAmount(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      return cartItem.amount
    } else {
      return 0
    }
  }

  /**
   * Resets the quantity of a specific dish in the cart to 0
   * @param {Object} dish - The dish object whose amount needs to be reset
   * @returns {number} The updated amount of the dish, which is 0.
   */
  function resetDishAmount(dish) {
    let cartItem = cart.value.get(dish.id)
    if (cartItem) {
      return (cartItem.amount = 0)
    } else {
      return 0
    }
  }

  /**
   * Clears the cart by reinitializing it
   * This function resets the cart to its initial state
   */
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

/**
 * The CartItem class represents an item in the cart.
 * - `data`: An object containing the details of the dish
 * - `amount`: The quantity of the dish in the cart, initialized to 1 by default.
 */
class CartItem {
  constructor() {
    this.data = {}
    this.amount = 1
  }
}
