<!-- левая часть экрана (имиджа) картинка и кнопка будет неизменна и передается как  <AppLayout> -->

<template>
  <div class="root">
    <img class="img" :src="bgImage" />
    <div class="main">
      <RouterLink to="/random">
      <el-button class="btn" @click="handleRandomCoctail">Get random cocktail</el-button>
      </RouterLink>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import bgImage from '../assets/img/bg-1.jpg'
import { useRootStore } from '@/stores/root'
import { useRouter } from 'vue-router'

const rootStore = useRootStore() // обратились к store
const router = useRouter()

// Метод для сброса текущего коктейля
const clearCoctail = () => {
  rootStore.clearCoctail() // Вызываем действие для сброса коктейля
}

// Метод для получения случайного коктейля
const getRandomCoctail = () => {
  rootStore.getRandomCoctail() // Загружаем случайный коктейль
}

// Метод для сброса текущего коктейля и получения нового
const handleRandomCoctail = () => {
  clearCoctail() // Очищаем текущий коктейль перед загрузкой нового
  getRandomCoctail() // Загружаем случайный коктейль
  router.push({ name: 'coctailRandom' }) // обновляем страницу при клике по кнопке 
}


</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.root
  display: flex
  background-color: $background
  min-height: 100vh

.img
  width: 50%
  background-repeat: no-repeat
  background-position: 50% 50%
  background-size: cover

.main
  position: relative
  display: flex
  justify-content: center
  width: 50%
  padding: 32px 40px
</style>
