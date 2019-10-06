<template lang="pug">
  v-snackbar.notification(
    v-model="showNotification"
    top
    right
    :color="color"
    :timeout="timeout"
  )
    //- @close will be called whether snackbar is timed-out or is manually closed
    p.message {{ message }}
    v-btn(
      icon
      @click.native="DELETE_MESSAGE"
    )
      v-icon mdi-close
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'notification',
  props: {
    successMsg: String,
    errorMsg: String
  },
  data () {
    return {
      timeout: 0
    }
  },
  computed: {
    ...mapState('notification', {
      showNotification: state => state.showNotification
    }),
    color () {
      return this.successMsg ? 'success' : 'error'
    },
    message () {
      return this.successMsg ? this.successMsg : this.errorMsg
    }
  },
  methods: {
    ...mapMutations('notification', ['DELETE_MESSAGE'])
  },
  watch: {
    showNotification (newValue) {
      // v-snackbar預設timeout是6000，6s過後showNotification不會自動變false，仍維持true
      // 因此timeout為0取消掉預設的自動消失，改用watch去改變showNotification和清空msg
      if (newValue === true) {
        setTimeout(() => {
          this.DELETE_MESSAGE()
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  font-size: 1.2em;
}
</style>
