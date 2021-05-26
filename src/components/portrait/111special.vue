<template>
  <div style="background: white">
    <div class="backGround"><div class="spe">111专项</div></div>
    <div class="Top">
      <div class="topLeft">
        <img class="noWorried" src="../../assets/111专项/资源 198.png" alt="" />
        <div>无忧产品</div>
      </div>
      <div class="topRight">
        <div class="yearAll">当年累计保费</div>
        <img style="width:33px" src="../../assets/111专项/资源 197.png" alt="" />
        <div class="num">{{ $store.state.specialDto.dy_wf_prm }}</div>
      </div>
    </div>
    <div class="middle">
      <el-row>
        <el-col :span="8">
          <div>
            <div class="titleBgp">当月续保保单到期量</div>
            <div class="roundChartG" ref="roundChartG"></div>
            <div  style="margin-top:55px" class="productMixDetail flex">
              <div class="detailLeft">
                <div class="detailCor">
                  <div class="colorblue"></div>
                  家无忧
                </div>
                <div class="detailCor">
                  <div class="colorpop"></div>
                  驾无忧
                </div>
                <div class="detailCor">
                  <div class="colorpink"></div>
                  财无忧
                </div>
                <div class="detailCor">
                  <div class="coloryellow"></div>
                  行无忧
                </div>
              </div>
              <div class="detailRight">
                <div class="rTop">
                  <div class="rate">
                    <p>保费</p>
                  </div>
                  <div class="singleOut">
                    <p>保单数</p>
                  </div>
                </div>
                <div class="detailList">
                  <div class="detailList_a">
                    <div class="detailNum">
                      <span
                        >{{
                          $store.state.specialDto.dy_fwf_prm | fixNumber
                        }}元</span
                      >
                    </div>
                    <div class="detailNum">
                      <span
                        >{{
                          $store.state.specialDto.dy_dwf_prm | fixNumber
                        }}元</span
                      >
                    </div>
                    <div class="detailNum">
                      <span
                        >{{
                          $store.state.specialDto.dy_pwf_prm | fixNumber
                        }}元</span
                      >
                    </div>
                    <div class="detailNum">
                      <span
                        >{{
                          $store.state.specialDto.dy_twf_prm | fixNumber
                        }}元</span
                      >
                    </div>
                  </div>
                  <div class="detailList_b">
                    <div class="detailNumber">
                      <span>{{ this.Home_wy | fixNumber }}</span>
                    </div>
                    <div class="detailNumber">
                      <span>{{ this.Car_wy | fixNumber }}</span>
                    </div>
                    <div class="detailNumber">
                      <span>{{ this.Money_wy | fixNumber }}</span>
                    </div>
                    <div class="detailNumber">
                      <span>{{ this.Go_wy | fixNumber }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="12">
              <div>
                <img
                  class="littleFont"
                  src="../../assets/111专项/家.png"
                  alt=""
                /><span class="titleFont">家无忧单量分布图</span>
              </div>
              <specailChart :params="params1" :status="status" />
            </el-col>
            <el-col :span="12">
              <div style="margin-left: 20px">
                <img
                  class="littleFont"
                  src="../../assets/111专项/驾.png"
                  alt=""
                /><span class="titleFont">驾无忧单量分布图</span>
              </div>
              <specailChart :params="params2" :status="status" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <div>
                  <img
                    class="littleFont"
                    src="../../assets/111专项/财.png"
                    alt=""
                  />
                  <span class="titleFont">财无忧单量分布图</span>
                </div>
                <specailChart :params="params3" :status="status" />
              </div>
            </el-col>
            <el-col :span="12">
              <div style="margin-left: 20px">
                <img
                  class="littleFont"
                  src="../../assets/111专项/行.png"
                  alt=""
                /><span class="titleFont">行无忧单量分布图</span>
              </div>
              <specailChart :params="params4" :status="status" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bot">
      <el-row>
        <el-col :span="12">
          <lineChart :params="paramsC1" :status="status"></lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart :params="paramsC2" :status="status"></lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart :params="paramsC3" :status="status"></lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart :params="paramsC4" :status="status"></lineChart>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import giftImageUrl from "../../assets/111专项/资源 196.png";
import specailChart from "../../components/charts/111chart";
import lineChart from "../../components/charts/111card";
export default {
  components: {
    specailChart,
    lineChart,
  },
  data() {
    return {
      status: true,
      list: [],
      Home_wy: "",
      Car_wy: "",
      Money_wy: "",
      Go_wy: "",
      GetWindowInfo: {
        width: "",
      },
      xSize: 18,
      params1: {
        color: ["#5780CE", "#61AFFF", "#9BDAFA"],
        chartData: [
          { value: 0, name: "标准版" },
          { value: 0, name: "经典版" },
          { value: 0, name: "豪华版" },
        ],
        status: true,
      },
      params2: {
        color: ["#584FBC", "#927CFF", "#D8D2FF"],
        chartData: [
          { value: 0, name: "标准版" },
          { value: 0, name: "经典版" },
          { value: 0, name: "豪华版" },
        ],
        status: true,
      },
      params3: {
        color: ["#51CB76", "#8EE49A", "#C2FDC6"],
        chartData: [
          { value: 0, name: "标准版" },
          { value: 0, name: "经典版" },
          { value: 0, name: "豪华版" },
        ],
        status: true,
      },
      params4: {
        color: ["#FA8A1C", "#FECA64", "#FEE0AA"],
        chartData: [
          { value: 0, name: "标准版" },
          { value: 0, name: "经典版" },
          { value: 0, name: "豪华版" },
        ],
        status: true,
      },
      paramsC1: {
        title: "家无忧保费分布",
        lineData: [["product", "标准版", "经典版", "豪华版"]],
        status: true,
      },
      paramsC2: {
        title: "驾无忧保费分布",
        lineData: [["product", "标准版", "经典版", "豪华版"]],
        status: true,
      },
      paramsC3: {
        title: "财无忧保费分布",
        lineData: [["product", "标准版", "经典版", "豪华版"]],
        status: true,
      },
      paramsC4: {
        title: "行无忧保费分布",
        lineData: [["product", "标准版", "经典版", "豪华版"]],
        status: true,
      },
    };
  },
  watch: {
    "$store.state.role.state"() {
      this.drowRoundChartGolden();
      // if (this.$store.state.role.orglResult !== '' && this.$store.state.role.channelResult === '') {
      // }
    },
  },
  mounted() {
    this.drowRoundChartGolden();
  },
  created() {
    window.addEventListener("resize", this.GetWindowInfo);
    this.GetWindow();
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
    drowRoundChartGolden() {
      setTimeout(() => {
        console.log(this.$store.state.specialDto.dy_fwf_prm);
        this.Home_wy =
          this.$store.state.specialDto.dy_fwf_std_polnum +
          this.$store.state.specialDto.dy_fwf_clc_polnum +
          this.$store.state.specialDto.dy_fwf_luy_polnum;
        (this.Car_wy =
          this.$store.state.specialDto.dy_dwf_std_polnum +
          this.$store.state.specialDto.dy_dwf_clc_polnum +
          this.$store.state.specialDto.dy_dwf_luy_polnum),
          (this.Money_wy =
            this.$store.state.specialDto.dy_pwf_std_polnum +
            this.$store.state.specialDto.dy_pwf_clc_polnum +
            this.$store.state.specialDto.dy_pwf_luy_polnum),
          (this.Go_wy =
            this.$store.state.specialDto.dy_twf_std_polnum +
            this.$store.state.specialDto.dy_twf_clc_polnum +
            this.$store.state.specialDto.dy_twf_luy_polnum),
          (this.params1.chartData = [
            {
              value: this.$store.state.specialDto.dy_fwf_std_polnum,
              name: "标准版",
            },
            {
              value: this.$store.state.specialDto.dy_fwf_clc_polnum,
              name: "经典版",
            },
            {
              value: this.$store.state.specialDto.dy_fwf_luy_polnum,
              name: "豪华版",
            },
          ]);
        this.params1.chartAll = [
          this.$store.state.specialDto.dy_fwf_std_prm,
          this.$store.state.specialDto.dy_fwf_clc_prm,
          this.$store.state.specialDto.dy_fwf_luy_prm,
        ];
        console.log(this.params1);
        this.params2.chartData = [
          {
            value: this.$store.state.specialDto.dy_fwf_std_prm,
            name: "标准版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_clc_prm,
            name: "经典版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_luy_prm,
            name: "豪华版",
          },
        ];
        this.params2.chartAll = [
          this.$store.state.specialDto.dy_fwf_std_prm,
          this.$store.state.specialDto.dy_fwf_clc_prm,
          this.$store.state.specialDto.dy_fwf_luy_prm,
        ];
        this.params3.chartData = [
          {
            value: this.$store.state.specialDto.dy_fwf_std_prm,
            name: "标准版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_clc_prm,
            name: "经典版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_luy_prm,
            name: "豪华版",
          },
        ];
        this.params3.chartAll = [
          this.$store.state.specialDto.dy_fwf_std_prm,
          this.$store.state.specialDto.dy_fwf_clc_prm,
          this.$store.state.specialDto.dy_fwf_luy_prm,
        ];
        this.params4.chartData = [
          {
            value: this.$store.state.specialDto.dy_fwf_std_prm,
            name: "标准版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_clc_prm,
            name: "经典版",
          },
          {
            value: this.$store.state.specialDto.dy_fwf_luy_prm,
            name: "豪华版",
          },
        ];
        this.params4.chartAll = [
          this.$store.state.specialDto.dy_fwf_std_prm,
          this.$store.state.specialDto.dy_fwf_clc_prm,
          this.$store.state.specialDto.dy_fwf_luy_prm,
        ];
        for (let i = 0; i < this.$store.state.specialDto.fwfList.length; i++) {
          this.paramsC1.lineData[i + 1] = [
            this.$store.state.specialDto.fwfList[i].data_date,
            this.$store.state.specialDto.fwfList[i].dy_evrym_fwf_std_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_fwf_clc_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_fwf_luy_prm,
          ];
          this.paramsC2.lineData[i + 1] = [
            this.$store.state.specialDto.fwfList[i].data_date,
            this.$store.state.specialDto.fwfList[i].dy_evrym_dwf_std_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_dwf_clc_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_dwf_luy_prm,
          ];
          this.paramsC3.lineData[i + 1] = [
            this.$store.state.specialDto.fwfList[i].data_date,
            this.$store.state.specialDto.fwfList[i].dy_evrym_pwf_std_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_pwf_clc_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_pwf_luy_prm,
          ];
          this.paramsC4.lineData[i + 1] = [
            this.$store.state.specialDto.fwfList[i].data_date,
            this.$store.state.specialDto.fwfList[i].dy_evrym_twf_std_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_twf_clc_prm,
            this.$store.state.specialDto.fwfList[i].dy_evrym_twf_luy_prm,
          ];
          console.log(this.paramsC1);
        }
        var roundChartG = this.$refs.roundChartG;
        const myChart = this.$echarts.init(roundChartG);
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
                {
                  value: this.$store.state.specialDto.dy_fwf_prm,
                  name: "家无忧",
                },
                {
                  value: this.$store.state.specialDto.dy_dwf_prm,
                  name: "驾无忧",
                },
                {
                  value: this.$store.state.specialDto.dy_pwf_prm,
                  name: "财无忧",
                },
                {
                  value: this.$store.state.specialDto.dy_twf_prm,
                  name: "行无忧",
                },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 1000);
    },
  },
};
</script>

<style>
.backGround {
  background: url("../../assets/111专项/111专项.png");
  background-size: 100% 100%;
  padding-top: 10px;
  height: 31px;
  width: 220px;
  margin-top: 10px;
}
.spe {
  text-align: center;
  font-size: 18px;
  color: white;
}
.noWorried {
  float: left;
  margin: 2px 15px 0px 22px;
}
.Top {
  font-size: 20px;
  height: 67px;
  border-radius: 0.5rem;
  background: #f6f7fc;
  margin: 25px 45px 15px 45px;
}
.topRight {
  float: right;
  margin-top: -50px;
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
.productMixDetail {
  margin-top: 50px;
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
.colorblue {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #62aefd;
  margin: 0 13px;
}
.colorpop {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #6172ff;
  margin: 0 13px;
}
.coloryellow {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #ffc95c;
  margin: 0 13px;
}
.colorpink {
  border-radius: 10px;
  width: 30px;
  height: 10px;
  background: #ff6671;
  margin: 0 13px;
}
.detailRight {
  width: 40%;
}
.rTop {
  display: flex;
}
.flex {
  display: flex;
  margin-top: 30px;
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
}
.detailNum {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
}
.detailNumber {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
  margin-right: 25px;
}
.detailList_b {
  width: 180px;
  height: 170px;
}
.littleFont {
  margin: 0px 5px -15px 0;
  font-weight: 200;
}
.titleFont {
  font-size: 18px;
}
.roundChartG {
  width: 220px;
  height: 220px;
  margin-left: 80px;
}
.yearAll {
  font-size: 15px;
  float: left;
  margin: 10px 40px 0px 0px;
  font-weight: 500;
}
.num {
  float: right;
  font-size: 20px;
  margin: 6px 70px 0px 50px;
  font-weight: 500;
}
.topLeft {
  padding-top: 18px;
  background: #d4ebfd;
  height: 50px;
  width: 15%;
  border-radius: 0.5rem;
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
</style>
