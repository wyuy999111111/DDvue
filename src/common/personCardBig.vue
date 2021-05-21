<template>
  <div id="personCardBig">
    <div class="personCard">
      <div class="personTitle">{{params.titleLeft}}</div>
      <div class="personBody personBodyLeft">
        <div class="personBodyNum"><div v-if="params.numLeft != -1">{{params.numLeft | fixNumber}}</div></div>
        <div class="personBodyFoot flex">
          <div class="foot">
            <div class="footHead">{{params.numLeftTitlea}}</div>
            <div class="footFoot flex">
              <p v-if="params.numLefta != -1">{{ params.numLefta | fixNumber }}<p/>
              <img class="trend" v-if="params.numLeftTypea === 'RISE'" src="../assets/logo/up.png" />
              <img class="trend" v-if="params.numLeftTypea === 'DECLINE'" src="../assets/logo/down.png" />
              <img class="trend" v-if="params.numLeftTypea === 'EQULE'" src="../assets/logo/hx.png" />
              <!-- {{ params.numLeftTypea}} -->
            </div>
          </div>
          <div class="foot">
            <div class="footHead">{{params.numLeftTitleb}}</div>
            <div class="footFoot flex">
              <p v-if="params.numLeftb != -1">{{ params.numLeftb | fixNumber }}</p>
              <img class="trend" v-if="params.numLeftTypeb === 'RISE'" src="../assets/logo/up.png" />
              <img class="trend" v-if="params.numLeftTypeb === 'DECLINE'" src="../assets/logo/down.png" />
              <img class="trend" v-if="params.numLeftTypeb === 'EQULE'" src="../assets/logo/hx.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="personCard">
      <div class="personTitle">{{params.titleRight}}</div>
      <div class="personBody">
        <div class="personBodyNum"><div v-if="params.numRight != -1">{{ params.numRight | fixNumber}}</div></div>
        <div class="personBodyFoot flex">
          <div class="foot">
            <div class="footHead">{{params.numRightTitlea}}</div>
            <div class="footFoot flex">
              <p v-if="params.numRighta != -1">{{ params.numRighta | fixNumber }}</p>
              <img class="trend" v-if="params.numRightTypea === 'RISE'" src="../assets/logo/up.png" />
              <img class="trend" v-if="params.numRightTypea === 'DECLINE'" src="../assets/logo/down.png" />
              <img class="trend" v-if="params.numRightTypea === 'EQULE'" src="../assets/logo/hx.png" />
            </div>
          </div>
          <div class="foot">
            <div class="footHead">{{params.numRightTitleb}}</div>
            <div class="footFoot flex">
              <p v-if="params.numRightb != -1">{{ params.numRightb | fixNumber }}</p>
              <img class="trend" v-if="params.numRightTypeb === 'RISE'" src="../assets/logo/up.png" />
              <img class="trend" v-if="params.numRightTypeb === 'DECLINE'" src="../assets/logo/down.png" />
              <img class="trend" v-if="params.numRightTypeb === 'EQULE'" src="../assets/logo/hx.png" />
            </div>
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
#personCardBig{
  width: 832px;
  height: 304px;
  border-radius: 5px;
  background: #F6F7FC;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding-right: 23px;
}
.personCard{
  text-align: center;
}
.personTitle{
  height: 73px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.personBody{
  width: 374px;
  height: 214px;
  background: white;
  border-radius: 5px;
}
.personBodyNum{
  font-size: 32px;
  font-weight: bold;
  color: #61AFFF;
  padding-top: 38px;
  padding-bottom: 28px;
}
.flex{
  display: flex;
}
.personBodyFoot{
  margin: 0 55px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.footHead{
  margin-bottom: 29px;
}
.footFoot{
  font-size: 24px;
  align-items: center;
  justify-content: center;
}
.personBodyLeft{
  border-left: 4px solid #CEC8FC;
}
.trend{
  margin-left: 7px;
  width: 18px;
  height: 28px;
}
.footHead{
  width: 100px;
}
</style>
