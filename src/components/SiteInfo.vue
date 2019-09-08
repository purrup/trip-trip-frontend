<template lang="pug">
  div(class="site-info-root")
    div
      template(v-if="$route.path === '/sites'")
        router-link(tag="span" :to="`/site/${site.place_id}`") {{site.name}}
      template(v-else)
        span {{site.name}}
      rating-favorite(:rating="site.rating" :ratingNum="site.reviews.length")
    div(v-for="info in infos" class="info-wrapper")
      v-icon {{info.icon}}
      span {{info.title}}: &nbsp
      template(v-if="info.title !== '官方網站'")
        span {{info.content}}
      template(v-else)
        a {{info.content}}
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
        // {
        //   type: 'openTime',
        //   icon: 'access_time',
        //   title: '營業時間',
        //   content: ''
        // },
        {
          type: 'website',
          icon: 'language',
          title: '官方網站',
          content: ''
        }
      ]
    }
  },
  created () {
    this.infos.forEach((info, index) => {
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
  box-sizing: border-box;
  padding: 15px 20px;
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
    align-items: center;
    font-size: 14px;
    width: 367px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
