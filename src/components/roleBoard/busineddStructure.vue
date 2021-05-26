<template>
  <div class="business" id="business">
    <PointerTitle params="业务结构" class="PointerTitle" />
    <!-- <div class="business_t">业务结构</div> -->
    <div class="flex">
      <div class="left">
        <div class="card">
          <ButtonBlue params="出单产品结构" style="margintop: 10px" />
          <div class="productMix" ref="productMix"></div>
          <div class="productMixDetail flex">
            <div class="detailLeft">
              <div class="detailCor">
                <div class="colorblue"></div>
                车险
              </div>
              <div class="detailCor">
                <div class="colordBlue"></div>
                财产险
              </div>
              <div class="detailCor">
                <div class="colorgreen"></div>
                健康险
              </div>
              <div class="detailCor">
                <div class="colororange"></div>
                意外险
              </div>
            </div>
            <div class="detailRight">
              <div class="rTop">
                <div class="rate">
                  <p>占比</p>
                </div>
                <div class="singleOut">
                  <p>出单量</p>
                </div>
              </div>
              <div class="detailList">
                <div class="detailList_a">
                  <div class="detailNum">
                    <span>{{ this.list.dy_car_prm0 | fixNumber }}%</span>
                  </div>
                  <div class="detailNum">
                    <span>{{ this.list.dy_e_prm0 | fixNumber }}%</span>
                  </div>
                  <div class="detailNum">
                    <span>{{ this.list.dy_prop_prm0 | fixNumber }}%</span>
                  </div>
                  <div class="detailNum">
                    <span>{{ this.list.dy_jk_prm0 | fixNumber }}%</span>
                  </div>
                </div>
                <div class="detailList_b">
                  <div class="detailNumber">
                    <span>{{ this.list.dy_car_polnum | fixNumber }}单</span>
                  </div>
                  <div class="detailNumber">
                    <span>{{ this.list.dy_e_polnum | fixNumber }}单</span>
                  </div>
                  <div class="detailNumber">
                    <span>{{ this.list.dy_prop_polnum | fixNumber }}单</span>
                  </div>
                  <div class="detailNumber">
                    <span>{{ this.list.dy_jk_polnum | fixNumber }}单</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card_a">
          <!-- <ButtonBlue params='个人与团体保费' style="marginTop: 10px" /> -->
          <p>个人与团体保费</p>
          <div class="proportion">
            <i class="el-icon-a-goods" />
            <div class="progress">
              <div
                class="progressOn"
                :style="{
                  width:
                    (this.list.dy_pers_prm /
                      (this.list.dy_pers_prm + this.list.dy_org_prm)) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
            <i class="el-icon-b-goods" />
          </div>
          <div class="spanceBetween"><span>个人</span><span>团体</span></div>
          <div class="spanceBetween">
            <span>{{ this.list.dy_pers_prm | fixNumber }}元</span
            ><span>{{ this.list.dy_org_prm | fixNumber }}元</span>
          </div>
        </div>
        <div class="card_a margin">
          <!-- <ButtonWhite params='法人与非法人保费' style="marginTop: 10px" /> -->
          <p>法人与非法人保费</p>
          <div class="proportion">
            <i class="el-icon-c-goods" />
            <div class="progress">
              <div
                class="progressOn"
                :style="{
                  width:
                    (this.list.dy_legal_prm /
                      (this.list.dy_legal_prm + this.list.dy_unlegal_prm)) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
            <i class="el-icon-d-goods" />
          </div>
          <div class="spanceBetween"><span>法人</span><span>非法人</span></div>
          <div class="spanceBetween">
            <span>{{ this.list.dy_legal_prm | fixNumber }}元</span
            ><span>{{ this.list.dy_unlegal_prm | fixNumber }}元</span>
          </div>
        </div>
        <div class="card_b">
          <div class="flex">
            <div class="orange"></div>
            从单渠道的业务分布
          </div>
          <div
            class="productMixR"
            ref="productMixR2"
            style="width: 220px; height: 220px; margin: auto"
          ></div>
          <div class="productMixDetail_t flex" style="margin: 126px 0 0 30px">
            <div class="detailLeft_t">
              <div class="detailCor_t">
                <div class="colorcBlue_t"></div>
                电商渠道
              </div>
              <div class="detailCor_t">
                <div class="colordBlue_t"></div>
                银行渠道
              </div>
              <div class="detailCor_t">
                <div class="colorred_t"></div>
                车商渠道
              </div>
              <div class="detailCor_t">
                <div class="colororange_t"></div>
                综合渠道
              </div>
              <div class="detailCor_t">
                <div class="colorgreen_t"></div>
                直团渠道
              </div>
              <div class="detailCor_t">
                <div class="colorblue_t"></div>
                寿险代理
              </div>
              <div class="detailCor_t">
                <div class="colorblue_q"></div>
                保代渠道
              </div>
              <div class="detailCor_t">
                <div class="colorblue_q"></div>
                重客渠道
              </div>
            </div>
            <div class="detailRight_t">
              <el-button>保费收入</el-button>
              <div class="detailList_t">
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_biz_hc_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_nonbiz_hc_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_biz_kc_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_nonbiz_kc_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_cerv_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.dy_fmcar_prm | fixNumber }}元</span
                  >
                </div>
                <div class="detailNum_t">
                  <span align="right"
                    >{{ this.list.otherCarPrm | fixNumber }}元</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="flex alignCenter">
          <ButtonWhite params="车险车种结构" style="margintop: 14px" />
          <div class="title">
            <div class="titleCon">
              <span class="titleKey">车险总保费</span
              ><span class="titleValue"
                >{{ this.list.dy_car_prm | fixNumber }}元</span
              >
            </div>
          </div>
        </div>
        <div class="flex rightSec">
          <div class="flex echartsR">
            <div
              class="productMixR"
              ref="productMixR"
              style="width: 220px; height: 220px; margin: auto"
            ></div>
            <div class="productMixDetail_t flex">
              <div class="detailLeft_t">
                <div class="detailCor_t">
                  <div class="colorcBlue_t"></div>
                  营业货车
                </div>
                <div class="detailCor_t">
                  <div class="colordBlue_t"></div>
                  非营业货车
                </div>
                <div class="detailCor_t">
                  <div class="colorred_t"></div>
                  营业客车
                </div>
                <div class="detailCor_t">
                  <div class="colororange_t"></div>
                  非营业客车
                </div>
                <div class="detailCor_t">
                  <div class="colorgreen_t"></div>
                  特种车
                </div>
                <div class="detailCor_t">
                  <div class="colorblue_t"></div>
                  家庭自用车
                </div>
                <div class="detailCor_t">
                  <div class="colorblue_q"></div>
                  拖拉机
                </div>
                <div class="detailCor_t">
                  <div class="colorpink_q"></div>
                  摩托车
                </div>
              </div>
              <div class="detailRight_t">
                <el-button>保费收入</el-button>
                <div class="detailList_t">
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_biz_hc_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_nonbiz_hc_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_biz_kc_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_nonbiz_kc_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_cerv_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_fmcar_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_tractor_prm | fixNumber }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{ this.list.dy_motor_prm | fixNumber }}元</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pieCharts">
            <div class="pieChartT" ref="pieChartT"></div>
            <div class="pieChartB" ref="pieChartB"></div>
          </div>
        </div>
        <div class="right_a">
          <el-row>
            <el-col :span="8">
              <el-row>
                <el-col :span="5">
                  <img src="../../assets/logo/客车.png" alt="" />
                </el-col>
                <el-col :span="19">
                  <ButtonWhite style="margin-top: 13px" params="营业客车结构" />
                </el-col>
              </el-row>
              <div class="roundChart" ref="roundChartc"></div>
              <div class="productMixDetail_t flex">
                <div class="detailLeft_t">
                  <div class="detailCor_t">
                    <div class="colorgreen_b"></div>
                    公路客运
                  </div>
                  <div class="detailCor_t">
                    <div class="colorgreen_c"></div>
                    城市公交
                  </div>
                  <div class="detailCor_t">
                    <div class="colorgreen_d"></div>
                    出租租赁
                  </div>
                  <div class="detailCor_t">
                    <div class="colorgreen_a"></div>
                    预约出租车
                  </div>
                </div>
                <div class="detailRight_t">
                  <el-button>保费收入</el-button>
                  <div class="detailList_t">
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_nonbiz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_kc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_nonbiz_kc_prm | fixNumber }}元</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="5">
                  <img src="../../assets/logo/货车.png" alt="" />
                </el-col>
                <el-col :span="19">
                  <ButtonWhite style="margin-top: 13px" params="营业货车结构" />
                </el-col>
              </el-row>
              <div class="roundChart" ref="roundChartb"></div>
              <div class="productMixDetail_t flex">
                <div class="detailLeft_t">
                  <div class="detailCor_t">
                    <div class="colorblue_c"></div>
                    2吨以下
                  </div>
                  <div class="detailCor_t">
                    <div class="colorblue_b"></div>
                    2-10吨以下
                  </div>
                  <div class="detailCor_t">
                    <div class="colorblue_a"></div>
                    10吨以上
                  </div>
                </div>
                <div class="detailRight_t">
                  <el-button>保费收入</el-button>
                  <div class="detailList_t">
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_nonbiz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_kc_prm | fixNumber }}元</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="5">
                  <img src="../../assets/logo/特种车.png" alt="" />
                </el-col>
                <el-col :span="19">
                  <ButtonWhite style="margin-top: 13px" params="特种车结构" />
                </el-col>
              </el-row>
              <div class="roundChart" ref="roundCharta"></div>
              <div class="productMixDetail_t flex">
                <div class="detailLeft_t">
                  <div class="detailCor_t">
                    <div class="colorbrown_a"></div>
                    特种车一
                  </div>
                  <div class="detailCor_t">
                    <div class="colorbrown_b"></div>
                    特种车二
                  </div>
                  <div class="detailCor_t">
                    <div class="colorbrown_c"></div>
                    特种车三
                  </div>
                  <div class="detailCor_t">
                    <div class="colorbrown_d"></div>
                    特种车四
                  </div>
                </div>
                <div class="detailRight_t">
                  <el-button>保费收入</el-button>
                  <div class="detailList_t">
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_nonbiz_hc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_biz_kc_prm | fixNumber }}元</span
                      >
                    </div>
                    <div class="detailNum_t">
                      <span align="right"
                        >{{ this.list.dy_nonbiz_kc_prm | fixNumber }}元</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="rightB">
          <div class="discountChart" ref="discountChart"></div>
          <!-- <div class="discountChartA" ref="discountChartR" v-if="this.list.dy_nocar_top10_pro_prm_money.length === 0 && this.list.dy_nocar_top10_pro_prm_name.length === 0">
          </div> -->
          <img
            src="../../assets/notData3.png"
            alt=""
            v-if="this.list.top10NUll === '2'"
          />
          <div class="text">
            <div class="yi"></div>
            非车出单产品Top10
          </div>
          <div class="show" v-if="this.list.top10NUll === '2'">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonWhite from "../../common/ButtonWhite";
import ButtonBlue from "../../common/ButtonBlue";
import giftImageUrl from "../../assets/portraitImg/车险.png";
import PointerTitle from "../../common/pointerTitle";
import { RoleshowYwjg } from "../../api/getApi";
export default {
  name: "business",
  components: {
    ButtonWhite,
    ButtonBlue,
    PointerTitle,
  },
  data() {
    return {
      list: "",
      msg: "（请选择机构与渠道后展示）",
      GetWindowInfo: {
        width: "",
      },
      xSize: 18,
    };
  },
  created() {
    window.addEventListener("resize", this.GetWindowInfo);
    this.GetWindow();
    // this.getRoleshowYwjg()
    console.log(this.$store.state.role.orglOption);
  },
  mounted() {
    // this.drowR()
    this.drowRoundCharta();
    this.drowRoundChartb();
    this.drowRoundChartc();
    this.drowProductMix();
    this.drowProductMixR();
    this.drowProductMixRT();
    this.drowPieaT();
    this.drowPieaB();
    this.drow();
    this.drowR();
  },
  watch: {
    list() {
      setTimeout(() => {
        this.drowRoundCharta();
        this.drowRoundChartb();
        this.drowRoundChartc();
        this.drowProductMix();
        this.drowProductMixR();
        this.drowProductMixRT();
        this.drowPieaT();
        this.drowPieaB();
        this.drow();
        this.drowR();
      }, 0);
    },
    "$store.state.role.state"() {
      this.getRoleshowYwjg();
      this.drowR();
      // if (this.$store.state.role.orglResult !== '' && this.$store.state.role.channelResult === '') {
      // }
    },
  },
  methods: {
    GetWindow() {
      this.GetWindowInfo.width = window.outerWidth;
      if (this.GetWindowInfo.width === 1366) {
        this.xSize = 12;
      }
      if (this.GetWindowInfo.width === 1600) {
        this.xSize = 16;
      }
      if (this.GetWindowInfo.width === 1920) {
        this.xSize = 18;
      }
    },
    getRoleshowYwjg() {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption,
      };
      RoleshowYwjg(params).then((res) => {
        this.list = res.data.data.secondcompanyRoleshowYwjg[0];
        console.log(this.$store.state.role.orglResult);
        console.log(this.list.dy_nocar_top10_pro_prm_money.length === 0);
      });
    },
    drowRoundCharta() {
      var roundChart = this.$refs.roundChartb;
      const myChart = this.$echarts.init(roundChart);
      const option = {
        color: ["#CCD3FC", "#92A5F6", "#6070FD"],
        grid: {
          top: "0px",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: (a) => {
            return a.data.name + "：" + a.data.value + "%";
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "inner",
              formatter: "{b}: {d}%",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "12",
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dy_ud2t_bizcar_prm, name: "2吨以下" },
              { value: this.list.dy_bt2to10t_bizcar_prm, name: "2-10吨以下" },
              { value: this.list.dy_gt10t_bizcar_prm, name: "10吨以上" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowRoundChartb() {
      var roundChart = this.$refs.roundCharta;
      const myChart = this.$echarts.init(roundChart);
      const option = {
        color: ["#D15D01", "#FEE2BB", "#FACA57", "#F7921B"],
        grid: {
          top: "0px",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: (a) => {
            return a.data.name + "：" + a.data.value + "%";
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "inner",
              formatter: "{b}: {d}%",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "12",
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dm_t1car_prm, name: "特种车一" },
              { value: this.list.dm_t2car_prm, name: "特种车二" },
              { value: this.list.dm_t3car_prm, name: "特种车三" },
              { value: this.list.dm_t4car_prm, name: "特种车四" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowRoundChartc() {
      var roundChart = this.$refs.roundChartc;
      const myChart = this.$echarts.init(roundChart);
      const option = {
        color: ["#C8EEBB", "#8CE394", "#67BF96", "#4CA37A"],
        grid: {
          top: "0px",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: (a) => {
            return a.data.name + "：" + a.data.value + "%";
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "inner",
              formatter: "{b}: {d}%",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "12",
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dy_high_pasger_prm, name: "公路客运" },
              { value: this.list.dy_pubbus_prm, name: "城市公交" },
              { value: this.list.dy_lease_car_prm, name: "出租租赁" },
              { value: this.list.dy_apmt_taxi_prm, name: "预约出租车" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowProductMix() {
      var productMix = this.$refs.productMix;
      const myChart = this.$echarts.init(productMix);
      const option = {
        color: ["#76cbff", "#4a98f8", "#8ee498", "#ffc95c"],
        grid: {
          top: "0px",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: (a) => {
            return a.data.name + "：" + a.data.value + "%";
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["35%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "inner",
              formatter: "{b}: {d}%",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "12",
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dy_car_prm0, name: "车险" },
              { value: this.list.dy_e_prm0, name: "财产险" },
              { value: this.list.dy_prop_prm0, name: "健康险" },
              { value: this.list.dy_jk_prm0, name: "意外险" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowProductMixR() {
      var productMix = this.$refs.productMixR;
      const myChart = this.$echarts.init(productMix);
      const option = {
        color: [
          "#61afff",
          "#6172ff",
          "#ff6671",
          "#ffc95c",
          "#8ee498",
          "#9adbf9",
          "#ddd1c2",
          "#FD94A1",
        ],
        grid: {
          top: "80px",
          left: "5%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: giftImageUrl,
                width: 45,
                height: 45,
              },
              left: "center",
              top: "middle",
            },
          ],
        },
        tooltip: {
          trigger: "item",
          show: true,
          formatter: (a) => {
            // return a.name + '：' + a.data.value + '元' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g;
            if (a.data.value < 10000) {
              let integer = a.data.value + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              return (
                a.name + "：" + integer + "元" + "(" + a.percent + "%" + ")"
              );
            } else if (a.data.value < 100000000) {
              let integer = parseInt((a.data.value % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data.value % 10000) / 10000;
              if (decimals === 0) {
                decimals = "" + "万";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return (
                a.name +
                "：" +
                integer +
                decimals +
                "元" +
                "(" +
                a.percent +
                "%" +
                ")"
              );
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + "";
              yi = yi.replace(reg, (content) => {
                return content + ",";
              });
              let integer = parseInt((a.data.value % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data.value % 10000) / 10000;
              if (decimals === 0) {
                decimals = "";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return (
                a.name +
                "：" +
                yi +
                "亿" +
                integer +
                decimals +
                "元" +
                "(" +
                a.percent +
                "%" +
                ")"
              );
            }
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              // fontSize: '30',
              position: "inner",
              formatter: "{b}: {c}元",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                // fontSize: '30',
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dy_biz_hc_prm, name: "营业货车" },
              { value: this.list.dy_nonbiz_hc_prm, name: "非营业货车" },
              { value: this.list.dy_biz_kc_prm, name: "营业客车" },
              { value: this.list.dy_nonbiz_kc_prm, name: "非营业客车" },
              { value: this.list.dy_cerv_prm, name: "特种车" },
              { value: this.list.dy_fmcar_prm, name: "家庭自用车" },
              { value: this.list.dy_tractor_prm, name: "拖拉机" },
              { value: this.list.dy_motor_prm, name: "摩托车" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowProductMixRT() {
      var productMix = this.$refs.productMixR2;
      const myChart = this.$echarts.init(productMix);
      const option = {
        color: [
          "#61afff",
          "#6172ff",
          "#ff6671",
          "#ffc95c",
          "#8ee498",
          "#9adbf9",
          "#ddd1c2",
        ],
        grid: {
          top: "80px",
          left: "5%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: giftImageUrl,
                width: 45,
                height: 45,
              },
              left: "center",
              top: "middle",
            },
          ],
        },
        tooltip: {
          trigger: "item",
          show: true,
          formatter: (a) => {
            // return a.name + '：' + a.data.value + '元' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g;
            if (a.data.value < 10000) {
              let integer = a.data.value + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              return (
                a.name + "：" + integer + "元" + "(" + a.percent + "%" + ")"
              );
            } else if (a.data.value < 100000000) {
              let integer = parseInt((a.data.value % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data.value % 10000) / 10000;
              if (decimals === 0) {
                decimals = "" + "万";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return (
                a.name +
                "：" +
                integer +
                decimals +
                "元" +
                "(" +
                a.percent +
                "%" +
                ")"
              );
            } else if (a.data.value > 100000000) {
              let yi = parseInt(a.data.value / 100000000) + "";
              yi = yi.replace(reg, (content) => {
                return content + ",";
              });
              let integer = parseInt((a.data.value % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data.value % 10000) / 10000;
              if (decimals === 0) {
                decimals = "";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return (
                a.name +
                "：" +
                yi +
                "亿" +
                integer +
                decimals +
                "元" +
                "(" +
                a.percent +
                "%" +
                ")"
              );
            }
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              // fontSize: '30',
              position: "inner",
              formatter: "{b}: {c}元",
              color: "#000",
            },
            emphasis: {
              label: {
                show: false,
                // fontSize: '30',
                // fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list.dy_biz_hc_prm, name: "营业货车" },
              { value: this.list.dy_nonbiz_hc_prm, name: "非营业货车" },
              { value: this.list.dy_biz_kc_prm, name: "营业客车" },
              { value: this.list.dy_nonbiz_kc_prm, name: "非营业客车" },
              { value: this.list.dy_cerv_prm, name: "特种车" },
              { value: this.list.dy_fmcar_prm, name: "家庭自用车" },
              { value: this.list.otherCarPrm, name: "其他" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowPieaT() {
      const abc =
        this.list.dy_fmcar_newcar_prm + this.list.dy_fmcar_newcar_prm_not;
      var pieChartT = this.$refs.pieChartT;
      const myChart = this.$echarts.init(pieChartT);
      const option = {
        grid: {
          top: "10%",
          left: "20%",
          right: "0%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          show: false,
        },
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: this.xSize,
                    color: "#000",
                  },
                },
              },
            },
            color: ["#ddebf2", "#76cbff"],
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                length: 15,
                length2: 35,
              },
            },
            label: {
              normal: {
                formatter: (value) => {
                  // return a.data.name + '\n' + parseInt(a.data.value).toLocaleString() + '元' + '\n' + (parseInt(a.data.value) / abc * 100).toFixed(2) + '%'
                  var reg = /\d(?=(\d{3})+$)/g;
                  if (value.data.value < 10000) {
                    let integer = value.data.value + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    return (
                      value.data.name +
                      "\n" +
                      integer +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  } else if (value.data.value < 100000000) {
                    let integer =
                      parseInt((value.data.value % 100000000) / 10000) + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    let decimals = (value.data.value % 10000) / 10000;
                    if (decimals === 0) {
                      decimals = "" + "万";
                    } else {
                      decimals =
                        "." + String(decimals.toFixed(2)).split(".")[1] + "万";
                    }
                    if (integer === 0) {
                      integer = "";
                    }
                    return (
                      value.data.name +
                      "\n" +
                      integer +
                      decimals +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  } else if (value.data.value > 100000000) {
                    let yi = parseInt(value.data.value / 100000000) + "";
                    yi = yi.replace(reg, (content) => {
                      return content + ",";
                    });
                    let integer =
                      parseInt((value.data.value % 100000000) / 10000) + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    let decimals = (value.data.value % 10000) / 10000;
                    if (decimals === 0) {
                      decimals = "";
                    } else {
                      decimals =
                        "." + String(decimals.toFixed(2)).split(".")[1] + "万";
                    }
                    if (integer === 0) {
                      integer = "";
                    }
                    return (
                      value.data.name +
                      "\n" +
                      yi +
                      "亿" +
                      integer +
                      decimals +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  }
                },
                borderWidth: 20,
                borderRadius: 4,
                padding: [0, 10],
                rich: {
                  d: {
                    color: "#000",
                    fontSize: 18,
                    lineHeight: 20,
                    align: "right",
                  },
                  b: {
                    fontSize: 18,
                    lineHeight: 20,
                    color: "#000",
                    align: "right",
                  },
                  c: {
                    fontSize: 18,
                    lineHeight: 20,
                    color: "#000",
                    align: "right",
                  },
                },
              },
            },
            data: [
              { value: this.list.dy_fmcar_newcar_prm, name: "家用新车" },
              { value: this.list.dy_fmcar_newcar_prm_not, name: "家用非新车" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowPieaB() {
      const abc = this.list.dy_fmcar_dj_prm + this.list.dy_fmcar_dj_prm_not;
      var pieChartB = this.$refs.pieChartB;
      const myChart = this.$echarts.init(pieChartB);
      const option = {
        grid: {
          top: "10%",
          left: "5%",
          right: "0%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          show: false,
        },
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: this.xSize,
                    color: "#000",
                  },
                },
              },
            },
            color: ["#ddebf2", "#76cbff"],
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                length: 15,
                length2: 35,
              },
            },
            label: {
              normal: {
                formatter: (value) => {
                  // return a.data.name + '\n' + parseInt(a.data.value).toLocaleString() + '元' + '\n' + (parseInt(a.data.value) / abc * 100).toFixed(2) + '%'
                  var reg = /\d(?=(\d{3})+$)/g;
                  if (value.data.value < 10000) {
                    let integer = value.data.value + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    return (
                      value.data.name +
                      "\n" +
                      integer +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  } else if (value.data.value < 100000000) {
                    let integer =
                      parseInt((value.data.value % 100000000) / 10000) + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    let decimals = (value.data.value % 10000) / 10000;
                    if (decimals === 0) {
                      decimals = "" + "万";
                    } else {
                      decimals =
                        "." + String(decimals.toFixed(2)).split(".")[1] + "万";
                    }
                    if (integer === 0) {
                      integer = "";
                    }
                    return (
                      value.data.name +
                      "\n" +
                      integer +
                      decimals +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  } else if (value.data.value > 100000000) {
                    let yi = parseInt(value.data.value / 100000000) + "";
                    yi = yi.replace(reg, (content) => {
                      return content + ",";
                    });
                    let integer =
                      parseInt((value.data.value % 100000000) / 10000) + "";
                    integer = integer.replace(reg, (content) => {
                      return content + ",";
                    });
                    let decimals = (value.data.value % 10000) / 10000;
                    if (decimals === 0) {
                      decimals = "";
                    } else {
                      decimals =
                        "." + String(decimals.toFixed(2)).split(".")[1] + "万";
                    }
                    if (integer === 0) {
                      integer = "";
                    }
                    return (
                      value.data.name +
                      "\n" +
                      yi +
                      "亿" +
                      integer +
                      decimals +
                      "元" +
                      "\n" +
                      ((parseInt(value.data.value) / abc) * 100).toFixed(2) +
                      "%"
                    );
                  }
                },
                borderWidth: 20,
                borderRadius: 4,
                padding: [0, 10],
                rich: {
                  d: {
                    color: "#000",
                    fontSize: 18,
                    lineHeight: 20,
                    align: "right",
                  },
                  b: {
                    fontSize: 18,
                    lineHeight: 20,
                    color: "#000",
                    align: "right",
                  },
                  c: {
                    fontSize: 18,
                    lineHeight: 20,
                    color: "#000",
                    align: "right",
                  },
                },
              },
            },
            data: [
              { value: this.list.dy_fmcar_dj_prm, name: "家用车单交" },
              { value: this.list.dy_fmcar_dj_prm_not, name: "家庭车非单交" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drow() {
      var asd = this.$refs.discountChart;
      const myChart = this.$echarts.init(asd);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["保费", "购买客户数"],
        },
        xAxis: [
          {
            type: "category",
            data: this.list.dy_nocar_top10_pro_prm_name,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "保费",
          },
          {
            type: "value",
            name: "购买客户数",
          },
        ],
        series: [
          {
            name: "保费",
            type: "bar",
            position: "left",
            barWidth: 22,
            yAxisIndex: 1,
            data: this.list.dy_nocar_top10_pro_prm_money,
            color: ["#62AFFF"],
          },
          {
            name: "购买客户数",
            position: "right",
            type: "bar",
            barWidth: 22,
            data: this.list.dy_nocar_top10_pro_prm_num,
            color: ["#98DCF8"],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drowR() {
      var asd = this.$refs.discountChartR;
      const myChart = this.$echarts.init(asd);
      const option = {
        tooltip: {
          show: true,
          axisPointer: {
            type: "none",
          },
          formatter: "{b}:{c}元",
        },
        grid: {
          top: "50px",
          left: "5%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "产品1",
            "产品2",
            "产品3",
            "产品4",
            "产品5",
            "产品6",
            "产品7",
            "产品8",
            "产品9",
            "产品10",
          ],
          axisTick: {
            // y轴刻度线
            show: false,
          },
          axisLine: {
            // y轴
            show: false,
          },
          axisLabel: {
            margin: 25,
            fontSize: 14,
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            // y轴刻度线
            show: false,
          },
          axisLine: {
            // y轴
            show: false,
          },
        },
        series: [
          {
            data: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            type: "bar",
            barWidth: 22,
            color: ["#61afff"],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.business {
  height: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 30px 0 20px 30px;
  width: 1770px;
}
.business_t {
  width: 220px;
  height: 41px;
  padding: 35px 0 0 70px;
  background: url("../../assets/portraitImg/IMG/业务结构.png") no-repeat;
  background-position: 0 28px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.flex {
  display: flex;
  margin-top: 30px;
}
.left {
  width: 30%;
  box-sizing: border-box;
  height: 100%;
}
.right {
  width: 1268px;
  height: 100%;
  margin: -7px 0 20px 0;
}
.card {
  border: 1px solid #dddddd;
  border-radius: 10px;
  height: 490px;
  width: 449px;
  // margin: 20px;
  margin: 20px 20px 20px 0;
  padding-bottom: 90px;
  // margin-left: 30px;
}
.card_a {
  background: url("../../assets/portraitImg/IMG/个人与团体框.png") no-repeat;
  height: 185px;
  width: 449px;
  position: relative;
  background-size: cover;
  display: table;
}
.card_a p {
  font-size: 18px;
  margin-left: 38px;
  margin-top: 22px;
}
.card_b {
  width: 449px;
  height: 690px;
  border: 1px solid #bdbdbd;
  margin-top: 20px;
  border-radius: 7px;
}
.card_b .flex {
  width: 200px;
  height: 40px;
  align-items: center;
  font-size: 18px;
  // background: #D3EBFD;
}
.orange {
  width: 4px;
  height: 20px;
  background: #ff6b00;
  margin: 0 10px;
}
.margin {
  margin-top: 20px;
}
.productMixDetail {
  width: 100%;
  height: 100%;
}
.detailLeft {
  width: 160px;
  height: 170px;
  font-size: 18px;
  margin-top: 40px;
  margin-left: -15px;
}
.detailCor {
  width: 70%;
  height: 10px;
  display: flex;
  align-items: center;
  margin: 35px auto;
  font-size: 18px;
}
.detailRight {
  width: 262px;
  height: 170px;
}
.rTop {
  display: flex;
  // margin-top: 25px;
}
.rate {
  width: 100px;
  height: 35px;
  border-radius: 30px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  margin-left: 10px;
  color: #606266;
}
.singleOut {
  width: 100px;
  height: 35px;
  border-radius: 30px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  margin-left: 50px;
  color: #606266;
}
.detailRight .el-button {
  border-radius: 30px;
  width: 30%;
  height: 30px;
  line-height: 30px;
  line-height: 0;
  margin: 5px 25px;
  font-size: 16px;
}
.colorblue {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #76cbff;
  margin: 0 13px;
}
.colordBlue {
  width: 30px;
  border-radius: 10px;
  height: 10px;
  background: #4a98f8;
  margin: 0 13px;
}
.colorgreen {
  width: 30px;
  height: 10px;
  border-radius: 10px;
  margin: 0 13px;
  background: #8ee498;
}
.colororange {
  width: 30px;
  border-radius: 10px;
  margin: 0 13px;
  height: 10px;
  background: #ffc95c;
}
.colorred {
  width: 30px;
  border-radius: 10px;
  margin: 0 13px;
  height: 10px;
  background: #ff6671;
}
.colorcBlue {
  width: 30px;
  border-radius: 10px;
  margin: 0 13px;
  height: 10px;
  background: #61afff;
}
// ----------------------------------------
.colorblue_q {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #ddd1c2;
  margin: 0 18px;
}
.colorblue_t {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #76cbff;
  margin: 0 18px;
}
.colordBlue_t {
  width: 30px;
  border-radius: 10px;
  height: 10px;
  background: #4a98f8;
  margin: 0 18px;
}
.colorgreen_t {
  width: 30px;
  height: 10px;
  border-radius: 10px;
  margin: 0 18px;
  background: #8ee498;
}
.colororange_t {
  width: 30px;
  border-radius: 10px;
  margin: 0 18px;
  height: 10px;
  background: #ffc95c;
}
.colorred_t {
  width: 30px;
  border-radius: 10px;
  margin: 0 18px;
  height: 10px;
  background: #ff6671;
}
.colorcBlue_t {
  width: 30px;
  border-radius: 10px;
  margin: 0 18px;
  height: 10px;
  background: #61afff;
}
.detailList {
  width: 280px;
  height: 170px;
  background: #f6f7fc;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.detailList_a {
  width: 90px;
  height: 170px;
  // margin: 20px 0;
}
.detailList_b {
  width: 180px;
  height: 170px;
  // margin: 20px 0;
}
.detailNum {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
  // margin-right: 30px;
}
.detailNumber {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
  margin-right: 12px;
}
.detailNum span {
  font-size: 18px;
}
.detailNumber span {
  font-size: 18px;
}
.proportion {
  width: 398px;
  height: 28px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 33px 27px 0 24px;
}
.el-icon-a-goods {
  width: 25px;
  height: 29px;
  background: url("../../assets/portraitImg/IMG/个人.png") no-repeat;
  background-size: cover;
}
.el-icon-b-goods {
  width: 33px;
  height: 29px;
  background: url("../../assets/portraitImg/IMG/团体.png") no-repeat;
  background-size: cover;
}
.el-icon-c-goods {
  width: 25px;
  height: 29px;
  background: url("../../assets/portraitImg/IMG/法人.png") no-repeat;
  background-size: cover;
}
.el-icon-d-goods {
  width: 25px;
  height: 29px;
  background: url("../../assets/portraitImg/IMG/非法人.png") no-repeat;
  background-size: cover;
}
.spanceBetween {
  display: flex;
  justify-content: space-between;
  padding: 0 28px;
}
.spanceBetween_num {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.spanceBetween span {
  font-size: 18px;
  margin-top: 10px;
}
.spanceBetween_num span {
  font-size: 18px;
  margin-top: 10px;
}
.progress {
  width: 80%;
  background: #9adbf9;
  height: 20px;
  overflow: hidden;
  border-radius: 10px;
}
.progressOn {
  width: 398px;
  background: #619eff;
  height: 100%;
}
.echartsR {
  width: 50%;
  min-width: 600px;
  height: 430px;
  margin-top: -35px;
}
.productMix {
  width: 220px;
  height: 220px;
  margin: 30px auto 0;
}
.productMixDetail_t {
  width: 380px;
  height: 100%;
  margin-top: 20px;
  // padding-left: 40px;
}
.detailLeft_t {
  width: 180px;
  height: 280px;
  font-size: 18px;
  margin-top: 35px;
  // margin-left: 30px;
}
.detailCor_t {
  width: 235px;
  height: 9px;
  display: flex;
  align-items: center;
  margin: 35px auto;
  font-size: 18px;
}
.detailRight_t {
  width: 262px;
  height: 326px;
}
.detailRight_t .el-button {
  border-radius: 30px;
  width: 94px;
  height: 35px;
  line-height: 30px;
  line-height: 0;
  margin: 5px 25px;
  font-size: 16px;
}
.detailList_t {
  width: 200px;
  background: #f6f7fc;
  border-radius: 10px;
  // margin-left: 60px;
  margin-top: 10px;
}
.detailNum_t {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
  margin-right: 20px;
}
.detailNum_t span {
  font-size: 18px;
}
.right .detailRight {
  width: 20%;
}
.right .detailLeft {
  margin: 0;
  margin-top: 35px;
}
.rightSec {
  width: 1200px;
  height: 100%;
  padding-top: 30px;
  // padding-left: 30px;
}
.right .el-button {
  text-align: center;
  width: 100px;
  position: relative;
  left: 10px;
}
.right .detailList {
  margin: 0;
  width: 100%;
  height: 54%;
}
.alignCenter {
  align-items: center;
  padding-left: 20px;
}
.right .productMixDetail {
  margin-top: 30px;
}
.title {
  width: 100%;
  margin-right: 39px;
  height: 39px;
  line-height: 39px;
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
}
.titleCon {
  width: 405px;
  height: 53px;
  background: url("../../assets/portraitImg/IMG/车险总保费.png") no-repeat;
  line-height: 39px;
  display: flex;
  justify-content: space-around;
  // padding-right: 80px;
  // padding-top: 8px;
  font-size: 20px;
  background-size: cover;
}
.titleValue {
  font-size: 24px;
  font-weight: 400;
  margin-top: 8px;
}
.titleKey {
  font-size: 18px;
  margin-top: 8px;
}
.pieCharts {
  width: 600px;
  margin-left: 30px;
}
.pieChartT {
  width: 600px;
  margin: auto;
  height: 200px;
  margin-left: 30px;
}
.pieChartB {
  width: 600px;
  height: 200px;
  margin: auto;
  margin-left: 30px;
}
.rightB {
  width: 1268px;
  height: 323px;
  margin-top: 16px;
  position: relative;
  padding-top: 15px;
}
.rightB img {
  position: absolute;
  top: 57px;
  left: 90px;
  width: 1000px;
  height: 326px;
}
.discountChart {
  width: 1200px;
  height: 320px;
  padding-top: 35px;
}
.discountChartA {
  width: 1000px;
  height: 320px;
  padding-top: 35px;
  position: absolute;
  top: 25px;
  left: 90px;
}
.text {
  position: absolute;
  top: -8px;
  left: 35px;
  width: 195px;
  height: 27px;
  line-height: 27px;
  // background: url(../../assets/portraitImg/标题框线.png) no-repeat;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  padding: 3px 0 3px 40px;
  border: 1px solid #ccc;
}
.yi {
  background-color: #fd720e;
  height: 70%;
  width: 5px;
  position: absolute;
  top: 6px;
  left: 20px;
}
.show {
  font-size: 20px;
  position: absolute;
  top: -5px;
  left: 280px;
}
.roundChart {
  width: 220px;
  height: 220px;
  margin: auto;
}
.right_a {
  width: 98%;
  height: 690px;
}
.colorpink_q {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #fd94a1;
  margin: 0 18px;
}
.colorgreen_a {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #4ca37a;
  margin: 0 18px;
}
.colorgreen_b {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #c8eebb;
  margin: 0 18px;
}
.colorgreen_c {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #8ce394;
  margin: 0 18px;
}
.colorgreen_d {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #67bf96;
  margin: 0 18px;
}
.colorblue_a {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #6070fd;
  margin: 0 18px;
}
.colorblue_b {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #92a5f6;
  margin: 0 18px;
}
.colorblue_c {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #ccd3fc;
  margin: 0 18px;
}
.colorbrown_a {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #d15d01;
  margin: 0 18px;
}
.colorbrown_b {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #fee2bb;
  margin: 0 18px;
}
.colorbrown_c {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #faca57;
  margin: 0 18px;
}
.colorbrown_d {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #f7921b;
  margin: 0 18px;
}
</style>
