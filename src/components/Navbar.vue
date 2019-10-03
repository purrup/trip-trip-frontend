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
            @click="editComplete"
          ) 編輯完成
          v-btn.ml-8(
            text
            elevation=2
            @click="showEditImage = true"
          ) 上傳照片
            v-icon.ml-2(left) mdi-cloud-upload-outline
          v-dialog(
            v-model="showEditImage"
            width=600
            height=500
            persistent
          )
            v-card
              v-card-title.justify-center 上傳照片至概覽
              div(class="container")
                v-file-input(
                  type="file"
                  ref="file"
                  chips
                  multiple
                  label="上傳一個/多個檔案"
                  @change="uploadTripImages"
                )
              v-card-actions
                .flex-grow-1
                .btnGroup.mb-3
                  v-btn(
                    color="info"
                    @click="showEditImage = false"
                    ) 確定
                  v-btn.mx-5(
                    color="error"
                    @click="showEditImage = false") 取消
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
        v-avatar(v-else :style="{ position: 'relative' }" @click="isExpand = !isExpand")
          img(:src="account.avatar" :alt="account.username")
          div(v-if="isExpand" class="dropdown-list-container")
            router-link(tag="div" :to="`/users/${account._id}`")
              v-icon mdi-account-circle
              span 個人資料
            router-link(v-if="account.isAdmin" tag="div" to="/admin")
              v-icon mdi-settings
              span 後台
            div(@click="logout")
              v-icon mdi-logout
              span 登出
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
      isExpand: false,
      showEditImage: false,
      files: null
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
    ...mapActions('account', ['logout']),
    ...mapActions('trip', ['forkTrip', 'updateTrip']),
    ...mapMutations('trip', ['TOGGLE_isOnEditMode', 'CHANGE_IMAGES_OF_OVERVIEW']),
    fork () {
      this.forkTrip(this.trip._id)
    },
    toggleEditMode () {
      this.TOGGLE_isOnEditMode()
    },
    uploadTripImages (files) {
      const formData = new FormData()
      let previewImages = []
      files.forEach(image => {
        formData.append('images', image)
        previewImages.push(URL.createObjectURL(image))
      })
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      // 即時預覽上傳圖片
      // 放在updateTrip之後以免傳blob出去
      this.CHANGE_IMAGES_OF_OVERVIEW(previewImages)
    },
    editComplete () {
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      this.TOGGLE_isOnEditMode()
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
