<template>
  <common-card
    title="累计销售额"
    value="￥ 32,039,165"
  >
    <template>
      <div class="compare">

      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额</span>
      <span class="money">￥30,000,000</span>
    </template>
  </common-card>
</template>

<script>
  import commonCardMixin from '../../mixins/commonCardMixin'

  export default {
    // components: {
    //   CommonCard
    // }
    // 基于mixin机制重构下
    mixins: [commonCardMixin]
  }
</script>

<style lang="scss" scoped>

  .compare {
    height: 100%;
    background: yellow;
  }

  span {
    font-size: 12px;
  }

  .money {
    margin-left: 5px;
    color: #333;
    font-weight: 700;
  }
</style>
