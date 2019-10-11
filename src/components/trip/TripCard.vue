<template lang="pug">
  v-card.trip-card.mb-5(
    width="530"
    height="126"
    min-width="530"
    min-height="126"
    tile
    hover)
    v-list-item.pl-0
      v-list-item-avatar.img.ml-2(
        tile
        size="110")
        v-img(:src="trip.images.length !== 0 ? trip.images[0] : ''")
      .content.my-auto
        rating-favorite.mt-3(:item="trip" :type="'trip'")
        v-row.infomation
          v-col.pt-1(cols="6")
            ul(style="list-style: none;")
              li 作者：{{ trip.username }}
              li 旅遊天數： {{ trip.days }}
          v-col.pt-1(cols="6")
            ul(style="list-style: none;")
              li 城市： {{ cities }}
              li 預估花費： ${{ estimatedCost }}
</template>

<script>
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  name: 'TripCard',
  components: {
    RatingFavorite
  },
  props: {
    trip: Object
  },
  data () {
    return {
      defautlImage: 'https://source.unsplash.com/random/110x110',
      estimatedCost: this.trip.contents.map(content => content.activities.reduce((total, activity) => total + activity.cost, 0)).reduce((total, dailyCost) => total + dailyCost, 0)
    }
  },
  computed: {
    cities () {
      return this.trip.cities.join('、')
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-card {
  border-radius: 7px;
  ul {
    padding: 0;
  }
  .img {
    border-radius: 4px;
  }
  .content {
    width: 80%;
    height: 95%;
  }
}

</style>
