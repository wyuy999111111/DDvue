<template>
  <div id="personHeathyTop">
    <div class="head">
      <img src="../assets/logo/triangleBlue.png" class="triangleBlue" />
      <div class="title">{{params.title}}</div>
    </div>
    <div class="body">
      <img class="imgA" src="../assets/logo/oneYear.png" />
      <div class="num" v-if="params.num != -1">{{params.num | fixNumber}}</div>
      <div class="trendList">
        <div class="trend">
          {{params.typeTexta}}
          <img class="imgS" src="../assets/logo/up.png" v-if="params.typea === 'RISE'" />
          <img class="imgS" src="../assets/logo/down.png" v-if="params.typea === 'DECLINE'">
          <img src="../assets/logo/hx.png" v-if="params.typea === 'EQULE'" class='EQULE imgB' />
          <div class="trendNum" v-if="params.numa != -1">{{params.numa | fixNumber}}</div>
        </div>
        <div class="trend trendBottom">
          {{params.typeTextb}}
          <img class="imgS" src="../assets/logo/up.png" v-if="params.typeb === 'RISE'" />
          <img class="imgS" src="../assets/logo/down.png" v-if="params.typeb === 'DECLINE'">
          <img src="../assets/logo/hx.png" v-if="params.typeb === 'EQULE'" class='EQULE imgB' />
          <div class="trendNum" v-if="params.numb != -1">{{params.numb | fixNumber}}</div>
        </div>
      </div>
    </div>
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
#personHeathyTop{
  width: 538px;
  height: 268px;
  margin-left: 77px;
}
.head{
  display: flex;
  height: 20px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  align-items: center;
}
.head img {
  padding-right: 27px;
}
.body{
  display: flex;
  width: 600px;
}
.num{
  font-size: 32px;
  margin-left: 30px;
  margin-top: 100px;
  width: 220px;
  text-align: right;
}
.body img{
  padding-top: 60px;
  padding-left: 36px;
}
.imgA{
  width: 92px;
  height: 92px;
}
.trend{
  display: flex;
  font-size: 16px;
  align-items: center;
}
.trend img{
  width: 17px;
  height: 28px;
  padding: 0;
  padding-left: 22px;
  font-size: 14px;
}
.trendList{
  margin-top: 69px;
  margin-left: 28px;
  font-weight: 400;
  width: 254px;
}
.trendNum{
  font-size: 24px;
  padding-left: 19px;
}
.trendBottom{
  margin-top: 23px;
}
.EQULE{
  width: 20px !important;
  height: 4px !important;
}
.imgS{
  width: 18px;
  height: 28px;
}
.imgB{
  width: 25px;
  height: 4px;
}
</style>
