<template>
  <common-card
    title="今日交易用户数"
    value="81,014">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">5.14%</span>
    </template>
  </common-card>
</template>

<script>
  import commonCardMixin from '../../mixins/commonCardMixin'

  export default {
    mixins: [commonCardMixin],
    methods: {
      getOptions () {
        return {
          xAxis: {
            type: 'category',
            // 为了实现鼠标悬浮有时间展示，需要X轴值
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
            show: false,
            boundaryGap: false
          },
          yAxis: {
            show: false
          },
          color: ['#3398DB'],
          series: [{
            // 柱状图
            type: 'bar',
            data: [410, 200, 200, 334, 390, 330, 220, 150, 22, 200, 600, 400],
            // 让柱状图缩小一些
            barWidth: '60%'
          }],
          // 控制grid，让坐标系贴合不要有缝隙
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
