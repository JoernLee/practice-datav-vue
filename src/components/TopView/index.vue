<template>
  <div class="top-view">
    <!-- 基于element的layout和card来完成基本布局 -->
    <!-- 表示列间距 -->
    <el-row :gutter="20">
      <!-- 通过span来等分列 -->
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-order/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-users/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TotalSales from '../TotalSales'
  import TotalOrder from '../TotalOrder'
  import TotalUsers from '../TotalUsers'
  import TodayUsers from '../TodayUsers'

  export default {
    components: {
      TotalSales,
      TotalOrder,
      TodayUsers,
      TotalUsers
    }
    // 非需要数据的子组件不需要写provide
    // provide:{}
  }
</script>

<style scoped>

</style>
