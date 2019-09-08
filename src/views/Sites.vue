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
            v-for="(site, key) in sites"
            :key="`site-${key}`"
            :site="site.result"
            @mouseover.native="showSiteOnMap(site.result.geometry.location)"
          )
      div(id="map")
</template>

<script>
import FeatureBar from '@/components/FeatureBar.vue'
import SiteCard from '@/components/SiteCard.vue'
import draggable from 'vuedraggable'
import place from '@/assets/place.json'

/* eslint-disable */
export default {
  components: {
    FeatureBar,
    SiteCard,
    draggable
  },
  data () {
    return {
      placeData: place.data,
      placeIds: ['ChIJraeA2rarQjQRPBBjyR3RxKw', 'ChIJ1ZrmCnZMXTQRV2jCWjAX0eQ', 'ChIJ7-fCX4SCaDQRMaqw4IX92d0'],
      sites: [],
      map: null,
      myTainanHouse: { lat: 23.039808, lng: 120.211868 },
      marker: null
    }
  },
  created () {
    this.sites = this.placeData.filter(place => (place.status === 'OK' && this.placeIds.includes(place.result.place_id)))
  },
  mounted () {
    // the initialize function must be written at mounted hook
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.sites[0].result.geometry.location,
        zoom: 13
      })
      this.marker = new google.maps.Marker({ map: this.map, position: this.sites[0].result.geometry.location})


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
    }
  }
}
</script>>

<style lang="scss" scoped>
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
