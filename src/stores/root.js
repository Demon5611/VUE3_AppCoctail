import axios from 'axios'
import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { COCTAIL_BY_ID_URL, COCTAILS_BY_INGR_URL, INGREDIENTS_URL, RANDOM_COCTAIL_URL } from '../constants/api'

export const useRootStore = defineStore('root', {
  state: () => {
    return {
      ingredients: [],
      coctails: [],
      coctail: null,
      randomCoctail: null
    }
  },
  actions: {
    async getIngredients ()
    {
      const response = await axios.get(INGREDIENTS_URL) // сделали запрос
      this.ingredients = response?.data?.drinks // получили массив ингредиентов и записали в state (ingredients)      
    },
    async getCoctails (ingredient)
    {
      const response = await axios.get(`${COCTAILS_BY_INGR_URL}${ingredient}`)
      this.coctails = response?.data?.drinks
    },
    async getCoctailById (id)
    {
      const response = await axios.get(`${COCTAIL_BY_ID_URL}${id}`)
      this.coctail = response?.data?.drinks[0] // Сохраняем данные коктейля в state
    },

    clearCoctail() {
      this.coctail = null // Присваиваем null, чтобы очистить данные коктейля
    },

    // Создаем метод без async и оборачиваем его в debounce
    getRandomCoctail: debounce(function () {
      return axios.get(RANDOM_COCTAIL_URL)
        .then(response => {
          this.coctail = response.data.drinks[0]
        })
        .catch(error => {
          console.error('Error fetching random cocktail:', error)
        })
    }, 300)
  }
})
