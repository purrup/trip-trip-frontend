<template lang="pug">
  v-card(
    class="site-card-root"
    hover)
    div(class="carousel-wrapper")
      v-carousel(
        height="178"
        hide-delimiter-background
        hide-delimiters)
        v-carousel-item(
          v-for="(image, i) in site.photos"
          :key="`image-${i}`"
          :src="image")
    site-info(:site="site" class="site-info-wrapper")
</template>

<script>
import SiteInfo from '@/components/site/SiteInfo.vue'

export default {
  components: {
    SiteInfo
  },
  props: {
    site: Object
  },
  data () {
    return {
    }
  }
}
</script>>

<style lang="scss">
.site-card-root {
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 5px 3px;
  height: 190px;
  display: grid;
  grid-template-columns: 232px 1fr;
  .site-info-wrapper {
    padding: 15px 20px;
  }
}
</style>
