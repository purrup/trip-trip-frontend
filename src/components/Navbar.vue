<template lang="pug">
  div(class="nav-bar-root")
    v-app-bar(height="70px" :style="{ 'box-shadow': 'none', 'border-bottom' : '1px solid rgba(102, 102, 102, 0.2)' }")
      v-layout(wrap align-center)
        router-link.ml-2(to="/" style="text-decoration:none;")
          v-icon(large) mdi-alpha-t-circle-outline
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['1天', '2天', '3天', '4天', '5天']"
          :menu-props="{ top: false, offsetY: true }"
          label="天數"
          solo
          v-if="$route.path ==='/trips' || '/sites' && $route.path !==`/trips/${$route.params.id}`"
        )
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['評分數', '評論數', '收藏數']"
          :menu-props="{ top: false, offsetY: true }"
          label="排序"
          solo
          v-if="$route.path ==='/trips' || '/sites' && $route.path !==`/trips/${$route.params.id}`"
        )
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}`"
          text
          elevation=2
        ) 複製行程
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}`"
          text
          elevation=2
        ) 編輯模式
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}`"
          text
          elevation=2
        ) 日期
        v-switch.ml-8.mt-7(v-model="publish" inset :label="`${privacySetting}`")
        v-spacer
        search-bar.mr-12(class="ml-8" :width="'480px'" :height="'40px'" :home="false")
        v-btn(
          to="/login"
          color="success"
          outlined
        ) 登入
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'navbar',
  components: {
    SearchBar
  },
  data () {
    return {
      publish: false
    }
  },
  computed: {
    privacySetting () {
      return this.publish ? '公開此行程' : '不公開此行程'
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-root {
  width: 100%;
  position: fixed;
  z-index: 100;
}
.custom-select-style {
  position: relative;
  top: 14px;
  margin-left: 26px !important;
  flex-grow: 0 !important;
}
</style>
