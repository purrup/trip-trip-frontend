<template lang="pug">
  div(class="navbar-root")
    div(class="margin-top-space")
    v-app-bar(class="navbar-container" height="70px")
      v-layout(wrap align-center)
        router-link.ml-2(to="/" style="text-decoration:none;")
          v-icon(large) mdi-alpha-t-circle-outline
        v-select(
          v-if="$route.name === 'Trips'"
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['1天', '2天', '3天', '4天', '5天']"
          :menu-props="{ top: false, offsetY: true }"
          label="天數"
          solo
        )
        v-select(
          v-if="$route.name === 'Trips' || $route.name === 'Sites' "
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['評分數', '評論數', '收藏數']"
          :menu-props="{ top: false, offsetY: true }"
          label="排序"
          solo
        )
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}`"
          text
          elevation=2
        ) 複製行程
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}` && $route.path.includes('edit')"
          text
          elevation=2
        ) 編輯模式
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}` && $route.path.includes('edit')"
          text
          elevation=2
        ) 日期
        v-switch.ml-8.mt-7(
          v-if="$route.path ===`/trips/${$route.params.id}` && $route.path.includes('edit')"
          v-model="publish"
          inset
          :label="`${privacySetting}`")
        v-spacer
        search-bar.mr-12(class="ml-8" :width="'480px'" :height="'40px'" :home="false")
        v-btn(
          v-if="!account.isLogin"
          to="/signin"
          color="success"
          outlined
        ) 登入
        v-avatar(v-else)
          router-link(tag="img" :to="`/users/${account._id}`" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John")
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { mapState } from 'vuex'

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
    ...mapState('account', {
      account: state => state
    }),
    privacySetting () {
      return this.publish ? '公開此行程' : '不公開此行程'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-root {
  .margin-top-space {
    width: 100vw;
    height: 70px;
  }
  .navbar-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0px;
    z-index: 100;
    box-shadow: none;
    border-bottom: 1px solid rgba(102, 102, 102, 0.2);
  }
}

.custom-select-style {
  position: relative;
  top: 14px;
  margin-left: 26px !important;
  flex-grow: 0 !important;
}
</style>
