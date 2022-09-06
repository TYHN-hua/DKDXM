<template>
  <el-dialog
    title="人员详情"
    :visible.sync="showDialog"
    width="50%"
    :before-close="handleClose"
  >
    <div class="descriptions">
      <span>
        <el-descriptions style="padding-left: 10px">
          <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
      </span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
    }
  }

}
</script>

<style lang='scss' scope>
.descriptions {

  // background-color: red;

  .el-descriptions__table{
    background-color: #f3f6fb;
    padding-left: 20px;
  }
}
</style>
