<template lang="pug">
  div(id="sites-root")
    feature-bar
    div(class="wrapper")
      div(class="sites-container")
        div 台北
        div(class="sites-wrapper")
          site-card(
            v-for="site in sites"
            :key="`site-${site.id}`"
            :site="site"
          )
      div(class="map") map
</template>

<script>
import FeatureBar from '@/components/FeatureBar.vue'
import SiteCard from '@/components/SiteCard.vue'

export default {
  components: {
    FeatureBar,
    SiteCard
  },
  data () {
    return {
      sites: [
        {
          id: 1,
          name: '鹿野高台',
          rating: 4,
          isFavorite: true,
          address: '955台東縣鹿野鄉永安村高台路42巷145號',
          phone: '08 955 1637',
          openTime: '24小時營業',
          website: 'https://www.youtube.com',
          images: [
            require('@/assets/image/1.jpg'),
            require('@/assets/image/2.jpg'),
            require('@/assets/image/3.jpg'),
            require('@/assets/image/4.jpg'),
            require('@/assets/image/5.jpg')
          ]
        },
        {
          id: 2,
          name: '鹿野高台',
          rating: 4,
          isFavorite: false,
          address: '955台東縣鹿野鄉永安村高台路42巷145號',
          phone: '08 955 1637',
          openTime: '24小時營業',
          website: 'https://www.youtube.com',
          images: [
            require('@/assets/image/1.jpg'),
            require('@/assets/image/2.jpg'),
            require('@/assets/image/3.jpg'),
            require('@/assets/image/4.jpg'),
            require('@/assets/image/5.jpg')
          ]
        },
        {
          id: 3,
          name: '鹿野高台',
          rating: 4,
          isFavorite: false,
          address: '955台東縣鹿野鄉永安村高台路42巷145號',
          phone: '08 955 1637',
          openTime: '24小時營業',
          website: 'https://www.youtube.com',
          images: [
            require('@/assets/image/1.jpg'),
            require('@/assets/image/2.jpg'),
            require('@/assets/image/3.jpg'),
            require('@/assets/image/4.jpg'),
            require('@/assets/image/5.jpg')
          ]
        },
        {
          id: 4,
          name: '鹿野高台',
          rating: 4,
          isFavorite: false,
          address: '955台東縣鹿野鄉永安村高台路42巷145號',
          phone: '08 955 1637',
          openTime: '24小時營業',
          website: 'https://www.youtube.com',
          images: [
            require('@/assets/image/1.jpg'),
            require('@/assets/image/2.jpg'),
            require('@/assets/image/3.jpg'),
            require('@/assets/image/4.jpg'),
            require('@/assets/image/5.jpg')
          ]
        }
      ]
    }
  }
}
</script>>

<style lang="scss">
#sites-root {
  .wrapper {
    margin-top: 124px;
    > .sites-container {
      margin-right: 720px;
      padding: 20px 36.5px;
      > div:nth-child(1) {
        font-size: 21px;
        line-height: 21px;
        text-align: left;
        padding-bottom: 38px;
      }
      > .sites-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 190px;
        grid-row-gap: 29px;
      }
    }
    > .map {
      width: 720px;
      height: 664px;
      position: fixed;
      top: 124px;
      right: 0px;
      background-color: red;
    }
  }
}
</style>
