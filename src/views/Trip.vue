<template lang="pug">
  #trip
    v-row#toolbar
        v-col.button-group(
              cols="12"
              offset="0")
              v-btn(
                outlined
                ) 複製行程
              v-btn.ml-5(
                outlined
                ) 編輯模式
              v-btn.ml-5(
                outlined
                ) 日期
    main
      #toggle-bar
        v-list
          v-list-item-group
            v-list-item(
              v-for="(item, i) in toggle"
              :key="i"
              style=" border: 0.5px solid rgba(102, 102, 102, 0.5); "
            )
              v-list-item-content
                v-list-item-title.text-center(v-text="item")
      #overview
        overview(:trip="trips[0]")
      #google-map
        p google map

</template>

<script>
import Overview from '@/components/Overview.vue'

export default {
  name: 'trip',
  components: {
    Overview
  },
  data () {
    return {
      toggle: [
        '概覽', '8/1', '8/2', '8/3', '8/4', '+'
      ],
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
  }
}
</script>

<style lang="scss" scoped>
#trip {
  height: auto;
  overflow-y: auto;
}

#toolbar {
  z-index: 9;
  position: fixed;
  top: 70px;
  left: 0px;
  border-bottom: 1px solid rgb(235, 235, 235);
  width: 100%;
  background-color: #fff;
  .button-group {
    margin-left: 40px;
  }
}

main {
  width: 100%;
  height: 100vh;
  margin: 130px 0 0 47px;
  display: grid;
  grid-template-columns: 84px 686px auto;
  grid-template-areas: "toggle-bar overview google-map";
  #toggle-bar {
    margin-right: 9px;
    // background-color: green;
    grid-area: toggle-bar;
  }
  #overview {
    grid-area: overview;
  }
  #google-map {
    // background-color: blue;
    grid-area: google-map;
  }
}

</style>
