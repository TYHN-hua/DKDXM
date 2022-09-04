<template>
  <el-dialog title="修改设备" :visible.sync="dialogVisibleed" width="40%" :before-close="handleClose">
    <el-row class="rowbstd">
      <el-col :span="12">
        <span>机器编号： {{ equipment.innerCode }}</span>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="18">
        <span>供货时间： {{ equipment.updateTime }}</span>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="12">
        <span>设备类型： {{ equipment.type && equipment.type.name }}</span>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="12">
        <span>设备容量： {{ equipment.type && equipment.type.vmCol }}</span>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="rowbstd">
      <el-col :span="5">
        <span>设备点位：</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="value" placeholder="请选择" size="small" @focus="changeSel">
          <el-option v-for="item in pointList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="12">
        <span>合作商： {{ equipment.node && equipment.node.ownerName }}</span>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="12">
        <span>所属区域： {{ equipment.region && equipment.region.name }}</span>
      </el-col>
    </el-row>
    <el-row class="rowbstd">
      <el-col :span="24">
        <span>设备地址： {{ equipment.node && equipment.node.name }}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button v-loading="loading" type="primary" size="small" @click="changeBtn">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPointName, changePoint } from '@/api/equipment'
export default {
  name: 'ChangeEquipment',
  props: {
    dialogVisibleed: {
      type: Boolean,
      default: false
    },
    equipment: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      value: '',
      pointList: [],
      loading: false,
      a: ''
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:dialogVisibleed', false)
      this.value = ''
    },
    // 获取设备点位列表
    async changeSel() {
      const res = await getPointName()
      this.pointList = res.data.currentPageRecords
      console.log(this.pointList)
    },
    // 修改设备点位
    async changeBtn() {
      try {
        this.loading = true
        const res = await changePoint({ id: this.equipment.id, nodeId: this.value })
        console.log(res)
        this.$message.success('修改设备点位成功')
      } catch (error) {
        //  后端返回数据有问题，故只能写死
        this.$message.error('修改失败，设备正在运行中')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.rowbstd {
  margin-bottom: 20px;
}
.el-dialog__body {
  padding: 30px 0px 30px 60px;
}
</style>
