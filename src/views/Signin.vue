<template lang="pug">
    v-card#login.mx-auto.my-auto.d-flex.flex-wrap.justify-center(
    width="560"
    max-width="560"
    tile
    height="650")
      v-col.d-flex.flex-wrap.justify-center.align-content-space-around(
        cols="12"
        sm="10"
        md="10"
        )
        v-card-title Login
        v-card-text
          #third-party-btn.d-flex.flex-column.flex-wrap.justify-center.align-content-space-around
            v-btn(
              color="error"
              outlined
              large
              min-width="380"
              @click="googleLogin"
            ) google
            v-btn.mt-7(
              color="info"
              outlined
              large
              min-width="380"
              @click="facebookLogin"
            ) facebook
          v-divider.my-8.mx-auto
          v-form(
            ref="form"
            v-model="valid"
            lazy-validation
          )
            v-text-field.my-3(
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              prepend-icon="email"
              required
            )
            v-text-field.mb-3(
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              prepend-icon="lock"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
              required
            )
        v-btn(
          color="success"
          outlined
          large
          min-width="380"
          @click="submit"
        ) 登入
        v-col.d-flex.justify-end.mt-12(cols="auto")
          router-link.body-2.mr-5(to="/signup") 註冊帳號
          router-link.body-2(to="/signup'}") 忘記密碼？

</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'Password must be more than 6 characters'
      ],
      showPassword: false
    }
  },
  methods: {
    ...mapActions('account', ['signin']),
    async submit () {
      try {
        if (this.$refs.form.validate()) {
          await this.signin({
            email: this.email,
            password: this.password
          })
          this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/')
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log('密碼錯')
        } else {
          console.log(error.response)
        }
      }
    },
    facebookLogin () {
      window.location = 'http://localhost:3000/facebook'
    },
    googleLogin () {
      window.location = 'http://localhost:3000/google'
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  border: 1px solid rgba($color: #707070, $alpha: 0.4);
  border-radius: 20px;
  height: 720px;
  max-width: 560px;
}
// #input-area, #input-area > * {
//   height: 50%;
// }

button {
  width: 340px;
  text-transform: capitalize;
}

hr {
  width: 430px;
}
</style>
