<template>
  <div style="height: 500px" id="container"/>
</template>

<script>
  import 'echarts-liquidfill'

  export default {
    mounted () {
      const chart = this.$echarts.init(document.getElementById('container'))
      // 如果需要水球多个波浪，需要从大到小排列数据
      const data = [0.68, 0.4, 0.3]
      chart.setOption({
        series: [{
          type: 'liquidFill',
          data,
          // 颜色对应每一个data
          color: ['red', 'blue', 'yellow'],
          itemStyle: {
            opacity: 0.6
          },
          // 选中时效果
          emphasis: {
            itemStyle: {
              opacity: 0.9
            }
          }
        }]
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
