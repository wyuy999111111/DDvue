<template>
  <div class="teamAssessmemt">
    <PointerTitle params='团队考核' class="PointerTitle" />
    <div class="top">
      <div class="table" v-if='$store.state.role.orglOption === "2"'>
        <div class="tableHead">
          <div class="tableHeadItem">分公司名称</div>
          <div class="tableHeadItem">渠道名称</div>
          <div class="tableHeadItem">渠道总监</div>
          <div class="tableHeadItem">人数</div>
        </div>
        <div class="tableContent">
          <div class="contentTable" v-for="(item, index) in list" :key="index" @click='handleClick(item, index)' :class="index === listNow ? 'tableOn' : 'tableOff'" >
            <div class="tableItem" v-if="comname(item.sales_comname2)">
              <el-tooltip class="item" effect="light" :content="item.sales_comname2" placement="top-start" >
                <p class="cardValue">{{ item.sales_comname2 | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.sales_comname2 | ellipsis }}</p>
            </div>
            <div class="tableItem" v-if="comnameTwo(item.sales_channename)">
              <el-tooltip class="item" effect="light" :content="item.sales_channename" placement="top-start">
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
            </div>
            <div class="tableItem">{{item.channel_director}}</div>
            <div class="tableItem">{{item.peopleNum | fixNumber}}</div>
          </div>
        </div>
      </div>

      <div class="table" v-if='$store.state.role.orglOption === "3"'>
        <div class="tableHead">
          <div class="tableHeadItem">中支公司名称</div>
          <div class="tableHeadItem">渠道名称</div>
          <div class="tableHeadItem">业务部总监</div>
          <div class="tableHeadItem">人数</div>
        </div>
        <div class="tableContent">
          <div class="contentTable" v-for="(item, index) in list" :key="index" @click='handleClick(item, index)' :style="{background: index === listNow ? '#D4EBFD' : '#F6F7FC'}">
            <div class="tableItem" v-if="comnameThree(item.sales_comname3)">
              <el-tooltip class="item" effect="light" :content="item.sales_comname3" placement="top-start">
                <p class="cardValue">{{ item.sales_comname3 | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.sales_comname3 | ellipsis }}</p>
            </div>
            <div class="tableItem" v-if="comnameTwo(item.sales_channename)">
              <el-tooltip class="item" effect="light" :content="item.sales_channename" placement="top-start">
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
            </div>
            <div class="tableItem">{{item.busi_director}}</div>
            <div class="tableItem">{{item.peopleNum | fixNumber}}</div>
          </div>
        </div>
      </div>

      <div class="table" v-if='$store.state.role.orglOption === "4"'>
        <div class="tableHead">
          <div class="tableHeadItem">团队名称</div>
          <div class="tableHeadItem">渠道名称</div>
          <div class="tableHeadItem">团队长</div>
          <div class="tableHeadItem">人数</div>
        </div>
        <div class="tableContent">
          <div class="contentTable" v-for="(item, index) in list" :key="index" @click='handleClick(item, index)' :style="{background: index === listNow ? '#D4EBFD' : '#F6F7FC'}">
            <div class="tableItem" v-if="comnameFour(item.team_name)">
              <el-tooltip class="item" effect="light" :content="item.team_name" placement="top-start">
                <p class="cardValue">{{ item.team_name | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.team_name | ellipsis }}</p>
            </div>
            <div class="tableItem" v-if="comnameTwo(item.sales_channename)">
              <el-tooltip class="item" effect="light" :content="item.sales_channename" placement="top-start">
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
              </el-tooltip>
            </div>
            <div class="tableItem" v-else>
                <p class="cardValue">{{ item.sales_channename | ellipsis }}</p>
            </div>
            <div class="tableItem">{{item.team_leader}}</div>
            <div class="tableItem">{{item.peopleNum | fixNumber}}</div>
          </div>
        </div>
      </div>
      <div class="tableDetail">
        <div class="detailHead">
          <!-- <img src="../../assets/logo/pointer.png" class="pointer" /> -->
          <img src="../../assets/logo/team.png" class="team" />
          <span>{{title}}-{{titleTwo}}</span>
        </div>
        <div class="cards">
          <div class="cardL">
            <div class="cardLa">
              <div class="cardTitle">月实收保费</div>
              <div class="cardLbottom">
                <img src="../../assets/logo/income.png" class="income" />
                <span class="money">{{ dataSourse.dmPrm | fixNumber }}</span>
                <span class="company">元</span>
              </div>
            </div>
            <div class="cardLbs">
              <div class="cardlb">
                <div class="tool"><img src="../../assets/logo/black.png" class="black" />保费达成率</div>
                <div class="cardLc">{{dataSourse.achievementRate}}%</div>
              </div>
              <div class="cardlb">
                <div class="tool"><img src="../../assets/logo/black.png" class="black" />缺口</div>
                <div class="cardLc">{{dataSourse.dm_prm_gap | fixNumber}}元</div>
              </div>
            </div>
          </div>
          <div class="cardR">
            <div class="cardTitle">月考核保费</div>
            <div class="flex">
              <img src="../../assets/logo/chart.png" class="income" />
              <div class="boldNum">{{dataSourse.dm_ass_prm | fixNumber}}<span class="company">元</span></div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="progressList">
            <div class="progress">
              <el-progress type="circle" :percentage='dataSourse.renewalRate' color="#917bff" :width=proWidth></el-progress>
              <div>续保率</div>
            </div>
            <div class="progress">
              <el-progress type="circle" :percentage="dataSourse.monthlySurvivalRate" color="#917bff" :width=proWidth></el-progress>
              <div>月活率</div>
            </div>
            <div class="progress">
              <el-progress type="circle" :percentage="dataSourse.onlineBindingRate" color="#917bff" :width=proWidth></el-progress>
              <div>线上化绑定率</div>
            </div>
          </div>
          <div class="listSecList">
            <div class="listSec">
              <img src="../../assets/logo/cprLogo.png" />
              <div class="listR">
                <div class="twenty">CPR</div>
                <div class="thirtyTwo">{{dataSourse.cpr}}%</div>
              </div>
            </div>
            <div class="listSec listSecr">
              <img src="../../assets/logo/pflLogo.png" />
              <div class="listR">
                <div class="twenty">赔付率</div>
                <div class="thirtyTwo">{{dataSourse.lossRatio}}%</div>
              </div>
            </div>
          </div>
        </div>
          <div class="titleBgp"><p>保费趋势图（今年）</p></div>
          <div class="lineChart" ref="lineChart"></div>
      </div>
    </div>
    <div class="foot">
      <div class="leftFoot">
        <div class="titleBgp footTitle"><p>考核情况</p></div>
        <div class="customCharts">
          <div class="grade">
            <div class="gradeLeft">
              <span class="twentySix">{{dataSourse.peopleNum[0] | fixNumber}}人</span>
              <div class="customBar" :style="{background: '#6D80F5', height: 226 * dataSourse.peopleProportion[0] / 100 + 'px'}"></div>
              <div class="customType">优秀</div>
            </div>
            <div class="gradeRight">
              <div class="gradeTop">占比</div>
              <div class="gradeBottom">{{dataSourse.peopleProportion[0]}}%</div>
            </div>
          </div>
          <div class="grade">
            <div class="gradeLeft">
              <span class="twentySix">{{dataSourse.peopleNum[1] | fixNumber}}人</span>
              <div class="customBar" :style="{background: '#70B4FA', height: 226 * dataSourse.peopleProportion[1] / 100 + 'px'}"></div>
              <div class="customType">良好</div>
            </div>
            <div class="gradeRight">
              <div class="gradeTop">占比</div>
              <div class="gradeBottom">{{dataSourse.peopleProportion[1]}}%</div>
            </div>
          </div>
          <div class="grade">
            <div class="gradeLeft">
              <span class="twentySix">{{dataSourse.peopleNum[2] | fixNumber}}人</span>
              <div class="customBar" :style="{background: '#4ECB73', height: 226 * dataSourse.peopleProportion[2] / 100 + 'px'}"></div>
              <div class="customType">合格</div>
            </div>
            <div class="gradeRight">
              <div class="gradeTop">占比</div>
              <div class="gradeBottom">{{dataSourse.peopleProportion[2]}}%</div>
            </div>
          </div>
          <div class="grade">
            <div class="gradeLeft">
              <span class="twentySix">{{dataSourse.peopleNum[3] | fixNumber}}人</span>
              <div class="customBar" :style="{background: '#ABDF99', height: 226 * dataSourse.peopleProportion[3] / 100 + 'px'}"></div>
              <div class="customType">基本合格</div>
            </div>
            <div class="gradeRight">
              <div class="gradeTop">占比</div>
              <div class="gradeBottom">{{dataSourse.peopleProportion[3]}}%</div>
            </div>
          </div>
          <div class="grade">
            <div class="gradeLeft">
              <span class="twentySix">{{dataSourse.peopleNum[4] | fixNumber}}人</span>
              <div class="customBar" :style="{background: '#FF88A0', height: 226 * dataSourse.peopleProportion[4] / 100 + 'px'}"></div>
              <div class="customType">不合格</div>
            </div>
            <div class="gradeRight">
              <div class="gradeTop">占比</div>
              <div class="gradeBottom">{{dataSourse.peopleProportion[4]}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightFoot">
        <div class="titleBgp footTitle"><p>KPI</p></div>
        <div class="bar" ref='bar'></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  TeamList, TeamAssessment
} from '@/api/portrait'
import PointerTitle from '../../common/pointerTitle'

export default {
  data () {
    return {
      listNow: 0,
      list: [],
      dataSourse: {
        dmPrm: '',
        achievementRate: '',
        dm_prm_gap: '',
        dm_ass_prm: '',
        renewalRate: '',
        monthlySurvivalRate: '',
        onlineBindingRate: '',
        cpr: '',
        lossRatio: '',
        peopleNum: [1, 2, 3, 4, 5],
        peopleProportion: [1, 2, 3, 4, 5]
      },
      title: '',
      titleTwo: '',
      prowidth: '126',
      GetWindowInfo: {
        width: ''
      }
    }
  },
  components: {
    PointerTitle
  },
  computed: {
    comname () {
      return function (val) {
        if (val === null) return false
        return val.length > 4
      }
    },
    comnameTwo () {
      return function (val) {
        if (val === null) return false
        return val.length > 4
      }
    },
    comnameThree () {
      return function (val) {
        if (val === null) return false
        return val.length > 4
      }
    },
    comnameFour () {
      return function (val) {
        if (val === null) return false
        return val.length > 4
      }
    }
  },
  watch: {
    '$store.state.role.state' () {
      this.getData()
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    // this.getData()
  },
  mounted () {
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.proWidth = '96'
      }
      if (this.GetWindowInfo.width === 1600) {
        this.proWidth = '111'
      }
      if (this.GetWindowInfo.width === 1920) {
        this.proWidth = '126'
      }
    },
    getData () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption
      }
      TeamList(params).then((res) => {
        this.list = res.data.data.teamList
        this.dataSourse = res.data.data.teamAssessment
        // this.title = res.data.data.teamList[0].sales_comname2
        if (this.$store.state.role.orglOption === '2') {
          this.title = res.data.data.teamList[0].sales_comname2
        } else if (this.$store.state.role.orglOption === '3') {
          this.title = res.data.data.teamList[0].sales_comname3
        } else if (this.$store.state.role.orglOption === '4') {
          this.title = res.data.data.teamList[0].team_name
        }
        this.titleTwo = res.data.data.teamList[0].sales_channename
        console.log(this.title, this.titleTwo)
        console.log(res.data.data.teamList[0])
        setTimeout(() => {
          this.drow()
          this.drowBar()
        }, 0)
        console.log(this.list)
      })
    },
    handleClick (item, index) {
      this.listNow = index
      // this.title = item.sales_comname2
      this.titleTwo = item.sales_channename
      let params = ''
      if (this.$store.state.role.dateMonth.slice(0, 1) !== '0' && this.$store.state.role.dateMonth.length === 1) {
        this.$store.state.role.dateMonth = '0' + this.$store.state.role.dateMonth
      }
      if (this.$store.state.role.orglOption === '2') {
        params = {
          id: item.sales_comcode2,
          sales_channelcode: item.sales_channelcode,
          channel_director: item.channel_director,
          year: this.$store.state.role.date.slice(0, 4),
          month: this.$store.state.role.dateMonth,
          level: this.$store.state.role.orglOption
        }
        this.title = item.sales_comname2
      } else if (this.$store.state.role.orglOption === '3') {
        params = {
          id: item.sales_comcode3,
          sales_channelcode: item.sales_channelcode,
          busi_director: item.busi_director,
          year: this.$store.state.role.date.slice(0, 4),
          month: this.$store.state.role.dateMonth,
          level: this.$store.state.role.orglOption
        }
        this.title = item.sales_comname3
      } else if (this.$store.state.role.orglOption === '4') {
        params = {
          id: item.team_Code,
          sales_channelcode: item.sales_channelcode,
          team_leader: item.team_leader,
          year: this.$store.state.role.date.slice(0, 4),
          month: this.$store.state.role.dateMonth,
          level: this.$store.state.role.orglOption
        }
        this.title = item.team_name
      }
      TeamAssessment(params).then((res) => {
        this.dataSourse = res.data.data
        setTimeout(() => {
          this.drow()
          this.drowBar()
        }, 0)
      })
    },
    drow () {
      var circle = this.$refs.lineChart
      const myChart = this.$echarts.init(circle)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}月：{c}元'
        },
        grid: {
          top: '50px',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
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
          data: this.dataSourse.premiumTrend,
          type: 'line',
          symbolSize: '6',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#FFC95C', // 改变折线点的颜色
              lineStyle: {
                color: '#FFC95C' // 改变折线颜色
              }
            }
          }
        }]
      }
      myChart.setOption(option)
    },
    drowBar () {
      const bar = this.$refs.bar
      const myChart = this.$echarts.init(bar)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '20px',
          right: '0%',
          bottom: '30px',
          top: '10',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['指标一', '指标二', '指标三', '指标四', '指标五'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '16',
            data: this.dataSourse.kpiValue,
            itemStyle: {
              normal: {
                color: '#61AFFF'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.teamAssessmemt{
  background: white;
  // width: 100%;
  height: 100%;
  padding-left: 34px;
  padding-top: 39px;
  margin-bottom: 30px;
}
.top{
  display: flex;
  margin-top: 50px;
}
.table{
  width: 525px;
  height: 793px;
  background: #F6F7FC;
}
.tableHead{
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tableHeadItem{
  border: 1px solid #E6E6E6;
  width: 98px;
  height: 35px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.tableContent{
  // height: 458px;
  height: 725px;
  width: 100%;
  overflow: auto;
}
.tableDetail{
  margin-left: 31px;
}
.detailHead{
  margin-top: 25px;
  display: flex;
  align-items: center;
}
.team{
  padding-left: 12px;
  padding-right: 33px;
}
.detailHead span{
  color: #FF6B00;
  font-size: 26px;
  font-weight: 400;
}
#detailSpan{
  color: black;
}
.cards{
  width: 1154px;
  margin-top: 42px;
  display: flex;
}
.cardL{
  background: #F6F7FC;
  width: 705px;
  height: 152px;
  border-radius: 10px;
  margin-right: 25px;
  display: flex;
}
.cardR{
  width: 424px;
  height: 152px;
  border-radius: 10px;
  background: #F6F7FC;
}
.cardLa{
  width: 355px;
}
.cardLa .cardTitle{
  margin-top: 28px;
  margin-left: 25px;
  font-size: 20px;
  font-weight: 400;
}
.cardTitle{
  margin-top: 28px;
  margin-left: 45px;
  font-size: 20px;
  font-weight: 400;
}
.cardLa .income{
  margin-left: 40px;
  width: 33px;
  height: 33px;
  margin-top: 40px;
}
.income{
  margin-left: 73px;
  width: 33px;
  height: 33px;
  margin-top: 40px;
}
.money{
  padding-left: 34px;
  font-size: 32px;
}
.company{
  font-size: 24px;
  padding-left: 10px;
}
.cardlb{
  margin-top: 33px;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.cardlb img{
  width: 13px;
  height: 17px;
  padding-right: 16px;
}
.tool{
  width: 170px;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.cardLc{
  font-size: 26px;
}
.boldNum{
  font-size: 32px;
  font-weight: 400;
  margin-top: 35px;
  margin-left: 99px;
}
.flex{
  display: flex;
}
/deep/ .el-progress--circle .el-progress__text{
  font-size: 26px !important;
  color: black;
  font-weight: 450;
}
.progressList{
  display: flex;
  width: 545px;
  justify-content: space-between;
  margin: 0 34px;
}
.progress{
  text-align: center;
  margin-top: 25px;
  font-size: 20px;
  font-weight: 400;
}
.progress div {
  margin-top: 16px;
}
.twenty{
  font-size: 20px;
  font-weight: 400;
}
.thirtyTwo{
  font-size: 32px;
  font-weight: 400;
  margin-top: 37px;
}
.listSecList{
  margin-left: 65px;
  // margin-left: 73px;
  margin-top: 58px;
  display: flex;
}
.listSec{
  display: flex;
}
.listSec img {
  padding-right: 22px;
  width: 102px;
  height: 103px;
}
.listSecr{
  margin-left: 30px;
}
.titleBgp{
  font-size: 20px;
  width: 213px;
  height: 38px;
  margin-left: 39px;
  background: url('../../assets/logo/titleBgp.png');
  background-size: 100% 100%;
  // padding-left: 41px;
  display: flex;
  align-items: center;
  margin-top: 47px;
  margin-bottom: 42px;
  background-size: cover;
}
.titleBgp p{
  margin-left: 33px;
}
.lineChart{
  width: 1045px;
  height: 250px;
  margin-left: 116px;
  margin-top: -50px;
}
.foot{
  display: flex;
  padding-bottom: 30px;
}
.leftFoot{
  width: 1079px;
  height: 368px;
}
.rightFoot{
  width: 718px;
  height: 368px;
}
.footTitle{
  margin-top: 31px;
  margin-left: 22px;
}
.footTitle p{
  margin-left: 45px;
}
.bar{
  height: 268px;
  width: 618px;
}
.contentTable{
  display: flex;
  margin-bottom: 20px;
  padding: 10px 0;
}
.contentTable:hover{
  cursor: pointer;
}
.tableOn{
  background-color: #D4EBFD;
}
.tableOff{
  background-color: #F6F7FC;
}
.tableOff:hover{
  background-color: #D4EBFD;
}
.tableItem{
  width: 25%;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
}
.customCharts{
  width: 100%;
  height: 258px;
  display: flex;
  justify-content: space-around;
}
.grade{
  display: flex;
  align-items: flex-end;
}
.customBar{
  height: 50px;
  width: 40px;
  margin: 0 auto 18px;
}
.customType{
  font-size: 20px;
  font-weight: 400;
}
.twentySix{
  font-weight: 400;
  font-size: 24px;
}
.gradeLeft{
  text-align: center;
}
.gradeRight{
  width: 73px;
}
.gradeTop{
  border-bottom: 1px solid #C0C0C0;
  font-size: 18px;
  text-align: center;
  padding-bottom: 5px;
}
.gradeRight{
  margin-bottom: 55px;
}
.gradeBottom{
  font-size: 20px;
  text-align: center;
  font-weight: 400;
}

</style>
