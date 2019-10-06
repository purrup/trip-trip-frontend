<template lang="pug">
  v-app
    navbar(v-if="$route.meta.showNavbar")
    router-view
    Notification(
      :successMsg="successMsg"
      :errorMsg="errorMsg"
    )
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Notification
  },
  computed: {
    ...mapState('notification', {
      successMsg: state => state.successMsg,
      errorMsg: state => state.errorMsg
    })
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
