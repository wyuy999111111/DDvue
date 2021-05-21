<template>
  <div id="overView">
    <div class="negative">
      <PointerTitle params='总览' class="PointerTitle" />
      <div class="flex">
        <div class="sixFlex">
          <div class="headMan">
            <img class="headManImg" src="../../assets/logo/headMan.png" />
            <span class="bold boldAll">销售员总数</span><span class="twentySpan bold"><span style="fontSize:30px">{{ dataSourse.dm_allsales_onempnum | fixNumber }}</span>人</span>
            <div class="percentage">
              <div class="percentageGraphical flex">
                <div class="center"><img src="../../assets/logo/man.png" /><div class='centerDetail'>男</div></div>
                <div class="progressCenter">
                  <div class="progress"><div class="progressOn" :style="{width: dataSourse.m_sales_proportion + '%'}"></div></div>
                  <div class="flex between progressNum">
                    <span style="fontSize:20px">{{dataSourse.m_sales_num | fixNumber}}</span>
                    <span style="fontSize:20px">{{dataSourse.f_sales_num | fixNumber}}</span>
                  </div>
                </div>
                <div class="center"><img src="../../assets/logo/woman.png" /><div class='centerDetail'>女</div></div>
              </div>
            </div>
          </div>
          <div class="pieCharts">
            <div class="pieChart">
              <StarTitle params='产能占比' />
              <NewB :params="paramsC1" :status='status' />
            </div>
            <div class="pieChart">
              <StarTitle params='年龄分布' />
              <NewB :params="paramsC2" :status='status' />
            </div>
            <div class="pieChart">
              <StarTitle params='司龄分布' />
              <NewB :params="paramsC3" :status='status' />
            </div>
          </div>
        </div>
        <div class="fourFlex">
          <div class="titleBgp">上月考核情况</div>
          <!-- <BottonWhite class="bottonWhite" params='上月考核情况' /> -->
          <div class="overViewCardTop overViewCard">
            <span class="cardTopSpan">升级</span>
            <div class="cardTop">
              <span class="cardTopNum">{{dataSourse.uprank_num | fixNumber}} 人</span>
              <div class="flex between cardTopText"><span>占比</span><span class="gdNum">{{dataSourse.uprank_proportion}}%</span></div>
            </div>
          </div>
          <div class="overViewCardCenter overViewCard">
            <span class="cardTopSpan">保级</span>
            <div class="cardTop">
              <span class="cardTopNum">{{dataSourse.keeprank_num | fixNumber}} 人</span>
              <div class="flex between cardTopText"><span>占比</span><span class="gdNum">{{dataSourse.keeprank_proportion}}%</span></div>
            </div>
          </div>
          <div class="overViewCardBottom overViewCard">
            <span class="cardTopSpan">降级</span>
            <div class="cardTop">
              <span class="cardTopNum">{{dataSourse.downrank_num | fixNumber}} 人</span>
              <div class="flex between cardTopText"><span>占比</span><span class="gdNum">{{dataSourse.downrank_proportion}}%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lineBarChartCards">
      <LineBarChartCard class="lineBarChartCard" :params='params1' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params2' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params3' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params4' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params5' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params6' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params7' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params8' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params9' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params10' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params11' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params12' :status='status' />
      <LineBarChartCard class="lineBarChartCard" :params='params13' :status='status' />
    </div>
  </div>
</template>
<script>

import PointerTitle from '../../common/pointerTitle'
import StarTitle from '../../common/starTitle'
import NewB from '../charts/newCircle'
import LineBarChartCard from '../charts/lineBarChartCard'
import {
  SecondcompanyRoleshow
} from '@/api/portrait'
export default {
  components: {
    PointerTitle, StarTitle, NewB, LineBarChartCard
  },
  props: ['overViewStatus'],
  data () {
    return {
      status: true,
      dataSourse: '',
      paramsC1: [{
        groupSwarmsList: [{
          value: '1',
          namee: '456',
          count: '123',
          groupName: '高产能',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '中产能',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '低产能',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '极低产能',
          groupValue: '123',
          saleCount: '456'
        }]
      }],
      paramsC2: [{
        groupSwarmsList: [{
          value: '1',
          namee: '456',
          count: '123',
          groupName: '25岁以下',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '25(含) -35岁',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '35(含) -45岁',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '45(含) -55岁',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '55 (含)岁以上',
          groupValue: '123',
          saleCount: '456'
        }]
      }],
      paramsC3: [{
        groupSwarmsList: [{
          value: '1',
          namee: '456',
          count: '123',
          groupName: '入司1年以内',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '入司1-2年',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '入司2-5年',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '入司5-10年',
          groupValue: '123',
          saleCount: '456'
        }, {
          value: '1',
          namee: '456',
          count: '123',
          groupName: '入司10年以上',
          groupValue: '123',
          saleCount: '456'
        }]
      }],
      params1: {
        title: '开单率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        company: '%',
        width: '504px',
        yName: '',
        height: '301px',
        normalColor: '#61AFFF', // 折点折线的颜色
        legendData: ['开单率'],
        type: 4,
        status: true
      },
      params2: {
        title: '入职人数，入职率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '人数',
        height: '301px',
        normalColor: '#FFCD67', // 折点折线的颜色
        legendData: ['入职率', '入职人数'],
        type: 3,
        status: true
      },
      params3: {
        title: '离职人数，离职率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#A8A8A8', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '人数',
        height: '301px',
        normalColor: '#FF88A0', // 折点折线的颜色
        legendData: ['离职率', '离职人数'],
        type: 3,
        status: true
      },
      params4: {
        title: '渠道转入人数，渠道转出人数（选择渠道后展示）',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '',
        width: '504px',
        yName: '人数',
        height: '301px',
        normalColor: '#D6D6D6', // 折点折线的颜色
        legendData: ['渠道转出人数', '渠道转入人数'],
        type: 2,
        status: true
      },
      params5: {
        title: '联合销售',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#FFC95C', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '元',
        height: '301px',
        normalColor: '#4ECB73', // 折点折线的颜色
        legendData: ['出单率', '保费'],
        type: 3,
        status: true
      },
      params6: {
        title: '个人健康险',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#FFC95C', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '元',
        height: '301px',
        normalColor: '#4ECB73', // 折点折线的颜色
        legendData: ['出单率', '保费'],
        type: 3,
        status: true
      },
      params7: {
        title: '高绩优人数，占比',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '人数',
        height: '301px',
        normalColor: '#FF88A0', // 折点折线的颜色
        legendData: ['占比', '高绩效人数'],
        type: 3,
        status: true
      },
      params8: {
        title: '低产能人数， 占比',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '',
        companyR: '%',
        width: '504px',
        yName: '人数',
        height: '301px',
        normalColor: '#FF88A0', // 折点折线的颜色
        legendData: ['占比', '低产能人数'],
        type: 3,
        status: true
      },
      params9: {
        title: 'CPR',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#4ECB73', // 柱状图颜色
        company: '%',
        width: '504px',
        yName: '',
        height: '301px',
        normalColor: '#4ECB73', // 折点折线的颜色
        legendData: ['CPR'],
        type: 1,
        status: true
      },
      params10: {
        title: '人均产能',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 柱状数据
        barColor: '#6D80F5', // 柱状图颜色
        company: '',
        width: '504px',
        yName: '元',
        height: '301px',
        normalColor: '#FFC95C', // 折点折线的颜色
        legendData: ['人均产能'],
        type: 1,
        status: true
      },
      params11: {
        title: '续保率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '%',
        width: '504px',
        yName: '',
        height: '301px',
        normalColor: '#4ECB73', // 折点折线的颜色
        legendData: ['续保率'],
        type: 4,
        status: true
      },
      params12: {
        title: '月活率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '%',
        width: '504px',
        yName: '',
        height: '301px',
        normalColor: '#917BFF', // 折点折线的颜色
        legendData: ['月活率'],
        type: 4,
        status: true
      },
      params13: {
        title: '线上化绑定率',
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        xTextRight: '月份',
        lineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 折线图数据
        barColor: '#61AFFF', // 柱状图颜色
        company: '%',
        width: '504px',
        yName: '',
        height: '301px',
        normalColor: '#FFC95C', // 折点折线的颜色
        legendData: ['线上化绑定率'],
        type: 4,
        status: true
      }
    }
  },
  mounted: () => {},
  watch: {
    '$store.state.role.state' () {
      this.getData()
      console.log(this.$store.state.role.channelResult)
      if (this.$store.state.role.channelResult === '') {
        this.params4.title = '渠道转入人数，渠道转出人数（选择渠道后展示）'
      } else {
        this.params4.title = '渠道转入人数，渠道转出人数'
      }
    }
  },
  created () {
    if (this.$store.state.role.orglOption !== '') {
      // this.getData()
    }
  },
  computed: {},
  methods: {
    getData () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        level: this.$store.state.role.orglOption
      }
      SecondcompanyRoleshow(params).then((res) => {
        console.log(res)
        this.dataSourse = res.data.data
        // 产能占比
        this.paramsC1[0].groupSwarmsList[0].groupValue = res.data.data.high_capacity_num
        // this.paramsC1[0].groupSwarmsList[1].groupValue = res.data.data.mid_high_capacity_num
        this.paramsC1[0].groupSwarmsList[1].groupValue = res.data.data.mid_capacity_num
        this.paramsC1[0].groupSwarmsList[2].groupValue = res.data.data.low_capacity_num
        this.paramsC1[0].groupSwarmsList[3].groupValue = res.data.data.mid_low_capacity_num
        // 年龄分布
        this.paramsC2[0].groupSwarmsList[0].groupValue = res.data.data.agelt25_num
        this.paramsC2[0].groupSwarmsList[1].groupValue = res.data.data.age25to30_num
        this.paramsC2[0].groupSwarmsList[2].groupValue = res.data.data.age31to40_num
        this.paramsC2[0].groupSwarmsList[3].groupValue = res.data.data.age41to50_num
        this.paramsC2[0].groupSwarmsList[4].groupValue = res.data.data.agegt50_num
        // 司龄分布
        this.paramsC3[0].groupSwarmsList[0].groupValue = res.data.data.snrity_lt1_num
        this.paramsC3[0].groupSwarmsList[1].groupValue = res.data.data.snrity_lto2_num
        this.paramsC3[0].groupSwarmsList[2].groupValue = res.data.data.snrity_2to5_num
        this.paramsC3[0].groupSwarmsList[3].groupValue = res.data.data.snrity_5to10_num
        this.paramsC3[0].groupSwarmsList[4].groupValue = res.data.data.snrity_gt10_num
        // 开单率
        this.params1.lineData = res.data.data.billingRate.billingRateMonth
        // 入职
        this.params2.lineData = res.data.data.entryRate.dmPartinMonth
        this.params2.barData = res.data.data.entryRate.dmPartinNum
        // 离职
        this.params3.lineData = res.data.data.turnoverRate.dmDepartMonth
        this.params3.barData = res.data.data.turnoverRate.dmDepartNum
        // 渠道
        this.params4.barData = res.data.data.dmInAndOutNum.dmInchannelNum
        this.params4.barData2 = res.data.data.dmInAndOutNum.dmOutchannelNum
        // 联合销售
        this.params5.lineData = res.data.data.jointSales.dmCaruniteMonth
        this.params5.barData = res.data.data.jointSales.dmCarunitePrm
        // 个人健康险
        this.params6.lineData = res.data.data.healthInsurance.dmJkMonth
        this.params6.barData = res.data.data.healthInsurance.dmJkPrm
        // 高绩优人数
        this.params7.lineData = res.data.data.highPerformance.dymExcSalesMonth
        this.params7.barData = res.data.data.highPerformance.dymExcSalesNum
        // 低产能人数
        this.params8.lineData = res.data.data.lowCapacity.dmLowCapacityMonth
        this.params8.barData = res.data.data.lowCapacity.dmLowCapacityNum
        // cpr
        this.params9.barData = res.data.data.cpr.dymalary
        // 人均产能
        this.params10.barData = res.data.data.percapitacapacity.dymPrm
        // 续保率
        this.params11.lineData = res.data.data.renewalRate.renewalRate
        // 月活率
        this.params12.lineData = res.data.data.monthlySurvivalRate.monthlySurvivalRate
        // 线上化绑定率
        this.params13.lineData = res.data.data.onlineBindingRate.onlineBindingRate
        this.status = !this.status
      })
    }
  }
}
</script>
<style lang="less" scoped>
.negative{
  width: 100%;
  height: 100%;
  background: white;
  box-sizing: border-box;
  padding: 30px;
}
.flex{
  display: flex;
}
.sixFlex{
  width: 95%;
}
.fourFlex{
  width: 40%;
}
.twentySpan{
  font-size: 20px;
  margin-left: 50px;
}
.headMan{
  border-radius: 10px;
  background: #F6F7FC;
  display: flex;
  align-items: center;
  height: 150px;
  box-sizing: border-box;
  padding: 0 40px;
  z-index: 3;
  position: relative;
}
.headManImg {
  margin-right: 50px;
}
// .bold{
//   // font-weight: bold;
// }
.percentage{
  margin-left: 220px;
  position: absolute;
  left: 394px;
}
.percentageGraphical{
  display: flex;
  justify-content: space-around;
  position: relative;
  top: 8px;
}
.percentageGraphical img{
  width: 25px;
}
.progress{
  width: 450px;
  background: #FF999A;
  margin: 0 20px;
  height: 30px;
}
.progressOn{
  background: #76CCFF;
  height: 100%;
}
.center{
  text-align: center;
}
.between{
  justify-content: space-between;
  font-size: 12px;
}
.progressNum{
  padding: 0 30px;
}
.center img {
  margin-bottom: 4px;
}
.PointerTitle{
  margin-bottom: 20px;
}
.pieCharts{
  display: flex;
  border: 2px solid #E9E9E9;
  border-radius: 5px;
  width: 1224px;
  height: 382px;
  justify-content: space-around;
  margin-top: -15px;
}
.pieChart{
  // width: 404px;
  margin-top: 45px;
  padding-bottom: 23px;
}
.titleBgp{
  font-size: 20px;
  width: 213px;
  height: 38px;
  margin-left: 46px;
  background: url('../../assets/logo/titleBgp.png');
  background-size: 100% 100%;
  padding-left: 41px;
  display: flex;
  align-items: center;
}
.overViewCard{
  width: 429px;
  height: 141px;
  margin: auto;
  margin-top: 20px;
  display: flex;
}
.overViewCardTop{
  background: url('../../assets/logo/rise.png');
  background-size: 100% 100%;
}
.overViewCardCenter{
  background: url('../../assets/logo/flat.png');
  background-size: 100% 100%;
}
.overViewCardBottom{
  background: url('../../assets/logo/drop.png');
  background-size: 100% 100%;
}
.spaceAround{
  justify-content: space-around;
}
.cardTopSpan{
  margin-left: 126px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 24px;
}
.cardTop{
  margin-left: 86px;
  padding-top: 20px;
}
.cardTopNum{
  font-size: 30px;
}
.cardTopText span{
  font-size: 20px;
  margin-top: 20px;
}
.lineBarChartCard{
  width: 562px;
  height: 422px;
  background: white;
  border-radius: 5px;
  margin-left: 28px;
}
.lineBarChartCards{
  display: flex;
  flex-wrap: wrap;
}
.boldAll{
  font-size: 20px;
  font-weight: 400;
}
.centerDetail{
  font-size: 16px;
}
.gdNum{
  width: 100px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
