<template>
  <v-chart :options="options"/>
</template>

<script>
  import 'echarts/extension/bmap/bmap' // 引入百度地图的扩展，可以在Echarts里面使用bmap

  // mock数据
  const testPoint = [{
    name: '海门',
    // 经纬度，销售额
    value: [121.15, 31.89, 80]
  }, {
    name: '南京',
    // 经纬度，销售额
    value: [118.78, 32.04, 100]
  }]

  const testPoint2 = [{
    name: '北京',
    // 经纬度，销售额
    value: [116.404267, 39.913385, 200]
  }, {
    name: '上海',
    // 经纬度，销售额
    value: [121.475941, 31.222836, 195]
  }]

  export default {
    data () {
      return {
        options: {}
      }
    },
    mounted () {
      this.options = {
        title: {
          text: '慕课外卖销售数据大盘',
          subtext: '销售趋势统计',
          sublink: 'http://www.imooc.com',
          left: 'center'
        },
        // 引入百度地图扩展后就可以配置bmap了
        bmap: {
          key: 'LOaAEpspHorOR4Aq8ifOQpIGbzUuVO4D', // 百度地图的应用key,
          center: [104.114129, 37.550339],
          zoom: 5,
          // 地图是否可以交互，例如拖拽移动放大缩小
          roam: false
          // 自定义Map样式，可以官网生成放这里使用
          // mapStyle: {}
        },
        // 定制图
        series: [
          {
            name: '销售额',
            type: 'scatter', // 散点图
            coordinateSystem: 'bmap', // 坐标系统是百度
            data: testPoint,
            encode: {
              value: 2 // value取第二个数据（不然取成纬度值了），配合下面tooltip的展示
            },
            itemStyle: {
              color: 'purple'
            },
            symbolSize: function (val) {
              // val是数据源的value，是个数组
              return val[2] / 10
            },
            label: {
              show: false,
              position: 'right',
              formatter: function (val) {
                return `${val.data.name} - ${val.data.value[2]}`
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 2',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: testPoint2,
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: function (val) {
                return `${val.data.name} - ${val.data.value[2]}`
              },
              position: 'right',
              show: true
            },
            hoverAnimation: true, // 悬浮动画
            // 波纹样式配置
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              color: 'purple',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        ],
        // 鼠标移动上点会展示内容
        tooltip: {}
      }
    }
  }
</script>

<style scoped>

</style>
