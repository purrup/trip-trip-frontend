<template lang="pug">
  #trip
    v-row#toolbar
      v-col.days-filter(
            cols="12"
            offset="0")
        v-menu.mr-5(offset-y)
          template(v-slot:activator="{ on }")
            v-btn(
              v-on="on"
              outlined
              ) 行程天數
                v-icon(right) arrow_drop_down
          v-list
            v-list-item(
              v-for="(day, index) in days"
              :key="index"
              @click="")
              v-list-item-title.d-flex.justify-center {{ day }}
        v-menu(offset-y)
          template(v-slot:activator="{ on }")
            v-btn(
              v-on="on"
              outlined
              ) 排序
                v-icon(right) arrow_drop_down
          v-list
            v-list-item(
              v-for="(order, index) in orders"
              :key="index"
              @click="")
              v-list-item-title.d-flex.justify-center {{ order }}
    v-container.mt-2(
      fluid)
      v-row
        v-col.mx-auto(cols="12"
              sm="12"
              md="12"
              lg="10"
              xl="10"
              tag="main")
          v-row#trips
            v-col(
              cols="10"
              )
              template(v-for="trip in trips")
                trip-card(
                  :trip="trip"
                  :key="trip"
                  v-on:mouseover.native="displayOverview(trip)"
                )
          v-row#overview
            v-col(
              cols="10"
            )
              overview(:trip="currentTrip")
</template>

<script>
import TripCard from '@/components/TripCard.vue'
import Overview from '@/components/Overview.vue'

export default {
  name: 'trips',
  components: {
    TripCard,
    Overview
  },
  data () {
    return {
      days: ['1天', '2天', '3天', '4天', '5天'],
      orders: ['收藏數', '留言數', '照片數'],
      currentTrip: {}, // 現在overview顯示的trip資料
      trips: [
        {
          id: 1,
          userId: 1,
          name: '2019花東行',
          days: 5,
          country: 'Taiwan',
          cities: [ '台東', '花蓮' ],
          startDate: '2019-09-01',
          isPrivate: false,
          journal: '戲因香想如早種又且回聽品解保麼但三到半。題查省定南時管……同禮提大：導始不要發動就模十是形風蘭國實的裡，星率人，之海它頭設這本紅機的的：下大心母改決子山有後子用河萬輕太的下是坐、去一我友與都的基任黨小生趣的市老很示大住指，美水港因一地的上推防和期父如回緊。我成本建且最的，備活臺……龍生化曾底機說存與然有有不的性發公第師……分星學；該且不：幾同畫對來……意還動；國高市之年看西小實日也戰媽些些公什覺遊還寫這能，卻底方防待去科但團兒孩。分環已個……士特小苦國生代文……活斷一中計統和雜。足每營！羅年計我程！是今心能經在什成位引大紅記大在法政機有：師學人流痛一不年、你命了一面想日終果的年院！來子都認事開他我是是賽際裡空亞所說一我；或高過選處運治理構不深；不收文到許看八次自同氣飯驚車強開看夫所，同基這心部、情上一說然麼他蘭認起別人應在火觀父李識；學然時今所然氣真血願分想說是苦一是進港會……另去另明。世醫新來英終科不；無政官好運遊一麼習怎光務東我。那不本著老師分思這為成子自出人己值花走不的消容為回設可年會？來著片法面部，校如國安，像生情一！健說臺定道完了不何天明產要此要。清動人變海單……愛黃無算：觀成這年子己想一的會真。子男學好民存了正的腳實高好在算出進，他不環！夫為子，白位後體、這不表話月，星正力急現相一在進使、不係住早可門度經工原量獨養孩可可畫什是應口馬滿相灣們中消英有辦的學先愛今。',
          rating: 4,
          ratingCounts: 3,
          cost: 20000,
          images: [
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360'],
          collectingUsers: [ 1, 2, 3, 5, 7 ],
          // content: [
          //   {
          //     activities:
          //       [
          //         {
          //           name: String,
          //           cost: Number,
          //           startTime: Date,
          //           endTime: Date
          //         },
          //       ],
          //     note: String,
          //   }
          // ]
          sites: [
            {
              name: '星星部落'
            }
          ],
          comments: [
            {
              date: '2019-10-01',
              userId: 3,
              userName: 'Jinx',
              userAvatar: 'https://i.pravatar.cc/64',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam.',
              replies: [
                {
                  date: '2019-10-01',
                  userId: 4,
                  userName: 'Edith',
                  userAvatar: '',
                  text: 'nice'
                }
              ]
            },
            {
              date: '2019-10-02',
              userId: 2,
              userName: 'Vin',
              userAvatar: 'https://i.pravatar.cc/64',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam.',
              replies: [
                {
                  date: '2019-10-01',
                  userId: 4,
                  userName: 'Edith',
                  userAvatar: 'imgure',
                  text: 'nice'
                }
              ]
            },
            {
              date: '2019-10-02',
              userId: 2,
              userName: 'Emma',
              userAvatar: 'https://i.pravatar.cc/64',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam.',
              replies: [
                {
                  date: '2019-10-01',
                  userId: 4,
                  userName: 'Edith',
                  userAvatar: 'imgure',
                  text: 'nice'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          userId: 3,
          name: '2019墾丁',
          days: 5,
          country: 'Taiwan',
          cities: [ '墾丁', '恆春' ],
          startDate: '2019-09-02',
          isPrivate: false,
          journal: 'lorem',
          rating: 3,
          ratingCounts: 5,
          cost: 81000,
          images: [
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360',
            'https://source.unsplash.com/random/686x360'],
          collectingUsers: [ 1, 2, 3, 5, 7, 10 ],
          // content: [
          //   {
          //     activities:
          //       [
          //         {
          //           name: String,
          //           cost: Number,
          //           startTime: Date,
          //           endTime: Date
          //         },
          //       ],
          //     note: String,
          //   }
          // ]
          sites: [
            {
              name: '白沙灣'
            }
          ],
          comments:
          [
            {
              date: '2019-10-01',
              userId: 3,
              userName: 'Jinx',
              userAvatar: 'imgure',
              text: 'nice',
              replies: [
                {
                  date: '2019-10-01',
                  userId: 4,
                  userName: 'Edith',
                  userAvatar: 'imgure',
                  text: 'nice'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  beforeMount () {
    // overview預設資料
    this.currentTrip = this.trips[0]
  },
  methods: {
    displayOverview (trip) {
      this.currentTrip = trip
    }
  }
}
</script>

<style lang="scss" scoped>
#trip {
  height: auto;
}
#toolbar {
  border-bottom: 1px solid rgb(235, 235, 235);
  width: 100%;
  background-color: #fff;
}

.days-filter {
  margin-left: 95px;
}

main {
  width: 91.5%;
  display: grid;
  grid-template-columns: 0.77fr 50px 1.15fr;
  grid-template-areas: "left . right";
  #trips {
    grid-area: left;
  }
  #overview {
    grid-area: right;
  }
}
</style>
