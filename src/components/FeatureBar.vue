<template lang="pug">
  div(class="feature-bar-root")
    v-app-bar(height="54px" :style="{ 'box-shadow': 'none', 'border-bottom' : '1px solid rgba(102, 102, 102, 0.2)' }")
      v-layout(wrap align-center)
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['1天', '2天', '3天', '4天']"
          :menu-props="{ top: false, offsetY: true }"
          label="天數"
          solo
        )
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['評分數', '評論數', '收藏數']"
          :menu-props="{ top: false, offsetY: true }"
          label="排序"
          solo
        )
        v-spacer
        v-app-bar-nav-icon
</template>

<script>

export default {
}
</script>>

<style lang="scss">
.feature-bar-root {
  position: fixed;
  z-index: 10;
  top: 70px;
  width: 100%;
}
.v-input__control {
  min-height: 32px !important;
  font-size: 14px;
}
.custom-select-style {
  position: relative;
  top: 14px;
  margin-left: 26px !important;
  flex-grow: 0 !important;
}
</style>
