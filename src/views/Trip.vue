<template lang="pug">
  #trip
    main
      #toggle-bar
        v-list
          v-list-item-group(mandatory)
            v-list-item(
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="toggleContent('overview')")
              v-list-item-content
                v-list-item-title.text-center(v-text="'概覽'")
            v-list-item(
              v-for="(date, i) in dates"
              :key="i"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5); "
              @click="toggleContent(date)")
              v-list-item-content
                v-list-item-title.text-center(v-text="`${ date.getMonth() + 1 + '/' + date.getDate() }`") // 顯示日期
            v-list-item(
              v-if="$route.path.includes('edit')"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="addNewDate()") // 編輯模式中新增旅遊日期
              v-list-item-content
                v-list-item-title.text-center(v-text="'+'")
      #content
        overview(
          v-if="currentDisplay === 'overview'"
          :trip="trip")
        #trip-schedule(
          v-else-if="currentDisplay !== 'overview'")
          .schedules
            .date.mb-2
              v-sheet.d-flex.justify-start.align-center(
                width=370
                height=47
                color="grey lighten-2"
                elevation="2")
                v-icon(
                  @click="control"
                  style=" width: 40px; padding: 10px 0px;") mdi-dots-vertical
                //- 顯示日期
                span.text-center(style=" width: calc(100% - 40px); cursor: default; margin-right: 40px;") {{ changeDateType }}  ({{ weekdays }})
            .schedule-list
              v-sheet.schedule-card.align-center.mb-3(
                v-for="(schedule, i) in schedules[this.dates.indexOf(this.currentDisplay)]"
                :key="i"
                width=370
                height=47
                color="white"
                elevation="2"
                @click="getSite(schedule.id)")
                .time {{ `${ new Date(schedule.startTime).getHours() + ':' + (new Date(schedule.startTime).getMinutes() === 0 ? '00' : new Date(schedule.startTime).getMinutes()) + ' ~ ' + new Date(schedule.endTime).getHours() + ':' + (new Date(schedule.endTime).getMinutes() === 0 ? '00' : new Date(schedule.endTime).getMinutes()) }` }}
                .activity {{ schedule.name }}
                .cost {{ '$' + schedule.cost }}
              .note.mt-4
                v-sheet.d-flex.flex-wrap.align-start(
                  width=370
                  height=268
                  color="grey lighten-4"
                  elevation="2")
                  .col-auto
                    span(style=" width: 100%; ") 備註：
                    p {{ note }}
          .site
            .title.mb-2
              v-sheet.d-flex.justify-start.align-center(
                width=250
                height=47
                color="grey lighten-2"
                elevation="2")
                span.text-center(style=" width: 100%; cursor: default; ") 景點資訊
            .little-card
              little-card(
                v-if="currentSiteCard"
                :item="currentSiteCard"
                :type="'site'")
              p(v-else-if="currentSiteCard.length === 0") none
    #map
</template>

<script>
import Overview from '@/components/trip/Overview.vue'
import LittleCard from '@/components/LittleCard.vue'
import siteApis from '@/utils/apis/site'
// import userApis from '@/utils/apis/user.js'
import { mapState } from 'vuex'

/* eslint-disable */
export default {
  name: 'trip',
  components: {
    Overview,
    LittleCard
  },
  data () {
    return {
      dates: [],
      currentDisplay: null,
      currentSiteCard:[],
      schedules:[],
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
    // 取得所有行程表內容
    this.trip.contents.forEach(item => {
      this.schedules.push(item.activities)
    });
    // console.log(this.currentSiteCard)
    // console.log('schedules:', this.schedules)
    // console.log('dates:', typeof this.dates[0].getMinutes())
  },
  mounted () {
    this.initMap()
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip
    }),
    ...mapState('account', {
      account: state => state
    }),
    changeDateType() {
      return this.currentDisplay === 'overview' ? 'overview' : this.currentDisplay.getMonth() + 1 + '/' + this.currentDisplay.getDate()
    },
    weekdays() {
      if(this.currentDisplay !== 'overview') {
        switch(this.currentDisplay.getDay()) {
          case 0:
            return '日';
            break;
          case 1:
            return '一';
            break;
          case 2:
            return '二';
            break;
          case 3:
            return '三';
            break;
          case 4:
            return '四';
            break;
          case 5:
            return '五';
            break;
          case 6:
            return '六';
            break;
        }
      }
    },
    note() {
      return this.trip.contents[this.dates.indexOf(this.currentDisplay)].note
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
    addNewDate () {
    // 新增旅遊日期
      let lastDate = this.dates[this.dates.length - 1]
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.dates.push(nextDate)
    },
    control () {
      console.log('control')
    },
    async getSite (siteId) {
      try {
        this.currentSiteCard = await siteApis.getSite(siteId)
      } catch (error) {
        console.log(error)
      }
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
    grid-template-areas: ". toggle-bar . content";
    #toggle-bar {
      grid-area: toggle-bar;
      width: 83px;
      justify-self: center;
    }
    #content {
      grid-area: content;
      margin-top: 10px;
      #trip-schedule {
      display: grid;
      grid-template-columns: 370px 20px auto;
      grid-template-areas: "schedules . site";
      .schedules {
        grid-area: schedules;
        grid-template-rows: 47px 10px auto;
        grid-template-areas: "date . schedule-list";
        .date {
          grid-area: date;
        }
        .schedule-list {
          grid-area: schedule-list;
          grid-auto-rows: 50px;
          grid-row-gap: 14px;
          .schedule-card {
            display: grid;
            grid-template-columns: 8px 105px 4px auto 60px 8px;
            grid-template-areas: ". time . activity cost .";
            .time {
              grid-area: time;
            }
            .activity {
              grid-area: activity;
            }
            .cost {
              grid-area: cost;              
            }
          }
        }
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
