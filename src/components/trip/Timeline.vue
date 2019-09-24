<template lang="pug">
  .timeline-root
    v-timeline(align-top)
      v-timeline-item(
        v-for="(sitesOfOneDay, i) in sites"
        :key="i"
        color="indigo lighten-2")
        v-card(color="indigo lighten-5")
          v-card-title.tittle {{ `Day ${ i + 1}` }}
          v-card-text.white(style=" padding: 0;")
            ul(
              style=" list-style: none; "
              v-for="(site, i) in sitesOfOneDay"
              :key="i")
              li {{ site }}
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    sites: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
