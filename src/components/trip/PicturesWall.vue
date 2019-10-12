<template lang="pug">
  v-card(class="pictures-wall")
    v-card-title.justify-center 上傳照片至概覽
    v-form(
      ref="form"
      @submit.prevent="previewImages"
    )
      div(class="container d-flex flex-wrap justify-start align-content-space-around")
        v-card.picture-card(
          width=160
          height=160
          elevation=3
          hover
          v-for="(image, i) in previewImagesList"
          :key="`image-card-${image}`"
          @click="deleteImage(image)"
        )
          .overlay
            v-icon(medium) mdi-close-circle
          v-img.image(
            height=140
            :src="`${image}`")
        v-card.picture-card(
          width=160
          height=160
          elevation=3
          hover
        )
          v-btn(
            text
            height="100%"
            width="100%"
            @click="$refs.file.click()"
          )
            input(
              style="display: none;"
              accept=".png,.jpg"
              type="file"
              ref="file"
              multiple
              @change="editImages"
            )
            p upload
            v-icon mdi-plus
      v-card-actions
        .flex-grow-1
        .btnGroup.mb-3
          v-btn(
            color="info"
            type="submit"
            ) 確定
          v-btn.mx-5(
            color="error"
            @click="closeEditImage") 取消
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PicturesWall',
  data () {
    return {
      originImages: [],
      deletedImages: [],
      previewImagesList: [],
      newImageFiles: [],
      showinput: false
    }
  },
  mounted () {
    // fork 一份trip.images
    this.originImages = [...this.trip.images]
    this.previewImagesList = this.trip.images
  },
  computed: {
    ...mapState('trip', {
      trip: state => state.trip
    })
  },
  methods: {
    ...mapMutations('trip', ['CHANGE_IMAGES_OF_OVERVIEW']),
    ...mapMutations('notification', ['SET_SUCCESS_MSG', 'SET_ERROR_MSG']),
    editImages (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        let image = e.target.files[i]
        // 要給後端的imageFile
        this.newImageFiles.push(image)
        this.previewImagesList.push(URL.createObjectURL(image))
      }
    },
    previewImages () {
      this.closeEditImage()
      // deletedImages = 從originImages中找出不在previewImagesList的images
      this.deletedImages = this.originImages.filter(originImage => {
        return !this.previewImagesList.includes(originImage)
      })
      // 把deletedImages, newImageFiles傳到editButtonsGroup
      this.$emit('syncImageFiles', { newImageFiles: this.newImageFiles, deletedImages: this.deletedImages })
      // 即時預覽上傳圖片
      // 要放入編輯過的previewImagesList
      this.CHANGE_IMAGES_OF_OVERVIEW(this.previewImagesList)
    },
    closeEditImage () {
      this.$emit('closeEditImage', false)
    },
    deleteImage (image) {
      // 刪除newImageFiles中的file
      // 如果deletedimage 不在originImages中，表示是新upload的image，刪除file檔
      if (this.originImages.includes(image) === false) {
        // 刪除file檔中對應的照片
        let deletedfileIndex = this.previewImagesList.length - 1 - this.previewImagesList.indexOf(image)
        this.newImageFiles.splice(deletedfileIndex, 1)
      }
      let newPreviewImageList = this.previewImagesList.filter(item => {
        return item !== image
      })
      this.previewImagesList = newPreviewImageList
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
      .overlay {
        :first-child {
          position: absolute;
          top: 10px;
          right: 5px;
        }
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          bottom: 1.5rem;
          left: 1.5rem;
          transition: 0.5s;
        }
        &::before {
          transform: scale(0,1);
        }
        &::after {
          transform: scale(1,0);
        }
      }
      .image {
        margin-top: 10px;
        opacity: 1;
        transition: 0.5s;
      }
      &:hover {
        .overlay {
          opacity: 1;
          transform: translate3d(0,0,0);
        }
        .image {
          opacity: 0.2;
        }
        &::before,
        &::after {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
