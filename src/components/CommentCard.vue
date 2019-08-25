<template lang="pug">
  #comment-card-root.mb-5
    v-card(
      width="550"
      min-width="456"
      min-height="120"
      outlined
      flat
    )
      v-row.d-flex.flex-wrap.justify-md-space-between
        v-col.mt-1(
          cols="2"
        )
          v-avatar.mx-3(
            style=" border-radius: 50%; "
            size=50
            left
            )
            img(:src="comment.userAvatar" alt="avatar")
        v-col.mr-12.mt-1(
          cols="8"
        )
          v-row
            .title.pr-5 {{ comment.userName }}
            span(style=" line-height: 33px; ") {{ comment.date }}
          v-row.mt-5
            p {{ comment.text }}

</template>

<script>
export default {
  name: 'CommentCard',
  props: {
    comment: Object
  }
}
</script>

<style lang="scss" scoped>
#comment-card-root > div {
  border-radius: 7px;
}
</style>
