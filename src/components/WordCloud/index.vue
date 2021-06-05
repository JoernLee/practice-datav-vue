<template>
  <ve-wordcloud :data="chartData" height="100%" width="100%"/>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['name', 'value'],
          rows: [{
            name: '慕课网',
            value: 80
          }, {
            name: '数据可视化',
            value: 50
          }, {
            name: '我是demo',
            value: 30
          }, {
            name: '数据可视化2',
            value: 40
          }, {
            name: '我是demo3',
            value: 80
          }]
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
