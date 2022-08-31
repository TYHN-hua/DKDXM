<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" style="background-color:#ff6c28">新建</el-button>
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
      >
        <el-button size="small" style="border:unset;color:#6085ff;background-color:unset">修改</el-button>
        <el-button size="small" style="border:unset;color:#ff5a5a;background-color:unset">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="page.totalCount"
    /> -->
    <el-row style="margin-top:10px;padding-left:20px" type="flex" justify="space-between"><span style="color:#dddfe5">共{{ page.totalCount }}条记录 第 {{ page.pageIndex }} / {{ page.totalPage }} 页</span>
      <span><el-button size="small">上一页</el-button> <el-button size="small">下一页</el-button></span></el-row>
  </el-card>
</template>

<script>
export default {
  name: 'List',
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
      page1: this.page
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style>

</style>
