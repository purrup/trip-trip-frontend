<template lang="pug">
  div(class="storage-zone-root" :class="{ 'fade-in': isShowStorageZone}")
    button(@click="isShowStorageZone = !isShowStorageZone")
      v-icon(:class="{ 'arrow-rotate': isShowStorageZone}") keyboard_arrow_left
    div(:style="storageZoneHeight")
      div(v-if="!isOnDraggable" class="no-draggable")
        p(v-if="account.owningTrips.length === 0") 你還沒有屬於自己的旅程，趕快新增吧！
        div(v-else)
          v-btn(v-for="(trip, index) in account.owningTrips"
          :width="'90%'"
          :key="trip.name + index"
          outlined color="primary"
          @click="openExistingTrip(trip)") {{ trip.name }}
          p or
        v-btn(
          :width="'30%'"
          outlined
          color="secondary"
          @click="createNewTrip") Create
      div(v-else class="on-draggable")
        div
          v-icon(@click="back") reply
          span {{storageTrip.name}}
          v-spacer
          v-icon(@click="goToEditPage") edit
        div
          daily-activity(
            v-for="(day, index) in storageTrip.contents"
            :key="`daily-activity-${index + 1}`"
            :activities="day.activities"
            :day="index + 1"
            @deleteOneDay="deleteOneDay"
            @deleteOneSite="deleteOneSite")
          v-btn(
            outlined
            color="secondary"
            @click="storageTrip.contents.push({ activities: [], note: ''})")
            v-icon add
</template>

<script>
import DailyActivity from '@/components/site/DailyActivity.vue'

import { mapState, mapMutations, mapActions } from 'vuex'
import { mergeSites } from '@/utils/apis/site.js'

export default {
  components: {
    DailyActivity
  },
  data () {
    return {
      isShowStorageZone: false,
      isOnDraggable: false,
      storageTrip: {}
    }
  },
  computed: {
    ...mapState('account', {
      account: state => state
    }),
    storageZoneHeight () {
      return {
        height: window.innerHeight - 70 + 'px'
      }
    }
  },
  methods: {
    ...mapMutations('account', ['CREATE_trip']),
    ...mapActions('trip', ['createTrip', 'updateTrip']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    openExistingTrip (trip) {
      trip.contents.forEach(content => {
        content.activities = mergeSites(content.activities)
      })
      this.storageTrip = trip
      this.isOnDraggable = true
    },
    async createNewTrip () {
      if (this.account.isLogin === 'false') {
        return this.SET_ERROR_MSG('請先登入或註冊帳號喔')
      } else {
        const formData = new FormData()
        const basicFormat = {
          name: this.account.username + '的快樂之旅',
          country: '臺灣',
          contents: [
            {
              activities: [],
              note: ''
            }
          ]
        }
        formData.append('data', JSON.stringify(basicFormat))
        const trip = await this.createTrip(formData)
        this.CREATE_trip(trip)
        this.storageTrip = trip

        this.isOnDraggable = true
      }
    },
    async storeTrip () {
      this.storageTrip.sites = this.storageTrip.contents.map(content => content.activities)
      this.storageTrip.sites = this.storageTrip.sites.map(item => item.map(site => site.name))
      this.storageTrip.contents.forEach(content => {
        content.activities = content.activities.map(site => ({
          placeId: site.placeId,
          collectingCounts: site.collectingCounts,
          name: site.name,
          cost: site.cost,
          startTime: site.startTime,
          endTime: site.endTime
        }))
      })
      // 更新cities
      const cityOfSite = this.$route.query['cities[]']
      if (this.storageTrip.cities.length === 0 || !this.storageTrip.cities.includes(cityOfSite)) {
        this.storageTrip.cities.push(cityOfSite)
        return
      }
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.storageTrip))
      await this.updateTrip({ tripId: this.storageTrip._id, formData })
    },
    back () {
      this.storeTrip()
      this.isOnDraggable = false
    },
    async goToEditPage () {
      await this.storeTrip()
      this.$router.push({ path: `/trips/${this.storageTrip._id}` })
    },
    deleteOneSite (name, placeId) {
      this.storageTrip.sites.forEach(item => {
        return item.filter(site => site.name !== name)
      })
    },
    deleteOneDay (index) {
      this.storageTrip.sites.splice(index, 1)
      this.storageTrip.contents.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-zone-root {
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
      display: grid;
      justify-items: center;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        > button {
          margin-top: 10px;
        }
      }
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
        > i:nth-child(1) {
          padding-right: 6px;
        }
      }
      > div:nth-child(2) {
        display: grid;
        width: 100%;
        justify-items: center;
        > button {
          width: 90%;
          border-style: dashed;
          margin-top: 10px;
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
