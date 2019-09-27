<template lang="pug">
  .comment-root
    v-row
      v-col(cols="12")
        span 留言({{ comments.length }})
        br
        .comments.mt-5
          template(v-for="(comment, index) in comments")
            comment-card(
              :comment="comment"
              :tripId="tripId"
              @confirmDelete="confirmDelete")
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
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Comment',
  components: {
    CommentCard
  },
  props: {
    tripId: String,
    comments: Array
  },
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    ...mapMutations('trip', ['ADD_comment', 'DELETE_comment']),
    ...mapActions('trip', ['addComment', 'deleteComment']),
    checkAtLeastOneWord () {
      if (this.comment === '') {
        return
      }
      this.addComment({ tripId: this.tripId, text: this.comment })
        .then((data) => {
          (this.$route.name === 'Trips')
            ? this.comments.unshift(data)
            : this.ADD_comment(data)
        })
        .then(() => { this.comment = '' })
    },
    confirmDelete ({ tripId, commentId }) {
      this.deleteComment({ tripId, commentId })
        .then(() => {
          if (this.$route.name === 'Trips') {
            const index = this.comments.findIndex(comment => comment.id === commentId)
            this.comments.splice(index, 1)
          } else {
            this.DELETE_comment(commentId)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
