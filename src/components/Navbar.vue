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
          v-else-if="$route.name === 'Trips' || $route.name === 'Sites' "
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['評分數', '評論數', '收藏數']"
          :menu-props="{ top: false, offsetY: true }"
          label="排序"
          solo
        )
        v-btn.ml-8(
          v-if="$route.path ===`/trips/${$route.params.id}` && trip.userId !== account._id"
          text
          elevation=2
          @click="fork()"
        ) 複製行程
        v-btn.ml-8(
          v-else-if="$route.path ===`/trips/${$route.params.id}` && !isOnEditMode && trip.userId === account._id"
          @click="toggleEditMode"
          text
          elevation=2
        ) 編輯模式
        .edit-buttons.d-flex.flex-nowrap.align-center(
          v-if="isOnEditMode"
        )
          v-btn.ml-8(
            text
            elevation=2
            @click="toggleEditMode"
          ) 編輯完成
          v-btn.ml-8(
            text
            elevation=2
          ) 上傳照片
            v-icon.ml-2(left) mdi-cloud-upload-outline
          v-switch.ml-10.mt-7(
            v-model="publish"
            inset
            :label="`${privacySetting}`")
          v-btn.ml-6(
            text
            icon
          )
            v-icon mdi-trash-can-outline
        v-spacer
        search-bar.mr-12(class="ml-8" :width="'480px'" :height="'40px'" :home="false")
        v-btn(
          v-if="!account.isLogin || account.isLogin === 'false'"
          :to="{ path: '/signin', query: { redirect: $route.path} }"
          color="success"
          outlined
        ) 登入
        v-avatar.avatar(
          v-else-if="account.isLogin && account.avatar")
          img(
            :src="account.avatar"
            alt="account.name"
          )
        v-avatar.avatar(
          v-else-if="account.isLogin && !account.avatar"
          color="grey lighten-3")
          v-btn(
            icon
            @click="showDropDownMenu = !showDropDownMenu"
          ) {{account.name}}
            v-sheet.dropDownMenu(
              v-show="showDropDownMenu"
              height=auto
              width=auto
              color="grey lighten-3")
              v-list
                v-list-item(
                  tag="a"
                  :to="{ path: `/users/${account._id}` }"
                )
                  v-list-item-icon(style="margin-right: 10px;")
                    v-icon(v-text="'mdi-account-circle'")
                  v-list-item-content
                    v-list-item-title(v-text="'個人檔案'")
                v-list-item(
                  v-if="account.isAdmin"
                  tag="a"
                  :to="{ path: `/admin` }"
                )
                  v-list-item-icon(style="margin-right: 10px;")
                    v-icon(v-text="'mdi-settings'")
                  v-list-item-content
                    v-list-item-title(v-text="'後台管理'")
                v-list-item(
                  tag="a"
                  :to="{ path: `/logout` }"
                )
                  v-list-item-icon(style="margin-right: 10px;")
                    v-icon(v-text="'mdi-logout'")
                  v-list-item-content
                    v-list-item-title(v-text="'登出'")
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'navbar',
  components: {
    SearchBar
  },
  data () {
    return {
      publish: false,
      showDropDownMenu: false
    }
  },
  computed: {
    ...mapState('account', {
      account: state => state
    }),
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode
    }),
    privacySetting () {
      return this.publish ? '公開此行程' : '不公開此行程'
    }
  },
  methods: {
    ...mapActions('trip', ['forkTrip']),
    ...mapMutations('trip', ['TOGGLEEDITMODE']),
    fork () {
      this.forkTrip(this.trip._id)
    },
    toggleEditMode () {
      this.TOGGLEEDITMODE()
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
