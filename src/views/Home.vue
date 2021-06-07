<template>
  <div class="home">
    <!--    驼峰变成-连接，这是vue规范，和react不同-->
    <top-view/>
    <sales-view/>
    <bottom-view/>
    <map-view/>
  </div>
</template>

<script>
  import TopView from '../components/TopView'
  import SalesView from '../components/SalesView'
  import BottomView from '../components/BottomView'
  import MapView from '../components/MapView'
  import { mapScatter, screenData, wordcloud } from '../api'

  export default {
    name: 'Home',
    components: {
      TopView,
      SalesView,
      BottomView,
      MapView
    },
    data () {
      return {
        reportData: null,
        wordCloud: null,
        mapData: null
      }
    },
    methods: {
      getReportData () {
        return this.reportData
      },
      getWordCloud () {
        return this.wordCloud
      },
      getMapData () {
        return this.mapData
      }
    },
    // 父组件通过provide来定义传递数据，子组件通过inject来进行接收
    provide () {
      return {
        // 注意不能直接把数据传递传递过去，因为provide调用时机时还没有mounted，所以数据是空
        // 这里可以把get方法传递过子组件以拿到数据
        getReportData: this.getReportData,
        getWordCloud: this.getWordCloud,
        getMapData: this.getMapData
        /* reportData: this.reportData,
         wordCloud: this.wordCloud,
         mapData: this.mapData */
      }
    },
    mounted () {
      screenData().then(data => {
        this.reportData = data
        this.reportData = {
          category: {
            data1: {
              axisX: ['粉面粥店', '简餐便当', '汉堡披萨', '香锅冒菜'],
              data1: [26, 45, 32, 20]
            },
            data2: {
              axisX: ['草莓', '甘蔗', '榴莲', '菠萝'],
              data1: [26, 45, 29, 61]
            }
          },
          userGrowthLastMonth: '27.84',
          userGrowthLastDay: '16.51'
        }
      })
      wordcloud().then(data => {
        this.wordCloud = data
        // 继续mock一些数据
        this.wordCloud = [{
          word: '北京',
          users: 879,
          count: 1002
        }, {
          word: '上海',
          users: 432,
          count: 756
        }, {
          word: '南京',
          users: 999,
          count: 1345
        }, {
          word: '飞天德',
          users: 123,
          count: 400
        }, {
          word: '鸣人',
          users: 453,
          count: 875
        }, {
          word: '上',
          users: 1320,
          count: 1500
        }, {
          word: '搜索',
          users: 888,
          count: 900
        }, {
          word: '测试',
          users: 645,
          count: 854
        }]
      })
      mapScatter().then(data => {
        this.mapData = data
      })
    }

  }
</script>

<style>
  .home {
    width: 100%;
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }
</style>
