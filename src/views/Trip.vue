<template lang="pug">
  #trip
    main
      transition(name="fade" mode="out-in")
        .edit-buttons.d-flex.flex-nowrap.align-center(
          v-if="!isOnEditMode"
        )
          v-btn(
            v-if="$route.path ===`/trips/${$route.params.id}` && trip.userId !== account._id"
            text
            elevation=2
            @click="fork"
          ) 複製行程
          v-btn(
            v-else-if="$route.path ===`/trips/${$route.params.id}` && !isOnEditMode && trip.userId === account._id"
            @click="toggleEditMode"
            text
            elevation=2
          ) 編輯模式
      transition(name="fade" mode="out-in")
        .edit-buttons.d-flex.flex-nowrap.align-center(
          v-if="isOnEditMode"
        )
          v-btn(
            text
            elevation=2
            @click="editComplete"
          ) 編輯完成
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
              div(class="container")
                v-file-input(
                  type="file"
                  ref="file"
                  chips
                  multiple
                  label="上傳一個/多個檔案"
                  @change="uploadTripImages"
                )
              v-card-actions
                .flex-grow-1
                .btnGroup.mb-3
                  v-btn(
                    color="info"
                    @click="showEditImage = false"
                    ) 確定
                  v-btn.mx-5(
                    color="error"
                    @click="showEditImage = false") 取消
          v-switch.ml-10.mt-7(
            v-model="publish"
            inset
            :label="`${privacySetting}`")
          v-btn.ml-6(
            text
            icon
          )
            v-icon mdi-trash-can-outline
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
              :key="i"
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
          v-else-if="currentDisplay !== 'overview'")
          .schedules
            .date.mb-2
              v-sheet.d-flex.justify-start.align-center(
                width=370
                height=47
                color="grey lighten-2"
                elevation="2")
                v-icon(
                  v-if="isOnEditMode && !showeditDailySchedulePanel"
                  @click="showeditDailySchedulePanel = !showeditDailySchedulePanel"
                  style=" width: 40px; padding: 10px 0px;") mdi-dots-vertical
                //- 顯示日期
                span.text-center(
                  v-if="!showeditDailySchedulePanel"
                  style=" width: calc(100% - 40px); cursor: default; margin-right: 40px;") {{ displayDate }}
                .dailySchedulePanel.d-flex.justify-start.align-center(
                  v-if="showeditDailySchedulePanel && isOnEditMode")
                  .backButton.ml-3
                    v-icon(
                      large
                      @click="showeditDailySchedulePanel = !showeditDailySchedulePanel") keyboard_arrow_left
                  //- 新增activity
                  .addActivityButton.ml-5
                    v-btn(
                      text
                      icon
                      @click="addNewActivity"
                    )
                      v-icon mdi-plus
                  //- 選擇旅遊日期
                  .calendarButton.ml-5
                    v-btn(
                      text
                      icon
                      @click.stop="showCalendar = true"
                    )
                      v-icon mdi-calendar
                    v-dialog(
                      width=300
                      v-model="showCalendar"
                      )
                      v-date-picker(
                        v-model="firstDatePicker"
                        show-current
                        @change="showCalendar = false"
                        )
                  .deleteButton.ml-7
                    v-btn(
                      text
                      icon
                      @click="deleteDate"
                    )
                      v-icon mdi-trash-can-outline
            .schedule-list
              v-sheet.mb-3(
                v-for="(schedule, i) in trip.contents[currentDate].activities"
                :key="i"
                width=370
                height=47
                color="white"
                elevation="2"
                @click="schedule.id ? getSite(schedule.id) : false")
                .schedule-card(v-if="!showEditActivityPanel")
                  //- 切換每日行程內容的編輯模式
                  v-icon.dots-vertical(
                    v-if="isOnEditMode && !showEditActivityPanel"
                    @click="showEditActivityPanel = true"
                    style=" width: 40px; padding: 10px 0px;") mdi-dots-vertical
                  //- 行程時間
                  .time(v-if="!showEditActivityPanel") {{ `${ new Date(schedule.startTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'}) + ' ~ ' + new Date(schedule.endTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'})}`}}
                  //- 行程內容
                  .activity(v-if="!showEditActivityPanel") {{ schedule.name }}
                  //- 花費
                  .cost(v-if="!showEditActivityPanel") {{ '$' + schedule.cost }}
                .schedule-card-edit(v-else-if="showEditActivityPanel")
                  v-icon.back(
                    v-if="showEditActivityPanel"
                    @click="showEditActivityPanel = false"
                    large) keyboard_arrow_left
                  .time
                    v-btn(
                      icon
                      @click="showTimePicker =true"
                    )
                      v-icon mdi-clock-outline
                    v-dialog(
                      v-model="showTimePicker"
                      width=600
                      height=500
                      persistent
                    )
                      v-card
                        //- v-card-title
                        .container.pt-10.mb-6
                          .timePickersGroup.d-flex.flex-row.flex-nowrap.justify-center.align-center
                            span.mx-5 開始時間
                            input(
                              style="padding: 10px;"
                              type="time"
                              name="start-time"
                              label="開始時間"
                              :value="`${ new Date(schedule.startTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'}) }`"
                            )
                            .px-5g887
                            span.mx-5 結束時間
                            input(
                              style="padding: 10px;"
                              type="time"
                              name="end-time"
                              label="結束時間"
                              :value="`${ new Date(schedule.endTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'}) }`"
                            )
                        v-card-actions
                          .flex-grow-1
                          .btnGroup.mb-3
                            v-btn(
                              color="info"
                              ) 確定
                            v-btn.mx-5(
                              color="error"
                              @click="showTimePicker = false") 取消
                  .cost.d-flex.flex-nowrap.flex-row
                    p.mr-1 $
                    input(
                      style="width: 50px;"
                      :value="`${schedule.cost}`"
                    )
                  .activity
                    input(
                      style="width: 169px;"
                      :value="schedule.name")
                  .delete-activity
                    v-btn(
                      text
                      icon
                      @click="deleteActivity(schedule)"
                    )
                      v-icon mdi-trash-can-outline
              //- 備註
              .note.mt-8
                v-sheet.d-flex.flex-wrap.align-start(
                  v-if="!showeditDailySchedulePanel"
                  width=370
                  height=auto
                  color="grey lighten-4"
                  elevation="2")
                  .col-auto
                    span(style=" width: 100%; ") 備註：
                    p.my-4 {{ note }}
                v-textarea(
                  v-else-if="showeditDailySchedulePanel"
                  auto-grow
                  rows=1
                  :value="note"
                  label="備註:"
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
import LittleCard from '@/components/LittleCard.vue'
import siteApis from '@/utils/apis/site'
// import userApis from '@/utils/apis/user.js'
import { mapState, mapActions, mapMutations } from 'vuex'

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
      currentSiteCard: {},
      schedules: [],
      map: null,
      marker: null,
      showCalendar: false,
      showeditDailySchedulePanel: false,
      showEditActivityPanel: false,
      showTimePicker: false,
      firstDatePicker: null,
      newActivity: {
        name: '',
        cost: 0,
        startTime: Date.now(),
        endTime: Date.now()
      },
      publish: false,
      showEditImage: false,
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
      isOnEditMode: state => state.isOnEditMode
    }),
    ...mapState('account', {
      account: state => state
    }),
    displayDate() {
      if (!this.trip.startDate) {
        return this.dates[this.dates.indexOf(this.currentDisplay)].toLocaleDateString() + ' ' + this.currentDisplay.toLocaleDateString('zh-TW', {weekday: 'short'})
      } else {
        return this.currentDisplay === 'overview' ? 'overview' : this.currentDisplay.toLocaleDateString() + ' ' + this.currentDisplay.toLocaleDateString('zh-TW', {weekday: 'short'})
      }
    },
    note() {
      return this.trip.contents[this.dates.indexOf(this.currentDisplay)] ? this.trip.contents[this.dates.indexOf(this.currentDisplay)].note : ''
    },
    currentDate () {
      return this.dates.indexOf(this.currentDisplay)
    },
    privacySetting () {
      return this.publish ? '公開此行程' : '不公開此行程'
    }
  },
  methods: {
    ...mapActions('trip', ['forkTrip', 'updateTrip']),
    ...mapMutations('trip', ['TOGGLE_isOnEditMode', 'CHANGE_IMAGES_OF_OVERVIEW']),
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
    toggleContent (content) {
      this.currentDisplay = content
    },
    addNewDate () {
    // 新增旅遊日期及單日的行程規劃
      let lastDate = this.dates[this.dates.length - 1]
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.dates.push(nextDate)
      if(!this.trip.startDate) {
        this.trip.contents[this.currentDate].activities.push([])
      }
    },
    deleteDate () {
      // 刪除單一天的行程以及此行程內的活動
      this.dates.splice(this.currentDate, 1)
      this.contents[this.currentDate].activities.splice(this.currentDate, 1)
    },
    addNewActivity () {
      let currentDateContent = this.trip.contents[this.currentDate].activities
      let now = new Date(Date.now())
      currentDateContent.push(this.newActivity)
    },
    deleteActivity (schedule) {
      let currentDateContent = this.trip.contents[this.currentDate].activities
      let scheduleIndex = currentDateContent.indexOf(schedule)
      // 刪除activity
      currentDateContent.splice(scheduleIndex, 1)
    },
    async getSite (siteId) {
      try {
        this.currentSiteCard = await siteApis.getSite(siteId)
      } catch (error) {
        console.log(error)
      }
    },
    editComplete () {
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      this.TOGGLE_isOnEditMode()
    },
    uploadTripImages (files) {
      const formData = new FormData()
      let previewImages = []
      files.forEach(image => {
        formData.append('images', image)
        previewImages.push(URL.createObjectURL(image))
      })
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      // 即時預覽上傳圖片
      // 放在updateTrip之後以免傳blob出去
      this.CHANGE_IMAGES_OF_OVERVIEW(previewImages)
    }
  },
  watch: {
    isOnEditMode (newValue) {
      if(newValue === false) {
        this.showCalendar = false
        this.showeditDailySchedulePanel = false
        this.showEditActivityPanel = false
        this.showTimePicker = false
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
      transition: all 1.2s ease;
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
      grid-template-areas: "schedules . site";
      .schedules {
        grid-area: schedules;
        grid-template-rows: 47px 10px auto;
        grid-template-areas: "date . schedule-list";
        .date {
          grid-area: date;
          .dailySchedulePanel {
            * {
              cursor: pointer;
            }
          }
        }
        .schedule-list {
          grid-area: schedule-list;
          grid-auto-rows: 50px;
          grid-row-gap: 14px;
          .schedule-card {
            height: 100%;
            display: grid;
            align-items: center;
            grid-template-columns: 30px 105px 4px auto 60px 8px;
            grid-template-areas: "dot time . activity cost .";
            .dots-vertical {
              grid-area: dot;
            }
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
          .schedule-card-edit {
            height: 100%;
            display: grid;
            align-items: center;
            grid-template-columns: 30px 30px 60px auto 30px 10px;
            grid-template-areas: "back time cost name delete .";
            column-gap: 10px;
            .back {
              grid-area: back;
            }
            .time {
              grid-area: time;
            }
            .cost {
              grid-area: cost;
            }
            .delete-activity {
              grid-area: delete;
            }
            .activity {
              grid-area: name;
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
