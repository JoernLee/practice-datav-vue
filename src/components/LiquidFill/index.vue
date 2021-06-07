<template>
  <ve-liquidfill :data="chartData" height="100%" :settings="chartSettings"/>
</template>

<script>

  import commonDataMixin from '../../mixins/commonDataMixin'

  function getColor (value) {
    // 根据不同值给予不同颜色 - 反应不同数据状态 - 辨别健康程度
    return value > 0 && value <= 0.5 ? 'rgba(97,216,0,0.7)'
      : value > 0.5 && value <= 0.8 ? 'rgba(204,178,26,0.7)'
        : value > 0.8 ? 'rgba(241,47,28,0.7)' : '#c7c7cb'
  }

  export default {
    mixins: [commonDataMixin],
    watch: {
      userGrowthLastMonth () {
        console.log('userGrowthLastMonth', this.userGrowthLastMonth)
        this.chartData = {
          columns: ['title', 'percent'], // 第一个是title，第二个才是value
          rows: [{
            title: '用户月同比增长',
            // 水球图组件的percent需要0-1的数据
            percent: this.userGrowthLastMonth / 100
          }]
        }
        // 把原先mounted的charSetting拿过来
        this.chartSettings = {
          seriesMap: {
            // 通过title定位
            用户月同比增长: {
              radius: '80%',
              label: {
                // 修改文本样式
                normal: {
                  // 常规状态下定制输出格式
                  formatter: (v) => {
                    console.log(v)
                    return `${(v.data.value * 100).toFixed(2)}%`
                  },
                  textStyle: {
                    fontSize: 36,
                    color: '#999',
                    fontWeight: 'normal'
                  },
                  position: ['50%', '50%']
                }
              },
              // 修改边框
              outline: {
                itemStyle: {
                  borderColor: '#aa4a4',
                  borderWidth: 1,
                  color: 'none',
                  shadowBlur: 0,
                  shadowColor: '#fff'
                },
                // 内外边框间距
                borderDistance: 0
              },
              backgroundStyle: {
                color: '#fff'
              },
              itemStyle: {
                // 移除默认阴影
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              // 修改振幅
              amplitude: 8,
              // 这里如果放在data的话初始化时候拿不到chartData，所以chartSettings初始化要往后面放到mounted
              color: [getColor(this.chartData.rows[0].percent)]
            }
          }
        }
      }
    },
    data () {
      return {
        chartData: {},
        chartSettings: {}
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
