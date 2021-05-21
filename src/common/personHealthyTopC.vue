<template>
  <div id="personHeathyTop">
    <div class="head">
      <img src="../assets/logo/triangleBlue.png" class="triangleBlue" />
      <div class="title">{{params.title}}</div>
    </div>
    <div class="flex">
      <div class="num" v-if="params.rightNumb != -1">{{params.num | fixNumber}}%
        <img src='../assets/logo/barLine.png' class='barLine' />
      </div>
      <div ref='circle' class="circle"></div>
      <div class="trendList">
        <div class="trend">
          {{params.typeTexta}}
          <img class="imgS" src="../assets/logo/up.png" v-if="params.typea === 'RISE'" />
          <img class="imgS" src="../assets/logo/down.png" v-if="params.typea === 'DECLINE'" />
          <img class="imgB" src="../assets/logo/hx.png" v-if="params.typea === 'EQULE'" />
          <div class="trendNum" v-if="params.numa != -1">{{params.numa | fixNumber}}</div>
        </div>
        <div class="trend">
          {{params.typeTextb}}
          <img class="imgS" src="../assets/logo/up.png" v-if="params.typeb === 'RISE'" />
          <img class="imgS" src="../assets/logo/down.png" v-if="params.typeb === 'DECLINE'" />
          <img class="imgB" src="../assets/logo/hx.png" v-if="params.typeb === 'EQULE'" />
          <div class="trendNum" v-if="params.numb != -1">{{params.numb | fixNumber}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['params', 'status'],
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.drow()
  },
  watch: {
    'status' () {
      this.drow()
    }
  },
  methods: {
    drow () {
      const _this = this
      var circle = this.$refs.circle
      const myChart = this.$echarts.init(circle)
      console.log(_this.params.num, '123321')
      const option = {
        series: [
          {
            color: _this.params.color,
            type: 'pie',
            label: {
              normal: {
                position: 'inner',
                show: false
              }
            },
            radius: '100%',
            center: ['50%', '50%'],
            data: [
              { value: _this.params.num, name: '益州' },
              { value: 100 - _this.params.num, name: '西凉' }
            ],
            hoverAnimation: false,
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            },
            silent: 'true'
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
#personHeathyTop{
  width: 538px;
  height: 268px;
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
.flex{
  display: flex;
  margin-top: 52px;
}
.num{
  width: 64px;
  padding-top: 17px;
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-left: 52px;
  margin-right: 66px;
}
.circle{
  width: 108px;
  height: 108px;
  margin-right: 60px;
}
.trendList{
  margin-top: 15px;
  font-size: 16px;
}
.trend{
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}
.trend img {
  padding-left: 15px;
}
.trendNum{
  font-size: 24px;
  padding-left: 26px;
}
.barLine{
  width: 127px;
  height: 23px;
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
