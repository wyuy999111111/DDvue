<template>
  <div id="personnelInformation">
    <PointerTitle class="pointerTitle" params="人员信息" />
    <div class="titleBgp">销售队伍概况</div>
    <div class="personCards">
      <PersonCardBig :params="paramsa" />
      <PersonCardBig :params="paramsb" />
      <PersonCard :params="paramsc" />
      <PersonCard :params="paramsd" />
      <PersonCard :params="paramse" />
      <PersonCard
        :params="paramsf"
        v-if="$store.state.findRole.channelResult !== 'C0000017'"
      />
      <PersonCard
        :params="paramsg"
        v-if="$store.state.findRole.channelResult !== 'C0000017'"
      />
      <PersonCard
        :params="paramsh"
        v-if="$store.state.findRole.channelResult !== 'C0000017'"
      />
      <PersonCard
        :params="paramsi"
        v-if="$store.state.findRole.channelResult !== 'C0000017'"
      />
      <PersonCard :params="paramsj" />

      <PersonCard
        :params="paramsl"
        v-if="$store.state.findRole.channelResult === 'C0000017'"
      />
      <PersonCard
        :params="paramsm"
        v-if="$store.state.findRole.channelResult === 'C0000017'"
      />
      <PersonCard
        :params="paramsn"
        v-if="$store.state.findRole.channelResult === 'C0000017'"
      />
      <PersonCard
        :params="paramsg"
        v-if="$store.state.findRole.channelResult === 'C0000017'"
      />
      <PersonCard
        :params="paramsk"
        v-if="$store.state.findRole.channelResult === 'C0000017'"
      />
    </div>
    <div class="titleBgp">队伍健康度</div>
    <div class="healthy">
      <div class="healthyChilda">
        <el-row>
          <el-col :span="12">
            <PersonHealthyTopB style="margin-left:0px" :params="healthyParamsA" />
          </el-col>
          <el-col :span="12"
            ><PersonHealthyTopB :params="healthyParamsB"
          /></el-col>
        </el-row>
        <PersonHealthyTopC
          :params="healthyParamsC"
          class="marginTop"
          :status="status"
        />
        <PersonHealthyTopD :params="healthyParamsD" class="marginTop" />
        <PersonHealthyTopC :params="healthyParamsE" :status="status" />
        <PersonHealthyTopD :params="healthyParamsF" />
      </div>
      <div class="healthyChildb">
        <div class="cardA">
          <img src="../../assets/logo/sign.png" class="sign" />
          <div class="cardTitleTop">大地责任状已签订人数</div>
          <div class="cardTitleNum">{{ dataSourse.signRespNum }}</div>
          <img src="../../assets/logo/signOut.png" class="sign signOut" />
          <div class="cardTitleTop">大地责任状未签订人数</div>
          <div class="cardTitleNum">{{ dataSourse.unsigRespNum }}</div>
        </div>
        <div class="cardB">
          <img src="../../assets/logo/triangleBlue.png" class="triangleBlue" />
          <span class="cprTitle">CPR</span>
          <div class="CPR">
            <img src="../../assets/logo/CPR.png" />
            <span class="cprNum">{{ dataSourse.cpr }}%</span>
          </div>
          <div class="trend trendTop">
            <div class="trendA">
              <div class="trendText">比上月</div>
              <img
                class="imgS"
                v-if="dataSourse.cprlastMonthFalg === 'RISE'"
                src="../../assets/logo/up.png"
              />
              <img
                class="imgS"
                v-if="dataSourse.cprlastMonthFalg === 'DECLINE'"
                src="../../assets/logo/down.png"
              />
              <img
                class="imgB"
                v-if="dataSourse.cprlastMonthFalg === 'EQULE'"
                src="../../assets/logo/hx.png"
              />
            </div>
            <div class="trendNum">
              <div class="trendP" v-if="dataSourse.cprlastMonth != -1">
                {{ dataSourse.cprlastMonth }}
              </div>
            </div>
          </div>
          <div class="trend">
            <div class="trendA">
              <div class="trendText">比年初</div>
              <img
                class="imgS"
                v-if="dataSourse.cprbeginYearFalg === 'RISE'"
                src="../../assets/logo/up.png"
              />
              <img
                class="imgS"
                v-if="dataSourse.cprbeginYearFalg === 'DECLINE'"
                src="../../assets/logo/down.png"
              />
              <img
                class="imgB"
                v-if="dataSourse.cprbeginYearFalg === 'EQULE'"
                src="../../assets/logo/hx.png"
              />
            </div>
            <div class="trendNum">
              <div v-if="dataSourse.cprbeginYear != -1">
                {{ dataSourse.cprbeginYear }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PointerTitle from "../../common/pointerTitle";
import PersonCardBig from "../../common/personCardBig";
import PersonCard from "../../common/personCard";
import PersonHealthyTop from "../../common/personHealthyTop";
import PersonHealthyTopB from "../../common/personHealthyTopB";
import PersonHealthyTopC from "../../common/personHealthyTopC";
import PersonHealthyTopD from "../../common/personHealthyTopD";
import headlthImgA from "../../assets/logo/healthya.png";
import headlthImgB from "../../assets/logo/healthyb.png";
import { PersonnelInformation } from "@/api/portrait";
export default {
  components: {
    PointerTitle,
    PersonCardBig,
    PersonCard,
    PersonHealthyTop,
    PersonHealthyTopB,
    PersonHealthyTopC,
    PersonHealthyTopD,
    headlthImgA
  },
  data() {
    return {
      status: false,
      dataSourse: "",
      healthyParamsA: {
        img: headlthImgA,
        titleA: "高产能人数",
        numA: "1611",
        leftTypeA: "RISE",
        leftTypeB: "DECLINE",
        leftTextA: "比上月",
        leftTextB: "比年初",
        leftNumA: "60",
        leftNumB: "16",
        proportion: "43",
        proportionText: "高产能人员占比",
        rightTexta: "比上月",
        rightNuma: "60",
        rightTypea: "RISE",
        rightTextb: "比年初",
        rightNumb: "16",
        rightTypeb: "EQULE",
      },
      healthyParamsB: {
        img: headlthImgB,
        titleA: "低产能人数",
        numA: "1611",
        leftTypeA: "RISE",
        leftTypeB: "DECLINE",
        leftTextA: "比上月",
        leftTextB: "比年初",
        leftNumA: "60",
        leftNumB: "16",
        proportion: "43",
        proportionText: "低产能人员占比",
        rightTexta: "比上月",
        rightNuma: "60",
        rightTypea: "RISE",
        rightTextb: "比年初",
        rightNumb: "16",
        rightTypeb: "EQULE",
      },
      healthyParamsC: {
        title: "高定人数占比",
        num: "57",
        typeTexta: "比上月",
        typeTextb: "比同期",
        typea: "RISE",
        typeb: "DECLINE",
        numa: "60",
        numb: "16",
        color: ["#E6E6E6", "#76CCFF"],
      },
      healthyParamsD: {
        title: "入司一年以上存量人员人均产能",
        num: "1685",
        typeTexta: "比上月",
        typeTextb: "比年初",
        typea: "DECLINE",
        typeb: "RISE",
        numa: "60",
        numb: "16",
      },
      healthyParamsE: {
        title: "低定人数占比",
        num: "43",
        typeTexta: "比上月",
        typeTextb: "比同期",
        typea: "RISE",
        typeb: "RISE",
        numa: "60",
        numb: "16",
        color: ["#E6E6E6", "#ABDE99"],
      },
      healthyParamsF: {
        title: "入司未满一年存量人员人均产能",
        num: "1085",
        typeTexta: "比上月",
        typeTextb: "比年初",
        typea: "DECLINE",
        typeb: "RISE",
        numa: "32",
        numb: "21",
      },
      paramsa: {
        titleLeft: "队伍人数总数",
        titleRight: "新增人数",
        numLeft: "7393",
        numRight: "913",
        numLeftTitlea: "比上月",
        numLeftTitleb: "比年初",
        numRightTitlea: "比上月",
        numRightTitleb: "比同期",
        numLeftTypea: "RISE",
        numLeftTypeb: "DECLINE",
        numRightTypea: "RISE",
        numRightTypeb: "DECLINE",
        numLefta: "60",
        numLeftb: "16",
        numRighta: "14",
        numRightb: "11",
      },
      paramsb: {
        titleLeft: "团队数",
        titleRight: "新增团队",
        numLeft: "2622",
        numRight: "161",
        numLeftTitlea: "比上月",
        numLeftTitleb: "比年初",
        numRightTitlea: "比上月",
        numRightTitleb: "比同期",
        numLeftTypea: "RISE",
        numLeftTypeb: "DECLINE",
        numRightTypea: "RISE",
        numRightTypeb: "RISE",
        numLefta: "81",
        numLeftb: "26",
        numRighta: "53",
        numRightb: "11",
      },
      paramsc: {
        title: "转入人数 (选择渠道后显示)",
        titleTwo: "转入人数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsd: {
        title: "转出人数 (选择渠道后显示)",
        titleTwo: "转出人数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramse: {
        title: "离职人数",
        titleTwo: "离职人数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsf: {
        title: "入团率",
        titleTwo: "入团率",
        num: "642",
        typea: "比上月",
        typeb: "比年初",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsg: {
        title: "渠道总监数",
        titleTwo: "渠道总监数",
        num: "642",
        typea: "比上月",
        typeb: "比年初",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsh: {
        title: "业务部总监数",
        titleTwo: "业务部总监数",
        num: "642",
        typea: "比上月",
        typeb: "比年初",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsi: {
        title: "渠道经理A/B数",
        titleTwo: "渠道经理A/B数",
        num: "642",
        typea: "比上月",
        typeb: "比年初",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsj: {
        title: "专员/渠道助理数",
        titleTwo: "专员/渠道助理数",
        num: "642",
        typea: "比上月",
        typeb: "比年初",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsk: {
        title: "维护客户经理数",
        titleTwo: "维护客户经理数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsl: {
        title: "拓展客户经理数",
        titleTwo: "拓展客户经理数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
      paramsm: {
        title: "渠道经理数",
        titleTwo: "渠道经理数",
        num: "642",
        typea: "比上月",
        typeb: "比同期",
        numa: "31",
        numb: "11",
        numTypea: "RISE",
        numTypeb: "DECLINE",
      },
    };
  },
  mounted: () => {},
  watch: {
    "$store.state.role.state"() {
      this.getData();
    },
  },
  created() {
    // this.getData()
  },
  computed: {},
  methods: {
    getData() {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption,
      };
      PersonnelInformation(params).then((res) => {
        this.status = !this.status;
        const data = res.data.data;
        this.dataSourse = res.data.data;
        this.paramsa.numLeft = data.dmAllsalesonempnum;
        this.paramsa.numLefta = data.dmAllsalesonempLastMonth;
        this.paramsa.numLeftb = data.dmAllsalesonempBeginYear;
        this.paramsa.numRight = data.dmpartinnum;
        this.paramsa.numRighta = data.dmpartinnumLastMonth;
        this.paramsa.numRightb = data.dmpartinnumSamePeriod;
        this.paramsa.numLeftTypea = data.dmAllsalesonempLastMonthFlag;
        this.paramsa.numLeftTypeb = data.dmAllsalesonempBeginYearFalg;
        this.paramsa.numRightTypea = data.dmpartinnumLastMonthFalg;
        this.paramsa.numRightTypeb = data.dmpartinnumSamePeriodFalg;

        this.paramsb.numLeft = data.dmTeamNum;
        this.paramsb.numLefta = data.dmTeamNumLastMonth;
        this.paramsb.numLeftb = data.dmTeamNumBeginYear;
        this.paramsb.numRight = data.dmAddteamNum;
        this.paramsb.numRighta = data.dmAddteamNumLastMonth;
        this.paramsb.numRightb = data.dmAddteamNumSamePeriod;
        this.paramsb.numLeftTypea = data.dmTeamNumLastMonthFalg;
        this.paramsb.numLeftTypeb = data.dmTeamNumBeginYearFalg;
        this.paramsb.numRightTypea = data.dmAddteamNumLastMonthFalg;
        this.paramsb.numRightTypeb = data.dmAddteamNumSamePeriodFalg;

        this.paramsc.num = data.dmInchannelNum;
        this.paramsc.numa = data.dmInchannelNumLastMonth;
        this.paramsc.numb = data.dmInchannelNumSamePeriod;
        this.paramsc.numTypea = data.dmInchannelNumLastMonthFalg;
        this.paramsc.numTypeb = data.dmInchannelNumSamePeriodFalg;

        this.paramsd.num = data.dmOutchannelNum;
        this.paramsd.numa = data.dmOutchannelNumLastMonth;
        this.paramsd.numb = data.dmOutchannelNumSamePeriod;
        this.paramsd.numTypea = data.dmOutchannelNumLastMonthFalg;
        this.paramsd.numTypeb = data.dmOutchannelNumSamePeriodFalg;

        this.paramse.num = data.dmDimissionNum;
        this.paramse.numa = data.dmDimissionNumLastMonth;
        this.paramse.numb = data.dmDimissionNumSamePeriod;
        this.paramse.numTypea = data.dmDimissionNumLastMonthFalg;
        this.paramse.numTypeb = data.dmDimissionNumSamePeriodFalg;

        this.paramsf.num = data.enrollmentRate + "%";
        this.paramsf.numa = data.enrollmentRateMonth;
        this.paramsf.numb = data.enrollmentRateBeginYear;
        this.paramsf.numTypea = data.enrollmentRateMonthFalg;
        this.paramsf.numTypeb = data.enrollmentRateBeginYearFalg;

        this.paramsg.num = data.dmChaDirNum;
        this.paramsg.numa = data.dmChaDirNumLastMonth;
        this.paramsg.numb = data.dmChaDirNumBeginYear;
        this.paramsg.numTypea = data.dmChaDirNumLastMonthFalg;
        this.paramsg.numTypeb = data.dmChaDirNumBeginYearFalg;

        this.paramsh.num = data.dmBusiDirectorNum;
        this.paramsh.numa = data.dmBusiDirectorNumLastMonth;
        this.paramsh.numb = data.dmBusiDirectorNumBeginYear;
        this.paramsh.numTypea = data.dmBusiDirectorNumLastMonthFalg;
        this.paramsh.numTypeb = data.dmBusiDirectorNumBeginYearFalg;

        this.paramsi.num = data.dmMnaNum;
        this.paramsi.numa = data.dmMnaNumlastMonth;
        this.paramsi.numb = data.dmMnaNumBeginYear;
        this.paramsi.numTypea = data.dmMnaNumlastMonthFalg;
        this.paramsi.numTypeb = data.dmMnaNumBeginYearFalg;

        this.paramsj.num = data.dmAidNum;
        this.paramsj.numa = data.dmAidNumlastMonth;
        this.paramsj.numb = data.dmAidNumBeginYear;
        this.paramsj.numTypea = data.dmAidNumlastMonthFalg;
        this.paramsj.numTypeb = data.dmAidNumBeginYearFalg;

        this.paramsk.num = data.saveManagerNum;
        this.paramsk.numa = data.saveManagerNumLastMonth;
        this.paramsk.numb = data.saveManagerNumSamePeriod;
        this.paramsk.numTypea = data.saveManagerNumLastMonthFalg;
        this.paramsk.numTypeb = data.saveManagerNumSamePeriodFalg;

        this.paramsl.num = data.expManagerNum;
        this.paramsl.numa = data.expManagerNumLastMonth;
        this.paramsl.numb = data.expManagerNumSamePeriod;
        this.paramsl.numTypea = data.expManagerNumLastMonthFalg;
        this.paramsl.numTypeb = data.expManagerNumSamePeriodFalg;

        this.paramsm.num = data.chlManagerNum;
        this.paramsm.numa = data.chlManagerNumLastMonth;
        this.paramsm.numb = data.chlManagerNumSamePeriod;
        this.paramsm.numTypea = data.chlManagerNumLastMonthFalg;
        this.paramsm.numTypeb = data.chlManagerNumSamePeriodFalg;

        this.healthyParamsA.numA = data.highCapacityNum;
        this.healthyParamsA.leftNumA = data.highCapacityNumlastMonth;
        this.healthyParamsA.leftNumB = data.highCapacityNumBeginYear;
        this.healthyParamsA.proportion = data.highCapacityPropor;
        this.healthyParamsA.rightNuma = data.highCapacityProporlastMonth;
        this.healthyParamsA.rightNumb = data.highCapacityProporBeginYear;
        this.healthyParamsA.leftTypeA = data.highCapacityNumlastMonthFalg;
        this.healthyParamsA.leftTypeB = data.highCapacityNumBeginYearFalg;
        this.healthyParamsA.rightTypea = data.highCapacityProporlastMonthFalg;
        this.healthyParamsA.rightTypeb = data.highCapacityProporBeginYearFalg;

        this.healthyParamsB.numA = data.dmLowCapacityNum;
        this.healthyParamsB.leftNumA = data.dmLowCapacityNumlastMonth;
        this.healthyParamsB.leftNumB = data.dmLowCapacityNumBeginYear;
        this.healthyParamsB.proportion = data.dmLowCapacityPropor;
        this.healthyParamsB.rightNuma = data.dmLowCapacityProporlastMonth;
        this.healthyParamsB.rightNumb = data.dmLowCapacityProporBeginYear;
        this.healthyParamsB.leftTypeA = data.dmLowCapacityNumlastMonthFalg;
        this.healthyParamsB.leftTypeB = data.dmLowCapacityNumBeginYearFalg;
        this.healthyParamsB.rightTypea = data.dmLowCapacityProporlastMonthFalg;
        this.healthyParamsB.rightTypeb = data.dmLowCapacityProporBeginYearFalg;

        this.healthyParamsC.num = data.lmHighjugHalesPro;
        this.healthyParamsC.numa = data.lmHighjugHalesProlastMonth;
        this.healthyParamsC.numb = data.lmHighjugHalesProSamePeriod;
        this.healthyParamsC.typea = data.lmHighjugHalesProlastMonthFalg;
        this.healthyParamsC.typeb = data.lmHighjugHalesProSamePeriodFalg;

        this.healthyParamsE.num = data.lmLowJugPro;
        this.healthyParamsE.numa = data.lmLowJugProlastMonth;
        this.healthyParamsE.numb = data.lmLowJugProSamePeriod;
        this.healthyParamsE.typea = data.lmLowJugProlastMonthFalg;
        this.healthyParamsE.typeb = data.lmLowJugProSamePeriodFalg;

        this.healthyParamsD.num = data.dmSengt1PerCapitaCapacity;
        this.healthyParamsD.numa = data.dmSengt1PerCapitaCapacitylastMonth;
        this.healthyParamsD.numb = data.dmSengt1PerCapitaCapacityBeginYear;
        this.healthyParamsD.typea = data.dmSengt1PerCapitaCapacitylastMonthFalg;
        this.healthyParamsD.typeb = data.dmSengt1PerCapitaCapacityBeginYearFalg;

        this.healthyParamsF.num = data.dmSenlt1PerCapitaCapacity;
        this.healthyParamsF.numa = data.dmSenlt1PerCapitaCapacitylastMonth;
        this.healthyParamsF.numb = data.dmSenlt1PerCapitaCapacityBeginYear;
        this.healthyParamsF.typea = data.dmSenlt1PerCapitaCapacitylastMonthFalg;
        this.healthyParamsF.typeb = data.dmSenlt1PerCapitaCapacityBeginYearFalg;
      });
    },
  },
};
</script>
<style lang="less" scoped>
#personnelInformation {
  width: 100%;
  background: white;
  height: 100%;
  padding-top: 41px;
}
.pointerTitle {
  margin-left: 27px;
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
  margin-top: 47px;
  margin-bottom: 58px;
}
.personCards {
  padding: 0 32px;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.personCards div {
  margin: 12px 15px;
}
.personCards #personCard {
  margin: 12px 18.9px;
}
.healthy {
  display: flex;
}
.healthyChilda {
  display: flex;
  width: 1153px;
  margin-left: 108px;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.cardA {
  width: 352px;
  height: 652px;
  background: #f6f7fc;
  border-radius: 5px;
}
.sign {
  width: 102px;
  height: 110px;
  margin-top: 47px;
  margin-left: 121px;
}
.cardTitleTop {
  margin: auto;
  width: 100%;
  text-align: center;
  height: 20px;
  font-size: 20px;
  font-weight: 400;
  margin-top: 41px;
}
.cardTitleNum {
  width: 100%;
  text-align: center;
  margin-top: 37px;
  font-size: 25px;
  font-weight: 400;
}
.signOut {
  margin-top: 72px;
}
.cardB {
  width: 352px;
  height: 330px;
  background: #f6f7fc;
  border-radius: 5px;
  margin-top: 21px;
  margin-bottom: 69px;
}
.triangleBlue {
  padding-top: 32px;
  padding-left: 32px;
}
.CPR {
  margin-top: 67px;
  margin-left: 87px;
}
.CPR img {
  width: 50px;
  height: 40px;
}
.cprNum {
  padding-left: 40px;
  font-size: 32px;
  font-weight: 400;
}
.trend {
  display: flex;
  // justify-content: center;
  font-weight: 400;
  // align-items: center;
  width: 352px;
}
.trendA {
  display: flex;
  font-weight: 400;
  align-items: center;
  width: 182px;
  height: 28px;
  margin-left: 50px;
}
.trendTop {
  margin-top: 48px;
  margin-bottom: 24px;
}
.trend img {
  padding: 0 53px 0 23px;
}
.trendText {
  font-size: 16px;
  margin-right: 30px;
}
.trendNum {
  font-size: 24px;
}
.marginTop {
  margin-top: 60px;
}
.cprTitle {
  font-size: 20px;
  padding-left: 32px;
}
.healthyChildb {
  margin-left: 65px;
}
.imgS {
  width: 18px;
  height: 28px;
}
.imgB {
  width: 25px;
  height: 4px;
}
</style>
