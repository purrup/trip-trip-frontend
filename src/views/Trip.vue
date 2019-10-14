<template lang="pug">
  #trip
    main
      edit-buttons-group(class="edit-buttons-group")
      //- 左側切換欄
      #toggle-bar
        v-list
          v-list-item-group(mandatory)
            v-list-item.leftTogglebarBlock(
              @click="isShowOverview = true")
              v-list-item-content
                v-list-item-title.text-center(v-text="'概覽'")
            v-list-item.leftTogglebarBlock(
              v-for="(date, day) in datesOfTrip"
              :key="`toggle-bar-${date}`"
              @click="toggleContent(day)")
              v-list-item-content
                v-list-item-title.text-center(v-text=" day+1 ") // 左側togglebar顯示第i+1天
            //- 編輯模式中新增旅遊日期
            v-list-item.leftTogglebarBlock(
              v-if="isOnEditMode"
              @click="ADD_TRIP_date")
              v-list-item-content
                v-list-item-title.text-center
                  v-icon mdi-plus
      #content
        overview(
          v-if="isShowOverview"
          :trip="trip")
        trip-schedule(
          v-else
          class="trip-schedule"
          :dayOfTrip="dayOfTrip"
          :datesOfTrip="datesOfTrip"
          @toggleContent="toggleContent"
          @showSiteOnMap="showSiteOnMap")
    #map
</template>

<script>
import Overview from '@/components/trip/Overview.vue'
import TripSchedule from '@/components/trip/TripSchedule.vue'
import EditButtonsGroup from '@/components/trip/EditButtonsGroup.vue'
import siteApis from '@/utils/apis/site.js'
import { mapState, mapMutations } from 'vuex'

/* eslint-disable */
export default {
  name: 'trip',
  components: {
    Overview,
    TripSchedule,
    EditButtonsGroup
  },
  data () {
    return {
      isShowOverview: true,
      dayOfTrip: 0,
      map: null,
      marker: null,
      currentSite: []
    }
  },
  mounted () {
    this.initMap()
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode
    }),
    ...mapState('account', {
      account: state => state
    }),
    datesOfTrip () {
      const startDate = this.trip.startDate ? this.trip.startDate : new Date()
      return this.trip.contents.map((_, index) => {
        let newDate = new Date(startDate)
        newDate.setDate(newDate.getDate() + index)
        return newDate
      })
    }
  },
  methods: {
    ...mapMutations('trip', ['ADD_TRIP_date']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.currentSite[0].geometry,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      })
      this.marker = new google.maps.Marker({ map: this.map, position: this.currentSite[0].geometry })

      this.marker.addListener('click', (e) => {
        this.map.setZoom(8)
        this.map.setCenter(this.myTainanHouse)
      })
    },
    showSiteOnMap (pos) {
      this.marker.setPosition(pos)
      this.map.setCenter(pos)
    },
    toggleContent (day) {
      this.isShowOverview = false
      this.dayOfTrip = day
    }
    // async getSitesByKeyword (keyword) {
    //   const site = await siteApis.getSitesByKeyword(keyword)
    //   this.currentSite = site
    // },
  },
  watch: {
    async '$route' (to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
#trip {
  grid-template-columns: 786px 20px 1fr;
  grid-template-areas: "main . map";
  main {
    grid-area: main;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 48px 83px 15px 640px;
    grid-template-rows: 70px auto;
    grid-template-areas:
      ". edit-buttons edit-buttons edit-buttons"
      ". toggle-bar . content";
    .edit-buttons-group {
      grid-area: edit-buttons;
      height: 70px;
    }
    #toggle-bar {
      grid-area: toggle-bar;
      width: 83px;
      justify-self: center;
      .leftTogglebarBlock {
        border: 0.5px solid rgba(102, 102, 102, 0.5);
      }
    }
    #content {
      grid-area: content;
      margin-top: 10px;
    }
  }
  #map {
    grid-area: map;
    margin-top: 10px;
    width: calc(100% - 806px);
    height: 100vh;
    position: fixed !important;
    top: 70px;
    right: 0px;
  }
}
</style>
