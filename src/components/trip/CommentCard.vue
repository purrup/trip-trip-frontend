<template lang="pug">
  .comment-card-root.mb-5
    v-card(
      width="450"
      min-width="250"
      min-height="70"
      outlined
      flat)
      .d-flex.flex-row.align-center
        .d-flex.flex-row.align-center
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
            span.grey--text.caption {{ new Date(comment.date).toLocaleDateString()}}
        .reply
          v-card-text.mr-4(
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
              @click="editCompleted(tripId, revisedComment, comment.id)"
            ) 編輯完成
            v-btn(
              text
              v-if="comment.userId === account._id && !commentEdit"
              @click="$emit('confirmDelete', { tripId, commentId: comment.id })"
            ) 刪除
            //- v-btn(
            //-   v-if="comment.replies"
            //-   icon
            //-   @click="showReply = !showReply")
            //-   v-icon reply {{ showReply ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
    //- v-expand-transition
    //-   div.mt-3(v-show="showReply")
    //-     .reply.d-flex.flex-row.align-center.justify-end.mr-11
    //-       v-card(
    //-         v-for="(reply, i) in comment.replies"
    //-         :key="i"
    //-         width="350"
    //-         min-height="70"
    //-         outlined
    //-         flat)
    //-         .d-flex.flex-row.align-center
    //-           .d-flex.flex-row.align-center.mt-2
    //-             v-avatar(size=60)
    //-                 img(
    //-                   v-if="reply.userAvatar"
    //-                   :src="reply.userAvatar"
    //-                   alt="avatar")
    //-                 v-icon(
    //-                   v-else="!reply.userAvatar"
    //-                   large) mdi-account-circle
    //-             .userInfo
    //-               .headline.pr-5 {{ reply.userName }}
    //-               span.grey--text.caption {{ reply.date }}
    //-           .reply
    //-             v-card-text(
    //-               style="color: rgba(0, 0, 0, 0.85); font-size: medium; "
    //-               ) {{ reply.text }}
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import userApis from '@/utils/apis/user.js'

export default {
  name: 'CommentCard',
  props: {
    tripId: String,
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
    ...mapMutations('trip', ['REVISE_comment']),
    ...mapActions('trip', ['reviseComment']),
    editCompleted (tripId, text, commentId) {
      if (text === '') {
        return
      }
      this.reviseComment({ tripId, text, commentId })
        .then(() => {
          if (this.$route.name === 'Trips') {
            this.comment.text = text
          } else {
            this.REVISE_comment({ text, commentId })
          }
        })
        .then(() => {
          this.revisedComment = ''
          this.commentEdit = !this.commentEdit
        })
    }
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
