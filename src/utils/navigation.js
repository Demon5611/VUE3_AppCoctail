// src/utils/navigation.js

import { useRouter } from 'vue-router'

export function useBackHome(ingredient) {
  const router = useRouter()

  return () => {
    // Если ингредиент передан, сбрасываем его
    if (ingredient) {
      ingredient.value = null
    }
    // Переходим на главную страницу
    router.push({ name: 'home' })
  }
}