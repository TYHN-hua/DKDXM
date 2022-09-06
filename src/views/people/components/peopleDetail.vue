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
          <el-descriptions-item label="人员名称">{{ userInfo.userName }}</el-descriptions-item>
          <el-descriptions-item label="角色">{{ userInfo.roleName }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ userInfo.mobile }}</el-descriptions-item>

          <el-descriptions-item label="负责区域">{{ userInfo.regionName }}</el-descriptions-item>
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
    padding: 20px;
  }
}
</style>
