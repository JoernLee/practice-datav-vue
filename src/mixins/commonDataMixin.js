// 封装子组件获取父组件Data的属性和方法
export default {
  computed: {
    reportData () {
      return this.getReportData()
    },
    wordCloud () {
      return this.wordCloud()
    },
    mapData () {
      return this.mapData()
    }
  },
  inject: ['getReportData', 'getWordCloud', 'getMapData']
}
