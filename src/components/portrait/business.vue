<template>
  <div class="business" id="business">
    <div class="business_t"><p>业务结构</p></div>
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
              <el-button>占比</el-button>
              <el-button>出单量</el-button>
              <div class="detailList">
                <div class="detailList_a">
                  <div class="detailNum">
                    <span>{{ $store.state.salesPortrayDto.dy_car_prm0 }}%</span>
                  </div>
                  <div class="detailNum">
                    <span
                      >{{ $store.state.salesPortrayDto.dy_prop_prm0 }}%</span
                    >
                  </div>
                  <div class="detailNum">
                    <span>{{ $store.state.salesPortrayDto.dy_jk_prm0 }}%</span>
                  </div>
                  <div class="detailNum">
                    <span>{{ $store.state.salesPortrayDto.dy_e_prm0 }}%</span>
                  </div>
                </div>
                <div class="detailList_b">
                  <div class="detailNumber">
                    <span
                      >{{
                        $store.state.salesPortrayDto.dy_car_polnum | fixNumber
                      }}单</span
                    >
                  </div>
                  <div class="detailNumber">
                    <span
                      >{{
                        $store.state.salesPortrayDto.dy_prop_polnum | fixNumber
                      }}单</span
                    >
                  </div>
                  <div class="detailNumber">
                    <span
                      >{{
                        $store.state.salesPortrayDto.dy_jk_polnum | fixNumber
                      }}单</span
                    >
                  </div>
                  <div class="detailNumber">
                    <span
                      >{{
                        $store.state.salesPortrayDto.dy_e_polnum | fixNumber
                      }}单</span
                    >
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
                    (this.$store.state.salesPortrayDto.dy_pers_prm /
                      (this.$store.state.salesPortrayDto.dy_pers_prm +
                        this.$store.state.salesPortrayDto.dy_org_prm)) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
            <i class="el-icon-b-goods" />
          </div>
          <div class="spanceBetween"><span>个人</span><span>团体</span></div>
          <div class="spanceBetween">
            <span
              >{{
                $store.state.salesPortrayDto.dy_pers_prm | fixNumber
              }}元</span
            ><span
              >{{ $store.state.salesPortrayDto.dy_org_prm | fixNumber }}元</span
            >
          </div>
        </div>
        <div class="card_a">
          <!-- <ButtonWhite params='法人与非法人保费' style="marginTop: 10px" /> -->
          <p>法人与非法人保费</p>
          <div class="proportion">
            <i class="el-icon-c-goods" />
            <div class="progress">
              <div
                class="progressOn"
                :style="{
                  width:
                    (this.$store.state.salesPortrayDto.dy_legal_prm /
                      (this.$store.state.salesPortrayDto.dy_legal_prm +
                        this.$store.state.salesPortrayDto.dy_unlegal_prm)) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
            <i class="el-icon-d-goods" />
          </div>
          <div class="spanceBetween"><span>法人</span><span>非法人</span></div>
          <div class="spanceBetween">
            <span
              >{{
                $store.state.salesPortrayDto.dy_legal_prm | fixNumber
              }}元</span
            ><span
              >{{
                $store.state.salesPortrayDto.dy_unlegal_prm | fixNumber
              }}元</span
            >
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
                >{{
                  $store.state.salesPortrayDto.dy_car_prm | fixNumber
                }}元</span
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
                  其他
                </div>
              </div>
              <div class="detailRight_t">
                <el-button>保费收入</el-button>
                <div class="detailList_t">
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_biz_hc_prm | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_nonbiz_hc_prm
                          | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_biz_kc_prm | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_nonbiz_kc_prm
                          | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_cerv_prm | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.dy_fmcar_prm | fixNumber
                      }}元</span
                    >
                  </div>
                  <div class="detailNum_t">
                    <span align="right"
                      >{{
                        $store.state.salesPortrayDto.otherCarPrm | fixNumber
                      }}元</span
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
        <div class="rightB">
          <div class="discountChart" ref="discountChart"></div>
          <div class="text">
            <div class="yi"></div>
            非车出单产品Top10
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
// import '../../utils/rem'
export default {
  name: "business",
  components: {
    ButtonWhite,
    ButtonBlue,
  },
  data() {
    return {
      GetWindowInfo: {
        width: "",
      },
      tSize: 18,
      bSize: 18,
    };
  },
  created() {
    window.addEventListener("resize", this.GetWindowInfo);
    this.GetWindow();
  },
  mounted() {
    this.drowProductMix();
    this.drowProductMixR();
    this.drowPieaT();
    this.drowPieaB();
    this.drow();
  },
  watch: {
    "$store.state.salesPortrayDto"() {
      setTimeout(() => {
        this.drowProductMix();
        this.drowProductMixR();
        this.drowPieaT();
        this.drowPieaB();
        this.drow();
      }, 1000);
    },
  },
  methods: {
    GetWindow() {
      this.GetWindowInfo.width = window.outerWidth;
      console.log(this.GetWindowInfo.width);
      if (this.GetWindowInfo.width === 1366) {
        this.tSize = 14;
        this.bSize = 14;
      } else if (this.GetWindowInfo.width === 1600) {
        this.tSize = 16;
        this.bSize = 16;
      }
    },
    drowProductMix() {
      var productMix = this.$refs.productMix;
      const myChart = this.$echarts.init(productMix);
      const option = {
        color: ["#76cbff", "#4a98f8", "#8ee498", "#ffc95c"],
        grid: {
          top: "0%",
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
              {
                value: this.$store.state.salesPortrayDto.dy_car_prm0,
                name: "车险",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_prop_prm0,
                name: "财产险",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_jk_prm0,
                name: "健康险",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_e_prm0,
                name: "意外险",
              },
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
          "ddd1c2",
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
            return (
              a.name + "：" + a.data.value + "元" + "(" + a.percent + "%" + ")"
            );
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
              {
                value: this.$store.state.salesPortrayDto.dy_biz_hc_prm,
                name: "营业货车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_nonbiz_hc_prm,
                name: "非营业货车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_biz_kc_prm,
                name: "营业客车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_nonbiz_kc_prm,
                name: "非营业客车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_cerv_prm,
                name: "特种车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_fmcar_prm,
                name: "家庭自用车",
              },
              {
                value: this.$store.state.salesPortrayDto.otherCarPrm,
                name: "其他",
              },
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
      const _this = this;
      const abc =
        this.$store.state.salesPortrayDto.dy_fmcar_newcar_prm2 +
        this.$store.state.salesPortrayDto.dy_fmcar_newcar_prm;
      var pieChartT = this.$refs.pieChartT;
      const myChart = this.$echarts.init(pieChartT);
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
                    fontSize: _this.tSize,
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
                length2: 50,
              },
            },
            label: {
              normal: {
                formatter: (a) => {
                  return (
                    a.data.name +
                    "\n" +
                    parseInt(a.data.value).toLocaleString() +
                    "元" +
                    "\n" +
                    ((parseInt(a.data.value) / abc) * 100).toFixed(2) +
                    "%"
                  );
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
              {
                value: this.$store.state.salesPortrayDto.dy_fmcar_newcar_prm,
                name: "家用新车",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_fmcar_newcar_prm2,
                name: "家用非新车",
              },
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
      const _this = this;
      const abc =
        this.$store.state.salesPortrayDto.dy_fmcar_dj_prm +
        this.$store.state.salesPortrayDto.dy_fmcar_dj_prm2;
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
                    fontSize: _this.bSize,
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
                length2: 50,
              },
            },
            label: {
              normal: {
                formatter: (a) => {
                  return (
                    a.data.name +
                    "\n" +
                    parseInt(a.data.value).toLocaleString() +
                    "元" +
                    "\n" +
                    ((parseInt(a.data.value) / abc) * 100).toFixed(2) +
                    "%"
                  );
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
              {
                value: this.$store.state.salesPortrayDto.dy_fmcar_dj_prm,
                name: "家用车单交",
              },
              {
                value: this.$store.state.salesPortrayDto.dy_fmcar_dj_prm2,
                name: "家庭车非单交",
              },
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
      let baofei = [];
      const option = {
        tooltip: {
          trigger: "axis",
          formatter: (a) => {
            let text = a[0].name;
            let text1 = "";
            console.log(a)
            for (let i = 0; i < a.length; i++) {
              if (a[i].dataIndex === 0) {
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[0] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[0] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[0] + "</div>";
              }else if(a[i].dataIndex === 1){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[1] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[1] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[1] + "</div>";
              }else if(a[i].dataIndex === 2){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[2] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[2] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[2] + "</div>";
              }else if(a[i].dataIndex === 3){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[3] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[3] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[3] + "</div>";
              }else if(a[i].dataIndex === 4){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[4] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[4] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[4] + "</div>";
              }else if(a[i].dataIndex === 5){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[5] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[5] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[5] + "</div>";
              }else if(a[i].dataIndex === 6){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[6] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[6] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[6] + "</div>";
              }else if(a[i].dataIndex === 7){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[7] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[7] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[7] + "</div>";
              }else if(a[i].dataIndex === 8){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[8] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[8] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[8] + "</div>";
              }else if(a[i].dataIndex === 9){
             text = "<div>" + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_china_name[9] + "</br>" + '保费：' + this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_money[9] + '</br>' +'购买客户数：'+  this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num[9] + "</div>";
              }
            }
            console.log(a)
            return text;
          },
        },
        legend: {
          data: ["保费", "购买客户数"],
        },
        xAxis: [
          {
            type: "category",
            data: this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_name,
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
            data: this.$store.state.salesPortrayDto
              .dy_nocar_top10_pro_prm_money,
            color: ["#62AFFF"],
          },
          {
            name: "购买客户数",
            position: "right",
            type: "bar",
            barWidth: 22,
            data: this.$store.state.salesPortrayDto.dy_nocar_top10_pro_prm_num,
            color: ["#98DCF8"],
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.business {
  display: table;
  margin-top: 20px;
  width: 1810px;
  height: 100%;
  background: white;
  padding-bottom: 20px;
}
.business_t {
  width: 220px;
  height: 41px;
  line-height: 41px;
  // padding: 35px 0 0 70px;
  background: url("../../assets/portraitImg/IMG/业务结构.png") no-repeat;
  // background-position: 0 28px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-size: cover;
  margin-top: 30px;
}
.business_t p {
  margin: 0px 0 0 70px;
}
.flex {
  display: flex;
}
.left {
  width: 30%;
  box-sizing: border-box;
  height: 100%;
}
.right {
  width: 1268px;
  height: 100%;
  margin: 20px 0 20px 0;
}
.card {
  border: 2px solid #f7f5f5;
  border-radius: 10px;
  height: 490px;
  width: 449px;
  margin: 20px;
  padding-bottom: 30px;
  margin-left: 60px;
}
.card_a {
  background: url("../../assets/portraitImg/IMG/个人与团体框.png") no-repeat;
  height: 185px;
  width: 449px;
  margin: 20px 0 0 20px;
  position: relative;
  // padding-top: 20px;
  margin-left: 60px;
  background-size: cover;
  display: table;
}
.card_a p {
  font-size: 20px;
  margin-left: 38px;
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
  margin-left: 15px;
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
  width: 250px;
  height: 170px;
  background: #f6f7fc;
  border-radius: 10px;
  display: flex;
  margin: 20px 0;
}
.detailList_a {
  width: 125px;
  height: 170px;
  // margin: 20px 0;
}
.detailList_b {
  width: 125px;
  height: 170px;
  // margin: 20px 0;
}
.detailNum {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
  margin-right: 30px;
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
  height: 410px;
  padding-top: 15px;
}
// .productMixR{
//   margin-right: 40px;
// }
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
  width: 170px;
  height: 302px;
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
  padding-left: 30px;
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
  line-height: 53px;
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
}
.titleKey {
  font-size: 18px;
}
.pieCharts {
  width: 600px;
  // margin-left: 30px;
}
.pieChartT {
  width: 100%;
  margin: auto;
  height: 200px;
}
.pieChartB {
  width: 100%;
  margin: auto;
  height: 200px;
}
.rightB {
  width: 1268px;
  height: 323px;
  margin-top: 16px;
  position: relative;
  padding-top: 15px;
}
.discountChart {
  width: 1200px;
  height: 320px;
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
  height: 21px;
  width: 5px;
  position: absolute;
  top: 6px;
  left: 20px;
}
.productMix {
  width: 220px;
  height: 220px;
  margin: auto;
}
</style>
