const apiUrl = 'http://localhost:3000'

/**
 * Getting the "Dishes" array from our database.
 * @param none
 * @returns a Promise
 */
export function getDishes() {
  return fetch(`${apiUrl}/dishes`)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((dish) => processTags(dish))
      return json
    })
}

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
