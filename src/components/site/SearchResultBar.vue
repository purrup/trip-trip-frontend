<template lang="pug">
  div(class="search-result-bar-root")
    template(v-if="sitesAmounts !== 0")
      div
        p {{resultWord}}
        span {{sitesAmounts}}則結果
      v-select(
        label="排序"
        solo
        :style="{ 'width': '110px','flex-grow': '0 !important'} "
        :items="['評分數', '評論數', '收藏數']"
        :menu-props="{ top: false, offsetY: true }"
        @change="click")
    template(v-else)
      h4 沒有任何有關"{{resultWord}}"的結果
</template>

<script>
export default {
  props: {
    resultWord: String,
    sitesAmounts: Number
  },
  methods: {
    click (sortType) {
      if (sortType === '評分數') {
        this.$emit('sortByRating')
      } else if (sortType === '評論數') {
        this.$emit('sortByCommentAmounts')
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
