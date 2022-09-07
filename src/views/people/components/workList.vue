<template>
  <el-card>
    <el-table
      :data="listData"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column
        type="index"
        label="序号"
        width="180"
      />
      <el-table-column
        prop="userName"
        label="人员名称"
        width="180"
      />

      <el-table-column
        prop="roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
      />
      <el-table-column
        prop="total"
        label="完成工单（本月）"
      />
      <el-table-column
        prop="workCount"
        label="进行中工单"
      />
      <el-table-column
        prop="cancelCount"
        label="拒绝工单（本月）"
      />
      <el-table-column
        label="操作"
        prop="id"
      >
        <template slot-scope="scope">
          <el-button size="small" style="border:unset;color:#6085ff;background-color:unset" @click="getPeopleInfo(scope.row.userId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="page.totalCount"
    /> -->
    <el-row style="margin-top:10px;padding-left:20px" type="flex" justify="space-between"><span style="color:#dddfe5">共{{ page.totalCount }}条记录 第 {{ page.pageIndex }} / {{ page.totalPage }} 页</span>
      <span>
        <el-button size="small" :disabled="page.pageIndex == 1? true:false" @click="lastPage">上一页</el-button>
        <el-button size="small" :disabled="page.pageIndex == page.totalPage? true:false" @click="nextPage">下一页</el-button>
      </span></el-row>
    <peopleDetail :show-dialog.sync="showDialog" :user-info="userInfo" :people-data.sync="peopleData" />
  </el-card>
</template>

<script>
import peopleDetail from './peopleDetail.vue'

import { getPeopleDetailById, getUserWork } from '@/api/people'
// import { getAreaList } from '@/api/area'
import { parseTime } from '@/utils/index'
export default {
  name: 'List',
  components: {
    peopleDetail
  },
  props: {
    listData: {
      type: Array,
      default: () => ([])
    },
    page: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      userId: '',
      showDialog: false,
      userInfo: {},
      peopleData: []
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    lastPage() {
      const page = (this.page.pageIndex * 1 - 1).toString()
      this.$emit('update:page', page)
    },
    nextPage() {
      const page = (this.page.pageIndex * 1 + 1).toString()
      this.$emit('update:page', page)
    },

    async getPeopleInfo(id) {
      const { data } = await getPeopleDetailById(id)
      this.showDialog = true
      // this.$refs.editPeople.formData = res.data
      // this.$refs.editPeople.isAdd = false
      // this.$refs.editPeople.id = id
      this.userId = id
      this.userInfo = data
      // this.showAddPeople()
      // console.log(data)
      await this.getPeopleData()
    },
    async getPeopleData() {
      const week = await this.getUserWorkAtWeek()
      const month = await this.getUserWorkAtMonth()
      const year = await this.getUserWorkAtYear()
      week.TT = '本周'
      month.TT = '本月'
      year.TT = '本年'
      await this.peopleData.push(week, month, year)
      console.log(this.peopleData)
    },
    async getUserWorkAtMonth() {
      const year = parseTime(new Date()).slice(0, 4)
      const month = parseTime(new Date()).slice(5, 7)
      const days = this.getMonthDays(year, month)
      const start = year + '-' + month + '-01' + ' 00:00:00'
      // console.log(start)
      const end = year + '-' + month + '-' + days + ' 00:00:00'
      const params = {
        userId: this.userId,
        start,
        end
      }
      const { data } = await getUserWork(params)
      return data
    },
    getMonthDays(year, month) {
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    getFirstDayOfWeek() {
      const res = parseTime(+new Date()).slice(8, 10)
      const week = new Date().getDay()
      // console.log(week)
      // console.log(parseInt(res))
      let firstDay = (parseInt(res) - week + 1).toString()
      // console.log(firstDay)
      if (firstDay.length === 1) {
        firstDay = '0' + firstDay
      }
      return firstDay
    },
    async getUserWorkAtWeek() {
      const year = parseTime(new Date()).slice(0, 4)
      const month = parseTime(new Date()).slice(5, 7)
      const day = parseTime(+new Date()).slice(8, 10)
      const days = this.getFirstDayOfWeek()
      const start = year + '-' + month + '-' + days + ' 00:00:00'
      // console.log(start)
      const end = year + '-' + month + '-' + day + ' 00:00:00'
      const params = {
        userId: this.userId,
        start,
        end
      }
      const { data } = await getUserWork(params)
      return data
    },
    async getUserWorkAtYear() {
      const year = parseTime(new Date()).slice(0, 4)
      const start = year + '-01-01 00:00:00'
      const end = year + '-12-31 00:00:00'
      const params = {
        userId: this.userId,
        start,
        end
      }
      const { data } = await getUserWork(params)
      return data
    }
  }
}
</script>

<style>

</style>
