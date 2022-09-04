<template>
  <el-card>
    <el-row type="flex" align="middle">
      <el-col :span="3"><label>人员搜索:</label></el-col>
      <el-col :span="7"><input v-model="searchInfo" placeholder="请输入"></el-col>
      <el-col><el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button></el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  line-height: 1.8;
  width: 210px;
}
</style>
