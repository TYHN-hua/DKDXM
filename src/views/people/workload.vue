<template>
  <div>

    <peopleSearch :show-two="true" />

    <work-list ref="list" :list-data="workList" :page.sync="page" />

  </div>
</template>

<script>
import peopleSearch from './components/peopleSearch.vue'
import workList from './components/workList.vue'
import { getWorkList } from '@/api/people.js'
// import { parseTime } from '@/utils/index'
export default {
  name: 'Workload',
  components: {
    peopleSearch,
    workList

  },

  data() {
    return {
      workList: [],
      page: {}
    }
  },
  created() {
    this.getWorkList()
  },
  methods: {
    // async getUserWork() {
    //   const year = parseTime(new Date()).slice(0, 4)
    //   const month = parseTime(new Date()).slice(5, 7)
    //   const days = this.getMonthDays(year, month)
    //   const start = year + '-' + month + '-01 00:00:00'
    //   console.log(start)
    //   const end = year + '-' + month + '-' + days + '00:00:00'
    //   const res = await getWorkList(start, end)
    //   console.log(res)
    // },
    // getMonthDays(year, month) {
    //   var d = new Date(year, month, 0)
    //   return d.getDate()
    // }
    async getWorkList() {
      try {
        const { data } = await getWorkList(this.page, this.$store.state.userInfo)
        this.workList = data.currentPageRecords
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
    }
  }

}
</script>

<style>

</style>
