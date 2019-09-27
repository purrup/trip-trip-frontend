<template lang="pug">
  .overview-root.d-flex.flex-wrap.justify-center
    v-carousel.pictures(
      cycle
      height=360
      hide-delimiters
      hide-delimiter-background
      interval=6000)
      v-carousel-item(
        v-for="(image, i) in images"
        :key="i"
        :src="image")
    .journal.mx-auto.mt-5
      .display-2.text-center {{trip.name}}
      br
      ul(style="list-style: none; padding: 0;")
        li.mb-2 作者：Saitama
        li.mb-2 旅遊天數： {{ trip.days }}
        li.mb-2 城市： {{ cities }}
      br
      .article(v-if="trip.journal")
        p {{trip.journal}}
      .article(v-else-if="!trip.journal")
        p 尚未新增
      br
      .comments
        comment.d-flex.flex-wrap.justify-start(:comments="trip.comments")
      br
      .rating.d-flex.flex-column
        v-row.d-flex.flex-column.align-center
          .headline.mb-3 評分
          p 分享您對此行程的看法供別人參考
        v-row.d-flex.flex-column.align-center
          v-col(cols="auto")
            v-rating(
            v-model="rating"
            @click.native="rateTrip({tripId: trip._id, rating})"
            color="yellow darken-3"
            half-increments
            hover
            large)
      br
      br
      br
      .timeline
        timeline(:sites="trip.sites")
</template>

<script>
import Comment from '@/components/trip/Comment.vue'
import Timeline from '@/components/trip/Timeline.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Overview',
  components: {
    Comment,
    Timeline
  },
  props: {
    trip: Object
  },
  data () {
    return {
      rating: '',
      images: []
    }
  },
  created () {
    this.rating = this.getTripRating(this.trip._id)
    if (!this.trip.images) {
      this.images = this.trip.images
    } else {
      this.images.push('https://source.unsplash.com/random/686x360')
    }
  },
  computed: {
    ...mapGetters('account', {
      getTripRating: 'getTripRating'
    }),
    cities () {
      return this.trip.cities.join('、')
    }
  },
  methods: {
    ...mapMutations('account', ['RATE_trip']),
    ...mapActions('trip', ['rateTrip'])
  }
}
</script>

<style lang="scss" scoped>

.pictures {
  max-width: 686px;
  > :nth-child(1) {
    height: 100%;
  }
}
.journal {
  width: 590px;
  height: 100%;
}
.comments {
  width: 542px;
  height : auto;
}

</style>
