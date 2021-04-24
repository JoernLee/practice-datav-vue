<template>
  <common-card
    title="累计订单量"
    value="2,157,420"
  >
    <template>
      <div id="total-orders-chart" :style="{width: '100%', height: '100%'}"/>
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
    //  钩子函数获取DOM
    mounted () {
      const chartDom = document.getElementById('total-orders-chart')
      // Vue原型链已经添加了echarts入口，不用每个组件都import echarts 很方便
      // init接收三个参数：要渲染的DOM，主题，Option-例如渲染器选择
      const chart = this.$echarts.init(chartDom)
      // 重点是配置option
      chart.setOption({
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
      })
    }
  }
</script>

<style scoped>

</style>
