<template lang="pug">
  v-card#signup.mx-auto.my-auto.d-flex.flex-wrap.justify-center(
    width="560"
    max-width="560"
    tile
    height="650")
    v-col.d-flex.flex-wrap.justify-center.align-content-space-around(
      cols="12"
      md="10"
      )
      v-card-title Signup
      v-card-text
        v-form
          v-text-field(
            label="Name"
            prepend-icon="account_circle"
            required
          )
          v-text-field(
            label="E-mail"
            prepend-icon="email"
            required
          )
          v-text-field(
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="lock"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          @click:append="showPassword = !showPassword"
          required
          )
          v-text-field(
          :type="showPassword ? 'text' : 'password'"
          label="Confirm Password"
          prepend-icon="lock"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          @click:append="showPassword = !showPassword"
          required
          )
      v-btn(color="success"
            min-width="380"
            outlined
            large) 註冊
      v-col.d-flex.justify-end(cols="auto" offset="7")
        router-link.body-2(:to="{ name: 'Login'}") 已有帳號，點此登入
</template>

<script>
export default {
  data () {
    return {
      showPassword: false
    }
  }
}
</script>

<style lang="scss" scoped>
 #signup {
   border: 1px solid rgba($color: #707070, $alpha: 0.4);
   border-radius: 20px;
 }

</style>
