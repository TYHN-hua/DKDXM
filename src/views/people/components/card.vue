<template>
  <div>
    <el-card :class="`${workData.repair?'yunwei' : 'yunying'}`" style="width:98%;margin:20px;border-radius:20px">
      <el-row>
        <b>{{ workData.repair?'运维' : '运营' }}人员(当天)</b>
      </el-row>
      <el-row :gutter="20" style="padding:40px 0 0 50px;">
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">{{ workData.total }}</b><br><span class="info" style="font-size:12px;text-align:right">工单总数（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">{{ workData.completedTotal }}</b><br><span class="info" style="font-size:12px;text-align:right">完成工单（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">{{ workData.cancelTotal }}</b><br><span class="info" style="font-size:12px;text-align:right">拒绝工单（个）</span></div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><b style="font-size:36px;text-align:left">{{ workData.workerCount }}</b><br><span class="info" style="font-size:12px;text-align:right">运营人员数（个）</span></div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  // props: {
  //   workData: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  data() {
    return {
      workData: {}
    }
  }
  // created() {
  //   setTimeout(() => {
  //     console.log(this.workData)
  //   }, 2000)
  //   // console.log(this.workData)
  // }

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
  background-position: right bottom;
  color: #ff5757;
  span {
    color: #e19c9d;
  }
}
</style>
