<template>
  <common-card
    title="累计用户数"
    :value="userToday">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比 </span>
        <span class="emphasis">{{userGrowthLastDay}}%</span>
        <div class="increase"/>
        <span class="month">月同比 </span>
        <span class="emphasis">{{userGrowthLastMonth}}%</span>
        <div class="decrease"/>
      </div>
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
        return {
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            // 图是横着的，我们将Y轴设置为category而非传统意义的value
            type: 'category',
            show: false
          },
          tooltip: {},
          series: [{
            type: 'bar',
            name: '上月平台用户数',
            // 通过stack来进行相同series合并！
            stack: '总量',
            data: [200],
            // data: [this.userLastMonth]
            barWidth: '10px',
            itemStyle: {
              color: '#45c946'
            }
          }, {
            // 最终结果是左右两侧合并为的一个bar，存在两组数据
            type: 'bar',
            name: '今月平台用户数',
            stack: '总量',
            data: [250],
            // data: [this.userToday]
            // barWidth: '10px', 不用写两次同一个stack
            itemStyle: {
              color: '#eee'
            }
          }, {
            // 你需要明白，如果你想要在echarts的canvas里面绘图，都需要通过调整series来实现
            // 自定义series
            type: 'custom',
            data: [200],
            // data: [this.userLastMonth]
            stack: '总量',
            // 自定义绘制
            renderItem: (params, api) => {
              // params提供了一些绘图数据，例如series索引和名称，X轴和Y轴数据映射关系，坐标系信息样式等等
              // api提供了工具方法
              // console.log(params, api)
              // 拿到0处数据
              const value = api.value(0)
              // 获取200，0处坐标，这个endPoint数据非常重要
              const endPoint = api.coord([value, 0])
              return {
                // type: 'path',
                // 管理一组图形
                type: 'group',
                position: endPoint,
                children: [{
                  type: 'path',
                  shape: {
                    // d可以去类似iconfont图标库，复制其中的SVG，然后可以看到XML里面有一段<path>可复制里面d属性过来
                    d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                    x: -5,
                    y: -20,
                    width: 10,
                    height: 10,
                    // layout会根据传入的宽高和xy，定义缩放策略，定义cover会完全填满,默认center是保持原先SVG样式
                    layout: 'cover'
                  },
                  style: {
                    // 填充色
                    fill: '#45c946'
                  }
                }, {
                  type: 'path',
                  shape: {
                    // d可以去类似iconfont图标库，复制其中的SVG，然后可以看到XML里面有一段<path>可复制里面d属性过来
                    d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                    x: -5,
                    y: 10,
                    width: 10,
                    height: 10,
                    layout: 'cover'
                  },
                  style: {
                    // 填充色
                    fill: '#45c946'
                  }
                }]

              }
            }
          }]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .total-users-footer {
    display: flex;
    align-items: center;

    .month {
      margin-left: 10px;
    }

  }
</style>
