<template>
  <div id="pointerTitle">
    <img src='../assets/logo/pointer.png' />{{ params }}
  </div>
</template>
<script>

export default {
  props: ['params'],
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
#pointerTitle{
  font-size: 26px;
  display: flex;
  height: 30px;
  align-items: center;
}
#pointerTitle img {
  margin-right: 20px;
}
</style>
