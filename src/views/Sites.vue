<template lang="pug">
  div(id="sites-root")
    feature-bar(:storage-zone="true")
    div(class="wrapper")
      div(class="sites-container")
        div 台北
        draggable(
          tag="div"
          class="sites-wrapper"
          :group="{ name: 'sites', pull: 'clone', put: false }"
          :list="sites"
          @start="start"
        )
          site-card(
            v-for="site in sites"
            :key="`site-${site.id}`"
            :site="site"
            @mouseover.native="showSiteOnMap(site.position)"
          )
      div(id="map")
</template>

<script>
import FeatureBar from '@/components/FeatureBar.vue'
import SiteCard from '@/components/SiteCard.vue'
import draggable from 'vuedraggable'
/* eslint-disable */
export default {
  components: {
    FeatureBar,
    SiteCard,
    draggable
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
          ],
          position: {
            lat: 23.21321,
            lng: 120.42918
          }
        },
        {
          id: 2,
          name: '安平古堡',
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
          ],
          position: {
            lat: 22.21321,
            lng: 120.918
          }
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
          ],
          position: {
            lat: 22.71321,
            lng: 120.42918
          }
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
          ],
          position: {
            lat: 23.21321,
            lng: 120.42918
          }
        }
      ],
      map: null,
      myTainanHouse: { lat: 23.039808, lng: 120.211868 },
      marker: null
    }
  },
  mounted () {
    // the initialize function must be written at mounted hook
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.myTainanHouse,
        zoom: 12
      })
      this.marker = new google.maps.Marker({ map: this.map })


      this.marker.addListener('click', (e) => {
        console.log(e)
        this.map.setZoom(8)
        this.map.setCenter(this.myTainanHouse)
      })
    },
    showSiteOnMap (pos) {
      this.marker.setPosition(pos)
      this.map.setCenter(pos)
      /*
      const upper = new google.maps.Marker({
        position: {
          lat: location.ha.g,
          lng: location.da.g
        },
        map: this.map
      })
      const lowpper = new google.maps.Marker({
        position: {
          lat: location.ha.h,
          lng: location.da.h
        },
        map: this.map
      })
      */
    },
    start (e) {
      console.log('start', e)
    },
    clone (e) {
      console.log('clone', e)
    },
    move () {
      console.log('move')
      return 1
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
    > #map {
      width: 720px;
      height: 664px;
      position: fixed !important;
      top: 124px;
      right: 0px;
    }
  }
}
.ghost {
  background-color: black;
  width: 241px;
  > .content-wrapper {
    display: none !important;
  }
}
</style>
