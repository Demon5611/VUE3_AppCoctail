<script setup>
import CoctailThump from '@/components/CoctailThump.vue'
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { useBackHome } from '@/utils/navigation'
import { onMounted } from 'vue';


onMounted(() => {
  rootStore.clearCoctail()
})


const rootStore = useRootStore() // обратились к store
rootStore.getIngredients() // вызвали метод и получили список ингредиентов

const { ingredients, coctails } = storeToRefs(rootStore) // обернули ингридиенты в реф, что бы они были реактивными
const ingredient = ref(null) // Определяем реактивную переменную для выбранного ингредиента
const router = useRouter()
const backHome = useBackHome(ingredient)
function getCoctails (){
  rootStore.getCoctails(ingredient.value)
}

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
          <el-select v-model="ingredient" placeholder="Choose main ingredient" size="large" style="width: 240px"
              class="select" @change="getCoctails">
            <el-option v-for="item in ingredients" :key="item.strIngredient1" :label="item.strIngredient1"
                :value="item.strIngredient1" />
          </el-select>
        </div>
        <div class="text">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by
          ingredient through our cocktail generator.
        </div>
        <img src="@/assets/img/cocktails.png" alt="#" class="img" />
      </div>
      <div v-else class="info">
        <img src="@/assets/img/back.png" @click="backHome" alt="#" class="btn-back" />
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <div class="coctails">
          <CoctailThump v-for="coctail in coctails" :key="coctail.idDrink" :coctail="coctail" @click="goToCoctail(coctail.idDrink)"/>
        </div>
      </div>
    </div>
  </AppLayout>
  padding: 10px 20px background-color: #28a745 color: #fff border: none border-radius: 5px cursor:
  pointer
</template>


<style lang="sass" scoped>
@import '../assets/styles/main'

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

