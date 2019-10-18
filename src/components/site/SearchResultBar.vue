<template lang="pug">
  div(class="search-result-bar-root")
    template(v-if="resultsAmounts !== 0")
      div
        p {{resultWord}}
        span {{resultsAmounts}}則結果
      v-select(
        v-if="$route.name === 'Sites'"
        label="排序"
        solo
        :style="{ 'width': '110px','flex-grow': '0 !important'} "
        :items="['評分數', '評論數', '收藏數']"
        :menu-props="{ top: false, offsetY: true }"
        @change="sortSites")
      v-select(
        v-else-if="$route.name === 'Trips'"
        label="排序"
        solo
        :style="{ 'width': '110px','flex-grow': '0 !important'} "
        :items="['天數', '景點數', '收藏數']"
        :menu-props="{ top: false, offsetY: true }"
        @change="sortTrips")
    template(v-else)
      h4 沒有任何有關"{{resultWord}}"的結果
</template>

<script>
export default {
  props: {
    resultWord: String,
    resultsAmounts: Number
  },
  methods: {
    sortSites (sortType) {
      if (sortType === '評分數') {
        this.$emit('sortByRating')
      } else if (sortType === '評論數') {
        this.$emit('sortByCommentAmounts')
      } else {
        this.$emit('sortByCollectingCounts')
      }
    },
    sortTrips (sortType) {
      if (sortType === '天數') {
        this.$emit('sortByDays')
      } else if (sortType === '景點數') {
        this.$emit('sortBySitesAmounts')
      } else {
        this.$emit('sortByCollectingCounts')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result-bar-root {
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > p {
      font-size: 32px;
      line-height: 32px;
    }
    > span {
      font-size: 16px;
      line-height: 16px;
      padding-bottom: 8px;
      color: #666666;
    }
  }
}
</style>
