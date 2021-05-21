<template>
  <div id="personCard">
    <div class="title" v-if="params.num == -1">{{ params.title }}</div>
    <div class="title" v-if="params.num != -1">{{ params.titleTwo }}</div>
    <div class="bodyCard">
      <div class="num">
        <div v-if="params.num != -1">{{ params.num | oldNumber}}</div>
        <div v-if="params.num == -1"><img src="../assets/logo/lhx.png" id='HeadEQULE' /></div>
      </div>
      <div class="bodyRight">
        <div class="child childA">
          <div class="childHead">{{ params.typea }}</div>
          <div class="childFoot">
            <div class="numMini" v-if="params.numa != -1">{{ params.numa | fixNumber }}</div>
            <!-- <div class="numTypeMini">{{  }}</div> -->
            <img class="excImg" v-if="params.numTypea === 'RISE'" src="../assets/logo/up.png" alt="" />
            <img class="excImg" v-if="params.numTypea === 'DECLINE'" src="../assets/logo/down.png" alt="" />
            <img v-if="params.numTypea === 'EQULE'" src="../assets/logo/hx.png" class='EQULE' />
          </div>
        </div>
        <div class="child">
          <div class="childHead">{{ params.typeb }}</div>
          <div class="childFoot">
            <div class="numMini" v-if="params.numb != -1">{{ params.numb | fixNumber }}</div>
            <img class="excImg" v-if="params.numTypeb === 'RISE'" src="../assets/logo/up.png" alt="" />
            <img class="excImg" v-if="params.numTypeb === 'DECLINE'" src="../assets/logo/down.png" alt="" />
            <img v-if="params.numTypeb === 'EQULE'" src="../assets/logo/hx.png" class='EQULE' />
          </div>
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
#personCard{
  width: 394px;
  height: 204px;
  background: #F6F7FC;
  margin-top: 32px;
  border-radius: 5px;
}
.title{
  margin: 26px 38px;
  height: 20px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
}
.bodyCard{
  width: 374px;
  height: 113px;
  background: white;
  border-left: 4px solid #CEC8FC;
  display: flex;
}
.num{
  width: 145px;
  height: 25px;
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #61AFFF;
  line-height: 34px;
  margin: 57px 0 31px 43px;
}
.bodyRight{
  margin-left: 10px;
  display: flex;
}
.child{
  margin-top: 27px;
  width: 100px;
}
.childA{
  margin-right: 33px;
}
.childHead{
  font-size: 16px;
  // width: 45px;
  // height: 15px;
  // font-size: 16px;
  // font-family: Microsoft YaHei;
  // font-weight: 400;
  // color: #000000;
  // line-height: 62px;
}
.childFoot{
  display: flex;
  margin-top: 23px;
  align-items: center;
  height: 29px;
}
.numMini{
  font-size: 22px;
  // margin-right: 7px;
}
.childFoot img {
  margin-left: 7px;

}
#HeadEQULE{
  margin-bottom: 20px;
}
.excImg{
  width: 18px;
  height: 28px;
}
</style>
