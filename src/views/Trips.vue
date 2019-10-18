<template lang="pug">
  #trips-root
    main
      v-row#trips
        search-result-bar(
          :resultWord="resultWord"
          :resultsAmounts="trips.length"
          @sortByDays="sortByDays"
          @sortBySitesAmounts="sortBySitesAmounts"
          @sortByCollectingCounts="sortByCollectingCounts"
        )
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
import SearchResultBar from '@/components/site/SearchResultBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'trips',
  components: {
    TripCard,
    Overview,
    SearchResultBar
  },
  data () {
    return {
      currentTrip: {}, // 現在overview顯示的trip資料
      timeStamp: '',
      timer: null,
      resultWord: ''
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.query.hasOwnProperty('keyword')) {
      const keyword = to.query.keyword
      this.resultWord = keyword
      await this.$store.dispatch('trip/getTripsByKeyword', keyword)
    } else {
      const city = to.query['cities[]']
      this.resultWord = city
      await this.$store.dispatch('trip/getTripByCountryAndCities', city)
      this.currentTrip = {}
    }
    this.currentTrip = this.trips[0]
    next()
  },
  created () {
    // overview預設資料
    this.currentTrip = this.trips[0]
    this.resultWord = this.$route.query['cities[]']
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
    },
    sortByDays () {
      this.trips.sort((a, b) => b.days - a.days)
    },
    sortBySitesAmounts () {
      this.trips.sort((a, b) => b.sites.length - a.sites.length)
    },
    sortByCollectingCounts () {
      this.trips.sort((a, b) => b.collectingCounts - a.collectingCounts)
    }
  }
}
</script>

<style lang="scss" scoped>
#trips-root {
  main {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    height: auto;
    display: grid;
    grid-template-columns: 40px 0.77fr 1fr 1.15fr;
    grid-template-areas: ". left . right";
    #trips {
      grid-area: left;
      height: 200vh;
      display: grid;
      grid-template-rows: 80px auto;
      grid-template-areas:
      "search-result"
      "trips";
      > :nth-child(1) {
        margin-top: 20px;
        grid-area: search-result;
      }
      > :nth-child(2) {
        grid-area: trips;
      }
      // margin-right: 736px;
    }
    #overview {
      grid-area: right;
      overflow-y: auto;
      width: 686px;
      height: auto;
      // position: fixed !important;
      // top: 70px;
      // right: 0px;
      // max-width: 686px;
    }
  }
}
</style>
