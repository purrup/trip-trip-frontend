<template lang="pug">
  div(class="rating-favorite-root")
    v-rating(
      v-model="rating"
      color="#FB9026"
      background-color="#7F7F7F"
      empty-icon="$vuetify.icons.ratingFull"
      half-increments
      hover
      size="15px"
      dense
      readonly
    )
    span ({{ratingNum}})
    v-icon(
      class="favorite-icon"
      :style="{ 'color' : showWhichIcon ? 'red' : 'grey' }"
      @mouseover="isOnHover = true"
      @mouseout="isOnHover = false"
    ) {{ showWhichIcon ? "favorite" : "favorite_border" }}
</template>

<script>

export default {
  props: {
    rating: Number,
    ratingNum: Number
  },
  data () {
    return {
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
</script>>

<style lang="scss">
.rating-favorite-root {
  display: flex;
  position: relative;
  span {
    font-size: 12px;
  }
  .favorite-icon {
    position: absolute;
    right: 0px;
  }
}
</style>
