<template>
  <div class="headTitle">
    <div class="flex">
      <img src="../assets/indexImg/项目符.png" id="headLogo" alt="">
      {{ params }}
    </div>
    <div class="border"></div>
  </div>
</template>
<script>
export default {
  name: 'headTitle',
  props: ['params']
}
</script>
<style lang="less" scoped>
.headTitle{
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0px 22px;
  box-sizing: border-box;
  .flex{
    display: flex;
    height: 48px;
    font-size: 14px;
    color: #33aed3;
    font-weight: bold;
    align-items: center;
    #headLogo{
      width: 14px;
      height: 14px;
      padding: 0px 12px 0px 5px;
    }
  }
  .border{
    // width: calc(100% - 20px);
    background: #d0d0d0;
    margin-bottom:8px;
    height: 1px;
  }
}
</style>
