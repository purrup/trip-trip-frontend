<template lang="pug">
  div(class="trip-schedule")
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
          v-if="showeditDailySchedulePanel && isOnEditMode"
          style="width: 100%;")
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
          v-spacer
          .deleteButton.mr-2
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
                    .px-5
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TripSchedule',
  props: {
    currentDate: String,
    dates: Array,
    currentDisplay: Date
  },
  data () {
    return {
      showeditDailySchedulePanel: false,
      showEditActivityPanel: false,
      showTimePicker: false,
      firstDatePicker: null,
      newActivity: {
        name: '',
        cost: 0,
        startTime: Date.now(),
        endTime: Date.now()
      }
    }
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode
    }),
    ...mapState('account', {
      account: state => state
    }),
    displayDate () {
      if (!this.trip.startDate) {
        return this.dates[this.currentDate].toLocaleDateString() + ' ' + this.currentDisplay.toLocaleDateString('zh-TW', { weekday: 'short' })
      } else {
        return this.currentDisplay === 'overview' ? 'overview' : this.currentDisplay.toLocaleDateString() + ' ' + this.currentDisplay.toLocaleDateString('zh-TW', { weekday: 'short' })
      }
    },
    note () {
      return this.trip.contents[this.currentDate] ? this.trip.contents[this.currentDate].note : ''
    }
  },
  methods: {
    addNewActivity () {
      let currentDateContent = this.trip.contents[this.currentDate].activities
      currentDateContent.push(this.newActivity)
    },
    deleteDate () {
      // 刪除單一天的行程以及此行程內的活動
      this.dates.splice(this.currentDate, 1)
      this.contents[this.currentDate].activities.splice(this.currentDate, 1)
    },
    deleteActivity (schedule) {
      let currentDateContent = this.trip.contents[this.currentDate].activities
      let scheduleIndex = currentDateContent.indexOf(schedule)
      // 刪除activity
      currentDateContent.splice(scheduleIndex, 1)
    },
    getSite (siteId) {
      this.$emit('getSite', siteId)
    }
  },
  watch: {
    isOnEditMode (newValue) {
      if (newValue === false) {
        this.showeditDailySchedulePanel = false
        this.showEditActivityPanel = false
        this.showTimePicker = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .trip-schedule {
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
</style>
