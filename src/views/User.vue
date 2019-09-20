<template lang="pug">
  div(id="user-root")
    user-profile(:user="user")
    div
      div(v-if="user.collectedSites.length !== 0")
        h5 {{user.username}}收藏的景點
        div
          little-card(
            v-for="site in user.collectedSites.slice(indexs.idx1, equalOrLess2(user.collectedSites.length) + indexs.idx1)"
            :key="`little-card-${site.name}`"
            :item="site"
            :type="'site'")
        v-icon(@click="back('idx1')") arrow_back_ios
        v-icon(@click="forward('idx1', user.collectedSites.length)") arrow_forward_ios
      div(v-if="user.ownedTrips.length !== 0")
        h5 {{user.username}}建立的行程
        div
          ittle-card(
            v-for="trip in user.ownedTrips"
            :key="`little-card-${trip.name}`"
            :item="trip"
            :type="'trip'")
        v-icon(@click="back('idx2')") arrow_back_ios
        v-icon(@click="forward('idx2', user.ownedTrips.length)") arrow_forward_ios
      div(v-if="user.collectedTrips.length !== 0")
        h5 {{user.username}}收藏的行程
        div
          little-card(
            v-for="trip in user.collectedTrips.slice(indexs.idx3, equalOrLess2(user.collectedTrips.length) + indexs.idx3)"
            :key="`little-card-${trip.name}`"
            :item="trip"
            :type="'tirp'")
        v-icon(@click="back('idx3')") arrow_back_ios
        v-icon(@click="forward('idx3', user.collectedTrips.length)") arrow_forward_ios
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'
import LittleCard from '@/components/LittleCard.vue'

import userApis from '@/utils/apis/user.js'

export default {
  components: {
    UserProfile,
    LittleCard
  },
  data () {
    return {
      user: {
        collectedTrips: [],
        collectedSites: [],
        ownedTrips: []
      },
      indexs: {
        idx1: 0,
        idx2: 0,
        idx3: 0
      }
    }
  },
  async mounted () {
    const { data } = await userApis.getUserProfile(this.$route.params.id)
    this.user = data
  },

  methods: {
    equalOrLess2 (length) {
      return length >= 2 ? 2 : length
    },
    back (index) {
      return (this.indexs[index] - 1) < 0
        ? 0
        : this.indexs[index]--
    },
    forward (index, length) {
      return (this.indexs[index] + 1) > (length - this.equalOrLess2(length))
        ? 0
        : this.indexs[index]++
    }
  }
}
</script>

<style lang="scss" scoped>
#user-root {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 140px 400px 145px 1fr 209px;
  grid-template-areas: ". profile . items .";
  .user-profile-root {
    grid-area: profile;
  }
  > div:nth-child(2) {
    grid-area: items;
    > div {
      position: relative;
      > h5 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      > div {
        margin-left: 30px;
        display: grid;
        grid-auto-columns: 250px;
        grid-auto-rows: 210px;
        grid-auto-flow: column;
        grid-column-gap: 15px;
      }
      i {
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        &:nth-child(3) {
          left: 0px;
        }
        &:nth-child(4) {
          right: -38px;
        }
      }
    }
  }
}
</style>
