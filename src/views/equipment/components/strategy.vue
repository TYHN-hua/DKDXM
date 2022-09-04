<template>
  <div>
    <el-dialog title="批量策略管理" :visible.sync="dialogVisibled" width="40%" :before-close="handleClose">
      <el-form ref="ruleForm" :model="formData" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择策略" prop="policyId">
          <el-select v-model="formData.policyId" style="width:80%" placeholder="请选择" @focus="getStrategy">
            <el-option v-for="item in strategyList" :key="item.policyId" :label="item.policyName" :value="item.policyId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClose">取消</el-button>
          <el-button v-loading="loading" @click="userPolicy">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="策略管理" :visible.sync="dialogVisibledd" width="40%" :before-close="handleClose">
      <el-row type="flex" justify="space-around" class="rowasd">
        <el-col :span="8">
          <span>机器编号： {{ policy.innerCode }}</span>
        </el-col>
        <el-col :span="8">
          <span>策略名称： {{ policy.policyName }}</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="rowasd">
        <el-col :span="8">
          <span>策略方案： {{ policy.discount }}%</span>
        </el-col>
        <el-col :span="8">
          <span />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="warning" size="small" @click="cancelBtn">取消策略</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getStrategyList, useEquipmentPolicy, cancelPolicy } from '@/api/equipment'
export default {
  props: {
    dialogVisibled: {
      type: Boolean,
      default: false
    },
    dialogVisibledd: {
      type: Boolean,
      default: false
    },
    innerCodeList: {
      type: Array,
      required: true
    },
    policy: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      strategyList: [],
      formData: {
        policyId: ''
      },
      loading: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:dialogVisibled', false)
      this.$emit('update:dialogVisibledd', false)
    },
    // 获取设备编号列表
    async getStrategy() {
      const res = await getStrategyList()
      this.strategyList = res.data
      // console.log(this.strategyList)
    },
    // 批量策略管理
    async userPolicy() {
      try {
        this.loading = true
        await useEquipmentPolicy({ innerCodeList: this.innerCodeList, policyId: this.formData.policyId })
        this.$message.success('策略设置成功')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 取消策略
    async cancelBtn() {
      await cancelPolicy({ innerCode: this.policy.innerCode, policyId: this.policy.policyId })
      this.handleClose()
    }
  }
}
</script>

<style>
.rowasd {
  margin-bottom: 20px;
}
</style>
