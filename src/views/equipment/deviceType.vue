<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <span>设备型号：</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="search" placeholder="请输入型号" style="margin-left:-20px;" />
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
      </el-row>
      <el-row>
        <el-table ref="multipleTable" :data="List" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="name" label="型号名称" width="120" />
          <el-table-column prop="model" label="型号编码" width="120" />
          <el-table-column label="设备图片">
            <template slot-scope="{row}">
              <img
                :src="row.image"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding:10px;"
              >
            </template>
          </el-table-column>
          <el-table-column prop="vmRow" label="货道行" />
          <el-table-column prop="vmCol" label="货道列" />
          <el-table-column prop="channelMaxCapacity" label="设备容量" />
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-button type="text">修改</el-button>
              <el-button type="text" @click="del(row.typeId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <addType ref="addTypePic" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getTypeName, delEquipment } from '@/api/equipment'
import addType from './components/addType.vue'
export default {
  name: 'DeviceType',
  components: {
    addType
  },
  data() {
    return {
      search: '',
      List: [],
      dialogVisible: false
    }
  },
  mounted() {
    this.getEquipmentList()
  },
  methods: {
    // 搜索功能
    async searchBtn() {
      try {
        const res = await getTypeName({ name: this.search })
        console.log(res)
        // 搜索隐藏分页框，因为设备编号唯一，只能搜到一项
        if (res.data.totalCount === '0') {
          this.$message.error('未搜索到设备，请输入正确的设备型号')
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
    // 渲染列表
    async getEquipmentList() {
      const res = await getTypeName()
      console.log(res)
      this.List = res.data.currentPageRecords
    },
    addBtn() {
      // this.$refs.addTypePic.setImageUrl()
      this.dialogVisible = true
    },
    async del(val) {
      try {
        await this.$confirm('确定删除吗', '提示', {
          type: 'warning'
        })
        await delEquipment(val)
      } catch (error) {
        console.log(error)
        this.$message.error('管理员不让删')
      }
    }
  }
}
</script>

<style>

</style>
