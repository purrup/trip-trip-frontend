<template lang="pug">
  v-card.trip-card.mb-5(
    width="530"
    height="125"
    min-width="530"
    min-height="125"
    tile
    hover
    :to="{ path: `trips/${ trip._id }` }"
    )
    v-list-item.pl-0
      v-list-item-avatar.img.ml-2(
        tile
        size="110"
        )
        v-img(src="https://source.unsplash.com/random/110x110")
      .content.my-auto
        .trip-name.headline.pt-2 {{ trip.name }}
        v-row.infomation
          v-col.pt-1(cols="6")
            ul(style="list-style: none;")
              li 作者：Saitama
              li 旅遊天數： {{ trip.days }}
              li 城市： {{ cities }}
          v-col.pt-1(cols="6")
            ul(style="list-style: none;")
              li 預估花費： ${{ trip.cost}}
              li 收藏次數： {{ trip.collectingUsers.length }}
              li 留言次數： {{ trip.comments.length }}
</template>

<script>
export default {
  name: 'TripCard',
  props: {
    trip: Object
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
