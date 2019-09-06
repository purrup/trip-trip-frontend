<template lang="pug">
  div(class="feature-bar-root")
    v-app-bar(height="54px" :style="{ 'box-shadow': 'none', 'border-bottom' : '1px solid rgba(102, 102, 102, 0.2)' }")
      v-layout(wrap align-center)
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['1天', '2天', '3天', '4天']"
          :menu-props="{ top: false, offsetY: true }"
          label="天數"
          solo
        )
        v-select(
          height="30px"
          class="custom-select-style"
          :style="{ 'width': '100px'} "
          :items="['評分數', '評論數', '收藏數']"
          :menu-props="{ top: false, offsetY: true }"
          label="排序"
          solo
        )
        v-spacer
        v-app-bar-nav-icon(v-if="storageZone" @click="isShowStorageZone = !isShowStorageZone")
    transition(name="fade")
      div(v-show="isShowStorageZone" class="storage-zone" :style="storageZoneHeight")
        div(class="header")
          v-btn(
            outlined
            color="secondary"
          ) Create
        div(:style="{'height': '100%'}")
          draggable(
            tag="div"
            class="dragAreas"
            group="sites"
            :style="{'height': '100%'}"
            :list="sites"
          )
            div(
              class=""
              v-for="(site, index) in sites"
              :key="site.name + index"
            ) {{ site.name }}
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    storageZone: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShowStorageZone: false,
      sites: []
    }
  },
  computed: {
    storageZoneHeight () {
      return {
        height: window.innerHeight - 54 - 70 + 'px'
      }
    }
  },
  methods: {
    log () {
      console.log('child')
    }
  }
}
</script>>

<style lang="scss">
.feature-bar-root {
  position: fixed;
  z-index: 10;
  top: 70px;
  width: 100%;
  .v-input__control {
    min-height: 32px !important;
    font-size: 14px;
  }
  .custom-select-style {
    position: relative;
    top: 14px;
    margin-left: 26px !important;
    flex-grow: 0 !important;
  }
  .storage-zone {
    width: 360px;
    position: fixed;
    background-color: #ffffff;
    right: 0px;
    .header {
      // background-color: dodgerblue;
    }
  }
}
.fade-enter-active {
  animation: fadeIn 0.6s;
  animation-fill-mode: forwards;
}

.fade-leave-active {
  animation: fadeOut 0.6s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    right: -360px;
  }
  to {
    right: 0px;
  }
}

@keyframes fadeOut {
  from {
    right: 0px;
  }
  to {
    right: -360px;
  }
}

.dragAreas {
  > .site-card-root {
    width: 241px !important;
    > .content-wrapper {
      display: none !important;
    }
  }
}
</style>
