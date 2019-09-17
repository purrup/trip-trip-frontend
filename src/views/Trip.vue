<template lang="pug">
  #trip
    main
      #toggle-bar
        v-list
          v-list-item-group(
            mandatory
            )
            v-list-item(
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="toggleContent('overview')"
            )
              v-list-item-content
                  v-list-item-title.text-center(v-text="'概覽'")
            v-list-item(
              v-for="(date, i) in dates"
              :key="i"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5); "
              @click="toggleContent(date)"
            )
              v-list-item-content
                v-list-item-title.text-center(v-text="`${ date.getMonth() + 1 + '/' + date.getDate() }`")
            v-list-item(
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="addNewDate()"
            )
              v-list-item-content
                  v-list-item-title.text-center(v-text="'+'")
      #content
        overview(
          v-if="currentDisplay === 'overview'"
          :trip="trip")
        #trip-schedule(
          v-else-if="currentDisplay !== 'overview'")
          v-sheet.schedule.d-flex.justify-start.align-center(
            width=370
            height=47
            color="grey lighten-2"
          )
            v-icon(
              @click="control"
              style=" width: 40px; padding: 10px 0px;") mdi-dots-vertical
            span.text-center(style=" width: calc(100% - 40px); cursor: default; ") {{ changeDateType }}
          v-sheet.site.d-flex.justify-start.align-center(
            width=250
            height=47
            color="grey lighten-2"
          )
            span.text-center(style=" width: 100%; cursor: default; ") 景點資訊
    #map
</template>

<script>
import Overview from '@/components/Overview.vue'
import { mapState } from 'vuex'

/* eslint-disable */
export default {
  name: 'trip',
  components: {
    Overview
  },
  data () {
    return {
      dates: [
      ],
      currentDisplay: null,
      map: null,
      marker: null
    }
  },
  beforeMount () {
    // content預設資料
    this.currentDisplay = 'overview'
    // // 計算全部旅行日期
    const firstDate = new Date(this.trip.startDate)
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
      trip: state => state.trip
    }),
    changeDateType() {
      return this.currentDisplay === 'overview' ? 'overview' : this.currentDisplay.getMonth() + 1 + '/' + this.currentDisplay.getDate()
    },
    date() {
      return date
    }
  },
  methods: {
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
    toggleContent (content) {
      this.currentDisplay = content
    },
    addNewDate() {
    // 新增旅遊日期
      let lastDate = this.dates[this.dates.length - 1]
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.dates.push(nextDate)
    },
    control () {
      console.log('control')
    }
  }
}
</script>

<style lang="scss" scoped>
#trip {
  margin-top: 70px;
  main {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 686px 628px;
    #toggle-bar {
      width: 75px;
      justify-self: center;
    }
    #content {
      margin-top: 10px;
    }
    #trip-schedule {
      display: grid;
      grid-template-columns: 370px 10px auto;
      grid-template-areas: "schedule . site";
      .schedule {
        grid-area: schedule;
      }
      .site {
        grid-area: site;
      }
    }
  }
  #map {
    width: 628px;
    height: 718px;
    position: fixed !important;
    top: 70px;
    right: 0px;
  }
}
</style>
