<template>
  <el-card>
    <el-row type="flex" align="middle" justify="start">
      <label style="margin-right: 10px">人员搜索:</label>
      <input v-model="searchInfo" style="margin-right: 10px" placeholder="请输入">
      <!-- <el-button type="primary" icon="el-icon-search" size="small" style="margin-right: 30px" @click="search">查询</el-button> -->
      <div v-if="showTwo">
        <label style="margin-right: 10px">角色:</label>
        <input v-model="searchInfo" style="margin-right: 10px" placeholder="请输入">
      </div>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showTwo: {
      type: Boolean,
      default: false
    }
  },
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
