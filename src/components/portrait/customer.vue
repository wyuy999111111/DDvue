<template>
  <div class="customer">
    <div class="customerLeft">
      <div class="khTitle">
        <span>客户结构</span>
      </div>
      <div class="customerNum">
        <div class="totalNum">
          <div class="totalNumTitle">
            <span>当前客户总数</span>
          </div>
          <div class="totalNumDb">
            <img src="../../assets/portraitImg/ClientBehavior/customerNum.png" alt="">
            <p>{{$store.state.salesPortrayDto.cust_num | fixNumber}}人</p>
          </div>
        </div>
        <div class="policiesNum">
          <div class="policiesNumTitle">
            <span>客均保单数</span>
          </div>
          <div class="policiesNumDb">
            <img src="../../assets/portraitImg/ClientBehavior/bdBook.png" alt="">
            <p>{{$store.state.salesPortrayDto.cust_avg_polinum | fixNumber}}单</p>
          </div>
        </div>
      </div>
      <div class="custType">
        <p>客户属性</p>
      </div>
      <div class="typeCharts">
        <div class="typeChartsTop">
          <div class="chartsL">
            <div class="chartTitle">
              <img src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
              <p>按车产价值</p>
            </div>
              <!-- <Doughnut :seriesData='dataTop' :color='colorTop'/> -->
            <div class="productMix" ref='productMix'></div>
          </div>
          <div class="textR">
            <div class="textTitle">
              <div class="textTitleA">
                <div class="textColorA"></div>
                <p>低端车</p>
              </div>
              <div class="textTitleA">
                <div class="textColorB"></div>
                <p>普通车</p>
              </div>
              <div class="textTitleA">
                <div class="textColorC"></div>
                <p>中端车</p>
              </div>
              <div class="textTitleA">
                <div class="textColorD"></div>
                <p>高端车</p>
              </div>
              <div class="textTitleA">
                <div class="textColorE"></div>
                <p>豪华车</p>
              </div>
            </div>
            <div class="textNum">
              <div class="peoples">
                <p>客户数</p>
              </div>
              <div class="peopleNum">
                <div class="peopleNumber">
                  <div class="peoNumber">
                    <p>{{$store.state.salesPortrayDto.low_cust_num | fixNumber}}人</p>
                    <p>{{$store.state.salesPortrayDto.common_cust_num | fixNumber}}人</p>
                    <p>{{$store.state.salesPortrayDto.middle_cust_num | fixNumber}}人</p>
                    <p>{{$store.state.salesPortrayDto.high_cust_num | fixNumber}}人</p>
                    <p>{{$store.state.salesPortrayDto.gls_cust_num | fixNumber}}人</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="typeChartsBut">
          <div class="chartsL">
            <div class="chartTitle">
              <img src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
              <p>按家用车保全度</p>
            </div>
            <!-- <div class="chartsEn"> -->
              <!-- <Doughnut :seriesData='dataBut' :color='colorBut' /> -->
              <div class="productMixR" ref='productMixR'></div>
            <!-- </div> -->
          </div>
          <div class="textR">
            <div class="textTitle_db">
              <div class="textTitleB">
                <div class="textColorF"></div>
                <p>高保全度</p>
              </div>
              <div class="textTitleA">
                <div class="textColorD"></div>
                <p>中保全度</p>
              </div>
              <div class="textTitleA">
                <div class="textColorG"></div>
                <p>低保全度</p>
              </div>
            </div>
            <div class="textNum">
              <div class="peoples">
                <p>客户数</p>
              </div>
              <div class="peopleNum_db">
                <div class="peoNumber_db">
                  <p>{{$store.state.salesPortrayDto.high_bq_cust_num | fixNumber}}人</p>
                  <p>{{$store.state.salesPortrayDto.middle_bq_cust_num | fixNumber}}人</p>
                  <p>{{$store.state.salesPortrayDto.low_bq_cust_num | fixNumber}}人</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="customerRight">
      <div class="customerRtop">
        <div class="customerRyear">
          <div class="yearTitle">
            <p>客户年龄分布情况</p>
          </div>
          <!-- <div class="yearChart"> -->
            <div class="yearChart" ref="yearChart"></div>
          <!-- </div> -->
        </div>
        <div class="customerRsex">
          <div class="sexTitle">
            <p>客户性别分布情况</p>
          </div>
          <div class="sexBody">
            <div class="sexLeft">
              <div class="sexLeftCont">
                <div class="sexPeo">
                  <p>男</p>
                  <p>{{$store.state.salesPortrayDto.male_cust_num | fixNumber}}人</p>
                </div>
                <div class="hx"></div>
                <div class="sexImg">
                  <p>{{$store.state.salesPortrayDto.male_cust_numGdp | fixNumber}}%</p>
                </div>
              </div>
            </div>
            <div class="sexRight">
              <div class="sexLeftCont">
                <div class="sexPeo">
                  <p>女</p>
                  <p>{{$store.state.salesPortrayDto.famale_cust_num | fixNumber}}人</p>
                </div>
                <div class="hx"></div>
                <div class="sexImgs">
                  <p>{{$store.state.salesPortrayDto.famale_cust_numGdp | fixNumber}}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="customerRbody">
        <div class="bodyTitle">
          <p>月客户活跃次数</p>
        </div>
        <div class="lineChart" ref="lineChart"></div>
      </div>
      <div class="customerRfooter">
        <div class="footerTitle">
          <p>客户分布</p>
        </div>
        <div class="footerChart">
          <div class="chartA" ref="chartA" ></div>
          <div class="chartB" ref="chartB" ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
// import '../../utils/rem'
// import Doughnut from '../charts/doughnut'
Vue.prototype.$echarts = echarts

export default {
  name: 'customer',
  // components: {
  //   Doughnut
  // },
  data () {
    return {
    }
  },
  mounted () {
    this.drowYear()
    this.drowLine()
    this.drowLineA()
    this.drowLineB()
    this.drowMix()
    this.drowMixR()
  },
  watch: {
    '$store.state.salesPortrayDto' () {
      this.drowLineA()
      this.drowLineB()
      this.drowMix()
      this.drowMixR()
    },
    '$store.state.histogram.DY_ERYMON_CUSTACTI_NUM' () {
      this.drowLine()
      this.drowYear()
    }
  },
  methods: {
    drowYear () {
      var yearChart = this.$refs.yearChart
      const myChart = this.$echarts.init(yearChart)
      const option = {
        legend: {
          orient: 'vertical',
          left: '70%',
          bottom: '5%',
          data: ['25岁以下', '25（含）-35岁', '35（含）-45岁', '45（含）-55岁', '55（含）岁以上']
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          formatter: (a) => {
            return a.data.name + '：' + a.data.value + '人' + '(' + a.percent + '%' + ')'
          }
        },
        series: [
          {
            color: ['#76cbff', '#4ecb73', '#abdf99', '#fecb5f', '#f06b58'],
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              formatter: (a) => {
                return a.percent + '%'
              }
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.$store.state.salesPortrayDto.agelt25_cust_num, name: '25岁以下' },
              { value: this.$store.state.salesPortrayDto.age25to35_cust_num, name: '25（含）-35岁' },
              { value: this.$store.state.salesPortrayDto.age35to45_cust_num, name: '35（含）-45岁' },
              { value: this.$store.state.salesPortrayDto.age45to55_cust_num, name: '45（含）-55岁' },
              { value: this.$store.state.salesPortrayDto.agegt55_cust_num, name: '55（含）岁以上' }
            ]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowLine () {
      var lineChart = this.$refs.lineChart
      const myChart = this.$echarts.init(lineChart)
      const option = {
        color: ['#4ecb73'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}次'
          // formatter: (a) => {
          //   console.log(a)
          // }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.$store.state.histogram.DY_ERYMON_CUSTACTI_NUM.mapDY_ERYMON_CUSTACTI_NUM_month,
          axisTick: {
            alignWithLabel: false,
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0
            // rotate: 40
          }
        }],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            data: this.$store.state.histogram.DY_ERYMON_CUSTACTI_NUM.mapDY_ERYMON_CUSTACTI_NUM_data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowLineA () {
      var chartA = this.$refs.chartA
      const myChart = this.$echarts.init(chartA)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}人'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['绑定官微客户数', '注册超A客户数'],
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            show: false
          }
        }],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            color: ['#61afff'],
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            data: [this.$store.state.salesPortrayDto.bind_wx_cust_num, this.$store.state.salesPortrayDto.reg_ca_cust_num]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowLineB () {
      var chartB = this.$refs.chartB
      const myChart = this.$echarts.init(chartB)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}人'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['当年新增客户数', '当年在保客户数', '当年脱保客户数'],
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            show: false
          }
        }],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            color: ['#61afff'],
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            data: [this.$store.state.salesPortrayDto.dy_newcust_num, this.$store.state.salesPortrayDto.undinsur_cust_num, this.$store.state.salesPortrayDto.offinsur_cust_num]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowMix () {
      var productMix = this.$refs.productMix
      const myChart = this.$echarts.init(productMix)
      const option = {
        tooltip: {
          trigger: 'item',
          position: function (p) { // 其中p为当前鼠标的位置
            return [p[0] + 10, p[1]]
          },
          formatter: (a) => {
            return a.data.name + '： ' + a.data.value + '人' + ' ' + '(' + a.percent + '%' + ')'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.$store.state.salesPortrayDto.low_cust_num, name: '低端车' },
              { value: this.$store.state.salesPortrayDto.common_cust_num, name: '普通车' },
              { value: this.$store.state.salesPortrayDto.middle_cust_num, name: '中端车' },
              { value: this.$store.state.salesPortrayDto.high_cust_num, name: '高端车' },
              { value: this.$store.state.salesPortrayDto.gls_cust_num, name: '豪华车' }
            ],
            color: ['#9adbf9', '#4a98f8', '#6172ff', '#ffc95c', '#8ee498']
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowMixR () {
      var productMix = this.$refs.productMixR
      const myChart = this.$echarts.init(productMix)
      const option = {
        tooltip: {
          trigger: 'item',
          position: function (p) { // 其中p为当前鼠标的位置
            return [p[0] + 10, p[1]]
          },
          formatter: (a) => {
            return a.data.name + '： ' + a.data.value + '人' + ' ' + '(' + a.percent + '%' + ')'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.$store.state.salesPortrayDto.high_bq_cust_num, name: '高保全度' },
              { value: this.$store.state.salesPortrayDto.middle_bq_cust_num, name: '中保全度' },
              { value: this.$store.state.salesPortrayDto.low_bq_cust_num, name: '低保全度' }
            ],
            color: ['#61afff', '#ffc95c', '#b6eebd']
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<style>
.customer{
  width: 1810px;
  height: 1005px;
  background-color: #fff;
  /* padding-top: 39px; */
  margin-top: 20px;
  display: flex;
}
.customerLeft{
  width: 648px;
  height: 945px;
  padding-top: 39px;
}
.khTitle{
  width: 220px;
  height: 41px;
  background: url('../../assets/portraitImg/ClientBehavior/customer.png') no-repeat;
  background-size: cover;
}
.khTitle span{
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  margin-left: 70px;
  line-height: 41px;
}
.customerNum{
  width: 648px;
  height: 213px;
  margin-top: 47px;
  display: flex;
}
.totalNum{
  width: 324px;
  height: 213px;
}
.totalNumTitle{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 172px;
  height: 39px;
  line-height: 35px;
  padding-left: 45px;
  margin: 0 auto;
  background-size: cover;
}
.totalNumTitle span{
  font-size: 20px;
}
.totalNumDb{
  display: flex;
  align-items: center;
  width: 215px;
  height: 52px;
  margin: 47px auto 0;
  justify-content: space-between;
}
.totalNumDb img{
  width: 52px;
  height: 52px;
}
.totalNumDb p{
  font-size: 30px;
}
.policiesNum{
  width: 324px;
  height: 213px;
}
.policiesNumTitle{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 172px;
  height: 39px;
  line-height: 35px;
  padding-left: 45px;
  margin: 0 auto;
  background-size: cover;
}
.policiesNumTitle span{
  font-size: 20px;
}
.policiesNumDb{
  display: flex;
  align-items: center;
  width: 170px;
  height: 52px;
  margin: 47px auto 0;
  justify-content: space-between;
}
.policiesNumDb p{
  font-size: 30px;
}
.policiesNumDb img{
  width: 36px;
  height: 47px;
}
.custType{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 213px;
  height: 39px;
  line-height: 35px;
  margin-left: 60px;
  background-size: cover;
  display: table;
}
.custType p{
  font-size: 20px;
  margin-left: 45px;
}
.typeCharts{
  width: 648px;
  height: 550px;
  background-color: #fff;
  margin-top: 55px;
}
.typeChartsTop{
  width: 648px;
  height: 260px;
  display: flex;
}
.chartsL{
  width: 200px;
  height: 260px;
  margin-left: 60px;
}
.chartTitle{
  width: 160px;
  height: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.chartTitle p{
  font-size: 16px;
  width: 160px;
}
.chartTitle img{
  margin-right: 10px;
}
.chartsEn{
  width: 200px;
  height: 200px;
  /* display: flex;
  align-items: center; */
  margin-top: 20px;
}
.textR{
  width: 448px;
  height: 260px;
  display: flex;
}
.textTitle{
  width: 110px;
  height: 136px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 75px;
  margin-right: 60px;
}
.textTitleA{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.textColorA{
  width: 31px;
  height: 15px;
  background-color: #9adbf9;
  border-radius: 5px;
}
.textColorB{
  width: 31px;
  height: 15px;
  background-color: #4a98f8;
  border-radius: 5px;
}
.textColorC{
  width: 31px;
  height: 15px;
  background-color: #6172ff;
  border-radius: 5px;
}
.textColorD{
  width: 31px;
  height: 15px;
  background-color: #ffc95c;
  border-radius: 5px;
}
.textColorE{
  width: 31px;
  height: 15px;
  background-color: #8ee498;
  border-radius: 5px;
}
.textColorF{
  width: 31px;
  height: 15px;
  background-color: #61afff;
  border-radius: 5px;
}
.textColorG{
  width: 31px;
  height: 15px;
  background-color: #b6eebd;
  border-radius: 5px;
}
.textTitle p{
  font-size: 18px;
}
.textNum{
  width: 137px;
  height: 202px;
}
.peoples{
  width: 97px;
  height: 36px;
  line-height: 36px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
  margin: 10px 0 7px 20px;
}
.peoples p{
  font-size: 16px;
  text-align: center;
}
.peopleNum{
  width: 137px;
  height: 170px;
  background-color:#f6f7fc;
}
.peopleNumber{
  width: 137px;
  height: 170px;
  padding-top: 15px;
}
.peoNumber{
  width: 100px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.peoNumber p{
  font-size: 18px;
}
.typeChartsBut{
  width: 648px;
  height: 260px;
  display: flex;
  margin-top: 20px;
}
.textTitle_db{
  width: 110px;
  height: 78px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 80px;
  margin-right: 60px;
}
.textTitleB{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.peopleNum_db{
  width: 137px;
  height: 170px;
  background-color:#f6f7fc;
}
.peoNumber_db{
  width: 100px;
  height: 80px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 18px;
}
.peoNumber_db p{
  font-size: 18px;
}
.customerRtop{
  width: 1132px;
  height: 296px;
  margin-top: 40px;
  display: flex;
  margin-bottom: 20px;
}
.customerRyear{
  width: 671px;
  height: 296px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-right: 20px;
}
.yearTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 211px;
  height: 37px;
  margin-top: 20px;
  padding-left: 35px;
  line-height: 37px;
  background-size: cover;
}
.yearTitle p{
  font-size: 20px;
}
.customerRsex{
  width: 437px;
  height: 296px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.sexTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 211px;
  height: 37px;
  margin-top: 20px;
  padding-left: 35px;
  line-height: 37px;
  background-size: cover;
}
.sexTitle p{
  font-size: 20px;
}
.sexBody{
  display: flex;
}
.sexLeft{
  width: 217px;
  height: 240px;
  display: flex;
  justify-content: center;
}
.sexRight{
  width: 217px;
  height: 240px;
}
.sexPeo{
  width: 124px;
  height: 18px;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  margin-top: 47px;
  margin-left: 10px;
}
.sexPeo p{
  font-size: 18px;
}
.hx{
  width: 134px;
  height: 1px;
  background-color: #cdcdcd;
  margin-top: 10px;
}
.sexImg{
  width: 112px;
  height: 111px;
  background: url('../../assets/portraitImg/ClientBehavior/Mr.png') no-repeat;
  margin: 15px auto 0;
  line-height: 121px;
  text-align: center;
  background-size: cover;
}
.sexImg p{
  font-size: 20px;
  margin-right: 10px;
}
.sexRight{
  width: 217px;
  height: 240px;
  display: flex;
  justify-content: center;
}
.sexImgs{
  width: 112px;
  height: 111px;
  background: url('../../assets/portraitImg/ClientBehavior/Mrs.png') no-repeat;
  margin: 25px auto 0;
  line-height: 101px;
  text-align: center;
  background-size: cover;
}
.sexImgs p{
  font-size: 20px;
  margin-left: 15px;
}
.customerRbody{
  width: 1132px;
  height: 276px;
  border-radius: 10px;
  padding-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.bodyTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 211px;
  height: 37px;
  padding-left: 35px;
  line-height: 37px;
  background-size: cover;
}
.bodyTitle p{
  font-size: 20px;
}
.lineChart{
  width: 1132px;
  height: 240px;
}
.customerRfooter{
  width: 1132px;
  height: 276px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-top: 20px;
}
.footerTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 211px;
  height: 37px;
  padding-left: 35px;
  line-height: 37px;
  background-size: cover;
}
.footerTitle p{
  font-size: 20px;
}
.footerChart{
  display: flex;
}
.chartA{
  width: 500px;
  height: 220px;
  margin-left: 50px;
}
.chartB{
  width: 500px;
  height: 220px;
  margin-left: 30px;
}
.productMix{
  width: 200px;
  height: 200px;
  margin: auto;
}
.productMixR{
  width: 200px;
  height: 200px;
  margin: auto;
}
.yearChart{
  width: 660px;
  height: 230px;
}
.lineChart{
  width: 1080px;
  height: 220px;
  margin: auto;
}
</style>
