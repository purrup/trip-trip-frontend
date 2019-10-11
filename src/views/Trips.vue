<template lang="pug">
  #trips-root.container
    main
      v-row#trips
        v-col(cols="auto")
          trip-card(
            v-for="trip in trips"
            :trip="trip"
            :key="`trip-card-${trip._id}`"
            @mouseover.native="displayOverview(trip)"
            @mouseout.native="mouseout")
      v-row#overview
        v-col(cols="auto")
          overview(:trip="currentTrip")
</template>

<script>
import TripCard from '@/components/trip/TripCard.vue'
import Overview from '@/components/trip/Overview.vue'
import { mapState } from 'vuex'

export default {
  name: 'trips',
  components: {
    TripCard,
    Overview
  },
  data () {
    return {
      currentTrip: {}, // 現在overview顯示的trip資料
      timeStamp: '',
      timer: null
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.query.hasOwnProperty('keyword')) {
      const keyword = to.query.keyword
      await this.$store.dispatch('trip/getTripsByKeyword', keyword)
    } else {
      const city = to.query['cities[]']
      await this.$store.dispatch('trip/getTripByCountryAndCities', city)
    }
    this.currentTrip = this.trips[0]
    next()
  },
  created () {
    // overview預設資料
    this.currentTrip = this.trips[0]
  },
  computed: {
    ...mapState('trip', {
      trips: state => state.trips
    })
  },
  methods: {
    displayOverview (trip) {
      this.timeStamp = Date.now()
      this.timer = setInterval(this.toggle, 100, trip)
    },
    mouseout () {
      clearInterval(this.timer)
    },
    toggle (trip) {
      if ((Date.now() - this.timeStamp) / 100 < 3) {
        return
      }
      this.currentTrip = trip
    }
  }
}
</script>

<style lang="scss" scoped>
#trips-root {
  main {
    width: 100%;
    // display: grid;
    // grid-template-columns: 0.77fr 50px 1.15fr;
    // grid-template-areas: "left . right";
    #trips {
      // grid-area: left;
      margin-right: 736px;
    }
    #overview {
      // grid-area: right;
      overflow-x: auto;
      width: 686px;
      height: 100%;
      position: fixed !important;
      top: 70px;
      right: 0px;
      max-width: 686px;
    }
  }
}
</style>
