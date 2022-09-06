<template>
  <div style="padding-right:20px">
    <el-row type="flex">
      <el-col><card ref="yunying" /></el-col>
      <el-col><card ref="yunwei" /></el-col>
    </el-row>
  </div>
</template>

<script>
import card from './components/card.vue'
import { getRepairTotal } from '@/api/people'
import { parseTime } from '@/utils'
export default {
  name: 'PeopleWorkStatistics',
  components: {
    card
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      yunying: {}
      // yunwei: {}
    }
  },

  async created() {
    this.getRepairTotal()
  },
  methods: {
    async getRepairTotal() {
      const date = parseTime(+new Date()).slice(0, 10)
      this.startTime = date + ' 00:00:00'
      this.endTime = date + ' 23:59:59'
      console.log(this.startTime, this.endTime)
      const { data } = await getRepairTotal(this.startTime, this.endTime)
      // console.log(data[0])
      this.$refs.yunying.workData = data[0]
      this.$refs.yunwei.workData = data[1]

      // this.yunying = data[1]
    }
  }
}
</script>

<style>

</style>
