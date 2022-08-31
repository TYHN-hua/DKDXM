<template>
  <div>
    <peopleSearch />
    <list :people-list="peopleList" :page="page" />
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
  mounted() {
    this.getPeopleList()
  },
  methods: {
    async getPeopleList() {
      const { data } = await getPeopleList(this.$store.state.userInfo)
      this.peopleList = data.currentPageRecords
      this.page = {
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        totalPage: data.totalPage

      }
      console.log(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
