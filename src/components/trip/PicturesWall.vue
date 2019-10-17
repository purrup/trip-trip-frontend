<template lang="pug">
  v-card(class="pictures-wall")
    v-card-title.justify-center 分享您這次旅程的照片
    v-form(
      ref="form"
      @submit.prevent="confirmImages"
    )
      div(class="container d-flex flex-wrap justify-start align-content-space-around")
        v-card.picture-card(
          width=160
          height=160
          elevation=3
          hover
          v-for="(image, i) in uploadWallImages"
          :key="`image-card-${image}`")
          v-icon(medium @click="deleteImage(image)") mdi-close-circle
          v-img.image(
            height=140
            :src="`${image}`")
        v-card.picture-card(
          width=160
          height=160
          elevation=3
          hover)
          v-btn(
            text
            height="100%"
            width="100%"
            @click="$refs.file.click()")
            input(
              style="display: none;"
              accept=".png,.jpg"
              type="file"
              ref="file"
              multiple
              @change="editImages")
            p upload
            v-icon mdi-plus
      v-card-actions
        .flex-grow-1
        .btnGroup.mb-3.mr-3
          v-btn(
            color="info"
            type="submit") 完成
          //- v-btn.mx-5(
          //-   color="error"
          //-   @click="cancelEditImage") 取消
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PicturesWall',
  data () {
    return {
      // originImages: [],
      deletedImages: [],
      uploadWallImages: [],
      newImageFiles: []
    }
  },
  mounted () {
    // fork trip.images
    // this.originImages = [...this.trip.images]
    this.uploadWallImages = [...this.trip.images]
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip
    }),
    originImages () {
      return this.trip.images
    }
  },
  methods: {
    ...mapMutations('trip', ['CHANGE_IMAGES_OF_OVERVIEW']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    editImages (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        let image = e.target.files[i]
        // 要給後端的imageFile
        this.newImageFiles.push(image)
        // 使用者上傳圖片後，將預覽圖片存在uploadWallImages
        this.uploadWallImages.push(URL.createObjectURL(image))
      }
      e.target.value = ''
    },
    confirmImages () {
      this.$emit('closeEditImage', false)
      // deletedImages = 從originImages中找出不在trip.images的images
      this.deletedImages = this.originImages.filter(originImage => {
        // this.uploadWallImages.forEach(img => {
        //   console.log(img.search('imgur'))
        // })
        if (originImage.includes('imgur') === true) {
          return !this.uploadWallImages.includes(originImage)
        }
      })
      // 把deletedImages, newImageFiles傳到editButtonsGroup
      this.$emit('syncImageFiles', { newImageFiles: this.newImageFiles, deletedImages: this.deletedImages })
      // 即時預覽上傳圖片
      // 要放入編輯過的uploadWallImages
      this.CHANGE_IMAGES_OF_OVERVIEW(this.uploadWallImages)
    },
    cancelEditImage () {
      this.$emit('closeEditImage', false)
      // 取消的話，trip.images不變，uploadWallImages = orginImages
      this.uploadWallImages = this.trip.images
    },
    deleteImage (image) {
      // 刪除newImageFiles中的file
      // 如果deletedimage 中沒有imgur，表示是新upload的image，刪除file檔
      if (image.includes('imgur') === false) {
        console.log(`${image} is not uploaded yet`)
        let deletedfileIndex = this.uploadWallImages.length - 1 - this.uploadWallImages.indexOf(image)
        this.newImageFiles.splice(deletedfileIndex, 1)
      }
      this.uploadWallImages = this.uploadWallImages.filter(item => {
        return item !== image
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pictures-wall {
  .container {
    margin: 16px 0;
    .picture-card {
      margin: 10px 16px;
      i:first-child {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 10
      }
      .image {
        margin-top: 10px;
        opacity: 1;
        transition: 0.5s;
      }
      &:hover {
        .image {
          opacity: 0.2;
        }
        // &::before,
        // &::after {
        //   transform: scale(1);
        // }
      }
    }
  }
}
</style>
