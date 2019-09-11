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
        v-form(
          ref="form"
          v-model="valid"
          lazy-validation
        )
          v-text-field(
            v-model="username"
            :rules="nameRules"
            label="Name"
            prepend-icon="account_circle"
            required
          )
          v-text-field(
            v-model="email"
            :rules="emailRules"
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
            v-model="password"
            :rules="passwordRules"
          )
          v-text-field(
            :type="showPassword ? 'text' : 'password'"
            label="Confirm Password"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            required
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
          )
      v-btn(color="success"
            min-width="380"
            outlined
            large
            @click="submit"
            ) 註冊
      v-col.d-flex.justify-end(cols="auto" offset="7")
        router-link.body-2(to="/signin") 已有帳號，點此登入
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => (v === this.password) || 'Confirm password is not same as password'
      ],
      showPassword: false
    }
  },
  methods: {
    ...mapActions('account', ['signup']),
    submit () {
      if (this.$refs.form.validate()) {
        this.signup({
          username: this.username,
          email: this.email,
          password: this.password
        })
      }
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
