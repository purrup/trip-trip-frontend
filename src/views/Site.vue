<template lang="pug">
  div(id="site-root")
    div(class="image-container")
      div(
        v-for="image in site.photos.slice(0, 5)"
        :style="{ 'background-image': `url(${image})` }")
    div(class="main")
      div(class="content")
        site-info(v-if="site._id !== undefined" :site="site")
        div(class="comment-container")
          div
            span {{site.reviews.length}} 則評論
            span (以下內容來自為google地圖)
          div(v-for="comment in site.reviews" class="comment-wrapper")
            div
              img(:src="comment.profile_photo_url")
              div
                h4 {{comment.author_name}}
                span {{comment.relative_time_description}}
                v-rating(
                  v-model="comment.rating"
                  color="#FB9026"
                  background-color="#7F7F7F"
                  empty-icon="$vuetify.icons.ratingFull"
                  half-increments
                  size="15px"
                  dense
                  readonly)
            div
              p {{comment.text}}
      div(v-if="containingTrips" class="recommendation-lits")
        p 包含此景點的行程
        little-card(v-for="(trip, index) in containingTrips"
          :key="`little-card-${trip.name}-${index}`"
          :item="trip"
          :type="'trip'")
      div(v-if="otherTrips" class="recommendation-lits")
        p 同縣市的其他行程
        little-card(v-for="(trip, index) in otherTrips"
          :key="`little-card-${trip.name}-${index}`"
          :item="trip"
          :type="'trip'")
</template>

<script>
import SiteInfo from '@/components/site/SiteInfo.vue'
import LittleCard from '@/components/LittleCard.vue'

import siteApis from '@/utils/apis/site.js'

export default {
  components: {
    SiteInfo,
    LittleCard
  },
  data () {
    return {
      site: {
        photos: [],
        reviews: []
      },
      containingTrips: [],
      otherTrips: []
    }
  },
  async created () {
    await this.getSite()
  },
  methods: {
    async getSite () {
      try {
        const { site, containingTrips, otherTrips } = await siteApis.getSite(this.$route.params.id)
        this.site = site
        this.containingTrips = containingTrips
        this.otherTrips = otherTrips
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>>

<style lang="scss" scoped>
#site-root {
  margin: 0 auto;
  max-width: 964px;
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 240px);
    grid-template-rows: 183px 183px;
    grid-gap: 4px 1px;
    grid-template-areas:
      "a a b c"
      "a a d e";
    > div {
      background-color: grey;
      background-size: cover;
      background-position: 50% 50%;
    }
    > div:nth-child(1) {
      grid-area: a;
    }
  }
  .main {
    padding-top: 50px;
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-column-gap: 164px;
    .content {
      .comment-container {
        border-top: 1px solid grey;
        margin-top: 20px;
        > div:nth-child(1) {
          margin-bottom: 20px;
          > span:nth-child(2) {
            color: grey;
            font-size: 12px;
          }
        }
        .comment-wrapper {
          margin-bottom: 20px;
          h4,
          span {
            display: inline-block;
            font-size: 13px;
            padding-right: 8px;
          }
          > div:nth-child(1) {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            img {
              width: 50px;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .recommendation-lits {
      p {
        padding-bottom: 10px;
      }
      .little-card-root {
        margin-bottom: 38px;
      }
    }
  }
}
</style>
