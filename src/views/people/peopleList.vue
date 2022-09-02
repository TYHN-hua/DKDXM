<template>
  <div>
    <peopleSearch />
    <list ref="list" :people-list="peopleList" :page.sync="page" />

  </div>
</template>

<script>
import peopleSearch from './components/peopleSearch.vue'

import list from './components/list.vue'
import { getPeopleList } from '@/api/people'
export default {
  name: 'PeopleList',
  components: {
    peopleSearch,
    list

  },
  data() {
    return {
      peopleList: [],
      page: {}
    }
  },
  watch: {
    'page.pageIndex': function(newval) {
      this.getPeopleList()
    }
  },
  mounted() {
    this.getPeopleList()
  },
  methods: {
    async getPeopleList() {
      try {
        const { data } = await getPeopleList(this.page, this.$store.state.userInfo)
        this.peopleList = data.currentPageRecords
        this.page = {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPage: data.totalPage

        }
        // console.log(this.page)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async page(msg) {
    console.log(msg)
    this.getPeopleList()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;

}
</style>
