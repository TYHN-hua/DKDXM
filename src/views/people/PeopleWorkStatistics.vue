<template>
  <div>
    <card />
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
      endTime: ''
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
      const res = await getRepairTotal(this.startTime, this.endTime)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
