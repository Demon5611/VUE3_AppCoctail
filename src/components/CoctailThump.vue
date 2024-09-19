<script setup>
import { onMounted } from 'vue';
import { useRootStore } from '@/stores/root'


const props = defineProps({
  coctail: {
    type: Object,
    required: true
  }
})

const rootStore = useRootStore()
onMounted(() => {
  rootStore.clearCoctail()
})
</script>


<template>
    
  <div class="root">
    <RouterLink :to="`/coctails/${coctail.idDrink}`">
      <div :style="`background-image: url(${coctail.strDrinkThumb})`" class="pic"></div>
      <div class="name">{{ coctail.strDrink }}</div>
    </RouterLink>
</div>
</template>


<style lang='sass' scoped>
@import '../assets/styles/main'

.root
    display: inline-block
    width: calc((100% - 76px) / 3)
    padding-right: 38px
    padding-bottom: 20px
    max-height: 100px
    margin-top: 40px

    &:nth-child(3n + 1)
        padding-right: 0
        .pic
            width: 120px
            height: 120px
            margin: 0 auto
            background-repeat: no-repeat
            background-position: 50% 50%
            background-size: 100%

.name
    padding-top: 15px
    letter-spacing: 0.1px
</style>