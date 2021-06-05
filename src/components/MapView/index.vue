<template>
  <div class="map-view">
    <div class="left">
      <BMapScatter/>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill/>
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">热门搜索</div>
        </template>
        <template>
          <template>
            <div class="chart-wrapper">111</div>
          </template>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
  import BMapScatter from '../BMapScatter'
  import LiquidFill from '../LiquidFill'

  export default {
    components: {
      BMapScatter,
      LiquidFill
    }
  }
</script>

<style scoped lang="scss">
  .map-view {
    display: flex;
    margin-top: 20px;

    .left {
      /*定义BMap地图的大小*/
      /*grow shrink basis*/
      flex: 0 0 80%;
      width: 80%;
      height: 600px;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;

      .title {
        display: flex;
        align-items: center;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: 500;
        padding: 0 0 0 20px;
      }

      .chart-wrapper {
        width: 100%;
        height: 190px;
      }
    }
  }
</style>
