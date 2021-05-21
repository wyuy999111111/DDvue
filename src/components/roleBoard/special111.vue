<template>
  <div>
    <div class="backGround"><div class="spe">111专项</div></div>
    <div class="Top">
      <img class="noWorried" src="../../assets/111专项/资源 198.png" alt="" />
      <span>无忧产品</span>
      <span class="topRight">
        <span>当年累计保费</span>
        <img src="../../assets/111专项/资源 197.png" alt="" />
        <span>{{ list.dy_wf_prm }}</span></span
      >
    </div>
    <div class="middle">
      <el-row>
        <el-col :span="8">
          <div>
            <div class="titleBgp">当月续保保单到期量</div>
            <div class="roundChartG" ref="roundChartG"></div>
            <div class="productMixDetail flex">
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
                      <span>{{ this.list.dy_fwf_prm | fixNumber }}元</span>
                    </div>
                    <div class="detailNum">
                      <span>{{ this.list.dy_dwf_prm | fixNumber }}元</span>
                    </div>
                    <div class="detailNum">
                      <span>{{ this.list.dy_pwf_prm | fixNumber }}元</span>
                    </div>
                    <div class="detailNum">
                      <span>{{ this.list.dy_twf_prm | fixNumber }}元</span>
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
              <specailChart :params = "list" :status='status'/>
            </el-col>
            <el-col :span="12">
              <div>
                <img
                  class="littleFont"
                  src="../../assets/111专项/驾.png"
                  alt=""
                /><span class="titleFont">驾无忧单量分布图</span>
              </div>
              <div style="width: 220px; height: 220px; margin: auto">
                asdasd
              </div>
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
                <div style="width: 220px; height: 220px; margin: auto">
                  asdasd
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <img
                  class="littleFont"
                  src="../../assets/111专项/行.png"
                  alt=""
                /><span class="titleFont">行无忧单量分布图</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="bot"></div>
  </div>
</template>

<script>
import giftImageUrl from "../../assets/111专项/资源 196.png";
import specailChart from "../../components/charts/111chart";
import { findRoleshow111 } from "../../api/getApi";
export default {
  components: {
    findRoleshow111,
    specailChart
  },
  data() {
    return {
      list: [],
      Home_wy: "",
      Car_wy: "",
      Money_wy: "",
      Go_wy: "",
      GetWindowInfo: {
        width: "",
      },
    };
  },
  // watch: {
  //   list() {
  //     setTimeout(() => {
  //       this.drowRoundChartGolden();
  //     }, 0);
  //   },
  //   "$store.state.role.state"() {
  //     this.getData();
  //     // if (this.$store.state.role.orglResult !== '' && this.$store.state.role.channelResult === '') {
  //     // }
  //   },
  // },
  mounted() {
    this.getData()
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
    getData() {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption,
      };
      findRoleshow111(params).then((res) => {
        this.list = res.data.data.secondcompanyRoleshow111[0];
        // this.Home_wy =
        //   this.list.dy_fwf_std_polnum +
        //   this.list.dy_fwf_clc_polnum +
        //   this.list.dy_fwf_luy_polnum;
        // (this.Car_wy =
        //   this.list.dy_dwf_std_polnum +
        //   this.list.dy_dwf_clc_polnum +
        //   this.list.dy_dwf_luy_polnum),
        //   (this.Money_wy =
        //     this.list.dy_pwf_std_polnum +
        //     this.list.dy_pwf_clc_polnum +
        //     this.list.dy_pwf_luy_polnum),
        //   (this.Go_wy =
        //     this.list.dy_twf_std_polnum +
        //     this.list.dy_twf_clc_polnum +
        //     this.list.dy_twf_luy_polnum),
          console.log(this.list);
      });
    },
    drowRoundChartGolden() {
      console.log(this.list);
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
              console.log(a.data.value);
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
              { value: this.list.dy_fwf_prm, name: "家无忧" },
              { value: this.list.dy_dwf_prm, name: "驾无忧" },
              { value: this.list.dy_pwf_prm, name: "财无忧" },
              { value: this.list.dy_twf_prm, name: "行无忧" },
            ],
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
  margin: 0px 0px -3px 0px;
}
.Top {
  font-size: 20px;
  height: 60px;
  border-radius: 0.5rem;
  background: #f6f7fc;
  margin-top: 50px;
}
.topRight {
  float: right;
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
  margin: auto;
}
</style>
