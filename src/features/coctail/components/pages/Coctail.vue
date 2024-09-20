<template>
  <AppLayout>
    <div class="wrapper">
      <div v-if="coctail">
        <img src="../../../../shared/assets/img/back.png" @click="backHome" alt="#" class="btn-back" />
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
import { useRootStore } from '../../../../stores/root'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBackHome } from '../../../../shared/utils/navigation'
import AppLayout from '../../../../shared/components/AppLayout.vue'

const rootStore = useRootStore() // обратились к store
const { coctail } = storeToRefs(rootStore) // Сохраняем данные коктейля в реф
const route = useRoute() // Импортируем маршрут
const backHome = useBackHome(null)

onMounted(() => {
  const id = route.params.id
  rootStore.getCoctailById(id)
})
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
</script>

<style lang="sass" scoped>
@import '../../../../shared/styles/main'


</style>