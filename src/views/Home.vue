<template lang="pug">
  div(id="home-root")
    v-carousel(
      cycle
      height="100vh"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
      :interval="8000")
      v-carousel-item(
        v-for="(slide, i) in slides"
        :key="slide"
        :src="slide"
        height="100vh")
    div(class="overlay")
      div
        h1 Trip Trip
        h2 People Don’t Take Trips, Trips Take People
        search-bar(:width="'650px'" :height="'48px'" :home="true")
    div(class="container")
      div
        h3 Popular Sites
        div
          little-card(
            v-for="site in popularSites"
            :key="`little-card-${site.name}`"
            :item="site"
            :type="'site'")
      div
        h3 Popular Trips
        div
          little-card(
            v-for="trip in popularTrips"
            :key="`little-card-${trip.name}`"
            :item="trip"
            :type="'trip'")
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import LittleCard from '@/components/LittleCard.vue'

import siteApis from '@/utils/apis/site'
import { mapActions } from 'vuex'

export default {
  components: {
    SearchBar,
    LittleCard
  },
  data () {
    return {
      slides: [
        require('@/assets/image/1.jpg'),
        require('@/assets/image/2.jpg'),
        require('@/assets/image/3.jpg'),
        require('@/assets/image/4.jpg'),
        require('@/assets/image/5.jpg')
      ],
      popularSites: [],
      popularTrips: []
    }
  },
  async created () {
    await this.getPopularSites()
    this.popularTrips = await this.getPopularTrips()
  },
  methods: {
    ...mapActions('trip', ['getPopularTrips']),
    async getPopularSites () {
      try {
        this.popularSites = await siteApis.getPopularSites()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#home-root {
  .overlay {
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0px;
    z-index: 10;
    > div {
      display: grid;
      justify-content: center;
      text-align: center;
      position: absolute;
      top: 220px;
      left: 50%;
      transform: translateX(-50%);
      > h1 {
        color: white;
        font-size: 50px;
        line-height: 50px;
        margin-bottom: 20px;
      }
      h2 {
        color: white;
        margin-bottom: 40px;
      }
    }
  }
  .container {
    padding: 40px 88px 80px;
    > div {
      &:nth-child(1) {
        margin-bottom: 115px;
      }
      > h3 {
        font-size: 37px;
        line-height: 37px;
        margin-bottom: 50px;
      }
      > div {
        display: grid;
        grid-template-columns: repeat(4, 250px);
        justify-content: space-between;
      }
    }
  }
}
</style>
