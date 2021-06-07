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
                <div class="chart-data">{{userCount}}</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{searchCount}}</div>
                <!--                暂时换成一样的option，后面对接数据再分开-->
                <v-chart :options="searchNumberOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="100px"/>
                <el-table-column prop="keyword" label="关键词"/>
                <el-table-column prop="count" label="总搜索量"/>
                <el-table-column prop="users" label="搜索用户数"/>
                <el-table-column prop="range" label="搜索占比"/>
              </el-table>
              <!--            翻页器，目前先优化下样式-->
              <el-pagination
                layout="prev,pager,next"
                :total="total"
                :page-size="pageSize"
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
              <el-radio-group v-model="radioSelect" size="small" @change="onCategoryChange">
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
  import commonDataMixin from '../../mixins/commonDataMixin'

  // PieChart的调色盘
  const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702']

  export default {
    mixins: [commonDataMixin],
    data () {
      return {
        searchUserOption: {},
        searchNumberOption: {},
        categoryOption: {
          // 饼图存在标题，中间有一个累计订单量title和数据，外围有一个环形图，而且是空心的
          // 每一个块颜色不同，且鼠标移动有item数据展示
        },
        radioSelect: '品类',
        tableData: [],
        totalData: [],
        total: 100, // 总数据量
        pageSize: 4, // 一页数据量
        userCount: 0,
        searchCount: 0
      }
    },
    methods: {
      onCategoryChange (type) {
        this.radioSelect = type
        this.renderPieChart()
      },
      onPageChange (page) {
        console.log(page)
        this.renderTable(page)
      },
      renderPieChart () {
        // 接口没有数据就不渲染了
        if (!this.category1.data1 || !this.category2.data1) {
          return
        }
        let data
        let axis
        let total = 0
        // 根据不同radio选中项，赋予不同的数据源
        if (this.radioSelect === '品类') {
          // 只展示4个数据 - 你可以自己控制展示的数据数量
          data = this.category1.data1.slice(0, 4)
          axis = this.category1.axisX.slice(0, 4)
          total = data.reduce((s, i) => s + i, 0)
        } else {
          data = this.category2.data1.slice(0, 4)
          axis = this.category2.axisX.slice(0, 4)
          total = data.reduce((s, i) => s + i, 0)
        }
        const chartData = []
        data.forEach((item, index) => {
          const percent = `${(item / total * 100).toFixed(2)}%`
          chartData.push({
            legendname: axis[index],
            value: item,
            percent,
            itemStyle: {
              color: colors[index]
            },
            name: `${axis[index]} | ${percent}`
          })
        })
        this.categoryOption = {
          title: [{
            text: `${this.radioSelect}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          }, {
            // 加入环中间的title,挪位置
            text: '累计订单量',
            subtext: total,
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
            data: chartData,
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
      },
      renderTable (page) {
        // 动态更新tableData的值 - 截断总的数据，根据当前分页号page动态获取slice范围
        this.tableData = this.totalData.slice(
          (page - 1) * this.pageSize,
          (page - 1) * this.pageSize + this.pageSize
        )
      },
      renderLineChart () {
        // 根据数据动态生成linechart的数据源
        const createOption = (key) => {
          const data = []
          const axis = []
          this.wordCloud.forEach(item => data.push(item[key]))
          this.wordCloud.forEach(item => axis.push(item.word))
          return {
            tooltip: {},
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: axis
            },
            yAxis: {
              show: false
            },
            series: [{
              // 需要实现一个平滑面积图
              type: 'line',
              data: data,
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
          }
        }
        this.searchUserOption = createOption('users')
        this.searchNumberOption = createOption('count')
      }
    },
    mounted () {
      this.renderPieChart()
    },
    watch: {
      wordCloud () {
        console.log('wordcloud', this.wordCloud)
        // 遍历接口返回的wordCloud数据并适配出原先列表的mock数据规范
        const totalData = []
        this.wordCloud.forEach((item, index) => {
          totalData.push({
            id: index + 1,
            rank: index + 1,
            keyword: item.word,
            count: item.count,
            users: item.users,
            range: `${((item.users / item.count) * 100).toFixed(2)}%`
          })
        })
        this.totalData = totalData
        // 用于给pagination计算分页数量
        this.total = this.totalData.length
        console.log(this.totalData)
        // 进行翻页处理给表格
        this.renderTable(1)
        // 累加器来计算两个count - 千分号处理
        // format是mixins的method提供
        this.userCount = this.format(totalData.reduce((s, i) => i.users + s, 0))
        this.searchCount = this.format(totalData.reduce((s, i) => i.count + s, 0))
        this.renderLineChart()
      },
      category1 () {
        this.renderPieChart()
      }
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
