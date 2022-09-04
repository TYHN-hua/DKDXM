<template>
  <div>
    <el-dialog title="新增设备" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form ref="ruleForm" :model="formData" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备编号">
          <el-input v-model="inner" :disabled="true" />
        </el-form-item>
        <el-form-item label="选择型号" prop="vmType">
          <el-select v-model="formData.vmType" style="width:80%" placeholder="请选择" @focus="getTypeName">
            <el-option v-for="item in equipmentList" :key="item.typeId" :label="item.name" :value="item.typeId" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位" prop="nodeId">
          <el-select v-model="formData.nodeId" style="width:80%" placeholder="请选择" @focus="getPointName">
            <el-option v-for="item in pointList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClose">取消</el-button>
          <el-button v-loading="loading" @click="submitAdd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTypeName, getPointName, addEquipment } from '@/api/equipment'
export default {
  name: 'AddEquipment',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inner: '系统自动生成',
      formData: {
        vmType: '',
        nodeId: '',
        createUserId: 1
      },
      rules: {
        vmType: [{ required: true, message: '设备型号不能为空', trigger: 'blur' }],
        nodeId: [{ required: true, message: '设备点位不能为空', trigger: 'blur' }]
      },
      equipmentList: [],
      pointList: [],
      loading: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.ruleForm.resetFields()
      this.formData = {
        vmType: '',
        nodeId: '',
        createUserId: 1
      }
    },
    // 选择设备型号列表
    async getTypeName() {
      const res = await getTypeName()
      this.equipmentList = res.data.currentPageRecords
      console.log(this.equipmentList)
    },
    // 选择设备点位列表
    async getPointName() {
      const res = await getPointName()
      this.pointList = res.data.currentPageRecords
      this.createUserId = res.data.currentPageRecords[0].createUserId
      console.log(this.pointList)
    },
    // 新增设备
    async submitAdd() {
      try {
        await this.$refs.ruleForm.validate()
        this.loading = true
        await addEquipment(this.formData)
        this.$message.success('新增设备成功')
        this.$parent.getEquipmentList()
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
