<template>
  <div>
    <el-card class="yunying" style="width:50%;margin:10px;border-radius:20px">
      <el-row>
        <b>运营人员(当天)</b>
      </el-row>
      <el-row :gutter="20" style="padding:40px 0 0 50px;">
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">1</b><br><span class="info" style="font-size:12px;text-align:right">工单总数（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">1</b><br><span class="info" style="font-size:12px;text-align:right">完成工单（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">1</b><br><span class="info" style="font-size:12px;text-align:right">拒绝工单（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">1</b><br><span class="info" style="font-size:12px;text-align:right">运营人员数（个）</span></div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.yunying {
  background-color: #e9f3ff;
  background-image: url('../../../assets/images/下载 (1).png'),
                    url('../../../assets/images/下载.png');
  background-repeat: no-repeat ,no-repeat;
  // background-size: contain;
  background-position: left top,right bottom;
  color: #072074;
  span {
    color: #c4b9de;
  }
}
.yunwei {
  background-color: #fbefe8;
  background-image: url('../../../assets/images/operation.4120cc58.png');

  background-repeat: no-repeat;
  // background-size: contain;
  background-position: left top,right bottom;
  color: #072074;
  span {
    color: #c4b9de;
  }
}
</style>
