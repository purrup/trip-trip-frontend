<template lang="pug">
  #trip
    main
      edit-buttons-group(
        class="edit-buttons-group"
        @updateStartDate="updateStartDate"
        :dates="dates"
        :currentDate="currentDate"
      )
      //- 左側切換欄
      #toggle-bar
        v-list
          v-list-item-group(mandatory)
            v-list-item.leftTogglebarBlock(
              @click="toggleContent('overview')")
              v-list-item-content
                v-list-item-title.text-center(v-text="'概覽'")
            v-list-item.leftTogglebarBlock(
              v-for="(date, i) in dates"
              :key="`toggle-bar-${date}`"
              @click="toggleContent(date)")
              v-list-item-content
                v-list-item-title.text-center(v-text=" i+1 ") // 左側togglebar顯示第i+1天
            //- 編輯模式中新增旅遊日期
            v-list-item.leftTogglebarBlock(
              v-if="isOnEditMode"
              @click="addNewDate()")
              v-list-item-content
                v-list-item-title.text-center
                  v-icon mdi-plus
      #content
        overview(
          v-if="currentDisplay === 'overview'"
          :trip="trip")
        #trip-schedule(
          v-else-if="currentDisplay !== 'overview'"
          )
          trip-schedule(
            class="trip-schedule"
            :currentDate="currentDate"
            :dates="dates"
            :currentDisplay="currentDisplay"
            @getSite="getSite"
            @toggleContent="toggleContent"
          )
          .site
            .title.mb-2
              v-sheet.d-flex.justify-start.align-center(
                width=250
                height=47
                color="grey lighten-2"
                elevation="2")
                span.text-center.subtitle-1(style=" width: 100%; cursor: default; ") 景點資訊
            .little-card(v-if="currentSiteCard")
              little-card(
                :item="currentSiteCard"
                :type="'site'")
    #map
</template>

<script>
import Overview from '@/components/trip/Overview.vue'
import TripSchedule from '@/components/trip/TripSchedule.vue'
import LittleCard from '@/components/LittleCard.vue'
import EditButtonsGroup from '@/components/trip/EditButtonsGroup.vue'
import siteApis from '@/utils/apis/site'
import { mapState, mapMutations } from 'vuex'

/* eslint-disable */
export default {
  name: 'trip',
  components: {
    Overview,
    LittleCard,
    TripSchedule,
    EditButtonsGroup
  },
  data () {
    return {
      dates: [],
      currentDisplay: null,
      currentSiteCard: {},
      map: null,
      marker: null
      // showCalendar: false,
      // firstDatePicker: null,
      // publish: false,
      // showEditImage: false,
      // showDeleteConfirmation: false,
      // imageFiles: [],
      // showPrivacySetting: false
    }
  },
  beforeMount () {
    // content預設資料
    this.currentDisplay = 'overview'
    // // 計算全部旅行日期
    const startDate = this.trip.startDate ? this.trip.startDate : Date.now()
    const firstDate = new Date(startDate)
    for (let i = 0; i < this.trip.days; i++) {
      let newDate = new Date(firstDate)
      newDate.setDate(newDate.getDate() + i)
      this.dates.push(newDate)
    }
  },
  mounted () {
    this.initMap()
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode,
      startDate: state => state.startDate ? state.startDate : Date.now()
    }),
    ...mapState('account', {
      account: state => state
    }),
    currentDate () {
      return this.dates.indexOf(this.currentDisplay)
    }
  },
  methods: {
    ...mapMutations('trip', ['ADD_TRIP_date']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 23.039808, lng: 120.211868 },
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      })
      this.marker = new google.maps.Marker({ map: this.map, position: { lat: 23.039808, lng: 120.211868 } })

      this.marker.addListener('click', (e) => {
        this.map.setZoom(8)
        this.map.setCenter(this.myTainanHouse)
      })
    },
    showSiteOnMap (pos) {
      this.marker.setPosition(pos)
      this.map.setCenter(pos)
    },
    toggleContent (date) {
      this.currentDisplay = date
    },
    addNewDate () {
      // 新增旅遊日期及單日的行程規劃
      let lastDate = this.dates[this.dates.length - 1]
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.dates.push(nextDate)
      this.ADD_TRIP_date()
    },
    updateStartDate (newFirstDate) {
      // this.showCalendar = false
      // this.UPDATE_TRIP_startDate(this.firstDatePicker)
      // 選取日期後立即更新頁面日期
      const oldCurrentDate = this.currentDate
      console.log('firstDate', newFirstDate)
      const firstDate = new Date(newFirstDate)
      let newDatesArray = []
      for (let i = 0; i < this.trip.days; i++) {
        let newDate = new Date(firstDate)
        newDate.setDate(newDate.getDate() + i)
        newDatesArray.push(newDate)
      }
      this.dates = newDatesArray
      // 更改日期後，仍可停留在原本的天數的activity
      this.currentDisplay = this.dates[oldCurrentDate]
    },
    async getSite (siteId) {
      try {
        this.currentSiteCard = await siteApis.getSite(siteId)
      } catch (error) {
        console.log(error)
      }
    }
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
      #trip-schedule {
        display: grid;
        grid-template-columns: 370px 20px auto;
        grid-template-areas: "trip-schedule . site";
        .trip-schedule {
          grid-area: trip-schedule;
        }
        .site {
          grid-area: site;
        }
      }
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
