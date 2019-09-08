<template lang="pug">
  div(id="site-root")
    div(class="image-wrapper")
      div(
        v-for="image in site.images.slice(0, 5)"
        :style="{ 'background-image': `url(${image})` }"
      )
    div(class="main")
      div(class="content")
        site-info(:site="site")
        div(class="comment-wrapper")
      div(class="recommendation-lits")
        p 包含此景點的行程
        little-card(v-for="n in 4" :key="`little-card-${n}`")
</template>

<script>
import SiteInfo from '@/components/SiteInfo.vue'
import LittleCard from '@/components/LittleCard.vue'

export default {
  components: {
    SiteInfo,
    LittleCard
  },
  data () {
    return {
      site: {
        id: 1,
        name: '鹿野高台',
        rating: 4,
        isFavorite: true,
        address: '955台東縣鹿野鄉永安村高台路42巷145號',
        phone: '08 955 1637',
        openTime: '24小時營業',
        website: 'https://www.youtube.com',
        images: [
          require('@/assets/image/1.jpg'),
          require('@/assets/image/2.jpg'),
          require('@/assets/image/3.jpg'),
          require('@/assets/image/4.jpg'),
          require('@/assets/image/5.jpg')
        ],
        position: {
          lat: 23.21321,
          lng: 120.42918
        }
      },
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
  },
  mounted () {
  },
  methods: {
  }
}
</script>>

<style lang="scss" scoped>
#site-root {
  max-width: 964px;
  margin: 0 auto;
  width: 100%;
  margin-top: 70px;
  .image-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 240px);
    grid-template-rows: 183px 183px;
    grid-gap: 4px 1px;
    grid-template-areas:
      "a a b c"
      "a a d e";
    > div {
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
    grid-column-gap: 180px;
    .content {
    }
    .recommendation-lits {
      .little-card-root {
        margin-bottom: 38px;
      }
    }
  }
}
</style>
