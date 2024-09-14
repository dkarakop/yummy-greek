const apiUrl = 'http://localhost:3000'

/**
 * Fetches the array of dishes from the database.
 * Adds processessTags object at each dish  before returning the array
 * @returns {Promise} A Promise that resolves with the array of dishes
 */
export function getDishes() {
  return fetch(`${apiUrl}/dishes`)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((dish) => processTags(dish))
      return json
    })
}

/**
 * Fetches a dish by its ID from the API
 * Adds processessTags object at the specific dish and returns the dish data
 * @param {number} id - The ID of the dish to fetch
 * @returns {Promise} A Promise that resolves with the dish data.
 */
export function getDish(id) {
  return fetch(`${apiUrl}/dishes/${id}`)
    .then((response) => response.json())
    .then((dish) => {
      processTags(dish)
      return dish
    })
}

/*
 * Processes the tags for a given dish and adds a processedTags object to the dish
 * The processedTags object contains boolean values indicating dietary preferences and allergens
 * @param {Object} dish - The dish object with tags to be processed
 */
function processTags(dish) {
  const processedTags = {
    vegan: false,
    vegetarian: false,
    gluten: false,
    lactose: false,
    nuts: false,
    other: false,
    allergenFree: false
  }

  const allTags = dish.tags.dietaryPreferences.concat(dish.tags.allergens)

  processedTags.vegan = allTags.includes('vegan')
  processedTags.vegetarian = allTags.includes('vegetarian')
  processedTags.gluten = !allTags.includes('gluten-free')
  processedTags.lactose = !allTags.includes('lactose-free')
  processedTags.nuts = allTags.includes('contains-nuts')

  processedTags.allergenFree =
    !allTags.includes('contains-nuts') &&
    allTags.includes('lactose-free') &&
    allTags.includes('gluten-free')

  allTags.forEach((tag) => {
    const tags = [
      'vegan',
      'vegetarian',
      'contains-nuts',
      'contains-gluten',
      'lactose-free',
      'gluten-free'
    ]
    if (!tags.includes(tag)) {
      processedTags.other = true
    }
  })

  dish.processedTags = processedTags
}
