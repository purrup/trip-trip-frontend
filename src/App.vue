<template lang="pug">
  v-app#app
    navbar(v-if="!$route.meta.hideNavbar")
    router-view
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>>

<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
#app {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
