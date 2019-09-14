<template lang="pug">
  v-card(class="little-card-root")
    v-carousel(
      height="144"
      hide-delimiter-background
      hide-delimiters
    )
      v-carousel-item(
        v-for="image in site.photos"
        :key="image"
        :src="image"
      )
    div(class="card-content")
      div
        span {{site.name}}
        rating-favorite(
          :rating="site.rating"
          :ratingNum="site.reviews.length"
          :placeId="site.placeId"
          @toggleCollectingCounts="toggleCollectingCounts")
      div
        span 收藏次數: {{ site.collectingCounts + counts }}
</template>

<script>
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  components: {
    RatingFavorite
  },
  props: {
    site: Object
  },
  data () {
    return {
      images: [
        require('@/assets/image/1.jpg'),
        require('@/assets/image/2.jpg'),
        require('@/assets/image/3.jpg'),
        require('@/assets/image/4.jpg'),
        require('@/assets/image/5.jpg')
      ],
      counts: 0
    }
  },
  methods: {
    toggleCollectingCounts (isFavorite) {
      isFavorite ? this.counts += 1 : this.counts -= 1
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
    > div:nth-child(1) {
      display: grid;
      grid-template-columns: auto 1fr;
      > span {
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;
        padding-right: 5px;
      }
    }
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
