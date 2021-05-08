<template>
  <div class="sales-view">
    <el-card shadow="hover">
      <!--        card-header部分内容,为什么使用header插槽可以直接看el-card源码，很清楚-->
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            class="sales-view-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="onMenuSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"/>
              <el-radio-button label="本周"/>
              <el-radio-button label="本月"/>
              <el-radio-button label="今年"/>
            </el-radio-group>
            <!--unlink-panels消除左右侧时间面板的联动效果，适合选取大范围日期-->
            <el-date-picker
              type="daterange"
              v-model="date"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              unlink-panels
              :picker-options="pickerOptions"
              class="sales-view-date-picker"
            />
          </div>
        </div>
      </template>
      <!--        默认template会放入card主题区域-->
      <template>
        <div>
          222
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        radioSelect: '今日',
        date: null,
        // 点开picker后左侧的选项
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              // 基本控制流程：设置一个start和end时间段，然后调用picker发送一个pick事件即可
              // 最近一周就基于Date的api减去一周毫秒数
              const start = new Date()
              debugger
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
              const end = new Date()
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      onMenuSelect (index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped lang="scss">
  .sales-view {
    margin-top: 20px;

    .menu-wrapper {
      position: relative;
      display: flex;

      .sales-view-menu {
        width: 100%;

        .el-menu-item {
          height: 50px;
          line-height: 58px;
          margin: 0 20px;
        }
      }

      .menu-right {
        position: absolute;
        right: 20px;
        top: 0;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .sales-view-date-picker {
          margin-left: 20px;
        }
      }
    }
  }
</style>
