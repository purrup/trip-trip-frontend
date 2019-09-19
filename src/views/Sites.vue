<template lang="pug">
  div(id="sites-root")
    div(class="sites-container")
      div {{this.$route.query['cities[]']}}
      draggable(
        tag="div"
        class="sites-wrapper"
        :group="{ name: 'sites', pull: 'clone', put: false }"
        :list="sites"
        @start="start"
      )
        site-card(
          v-for="site in sites"
          :key="`site-${site.name}`"
          :site="site"
          @mouseover.native="showSiteOnMap(site.geometry)"
        )
    div(id="map")
    div(
      class="storage-zone"
      :class="{ 'fade-in': isShowStorageZone}")
      button(@click="isShowStorageZone = !isShowStorageZone")
        v-icon(:class="{ 'arrow-rotate': isShowStorageZone}") keyboard_arrow_left
      div(:style="storageZoneHeight")
        div(v-if="!isOnDraggable" class="no-draggable")
          p(v-if="trips.length === 0") 你還沒有屬於自己的旅程，趕快新增吧！
          v-btn(
            outlined
            color="secondary"
            @click="isOnDraggable = true") Create
        div(v-else class="on-draggable")
          div
            v-icon(@click="isOnDraggable = false") reply
            span {{storageTrip.name}}
            v-spacer
            v-icon save
            v-icon edit
          div
            div(v-for="(activities, index) in storageTrip.activities" class="day-activities")
              div
                v-icon today
                span Day {{index + 1}}
                v-spacer
                v-icon arrow_drop_down
              draggable(
                tag="div"
                class="dragAreas"
                group="sites"
                :list="activities")
                div(v-for="(site, index) in activities"
                  :key="site.name + index"
                  class="storage-site")
                  v-icon drag_handle
                  span {{ site.name }}
                  v-spacer
                  v-icon(@click="activities.splice(index, 1)") close
            v-btn(
              outlined
              color="secondary"
              @click="storageTrip.activities.push([])")
              v-icon add
</template>

<script>
import SiteCard from '@/components/SiteCard.vue'
import draggable from 'vuedraggable'

import siteApis from '@/utils/apis/site.js'

/* eslint-disable */
export default {
  components: {
    SiteCard,
    draggable
  },
  data () {
    return {
      isShowStorageZone: false,
      sites: [],
      trips: [],
      isOnDraggable: false,
      storageTrip: {
        name: 'XXX的快樂之旅',
        activities: [[]]
      },
      map: null,
      marker: null,
      myTainanHouse: { lat: 23.039808, lng: 120.211868 }
    }
  },
  async mounted () {
    // the initialize function must be written at mounted hook
    await this.search()
    this.initMap()
  },
  computed: {
    storageZoneHeight () {
      return {
        height: window.innerHeight - 70 + 'px'
      }
    }
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.sites[0].geometry,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      })
      this.marker = new google.maps.Marker({ map: this.map, position: this.sites[0].geometry })

      this.marker.addListener('click', (e) => {
        console.log(e)
        this.map.setZoom(8)
        this.map.setCenter(this.myTainanHouse)
      })
    },
    showSiteOnMap (pos) {
      this.marker.setPosition(pos)
      this.map.setCenter(pos)
    },
    start (e) {
      console.log('start', e)
    },
    async search () {
      if (this.$route.query.hasOwnProperty('keyword')) {
        await this.getSitesByKeyword()
      } else {
        await this.getSitesByCountryAndCities()
      }
    },
    async getSitesByCountryAndCities () {
      try {
        const city = this.$route.query['cities[]']
        this.sites = await siteApis.getSitesByCountryAndCities(city)
      } catch (error) {
        console.log(error)
      }
    },
    async getSitesByKeyword () {
      try {
        const keyword = this.$route.query.keyword
        this.sites = await siteApis.getSitesByKeyword(keyword)
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
#sites-root {
  margin-top: 70px;
  .sites-container {
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
  #map {
    width: 720px;
    height: 718px;
    position: fixed !important;
    top: 70px;
    right: 0px;
  }
}
.storage-zone {
  width: 360px;
  position: fixed;
  top: 70px;
  right: -330px;
  opacity: 1;
  transition: all 1s;
  display: flex;
  > button {
    width: 30px;
    height: 30px;
    outline: none;
    background-color: orange;
  }
  > div {
    width: 330px;
    background-color: white;
    .no-draggable {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .on-draggable {
      height: 100%;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        border: 1px solid black;
        height: 40px;
        padding: 0 10px;
        span {
          font-size: 24px;
        }
        i:nth-child(1) {
          padding-right: 10px;
        }
        i:last-child {
          padding-left: 10px;
        }
      }
      > div:nth-child(2) {
        display: grid;
        width: 100%;
        justify-items: center;
        > .day-activities {
          width: 100%;
          margin-bottom: 10px;
          > div:nth-child(1) {
            display: flex;
            align-items: center;
            background-color: lightgray;
            height: 30px;
            padding: 0 10px;
            i:nth-child(1) {
              padding-right: 10px;
            }
            i:last-child {
              padding-left: 10px;
            }
          }
          > .dragAreas {
            width: 100%;
            .storage-site {
              display: flex;
              padding: 0 10px;
              i:nth-child(1) {
                padding-right: 10px;
              }
              i:last-child {
                padding-left: 10px;
              }
            }
            > .site-card-root {
              width: 241px !important;
              .site-info-wrapper {
                display: none !important;
              }
            }
          }
        }
        > button {
          width: 90%;
          border-style: dashed;
        }
      }
    }
  }
}

.fade-in {
  transform: translateX(-330px);
}
.arrow-rotate {
  transform: rotateZ(180deg);
}
</style>
