<template>
  <div>
    <el-dialog title="新增设备" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form ref="ruleForm" :model="formData" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="型号名称">
          <el-input v-model="formData.name" style="width:80%" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="型号编码" prop="vmType">
          <el-input v-model="formData.model" style="width:80%" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货道行数" prop="nodeId">
          <el-input v-model="formData.vmRow" style="width:80%" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货道列数" prop="nodeId">
          <el-input v-model="formData.vmCol" style="width:80%" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货道容量" prop="nodeId">
          <el-input v-model="formData.channelMaxCapacity" style="width:80%" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备图片" prop="nodeId">
          <UploadImg ref="employeesHeader" />
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
import { addEquipmentType } from '@/api/equipment'
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
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        staffPhoto: 'http://destiny001.gitee.io/image/cxk.gif'
      },
      rules: {
        name: [{ required: true, message: '设备类型名称不能为空', trigger: 'blur' }],
        model: [{ required: true, message: '设备类型编号不能为空', trigger: 'blur' }],
        vmRow: [{ required: true, message: '设备货道行不能为空', trigger: 'blur' }],
        vmCol: [{ required: true, message: '设备容量不能为空', trigger: 'blur' }],
        channelMaxCapacity: [{ required: true, message: '设备型号不能为空', trigger: 'blur' }],
      },
      loading: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:dialogVisible', false)
      // this.$refs.ruleForm.resetFields()
      // this.formData = {
      //   vmType: '',
      //   nodeId: '',
      //   createUserId: 1
      // }
    },
    PicSuccess({ url }) {
      console.log('1111', url)
      this.formData.staffPhoto = url
    },
    async submitAdd() {
    //  调用父组件
      if (this.$refs.employeesHeader.loading) {
        return this.$message.error('图片上传中')
      }
      await addEquipmentType(this.formData)
      this.$message.success('新增成功')
    }
  }
}
</script>

<style>

</style>
