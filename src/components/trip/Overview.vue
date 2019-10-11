<template lang="pug">
  .overview-root.d-flex.flex-wrap.justify-center
    v-carousel.pictures(
      cycle
      height=360
      hide-delimiters
      hide-delimiter-background
      interval=6000)
      v-carousel-item(
        v-for="(image, i) in trip.images"
        :key="i"
        :src="image")
    .journal.mx-auto.mt-5
      .display-2.text-center(v-if="!isOnEditMode") {{trip.name}}
      .display-2.text-center(v-else)
        v-text-field(
          :value="trip.name"
          label="行程名稱"
          @change="updateTripName"
          :rules="tripNameRules"
        )
      br
      ul(style="list-style: none; padding: 0;")
        li.mb-2 作者：{{trip.userId.username}}
        li.mb-2 旅遊天數： {{ trip.days }}
        li.mb-2 城市： {{ cities }}
      br
      .article.d-flex.flex-wrap(
        v-if="!isOnEditMode"
        style="word-wrap: break-word;"
        ) {{trip.journal}}
      .article(v-else-if="isOnEditMode")
        v-textarea(
          auto-grow
          rows=1
          name="journal"
          label="遊記"
          :value="trip.journal"
          @change="updateJournal")
      .article(v-else-if="!trip.journal && !isOnEditMode")
        p 尚未新增遊記
      br
      .comments
        comment.d-flex.flex-wrap.justify-start(:comments="trip.comments" :tripId="trip._id")
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
      rating: 0,
      images: [],
      tripNameRules: [
        v => v.length <= 15 || v.length !== 0 || '名稱請勿超過15個字'
      ]
    }
  },
  async created () {
    this.rating = this.getTripRating(this.trip._id)
    // if (this.trip.images.length !== 0) {
    //   this.images = this.trip.images
    // } else {
    //   return
    //   // this.images.push('https://source.unsplash.com/random/686x360')
    // }
  },
  computed: {
    ...mapState('trip', {
      isOnEditMode: state => state.isOnEditMode
    }),
    ...mapGetters('account', {
      getTripRating: 'getTripRating'
    }),
    cities () {
      return this.trip.cities.join('、')
    }
  },
  methods: {
    ...mapMutations('account', ['RATE_trip']),
    ...mapMutations('trip', ['UPDATE_TRIP_NAME', 'UPDATE_TRIP_journal']),
    ...mapActions('trip', ['rateTrip']),
    updateTripName (value) {
      this.UPDATE_TRIP_NAME(value)
    },
    updateJournal (value) {
      this.UPDATE_TRIP_journal(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-root {
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 360px auto;
  grid-template-areas: "pictures journal";
  .pictures {
    grid-area: pictures;
    max-width: 686px;
    > :nth-child(1) {
      height: 100%;
    }
  }
  .journal {
    grid-area: journal;
    width: 590px;
    .comments {
      width: 542px;
      height : auto;
    }
  }
}
</style>
