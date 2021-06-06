<template>
  <common-card
    title="累计销售额"
    :value="salesToday"
  >
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <!--          引用的是commonCard的样式，没有scoped限制-->
          <span class="emphasis">{{salesGrowthLastDay || '7.33%'}}</span>
          <!--          小三角形可以用CSS实现或者SVG，CSS实现比较快-->
          <div class="increase"/>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">{{salesGrowthLastMonth || '7.33%'}}</span>
          <div class="decrease"/>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">{{salesLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
  import commonCardMixin from '../../mixins/commonCardMixin'
  import commonDataMixin from '../../mixins/commonDataMixin'

  export default {
    // components: {
    //   CommonCard
    // }
    // 基于mixin机制重构下
    mixins: [commonCardMixin, commonDataMixin]
  }
</script>

<style lang="scss" scoped>

  .compare-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .compare {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-top: 3px;
      color: #666;
    }
  }
</style>
