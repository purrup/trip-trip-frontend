<template lang="pug">
  div(class="admin-root")
    div
      router-link(tag="div" to="/" style="text-decoration:none;")
          v-icon(large) mdi-alpha-t-circle-outline
      div
        div 後台管理
        div(
          v-for="nav in navList"
          class="nav-list"
          :data-select="nav === currentSelect ? true : false"
          @click="switchNav(nav)") {{nav}}
    div
      v-card(width="90%")
        v-card-title(:style="{display: 'grid'}")
          div(class="flex-grow-1") {{currentSelect}}
          v-text-field(
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details)
        v-data-table(
          :headers="headers"
          :items="desserts"
          :search="search"
          multi-sort)
            template(v-slot:item.name="{ item }")
              router-link(
                tag="td"
                :to="currentSelect === '使用者' ? `/users/${item.id}` : `/sites/${item.placeId}`"
                :style="{ cursor: 'pointer' }") {{currentSelect === '使用者' ? item.username : item.name}}
            template(v-slot:item.url="{ item }")
              a(:href="item.url" target="_blank" class="a-link-text-overflow") {{item.url}}
            template(v-slot:item.action="{ item }")
              v-icon(@click="deleteItem(item)") close
</template>

<script>
import admimApis from '@/utils/apis/admin.js'

export default {
  data () {
    return {
      search: '',
      navList: ['使用者', '景點'],
      currentSelect: '使用者',
      headers: [
      ],
      desserts: [
      ]
    }
  },
  async created () {
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      const { data } = await admimApis.getUser()
      this.headers = [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: '收藏行程數', value: 'collectingTrips' },
        { text: '被收藏數', value: 'collectedTrips' },
        { text: 'Action', value: 'action', sortable: false }
      ]
      this.desserts = data
    },
    async fetchSites () {
      this.headers = [
        {
          text: '景點名稱',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '被收藏數', value: 'collectingCounts' },
        { text: '地址', value: 'address' },
        { text: 'Google', value: 'url' },
        { text: 'Action', value: 'action', sortable: false }
      ]
      this.desserts = await admimApis.getSites()
    },
    async deleteItem (item) {
      // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      const result = confirm('Are you sure you want to delete this item?')

      if (!result) {
        return
      }

      try {
        if (this.currentSelect === '使用者') {
          await admimApis.deleteUser(item.id)
        } else {
          await admimApis.deleteSite(item.placeId)
        }
      } catch (error) {
        console.log(error)
      }

      const index = this.desserts.indexOf(item)
      this.desserts.splice(index, 1)
    },
    switchNav (nav) {
      this.currentSelect = nav
      if (this.currentSelect === '使用者') {
        this.fetchUsers()
      } else {
        this.fetchSites()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-root {
  display: grid;
  grid-template-columns: 140px 1fr;
  height: 100vh;
  > div:nth-child(1) {
    border: 1px solid lightgray;
    background-color: whitesmoke;
    > div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid lightgray;
      height: 60px;
    }
    > div:nth-child(2) {
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid lightgray;
        &:nth-child(1) {
          font-weight: bold;
          font-size: 20px;
          background-color: #42a39a;
          margin-bottom: 20px;
        }
        &:not(:nth-child(1)):hover:not([data-select="true"]) {
          background-color: lightgray;
        }
        &[data-select="true"] {
          background-color: #a5d0cc;
        }
      }
      .nav-list {
        cursor: pointer;
      }
    }
  }
  > div:nth-child(2) {
    display: grid;
    justify-items: center;
    align-items: flex-start;
    margin-top: 60px;
  }
  .a-link-text-overflow {
    width: 400px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
