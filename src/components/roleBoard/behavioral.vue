<template>
  <div class="beImformation">
    <PointerTitle params='行为信息' class="PointerTitle" />
    <div class="header">
      <div class="loginNum">
        <div class="loginNum_left">
          <div class="loginImg">
            <p>大地行APP登录次数</p>
            <div class="degree">
              {{ this.list.dy_applogin_num | fixNumber }}次
            </div>
          </div>
        </div>
        <div class="loginNum_right">
          <div class="top"><p>登录次数趋势</p></div>
          <div class="loginNumber" ref="loginNumber">
          </div>
        </div>
      </div>
      <div class="apps">
        <div class="apps_left">
          <div class="apps_top"><p>APP车险出单占比</p></div>
          <div class="apps_body">
            <div class="progress">
              <el-progress
              :stroke-width=strWidth
              :width=proWidth
              color='#917bff'
              type="circle"
              :percentage="this.list.dy_car_appissue_numGdp">
              </el-progress>
            </div>
            <div class="single">
              <div class="top_p"><p>APP车险出单量</p></div>
              <div class="but_p">{{ this.list.dm_car_appissue_num | fixNumber }}单</div>
            </div>
          </div>
        </div>
        <div class="apps_right">
          <div class="apps_top"><p>APP出单单量</p></div>
          <div class="appSingle" ref="appSingle">
          </div>
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
          <div class="preSalesR" ref="preLine">
          </div>
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
          <div class="careR" ref="careChart">
          </div>
        </div>
      </div>
    </div>
    <div class="ddxAPP">
      <div class="ddxTitle">
      </div>
      <p>大地行APP功能使用情况</p>
    </div>
    <div class="onePlus">
      <div class="about">
        <img src="../../assets/其他切图1920/about.png" alt="">
        <p class="oneP">关注公众号人数</p>
        <p class="twoP">{{ this.list.foc_ofa_num | fixNumber }}人</p>
      </div>
      <!-- <div > -->
        <BehavioralChart class="ddxAPPChart" :params='paramsA' />
      <!-- </div> -->
    </div>
    <!-- <div > -->
      <BehavioralChartB class="ddxAPPChartA" :params='paramsB' />
    <!-- </div> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import Vue from 'vue'
import PointerTitle from '../../common/pointerTitle'
import BehavioralChart from '../../components/charts/behavioralChart'
import BehavioralChartB from '../../components/charts/behavioralChartB'
import { RoleshowXwxx } from '../../api/getApi'
Vue.prototype.$echarts = echarts

export default {
  data () {
    return {
      list: [],
      paramsA: {
        xData: [],
        legendData: ['保险计划书分享人均使用次数', '分享门店人均使用次数', '营销获客功能人均使用次数'],
        seriesA: [],
        seriesB: [],
        seriesC: [],
        seriesAname: '保险计划书分享人均使用次数',
        seriesBname: '分享门店人均使用次数',
        seriesCname: '营销获客功能人均使用次数',
        seriesColorA: ['#70d2db'],
        seriesColorB: ['#ffc95c'],
        seriesColorC: ['#ff88a1'],
        width: '1472px',
        height: '380px'
      },
      paramsB: {
        xData: [],
        legendData: ['续保跟踪功能人均使用次数', '客户关怀功能人均使用次数', '学习充电功能人均使用次数'],
        seriesA: [],
        seriesB: [],
        seriesC: [],
        seriesAname: '续保跟踪功能人均使用次数',
        seriesBname: '客户关怀功能人均使用次数',
        seriesCname: '学习充电功能人均使用次数',
        seriesColorA: ['#619ffe'],
        seriesColorB: ['#70d2db'],
        seriesColorC: ['#ffc95d'],
        width: '1732px',
        height: '400px',
        margin: 'auto'
      },
      proWidth: '178',
      strWidth: '12',
      GetWindowInfo: {
        width: ''
      }
    }
  },
  components: {
    PointerTitle,
    BehavioralChart,
    BehavioralChartB
  },
  // watch: {
  //   '$store.state.histogram.DY_ERYMON_APPISSUE_NUM' () {
  //     this.drowNumber()
  //     this.drowSingle()
  //     this.drowLine()
  //     this.drowCare()
  //   }
  // },
  mounted () {
    this.drowNumber()
    this.drowSingle()
    this.drowLine()
    this.drowCare()
  },
  watch: {
    'list' () {
      this.drowNumber()
      this.drowSingle()
      this.drowLine()
      this.drowCare()
      this.paramsA = {
        xData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        legendData: ['保险计划书分享人均使用次数', '分享门店人均使用次数', '营销获客功能人均使用次数'],
        seriesA: this.list.dm_insur_share_numGdp,
        seriesB: this.list.dm_store_share_numGdp,
        seriesC: this.list.dm_getcust_numGdp,
        seriesAname: '保险计划书分享人均使用次数',
        seriesBname: '分享门店人均使用次数',
        seriesCname: '营销获客功能人均使用次数',
        seriesColorA: ['#70d2db'],
        seriesColorB: ['#ffc95c'],
        seriesColorC: ['#ff88a1'],
        left: '3%',
        right: '15%'
      }
      this.paramsB = {
        xData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        legendData: ['续保跟踪功能人均使用次数', '客户关怀功能人均使用次数', '学习充电功能人均使用次数'],
        seriesA: this.list.dm_renewtrack_numGdp,
        seriesB: this.list.dm_cust_care_numGdp,
        seriesC: this.list.dm_study_numGdp,
        seriesAname: '续保跟踪功能人均使用次数',
        seriesBname: '客户关怀功能人均使用次数',
        seriesCname: '学习充电功能人均使用次数',
        seriesColorA: ['#619ffe'],
        seriesColorB: ['#70d2db'],
        seriesColorC: ['#ffc95d'],
        left: '9%',
        right: '9%'
      }
    },
    '$store.state.role.state' () {
      this.getRoleshowXwxx()
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    // this.getRoleshowXwxx()
  },
  computed: {},
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.proWidth = '128'
        this.strWidth = '8'
      }
      if (this.GetWindowInfo.width === 1600) {
        this.proWidth = '148'
        this.strWidth = '10'
      }
      if (this.GetWindowInfo.width === 1920) {
        this.proWidth = '178'
        this.strWidth = '12'
      }
    },
    getRoleshowXwxx () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption
      }
      RoleshowXwxx(params).then(res => {
        this.list = res.data.data.secondcompanyRoleshowXwxx[0]
      })
    },
    fixNum (value) {
      var reg = /\d(?=(\d{3})+$)/g
      if (value < 10000) {
        let integer = value + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        return integer
      } else if (value < 100000000) {
        let integer = parseInt(value % 100000000 / 10000) + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        let decimals = (value % 10000 / 10000)
        if (decimals === 0) {
          decimals = '' + '万'
        } else {
          decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
        }
        if (integer === 0) {
          integer = ''
        }
        return integer + decimals
      } else if (value > 100000000) {
        let yi = parseInt(value / 100000000) + ''
        yi = yi.replace(reg, (content) => {
          return content + ','
        })
        let integer = parseInt(value % 100000000 / 10000) + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        let decimals = (value % 10000 / 10000)
        if (decimals === 0) {
          decimals = ''
        } else {
          decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
        }
        if (integer === 0) {
          integer = ''
        }
        return yi + '亿' + integer + decimals
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
            type: 'shadow'
          },
          formatter: (a) => {
            return a[0].name + '月' + '：' + this.fixNum(a[0].value) + '次'
          }
        },
        grid: {
          left: '8%',
          right: '11%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '月份',
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              show: true
            }
          }
        ],
        yAxis: [
          {
            name: '次数',
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
            data: this.list.dm_applogin_numGdp
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
            type: 'shadow'
          },
          formatter: (a) => {
            return a[0].name + '月' + '：' + this.fixNum(a[0].value) + '单'
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '月份',
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              interval: 0
              // rotate: 40
            }
          }
        ],
        yAxis: [
          {
            name: '数量',
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
            data: this.list.dm_appissue_numGdp
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
          formatter: (a) => {
            return a[0].axisValue + '月' + '<br />' + a[0].seriesName + '：' + a[0].data + '%' + '<br />' + a[1].seriesName + '：' + a[1].data + '%'
          }
        },
        grid: {
          left: '7%',
          right: '13%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '月份',
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
            // rotate: 20
          }
        },
        yAxis: {
          name: '%',
          nameTextStyle: {
            fontSize: 18
          },
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%'
          }
        },
        legend: {
          data: ['执行率', '成功率']
        },
        series: [
          {
            name: '执行率',
            color: ['#63b0ff'],
            data: this.list.dm_grant_bscare_custnumGdp,
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
          },
          {
            name: '成功率',
            color: ['#4fcb74'],
            data: this.list.dm_click_bscare_custnumGdp,
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
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowCare () {
      var num = this.$refs.careChart
      const myChart = this.$echarts.init(num)
      // if(arr.length=='0'){
      //   option = {
      //     title: {
      //       text: '暂无数据',
      //       x: 'center',
      //       y: 'center',
      //       textStyle: {
      //         color: '#65ABE7',
      //         fontWeight: 'normal',
      //         fontSize: 16
      //       }
      //     }
      //   }
      // }else{
      //   option = {
      //   }
      // }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: (a) => {
            return a[0].axisValue + '月' + '<br />' +
            a[6].seriesName + '：' + this.fixNum(a[6].data) + '次' + '<br />' +
            a[5].seriesName + '：' + this.fixNum(a[5].data) + '次' + '<br />' +
            a[4].seriesName + '：' + this.fixNum(a[4].data) + '次' + '<br />' +
            a[3].seriesName + '：' + this.fixNum(a[3].data) + '次' + '<br />' +
            a[2].seriesName + '：' + this.fixNum(a[2].data) + '次' + '<br />' +
            a[1].seriesName + '：' + this.fixNum(a[1].data) + '次' + '<br />' +
            a[0].seriesName + '：' + this.fixNum(a[0].data) + '次'
          }
        },
        // legend: {
        //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          name: '次数',
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        xAxis: {
          name: '月份',
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          // data: this.list.list_month,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          }
        },
        series: [
          {
            color: ['#045c8b'],
            name: '邀请注册次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_invite_reg_numGdp
          },
          {
            color: ['#5a82cf'],
            name: '理赔查询次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_claim_query_numGdp
          },
          {
            color: ['#66b1ff'],
            name: '协助报案次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_assist_report_numGdp
          },
          {
            color: ['#9edcf9'],
            name: '查违章次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_vio_query_numGdp
          },
          {
            color: ['#4ecb73'],
            name: '出险提醒点击关注次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_issue_warn_numGdp
          },
          {
            color: ['#8cefad'],
            name: '生日券转发次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_birth_wish_numGdp
          },
          {
            color: ['#fecc63'],
            name: '权益到期转发次数',
            type: 'bar',
            stack: '总量',
            // label: {
            //   show: true,
            //   position: 'insideRight'
            // },
            data: this.list.dm_rig_remind_numGdp
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
  width: 1740px;
  height: 100%;
  background-color: #fff;
  padding: 30px;
}
.header{
  width: 1732px;
  height: 370px;
  margin-top: 20px;
  display: flex;
  .loginNum{
    width: 698px;
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
        background: url('../../assets/logo/appLogin.png') no-repeat;
        position: relative;
        background-size: cover;
        p{
          width: 100%;
          height: 44px;
          font-size: 18px;
          // white-space: pre-wrap; // 换行属性
          // word-break: normal;
          margin: 90px auto 0;
          text-align: center;
        }
        .degree{
          font-size: 24px;
          height: 40px;
          line-height: 30px;
          width: 100%;
          text-align: center;
        }
      }
    }
    .loginNum_right{
      width: 488px;
      height: 370px;
      .top{
        width: 215px;
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
        width: 488px;
        height: 288px;
        margin: auto;
      }
    }
  }
  .apps{
    width: 992px;
    height: 370px;
    // background-color: lime;
    margin-left: 20px;
    display: flex;
    .apps_left{
      width: 348px;
      height: 370px;
      margin-right: 20px;
      .apps_top{
        width: 215px;
        height: 39px;
        background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
        font-size: 20px;
        line-height: 39px;
        margin-left: 20px;
        margin-top: 20px;
        background-size: cover;
        p{
          margin-left: 45px;
        }
      }
      .apps_body{
        width: 348px;
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
          margin: 30px 0 0 10px;
          text-align: center;
          background-size: cover;
          .top_p{
            font-size: 18px;
            margin-top: 18px;
            margin-left: 12px;
          }
          .but_p{
            font-size: 22px;
            margin-left: 12px;
            margin-top: 10px;
          }
        }
      }
    }
    .apps_right{
      width: 594px;
      height: 370px;
      .apps_top{
        width: 215px;
        height: 39px;
        background: url('../../assets/portraitImg/ClientBehavior/white.png') no-repeat;
        font-size: 20px;
        line-height: 39px;
        margin-left: 20px;
        margin-top: 20px;
        background-size: cover;
        p{
          margin-left: 45px;
        }
      }
      .appSingle{
        width: 584px;
        height: 288px;
        margin: auto;
      }
    }
  }
}
.body{
  width: 1732px;
  height: 370px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
}
.preSales{
  width: 718px;
  height: 370px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
}
.preSalesTitle{
  width: 211px;
  height: 37px;
  line-height: 32 px;
  background: url('../../assets/portraitImg/ClientBehavior/blue.png') no-repeat;
  margin-top: 20px;
  padding-left: 45px;
  padding-top: 4px;
  font-size: 20px;
  background-size: cover;
}
.preSalesBody{
  width: 718px;
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
  width: 800px;
  height: 300px;
  margin-left: -30px;
}
.customerCare{
  width: 992px;
  height: 370px;
  margin-left: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
}
.careBody{
  width: 992px;
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
  width: 750px;
  height: 300px;
}
.ddxAPP{
  width: 290px;
  height: 39px;
  line-height: 39px;
  display: flex;
  border: 1px solid #ccc;
  background-color: #fff;
  align-items: center;
  margin-top: 100px;
  margin-left: 20px;
}
.ddxTitle{
  width: 5px;
  height: 24px;
  background-color: #ff6a00;
  margin-left: 20px;
}
.ddxAPP p{
  font-size: 20px;
  margin-left: 15px;
}
.onePlus{
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  padding-left: 50px;
}
.about{
  width: 275px;
  height: 330px;
  background-color: #f6f7fc;
  margin-top: 25px;
}
.about img{
  margin: 40px 0 0 90px;
  width: 92px;
  height: 92px;
}
.oneP{
  font-size: 20px;
  margin-top: 40px;
  text-align: center;
}
.twoP{
  font-size: 28px;
  margin-top: 40px;
  text-align: center;
}
.ddxAPPChart{
  width: 1432px;
  height: 400px;
}
.ddxAPPChartA{
  width: 1732px;
  height: 400px;
  margin-top: 50px;
}
</style>
