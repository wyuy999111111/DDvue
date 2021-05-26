<template>
  <div class="renewal">
    <PointerTitle class="pointerTitle" params="续保情况" />
    <div class="nick">
      <div class="nickL">
        <div class="flex">
          <div class="nickLeft">
            <div class="titleBgp">当月续保保单到期量</div>
            <div class="nickBottom">
              <img src="../../assets/logo/onMonth.png" class="onMonth" />
              <span class="thirtyTwo">{{
                this.list.dm_end_polnum | fixNumber
              }}</span>
            </div>
          </div>
          <div class="nickRight">
            <div class="titleBgp">续保率目标</div>
            <div class="nickBottom">
              <img src="../../assets/logo/target.png" class="onMonth" />
              <span class="thirtyTwo">{{ this.list.reneRate }}%</span>
            </div>
          </div>
        </div>
        <div class="progress progressTop">
          <div class="progressTitle">当月到期保单的首报率</div>
          <div class="progressBar">
            <div
              class="progressBarOn"
              :style="{ width: this.list.dm_end_1stquo_xbpolnumGdp + '%' }"
            ></div>
          </div>
          <div class="progressNum">
            {{ this.list.dm_end_1stquo_xbpolnumGdp }}%
          </div>
        </div>
        <div class="progress">
          <div class="progressTitle">当月到期保单的二报率</div>
          <div class="progressBar">
            <div
              class="progressBarOn"
              :style="{ width: this.list.dm_end_2ndquo_xbpolnumGdp + '%' }"
            ></div>
          </div>
          <div class="progressNum">
            {{ this.list.dm_end_2ndquo_xbpolnumGdp }}%
          </div>
        </div>
        <div class="progress">
          <div class="progressTitle">当月到期保单的三报率</div>
          <div class="progressBar">
            <div
              class="progressBarOn"
              :style="{ width: this.list.dm_end_3rdquo_xbpolnumGdp + '%' }"
            ></div>
          </div>
          <div class="progressNum">
            {{ this.list.dm_end_3rdquo_xbpolnumGdp }}%
          </div>
        </div>
        <div class="ending">
          <div class="endingBlock endingBlockOne">
            <div class="endingL">
              <div class="endingltext">当年累计首报报价率</div>
              <img src="../../assets/logo/endingOne .png" />
            </div>
            <div class="endingC">
              <el-progress
                type="circle"
                color="#99ccff"
                :percentage="this.list.dy_1stquo_polnumGdp"
                :width="mixWidth"
              ></el-progress>
            </div>
            <div class="endingR">
              <div class="endingTop">
                <span>完成人数</span>
                <span class="spanNum">{{ this.list.fin_1stquo_num }}</span>
              </div>
              <div class="endingBottom">
                <span>未完成人数</span>
                <span class="pink spanNum">{{
                  this.list.unfin_1stquo_num | fixNumber
                }}</span>
              </div>
            </div>
          </div>
          <div class="endingBlock">
            <div class="endingL">
              <div class="endingltext">当年累计二报报价率</div>
              <img src="../../assets/logo/endingTwo.png" />
            </div>
            <div class="endingC">
              <el-progress
                type="circle"
                :percentage="this.list.dy_2ndquo_polnumGdp"
                :width="mixWidth"
              ></el-progress>
            </div>
            <div class="endingR">
              <div class="endingTop">
                <span>完成人数</span>
                <span class="spanNum">{{
                  this.list.fin_2ndquo_num | fixNumber
                }}</span>
              </div>
              <div class="endingBottom">
                <span>未完成人数</span>
                <span class="pink spanNum">{{
                  this.list.unfin_2ndquo_polnum | fixNumber
                }}</span>
              </div>
            </div>
          </div>
          <div class="endingBlock">
            <div class="endingL">
              <div class="endingltext">当年累计三报报价率</div>
              <img src="../../assets/logo/endingThree.png" />
            </div>
            <div class="endingC">
              <el-progress
                type="circle"
                color="#6d80f5"
                :percentage="this.list.dy_3rdquo_polnumGdp"
                :width="mixWidth"
              ></el-progress>
            </div>
            <div class="endingR">
              <div class="endingTop">
                <span>完成人数</span>
                <span class="spanNum">{{
                  this.list.fin_3rdquo_num | fixNumber
                }}</span>
              </div>
              <div class="endingBottom">
                <span>未完成人数</span>
                <span class="pink spanNum">{{
                  this.list.unfin_3rdquo_polnum | fixNumber
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nickR">
        <div class="flex nickDetail">
          <div class="nickCild">
            <div class="nickChildHead">当年累计续保率</div>
            <el-progress
              type="circle"
              color="#917bff"
              :percentage="this.list.dym_renew_polnumGdp"
              :width="maxWidth"
              :stroke-width="strWidth"
            ></el-progress>
            <div class="nickRfoot">
              <div class="flex flexCenter">
                <div class="nickTitle">达标人数</div>
                <div class="nickValue">
                  {{ this.list.renew_reach_num | fixNumber }}
                </div>
              </div>
              <div class="flex flexCenter">
                <div class="nickTitle">未达标人数</div>
                <div class="nickValue pink">
                  {{ this.list.renew_unreach_num | fixNumber }}
                </div>
              </div>
            </div>
          </div>
          <div class="nickCild">
            <div class="nickChildHead">新车续保率</div>
            <el-progress
              type="circle"
              :percentage="this.list.dy_newcar_xb_ratio"
              :width="maxWidth"
              :stroke-width="strWidth"
            ></el-progress>
            <div class="ortherFoot">
              <div class="ortherTitle">较上月</div>
              <div class="ortherValue">
                {{ this.list.dy_newcar_xb_ratio | fixNumber }}
              </div>
              <div
                class="ortherValue"
                v-if="this.list.dy_newcar_xb_ratio === '0'"
              >
                {{ 0 }}
              </div>
              <img
                src="../../assets/logo/up.png"
                v-if="this.list.dy_newcar_xb_ratio > '0'"
              />
              <img
                src="../../assets/logo/hx.png"
                v-if="this.list.dy_newcar_xb_ratio === '0'"
              />
              <img
                src="../../assets/logo/down.png"
                v-if="this.list.dy_newcar_xb_ratio < '0'"
              />
            </div>
          </div>
          <div class="nickCild">
            <div class="nickChildHead">当月续保率</div>
            <el-progress
              type="circle"
              :percentage="this.list.dm_renew_polnumGdp"
              :width="maxWidth"
              :stroke-width="strWidth"
            ></el-progress>
            <div class="ortherFoot">
              <div class="ortherTitle">较上月</div>
              <div
                class="ortherValue"
                v-if="
                  this.list.dm_renew_polnumGdpLast < '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ -this.list.dm_renew_polnumGdpLast | fixNumber }}
              </div>
              <div
                class="ortherValue"
                v-if="
                  this.list.dm_renew_polnumGdpLast > '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ this.list.dm_renew_polnumGdpLast | fixNumber }}
              </div>
              <div class="ortherValue" v-if="this.list.renewTag === '0'">
                {{ msg }}
              </div>
              <div
                class="ortherValue"
                v-if="
                  this.list.dm_renew_polnumGdpLast === '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ 0 }}
              </div>
              <img
                src="../../assets/logo/up.png"
                v-if="this.list.dm_renew_polnumGdpLast > '0'"
              />
              <img
                src="../../assets/logo/hx.png"
                v-if="this.list.renewTag === '0'"
              />
              <img
                src="../../assets/logo/down.png"
                v-if="this.list.dm_renew_polnumGdpLast < '0'"
              />
            </div>
          </div>
          <div class="nickCild">
            <div class="nickChildHead">下月续保率</div>
            <el-progress
              type="circle"
              color="#4cb7be"
              :percentage="this.list.nm_renew_polnumGdp"
              :width="maxWidth"
              :stroke-width="strWidth"
            ></el-progress>
            <div class="ortherFoot">
              <div class="ortherTitle">较上月</div>
              <div
                class="ortherValue"
                v-if="
                  this.list.nm_renew_polnumGdpLast < '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ -this.list.nm_renew_polnumGdpLast | fixNumber }}
              </div>
              <div
                class="ortherValue"
                v-if="
                  this.list.nm_renew_polnumGdpLast > '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ this.list.nm_renew_polnumGdpLast | fixNumber }}
              </div>
              <div class="ortherValue" v-if="this.list.renewTag === '0'">
                {{ msg }}
              </div>
              <div
                class="ortherValue"
                v-if="
                  this.list.nm_renew_polnumGdpLast === '0' &&
                  this.list.renewTag === '00'
                "
              >
                {{ 0 }}
              </div>
              <img
                src="../../assets/logo/up.png"
                v-if="this.list.nm_renew_polnumGdpLast > '0'"
              />
              <img
                src="../../assets/logo/hx.png"
                v-if="this.list.renewTag === '0'"
              />
              <img
                src="../../assets/logo/down.png"
                v-if="this.list.nm_renew_polnumGdpLast < '0'"
              />
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="card cardA">
            <div class="cardTitle">当年提前续保天数</div>
            <span class="cardBody"
              >{{ this.list.dy_adrenew_daysGdp | fixNumber }}天</span
            >
          </div>
          <div class="card cardB">
            <div class="cardTitle">未续报保单平均报价次数</div>
            <span class="cardBody"
              >{{ this.list.dym_unrene_quonumGdp | fixNumber }}次</span
            >
          </div>
          <div class="card cardC">
            <div class="cardTitle">已续报保单平均报价次数</div>
            <span class="cardBody"
              >{{ this.list.dym_renew_quonumGdp | fixNumber }}次</span
            >
          </div>
        </div>
        <div class="titleBgpFoot"><p>续保率目标</p></div>
        <div class="bar" ref="bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
import PointerTitle from '../../common/pointerTitle'
import { RoleshowXbqk } from '../../api/getApi'

export default {
  components: {
    PointerTitle
  },
  data () {
    return {
      msg: '-',
      list: [],
      GetWindowInfo: {
        width: ''
      },
      mixWidth: '126',
      maxWidth: '176',
      strWidth: '10',
      xSize: 18
    }
  },
  mounted () {
    this.drowBar()
  },
  watch: {
    list () {
      this.drowBar()
    },
    '$store.state.role.state' () {
      this.getRoleshowXbqk()
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    // this.getRoleshowXbqk()
  },
  computed: {},
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.mixWidth = '99'
        this.maxWidth = '120'
        this.strWidth = '6'
        this.xSize = 14
      }
      if (this.GetWindowInfo.width === 1600) {
        this.mixWidth = '114'
        this.maxWidth = '148'
        this.xSize = 16
      }
      if (this.GetWindowInfo.width === 1920) {
        this.mixWidth = '126'
        this.maxWidth = '176'
        this.xSize = 18
      }
    },
    getRoleshowXbqk () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption
      }
      RoleshowXbqk(params).then((res) => {
        this.list = res.data.data.secondcompanyRoleshowXbqk[0]
      })
    },
    drowBar () {
      const bar = this.$refs.bar
      const myChart = this.$echarts.init(bar)
      const option = {
        grid: {
          right: '15%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (a) => {
            return (
              a[0].axisValue +
              '月' +
              '<br />' +
              a[0].seriesName +
              '：' +
              a[0].data +
              '%' +
              '<br />' +
              a[1].seriesName +
              '：' +
              a[1].data +
              '%' +
              '<br />' +
              a[2].seriesName +
              '：' +
              a[2].data +
              '%'
            )
          }
        },
        legend: {
          data: ['首报率', '二报率', '三报率']
        },
        xAxis: {
          name: '月份',
          nameTextStyle: {
            fontSize: 18
          },
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 16
            },
            margin: 20
          }
        },
        yAxis: {
          name: '%',
          nameTextStyle: {
            fontSize: 16
          },
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              fontSize: this.xSize
            }
          }
        },
        series: [
          {
            name: '首报率',
            data: this.list.dm_end_1stquo_polnumGdp,
            type: 'line',
            smooth: true,
            symbolSize: '0',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#619EFF', // 改变折线点的颜色
                lineStyle: {
                  color: '#619EFF' // 改变折线颜色
                }
              }
            }
          },
          {
            name: '二报率',
            data: this.list.dm_end_2ndquo_polnumGdp,
            type: 'line',
            smooth: true,
            symbolSize: '0',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#70D2DB', // 改变折线点的颜色
                lineStyle: {
                  color: '#70D2DB' // 改变折线颜色
                }
              }
            }
          },
          {
            name: '三报率',
            data: this.list.dm_end_3rdquo_polnumGdp,
            type: 'line',
            smooth: true,
            symbolSize: '0',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#FFC95C', // 改变折线点的颜色
                lineStyle: {
                  color: '#FFC95C' // 改变折线颜色
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
    }
  }
}
</script>
<style lang="less" scoped>
.pointerTitle {
  padding-top: 41px;
}
.renewal {
  background: white;
  padding-left: 30px;
  margin-bottom: 20px;
  padding-bottom: 30px;
}
.nick {
  display: flex;
  margin-top: 71px;
}
.titleBgp {
  font-size: 20px;
  width: 213px;
  height: 38px;
  margin-left: 39px;
  background: url("../../assets/logo/titleBgp.png");
  background-size: 100% 100%;
  padding-left: 41px;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
}
.nickR {
  margin-left: 103px;
  width: 100%;
  box-sizing: border-box;
  // padding-right: 90px;
}
.flex {
  display: flex;
}
.nickRight {
  margin-left: 136px;
}
.onMonth {
  padding-left: 51px;
  width: 48px;
  height: 48px;
}
.thirtyTwo {
  font-size: 32px;
  font-weight: 400;
  padding-left: 26px;
}
.nickBottom {
  display: flex;
  align-items: center;
}
.progress {
  display: flex;
  margin-bottom: 48px;
  margin-left: 30px;
  font-size: 20px;
  font-weight: 400;
  align-items: center;
}
.progressTop {
  margin-top: 60px;
}
.progressBar {
  width: 347px;
  height: 17px;
  border: 1px solid #61afff;
  margin: 0 35px 0 48px;
  border-radius: 5px;
}
.progressBarOn {
  background: #61afff;
  height: 100%;
}
.nickCild {
  width: 176px;
}
.nickChildHead {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 39px;
}
.nickAround {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.nickR /deep/ .el-progress-circle {
  width: 176px;
  height: 176px;
}
.nickRfoot {
  text-align: center;
  padding-top: 35px;
}
.nickTitle {
  font-size: 18px;
}
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.nickValue {
  font-size: 24px;
}
.nickValue {
  font-size: 24px;
}
.ortherFoot {
  display: flex;
  justify-content: space-around;
  margin-top: 57px;
  align-items: center;
}
.ortherTitle {
  font-size: 18px;
}
.ortherValue {
  font-size: 24px;
}
.cards {
  display: flex;
}
.card {
  width: 274px;
  height: 157px;
  background: #f6f7fc;
  border-radius: 10px;
}
.cardTitle {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-top: 32px;
}
.cardBody {
  margin-top: 45px;
}
.cardA {
  background: url("../../assets/logo/cardOne.png");
  background-size: 100% 100%;
  margin-right: 24px;
}
.cardB {
  background: url("../../assets/logo/cardTwo.png");
  margin-right: 24px;
  background-size: 100% 100%;
}
.cardC {
  background: url("../../assets/logo/cardThree.png");
  background-size: 100% 100%;
}
.cardBody {
  font-size: 28px;
  font-weight: 400;
  position: relative;
  left: 126px;
  top: 35px;
}
.titleBgpFoot {
  font-size: 20px;
  width: 213px;
  height: 38px;
  margin-left: 20px;
  background: url("../../assets/logo/titleBgp.png");
  background-size: 100% 100%;
  // padding-left: 41px;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  margin-top: 71px;
}
.titleBgpFoot p {
  margin-left: 45px;
}
.bar {
  width: 930px;
  height: 400px;
  margin: auto;
}
.endingBlock {
  display: flex;
  font-size: 20px;
}
.endingBlock img {
  padding-left: 57px;
}
.endingL img {
  width: 226px;
  height: 27px;
}
.endingltext {
  margin-left: 82px;
  font-weight: 400;
  margin-bottom: 18px;
}
.endingBlock {
  margin-top: 80px;
}
.endingBlockOne {
  padding-top: 25px;
}
.endingC {
  margin-left: 33px;
  margin-right: 29px;
}
.endingR div {
  display: flex;
  justify-content: space-between;
  width: 268px;
  height: 55px;
}
.endingR span {
  font-size: 18px;
}
.spanNum {
  font-size: 24px !important;
}
.endingTop {
  padding: 0 33px;
  box-sizing: border-box;
  display: flex;
  background: #f6f7fc;
  font-size: 18px;
  font-weight: 400;
  align-items: center;
}
.endingBottom {
  background: url("../../assets/logo/endBack.png");
  background-size: 100% 100%;
  margin-top: 11px;
  padding: 0 33px;
  box-sizing: border-box;
  display: flex;
  font-size: 18px;
  font-weight: 400;
  align-items: center;
}
.pink {
  color: #ff98ac;
}
.nickDetail {
  width: 600px;
}
.nickCild {
  margin-right: 4rem;
}
/deep/ .el-progress--circle .el-progress__text {
  font-size: 26px !important;
  color: #000;
}
</style>
