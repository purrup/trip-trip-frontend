<template lang="pug">
  div(id="user-root")
    user-profile(
      :user="user"
      :isMyself="checkMyself"
      @changeAvatar="changeAvatar"
      @onEditMode="isOnEditMode = true")
    div(class="record-container")
      div(v-if="user.collectingSites.length !== 0")
        h5 {{user.username}}收藏的景點
        div
          little-card(
            v-for="site in user.collectingSites.slice(indexs.idx1, equalOrLess2(user.collectingSites.length) + indexs.idx1)"
            :key="`little-card-${site.name}`"
            :item="site"
            :type="'site'")
        v-icon(@click="back('idx1')") arrow_back_ios
        v-icon(@click="forward('idx1', user.collectingSites.length)") arrow_forward_ios
      div(v-if="user.owningTrips.length !== 0")
        h5 {{user.username}}建立的行程
        div
          ittle-card(
            v-for="trip in user.owningTrips"
            :key="`little-card-${trip.name}`"
            :item="trip"
            :type="'trip'")
        v-icon(@click="back('idx2')") arrow_back_ios
        v-icon(@click="forward('idx2', user.owningTrips.length)") arrow_forward_ios
      div(v-if="user.collectingTrips.length !== 0")
        h5 {{user.username}}收藏的行程
        div
          little-card(
            v-for="trip in user.collectingTrips.slice(indexs.idx3, equalOrLess2(user.collectingTrips.length) + indexs.idx3)"
            :key="`little-card-${trip.name}`"
            :item="trip"
            :type="'tirp'")
        v-icon(@click="back('idx3')") arrow_back_ios
        v-icon(@click="forward('idx3', user.collectingTrips.length)") arrow_forward_ios
    div(v-if="isOnEditMode" class="edit-container")
      v-card(min-width="400")
        h4 編輯你的個人資料
        v-form(
          ref="form"
          @submit.prevent="confirm"
          v-model="valid"
          lazy-validation)
          v-text-field(
            v-model="user.username"
            :rules="usernameRules"
            label="Name"
            required
            outlined)
          v-textarea(
            v-model="user.introduction"
            :rules="introductionRules"
            name="introduction"
            label="Introduction"
            outlined)
          div(class="btn-group")
            v-btn(type="submit" color="#009499" ) 確定
            v-btn(@click="cancel" color="error") 取消
</template>

<script>
import UserProfile from '@/components/user/UserProfile.vue'
import LittleCard from '@/components/LittleCard.vue'

import userApis from '@/utils/apis/user.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { mergeSites } from '@/utils/apis/site.js'

export default {
  components: {
    UserProfile,
    LittleCard
  },
  data () {
    return {
      user: {
        collectingTrips: [],
        collectingSites: [],
        owningTrips: []
      },
      indexs: {
        idx1: 0,
        idx2: 0,
        idx3: 0
      },
      isOnEditMode: false,
      valid: true,
      originUsername: '',
      originIntroduction: '',
      usernameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      introductionRules: [
        v => (v.length <= 100) || 'Name must be less than 100 characters'
      ]
    }
  },
  async created () {
    const { data } = await userApis.getUserProfile(this.$route.params.id)
    data.collectingSites = mergeSites(data.collectingSites)
    this.user = data
  },
  computed: {
    ...mapGetters('account', {
      accountId: 'getAccountId'
    }),
    checkMyself () {
      return this.user._id === this.accountId
    }
  },
  methods: {
    ...mapMutations('account', ['SET_avatar']),
    ...mapActions('account', ['editProfile']),
    equalOrLess2 (length) {
      return length >= 2 ? 2 : length
    },
    back (index) {
      return (this.indexs[index] - 1) < 0
        ? 0
        : this.indexs[index]--
    },
    forward (index, length) {
      return (this.indexs[index] + 1) > (length - this.equalOrLess2(length))
        ? 0
        : this.indexs[index]++
    },
    changeAvatar (avatar) {
      this.user.avatar = URL.createObjectURL(avatar)
      this.SET_avatar(this.user.avatar)
    },
    confirm () {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('username', this.user.username)
        formData.append('introduction', this.user.introduction)
        this.editProfile(formData)
        this.isOnEditMode = false
      }
    },
    cancel () {
      this.user.username = this.originUsername
      this.user.introduction = this.originIntroduction
      this.isOnEditMode = false
    }
  },
  watch: {
    isOnEditMode (newValue) {
      if (newValue) {
        this.originUsername = this.user.username
        this.originIntroduction = this.user.introduction
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#user-root {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 140px 400px 145px 1fr 209px;
  grid-template-areas: ". profile . items .";
  .user-profile-root {
    grid-area: profile;
  }
  .record-container {
    grid-area: items;
    > div {
      position: relative;
      > h5 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      > div {
        margin-left: 30px;
        display: grid;
        grid-auto-columns: 250px;
        grid-auto-rows: 210px;
        grid-auto-flow: column;
        grid-column-gap: 15px;
      }
      i {
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        &:nth-child(3) {
          left: 0px;
        }
        &:nth-child(4) {
          right: -38px;
        }
      }
    }
  }
  .edit-container {
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background-color: rgba($color: #000000, $alpha: 0.7);
    > div {
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      > h4 {
        margin-bottom: 20px;
      }
      .btn-group {
        display: flex;
        justify-content: flex-end;
        button:nth-child(1) {
          margin-right: 10px;
          color: white;
        }
      }
    }
  }
}
</style>
