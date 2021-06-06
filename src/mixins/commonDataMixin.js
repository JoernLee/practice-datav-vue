// 封装一些数据适配方法
function format (v) {
  return v
}

function wrapperMoney (o, k) {
  return o && o[k] ? `￥ ${format(o[k])}` : '￥ 0'
}

function wrapperNumber (o, k) {
  return o && o[k] ? format(o[k]) : 0
}

function wrapperPercentage (o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

// 封装子组件获取父组件Data的属性和方法
export default {
  computed: {
    reportData () {
      return this.getReportData()
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesLastDay () {
      return wrapperNumber(this.reportData, 'salesLastDay')
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
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
