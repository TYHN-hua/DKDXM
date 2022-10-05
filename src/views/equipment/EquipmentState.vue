<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <span>设备编号：</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="search" placeholder="请输入编号" style="margin-left:-20px;" />
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="searchBtn">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-table ref="multipleTable" :data="List" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="innerCode" label="设备编号" width="180" />
          <el-table-column prop="type.name" label="设备型号" width="120" />
          <el-table-column prop="node.addr" label="详细地址" width="320" />
          <el-table-column prop="vmStatus" label="运营状态" width="120" :formatter="formatterFn" />
          <el-table-column label="设备状态" show-overflow-tooltip>
            <template>
              <el-button type="warning" round size="small">离线</el-button>
              <el-button type="success" round size="small">货道</el-button>
              <el-button type="success" round size="small">传动轴</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="120">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="lookBtn(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-card>
      <myPagination v-if="isShow" :total="totalCount" :current-page="currentPage" @changePageEvent="changePage" />
    </el-card>
    <lookDetail :dialog-visible.sync="dialogVisible" :repair-count="repairCount" />
  </div>
</template>

<script>
import { getEquipmentList } from '@/api/equipment'
import Equipment from '@/api/constant/equipment'
import myPagination from '@/components/myPagination/index.vue'
import lookDetail from './components/lookDetail.vue'
export default {
  name: 'EquipmentState',
  components: {
    myPagination,
    lookDetail
  },
  data() {
    return {
      search: '',
      List: [],
      totalCount: 0,
      pageIndex: 1,
      currentPage: 1,
      isShow: true,
      dialogVisible: false,
      repairCount: {}
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
    // 搜索功能
    async searchBtn() {
      try {
        const res = await getEquipmentList({ innerCode: this.search })
        // console.log(res)
        // 搜索隐藏分页框，因为设备编号唯一，只能搜到一项
        if (res.data.totalCount === '0') {
          this.$message.error('未搜索到设备，请输入正确的设备编码')
        } else {
          this.List = res.data.currentPageRecords
          this.$message.success('搜索成功')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isShow = false
      }
    },
    // 分页功能
    changePage(val) {
      this.pageIndex = val
      this.currentPage = val
      this.getEquipmentList()
    },
    // 查看详情
    lookBtn(val) {
      console.log(val)
      this.repairCount = val
      // console.log(this.$children)
      this.$children[3].getRepairCount()
      this.$children[3].getSupplyCount()
      this.$children[3].getSkuCollect()
      this.$children[3].getGoodsCount()
      this.$children[3].getGoodsIncome()
      this.dialogVisible = true
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
