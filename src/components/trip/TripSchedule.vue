<template lang="pug">
  div(class="trip-schedule")
    div
      v-sheet.mb-3.d-flex.justify-start.align-center(width=370 height=47 color="grey lighten-2" elevation="2")
        v-icon(
          v-if="isOnEditMode && !showEditDailySchedulePanel"
          @click="showEditDailySchedulePanel = !showEditDailySchedulePanel"
          style=" width: 40px; padding: 10px 0px;") mdi-dots-vertical
        //- 顯示日期
        span.text-center(v-if="!showEditDailySchedulePanel" style="width: calc(100% - 40px); margin-right: 40px") {{ displayDate }}
        template(v-if="showEditDailySchedulePanel && isOnEditMode" style="width: 100%;")
          v-icon(@click="showEditDailySchedulePanel = !showEditDailySchedulePanel" large) keyboard_arrow_left
          v-spacer
          v-icon.mr-4(@click="deleteDate") mdi-trash-can-outline
      .schedule-list
        v-sheet.mb-3(width=370 height=47 color="white" elevation="2"
          v-for="(schedule, i) in trip.contents[dayOfTrip].activities"
          :key="`${schedule.startTime}-${i}`"
          @click="toggleCurrentActivity(schedule)")
          .schedule-card(v-if="!showEditActivityPanel")
            //- 切換每日行程內容的編輯模式
            v-icon.dots-vertical(
              v-if="isOnEditMode && !showEditActivityPanel"
              @click="showEditActivityPanel = true"
              style="width: 40px;") mdi-dots-vertical
            //- 行程時間
            .time {{ `${ new Date(schedule.startTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'}) + ' ~ ' + new Date(schedule.endTime).toLocaleTimeString('zh-TW', {hour12: false, hour: '2-digit', minute:'2-digit'})}`}}
            //- 行程內容
            .activity {{ schedule.name }}
            //- 花費
            .cost {{ '$' + schedule.cost }}
          .schedule-card-edit(v-else-if="showEditActivityPanel")
            v-icon.back(large
              v-if="showEditActivityPanel"
              @click="showEditActivityPanel = false") keyboard_arrow_left
            v-icon.time(@click="displayTimePicker(schedule)") mdi-clock-outline
            .cost.d-flex.flex-nowrap.flex-row
              span.mr-1 $
              input(
                id="activityCost"
                type="number"
                style="width: 50px;"
                :value="schedule.cost"
                @change="updateAvtivity")
            input.activity(
              id="avtivityName"
              style="width: 169px;"
              :value="schedule.name"
              @change="updateAvtivity")
            v-icon.delete-activity(@click="DELETE_TRIP_activity({ schedule, dayOfTrip })") mdi-trash-can-outline
        v-sheet.d-flex.justify-center(width=370 height=47 elevation="2"
          v-if="isOnEditMode"
          style="opacity: 0.6")
          v-icon(@click="addNewActivity") mdi-plus
        //- 備註
        .note.mt-8
          v-sheet.d-flex.flex-wrap.align-start(
            v-if="!isOnEditMode"
            width=370
            height=auto
            color="grey lighten-4"
            elevation="2")
            .col-auto
              span(style=" width: 100%; ") 備註：
              p.my-4 {{ note }}
          v-textarea(
            v-else
            auto-grow
            rows=1
            :value="note"
            label="備註:"
            @change="updateNote")
        v-dialog(
          v-model="showTimePicker"
          width=600
          height=500)
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
                  @click="showTimePicker = false") 確定
                v-btn.mx-5(
                  color="error"
                  @click="showTimePicker = false") 取消
    div
      v-sheet.mb-3.d-flex.justify-start.align-center(
        width=250
        height=47
        color="grey lighten-2"
        elevation="2")
        span.text-center.subtitle-1(style=" width: 100%; cursor: default; ") 景點資訊
      little-card(
        :key="currentActivity.placeId"
        :item="currentActivity"
        :type="'site'")
</template>

<script>
import LittleCard from '@/components/LittleCard.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TripSchedule',
  components: {
    LittleCard
  },
  props: {
    dayOfTrip: Number,
    datesOfTrip: Array
  },
  data () {
    return {
      showEditDailySchedulePanel: false,
      showEditActivityPanel: false,
      showTimePicker: false,
      currentActivity: {}
    }
  },
  created () {
    this.currentActivity = this.trip.contents[this.dayOfTrip].activities[0] ? this.trip.contents[this.dayOfTrip].activities[0] : { placeId: 'prevent error' }
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode
    }),
    displayDate () {
      return this.datesOfTrip[this.dayOfTrip].toLocaleDateString() + ' ' + this.datesOfTrip[this.dayOfTrip].toLocaleDateString('zh-TW', { weekday: 'short' })
    },
    note () {
      return this.trip.contents[this.dayOfTrip].note
    },
    startTime () {
      if (!this.currentActivity) {
        return
      }
      return new Date(this.currentActivity.startTime).toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' })
    },
    endTime () {
      if (!this.currentActivity) {
        return
      }
      return new Date(this.currentActivity.endTime).toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
  },
  methods: {
    ...mapMutations('trip', ['DELETE_TRIP_date', 'ADD_TRIP_activity', 'DELETE_TRIP_activity', 'UPDATE_TRIP_note', 'UPDATE_TRIP_activity']),
    toggleCurrentActivity (currentActivity) {
      this.currentActivity = currentActivity
    },
    deleteDate () {
      // 刪除單一天的行程以及此行程內的活動
      this.$emit('toggleContent', this.dayOfTrip - 1)
      this.DELETE_TRIP_date(this.dayOfTrip)
    },
    addNewActivity () {
      // 新增行程中的活動
      const newActivity = {
        name: '',
        cost: 0,
        startTime: Date.now(),
        endTime: Date.now()
      }
      this.ADD_TRIP_activity({ newActivity, dayOfTrip: this.dayOfTrip })
    },
    displayTimePicker (activity) {
      this.currentActivity = activity
      this.showTimePicker = true
    },
    updateAvtivity (e) {
      const dayOfTrip = this.dayOfTrip
      // 設一個originCurrentActivity丟到mutations裡面去找activity? 因時間改動後currentActivity會變
      const activity = this.currentActivity
      // 拿到該日行程日期的string, e.g. '2019-10-10'
      const currentDateString = this.datesOfTrip[this.dayOfTrip].toLocaleDateString()
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
      this.UPDATE_TRIP_activity({ data, dayOfTrip, activity })
    },
    updateNote (note) {
      const dayOfTrip = this.dayOfTrip
      this.UPDATE_TRIP_note({ note, dayOfTrip })
    }
  },
  watch: {
    isOnEditMode (newValue) {
      if (newValue === false) {
        this.showEditDailySchedulePanel = false
        this.showEditActivityPanel = false
        this.showTimePicker = false
      }
    },
    dayOfTrip () {
      this.currentActivity = this.trip.contents[this.dayOfTrip].activities[0] ? this.trip.contents[this.dayOfTrip].activities[0] : { placeId: 'prevent error' }
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-schedule {
  display: grid;
  grid-template-columns: 370px auto;
  grid-column-gap: 10px;
  .schedule-list {
    .schedule-card {
      height: 100%;
      display: grid;
      align-items: center;
      grid-template-columns: 40px 105px auto 60px;
      grid-template-areas: "dot time activity cost";
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
      .activity {
        grid-area: name;
      }
      .delete-activity {
        grid-area: delete;
      }
    }
  }
}
</style>
