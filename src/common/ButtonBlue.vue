<template>
  <div class="button">
    <div class="orangeBorder"></div>
    {{ params }}
  </div>
</template>

<script>
export default {
  name: 'button',
  props: ['params'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.button{
  background: #D3EBFD;
  display: flex;
  align-items: center;
  width: 204px;
  height: 37px;
  font-size: 20px;
}
.orangeBorder{
  height: 24px;
  margin: 19px;
  width: 5px;
  background: #FD720E;
}
</style>
