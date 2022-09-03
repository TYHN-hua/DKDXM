<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" style="background-color:#ff6c28" @click="showAddPeople">新建</el-button>
    <el-table
      :data="peopleList"
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
        prop="regionName"
        label="归属区域"
      />
      <el-table-column
        prop="role.roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
      />
      <el-table-column
        label="操作"
        prop="id"
      >
        <template slot-scope="scope">
          <el-button size="small" style="border:unset;color:#6085ff;background-color:unset">修改</el-button>
          <el-button size="small" style="border:unset;color:#ff5a5a;background-color:unset" @click="delPeople(scope.row.id)">删除</el-button>
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
    <addPeople :show-dialog.sync="showDialog" :role-list="roleList" :region-list="regionList" />
  </el-card>
</template>

<script>
import addPeople from './addPeople.vue'
import { getRole, delPeople } from '@/api/people'
import { getAreaList } from '@/api/area'
export default {
  name: 'List',
  components: {
    addPeople
  },
  props: {
    peopleList: {
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

      showDialog: false,
      roleList: [],
      regionList: []
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
      this.page.pageIndex = (this.page.pageIndex * 1 - 1).toString()
      // this.$emit('update:page', this.page)
    },
    nextPage() {
      this.page.pageIndex = (this.page.pageIndex * 1 + 1).toString()
      // this.$emit('update:page', this.page)
    },
    async showAddPeople() {
      this.showDialog = true
      const { data } = await getRole(this.$store.state.user.userInfo)
      this.roleList = data
      const { data: { currentPageRecords }} = await getAreaList({
        pageIndex: '1',
        pageSize: '99999'
      })
      this.regionList = currentPageRecords
      // console.log(this.regionList)
    },
    async delPeople(id) {
      try {
        await delPeople(id)
        if (this.peopleList.length - 1 === 0) {
          this.page.pageIndex = (this.page.pageIndex * 1 - 1).toString()
        }
        this.$parent.getPeopleList()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
