<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{orderLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
  import commonCardMixin from '../../mixins/commonCardMixin'
  import commonDataMixin from '../../mixins/commonDataMixin'

  export default {
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
      getOptions () {
        // 保证图表不会出现默认矩形
        return this.orderTrend.length > 0 ? {
          xAxis: {
            // X轴需要一些配置，以实现需要的效果，并且不显示X轴数字
            type: 'category',
            show: false,
            // 默认X轴距离左右边界有间距，做到极限拉伸需要设置为false
            boundaryGap: false
          },
          yAxis: {
            // Y轴需要隐藏
            show: false
          },
          // 一个系列就是一张图
          series: [{
            type: 'line',
            data: this.orderTrend,
            // 展示折现下面积
            areaStyle: {
              color: 'purple'
            },
            // 把折线隐藏
            lineStyle: {
              width: 0
            },
            // 让数据点不显示
            itemStyle: {
              opacity: 0
            },
            // 平滑展示
            smooth: true
          }],
          // 控制grid，让坐标系贴合不要有缝隙
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        } : null
      }
    }
  }
</script>

<style scoped>

</style>
