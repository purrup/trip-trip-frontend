<template lang="pug">
  div(class="rating-favorite-root")
    h4(@click="changeRouter(id)") {{name}}
    div
      v-icon(size="15" color="#FB9026") star
      span(:style="{ 'color': '#FB9026' }") {{rating}}
      span(:style="{ 'color': '#999999' }") &nbsp ( {{ratingCounts}}則評論 | {{collectingCounts + counts}} 人將此收藏 )
    v-icon(
      class="favorite-icon"
      :style="{ 'color' : showWhichIcon ? 'red' : 'grey' }"
      @mouseover="isOnHover = true"
      @mouseout="isOnHover = false"
      @click="toggle(id)"
    ) {{ showWhichIcon ? "favorite" : "favorite_border" }}
    slot(name="cancel")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: Object,
    type: String
  },
  data () {
    return {
      isOnHover: false,
      name: '',
      rating: 0,
      ratingCounts: 0,
      collectingCounts: 0,
      counts: 0,
      id: ''
    }
  },
  created () {
    this.name = this.item.name
    this.rating = this.item.rating
    this.collectingCounts = this.item.collectingCounts
    if (this.type === 'site') {
      this.ratingCounts = this.item.reviews.length ? this.item.reviews.length : 0
      this.id = this.item.placeId
    } else {
      this.ratingCounts = this.item.ratingCounts
      this.id = this.item._id
    }
  },
  computed: {
    ...mapGetters('account', {
      collectedSites: 'getCollectedSites',
      collectedTrips: 'getCollectedTrips'
    }),
    isFavorite () {
      return (this.type === 'site')
        ? this.collectedSites.includes(this.id)
        : this.collectedTrips.includes(this.id)
    },
    showWhichIcon () {
      return this.isFavorite
        ? !this.isOnHover
        : this.isOnHover
    }
  },
  methods: {
    ...mapActions('account', ['toggleCollectedSite', 'toggleCollectedTrip']),
    toggle (id) {
      (this.type === 'site')
        ? this.toggleCollectedSite(id)
        : this.toggleCollectedTrip(id)
      this.isFavorite ? this.counts += 1 : this.counts -= 1
    },
    changeRouter (id) {
      if (this.type === 'site') {
        if (this.$route.name === 'Site') {
          return
        }
        this.$router.push(`/sites/${id}`)
      } else {
        this.$router.push(`/trips/${id}`)
      }
    }
  }
}
</script>>

<style lang="scss">
.rating-favorite-root {
  display: flex;
  flex-direction: column;
  position: relative;
  h4:nth-child(1) {
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  span {
    font-size: 12px;
  }
  .favorite-icon {
    position: absolute;
    right: 0px;
    top: -2px;
  }
}
</style>
