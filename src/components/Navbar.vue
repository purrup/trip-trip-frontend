<template lang="pug">
  div(class="nav-bar-root")
    v-app-bar(height="70px" :style="{ 'box-shadow': 'none', 'border-bottom' : '1px solid rgba(102, 102, 102, 0.2)' }")
      v-layout(wrap align-center)
        router-link.ml-2(to="/" style="text-decoration:none;")
          v-icon(large) mdi-alpha-t-circle-outline
        search-bar(class="ml-8" :width="'376px'" :height="'40px'")
        v-spacer
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
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-root {
  width: 100%;
  position: fixed;
  z-index: 100;
}
</style>
