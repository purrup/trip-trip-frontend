<template lang="pug">
  v-app
    navbar(v-if="$route.meta.showNavbar")
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
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
p {
  margin: 0px !important;
}
#app {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
