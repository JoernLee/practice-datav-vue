<template>
  <ve-wordcloud :data="chartData" height="100%" width="100%"/>
</template>

<script>
  import commonDataMixin from '../../mixins/commonDataMixin'

  export default {
    mixins: [commonDataMixin],
    watch: {
      wordCloud () {
        // 更新chartData
        const data = []
        this.wordCloud.forEach(item => {
          data.push({
            name: item.word,
            value: item.count
          })
        })
        this.chartData = {
          columns: ['name', 'value'],
          rows: data
        }
      }
    },
    data () {
      return {
        chartData: {}
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
