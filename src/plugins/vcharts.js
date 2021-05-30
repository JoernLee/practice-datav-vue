import Vue from 'vue'
import VELine from 'v-charts/lib/line.common'
import VCharts from 'v-charts'
import 'v-charts/lib/style.css'

// 这样我们就可以正常使用v-charts了
Vue.use(VCharts)
Vue.component('ve-line', VELine)
