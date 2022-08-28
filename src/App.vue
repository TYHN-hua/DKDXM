<template>
  <div id="app">
    <router-view />
    <!-- <MyPagination :total="299" :current-page="current" @changePageEvent="handleClick" /> -->
  </div>
</template>

<script>
// import MyPagination from '@/components/myPagination/index.vue'
export default {
  name: 'App'
  // components: {
  //   // MyPagination
  // },
  // data() {
  //   return {
  //     current: 2
  //   }
  // },
  // methods: {
  //   handleClick(val) {
  //     this.current = val
  //   }
  // }
}
</script>
