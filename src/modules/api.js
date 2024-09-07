const apiUrl = 'http://localhost:3000'

/**
 * Getting the "Dishes" array from our database.
 * @param none
 * @returns a Promise
 */
export function getDishes() {
  return fetch(`${apiUrl}/dishes`).then((response) => response.json())
}
