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

<!--这里新增一个公共样式组，不要加scoped，就会变成全局样式，方便其他组件使用-->
<style lang="scss">
  .emphasis {
    margin-left: 5px;
    color: #333;
    font-weight: 700;
  }

  .increase {
    width: 0;
    height: 0;
    /*完全基于border实现三角*/
    border-width: 3px;
    /*向下角设置为red，其他都是透明色，下方border占据上方*/
    border-color: transparent transparent red transparent;
    border-style: solid;
    margin: 0 0 3px 5px;
  }

  .decrease {
    width: 0;
    height: 0;
    /*完全基于border实现三角*/
    border-width: 3px;
    /*向下角设置为red，其他都是透明色，下方border占据上方*/
    border-color: green transparent transparent transparent;
    border-style: solid;
    margin: 3px 0 0 5px;
  }
</style>
