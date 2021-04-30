<template lang="pug">
  div(class="navbar-root")
    div(class="margin-top-space")
    v-app-bar(class="navbar-container" height="70px")
      v-layout(wrap align-center :style="{ position: 'relative' }")
        router-link.ml-2(to="/" style="text-decoration:none;")
          v-icon(large) mdi-alpha-t-circle-outline
        v-btn.ml-6(
          text
          height=70
          @click="createNewTrip"
        ) 建立行程
        v-spacer
        search-bar.mr-12(class="ml-8" :width="'480px'" :height="'40px'" :home="false")
        v-btn(
          v-if="!account.isLogin || account.isLogin === 'false'"
          :to="{ path: '/signin', query: { redirect: $route.path} }"
          color="success"
          outlined
        ) 登入
        v-avatar(v-else
        @click="isExpand = !isExpand"
        class="avatar")
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
      account: state => state,
      isLogin: state => state.isLogin
    })
  },
  methods: {
    ...mapMutations('account', ['CREATE_trip']),
    ...mapActions('account', ['logout']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    ...mapActions('trip', ['createTrip']),
    Logout () {
      this.logout()
      this.SET_SUCCESS_MSG('登出成功')
    },
    async createNewTrip () {
      if (this.account.isLogin === true) {
        const formData = new FormData()
        const basicFormat = {
          name: this.account.username + '的快樂之旅',
          country: '臺灣',
          cities: ['台北'],
          contents: [
            {
              activities: [
                {
                  placeId: 'ChIJraeA2rarQjQRPBBjyR3RxKw',
                  cost: 0,
                  startTime: Date.now(),
                  endTime: Date.now()
                }
              ],
              note: ''
            }
          ],
          sites: [
            ['台北101']
          ]
        }
        formData.append('data', JSON.stringify(basicFormat))
        const trip = await this.createTrip(formData)
        console.log(trip)
        this.CREATE_trip(trip)
        this.$router.push(`/trips/${trip._id}`)
        this.SET_SUCCESS_MSG(`可以開始編輯您的行程：${trip.name}`)
      } else {
        this.SET_ERROR_MSG('請先登入或註冊帳號喔')
      }
    }
  },
  watch: {
    isLogin (newValue) {
      if (newValue === false) {
        this.$router.go(0)
      }
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
      width: 130px;
      background-color: white;
      top: 65px;
      right: -12px;
      border-radius: 3px;
      border: 1px solid #edeaea;
      padding: 5px 0;
      > :first-child {
        border-bottom: 1px solid lightgray;
      }
      > div {
        height: 36px;
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
