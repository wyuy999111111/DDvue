<template>
  <div id="pointerTitle">
    <img src='../assets/logo/starTitle.png' />{{ params }}
  </div>
</template>
<script>

export default {
  name: 'starTitle',
  props: ['params'],
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
#pointerTitle{
  margin-left: 57px;
  font-size: 20px;
  // font-weight: bold;
  display: flex;
  height: 30px;
  align-items: center;
}
#pointerTitle img {
  margin-right: 20px;
}
</style>
