<template lang="pug">
  div(id="sites-root")
    div(class="sites-container")
      search-result-bar(
        v-if="!loading"
        :resultWord="resultWord"
        :resultsAmounts="sites.length"
        @sortByRating="sortByRating"
        @sortByCollectingCounts="sortByCollectingCounts"
        @sortByCommentAmounts="sortByCommentAmounts")
      draggable(
        tag="div"
        class="sites-wrapper"
        :group="{ name: 'sites', pull: 'clone', put: false }"
        :list="sites"
        :clone="clone")
        site-card(
          v-for="site in sites"
          :key="`site-${site.name}`"
          :site="site"
          @mouseover.native="showSiteOnMap(site.geometry)")
    div(id="map")
    storage-zone
</template>

<script>
import SearchResultBar from '@/components/site/SearchResultBar.vue'
import SiteCard from '@/components/site/SiteCard.vue'
import StorageZone from '@/components/site/StorageZone.vue'
import draggable from 'vuedraggable'

import siteApis from '@/utils/apis/site.js'

/* eslint-disable */
export default {
  components: {
    draggable,
    SiteCard,
    StorageZone,
    SearchResultBar
  },
  data () {
    return {
      loading: true, // 確保搜尋完才出現
      resultWord: '',
      sites: [],
      map: null,
      marker: null,
      myTainanHouse: { lat: 23.039808, lng: 120.211868 }
    }
  },
  async mounted () {
    // the initialize function must be written at mounted hook
    await this.search()
    if (this.sites.length !== 0) {
      this.initMap()
    }
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.sites[0].geometry,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      })
      this.marker = new google.maps.Marker({ map: this.map, position: this.sites[0].geometry })

      this.marker.addListener('click', (e) => {
        console.log(e)
        this.map.setZoom(8)
        this.map.setCenter(this.myTainanHouse)
      })
    },
    showSiteOnMap (pos) {
      this.marker.setPosition(pos)
      this.map.setCenter(pos)
      this.map.setZoom(13)
    },
    clone (site) {
      return {
        placeId: site.placeId,
        collectingCounts: site.collectingCounts,
        reviews: site.reviews,
        rating: site.rating,
        name: site.name,
        cost: 0,
        startTime: Date.now(),
        endTime: Date.now()
      }
    },
    async search () {
      if (this.$route.query.hasOwnProperty('keyword')) {
        await this.getSitesByKeyword()
      } else {
        await this.getSitesByCountryAndCities()
      }
      this.loading = false
    },
    async getSitesByCountryAndCities () {
      try {
        const city = this.$route.query['cities[]']
        this.sites = await siteApis.getSitesByCountryAndCities(city)
        this.resultWord = city
      } catch (error) {
        console.log(error)
      }
    },
    async getSitesByKeyword () {
      try {
        const keyword = this.$route.query.keyword
        this.sites = await siteApis.getSitesByKeyword(keyword)
        this.resultWord = keyword
      } catch (error) {
        console.log(error)
      }
    },
    sortByRating () {
      this.sites.sort((a, b) => b.rating - a.rating)
    },
    sortByCommentAmounts () {
      this.sites.sort((a, b) => b.reviews.length - a.reviews.length)
    },
    sortByCollectingCounts () {
      this.sites.sort((a, b) => b.collectingCounts - a.collectingCounts)
    }
  },
  watch: {
    async '$route' (to, from) {
      await this.search()
      this.showSiteOnMap(this.sites[0].geometry)
    }
  }
}
</script>

<style lang="scss" scoped>
#sites-root {
  .sites-container {
    margin-right: 720px;
    padding: 20px 36.5px;
    > .sites-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 190px;
      grid-row-gap: 29px;
    }
  }
  #map {
    width: 720px;
    height: 100vh;
    position: fixed !important;
    top: 70px;
    right: 0px;
  }
}
</style>
