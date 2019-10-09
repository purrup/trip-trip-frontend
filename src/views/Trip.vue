<template lang="pug">
  #trip
    main
      transition(name="fade" mode="out-in")
        .edit-buttons.d-flex.flex-nowrap.align-center(
          v-if="!isOnEditMode"
        )
          v-btn(
            v-if="$route.path ===`/trips/${$route.params.id}` && trip.userId._id !== account._id"
            text
            elevation=2
            @click="fork"
          ) 複製行程
          v-btn(
            v-else-if="$route.path ===`/trips/${$route.params.id}` && !isOnEditMode && trip.userId._id === account._id"
            @click="toggleEditMode"
            text
            elevation=2
          ) 編輯行程
      transition(name="fade" mode="out-in")
        .edit-buttons.d-flex.flex-nowrap.align-center(
          v-if="isOnEditMode"
        )
          v-btn(
            text
            elevation=2
            @click="editComplete"
          ) 編輯完成
          //- 選擇旅遊日期
          .calendarButton.ml-8
            v-btn(
              text
              elevation=2
              @click.stop="showCalendar = true"
            ) 行程起始日期
              v-icon.ml-2(left) mdi-calendar
            v-dialog(
              width=300
              v-model="showCalendar"
              )
              v-date-picker(
                v-model="firstDatePicker"
                show-current
                @change="updateStartDate"
                )
          v-btn.ml-8(
            text
            elevation=2
            @click="showEditImage = true"
          ) 上傳照片
            v-icon.ml-2(left) mdi-cloud-upload-outline
          v-dialog(
            v-model="showEditImage"
            width=600
            height=500
            persistent
          )
            v-card
              v-card-title.justify-center 上傳照片至概覽
              v-form(
                ref="form"
                @submit.prevent="previewImages"
              )
                div(class="container")
                  v-file-input(
                    type="file"
                    ref="file"
                    chips
                    multiple
                    v-model="imageFiles"
                    label="上傳一個/多個檔案"
                  )
                v-card-actions
                  .flex-grow-1
                  .btnGroup.mb-3
                    v-btn(
                      color="info"
                      type="submit"
                      ) 確定
                    v-btn.mx-5(
                      color="error"
                      @click="showEditImage = false") 取消
          v-switch.ml-10.mt-7(
            v-model="publish"
            inset
            :label="`${privacySetting}`"
            @change="updatePrivacy")
          v-btn.ml-6(
            text
            icon
            @click="showDeleteConfirmation = true"
          )
            v-icon mdi-trash-can-outline
      v-dialog(
        v-model="showDeleteConfirmation"
        width=550
        height=300
        )
        v-card
          .container.py-11
            .timePickersGroup.d-flex.flex-row.flex-nowrap.justify-center.align-center
              span(style="font-size: 1.4em; color: #616161;") 確定要刪除此行程：{{trip.name}} ？
          v-card-actions
            .flex-grow-1
            .btnGroup.mb-3
              v-btn(
                color="info"
                @click="deleteCurrentTrip(trip._id)"
                ) 確定
              v-btn.mx-5(
                color="error"
                @click="showDeleteConfirmation = false") 取消
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
import siteApis from '@/utils/apis/site'
// import userApis from '@/utils/apis/user.js'
import { mapState, mapActions, mapMutations } from 'vuex'

/* eslint-disable */
export default {
  name: 'trip',
  components: {
    Overview,
    LittleCard,
    TripSchedule
  },
  data () {
    return {
      dates: [],
      currentDisplay: null,
      currentSiteCard: {},
      // currentDate: 0,
      map: null,
      marker: null,
      showCalendar: false,
      firstDatePicker: null,
      publish: false,
      showEditImage: false,
      showDeleteConfirmation: false,
      // formData: new FormData(),
      imageFiles: []
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
    },
    privacySetting () {
      return this.trip.isPrivate ? '公開此行程' : '不公開此行程'
    }
  },
  methods: {
    ...mapActions('trip', ['forkTrip', 'updateTrip', 'deleteTrip']),
    ...mapMutations('trip', ['TOGGLE_isOnEditMode', 'CHANGE_IMAGES_OF_OVERVIEW', 'UPDATE_TRIP_startDate', 'UPDATE_TRIP_privacy', 'ADD_TRIP_date']),
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
    fork () {
      this.forkTrip(this.trip._id)
    },
    toggleEditMode () {
      this.TOGGLE_isOnEditMode()
    },
    toggleContent (date) {
      this.currentDisplay = date
    },
    updateStartDate () {
      const oldCurrentDate = this.currentDate
      this.showCalendar = false
      this.UPDATE_TRIP_startDate(this.firstDatePicker)
      // 選取日期後立即更新頁面日期
      const firstDate = new Date(this.firstDatePicker)
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
    addNewDate () {
    // 新增旅遊日期及單日的行程規劃
      let lastDate = this.dates[this.dates.length - 1]
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.dates.push(nextDate)
      this.ADD_TRIP_date()
    },
    updatePrivacy (value) {
      this.UPDATE_TRIP_privacy(value)
    },
    previewImages () {
      // 即時預覽上傳圖片
      let previewImagesArray = []
      this.imageFiles.forEach(image => {
        previewImagesArray.push(URL.createObjectURL(image))
      })
      this.CHANGE_IMAGES_OF_OVERVIEW(previewImagesArray)
      this.showEditImage = false
    },
    editComplete () {
      const formData = new FormData()
      //將暫存的images放入formData
      this.imageFiles.forEach(image => {
        formData.append('images', image)
      })
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      this.TOGGLE_isOnEditMode()
      this.SET_SUCCESS_MSG('修改完成')
    },
    deleteCurrentTrip (id) {
      this.SET_SUCCESS_MSG(`已刪除您的行程 "${this.trip.name}"`)
      this.deleteTrip(id)
      this.$router.push('/')
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
    isOnEditMode (newValue) {
      if(newValue === false) {
        this.showCalendar = false
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
    grid-template-rows: 70px auto;
    grid-template-areas: 
    ". edit-buttons edit-buttons edit-buttons"
    ". toggle-bar . content";
    .edit-buttons {
      grid-area: edit-buttons;
      height: 70px;
    }
    //edit-buttons transition
    .fade-enter-active, .fade-enter-active {
      transition: all 1s ease;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
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
