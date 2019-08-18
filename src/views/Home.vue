<template lang="pug">
  div(id="home-root" @click="closeSearchPanel")
    v-carousel(
      cycle
      height="788"
      hide-delimiter-background
      show-arrows-on-hover
      :interval="4000"
    )
      v-carousel-item(
        v-for="(slide, i) in slides"
        :key="slide"
        :src="slide"
      )
    div(class="overlay")
      div
        h1 Trip Trip
        h2 People Don’t Take Trips, Trips Take People
        search-bar(:isFocus="isFocus" @showSearchPanel="isFocus = true")

</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  components: {
    SearchBar
  },
  data () {
    return {
      isFocus: false,
      slides: [
        require('@/assets/image/1.jpg'),
        require('@/assets/image/2.jpg'),
        require('@/assets/image/3.jpg'),
        require('@/assets/image/4.jpg'),
        require('@/assets/image/5.jpg')
      ]
    }
  },
  methods: {
    closeSearchPanel (e) {
      if (e.target.closest('.search-bar-root')) {
        return
      }
      this.isFocus = false
    }
  }
}
</script>

<style lang="scss" scoped>
#home-root {
  .overlay {
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    > div {
      display: grid;
      justify-content: center;
      text-align: center;
      position: fixed;
      top: 262px;
      left: 50%;
      transform: translateX(-50%);
      > h1 {
        color: white;
        font-size: 50px;
        line-height: 50px;
        margin-bottom: 20px;
      }
      h2 {
        color: white;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
