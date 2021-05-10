<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">93,634</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">193,782</div>
                <!--                暂时换成一样的option，后面对接数据再分开-->
                <v-chart :options="searchUserOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="180px"/>
                <el-table-column prop="keyword" label="关键词"/>
                <el-table-column prop="count" label="总搜索量"/>
                <el-table-column prop="users" label="搜索用户数"/>
              </el-table>
              <!--            翻页器，目前先优化下样式-->
              <el-pagination
                layout="prev,pager,next"
                :page-count="100"
                :page-size="4"
                background
                @current-change="onPageChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size="small">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOption"/>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchUserOption: {
          xAxis: {
            type: 'category',
            boundaryGap: false
          },
          yAxis: {
            show: false,
            // 设置最大Y轴数值范围，防止超过可显示范围
            min: 0,
            max: 350
          },
          series: [{
            // 需要实现一个平滑面积图
            type: 'line',
            data: [100, 150, 200, 300, 150, 200, 250, 300, 150, 200, 300, 150, 100],
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgb(95,187,255)'
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }],
          grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        },
        searchNumberOption: {},
        categoryOption: {
          // 饼图存在标题，中间有一个累计订单量title和数据，外围有一个环形图，而且是空心的
          // 每一个块颜色不同，且鼠标移动有item数据展示
        },
        radioSelect: null,
        tableData: [
          {
            id: 1,
            rank: 1,
            keyword: '北京',
            count: 100,
            users: 90,
            range: '90%'
          }, {
            id: 2,
            rank: 2,
            keyword: '北京',
            count: 100,
            users: 90,
            range: '90%'
          }, {
            id: 3,
            rank: 3,
            keyword: '北京',
            count: 100,
            users: 90,
            range: '90%'
          }, {
            id: 4,
            rank: 4,
            keyword: '北京',
            count: 100,
            users: 90,
            range: '90%'
          }
        ]
      }
    },
    methods: {
      onPageChange (page) {
        console.log(page)
      },
      renderPieChart () {
        const mockData = [
          {
            legendname: '粉面粥店',
            value: 67,
            percent: '15.40%',
            itemStyle: {
              color: '#e7e702'
            },
            // 加入name之后就会出现legend了
            name: '粉面粥店 | 15.40%'
          }, {
            legendname: '简餐便当',
            value: 97,
            percent: '22.30%',
            itemStyle: {
              color: '#8d7fec'
            },
            name: '简餐便当 | 22.30%'
          }, {
            legendname: '汉堡披萨',
            value: 92,
            percent: '21.15%',
            itemStyle: {
              color: '#5085f2'
            },
            name: '汉堡披萨 | 21.15%'
          }
        ]
        this.categoryOption = {
          title: [{
            text: '品类分布',
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          }, {
            // 加入环中间的title,挪位置
            text: '累计订单量',
            subtext: '320',
            x: '34.5%',
            y: '42.5%',
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            }
          }],
          // 饼图不需要坐标系
          series: [{
            type: 'pie',
            data: mockData,
            label: {
              // 控制饼图沿线的文案
              normal: {
                show: true,
                position: 'outter',
                formatter: function (params) {
                  return params.data.legendname
                }
              }
            },
            // 决定圆心位置，设置为宽度的对应百分比
            center: ['35%', '50%'],
            // 让圆变成空心，第一个元素是内半径，第二个元素是外半径，两个相减就是环宽度
            // 对应百分比元素是容器宽高中值较小的
            radius: ['45%', '60%'],
            // 控制引线长度
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            // 逆时针
            clockwise: false,
            // 实现块与块之间的间距
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            }
          }],
          // 配置legend的样式和位置
          legend: {
            type: 'scroll',
            orient: 'vertical',
            height: 250,
            left: '70%',
            top: 'middle',
            textStyle: {
              color: '#8c8c8c'
            }
          },
          tooltip: {
            trigger: 'item',
            // 定制展示信息
            formatter: function (params) {
              const str = params.seriesName + '<br/>' +
                params.marker + params.data.legendname + '<br/>' +
                '数量:' + params.data.value + '<br/>' +
                '占比:' + params.data.percent
              return str
            }
          }
        }
      }
    },
    mounted () {
      this.renderPieChart()
    }
  }
</script>

<style scoped lang="scss">
  .bottom-view {
    display: flex;
    margin-top: 20px;

    .view {
      flex: 1;
      width: 50%;
      box-sizing: border-box;

      &:first-child {
        padding: 0 10px 0 0;
      }

      &:last-child {
        padding: 0 0 0 10px;
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: 500;
        padding: 0 0 0 20px;
      }

      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }

      .chart-wrapper {
        display: flex;
        flex-direction: column;
        height: 452px;

        .chart-inner {
          display: flex;
          padding: 0 10px;
          margin-top: 20px;

          .chart {
            flex-grow: 1;
            padding: 0 10px;

            .chart-title {
              color: #999;
              font-size: 14px;
            }

            .chart-data {
              font-size: 22px;
              color: #333;
              font-weight: 500;
              letter-spacing: 2px;
            }

            .echarts {
              height: 50px;
            }
          }
        }

        .table-wrapper {
          flex-grow: 1;
          margin-top: 20px;
          padding: 0 20px 20px;

          .el-pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
