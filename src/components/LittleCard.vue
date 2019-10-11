<template lang="pug">
  v-card(class="little-card-root")
    v-carousel(
      height="144"
      hide-delimiter-background
      hide-delimiters
      :next-icon="images.length !== 1 ? '$vuetify.icons.next' : false"
      :prev-icon="images.length !== 1 ? '$vuetify.icons.prev' : false")
      v-carousel-item(
        v-for="image in images"
        :key="image"
        :src="image")
    div(class="card-content")
      rating-favorite(
        :item="item"
        :type="type")
</template>

<script>
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  components: {
    RatingFavorite
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    type: String
  },
  data () {
    return {
      images: []
    }
  },
  created () {
    if (this.type === 'site') {
      this.images = this.item.photos
    } else {
      this.images = this.item.images
    }
    if (this.images.length === 0) {
      this.images.push(require('@/assets/image/5.jpg'))
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
  }
}
</style>
