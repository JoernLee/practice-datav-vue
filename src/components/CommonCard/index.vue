<template>
  <!--  抽取的公共Card组件-->
  <div class="common-card">
    <div class="title">{{title}}</div>
    <div class="value">{{value}}</div>
    <div class="chart">
      <!--      留下slot插槽让引用方控制-->
      <slot></slot>
    </div>
    <div class="line"/>
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    // 外部传入的参数
    props: {
      title: String,
      value: String
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 12px;
    color: #999;
  }

  .value {
    font-size: 25px;
    color: #000;
    margin-top: 5px;
    letter-spacing: 1px; // 增大间距，因为是数字
  }

  .chart {
    height: 50px;
    background: red;
  }

  .line {
    margin: 10px 0;
    border-top: 1px solid #eee;
  }

  .total {
    font-size: 12px;
    color: #666;
  }

</style>
