<template>
  <el-dialog title="设备详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">销售量：<span>{{ goodsCount }}个</span></el-col>
        <el-col :span="6">销售额：<span>{{ Income }}元</span></el-col>
        <el-col :span="6">补货次数: <span>{{ Supply }}次</span></el-col>
        <el-col :span="6">维修次数：<span>{{ Repair }}次</span></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-col v-for="(item,index) in list" :key="index" :span="6">
          <div style="border: 1px solid #ccc; height: 41px; line-height: 41px; text-align: center; overflow: hidden;">{{ item.skuName }}:{{ item.count }}</div>
        </el-col>
      </el-row>
    </el-card>
  </el-dialog>
</template>

<script>
import { getTime, getNowTime, getTimeDate, getNowTimeData } from '@/utils/index'
import { getRepairCount, getSupplyCount, getSkuCollect, getGoodsCount, getGoodsIncome } from '@/api/equipment'
export default {
  name: 'LookDetail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    repairCount: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      Repair: '',
      Supply: '',
      list: [],
      goodsCount: 0,
      Income: 0
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async getRepairCount() {
      console.log(this.repairCount)
      const res = await getRepairCount({ innerCode: this.repairCount.innerCode, start: getTime(), end: getNowTime() })
      this.Repair = res.data
    },
    async getSupplyCount() {
      const res = await getSupplyCount({ innerCode: this.repairCount.innerCode, start: getTime(), end: getNowTime() })
      this.Supply = res.data
    },
    async getSkuCollect() {
      const res = await getSkuCollect({ innerCode: this.repairCount.innerCode, start: getTime(), end: getNowTime() })
      this.list = res.data
    },
    async getGoodsCount() {
      const res = await getGoodsCount({ start: getTimeDate(), end: getNowTimeData(), innerCode: this.repairCount.innerCode })
      // console.log(res)
      this.goodsCount = res.data
    },
    async getGoodsIncome() {
      const res = await getGoodsIncome({ start: getTimeDate(), end: getNowTimeData(), innerCode: this.repairCount.innerCode })
      this.Income = res.data / 100
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    background: rgba(227, 233, 245, .39);

    span {
      color: #5f84ff;
    }
  }

  .el-card__body {
    .el-row {
      span {
        color: #5f84ff;
      }
    }
  }
</style>
