<template>
  <div class="operate">
    <PointerTitle params='客户运营' class="PointerTitle" />
    <div class="customer">
      <div class="customerLeft">
        <!-- <div class="khTitle">
          <span>客户结构</span>
        </div> -->
        <div class="customerNum">
          <div class="totalNum">
            <div class="totalNumTitle">
              <span>当前客户总数(在保)</span>
            </div>
            <div class="totalNumDb">
              <img src="../../assets/portraitImg/ClientBehavior/customerNum.png" alt="">
            </div>
            <div class="totalNumP">
              <p>{{this.list.cust_num | fixNumber}}人</p>
            </div>
          </div>
          <div class="policiesNum">
            <div class="policiesNumTitle">
              <span>客均保单数(在保)</span>
            </div>
            <div class="policiesNumDb">
              <img src="../../assets/portraitImg/ClientBehavior/bdBook.png" alt="">
            </div>
            <div class="policiesNumP">
              <p>{{this.list.avg_cust_pol | fixNumber}}单</p>
            </div>
          </div>
        </div>
        <div class="custType">
          <p>客户意向分(在保)</p>
        </div>
        <div class="intention" ref="intention"></div>
        <div class="intentionData">
          <div class="intentionLeft">
            <div class="intentionColor">
              <div class="inColorA"></div>
              <div class="inColorB"></div>
              <div class="inColorC"></div>
              <div class="inColorD"></div>
              <div class="inColorE"></div>
            </div>
            <div class="intentionNumber">
              <p>0-20</p>
              <p>21-40</p>
              <p>41-60</p>
              <p>61-80</p>
              <p>81-100</p>
            </div>
          </div>
          <div class="intentionRight">
            <div class="inTop">
              <p class="inCust">客户数</p>
              <p class="inMega">百万医疗客户数</p>
            </div>
            <div class="inNav">
              <div class="bigBox"></div>
              <div class="inBody">
                <p>{{ this.list.inten_0to20_custnum | fixNumber }}人</p>
                <p>{{ this.list.inten_21to40_custnum | fixNumber }}人</p>
                <p>{{ this.list.inten_41to60_custnum | fixNumber }}人</p>
                <p>{{ this.list.inten_61to80_custnum | fixNumber }}人</p>
                <p>{{ this.list.inten_81to100_custnum | fixNumber }}人</p>
              </div>
              <div class="inFooter">
                <p>{{ this.list.inten_0to20_bwcustnum | fixNumber }}人</p>
                <p>{{ this.list.inten_21to40_bwcustnum | fixNumber }}人</p>
                <p>{{ this.list.inten_41to60_bwcustnum | fixNumber }}人</p>
                <p>{{ this.list.inten_61to80_bwcustnum | fixNumber }}人</p>
                <p>{{ this.list.inten_81to100_bwcustnum | fixNumber }}人</p>
              </div>
            </div>
          </div>
        </div>
        <div class="custType">
          <p>客户属性(在保)</p>
        </div>
        <div class="typeCharts">
          <div class="typeChartsTop">
            <div class="chartsL">
              <div class="chartTitle">
                <img src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
                <p>按车产价值</p>
              </div>
              <div class="chartsEn">
                <!-- <Doughnut :seriesData='dataTop' :color='colorTop'/> -->
                <div class="productMix" ref='productMix'></div>
              </div>
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
                      <p>{{this.list.low_cust_num | fixNumber}}人</p>
                      <p>{{this.list.comdm_cust_num | fixNumber}}人</p>
                      <p>{{this.list.middle_cust_num | fixNumber}}人</p>
                      <p>{{this.list.high_cust_num | fixNumber}}人</p>
                      <p>{{this.list.gls_cust_num | fixNumber}}人</p>
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
                <p>按家用车保全度 </p>
              </div>
              <div class="chartsEn">
                <!-- <Doughnut :seriesData='dataBut' :color='colorBut' /> -->
                <div class="productMix" ref='productMixR'></div>
              </div>
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
                    <p>{{this.list.high_bq_cust_num | fixNumber}}人</p>
                    <p>{{this.list.middle_bq_cust_num | fixNumber}}人</p>
                    <p>{{this.list.low_bq_cust_num | fixNumber}}人</p>
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
              <p>客户年龄分布情况(在保)</p>
            </div>
            <div class="yearChart">
              <div class="yearChart" ref="yearChart" ></div>
            </div>
          </div>
          <div class="customerRsex">
            <div class="sexTitle">
              <p>客户性别分布情况(在保)</p>
            </div>
            <div class="sexBody">
              <div class="sexLeft">
                <div class="sexLeftCont">
                  <div class="sexPeo">
                    <p>男</p>
                  </div>
                  <div class="sexPeople">
                    <p>{{this.list.male_cust_num | fixNumber}}人</p>
                  </div>
                  <div class="hx"></div>
                  <div class="sexImg">
                    <p>{{this.list.male_cust_numGdp | fixNumber}}%</p>
                  </div>
                </div>
              </div>
              <div class="sexRight">
                <div class="sexLeftCont">
                  <div class="sexPeo">
                    <p>女</p>
                  </div>
                  <div class="sexPeople">
                    <p>{{this.list.famale_cust_num | fixNumber}}人</p>
                  </div>
                  <div class="hx"></div>
                  <div class="sexImgs">
                    <p>{{this.list.famale_cust_numGdp | fixNumber}}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="customerRbody">
          <div class="bodyTitle">
            <p>月客户活跃次数(在保)</p>
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
  </div>
</template>
<script>
import Vue from 'vue'
import echarts from 'echarts'
// import Doughnut from '../charts/doughnut'
import PointerTitle from '../../common/pointerTitle'
import { RoleshowKhyy } from '../../api/getApi'
Vue.prototype.$echarts = echarts

export default {
  name: 'customer',
  components: {
    // Doughnut,
    PointerTitle
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    // this.getRoleshowKhyy()
  },
  mounted () {
    this.drowYear()
    this.drowLine()
    this.drowLineA()
    this.drowLineB()
    this.drow()
    this.drowMix()
    this.drowMixR()
  },
  watch: {
    'list' () {
      this.drowLineA()
      this.drowLineB()
      this.dataTop = [this.list.low_cust_num, this.list.comdm_cust_num, this.list.middle_cust_num, this.list.high_cust_num, this.list.gls_cust_num]
      this.dataBut = [this.list.high_bq_cust_num, this.list.middle_bq_cust_num, this.list.low_bq_cust_num]
      this.colorTop = ['#9adbf9', '#4a98f8', '#6172ff', '#ffc95c', '#8ee498']
      this.colorBut = ['#61afff', '#ffc95c', '#b6eebd']
      console.log(this.dataTop, this.dataBut, this.colorTop, this.colorBut)
      this.drowLine()
      this.drowYear()
      this.drow()
      this.drowMix()
      this.drowMixR()
    },
    '$store.state.role.state' () {
      this.getRoleshowKhyy()
    }
  },
  methods: {
    getRoleshowKhyy () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption
      }
      RoleshowKhyy(params).then((res) => {
        this.list = res.data.data.secondcompanyRoleshowKhyy[0]
      })
    },
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
          formatter: (a) => {
            // return a.data.name + '：' + a.data.value + '人' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g
            if (a.data.value < 10000) {
              let integer = a.data.value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a.data.name + '：' + integer + '人' + '(' + a.percent + '%' + ')'
            } else if (a.data.value < 100000000) {
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + integer + decimals + '人' + '(' + a.percent + '%' + ')'
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + yi + '亿' + integer + decimals + '人' + '(' + a.percent + '%' + ')'
            }
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
              { value: this.list.agelt25_cust_num, name: '25岁以下' },
              { value: this.list.age25to35_cust_num, name: '25（含）-35岁' },
              { value: this.list.age35to45_cust_num, name: '35（含）-45岁' },
              { value: this.list.age45to55_cust_num, name: '45（含）-55岁' },
              { value: this.list.agegt55_cust_num, name: '55（含）岁以上' }
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
            type: 'shadow'
          },
          formatter: (a) => {
            console.log(a)
            var reg = /\d(?=(\d{3})+$)/g
            if (a[0].value < 10000) {
              let integer = a[0].value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a[0].name + '月' + '：' + integer + '次'
            } else if (a[0].value < 100000000) {
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '月' + '：' + integer + decimals + '次'
            } else if (a[0].value > 100000000) {
              let yi = parseInt(a[0].value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '月' + '：' + yi + '亿' + integer + decimals + '次'
            }
          }
        },
        grid: {
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          name: '月份',
          nameTextStyle: {
            fontSize: 16
          },
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisTick: {
            alignWithLabel: false,
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 14
            },
            margin: 14
          }
        }],
        yAxis: [
          {
            name: '次数',
            nameTextStyle: {
              fontSize: 16
            },
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontSize: 14
              },
              formatter: function (value, index) {
                if (value >= 100000000) {
                  return value / 100000000 + '亿'
                } else if (value >= 10000) {
                  return value / 10000 + '万'
                } else {
                  return value
                }
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            data: this.list.dy_erydm_custacti_num_data
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
            type: 'shadow'
          },
          formatter: (a) => {
            var reg = /\d(?=(\d{3})+$)/g
            if (a[0].value < 10000) {
              let integer = a[0].value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a[0].name + '：' + integer + '人'
            } else if (a[0].value < 100000000) {
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '：' + integer + decimals + '人'
            } else if (a[0].value > 100000000) {
              let yi = parseInt(a[0].value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '：' + yi + '亿' + integer + decimals + '人'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['绑定官微客户数(在保)', '注册超A客户数(在保)'],
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
            name: '人数',
            nameTextStyle: {
              fontSize: 14
            },
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
            // data: ['55', '66']
            data: [this.list.bind_wx_cust_num, this.list.reg_ca_cust_num]
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
            type: 'shadow'
          },
          formatter: (a) => {
            var reg = /\d(?=(\d{3})+$)/g
            if (a[0].value < 10000) {
              let integer = a[0].value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a[0].name + '：' + integer + '人'
            } else if (a[0].value < 100000000) {
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '：' + integer + decimals + '人'
            } else if (a[0].value > 100000000) {
              let yi = parseInt(a[0].value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a[0].value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a[0].value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a[0].name + '：' + yi + '亿' + integer + decimals + '人'
            }
          }
        },
        grid: {
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
          },
          // axisLabel: {
          //   interval: 0,
          //   formatter: (value) => {
          //     return '当年' + '\n' + value
          //   }
          // }
        }],
        yAxis: [
          {
            name: '人数',
            nameTextStyle: {
              fontSize: 14
            },
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
            barWidth: '40%',
            // data: ['55', '66', '77']
            data: [this.list.dy_newcust_num, this.list.undinsur_cust_num, this.list.offinsur_cust_num]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drow () {
      var abc = this.$refs.intention // 客户意向分
      const myChart = this.$echarts.init(abc)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (a) => {
            // return a.data.name + '：' + a.data.value + '人' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g
            if (a.data.value < 10000) {
              let integer = a.data.value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a.data.name + '：' + integer + '人' + '(' + a.percent + '%' + ')'
            } else if (a.data.value < 100000000) {
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + integer + decimals + '人' + '(' + a.percent + '%' + ')'
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + yi + '亿' + integer + decimals + '人' + '(' + a.percent + '%' + ')'
            }
          }
        },
        series: [
          {
            color: ['#9adbf9', '#4a98f8', '#6172ff', '#ffc95c', '#8ee498'],
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
              { value: this.list.inten_0to20_custnum, name: '0-20岁' },
              { value: this.list.inten_21to40_custnum, name: '21-40岁' },
              { value: this.list.inten_41to60_custnum, name: '41-60岁' },
              { value: this.list.inten_61to80_custnum, name: '61-80岁' },
              { value: this.list.inten_81to100_custnum, name: '81-100岁' }
            ]
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
            // return a.data.name + '：' + a.data.value + '人' + ' ' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g
            if (a.data.value < 10000) {
              let integer = a.data.value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a.data.name + '：' + integer + '人' + ' ' + '(' + a.percent + '%' + ')'
            } else if (a.data.value < 100000000) {
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + integer + decimals + '人' + ' ' + '(' + a.percent + '%' + ')'
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + yi + '亿' + integer + decimals + '人' + ' ' + '(' + a.percent + '%' + ')'
            }
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
              { value: this.list.low_cust_num, name: '低端车' },
              { value: this.list.comdm_cust_num, name: '普通车' },
              { value: this.list.middle_cust_num, name: '中端车' },
              { value: this.list.high_cust_num, name: '高端车' },
              { value: this.list.gls_cust_num, name: '豪华车' }
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
            // return a.data.name + '：' + a.data.value + '人' + ' ' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g
            if (a.data.value < 10000) {
              let integer = a.data.value + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              return a.data.name + '：' + integer + '人' + ' ' + '(' + a.percent + '%' + ')'
            } else if (a.data.value < 100000000) {
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = '' + '万'
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + integer + decimals + '人' + ' ' + '(' + a.percent + '%' + ')'
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + ''
              yi = yi.replace(reg, (content) => {
                return content + ','
              })
              let integer = parseInt(a.data.value % 100000000 / 10000) + ''
              integer = integer.replace(reg, (content) => {
                return content + ','
              })
              let decimals = (a.data.value % 10000 / 10000)
              if (decimals === 0) {
                decimals = ''
              } else {
                decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
              }
              if (integer === 0) {
                integer = ''
              }
              return a.data.name + '：' + yi + '亿' + integer + decimals + '人' + ' ' + '(' + a.percent + '%' + ')'
            }
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
              { value: this.list.high_bq_cust_num, name: '高保全度' },
              { value: this.list.middle_bq_cust_num, name: '中保全度' },
              { value: this.list.low_bq_cust_num, name: '低保全度' }
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
<style lang="less" scoped>
.operate{
  padding-top: 30px;
  // padding-left: 30px;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.PointerTitle{
  margin-left: 30px;
}
.customer{
  width: 1792px;
  height: 1005px;
  background-color: #fff;
  display: flex;
  // margin-top: 0px;
}
.customerLeft{
  width: 624px;
  height: 1444px;
  padding-top: 0px;
}
.customerRight{
  width: 100%;
  height: 1428px;
  background-color: #fff;
}
.khTitle{
  width: 220px;
  height: 41px;
  background: url('../../assets/portraitImg/ClientBehavior/customer.png') no-repeat;
}
.khTitle span{
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  margin-left: 70px;
  line-height: 41px;
}
.customerNum{
  width: 624px;
  height: 213px;
  margin-top: 40px;
  display: flex;
}
.totalNum{
  width: 324px;
  height: 213px;
}
.totalNumTitle{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 190px;
  height: 42px;
  line-height: 39px;
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
  width: 150px;
  height: 52px;
  margin: 30px auto 0;
  justify-content: center;
}
.totalNumDb img{
  width: 52px;
  height: 52px;
}
.totalNumP{
  text-align: center;
  margin-top: 20px;
}
.totalNumP p{
  font-size: 28px;
}
.policiesNum{
  width: 324px;
  height: 213px;
}
.policiesNumTitle{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 172px;
  height: 39px;
  line-height: 39px;
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
  width: 140px;
  height: 52px;
  margin: 30px auto 0;
  justify-content: center;
}
.policiesNumP{
  text-align: center;
  margin-top: 20px;
}
.policiesNumP p{
  font-size: 28px;
}
.policiesNumDb img{
  width: 36px;
  height: 47px;
}
.custType{
  background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
  width: 213px;
  height: 39px;
  line-height: 39px;
  margin-left: 60px;
  // padding-left: 45px;
  background-size: cover;
}
.custType p{
  font-size: 20px;
}
.intention{
  width: 624px;
  height: 300px;
}
.intentionData{
  width: 624px;
  height: 240px;
  display: flex;
}
.intentionLeft{
  width: 110px;
  height: 140px;
  margin-left: 73px;
  display: flex;
  margin-right: 65px;
  margin-top: 55px;
}
.intentionColor{
  width: 31px;
  height: 124px;
  margin-right: 13px;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.inColorA{
  width: 31px;
  height: 16px;
  background-color: #9adbf9;
  border-radius: 8px;
}
.inColorB{
  width: 31px;
  height: 16px;
  background-color: #4a98f8;
  border-radius: 8px;
}
.inColorC{
  width: 31px;
  height: 16px;
  background-color: #6172ff;
  border-radius: 8px;
}
.inColorD{
  width: 31px;
  height: 16px;
  background-color: #ffc95c;
  border-radius: 8px;
}
.inColorE{
  width: 31px;
  height: 16px;
  background-color: #8ee498;
  border-radius: 8px;
}
.intentionNumber{
  width: 60px;
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.intentionNumber p{
  font-size: 16px;
  margin-bottom: 6px;
}
.intentionRight{
  width: 315px;
  height: 210px;
}
.inTop{
  width: 300px;
  height: 36px;
  display: flex;
  margin-bottom: 10px;
  margin-left: 20px;
}
.inCust{
  width: 98px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 42px;
}
.inMega{
  width: 137px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
}
.inTop p{
  font-size: 16px;
}
.inNav{
  width: 270px;
  height: 165px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.bigBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 148px;
  background-color: #f6f7fc;
  border-radius: 8px;
}
.inFooter{
  width: 100px;
  height: 135px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 5px;
  background-color: #f6f7fc;
  z-index: 1;
}
.inBody{
  width: 100px;
  height: 135px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 5px;
  z-index: 1;
}
.typeCharts{
  width: 624px;
  height: 537px;
  background-color: #fff;
  margin-top: 0px;
}
.typeChartsTop{
  width: 624px;
  height: 260px;
  display: flex;
  margin-top: 20px;
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
  margin-right: 50px;
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
  width: 150px;
  height: 202px;
}
.peoples{
  width: 97px;
  height: 36px;
  line-height: 36px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
  margin: 10px 0 7px 35px;
}
.peoples p{
  font-size: 16px;
  text-align: center;
}
.peopleNum{
  width: 150px;
  height: 170px;
  background-color:#f6f7fc;
}
.peopleNumber{
  width: 150px;
  height: 170px;
  padding-top: 15px;
}
.peoNumber{
  width: 148px;
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
  width:624px;
  height: 260px;
  display: flex;
  margin-top: 20px;
}
.textTitle_db{
  width: 125px;
  height: 78px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 80px;
  margin-right: 15px;
}
.textTitle_db p{
  font-size: 18px;
}
.textTitleB{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.peopleNum_db{
  width: 170px;
  height: 170px;
  background-color:#f6f7fc;
  border-radius: 10px;
}
.peoNumber_db{
  width: 148px;
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
  height: 384px;
  margin-top: 40px;
  display: flex;
  margin-bottom: 30px;
}
.customerRyear{
  width:634px;
  height: 384px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-right: 30px;
}
.yearTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 14rem;
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
  width: 432px;
  height: 384px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.sexTitle{
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  width: 14rem;
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
  height: 320px;
  display: flex;
  justify-content: center;
}
.sexRight{
  width: 217px;
  height: 320px;
}
.sexPeo{
  width: 124px;
  height: 18px;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 10px;
}
.sexPeo p{
  font-size: 18px;
}
.sexPeople{
  width: 145px;
  height: 18px;
  line-height: 18px;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.sexPeople p{
  font-size: 18px;
}
.hx{
  width: 134px;
  height: 1px;
  background-color: #cdcdcd;
  margin-top: 15px;
}
.sexImg{
  width: 112px;
  height: 111px;
  background: url('../../assets/portraitImg/ClientBehavior/Mr.png') no-repeat;
  margin: 50px auto 0;
  line-height: 121px;
  text-align: center;
  background-size: cover;
}
.sexImg p{
  margin-left: -8px;
  font-size: 22px;
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
  margin: 60px auto 0;
  line-height: 101px;
  text-align: center;
  background-size: cover;
}
.sexImgs p{
  font-size: 22px;
  margin-left: 15px;
}
.customerRbody{
  width: 1102px;
  height: 439px;
  border-radius: 10px;
  padding-top: 20px;
  margin-bottom: 30px;
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
  width: 1080px;
  height: 380px;
  margin: auto;
}
.customerRfooter{
  width: 1102px;
  height: 439px;
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
  width: 460px;
  height: 330px;
  margin: 20px 0 0 80px;
}
.chartB{
  width: 460px;
  height: 330px;
  margin: 20px 0 0 80px;
}
.productMix{
  width: 170px;
   height: 170px;
    margin: 40px 0 0 0px;
}
.intention{
  width: 624px;
  height: 300px;
  margin: auto;
}
.yearChart{
  width: 640px;
  height: 320px;
}
</style>
