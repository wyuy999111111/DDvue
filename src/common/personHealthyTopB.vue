<template>
  <div id="personHeathyTop">
    <div class="healthyChild">
      <img class="headthyImg" :src="params.img" alt="" />
      <div class="itemCenter">
        <img src="../assets/logo/triangleBlue.png" />
        <span class="title">{{ params.titleA }}</span>
      </div>
      <div class="num" v-if="params.numA != -1">
        {{ params.numA | fixNumber }}
      </div>
      <div class="flexL">
        <span class="leftText">{{ params.leftTextA }}</span>
        <img
          class="leftImg imgS"
          v-if="params.leftTypeA === 'RISE'"
          src="../assets/logo/up.png"
        />
        <img
          class="leftImg imgS"
          v-if="params.leftTypeA === 'DECLINE'"
          src="../assets/logo/down.png"
        />
        <img
          class="leftImg imgB"
          v-if="params.leftTypeA === 'EQULE'"
          src="../assets/logo/hx.png"
        />
        <span class="leftNum" v-if="params.leftNumA != -1">{{
          params.leftNumA | fixNumber
        }}</span>
      </div>
      <div class="flex">
        <span class="leftText">{{ params.leftTextB }}</span>
        <img
          class="leftImg imgS"
          v-if="params.leftTypeB === 'RISE'"
          src="../assets/logo/up.png"
        />
        <img
          class="leftImg imgS"
          v-if="params.leftTypeB === 'DECLINE'"
          src="../assets/logo/down.png"
        />
        <img
          class="leftImg imgB"
          v-if="params.leftTypeB === 'EQULE'"
          src="../assets/logo/hx.png"
        />
        <span class="leftNum" v-if="params.leftNumB != -1">{{
          params.leftNumB | fixNumber
        }}</span>
      </div>
    </div>
    <div class="healthyRight">
      <el-progress type="circle" :percentage="params.proportion"></el-progress>
      <div class="numRelitive">{{ params.proportionText }}</div>
      <div class="trend">
        <div class="trendText">{{ params.rightTexta }}</div>
        <img
          class="imgS"
          v-if="params.rightTypea === 'RISE'"
          src="../assets/logo/up.png"
        />
        <img
          class="imgS"
          v-if="params.rightTypea === 'DECLINE'"
          src="../assets/logo/down.png"
        />
        <img
          class="imgB"
          v-if="params.rightTypea === 'EQULE'"
          src="../assets/logo/hx.png"
        />
        <div class="trentNum" v-if="params.rightNuma != -1">
          {{ params.rightNuma | fixNumber }}
        </div>
      </div>
      <div class="trend">
        <div class="trendText">{{ params.rightTextb }}</div>
        <img
          class="imgS"
          v-if="params.rightTypeb === 'RISE'"
          src="../assets/logo/up.png"
        />
        <img
          class="imgS"
          v-if="params.rightTypeb === 'DECLINE'"
          src="../assets/logo/down.png"
        />
        <img
          class="imgB"
          v-if="params.rightTypeb === 'EQULE'"
          src="../assets/logo/hx.png"
        />
        <div class="trentNum" v-if="params.rightNumb != -1">
          {{ params.rightNumb | fixNumber }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["params"],
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
#personHeathyTop {
  width: 538px;
  display: flex;
  margin-left: 77px;
}
.headthyImg {
  margin-left: 36px;
  padding-bottom: 54px;
  width: 92px;
  height: 92px;
}
.title {
  padding-left: 24px;
  font-size: 20px;
  font-weight: 400;
}
.itemCenter {
  display: flex;
  align-items: center;
}
.num {
  margin-left: 36px;
  font-size: 32px;
  margin-top: 39px;
  margin-bottom: 44px;
  height: 25px;
}
.leftText {
  font-size: 16px;
}
.flexL {
  margin-top: 129px;
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
  margin-bottom: 23px;
}
.leftImg {
  margin: 0 0 0 25px;
}
.leftNum {
  padding-left: 25px;
}
.trentNum {
  padding-left: 25px;
}
/deep/ .el-progress-circle {
  width: 200px !important;
  height: 200px !important;
}
/deep/ .el-progress--circle .el-progress__text {
  font-size: 32px !important;
  font-weight: bold;
  color: black;
  position: relative;
  top: -79px;
}
.healthyRight {
  margin-left: 128px;
  margin-top: 26px;
}
.numRelitive {
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  position: relative;
  top: -173px;
}
.trend {
  margin-top: 20px;
  display: flex;
  align-items: center;
  // justify-content: center;
  font-size: 16px;
  margin-bottom: 22px;
}
.trend img {
  padding: 0 0 0 25px;
}
.trentNum {
  font-size: 24px;
}
.leftNum {
  font-size: 24px;
}
/deep/.el-progress--circle .el-progress__text {
  font-weight: 400;
}
.imgS {
  width: 18px;
  height: 28px;
}
.imgB {
  width: 25px;
  height: 4px;
}
</style>
