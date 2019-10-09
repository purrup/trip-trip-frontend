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
        v-spacer
        search-bar.mr-12(class="ml-8" :width="'480px'" :height="'40px'" :home="false")
        v-btn(
          v-if="!account.isLogin || account.isLogin === 'false'"
          :to="{ path: '/signin', query: { redirect: $route.path} }"
          color="success"
          outlined
        ) 登入
        v-avatar(v-else :style="{ position: 'relative' }" @click="isExpand = !isExpand")
          img(:src="account.avatar" :alt="account.username")
          div(v-if="isExpand" class="dropdown-list-container")
            router-link(tag="div" :to="`/users/${account._id}`")
              v-icon mdi-account-circle
              span 個人資料
            router-link(v-if="account.isAdmin" tag="div" to="/admin")
              v-icon mdi-settings
              span 後台
            div(@click="Logout")
              v-icon mdi-logout
              span 登出
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'navbar',
  components: {
    SearchBar
  },
  data () {
    return {
      isExpand: false
    }
  },
  computed: {
    ...mapState('account', {
      account: state => state
    })
  },
  methods: {
    ...mapActions('account', ['logout']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG']),
    Logout () {
      this.logout()
      this.SET_SUCCESS_MSG('登出成功')
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
    .dropdown-list-container {
      cursor: pointer;
      position: absolute;
      width: 120px;
      background-color: white;
      top: 59px;
      right: -16px;
      > div {
        height: 36px;
        border-bottom: 1px solid lightgray;
        display: flex;
        align-items: center;
        padding-left: 10px;
        > i {
          padding-right: 6px;
        }
      }
    }
  }
}

.custom-select-style {
  position: relative;
  top: 14px;
  margin-left: 26px !important;
  flex-grow: 0 !important;
}

.avatar {
  cursor: pointer;
}

.dropDownMenu {
  position: fixed;
  top: 73px;
  right: 15px;
  z-index: 99;
  border-radius: 5px;
}
</style>
