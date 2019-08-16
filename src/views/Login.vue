<template lang="pug">
  v-container.my-auto
    v-row(justify="center"
          align="center")
      v-col#login(
        cols="12"
        sm="10"
        md="8"
        lg="8"
        )
          .display-1.my-12 Login
          #google-btn
            v-btn.my-5(
              color="error"
              outlined
              elevation="0") google
          #facebook-btn
            v-btn.my-5.mb-12(
              color="info"
              outlined
              elevation="0") facebook
            v-divider.mt-5.mx-auto
          v-row#input-area.mt-5(justify="center")
            v-col(
              cols="12"
              sm="8"
              md="8"
            )
              v-form
                v-text-field.my-7(
                  label="E-mail"
                  prepend-icon="email"
                  required
                )
                v-text-field.mb-7(
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="lock"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                @click:append="showPassword = !showPassword"
                )

              v-btn.mt-6(
              color="success"
              outlined
            ) 登入
              v-col.d-flex.flex-row.justify-end.mt-12(cols="auto")
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
   border: 1px solid rgba($color: #707070, $alpha: 0.8);
   border-radius: 20px;
   height: 820px;
   max-width: 560px;
 }
#input-area, #input-area > * {
  height: 50%;
}

 button {
   width: 340px;
   text-transform:capitalize;
 }

 hr {
   width: 430px;
 }
</style>
