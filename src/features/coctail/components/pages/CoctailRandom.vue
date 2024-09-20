<template>
  <AppLayout>
    <div class="wrapper">
      <div v-if="coctail">
        <img src="../../../../shared/assets/img/back.png" @click="backHome" alt="#" class="btn-back" />
        <div class="title">{{ coctail.strDrink }}</div>
        <div class="line"></div>
        <ul class="ingredients-list">
          <img :src="coctail.strDrinkThumb" alt="Ingredient image" class="ingredient-img" />
          <li class='ingredients-text' v-for="(item, index) in randomListCoctail" :key="index">
            <img src="../../../../shared/assets/img/heart.png" alt="heat" class="heat-img" />
            {{ item.ingredient }}
          </li>
        </ul>
        <p class="text">{{ coctail.strInstructions }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
        <!-- добавили проверку на существование данных перед тем, как отрисовывать элементы DOM -->
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { useRootStore } from '../../../../stores/root'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useBackHome } from '../../../../shared/utils/navigation'

import AppLayout from '../../../../shared/components/AppLayout.vue'

const rootStore = useRootStore() // обратились к store
const { coctail } = storeToRefs(rootStore) // Сохраняем данные коктейля в реф

const backHome = useBackHome(null)

// Загружаем случайный коктейль при монтировании, но сначало очистим данные от прежнего рендеринга
onMounted(() => {
  rootStore.clearCoctail()
  rootStore.getRandomCoctail()
})

const randomListCoctail = computed(() => {
  if (!coctail.value) return []

  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = coctail.value[`strIngredient${i}`]
    const measure = coctail.value[`strMeasure${i}`]
    const image = coctail.value[`strDrinkThumb${i}`]

    if (ingredient) {
      ingredients.push({ ingredient, measure, image })
    }
  }

  return ingredients
})
</script>

<style lang="sass" scoped>
@import '../../../../shared/styles/main'



.ingredients-list
  list-style-type: none
  padding: 0
  margin-bottom: 10px

.ingredients-text
  margin-bottom: 2%

.heat-img
  width: 17px
  margin-right: 10px

.ingredient-img
  width: 100px
  height: 100px
  margin: 0 auto 10% auto // Центрируем по горизонтали с авто-отступами
  display: block // Это необходимо для margin: auto
</style>