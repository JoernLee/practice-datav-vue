// 封装一些数据适配方法
function format (w) {
  /* // 确保v转化为number类型，调用toLocaleString转化为千分位
  return (+v).toLocaleString() */
  // 尝试使用正则表达时来实现
  // const w = 1234567890
  // 通过正则表达时匹配特定字符串
  // \d 代表匹配0-9
  // g全局匹配，会匹配多个
  // {1,3}找1-3个数字，从左往右优先找3个一组的数字，没有找2个一组
  // 这里我们还需要使用(?=pattern)的正向预先查询模式，后面的字符需要又满足pattern的存在
  // +表示至少存在1个，$表示到末尾
  // 最终搜索的字符串必须满足后续至少有3个数字成一组的存在
  // 搜索到1，发现后续的234 567 890 可以凑成3个一组，可以匹配
  // 搜索到2，发现后续的345 678 90 不可以凑成3个一组，不能匹配
  // 搜索到234， 发现后续的567 890 可以凑凑3个一组，可以匹配
  // 最终结果是[1,234,567] - 接着把拿到的结果数组拼接一个逗号就可以了
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  // console.log(String(w).match(reg))
  // 这里replace第二个参数$&是用于定位匹配的字符位置，可以加一个，自动拼接逗号
  return `${w}`.replace(reg, '$&,')
}

function wrapperMoney (o, k) {
  return o && o[k] ? `￥ ${format(o[k])}` : `￥ ${format(123456789)}`
}

function wrapperNumber (o, k) {
  return o && o[k] ? format(o[k]) : format(2545510)
}

function wrapperOriginalNumber (o, k) {
  return o && o[k] ? o[k] : 0
}

function wrapperPercentage (o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

function wrapperArray (o, k) {
  return o && o[k] ? o[k] : [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220]
}

function wrapperObject (o, k) {
  // 支持连接的k
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.')
    // 循环拿到o[key][key]...
    keys.forEach(key => {
      o = o[key]
    })
    return o
  } else {
    return o && o[k] ? o[k] : {}
  }
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
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend () {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser () {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate () {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend () {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis () {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    userToday () {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay () {
      return wrapperNumber(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperNumber(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth () {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    orderFullYear () {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis () {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank () {
      return wrapperArray(this.reportData, 'orderRank')
    },
    userFullYear () {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis () {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank () {
      return wrapperArray(this.reportData, 'userRank')
    },
    wordCloud () {
      return this.getWordCloud()
    },
    // 分类数据
    category1 () {
      return wrapperObject(this.reportData, 'category.data1')
    },
    // 商品数据
    category2 () {
      return wrapperObject(this.reportData, 'category.data2')
    },
    mapData () {
      return this.mapData()
    }

  },
  inject: ['getReportData', 'getWordCloud', 'getMapData'],
  methods: {
    // 向外输出可用方法
    format (v) {
      return format(v)
    }
  }
}
