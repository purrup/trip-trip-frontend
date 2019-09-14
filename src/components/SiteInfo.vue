<template lang="pug">
  div(class="site-info-root")
    div
      template(v-if="$route.path === '/sites'")
        router-link(tag="span" :to="`/site/${site.placeId}`") {{site.name}}
      template(v-else)
        span {{site.name}}
      rating-favorite(:rating="site.rating" :ratingNum="site.reviews.length" :placeId="site.placeId")
    div(v-for="info in infos" class="info-wrapper")
      v-icon {{info.icon}}
      span {{info.title}}: &nbsp
      template(v-if="info.title === '官方網站'")
        a(:href="info.content") {{info.content}}
      template(v-else-if="info.title === '營業時間'")
        div(class="opening-hours")
          span(v-for="dayTime in info.content") {{dayTime}}
      template(v-else)
        span {{info.content}}
</template>

<script>
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  components: {
    RatingFavorite
  },
  props: {
    site: Object
  },
  data () {
    return {
      infos: [
        {
          type: 'formatted_address',
          icon: 'location_on',
          title: '地址',
          content: ''
        },
        {
          type: 'formatted_phone_number',
          icon: 'phone',
          title: '聯絡電話',
          content: ''
        },
        {
          type: 'website',
          icon: 'language',
          title: '官方網站',
          content: ''
        }
      ],
      moreInfos: [
        {
          type: 'opening_hours',
          icon: 'access_time',
          title: '營業時間',
          content: ''
        }
      ]
    }
  },
  created () {
    if (this.$route.path === `/site/${this.site.place_id}`) {
      this.infos = [...this.infos, ...this.moreInfos]
    }
    this.infos.forEach((info, index) => {
      if (info.type === 'opening_hours') {
        info.content = this.site.opening_hours.weekday_text
        return
      }
      info.content = this.site[info.type]
    })
  }
}
</script>>

<style lang="scss">
.site-info-root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:nth-child(1) {
    display: grid;
    grid-template-columns: auto 1fr;
    > span {
      font-weight: bold;
      font-size: 18px;
      line-height: 20px;
      padding-right: 5px;
    }
  }
  .info-wrapper {
    padding-top: 7px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 14px;
    line-height: 24px;
    width: 367px;
    white-space: nowrap;
    > a,
    span:nth-child(3) {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .opening-hours {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
