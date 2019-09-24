<template lang="pug">
  .comment-root
    v-row
      v-col(cols="12")
        span 留言({{ comments.length }})
        br
        .comments.mt-5
          template(v-for="(comment, index) in comments")
            comment-card(:comment="comment")
        .comment-textarea
          v-textarea(
            outlined
            name="comment"
            label="留言"
          )
          v-row.d-flex.justify-end(style=" width: 100%;")
            v-btn(
              outlined
            ) 送出
</template>

<script>
import CommentCard from '@/components/trip/CommentCard.vue'

export default {
  name: 'Comment',
  components: {
    CommentCard
  },
  props: {
    comments: Array
  }
}
</script>

<style lang="scss" scoped>
</style>
