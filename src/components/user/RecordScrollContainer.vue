<template lang="pug">
  div(class="record-scroll-container-root")
    h5 {{username}}建立的行程
    div
      little-card(
        v-for="(item, i) in items.slice(index, equalOrLess2(items.length) + index)"
        :key="`little-card-${item.name}-${i}`"
        :item="item"
        :type="type")
    v-icon(v-if="index !== 0" class="back" @click="back") arrow_back_ios
    v-icon(v-if="index !== items.length - 2" class="forward" @click="forward(items.length)") arrow_forward_ios
</template>

<script>
import LittleCard from '@/components/LittleCard.vue'

export default {
  components: {
    LittleCard
  },
  props: {
    username: String,
    items: Array,
    type: String
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    equalOrLess2 (length) {
      return length >= 2 ? 2 : length
    },
    back () {
      return (this.index - 1) < 0
        ? 0
        : this.index--
    },
    forward (length) {
      return (this.index + 1) > (length - this.equalOrLess2(length))
        ? 0
        : this.index++
    }
  }
}
</script>

<style lang="scss" scoped>
.record-scroll-container-root {
  position: relative;
  > h5 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  > div {
    margin-left: 30px;
    display: grid;
    grid-auto-columns: 250px;
    grid-auto-rows: 210px;
    grid-auto-flow: column;
    grid-column-gap: 15px;
  }
  i {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    &.back {
      left: 0px;
    }
    &.forward {
      right: -38px;
    }
  }
}
</style>
