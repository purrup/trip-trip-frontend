<template lang="pug">
  div(class="rating-favorite-root")
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
      class="favorite-icon"
      :style="{ 'color' : showWhichIcon ? 'red' : 'grey' }"
      @mouseover="isOnHover = true"
      @mouseout="isOnHover = false"
    ) {{ showWhichIcon ? "favorite" : "favorite_border" }}
</template>

<script>

export default {
  props: {
  },
  data () {
    return {
      rating: 4,
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
  > span {
    color: black;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    padding-right: 5px;
  }
  .favorite-icon {
    position: absolute;
    right: 0px;
  }
}
</style>
