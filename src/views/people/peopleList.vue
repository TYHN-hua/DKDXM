<template>
  <div>
    <peopleSearch @search="search" />
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
  provide() {
    return {
      getPeopleList: this.getPeopleList
    }
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
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    // refresh(val) {
    //   if (val) {
    //     this.page.pageIndex = this.page.pageIndex - 1
    //   }
    //   this.getPeopleList()
    // },
    search(val) {
      this.page.userName = val
      this.getPeopleList()
    }
  }

}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;

}
</style>
