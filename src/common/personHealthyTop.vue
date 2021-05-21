<template>
  <div id="personHeathyTop">
    <div class="healthyChild">
      <img class="headthyImg" :src="params.img" alt="">
      <div class="itemCenter">
        <img src="../assets/logo/triangleBlue.png" />
        <span class="title">{{params.titleA}}</span>
        <div class="num">{{params.numA | fixNumber}}</div>
      </div>
      <div class="itemCenter">
        <img src="../assets/logo/triangleBlue.png" />
        <span class="title">{{params.titleB}}</span>
      </div>
      <div class="newFlex">
        <img src="../assets/logo/newGreen.png" />
        <div class="peopleTitle">{{ params.peopleTitle }}</div>
        <div class="peopleNumaa" v-if="params.peopleNum != -1"><p>{{ params.peopleNum | fixNumber }}</p></div>
      </div>
      <div class="newGray">
        <div class="text">
          <div class="textTitleaa">{{ params.textTitlea }}</div>
          <div class="textValue" v-if="params.textNuma != -1">{{ params.textNuma | fixNumber }}</div>
        </div>
        <div class="text">
          <div class="textTitleaa">{{ params.textTitleb }}</div>
          <div class="textValue" v-if="params.textNumb != -1">{{ params.textNumb | fixNumber }}</div>
        </div>
      </div>

      <!-- <div class="num">{{params.numB}}</div> -->
    </div>
    <div class="healthyRight">
      <el-progress type="circle" :percentage="params.proportion"></el-progress>
      <div class="numRelitive">{{params.proportionText}}</div>
      <div class="trend">
        <div class="trendText">{{params.rightText}}</div>
        <img class="imgS" v-if="params.rightType === 'RISE'" src="../assets/logo/up.png" />
        <img class="imgS" v-if="params.rightType === 'DECLINE'" src="../assets/logo/down.png" />
        <img class="imgB" v-if="params.rightType === 'EQULE'" src="../assets/logo/hx.png" />
        <div class="trentNum" v-if="params.rightNum != -1">{{params.rightNum | fixNumber}}</div>
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
  display: flex;
}
.headthyImg{
  margin-left: 63px;
  padding-bottom: 54px;
  width: 92px;
  height: 92px;
}
.title{
  padding-left: 24px;
  font-size: 20px;
  font-weight: 400;
}
.itemCenter{
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.num{
  margin-left: 36px;
  font-size: 32px;
  height: 25px;
  margin-top: -12px;
}
.healthyRight{
  margin-left: 35px;
  margin-top: 26px;
}
/deep/ .el-progress-circle{
  width: 200px !important;
  height: 200px !important;
}
/deep/ .el-progress--circle .el-progress__text{
  font-size: 32px !important;
  font-weight: bold;
  color: black;
  position: relative;
  top: -79px;
}
.numRelitive{
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  position: relative;
  top: -173px;
}
.trend{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.trend img{
  padding: 0 0 0 25px;
}
.trentNum{
  font-size: 24px;
  padding-left: 25px;
}
.newFlex{
  display: flex;
  margin-top: 29px;
  margin-left: 35px;
  align-items: center;
}
.newGray{
  margin-top: 19px;
  width: 264px;
  height: 115px;
  background: #F6F7FC;
  border-radius: 5px;
  margin-left: 13px;
  padding-top: 19px;
  box-sizing: border-box;
}
.peopleTitle{
  margin-left: 17px;
  font-size: 16px;
  font-weight: 400;
}
.peopleNumaa{
  margin-left: 49px;
  font-weight: 400;
}
.peopleNumaa p{
  font-size: 32px;
}
.newFlex img {
  width: 18px;
  height: 18px;
}
.text{
  display: flex;
  line-height: 31px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 400;
}
.textTitleaa{
  margin-right: 54px;
}
/deep/.el-progress--circle .el-progress__text{
  font-weight: 400;
}
.imgS{
  width: 18px;
  height: 28px;
}
.imgB{
  width: 25px;
  height: 4px;
}
.textValue{
  font-size: 24px;
}
</style>
