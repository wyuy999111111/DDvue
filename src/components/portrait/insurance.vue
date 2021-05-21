  <template>
  <div class="insurance" id="insurance">
    <div class="insurance_t"><p>续保情况</p></div>
    <div class="flex">
      <div class="cards flex">
        <div class="cardOne" style='margin-left:86px'>
          <div class="car"></div>
          <div class="cardTitle">当年提前续保天数</div>
          <p>{{ $store.state.salesPortrayDto.dy_fmcar_ahead_renew_prd }}天</p>
        </div>
        <div class="cardOne">
          <div class="bang"></div>
          <div class="cardTitle">未续保保单平均报价次数</div>
          <p>
            {{ $store.state.salesPortrayDto.dy_fmcar_unrenew_avg_quotn_num }}次
          </p>
        </div>
        <div class="cardOne">
          <div class="tick"></div>
          <div class="cardTitle">已续保保单平均报价次数</div>
          <p>
            {{ $store.state.salesPortrayDto.dy_fmcar_renew_avg_quotn_num }}次
          </p>
        </div>
      </div>
      <div class="progressBars">
        <div class="progressBar flex">
          <span>当月到期保单的首报率</span>
          <div class="progressBarAll">
            <div class="progressOn" :style="{ width: this.$store.state.salesPortrayDto.dm_fmcar_renew_1stquotn_ratio + '%' }"></div>
          </div>
          <!-- <span class="progressBarNum"
            >{{
              $store.state.salesPortrayDto.dm_fmcar_renew_1stquotn_ratio
            }}%</span
          > -->
        </div>
        <div class="progressBar flex">
          <span>当月到期保单的二报率</span>
          <div class="progressBarAll">
            <div class="progressOn" :style="{ width: this.$store.state.salesPortrayDto.dm_fmcar_renew_2ndquotn_ratio + '%' }"></div>
          </div>
          <!-- <span class="progressBarNum"
            >{{
              $store.state.salesPortrayDto.dm_fmcar_renew_2ndquotn_ratio
            }}%</span
          > -->
        </div>
        <div class="progressBar flex">
          <span>当月到期保单的三报率</span>
          <div class="progressBarAll">
            <div class="progressOn" :style="{ width: this.$store.state.salesPortrayDto.dm_fmcar_renew_3rdquotn_ratio + '%' }"></div>
          </div>
          <!-- <span class="progressBarNum"
            >{{
              $store.state.salesPortrayDto.dm_fmcar_renew_3rdquotn_ratio
            }}%</span
          > -->
        </div>
        <div class="peoBarSpan">
          <p align='right' class="peoBarpp">{{ $store.state.salesPortrayDto.dm_fmcar_renew_1stquotn_ratio }}%</p>
          <p align='right' class="peoBarp">{{ $store.state.salesPortrayDto.dm_fmcar_renew_2ndquotn_ratio }}%</p>
          <p align='right' class="peoBarp">{{ $store.state.salesPortrayDto.dm_fmcar_renew_3rdquotn_ratio }}%</p>
        </div>
      </div>
    </div>
    <div class="bigBox flex">
        <div class="BGleft flex">
          <div class="circles right">
        <el-progress
          :stroke-width=12
          :width=prowidth
          color='#917bff'
          type="circle"
          :percentage="$store.state.salesPortrayDto.dy_fmcar_renew_ratio"
        ></el-progress>
        <p>当年累计续保率</p>
        </div>
        <div class="circles">
        <el-progress
          :stroke-width=12
          :width=prowidth
          color='#21a2f4'
          type="circle"
          :percentage="$store.state.salesPortrayDto.dm_fmcar_renew_ratio"
        ></el-progress>
        <p>当月续保率</p>
        </div>
        <div class="circles">
        <el-progress
          :stroke-width=12
          :width=prowidth
          color='#4cb7be'
          type="circle"
          :percentage="$store.state.salesPortrayDto.nm_fmcar_renew_ratio"
        ></el-progress>
        <p>下月续保率</p>
        </div>
        </div>
      <div class="charts">
        <ButtonWhite class="tend" params="报价率趋势" />
        <!-- 报价率趋势柱形图 -->
        <div class="rotation">
          <div class="RT" ref="myChart"></div>
        </div>
      </div>
    </div>
    <div class="quotation">
      <div class="quotation_left">
        <div class="quotation_left_left">
          <div class="img">
          <img src="../../assets/portraitImg/IMG/星.png" alt="" />
          </div>
          <div class="top">报价情况<div class="top_text"></div></div>
          <div class="star">报价成功率</div>
          <div class="offer">
            <el-progress
            :stroke-width=12
            :width=prowidth2
            color='#ffc95c'
            type="circle"
            :percentage="$store.state.salesPortrayDto.dy_fmcar_quotnsuc_ration"
          ></el-progress>
          </div>
          <div class="text">
            <div><span>当年累计首报报价率</span>{{ $store.state.salesPortrayDto.dy_fmcar_1stquotn_ratio }}%</div>
            <div><span>当年累计二报报价率</span>{{ $store.state.salesPortrayDto.dy_fmcar_2ndquotn_ratio }}%</div>
            <div><span>当年累计三报报价率</span>{{ $store.state.salesPortrayDto.dy_fmcar_3rdquotn_ratio }}%</div>
          </div>
          </div>
        </div>
      <!-- <div class="quotation_right">
        <div class="numTime"> -->
          <div class="NT" ref="numTime"></div>
        <!-- </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import ButtonWhite from '../../common/ButtonWhite'
import echarts from 'echarts'
import Vue from 'vue'
// import '../../utils/rem'
Vue.prototype.$echarts = echarts

export default {
  name: 'insurance',
  components: {
    ButtonWhite
  },
  mounted () {
    this.drawRotation()
    this.drawnumTime()
  },
  watch: {
    '$store.state.salesPortrayDto' () {
      this.drawRotation()
      this.drawnumTime()
    }
  },
  methods: {
    drawRotation () {
      var asd = this.$refs.myChart
      const myChart = this.$echarts.init(asd)
      const option = {
        color: ['#619eff', '#70d2db', '#ffc95c'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: (a) => {
            return a[0].axisValue + '<br />' + a[0].seriesName + '：' + a[0].value + '%' + '<br />' + a[1].seriesName + '：' + a[1].value + '%' + '<br />' + a[2].seriesName + '：' + a[2].value + '%'
          }
        },
        legend: {
          data: ['首报率', '二报率', '三报率']
        },
        xAxis: [
          {
            type: 'category',
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_1STQUOTN_RATIO.mapLAST12M_ERYMON_FMCAR_1STQUOTN_RATIO_month,
            axisTick: { // y轴刻度线
              show: false
            },
            axisLine: { // y轴
              show: false
            },
            axisLabel: {
              margin: 20,
              fontSize: 12,
              interval: 0,
              rotate: 30
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick: { // y轴刻度线
              show: false
            },
            axisLine: { // y轴
              show: false
            }
          }
        ],
        series: [
          {
            name: '首报率',
            type: 'bar',
            // barWidth: 12,
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_1STQUOTN_RATIO.mapLAST12M_ERYMON_FMCAR_1STQUOTN_RATIO_data
          },
          {
            name: '二报率',
            type: 'bar',
            // barWidth: 12,
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_2NDQUOTN_RATIO.mapLAST12M_ERYMON_FMCAR_2NDQUOTN_RATIO_data
          },
          {
            name: '三报率',
            type: 'bar',
            // barWidth: 12,
            barGap: '33%',
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_3RDQUOTN_RATIO.mapLAST12M_ERYMON_FMCAR_3RDQUOTN_RATIO_data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawnumTime () {
      var numTime = this.$refs.numTime
      const myChart = this.$echarts.init(numTime)
      const option = {
        color: ['#61afff', '#ffc95c'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
            // crossStyle: {
            //   color: '#999999'
            // }
          },
          formatter: (a) => {
            return a[0].axisValue + '<br />' + a[0].seriesName + '：' + a[0].value + '次' + '<br />' + a[1].seriesName + '：' + a[1].value + '%'
          }
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        legend: {
          data: ['报价次数', '报价成功率']
        },
        xAxis: [
          {
            type: 'category',
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_QUOTN_NUM.mapLAST12M_ERYMON_FMCAR_QUOTN_NUM_month,
            axisPointer: {
              type: 'none'
            },
            axisTick: { // y轴刻度线
              show: false
            },
            axisLine: { // y轴
              show: false
            },
            axisLabel: {
              margin: 20,
              fontSize: 12,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            // max: 100,
            // interval: 20,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: { // y轴刻度线
              show: false
            },
            axisLine: { // y轴
              show: false
            }
          },
          {
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 0,
            axisLabel: {
              formatter: '{value} %'
            },
            axisTick: { // y轴刻度线
              show: false
            },
            axisLine: { // y轴
              show: false
            }
          }
        ],
        series: [
          {
            name: '报价次数',
            type: 'bar',
            barWidth: 20,
            // data: ['2000', '200', '1500', '1677', '1888', '2000', '200', '1500', '1677', '1888', '3000'],
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_QUOTN_NUM.mapLAST12M_ERYMON_FMCAR_QUOTN_NUM_data,
            label: {
              show: false,
              formatter: '{b}月:{c}次'
            }
          },
          {
            name: '报价成功率',
            type: 'line',
            showSymbol: true,
            symbol: 'circle', // 设定为实心点
            symbolSize: 10, // 设定实心点的大小
            yAxisIndex: 1,
            data: this.$store.state.histogram.LAST12M_ERYMON_FMCAR_QUOTNSUC_RATIO.mapLAST12M_ERYMON_FMCAR_QUOTNSUC_RATIO_data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.prowidth = 132
        this.prowidth2 = 132
      }
      if (this.GetWindowInfo.width === 1600) {
        this.prowidth = 152
        this.prowidth2 = 152
      }
      if (this.GetWindowInfo.width === 1920) {
        this.prowidth = 172
        this.prowidth2 = 172
      }
    }
  },
  data () {
    return {
      GetWindowInfo: {
        width: ''
      },
      prowidth: 171,
      prowidth2: 172
      // widthOne: this.$store.state.salesPortrayDto.dm_fmcar_renew_1stquotn_ratio,
      // widthTwo: this.$store.state.salesPortrayDto.dm_fmcar_renew_2ndquotn_ratio,
      // widthThree: this.$store.state.salesPortrayDto.dm_fmcar_renew_3rdquotn_ratio
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    // this.widthOne = this.$store.state.salesPortrayDto.dm_fmcar_renew_1stquotn_ratio
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.insurance {
  width: 1810px;
  height: 1150px;
  background: white;
  margin: 20px 0;
  display: table;
  // padding-bottom: 35px;
}
.insurance_t {
  width: 220px;
  height: 41px;
  line-height: 41px;
  // padding: 35px 0 0 65px;
  background: url('../../assets/portraitImg/IMG/续保情况.png') no-repeat;
  // background-position: 0 28px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  background-size: cover;
  margin-top: 35px;
}
.insurance_t p{
  margin-left: 65px;
}
.flex {
  display: flex;
  position: relative;
}
.peoBarSpan{
  position: absolute;
  top: 44px;
  right: 125px;
  width: 68px;
  height: 150px;
  background-color: #fff;
}
.peoBarSpan p{
  font-size: 22px;
}
.peoBarp{
  margin-top: 30px;
}
.peoBarpp{
  margin-top: 5px;
}
.cards {
  padding: 30px 0 0 21px;
  width: 920px;
  // border: 1px solid red;
  // justify-content: space-around;
}
.cardTitle {
  margin-top: 40px;
  font-size: 20px;
  font-weight: 400;
}

.cardOne {
  width: 265px;
  text-align: center;
  height: 182px;
  background: #f6f7fc;
  border-radius: 12px;
  border: 1px solid #f4f4f4;
  margin-right: 18px;
  position: relative;
}
.cardOne p {
  font-size: 30px;
  margin: 44px 0 0 70px;
}
.car{
  width: 39px;
  height: 32px;
  position: absolute;
  top: 116px;
  left: 50px;
  background: url('../../assets/portraitImg/IMG/当年提前续保.png') no-repeat;
  background-size: cover;
}
.bang{
  width: 29px;
  height: 36px;
  position: absolute;
  top: 110px;
  left: 53px;
  background: url('../../assets/portraitImg/IMG/未续报价次数.png') no-repeat;
  background-size: cover;
}
.tick{
  width: 29px;
  height: 36px;
  position: absolute;
  top: 110px;
  left: 53px;
  background: url('../../assets/portraitImg/IMG/已续报价次数.png') no-repeat;
  background-size: cover;
}
.progressBars {
  display: flex;
  justify-content: space-between; /* 水平均匀分布 */
  flex-direction: column;
  width: 620px;
  height: 142px;
  margin-top: 50px;
  margin-left: 50px;
}
.progressBar {
  justify-content: space-around;
}
.progressBar span{
  font-size: 20px;
}
.progressBarAll {
  border: 1px solid #62afff;
  background: white;
  border-radius: 6px;
  height: 16px;
  width: 300px;
  margin-top: 4px;
}
.progressOn {
  height: 16px;
  background: #62afff;
}
.progressBarNum {
  margin-right: 80px;
  font-size: 18px;
}
.bigBox {
  width: 1810px;
  margin-bottom: 75px;
  margin-top: 40px;
}
.BGleft{
  width: 842px;
  height: 260px;
  margin-left: 163px;
  margin-top: 40px;
}
.circles {
  width: 172px;
  height: 100%;
  margin: 0px 83px 0 0;
}
.circles p{
  // margin: 36px 0 0 33px;
  margin: 36px auto 0;
  font-size: 20px;
  width: 100px;
  height: 20px;
}
.right p{
  // margin-left: 12px;
  width: 145px;
}
.charts {
  width: 852px;
  // height: 240px;
  position: relative;
}
.tend{
  padding-left: 20px;
  position: absolute;
  top: 0;
  left: -15px;
}
.rotation{
  width: 100%;
  position: absolute;
  top: 60px;
  left: 0;
}
.RT{
  width: 820px;
  height: 280px;
}
.NT{
  width: 1100px;
  height: 320px;
  margin-top: 50px;
}
.quotation {
  display: flex;
  width: 95%;
  height: 400px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.quotation_left {
  width: 36%;
  height: 100%;
  position: relative;
  padding: 10px 0 0 0;
}
.quotation_left_left{
  width: 100%;
}
.img {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 104px;
  left: 40px;
}
.top {
  width: 165px;
  height: 32px;
  position: absolute;
  background-color: #d3ebfd;
  padding: 4px 0 0 39px;
  margin: 6px 0 0 0px;
  font-size: 20px;
}
.top_text{
  position: absolute;
  top: 0;
  left: 20px;
  width: 5px;
  height: 21px;
  background-color: #ff6b00;
  margin: 7px 0 7px 0;
}
.star {
  width: 100px;
  height: 20px;
  font-size: 20px;
  padding: 92px 0 0 78px;
}
.offer{
  width: 100%;
  // height: 100%;
  position: absolute;
  top: 178px;
  left: 80px;
}
.text{
  width: 300px;
  height: 145px;
  position: absolute;
  top: 189px;
  left: 318px;
}
.text div{
  font-size: 24px!important;
  width: 300px;
  height: 45px;
  margin-bottom: 10px;
}
.text div span{
  font-size: 20px;
  margin-right: 32px;
}
.quotation_right {
  width: 55%;
  // height: 100%;
  padding-top: 35px;
}
</style>
