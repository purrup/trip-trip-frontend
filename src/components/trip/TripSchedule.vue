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
        :key="`${schedule.startTime}-${i}`"
        width=370
        height=47
        color="white"
        elevation="2"
        @click="schedule.id ? getSite(schedule.id) : false; toggleCurrentActivity(schedule)")
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
              @click="displayTimePicker(schedule)"
            )
              v-icon mdi-clock-outline
          .cost.d-flex.flex-nowrap.flex-row
            p.mr-1 $
            input(
              type="number"
              style="width: 50px;"
              :value="schedule.cost"
              id="activityCost"
              @change="updateAvtivity"
            )
          .activity
            input(
              style="width: 169px;"
              :value="schedule.name"
              id="avtivityName"
              @change="updateAvtivity")
          .delete-activity
            v-btn(
              text
              icon
              @click="deleteActivity(schedule)"
            )
              v-icon mdi-trash-can-outline
      v-dialog(
        v-model="showTimePicker"
        width=600
        height=500
      )
        v-card
          .container.pt-10.mb-6
            .timePickersGroup.d-flex.flex-row.flex-nowrap.justify-center.align-center
              span.mx-5 開始時間
              input(
                style="padding: 10px;"
                type="time"
                id="startTime"
                v-model="startTime"
                @change="updateAvtivity"
              )
              .px-5
              span.mx-5 結束時間
              input(
                style="padding: 10px;"
                type="time"
                id="endTime"
                v-model="endTime"
                @change="updateAvtivity"
              )
          v-card-actions
            .flex-grow-1
            .btnGroup.mb-3
              v-btn(
                color="info"
                @click="showTimePicker = false"
                ) 確定
              v-btn.mx-5(
                color="error"
                @click="showTimePicker = false") 取消
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
          @change="updateNote"
        )
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TripSchedule',
  props: {
    currentDate: Number,
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
      },
      currentActivity: {
        name: '',
        cost: 0,
        startTime: this.dates[this.currentDate],
        endTime: this.dates[this.currentDate]
      },
      originCurrentActivity: {}
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
      return this.currentDisplay === 'overview' ? 'overview' : this.currentDisplay.toLocaleDateString() + ' ' + this.currentDisplay.toLocaleDateString('zh-TW', { weekday: 'short' })
    },
    note () {
      return this.trip.contents[this.currentDate].note
    },
    startTime () {
      if (!this.currentActivity) {
        return false
      } else {
        return new Date(this.currentActivity.startTime).toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' })
      }
    },
    endTime () {
      if (!this.currentActivity) {
        return false
      } else {
        return new Date(this.currentActivity.endTime).toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' })
      }
    }
  },
  methods: {
    ...mapMutations('trip', ['DELETE_TRIP_date', 'ADD_TRIP_activity', 'DELETE_TRIP_activity', 'UPDATE_TRIP_note', 'UPDATE_TRIP_activity', 'UPDATE_TRIP_activity_end_time']),
    toggleCurrentActivity (currentActivity) {
      this.currentActivity = currentActivity
    },
    deleteDate () {
      // 刪除單一天的行程以及此行程內的活動
      this.dates.splice(this.currentDate, 1)
      const newCurrentDate = this.currentDate - 1
      this.$emit('toggleContent', this.dates[newCurrentDate])
      this.DELETE_TRIP_date(this.currentDate)
    },
    addNewActivity () {
      // 新增行程中的活動
      const newActivity = this.newActivity
      const currentDate = this.currentDate
      this.ADD_TRIP_activity({ newActivity, currentDate })
    },
    deleteActivity (deletedActivity) {
      const currentDate = this.currentDate
      this.DELETE_TRIP_activity({ deletedActivity, currentDate })
    },
    displayTimePicker (activity) {
      this.currentActivity = activity
      this.originCurrentActivity = activity
      this.showTimePicker = true
    },
    updateAvtivity (e) {
      const currentDate = this.currentDate
      // 設一個originCurrentActivity丟到mutations裡面去找activity? 因時間改動後currentActivity會變
      const activity = this.currentActivity
      // 拿到該日行程日期的string, e.g. '2019-10-10'
      const currentDateString = this.dates[this.currentDate].toLocaleDateString()
      let data = this.currentActivity
      if (e.target.id === 'startTime') {
        // 用e.target.value加入小時和分和秒數至年月日的string後方
        const newTimeString = currentDateString + ' ' + e.target.value + ':' + '00'
        // 轉換為date，存入state
        data.startTime = new Date(newTimeString)
      } else if (e.target.id === 'endTime') {
        const newTimeString = currentDateString + ' ' + e.target.value + ':' + '00'
        data.endTime = new Date(newTimeString)
      } else if (e.target.id === 'avtivityName') {
        data.name = e.target.value
      } else if (e.target.id === 'activityCost') {
        data.cost = e.target.value
      }
      this.UPDATE_TRIP_activity({ data, currentDate, activity })
    },
    updateNote (note) {
      const currentDate = this.currentDate
      this.UPDATE_TRIP_note({ note, currentDate })
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
