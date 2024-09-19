<template>
  <AppLayout>
    <div class="wrapper">
      <div v-if="coctail">
        <img src="../../../../shared/assets/img/back.png" @click="backHome" alt="#" class="btn-back" />
        <div class="title">{{ coctail.strDrink }}</div>
        <div class="line"></div>
        <ul class="ingredients-list">
          <img :src="coctail.strDrinkThumb" alt="Ingredient image" class="ingredient-img" />
          <li v-for="(item, index) in randomListCoctail" :key="index">
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

.wrapper
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 0 40px

.ingredients-list
  list-style-type: none
  padding: 0
  margin-bottom: 20px

.coctail-container
  display: flex
  width: 100%

.image-container
  width: 50%

.coctail-img
  width: 100%
  height: auto
  border-radius: 10px

.info-container
  width: 50%
  padding: 20px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.title
  font-size: 32px
  font-weight: bold
  text-align: center
  margin-bottom: 20px

.line
  width: 60px
  height: 4px
  background-color: #ff5e57
  margin-bottom: 20px

.ingredient-img

  width: 100px
  height: 100px
  margin: 0 auto 20px auto // Центрируем по горизонтали с авто-отступами
  display: block // Это необходимо для margin: auto
</style>