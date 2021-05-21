<template>
  <div class="beImformation">
    <div class="xwTitle">
      <span>行为信息</span>
    </div>
    <div class="header">
      <div class="loginNum">
        <div class="loginNum_left">
          <div class="loginImg">
            <div class="APPlogo"></div>
            <div class="APPlogo_x"></div>
            <p>大地行APP登录次数</p>
            <div class="degree">
              {{$store.state.salesPortrayDto.dy_applogin_num}}次
            </div>
          </div>
        </div>
        <div class="loginNum_right">
          <div class="top"><p>登录次数趋势</p></div>
          <!-- <div > -->
            <div class="loginNumber" ref="loginNumber"></div>
          <!-- </div> -->
        </div>
      </div>
      <div class="apps">
        <div class="apps_left">
          <div class="apps_top"><p>APP车险出单占比</p></div>
          <div class="apps_body">
            <div class="progress">
              <el-progress
              :stroke-width=12
              :width=prowidth
              color='#917bff'
              type="circle"
              :percentage="$store.state.salesPortrayDto.dy_car_appissue_numGdp">
              </el-progress>
            </div>
            <div class="single">
              <div class="top_p">APP车险出单量</div>
              <div class="but_p">{{$store.state.salesPortrayDto.dy_car_polnum}}单</div>
            </div>
          </div>
        </div>
        <div class="apps_right">
          <div class="apps_top"><p>APP出单单量</p></div>
          <!-- <div > -->
            <div class="appSingle" ref="appSingle"></div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="body">
      <div class="preSales">
        <div class="preSalesTitle">售前关怀成功率</div>
        <div class="preSalesBody">
          <!-- <div class="preSalesL">
            <img src="../../assets/portraitImg/ClientBehavior/careRate.png" alt="">
            <p>70%</p>
          </div> -->
          <!-- <div > -->
            <div class="preSalesR" ref="preLine" ></div>
          <!-- </div> -->
        </div>
      </div>
      <div class="customerCare">
        <div class="preSalesTitle">客户关怀次数</div>
        <div class="careBody">
          <div class="careL">
            <div class="careA">
              <div class="colorA"></div>
              <span>权益到期转发次数</span>
            </div>
            <div class="careB">
              <div class="colorB"></div>
              <span>生日券转发次数</span>
            </div>
            <div class="careB">
              <div class="colorC"></div>
              <span>出险提醒点击关注次数</span>
            </div>
            <div class="careB">
              <div class="colorD"></div>
              <span>查违章次数</span>
            </div>
            <div class="careB">
              <div class="colorE"></div>
              <span>协助报案次数</span>
            </div>
            <div class="careB">
              <div class="colorF"></div>
              <span>理赔查询次数</span>
            </div>
            <div class="careB">
              <div class="colorG"></div>
              <span>邀请注册次数</span>
            </div>
          </div>
          <!-- <div > -->
            <div class="careR" ref="careChart"></div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Vue from 'vue'
// import '../../utils/rem'
Vue.prototype.$echarts = echarts

export default {
  name: 'bahaviors',
  data () {
    return {
      GetWindowInfo: {
        width: ''
      },
      prowidth: 171
    }
  },
  watch: {
    '$store.state.histogram.DY_ERYMON_APPISSUE_NUM' () {
      this.drowNumber()
      this.drowSingle()
      this.drowLine()
      this.drowCare()
    }
  },
  mounted () {
    this.drowNumber()
    this.drowSingle()
    this.drowLine()
    this.drowCare()
    console.log(this.$store.state.salesPortrayDto.dy_car_appissue_num)
    console.log(this.$store.state.salesPortrayDto.dy_car_polnum)
    console.log(this.$store.state.salesPortrayDto.dy_car_appissue_num / this.$store.state.salesPortrayDto.dy_car_polnum)
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.prowidth = 130
      }
      if (this.GetWindowInfo.width === 1600) {
        this.prowidth = 150
      }
      if (this.GetWindowInfo.width === 1920) {
        this.prowidth = 172
      }
    },
    drowNumber () {
      var num = this.$refs.loginNumber
      const myChart = this.$echarts.init(num)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}次'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.$store.state.histogram.DY_ERYMON_APPLOGIN_NUM.mapDY_ERYMON_APPLOGIN_NUM_month,
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
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
            data: this.$store.state.histogram.DY_ERYMON_APPLOGIN_NUM.mapDY_ERYMON_APPLOGIN_NUM_data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowSingle () {
      var num = this.$refs.appSingle
      const myChart = this.$echarts.init(num)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}单'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.$store.state.histogram.DY_ERYMON_APPISSUE_NUM.mapDY_ERYMON_APPISSUE_NUM_month,
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: 30
            }
          }
        ],
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
            data: this.$store.state.histogram.DY_ERYMON_APPISSUE_NUM.mapDY_ERYMON_APPISSUE_NUM_data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowLine () {
      var num = this.$refs.preLine
      const myChart = this.$echarts.init(num)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}：{c}%'
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          data: this.$store.state.histogram.DY_ERYMON_CUSTCARE_SUC_RATIO.mapDY_ERYMON_CUSTCARE_SUC_RATIO_month
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          color: ['#93c8ff'],
          data: this.$store.state.histogram.DY_ERYMON_CUSTCARE_SUC_RATIO.mapDY_ERYMON_CUSTCARE_SUC_RATIO_data,
          type: 'line',
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          }
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowCare () {
      var num = this.$refs.careChart
      const myChart = this.$echarts.init(num)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: (a) => {
            return a[0].axisValue + '<br />' +
            a[6].seriesName + '：' + a[6].data + '次' + '<br />' +
            a[5].seriesName + '：' + a[5].data + '次' + '<br />' +
            a[4].seriesName + '：' + a[4].data + '次' + '<br />' +
            a[3].seriesName + '：' + a[3].data + '次' + '<br />' +
            a[2].seriesName + '：' + a[2].data + '次' + '<br />' +
            a[1].seriesName + '：' + a[1].data + '次' + '<br />' +
            a[0].seriesName + '：' + a[0].data + '次'
          }
        },
        // legend: {
        //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: this.$store.state.histogram.DY_ERYMON_RIG_REMIND_NUM.mapDY_ERYMON_RIG_REMIND_NUM_month,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        series: [
          {
            color: ['#045c8b'],
            name: '邀请注册次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_INVITE_REG_NUM.mapDY_ERYMON_INVITE_REG_NUM_data
          },
          {
            color: ['#5a82cf'],
            name: '理赔查询次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_CLAIM_QUERY_NUM.mapDY_ERYMON_CLAIM_QUERY_NUM_data
          },
          {
            color: ['#66b1ff'],
            name: '协助报案次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_ASSIST_REPORT_NUM.mapDY_ERYMON_ASSIST_REPORT_NUM_data
          },
          {
            color: ['#9edcf9'],
            name: '查违章次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_VIO_QUERY_NUM.mapDY_ERYMON_VIO_QUERY_NUM_data
          },
          {
            color: ['#4ecb73'],
            name: '出险提醒点击关注次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_ISSUE_WARN_NUM.mapDY_ERYMON_ISSUE_WARN_NUM_data
          },
          {
            color: ['#8cefad'],
            name: '生日券转发次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_BIRTH_WISH_NUM.mapDY_ERYMON_BIRTH_WISH_NUM_data
          },
          {
            color: ['#fecc63'],
            name: '权益到期转发次数',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.$store.state.histogram.DY_ERYMON_RIG_REMIND_NUM.mapDY_ERYMON_RIG_REMIND_NUM_data
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
.beImformation{
  width: 1810px;
  height: 857px;
  background-color: #fff;
  padding-top: 39px;
}
.xwTitle{
  width: 220px;
  height: 41px;
  background: url('../../assets/portraitImg/ClientBehavior/behavior.png') no-repeat;
  background-size: cover;
}
.xwTitle span{
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  margin-left: 70px;
  line-height: 41px;
}
.header{
  width: 1810px;
  height: 370px;
  margin-top: 20px;
  display: flex;
  .loginNum{
    width: 738px;
    height: 370px;
    margin-left: 20px;
    display: flex;
    .loginNum_left{
      width: 210px;
      height: 370px;
      display: flex;
      align-items: center;
      .loginImg{
        width: 210px;
        height: 210px;
        background: url('../../assets/portraitImg/ClientBehavior/APP2.png') no-repeat;
        position: relative;
        background-size: cover;
        p{
          width: 100px;
          height: 44px;
          font-size: 20px;
          // white-space: pre-wrap; // 换行属性
          // word-break: normal;
          margin: 30px auto 0;
          text-align: center;
          margin-bottom: 38px;
        }
        .degree{
          font-size: 24px;
          height: 40px;
          line-height: 40px;
          width: 88%;
          text-align: right;
        }
        .APPlogo{
          width: 42px;
          height: 42px;
          background: url('../../assets/portraitImg/ClientBehavior/APPlogo.png') no-repeat;
          position: absolute;
          top: 111px;
          left: 33px;
          z-index: 1;
          background-size: cover;
        }
        .APPlogo_x{
          width: 42px;
          height: 48px;
          background-color: #f6f7fc;
          position: absolute;
          top: 109px;
          left: 33px;
        }
      }
    }
    .loginNum_right{
      width: 528px;
      height: 370px;
      .top{
        width: 218px;
        height: 39px;
        background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
        font-size: 20px;
        line-height: 39px;
        // padding-left: 45px;
        margin-left: 20px;
        margin-top: 20px;
        background-size: cover;
        p{
          margin-left: 45px;
        }
      }
      .loginNumber{
        width: 528px;
        height: 310px;
      }
    }
  }
  .apps{
    width: 1032px;
    height: 370px;
    // background-color: lime;
    margin-left: 20px;
    display: flex;
    .apps_left{
      width: 378px;
      height: 370px;
      margin-right: 20px;
      .apps_top{
        width: 218px;
        height: 39px;
        background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
        font-size: 20px;
        line-height: 39px;
        // padding-left: 45px;
        background-size: cover;
        margin-left: 20px;
        margin-top: 20px;
        p{
          margin-left: 45px;
        }
      }
      .apps_body{
        width: 378px;
        height: 310px;
        display: flex;
        .progress{
          width: 178px;
          height: 310px;
          display: flex;
          align-items: center;
        }
        .single{
          width: 182px;
          height: 135px;
          background: url('../../assets/portraitImg/ClientBehavior/single.png') no-repeat;
          margin: 20px 0 0 10px;
          text-align: center;
          background-size: cover;
          .top_p{
            font-size: 20px;
            margin-top: 18px;
            margin-left: 12px;
          }
          .but_p{
            font-size: 24px;
            margin-left: 12px;
            margin-top: 10px;
          }
        }
      }
    }
    .apps_right{
      width: 634px;
      height: 370px;
      .apps_top{
        width: 218px;
        height: 39px;
        background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
        font-size: 20px;
        line-height: 39px;
        // padding-left: 45px;
        background-size: cover;
        margin-left: 20px;
        margin-top: 20px;
        p{
          margin-left: 45px;
        }
      }
      .appSingle{
        width: 624px;
        height: 310px;
      }
    }
  }
}
.body{
  width: 1810px;
  height: 370px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
}
.preSales{
  width: 738px;
  height: 370px;
  background-color: #fff;
  margin-left: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
}
.preSalesTitle{
  width: 211px;
  height: 37px;
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  margin-top: 20px;
  padding-left: 45px;
  padding-top: 4px;
  font-size: 20px;
}
.preSalesBody{
  width: 738px;
  height: 370px;
  display: flex;
}
.preSalesL{
  width: 196px;
  height: 300px;
  background-color: #fff;
  text-align: center;
}
.preSalesL img{
  width: 64px;
  height: 64px;
  margin-top: 75px;
}
.preSalesL p{
  font-size: 30px;
  margin-top: 29px;
}
.preSalesR{
  width: 740px;
  height: 300px;
}
.customerCare{
  width: 1012px;
  height: 370px;
  margin-left: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
}
.careBody{
  width: 1012px;
  height: 300px;
  display: flex;
}
.careL{
  width: 236px;
  height: 300px;
}
.careL span{
  font-size: 16px;
  padding-left: 13px;
}
.careA{
  display: flex;
  align-items: center;
  margin-top: 48px;
  margin-left: 27px;
}
.colorA{
  background-color: #fecc63;
  width: 19px;
  height: 7px;
}
.careB{
  display: flex;
  align-items: center;
  margin-top: 9px;
  margin-left: 27px;
}
.colorB{
  background-color: #8cefad;
  width: 19px;
  height: 7px;
}
.colorC{
  background-color: #4ecb73;
  width: 19px;
  height: 7px;
}
.colorD{
  background-color: #9edcf9;
  width: 19px;
  height: 7px;
}
.colorE{
  background-color: #66b1ff;
  width: 19px;
  height: 7px;
}
.colorF{
  background-color: #5a82cf;
  width: 19px;
  height: 7px;
}
.colorG{
  background-color: #045c8b;
  width: 19px;
  height: 7px;
}
.careR{
  width: 770px;
  height: 300px;
}
</style>>
