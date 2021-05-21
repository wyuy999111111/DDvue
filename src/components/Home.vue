<template>
  <div class="home">
    <el-carousel indicator-position="none"
    height="730px"
    interval='5000'
    arrow='never'
    loop
    >
    <el-carousel-item class="pic">
      <img src="../assets/home/back3.png" alt="">
    </el-carousel-item>
    <el-carousel-item class="pic">
      <img src="../assets/home/back2.png" alt="">
    </el-carousel-item>
  </el-carousel>
  <div class="bigP">
    <img src="../assets/home/backBig.png" alt="">
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lag="less" scoped>
.home {
 height: 100%;
 width: 100%;
 position: relative;
 z-index: 1;
}
.pic img{
  width: 100%;
}
.bigP{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.bigP img{
  width: 100%;
}
</style>
