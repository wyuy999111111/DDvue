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
  background: white;
  border: 2px solid #F7F5F5;
  display: flex;
  align-items: center;
  width: 206px;
  height: 38px;
  font-size: 20px;
  padding-left: 15px;

}
.orangeBorder{
  // height: 22px;
  height: 70%;
  margin: 5px;
  width: 5px;
  background: #FD720E;
  margin-right: 20px;
}
</style>
