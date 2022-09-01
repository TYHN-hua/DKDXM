<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">
          <span>设备编号：</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="search" placeholder="请输入内容" style="margin-left:-20px;" />
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" style="margin-left:10px;">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">
          <el-button type="warning" icon="el-icon-circle-plus-outline">新建</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="warning" plain>批量操作</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table ref="multipleTable" :data="List" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="innerCode" label="设备编号" width="120" />
          <el-table-column prop="type.name" label="设备型号" width="120" />
          <el-table-column prop="node.addr" label="详细地址" width="280" />
          <el-table-column prop="ownerName" label="合作商" />
          <el-table-column prop="vmStatus" label="设备状态" :formatter="formatterFn" />
          <el-table-column label="操作" show-overflow-tooltip>
            <template>
              <el-button type="text" size="small">货道</el-button>
              <el-button type="text" size="small">策略</el-button>
              <el-button type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <myPagination :total="totalCount" :current-page="currentPage" @changePageEvent="changePage" />
    </el-card>
  </div>
</template>

<script>
import { getEquipmentList } from '@/api/equipment'
import Equipment from '@/api/constant/equipment'
import myPagination from '@/components/myPagination/index.vue'
export default {
  name: 'Management',
  components: {
    myPagination
  },
  data() {
    return {
      search: '',
      List: [],
      totalCount: 0,
      pageIndex: 1,
      currentPage: 1
    }
  },
  mounted() {
    this.getEquipmentList()
  },
  methods: {
    async getEquipmentList() {
      const res = await getEquipmentList(this.pageIndex)
      console.log(res)
      this.List = res.data.currentPageRecords
      this.totalCount = Number(res.data.totalCount)
      // console.log(this.List)
    },
    formatterFn(row, column, cellValue, index) {
      const obj = Equipment.equipmentType.find(ele => ele.id === cellValue * 1)
      return obj ? obj.value : '未投放'
    },
    async changePage(val) {
      this.pageIndex = val
      this.currentPage = val
      this.getEquipmentList()
    }
  }
}
</script>

<style>

</style>
