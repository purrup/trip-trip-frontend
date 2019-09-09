<template lang="pug">
  #trip
    main
      #toggle-bar
        v-list
          v-list-item-group
            v-list-item(
              v-for="(item, i) in toggle"
              :key="i"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5); "
            )
              v-list-item-content
                v-list-item-title.text-center(v-text="item")
      #overview
        overview(:trip="trip")
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
      toggle: [
        '概覽', '8/1', '8/2', '8/3', '8/4', '+'
      ]
    }
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip
    })
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
  grid-template-areas: "toggle-bar overview google-map";
  #toggle-bar {
    margin-right: 9px;
    // background-color: green;
    grid-area: toggle-bar;
  }
  #overview {
    grid-area: overview;
  }
  #google-map {
    // background-color: blue;
    grid-area: google-map;
  }
}

</style>
