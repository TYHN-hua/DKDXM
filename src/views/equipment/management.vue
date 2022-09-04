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
          <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="searchBtn">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">
          <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addBtn">新建</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="warning" plain @click="batchBtn">批量操作</el-button>
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
            <template slot-scope="{ row }">
              <el-button type="text" size="small">货道</el-button>
              <el-button type="text" size="small" @click="strategyBtn(row.innerCode)">策略</el-button>
              <el-button type="text" size="small" @click="changeEquipment(row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-card>
      <myPagination :total="totalCount" :current-page="currentPage" @changePageEvent="changePage" />
    </el-card>
    <addEquipment :dialog-visible.sync="dialogVisible" />
    <strategy :dialog-visibled.sync="dialogVisibled" :dialog-visibledd.sync="dialogVisibledd" :inner-code-list="innerCodeList" :policy="policy" />
    <changeEquipment :dialog-visibleed.sync="dialogVisibleed" :equipment="equipment" />
  </div>
</template>

<script>
import { getEquipmentList, getEquipmentPolicy } from '@/api/equipment'
import Equipment from '@/api/constant/equipment'
import myPagination from '@/components/myPagination/index.vue'
import addEquipment from './components/addEquipment.vue'
import strategy from './components/strategy.vue'
import changeEquipment from './components/changeEquipment.vue'
export default {
  name: 'Management',
  components: {
    myPagination,
    addEquipment,
    strategy,
    changeEquipment
  },
  data() {
    return {
      search: '',
      List: [],
      totalCount: 0,
      pageIndex: 1,
      currentPage: 1,
      dialogVisible: false,
      dialogVisibled: false,
      dialogVisibledd: false,
      dialogVisibleed: false,
      innerCodeList: [],
      policy: {},
      equipment: {}
    }
  },
  mounted() {
    this.getEquipmentList()
  },
  methods: {
    // 渲染主页面
    async getEquipmentList() {
      const res = await getEquipmentList({ pageIndex: this.pageIndex })
      // console.log(res)
      this.List = res.data.currentPageRecords
      this.totalCount = Number(res.data.totalCount)
      // console.log(this.List)
    },
    // 处理设备运行状态： 0:未投放; 1-运营; 3-撤机
    formatterFn(row, column, cellValue, index) {
      const obj = Equipment.equipmentType.find(ele => ele.id === cellValue * 1)
      return obj ? obj.value : '未投放'
    },
    // 分页功能
    changePage(val) {
      this.pageIndex = val
      this.currentPage = val
      this.getEquipmentList()
    },
    // 搜索功能
    async searchBtn() {
      const res = await getEquipmentList({ innerCode: this.search })
      // console.log(res)
      this.List = res.data.currentPageRecords
    },
    // 新建功能
    addBtn() {
      this.dialogVisible = true
    },
    // 添加策略功能
    async strategyBtn(val) {
      // console.log(val)
      // 获取设备策略详情
      const res = await getEquipmentPolicy(val)
      // console.log(res)
      // 判断有策略数据,则展示策略详情，没策略数据，则设置策略
      if (res.data === '') {
        this.dialogVisibled = true
      } else {
        this.policy = res.data
        console.log(this.policy)
        this.dialogVisibledd = true
      }
      this.innerCodeList = [val]
    },
    // 批量操作功能
    batchBtn() {
      this.dialogVisibled = true
    },
    // 修改设备
    changeEquipment(val) {
      console.log(val)
      this.equipment = val
      this.dialogVisibleed = true
    }
  }
}
</script>

<style lang="scss">
 .el-card__body {
    .pagination-container {
      padding: 0 16px;
    }
  }

</style>
