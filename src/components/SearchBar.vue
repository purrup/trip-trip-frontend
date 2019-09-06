<template lang="pug">
  form(class="search-bar-root" :style="{ 'width': width, 'height' : height }")
    input(
      type="searcn"
      placeholder="Search..."
      @focus="SET_isFocusOnSearchBar(true)",
      class="top-half-border-radius"
      :class="{'bottom-half-border-radius': !isFocusOnSearchBar}"
    )
    v-icon(class="search-icon") search
    div(v-if="isFocusOnSearchBar" class="search-panel-container bottom-half-border-radius")
      v-tabs(
        v-model="tab"
        color="#666666"
        height='30'
      )
        v-tabs-slider(color="grey")
        v-tab(v-for="tab in tabLists" :key="tab") {{ tab }}
      //- v-tabs-items(v-model="tab")
      //-   v-tab-item(
      //-     v-for="tab in tabLists"
      //-     :key="tab"
      //-   )
      div(class="search-panel")
        div(class="region-panel")
          div(
            v-for="region in regions"
            @mouseover="mouseover(region)"
            @mouseout="mouseout"
          )
            span {{ region }}
        div(class="cities-panel")
          div(v-for="city in cities[selectedRegion]")
            v-img(
              :src="require('@/assets/image/2.jpg')"
              contain=true
            )
            span {{ city }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    width: String,
    height: String
  },
  data () {
    return {
      tab: null,
      tabLists: [
        '找景點', '找行程'
      ],
      regions: ['北部', '中部', '南部', '東部', '離島'],
      cities: {
        '北部': ['基隆', '台北', '新北', '宜蘭', '桃園', '新竹', '苗栗'],
        '中部': ['台中', '南投', '彰化', '雲林'],
        '南部': ['嘉義', '台南', '高雄', '屏東'],
        '東部': ['花蓮', '台東'],
        '離島': ['馬祖', '金門', '澎湖']
      },
      selectedRegion: '北部',
      timeStamp: '',
      timer: null
    }
  },
  computed: {
    ...mapGetters('feature', ['isFocusOnSearchBar'])
  },
  methods: {
    ...mapMutations('feature', ['SET_isFocusOnSearchBar']),
    mouseover (region) {
      this.timeStamp = Date.now()
      this.timer = setInterval(this.toggle, 100, region)
    },
    mouseout () {
      clearInterval(this.timer)
    },
    toggle (region) { // 如果滑鼠停留三毫秒就切換
      if ((Date.now() - this.timeStamp) / 100 < 3) {
        return
      }
      this.selectedRegion = region
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar-root {
  position: relative;
  z-index: 10;
  > input {
    box-sizing: border-box;
    outline: none;
    background-color: #fcfcfc;
    padding: 0 13.5px;
    color: black;
    width: 100%;
    height: 100%;
    font-size: 20px;
    border: 1px solid #efefef;
    &::placeholder {
      color: #666666;
    }
  }
  > .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-40%);
    color: #666666;
  }
  > .search-panel-container {
    width: 650px;
    border: 1px solid #efefef;
    box-shadow: 0px 3px 12px -2px rgba(0, 0, 0, 0.4);
    .search-panel {
      display: grid;
      grid-template-columns: 118px 1fr;
      background-color: #ffffff;
      > .region-panel {
        display: flex;
        flex-direction: column;
        > div {
          width: 100%;
          height: 45px;
          display: grid;
          align-items: center;
          border-right: 1px solid black;
          border-bottom: 1px solid black;
          &:last-child {
            border-bottom: none;
          }
          &:hover {
            background-color: grey;
            color: white;
          }
        }
      }
      > .cities-panel {
        display: grid;
        grid-template-columns: repeat(4, 120px);
        grid-auto-rows: 80px;
        justify-content: space-around;
        padding: 12px 0px;
        grid-row-gap: 20px;
        > div {
          display: flex;
          flex-direction: column;
          position: relative;
          > span {
            color: white;
            position: absolute;
            bottom: 0px;
            width: 120px;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.65),
              transparent 100%
            );
          }
        }
      }
    }
  }

  .top-half-border-radius {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .bottom-half-border-radius {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
