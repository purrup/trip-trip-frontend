<template lang="pug">
  v-card(
    class="site-card-root"
    hover
    )
    div(class="carousel-wrapper")
      v-carousel(
        height="178"
        hide-delimiter-background
        hide-delimiters
      )
        v-carousel-item(
          v-for="(image, i) in site.images"
          :key="image"
          :src="image"
        )
    div(class="content-wrapper")
      rating-favorite(:name="site.name")
      div(v-for="info in infos" class="info-wrapper")
        v-icon {{info.icon}}
        span {{info.title}}: &nbsp
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
          type: 'address',
          icon: 'location_on',
          title: '地址',
          content: ''
        },
        {
          type: 'phone',
          icon: 'phone',
          title: '聯絡電話',
          content: ''
        },
        {
          type: 'openTime',
          icon: 'access_time',
          title: '營業時間',
          content: ''
        },
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
.site-card-root {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 5px 3px;
  display: grid;
  grid-template-columns: 232px 1fr;
  > .carousel-wrapper {
  }
  > .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 20px;
    > .info-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
