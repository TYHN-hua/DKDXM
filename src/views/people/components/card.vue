<template>
  <div>
    <el-card class="main" style="width:50%;margin:10px;border-radius:20px">
      <el-row>
        <b>运营人员(当天)</b>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px">1</b><br><span style="font-size:12px">2</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px">1</b><br><span style="font-size:12px">2</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px">1</b><br><span style="font-size:12px">2</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px">1</b><br><span style="font-size:12px">2</span></div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
  background-image: url('../../../assets/images/下载 (1).png'),
                    url('../../../assets/images/下载.png');
  background-repeat: no-repeat ,no-repeat;
  background-size: contain;
  background-position: center center,right bottom;
}
</style>
