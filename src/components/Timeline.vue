<template lang="pug">
  #timeline-root
    v-timeline(
      align-top
      )
      v-timeline-item(
        v-for="(trip, i) in trips"
        :key="trip"
        color="indigo lighten-2"
      )
        v-card(
          color="indigo lighten-5"
        )
          v-card-title.tittle {{ trip.day }}
          v-card-text.white(style=" padding: 0;")
            ul(
              style=" list-style: none; "
              v-for="(site, i) in trip.sites"
              :key="site")
              li {{ site }}

</template>

<script>
export default {
  name: 'Timeline',
  data () {
    return {
      trips: [
        { day: '第一天',
          sites: ['多良車站', '鹿野高台', '原生植物園', '伯朗大道', '池上博物館']
        },
        { day: '第二天',
          sites: ['櫻平交流道', '鐵花村', '森林公園', '歷史博物館', '星星部落']
        },
        { day: '第三天',
          sites: ['小野柳', '三仙台', '海濱公園', '豐源國小', '加路蘭遊憩區']
        },
        { day: '第四天',
          sites: ['清水斷崖', '太魯閣國家公園', '七星潭', '崇德沙灘', '立川漁場']
        },
        { day: '第五天',
          sites: ['太平洋公園', '六十石山', '東華大學', '雲山水', '富源國家森林遊樂區']
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
