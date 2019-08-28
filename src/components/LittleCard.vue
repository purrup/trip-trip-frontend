<template lang="pug">
  v-card(class="little-card-root")
    v-carousel(
      height="144"
      hide-delimiter-background
      hide-delimiters
    )
      v-carousel-item(
        v-for="(image, i) in images"
        :key="image"
        :src="image"
      )
    div(class="card-content")
      div
        rating-favorite
      div
        span 收藏次數: {{ 10 }}
</template>

<script>
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  components: {
    RatingFavorite
  },
  props: {
  },
  data () {
    return {
      images: [
        require('@/assets/image/1.jpg'),
        require('@/assets/image/2.jpg'),
        require('@/assets/image/3.jpg'),
        require('@/assets/image/4.jpg'),
        require('@/assets/image/5.jpg')
      ]
    }
  }
}
</script>
<style lang="scss">
.little-card-root {
  width: 250px;
  height: 210px;
  > .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 66px;
    padding: 6px 10px;
    > div:nth-child(2) {
      text-align: left;
      span {
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
}
</style>
