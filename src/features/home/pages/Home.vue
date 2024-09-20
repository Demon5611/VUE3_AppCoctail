<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CoctailThump from '../../../features/coctail/components/CoctailThump.vue'
import { getCoctails, getIngredients } from '../../../features/coctail/services/coctailService'
import AppLayout from '../../../shared/components/AppLayout.vue'
import { useBackHome } from '../../../shared/utils/navigation'
import { useRootStore } from '../../../stores/root' 

// Создаем переменные для данных
const ingredients = ref(null) 
const coctails = ref(null) 
const ingredient = ref(null) 

const rootStore = useRootStore() // Обращаемся к store для методов clearCoctail и randomCoctail
const router = useRouter() // Для маршрутизации
const backHome = useBackHome(ingredient) 

// Получаем список ингредиентов при монтировании компонента
onMounted(async () => {
  rootStore.clearCoctail() 


  ingredients.value = await getIngredients() 
})

// Получаем коктейли по выбранному ингредиенту
function getCoctailsList() {

  if (ingredient.value) {
    getCoctails(ingredient.value) 
      .then((data) => {
        coctails.value = data 
      })
      .catch((error) => {
        console.error('Ошибка при получении коктейлей по ингредиенту:', error)
      })
  }
}

// Переход- путь к детальной странице коктейля
function goToCoctail(id) {
  router.push({ name: 'coctail', params: { id } })
}
</script>

<template>
  <AppLayout>
    <div class="wrapper">
      <div v-if="!ingredient || !coctails" class="info">
        <div class="title">Choose your drink</div>
        <div class="line"></div>
        <div class="select-wrapper">
          <el-select
            v-model="ingredient"
            placeholder="Choose main ingredient"
            size="large"
            style="width: 240px"
            class="select"
            @change="getCoctailsList"
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            />
          </el-select>
        </div>
        <div class="text">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by
          ingredient through our cocktail generator.
        </div>
        <img src="../../../shared/assets/img/cocktails.png" alt="#" class="img" />
      </div>
      <div v-else class="info">
        <img src="../../../shared/assets/img/back.png" @click="backHome" alt="<- back" class="btn-back" />
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <div class="coctails">
          <CoctailThump
            v-for="coctail in coctails"
            :key="coctail.idDrink"
            :coctail="coctail"
            @click="goToCoctail(coctail.idDrink)"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style lang="sass" scoped>
@import '../../../shared/styles/main'

.info
  padding: 80px 0
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

.select-wrapper
  padding-top: 50px
  width: 220px

.img
  margin-top: 50px

.coctails
  max-height: 600px
  overflow-y: auto
  margin-top: 50px
</style>
