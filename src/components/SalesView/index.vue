<template>
  <div class="sales-view">
    <el-card shadow="hover" :body-style="{padding: '0 0 20px 0'}">
      <!--        card-header部分内容,为什么使用header插槽可以直接看el-card源码，很清楚-->
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            class="sales-view-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="onMenuSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"/>
              <el-radio-button label="本周"/>
              <el-radio-button label="本月"/>
              <el-radio-button label="今年"/>
            </el-radio-group>
            <!--unlink-panels消除左右侧时间面板的联动效果，适合选取大范围日期-->
            <el-date-picker
              type="daterange"
              v-model="date"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              unlink-panels
              :picker-options="pickerOptions"
              class="sales-view-date-picker"
            />
          </div>
        </div>
      </template>
      <!--默认template会放入card主题区域-->
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options="chartOption"/>
          <div class="sales-view-list">
            <div class="sales-view-title">
              排行榜
            </div>
            <div class="list-item-wrapper">
              <div class="list-item" v-for="item in rankData" :key="item.no">
                <!--这里排行榜前3需要有额外样式，第一种可以像下面这样通过条件判断来处理-->
                <!--              <div class="list-item-no" :class="+item.no <= 3 ? 'top-no': ''">{{item.no}}</div>-->
                <!--              还可以通过class高级使用来写，下面这样，其实就是把上面写法合并了-->
                <div :class="['list-item-no',+item.no <= 3 ? 'top-no': '']">{{item.no}}</div>
                <div class="list-item-name">{{item.name}}</div>
                <div class="list-item-money">{{item.money}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        radioSelect: '今日',
        date: null,
        // 点开picker后左侧的选项
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              // 基本控制流程：设置一个start和end时间段，然后调用picker发送一个pick事件即可
              // 最近一周就基于Date的api减去一周毫秒数
              const start = new Date()
              debugger
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }]
        },
        chartOption: {
          title: {
            text: '年度销售额',
            color: '#666',
            left: 25,
            top: 20
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // 调整小线的位置
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: '#999'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#333'
            }
          },
          yAxis: {
            // 隐藏左侧Y轴line
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // 横向分割线样式调整
            splitLine: {
              lineStyle: {
                type: 'dotted',
                color: '#eee'
              }
            }
          },
          series: [{
            type: 'bar',
            barWidth: '35%',
            data: [200, 250, 300, 350, 300, 300, 350, 300, 300, 350, 300, 100]
          }],
          color: ['#3398DB'],
          // grid只会影响图表位置，title则需要去title里面控制
          grid: {
            top: 70,
            left: 60,
            right: 60,
            bottom: 50
          }
        },
        rankData: [
          {
            no: 1,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 2,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 3,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 4,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 5,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 6,
            name: '麦当劳',
            money: '323,234'
          }, {
            no: 7,
            name: '麦当劳',
            money: '323,234'
          }
        ]
      }
    },
    methods: {
      onMenuSelect (index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped lang="scss">
  .sales-view {
    margin-top: 20px;

    .menu-wrapper {
      position: relative;
      display: flex;

      .sales-view-menu {
        width: 100%;

        .el-menu-item {
          height: 50px;
          line-height: 58px;
          margin: 0 20px;
        }
      }

      .menu-right {
        position: absolute;
        right: 20px;
        top: 0;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .sales-view-date-picker {
          margin-left: 20px;
        }
      }
    }

    .sales-view-chart-wrapper {
      display: flex;
      height: 270px;

      .echarts {
        flex: 0 0 70%;
        width: 70%;
        height: 100%;
      }

      .sales-view-list {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin-top: 15px;

        .sales-view-title {
          margin-top: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #666;
        }

        .list-item-wrapper {
          margin-top: 15px;

          .list-item {
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 20px;
            padding: 6px 20px 6px 0;

            .list-item-no {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20px;
              height: 20px;
              color: #333;

              &.top-no {
                /*制作top的黑色圆圈背景*/
                background: #000;
                border-radius: 50%;
                color: #fff;
                font-weight: 500;
              }
            }

            .list-item-name {
              margin-left: 10px;
              color: #333;
            }

            .list-item-money {
              /*把剩下布局占满*/
              flex: 1;
              text-align: right;
            }

          }
        }
      }
    }
  }
</style>
