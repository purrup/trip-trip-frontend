<template lang="pug">
  #trip
    main
      #toggle-bar
        v-list
          v-list-item-group(
            mandatory
            )
            v-list-item(
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="toggleContent('overview')"
            )
              v-list-item-content
                  v-list-item-title.text-center(v-text="'概覽'")
            v-list-item(
              v-for="(date, i) in dates"
              :key="i"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5); "
              @click="toggleContent(date)"
            )
              v-list-item-content
                v-list-item-title.text-center(v-text="date")
            v-list-item(
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5);"
              @click="toggleContent('+')"
            )
              v-list-item-content
                  v-list-item-title.text-center(v-text="'+'")
      #content
        overview(
          v-if="currentDisplay === 'overview'"
          :trip="trip")
        #trip-schedule(
          v-else-if="currentDisplay === dates[0]")
          v-sheet.schedule.d-flex.justify-start.align-center(
            width=370
            height=47
            color="grey lighten-2"
          )
            v-icon(
              @click="control"
              style=" width: 40px; border-right: 1px solid rgb(172, 172, 172); padding: 10px 0px;") mdi-dots-vertical
            span.text-center(style=" width: calc(100% - 40px); cursor: default; ") {{ dates[0] }}
          v-sheet.site.d-flex.justify-start.align-center(
            width=250
            height=47
            color="grey lighten-2"
          )
            span.text-center(style=" width: 100%; cursor: default; ") 景點資訊
      #google-map
        p google map

</template>

<script>
import Overview from '@/components/Overview.vue'
import { mapState } from 'vuex'

export default {
  name: 'trip',
  components: {
    Overview
  },
  data () {
    return {
      dates: [
      ],
      currentDisplay: null
    }
  },
  beforeMount () {
    // content預設資料
    this.currentDisplay = 'overview'
    // // 計算全部旅行日期
    const firstDate = new Date(this.trip.startDate)
    for (let i = 0; i < this.trip.days; i++) {
      let newDate = new Date(firstDate)
      newDate.setDate(newDate.getDate() + i)
      this.dates.push(newDate.getMonth() + 1 + '/' + newDate.getDate())
      // console.log('newDate:', newDate)
    }
    // console.log(this.dates)
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip
    })
  },
  methods: {
    toggleContent (item) {
      this.currentDisplay = item
      // console.log(item)
    },
    control () {
      console.log('control')
    }
  }
}
</script>

<style lang="scss" scoped>
#trip {
  height: auto;
  overflow-y: auto;
}

main {
  width: 100%;
  height: 100vh;
  margin: 80px 0 0 47px;
  display: grid;
  grid-template-columns: 84px 686px auto;
  grid-template-areas: "toggle-bar currentDisplay google-map";
  #toggle-bar {
    margin-right: 9px;
    // background-color: green;
    grid-area: toggle-bar;
  }
  #overview {
    grid-area: currentDisplay;
  }
  #trip-schedule {
    grid-area: currentDisplay;
    display: grid;
    grid-template-columns: 370px 10px auto;
    grid-template-areas: "schedule . site";
    .schedule {
      grid-area: schedule;
    }
    .site {
      grid-area: site;
    }
  }
  #google-map {
    // background-color: blue;
    grid-area: google-map;
  }
}

</style>
