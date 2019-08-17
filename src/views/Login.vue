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
              min-width="380") google
            v-btn.mt-7(
              color="info"
              outlined
              large
              min-width="380") facebook
          v-divider.my-8.mx-auto
          v-form
            v-text-field.my-3(
              label="E-mail"
              prepend-icon="email"
              required
            )
            v-text-field.mb-3(
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            required
            )

          v-btn.mt-6(
          color="success"
          outlined
          large
          min-width="380"
        ) 登入
          v-col.d-flex.justify-end.mt-12(cols="auto")
            router-link.body-2.mr-5(:to="{ name: 'Signup'}") 註冊帳號
            router-link.body-2(:to="{ name: 'Signup'}") 忘記密碼？

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
  text-transform:capitalize;
}

hr {
  width: 430px;
}
</style>
