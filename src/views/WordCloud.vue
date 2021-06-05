<template>
  <div id="container"/>
</template>

<script>
  import 'echarts-wordcloud'

  export default {
    mounted () {
      const data = [{
        name: '慕课网',
        value: 100
      }, {
        name: '可视化',
        value: 50
      }]
      const chart = this.$echarts.init(document.getElementById('container'))
      chart.setOption({
        series: [{
          // 更多的配置可以去官方文档去看
          type: 'wordCloud',
          data: data,
          shape: 'circle',
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function () {
                // 随机color
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              // 鼠标移上去有阴影效果
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        }]
      })
    }
  }
</script>

<style scoped lang="scss">
  #container {
    width: 100%;
    height: 100%;
  }
</style>
