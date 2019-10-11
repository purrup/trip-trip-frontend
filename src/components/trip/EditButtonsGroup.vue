<template lang="pug">
  div(class="edit-buttons-group-root")
    transition(name="fade" mode="out-in")
      .d-flex.flex-nowrap.align-center.buttons-row(
        v-if="!isOnEditMode"
      )
        v-btn(
          v-if="$route.path ===`/trips/${$route.params.id}` && trip.userId !== account._id"
          text
          elevation=2
          medium
          @click="fork"
        ) 複製行程
          v-icon.ml-1(small) mdi-content-copy
        v-btn(
          v-else-if="$route.path ===`/trips/${$route.params.id}` && !isOnEditMode && trip.userId === account._id"
          @click="toggleEditMode"
          text
          elevation=2
          medium
          ) 編輯行程
            v-icon.ml-1(small) mdi-pencil-outline
    transition(name="fade" mode="out-in")
      .d-flex.flex-nowrap.align-center.buttons-row(
        v-if="isOnEditMode"
      )
        v-btn(
          text
          elevation=2
          @click="editComplete"
          medium
        ) 編輯完成
          v-icon.ml-1(small) mdi-check-box-outline
        //- 選擇旅遊日期
        .calendarButton.ml-8
          v-btn(
            text
            elevation=2
            @click.stop="showCalendar = true"
            medium
          ) 行程起始日期
            v-icon.ml-1(small) mdi-calendar
          v-dialog(
            width=300
            v-model="showCalendar"
          )
            v-date-picker(
              v-model="firstDatePicker"
              show-current
              @change="updateStartDate"
              )
        v-btn.ml-8(
          text
          elevation=2
          @click="showEditImage = true"
          medium
        ) 上傳照片
          v-icon.ml-1(small) mdi-cloud-upload-outline
        v-dialog(
          v-model="showEditImage"
          width=800
          height=auto
        )
         pictures-wall(
           @closeEditImage="closeEditImage"
           @syncImageFiles="syncImageFiles"
         )
        v-btn.ml-6(
          text
          elevation=2
          medium
          @click="showPrivacySetting = true"
        ) 隱私設定
          v-icon.ml-1(small) mdi-security
        v-dialog(
          v-model="showPrivacySetting"
          width=400
          height=auto
          )
          v-card
            .container.pt-8
              .d-flex.flex-row.flex-nowrap.justify-center.align-center
                span(style="font-size: 1.2em; color: #616161;") 讓其他人能夠瀏覽、參考您的行程
              v-switch.ml-10.mt-7(
                v-model="publish"
                :label="`${privacySetting}`"
                @change="updatePrivacy")
        v-btn.ml-6(
          text
          elevation=2
          medium
          @click="showDeleteConfirmation = true"
        ) 刪除行程
          v-icon.ml-1(small) mdi-trash-can-outline
        v-dialog(
          v-model="showDeleteConfirmation"
          width=430
          height=auto
          )
          v-card
            .container.py-11
              .timePickersGroup.d-flex.flex-row.flex-nowrap.justify-center.align-center
                span(style="font-size: 1.4em; color: #616161;") 確定要刪除此行程：{{trip.name}} ？
            v-card-actions
              .flex-grow-1
              .btnGroup.mb-3
                v-btn(
                  color="info"
                  @click="deleteCurrentTrip(trip._id)"
                  ) 確定
                v-btn.mx-5(
                  color="error"
                  @click="showDeleteConfirmation = false") 取消
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import PicturesWall from '@/components/trip/PicturesWall.vue'

export default {
  name: 'EditButtonsGroup',
  props: {
  },
  components: {
    PicturesWall
  },
  data () {
    return {
      showCalendar: false,
      firstDatePicker: null,
      publish: false,
      showEditImage: false,
      showDeleteConfirmation: false,
      showPrivacySetting: false,
      newImageFiles: [],
      deletedImages: []
    }
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip,
      isOnEditMode: state => state.isOnEditMode,
      startDate: state => state.startDate ? state.startDate : Date.now()
    }),
    ...mapState('account', {
      account: state => state
    }),
    privacySetting () {
      return this.trip.isPrivate ? '公開此行程' : '不公開此行程'
    }
  },
  methods: {
    ...mapActions('trip', ['forkTrip', 'updateTrip', 'deleteTrip']),
    ...mapMutations('trip', ['TOGGLE_isOnEditMode', 'UPDATE_TRIP_startDate', 'UPDATE_TRIP_privacy', 'ADD_TRIP_date']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    fork () {
      this.forkTrip(this.trip._id)
    },
    toggleEditMode () {
      this.TOGGLE_isOnEditMode()
    },
    updateStartDate () {
      this.showCalendar = false
      this.UPDATE_TRIP_startDate(this.firstDatePicker)
    },
    updatePrivacy (value) {
      this.UPDATE_TRIP_privacy(value)
    },
    closeEditImage (boolean) {
      this.showEditImage = boolean
    },
    syncImageFiles (data) {
      this.newImageFiles = data.newImageFiles
      this.deletedImages = data.deletedImages
      console.log(data.newImageFiles)
      console.log(data.deletedImages)
    },
    deleteCurrentTrip (id) {
      this.SET_SUCCESS_MSG(`已刪除您的行程 "${this.trip.name}"`)
      this.deleteTrip(id)
      this.TOGGLE_isOnEditMode()
      this.$router.push('/')
    },
    editComplete () {
      const formData = new FormData()
      // 將newimages和deletedImages放入formData
      this.newImageFiles.forEach(image => {
        formData.append('images', image)
      })
      formData.append('deletedImages', this.deletedImages)
      console.log(formData.get('deletedImages'))
      formData.append('data', JSON.stringify(this.trip))
      const tripId = this.trip._id
      this.updateTrip({ tripId, formData })
      this.TOGGLE_isOnEditMode()
      this.SET_SUCCESS_MSG('修改完成')
    }
  },
  watch: {
    isOnEditMode (newValue) {
      if (newValue === false) {
        this.showCalendar = false
        this.showEditImage = false
        this.showDeleteConfirmation = false
        this.showPrivacySetting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-buttons-group-root {
    .buttons-row {
      height: 70px;
    }
    //edit-buttons transition effect
    .fade-enter-active {
      transition: all 1s ease;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
</style>
