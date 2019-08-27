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
        span 鹿野高台
        v-rating(
          v-model="rating"
          color="#FB9026"
          background-color="#7F7F7F"
          empty-icon="$vuetify.icons.ratingFull"
          half-increments
          hover
          size="15px"
          dense
        )
        v-icon(
          @mouseover="isOnHover = true"
          @mouseout="isOnHover = false"
        ) {{ showWhichIcon ? "favorite" : "favorite_border" }}
      div
        span 收藏次數: {{ 10 }}
</template>

<script>

export default {
  props: {
  },
  data () {
    return {
      rating: 4,
      images: [
        require('@/assets/image/1.jpg'),
        require('@/assets/image/2.jpg'),
        require('@/assets/image/3.jpg'),
        require('@/assets/image/4.jpg'),
        require('@/assets/image/5.jpg')
      ],
      isOnHover: false
    }
  },
  computed: {
    isFavorite () {
      return false
    },
    showWhichIcon () {
      if (this.isFavorite) {
        return !this.isOnHover
      }
      return this.isOnHover
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
      display: flex;
      justify-content: space-between;
      > span {
        color: black;
        font-weight: bold;
        font-size: 20px;
        line-height: 20px;
      }
    }
    > div:nth-child(2) {
      span {
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
}
</style>
