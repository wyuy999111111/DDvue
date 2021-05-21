<template>
  <div class="assessment" id="assessment"><div class="assessment_t"><p>日常考核</p></div>
    <div class="flex">
      <div class="left">
      <div class="left_t">
        <div class="category_one">
          <ButtonWhite params='月考核保费' style='marginLeft: 50px' />
          <Category  :params='paramsTop' :barWidth='barWidthTop' :barColor='barColorTop'   :xData='xDataTop' :desc='descTop' />
        </div>
        <div class="category_two">
          <ButtonWhite params='月考挂0天数' style='marginLeft: 50px; marginTop: 20px' />
          <Category  :params='paramsBut' :barWidth='barWidthTop' :barColor='barColorBut'   :xData='xDataBut' :desc='descBut' />
        </div>
      </div>
    </div>
    <div class="rightOne">
      <div class="secCard_one"><p>本年CPR</p>
        <!-- <ButtonBlue params='本年CPR' style='margin: auto' /> -->
        <div class='son'>{{ $store.state.salesPortrayDto.dy_cpr }}%</div></div>
      <div class="secCard_two"><p>当前赔付率</p>
        <!-- <ButtonBlue params='当前赔付率' style='margin: auto' /> -->
        <div class='son_'>{{ $store.state.salesPortrayDto.dy_paidrate }}%</div></div>
    </div>
    </div>
  </div>
</template>

<script>
import ButtonWhite from '../../common/ButtonWhite'
// import ButtonBlue from '../../common/ButtonBlue'
import Category from '../charts/category'
// import '../../utils/rem'

export default {
  name: 'assessment',
  components: {
    ButtonWhite, Category
  },
  methods: {
  },
  mounted () {
  },
  data () {
    return {
      paramsTop: {
        data: this.$store.state.histogram.LAST12M_ERYMON_JBF_PRM.mapLAST12M_ERYMON_JBF_PRM_data
      },
      paramsBut: {
        data: this.$store.state.histogram.LAST12M_ERYMON_NOBILLS_DAYS.mapLAST12M_ERYMON_NOBILLS_DAYS_data
      },
      barWidthTop: {
        data: 30
      },
      barColorTop: {
        data: ['#4ecb73']
      },
      barColorBut: {
        data: ['#a8a8a8']
      },
      xDataTop: '',
      xDataBut: '',
      descTop: {
        data: '{b}:{c}元'
      },
      descBut: {
        data: '{b}:{c}天'
      }
    }
  },
  watch: {
    '$store.state.histogram.LAST12M_ERYMON_JBF_PRM' () {
      this.paramsTop = this.$store.state.histogram.LAST12M_ERYMON_JBF_PRM.mapLAST12M_ERYMON_JBF_PRM_data
      this.paramsBut = this.$store.state.histogram.LAST12M_ERYMON_NOBILLS_DAYS.mapLAST12M_ERYMON_NOBILLS_DAYS_data
      this.barWidthTop = 30
      this.barColorTop = ['#4ecb73']
      this.barColorBut = ['#a8a8a8']
      this.xDataTop = this.$store.state.histogram.LAST12M_ERYMON_JBF_PRM.mapLAST12M_ERYMON_JBF_PRM_month
      this.xDataBut = this.$store.state.histogram.LAST12M_ERYMON_NOBILLS_DAYS.mapLAST12M_ERYMON_NOBILLS_DAYS_month
      this.descTop = '{b}:{c}元'
      this.descBut = '{b}:{c}天'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.assessment{
  width: 1810px;
  height: 672px;
  justify-content: left;
  margin-top: 20px;
  background:#fff;
  // padding-left: 55px;
  // padding-top:29px;
  // padding-bottom: 30px;
  box-sizing: border-box;
  // padding: 78px 0px;
  position: relative;
  display: table;
}
.assessment_t{
  width: 220px;
  height: 41px;
  line-height: 41px;
  margin: 35px 0 0 0;
  color: #fff;
  font-size: 20px;
  // position: absolute;
  // top: 32px;
  // left: 74px;
  font-weight: bold;
  background:url('../../assets/portraitImg/IMG/日常考核.png') no-repeat;
  background-size: cover;
}
.assessment_t p{
  margin-left: 70px;
}
.flex{
    display: flex;
}
.left{
  width: 1400px;
  height: 592px;
  margin-top: 50px;
  margin-left: 38px;
  // margin-right: 50px;
}
.left_t{
  width: 1443px;
  height: 592px;
}
.category_one{
  margin-top: 20px;
  margin-bottom: 30px;
}
.secCard_one{
  width: 258px;
  height: 286px;
  border-radius: 5px;
  // padding: 23px 0 0 54px;
  background: url('../../assets/portraitImg/IMG/CPR.png') no-repeat;
  font-size: 20px;
  margin-bottom: 14px;
  background-size: cover;
}
.secCard_one p{
  width: 100px;
  height: 50px;
  position: absolute;
  top: 23px;
  left: 54px;
}
.secCard_two p{
  width: 100px;
  height: 50px;
  position: absolute;
  top: 323px;
  left: 54px;
}
.secCard_two{
  width: 258px;
  height: 286px;
  border-radius: 5px;
    // padding: 23px 0 0 54px;
  background: url('../../assets/portraitImg/IMG/赔付率.png') no-repeat;
  font-size: 20px;
  background-size: cover;
}
.rightOne{
  width: 341px;
  height: 628px;
  // padding: 15px 0 0 55px;
  position: relative;
  margin-top: 16px;
}
.son{
  width: 200px;
  height: 50px;
  font-size: 36px;
  position: absolute;
  top: 190px;
  left: 38px;
  text-align: center;
}
.son_{
  width: 200px;
  height: 50px;
  font-size: 36px;
  position: absolute;
  bottom: 90px;
  left: 38px;
  text-align: center;
}
// .secCard{
//   margin: 30px;
// }
</style>
