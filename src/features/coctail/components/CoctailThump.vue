<script setup>
import { RouterLink } from 'vue-router'


const props = defineProps({
  coctail: {
    type: Object,
    required: true
  }
})

</script>

 <!-- Шаблон коктейля - картинка и название коктейля, вызывыем в цикле в Home.vue -->
<template>    
  <div class="root">
    <RouterLink :to="`/coctails/${coctail.idDrink}`">
      <div :style="{ backgroundImage: `url(${coctail.strDrinkThumb})` }" class="pic"></div>
      <div class="name">{{ coctail.strDrink }}</div>
    </RouterLink>
</div>
</template>


<style lang='sass' scoped>
@import '../../../shared/styles/main'

.root
    display: inline-block
    width: calc((100% - 76px) / 3)
    padding-right: 5%
    padding-bottom: 20px
    max-height: 100px
    margin-top: 20px

    &:nth-child(3n + 1)
        padding-right: 0
        .pic
            width: 120px
            height: 120px
            margin: 0 auto
            background-repeat: no-repeat
            background-position: 50% 50%
            background-size: 100%
            border-radius: 8px

.name
        padding-top: 15px
        letter-spacing: 0.1px
        text-decoration: none
        letter-spacing: 0.7px
        font-weight: 400 
      
</style>