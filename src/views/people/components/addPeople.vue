<template>
  <div>
    <el-dialog
      title="新增人员"
      :visible.sync="showDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="addForm"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="人员名称：" prop="userName">
          <el-input
            v-model="formData.userName"
            maxlength="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              @click.native="getRoleId(item.roleId)"
            />

          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input
            v-model="formData.mobile"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="负责区域：" prop="regionName">
          <el-select v-model="formData.regionName" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
              @click.native="getRegionId(item.id)"
            />

          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="image">
          <el-upload
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            list-type="picture-card"
            action="#"
            :file-list="fileList"
            :on-change="onChange"
            :http-request="oRequest"
            :on-remove="onRemove"
            :limit="limit"
            :class="`${fileList.length === limit ? 'hideCard' : ''}`"
            :before-upload="beforeUpload"
          >

            <img v-if="formData.image" :src="formData.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="状态">
          <el-checkbox v-model="formData.status">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { addPeople } from '@/api/people'
const cos = new COS({
  SecretId: 'AKIDqVv4vVosoTr0rRkmX2GL9gwve5F8l7By',
  SecretKey: 'Zrsc4GBpERP7YjdGchW4LL5YkfKkAKDq'
})
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    roleList: {
      type: Array,
      default: () => ([])
    },
    regionList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      formData: {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        image: '',
        status: false
      },
      loading: false,
      fileList: [],
      limit: 1,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确格式手机号', trigger: 'blur' }
        ],
        regionName: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ]

      }
    }
  },
  inject: ['getPeopleList'],
  methods: {
    onChange(file, fileList) {
      // file 当前上传的图片
      // fileList 图片列表
      // console.log('上传图片', file, fileList)
      this.fileList = fileList
    },
    oRequest(data) {
    // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
    // params.file
      this.loading = true
      cos.putObject({
        Bucket: 'hehejijing-renzi-1300308872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        this.loading = false
        if (err || data.statusCode !== 200) {
          return this.$message.error('请重试')
        }

        console.log(err || data)
        this.formData.image = 'https://' + data.Location
      })
    },
    onRemove(file, fileList) {
      // file 当前被删除的文件
      // 剩余的文件列表
      this.fileList = fileList
    },

    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png', 'image/svg+xml']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG \SVG格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },

    handleClose() {
      this.$refs.addForm.resetFields()
      this.formData = {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        image: '',
        status: false
      }
      this.fileList = []
      this.$emit('update:showDialog', false)
    },
    getRegionId(id) {
      this.formData.regionId = id
    },
    getRoleId(id) {
      this.formData.roleId = id
    },
    async sureAdd() {
      try {
        await this.$refs.addForm.validate()
        this.loading = true
        await addPeople(this.formData)
        this.getPeopleList()
        this.handleClose()
        this.$message.success('添加成功')
      } catch (e) {
        this.$message.error('请重试')
        console.log(e)
      } finally {
        this.loading = false
      }
    }

  }
}

</script>

<style lang="scss" >
.hideCard {
  .el-upload--picture-card {

    display: none;
  }
}
</style>
