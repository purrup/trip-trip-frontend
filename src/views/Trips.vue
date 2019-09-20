<template lang="pug">
  #trips-root.container
    main
      v-row#trips
        v-col(
          cols="auto"
          )
          template(v-for="(trip, index) in trips")
            trip-card(
              :trip="trip"
              :key="index"
              @mouseover.native="displayOverview(trip)"
              @mouseout="mouseout"
            )
      v-row#overview
        v-col(cols="auto")
          overview(:trip="currentTrip")
</template>

<script>
import TripCard from '@/components/TripCard.vue'
import Overview from '@/components/Overview.vue'
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
  beforeMount () {
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
      this.timer = setTimeout(this.toggle, 1000, trip)
    },
    mouseout () {
      clearTimeout(this.timer)
    },
    toggle (trip) {
      if ((Date.now() - this.timeStamp) / 100 < 5) {
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
    display: grid;
    grid-template-columns: 0.77fr 50px 1.15fr;
    grid-template-areas: "left . right";
    #trips {
      grid-area: left;
    }
    #overview {
      grid-area: right;
      max-width: 686px;
    }
  }
}
</style>
