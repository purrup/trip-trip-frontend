<template lang="pug">
  .comment-root
    v-row
      v-col(cols="12")
        span 留言({{ comments.length }})
        br
        .comments.mt-5
          template(v-for="(comment, index) in comments")
            comment-card(:comment="comment")
        .comment-textarea(style="width: 450px;")
          v-textarea(
            v-model="comment"
            outlined
            name="comment"
            label="留言")
          v-row.d-flex.justify-end(style=" width: 100%;")
            v-btn(
              outlined
              @click="checkAtLeastOneWord") 送出
</template>

<script>
import CommentCard from '@/components/trip/CommentCard.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Comment',
  components: {
    CommentCard
  },
  props: {
    comments: Array
  },
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    ...mapActions('trip', ['addComment']),
    checkAtLeastOneWord () {
      if (this.comment === '') {
        console.log('comment', this.comment)
        return
      }
      this.addComment(this.comment)
        .then(() => { this.comment = '' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
