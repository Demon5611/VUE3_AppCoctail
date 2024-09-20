const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'
export const INGREDIENT_LIST_URL = `${BASE_URL}list.php?i=list` // выпадающий список при выборе ингредиента
export const COCTAILS_BY_INGR_URL = `${BASE_URL}filter.php?i=` // список карточек по выбранному ингредиенту
export const COCTAIL_BY_ID_URL = `${BASE_URL}lookup.php?i=` // карточка коктейля по ID
export const RANDOM_COCTAIL_URL = `${BASE_URL}random.php`