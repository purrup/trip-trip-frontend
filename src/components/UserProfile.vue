<template lang="pug">
  div(class="user-profile-root")
    div
      v-avatar(size="100")
        img(src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John")
      span(v-if="account._id === user._id") 更改相片
    div
      h3 嗨！我是{{user.username}}
      p {{user.introduction}} dwqdqdqdqwdwdwqddqdqdqw
    div
      div
        v-icon email
        p {{user.email}}
      div
        v-icon today
        p 已建立{{user.ownedTrips.length}}個行程
      div
        v-icon(color="red") favorite
        p 已收藏{{user.collectedTrips.length}}個行程
      div
        v-icon(color="#FB9026") emoji_events
        p 行程已被收藏{{10}}次
      div(v-if="account._id === user._id")
        span 編輯個人資料
    span 加入時間: &nbsp 2019/09/20
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    user: Object
  },
  computed: {
    ...mapState('account', {
      account: state => state
    })
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
    > span {
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
        color: #008489;
        text-decoration: underline;
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
