<template lang="pug">
  div(class="daily-activity-root")
    div(@click="isExpand = !isExpand")
      v-icon {{isExpand ? 'arrow_drop_down' : 'arrow_drop_up' }}
      span Day {{day}}
      v-spacer
      v-icon(@click="$emit('deleteOneDay')") close
    draggable(
      tag="div"
      class="dragAreas"
      group="sites"
      :list="activities"
      @add="add")
      template(v-if="isExpand")
        rating-favorite(
           v-for="(site, index) in activities"
          :key="site.name + index"
          :item="site"
          :type="'site'"
          class="storage-site")
          div(slot="cancel" class="cancel-wrap")
            v-icon(@click="deleteSite(site, index)") close
</template>

<script>
import draggable from 'vuedraggable'
import RatingFavorite from '@/components/RatingFavorite.vue'

export default {
  components: {
    draggable,
    RatingFavorite
  },
  props: {
    activities: Array,
    day: Number
  },
  data () {
    return {
      isExpand: false
    }
  },
  methods: {
    add (e) { // Element is dropped into the list "from another" list
      this.isExpand = true
    },
    deleteSite (site, index) {
      // console.log(site.placeId)
      this.activities.splice(index, 1)
      this.$emit('deleteOneSite', { name: site.name, placeId: site.placeId })
    }
  }
}
</script>

<style lang="scss" scoped>
.daily-activity-root {
  width: 100%;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    border: 1px solid black;
    i:nth-child(1) {
      padding-right: 6px;
    }
    i:last-child {
      font-size: 20px;
    }
    &:hover {
      background-color: darkgrey;
    }
  }
  > .dragAreas {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    .storage-site {
      display: flex;
      margin: 5px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 3px 35px;
      cursor: grab;
      &::v-deep .favorite-icon {
        right: 8px;
        top: 12px;
      }
    }
    .cancel-wrap {
      width: 32px;
      height: 50px;
      position: absolute;
      top: 0px;
      left: 0px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      background-color: burlywood;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &::v-deep .site-card-root {
      width: 241px !important;
      .site-info-wrapper {
        display: none !important;
      }
    }
  }
}
</style>
