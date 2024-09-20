
import axios from 'axios'
import { defineStore } from 'pinia'
import { RANDOM_COCTAIL_URL } from '../constants/api'

export const useRootStore = defineStore('root', {
  state: () =>
  {
    return {
      ingredients: [],
      coctails: [],
      coctail: null,
      randomCoctail: null
    }
  },
  actions: {

    async getRandomCoctail ()
    {
      try
      {
        const response = await axios.get(RANDOM_COCTAIL_URL)
        if (response?.data?.drinks)
        {
          this.coctail = response.data.drinks[0]
        } else
        {
          console.error('Не удалось получить случайный коктейль.')
        }
      } catch (error)
      {
        console.error('Ошибка при получении случайного коктейля:', error)
      }
    },
    clearCoctail ()
    {
      this.coctail = null
    }
  }
})
