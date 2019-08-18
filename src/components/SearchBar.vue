<template lang="pug">
  form(class="search-bar-root")
    input(
      type="searcn"
      placeholder="Search..."
      @focus="$emit('showSearchPanel')"
    )
    i(class="search-icon fas fa-search")
    div(v-if="isFocus" class="search-panel-container")
      v-tabs(
        v-model="tab"
        color="#666666"
        height='30'
      )
        v-tabs-slider(color="yellow")
        v-tab(v-for="tab in tabLists" :key="tab") {{ tab }}
      //- v-tabs-items(v-model="tab")
      //-   v-tab-item(
      //-     v-for="tab in tabLists"
      //-     :key="tab"
      //-   )
      div(class="search-panel")
        div(class="region-panel")
          div(v-for="region in regions")
            span {{ region }}
        div(class="cities-panel")
          div(v-for="city in cities[selectedRegion]")
            v-img(
              :src="require('@/assets/image/1.jpg')"
              contain=true
            )
            span {{ city }}
</template>

<script>
export default {
  props: {
    isFocus: {
      type: Boolean,
      default: false
    }
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
      selectedRegion: '北部'
    }
  },
  methods: {
    show (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar-root {
  position: relative;
  > input {
    box-sizing: border-box;
    outline: none;
    background-color: #fcfcfc;
    padding: 0 13.5px;
    color: black;
    width: 500px;
    height: 38px;
    font-size: 16px;
    border: 1px solid #efefef;
    &::placeholder {
      color: #666666;
    }
  }
  > .search-icon {
    position: absolute;
    right: 15px;
    top: 11px;
    color: #666666;
  }
  > .search-panel-container {
    .search-panel {
      display: grid;
      grid-template-columns: 118px 1fr;
      background-color: #ffffff;
      > .region-panel {
        display: flex;
        flex-direction: column;
        > div {
          width: 100%;
          height: 50px;
          display: grid;
          align-items: center;
          border-right: 1px solid black;
          border-bottom: 1px solid black;
          &:last-child {
            border-bottom: none;
          }
        }
      }
      > .cities-panel {
        display: grid;
        grid-template-columns: repeat(4, 80px);
        grid-auto-rows: 100px;
        justify-content: space-around;
        align-content: space-around;
        > div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
