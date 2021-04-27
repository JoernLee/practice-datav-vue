<template>
  <common-card
    title="累计订单量"
    value="2,157,420"
  >
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">2,000,000</span>
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
            data: [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220],
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
        }
      }
    }
  }
</script>

<style scoped>

</style>
