<template lang="pug">
  .comment-card-root.mb-5
    v-card(
      width="450"
      min-width="250"
      min-height="70"
      outlined
      flat)
      .d-flex.flex-row.align-center
        .d-flex.flex-row.align-center.mt-2
          v-avatar(size=60)
              img(
                v-if="comment.userAvatar"
                :src="comment.userAvatar"
                alt="avatar")
              v-icon(
                v-else="!comment.userAvatar"
                large) mdi-account-circle
          .userInfo
            .headline.pr-5 {{ comment.userName }}
            span.grey--text.caption {{ comment.date }}
        .reply
          v-card-text.mx-4.mr-4(
            style="color: rgba(0, 0, 0, 0.85); font-size: medium; "
            v-if="!commentEdit") {{ comment.text }}
          v-textarea.ml-5.mt-3(
            style="width: 150px;"
            v-else-if="commentEdit"
            v-model="revisedComment"
            auto-grow
            autofocus
            row-height=12
            label="編輯留言"
            rows=1)
        .card-actions.d-flex.flex-row.align-center.justify-end
          v-card-actions
            v-btn(
              text
              v-if="comment.userId === account._id && !commentEdit"
              @click=" commentEdit = !commentEdit"
            ) 編輯
            v-btn(
              text
              v-else-if="comment.userId === account._id && commentEdit"
              @click="editCompleted(revisedComment, comment.id)"
            ) 編輯完成
            v-btn(
              text
              v-if="comment.userId === account._id && !commentEdit"
              @click="deleteComment(comment.id)"
            ) 刪除
            v-btn(
              v-if="comment.replies"
              icon
              @click="showReply = !showReply")
              v-icon reply {{ showReply ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
    v-expand-transition
      div.mt-3(v-show="showReply")
        .reply.d-flex.flex-row.align-center.justify-end.mr-11
          v-card(
            v-for="(reply, i) in comment.replies"
            :key="i"
            width="350"
            min-height="70"
            outlined
            flat)
            .d-flex.flex-row.align-center
              .d-flex.flex-row.align-center.mt-2
                v-avatar(size=60)
                    img(
                      v-if="reply.userAvatar"
                      :src="reply.userAvatar"
                      alt="avatar")
                    v-icon(
                      v-else="!reply.userAvatar"
                      large) mdi-account-circle
                .userInfo
                  .headline.pr-5 {{ reply.userName }}
                  span.grey--text.caption {{ reply.date }}
              .reply
                v-card-text.mx-4(
                  style="color: rgba(0, 0, 0, 0.85); font-size: medium; "
                  ) {{ reply.text }}
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import userApis from '@/utils/apis/user.js'

export default {
  name: 'CommentCard',
  props: {
    comment: Object
  },
  data () {
    return {
      showReply: false,
      revisedComment: '',
      commentEdit: false
    }
  },
  methods: {
    ...mapActions('trip', ['reviseComment', 'deleteComment']),
    editCompleted (text, commentId) {
      if (text === '') {
        return
      }
      this.commentEdit = !this.commentEdit
      this.reviseComment({ text, commentId })
        .then(() => { this.revisedComment = '' })
    }
    // getUserAvatar (id) {
    //   return userApis.getUser(id).avatar
    // },
  },
  computed: {
    ...mapState('account', {
      account: state => state
    })
  }
}
</script>

<style lang="scss" scoped>
.comment-card-root > div {
  border-radius: 7px;
  .userInfo {
    min-width: 110px;
  }
  .reply {
    width: 450px;
  }
}
</style>
