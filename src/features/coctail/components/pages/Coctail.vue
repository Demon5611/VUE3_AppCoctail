<template>
  <AppLayout>
    <div class="wrapper">
      <div v-if="coctail">
        <img
          src="../../../../shared/assets/img/back.png"
          @click="backHome"
          alt="#"
          class="btn-back"
        />
        <div class="title">{{ coctail.strDrink }}</div>
        <div class="line"></div>
        <ul>
          <li v-for="(item, index) in ingredientsList" :key="index">
            {{ item.ingredient }} | {{ item.measure }}
          </li>
          <p class="text">{{ coctail.strInstructions }}</p>
        </ul>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

import AppLayout from '../../../../shared/components/AppLayout.vue'
import { useBackHome } from '../../../../shared/utils/navigation'
import { useRootStore } from '../../../../stores/root'
import { getCoctailById } from '../../../../features/coctail/services/coctailService' // Импортируем функцию из сервиса
import { useRoute } from 'vue-router'

const rootStore = useRootStore() // обратились к store
const { coctail } = storeToRefs(rootStore) // Сохраняем данные коктейля в реф

const backHome = useBackHome(null)

// список ингредиентов в коктейле
const ingredientsList = computed(() => {
  if (!coctail.value) return []

  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = coctail.value[`strIngredient${i}`]
    const measure = coctail.value[`strMeasure${i}`]

    if (ingredient) {
      ingredients.push({ ingredient, measure })
    }
  }

  return ingredients
})

const route = useRoute()
// Получение коктейля по ID при монтировании компонента
onMounted(async () => {
  const id = route.params.id // Получаем ID из маршрута
  await renderCoctailById(id) // Вызываем функцию для получения коктейля
})

async function renderCoctailById (id) {
  try {
    const coctailData = await getCoctailById(id) // Вызов функции из сервиса
    rootStore.coctail = coctailData // Сохраняем данные коктейля в store
  } catch (error) {
    console.error('Ошибка при получении коктейля по ID', error)
  }
}

</script>

<style lang="sass" scoped>
@import '../../../../shared/styles/main'
</style>
