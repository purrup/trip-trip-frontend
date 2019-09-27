<template lang="pug">
  div(class="user-profile-root")
    div
      v-avatar(size="100")
        img(:src="user.avatar" alt="John")
      input(v-if="isMyself"
        type="file"
        id="avatar"
        @change="uploadAvatar")
      label(for="avatar") 更改相片
    div
      h3 嗨！我是{{user.username}}
      p {{user.introduction}}
    div
      div
        v-icon email
        p {{user.email}}
      div
        v-icon today
        p 已建立{{user.owningTrips.length}}個行程
      div
        v-icon(color="red") favorite
        p 已收藏{{user.collectingTrips.length}}個行程
      div
        v-icon(color="#FB9026") emoji_events
        p 行程已被收藏{{10}}次
      div(v-if="isMyself")
        button(@click="$emit('onEditMode')") 編輯個人資料
    span 加入時間: &nbsp 2019/09/20
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    user: Object,
    isMyself: Boolean
  },
  methods: {
    ...mapActions('account', ['editProfile']),
    uploadAvatar (e) {
      // Manually change avatar first, since the response have to wait for a long time
      const avatar = e.target.files[0]
      this.$emit('changeAvatar', avatar)

      const formData = new FormData()
      formData.append('image', avatar)
      this.editProfile(formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile-root {
  padding: 20px 28px;
  border: 1px solid rgba($color: #666666, $alpha: 0.2);
  border-radius: 4px;
  position: relative;
  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba($color: #666666, $alpha: 0.2);
    margin-bottom: 20px;
    #avatar {
      display: none;
    }
    > label {
      cursor: pointer;
      margin: 26px 0 13px 0;
      text-decoration: underline;
    }
  }
  > div:nth-child(2) {
    margin-bottom: 20px;
    border-bottom: 1px solid rgba($color: #666666, $alpha: 0.2);
    h3 {
      font-size: 35px;
      font-weight: 500;
      padding-bottom: 20px;
    }
    p {
      padding-bottom: 13px;
      word-break: break-word;
    }
  }
  > div:nth-child(3) {
    display: grid;
    grid-row-gap: 28px;
    div {
      display: flex;
      p {
        padding-left: 6px;
      }
      &:nth-child(5) {
        > button {
          background-color: #009499;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          outline: none;
        }
      }
    }
  }
  > span:nth-child(4) {
    position: absolute;
    right: 6px;
    bottom: 6px;
    font-size: 12px;
    color: grey;
  }
}
</style>
