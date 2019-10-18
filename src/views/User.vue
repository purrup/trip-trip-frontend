<template lang="pug">
  div(id="user-root")
    user-profile(
      :user="user"
      :isMyself="checkMyself"
      @changeAvatar="changeAvatar"
      @onEditMode="isOnEditMode = true")
    div(class="record-container")
      record-scroll-container(
        v-if="user.collectingSites.length !== 0"
        :username="user.username"
        :items="user.collectingSites"
        :type="'site'")
      record-scroll-container(
        v-if="user.owningTrips.length !== 0"
        :username="user.username"
        :items="user.owningTrips"
        :type="'trip'")
      record-scroll-container(
        v-if="user.collectingTrips.length !== 0"
        :username="user.username"
        :items="user.collectingTrips"
        :type="'trip'")
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
import RecordScrollContainer from '@/components/user/RecordScrollContainer.vue'
import LittleCard from '@/components/LittleCard.vue'

import userApis from '@/utils/apis/user.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { mergeSites } from '@/utils/apis/site.js'

export default {
  components: {
    UserProfile,
    LittleCard,
    RecordScrollContainer
  },
  data () {
    return {
      user: {
        collectingTrips: [],
        collectingSites: [],
        owningTrips: []
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
  grid-template-columns: 9% 27% 8% 1fr 209px;
  grid-template-areas: ". profile . items .";
  .user-profile-root {
    grid-area: profile;
  }
  .record-container {
    grid-area: items;
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
