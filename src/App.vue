<template lang="pug">
  div(id="app")
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
  height: 100%;
  color: black;
}
</style>
