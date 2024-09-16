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

/**
 * Processes dietary preferences and allergens for a given dish and
 * adds a `processedTags` object to the dish object.
 * @param {Object} dish - The dish object that contains tags for dietary preferences and allergens.
 * @property {Object} dish.tags - Object containing tags related to dietary preferences and allergens.
 */
function processTags(dish) {
  const processedTags = {
    dietPref: {
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      lactoseFree: false,
      nutFree: false
    },
    allergens: {
      containsNuts: false,
      containsGluten: false,
      containsLactose: false,
      other: false,
      allergenFree: false
    },
    names: {
      vegan: 'vegan',
      vegetarian: 'vegeterian',
      glutenFree: 'gluten-free',
      lactoseFree: 'lactose-free',
      nutFree: 'nuts-free',
      containsNuts: 'contains-nuts',
      containsGluten: 'contains-gluten',
      containsLactose: 'contains-lactose',
      other: 'other allergens ',
      allergenFree: 'allergen-free'
    }
  }

  let allTags = []

  //Check if dish.tags is an array
  if (Array.isArray(dish.tags)) {
    allTags = dish.tags
  } else {
    allTags = dish.tags.dietaryPreferences.concat(dish.tags.allergens)
  }

  // dietPref: Boolean values indicating specific dietary preferences such as vegan, vegetarian, gluten-free, etc.
  processedTags.dietPref.vegan = allTags.includes('vegan')
  processedTags.dietPref.vegetarian = allTags.includes('vegetarian')
  processedTags.dietPref.glutenFree =
    allTags.includes('gluten-free') && !allTags.includes('contains-gluten')
  processedTags.dietPref.lactoseFree = allTags.includes('lactose-free')
  processedTags.dietPref.nutFree = !allTags.includes('contains-nuts')

  // allergens`: Boolean values identifying the presence of common allergens like nuts, gluten, lactose, and others.
  processedTags.allergens.containsNuts = allTags.includes('contains-nuts')
  processedTags.allergens.containsGluten =
    allTags.includes('contains-gluten') || !allTags.includes('gluten-free')
  processedTags.allergens.containsLactose = !allTags.includes('lactose-free')
  processedTags.allergens.containsAllergens =
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
      processedTags.allergens.other = true
    }
  })

  // Add processedTags object to dish
  dish.processedTags = processedTags
}
