<template>
  <div>
    <ButtonBlue :params="use.title" />
    <div class="linechart" ref="linechart"></div>
  </div>
</template>

<script>
import ButtonBlue from "../../common/ButtonBlue";
export default {
  components: {
    ButtonBlue,
  },
  props: ["params", "status"],
  created() {
    window.addEventListener("resize", this.GetWindowInfo);
    this.GetWindow();
  },
  mounted() {
    setTimeout(() => {
      this.drowLineChart();
    }, 1000);
  },
  watch: {
    status() {
      this.drowLineChart();
      // if (this.$store.state.role.orglResult !== '' && this.$store.state.role.channelResult === '') {
      // }
    },
  },
  data() {
    return {
      use: [],
      GetWindowInfo: {
        width: "",
      },
      xSize: 18,
    };
  },
  methods: {
    GetWindow() {
      this.GetWindowInfo.width = window.outerWidth;
      if (this.GetWindowInfo.width === 1366) {
        this.xSize = 14;
      }
      if (this.GetWindowInfo.width === 1600) {
        this.xSize = 16;
      }
      if (this.GetWindowInfo.width === 1920) {
        this.xSize = 18;
      }
    },
    drowLineChart() {
      const _this = this;
      this.use = _this.params;
      var linechart = this.$refs.linechart;
      const myChart = this.$echarts.init(linechart);
      console.log(_this.status);
      const option = {
        color: ["#629EFE", "#9BDBF7", "#FECA5C"],
        legend: {},
        tooltip: {
          trigger: "item",
          show: true,
          formatter: (a) => {
            // return a.name + '：' + a.data[1] + '元' + '(' + a.percent + '%' + ')'
            var reg = /\d(?=(\d{3})+$)/g;
            if (a.data[1] < 10000 && a.componentIndex == 0) {
              console.log(a.data[1]);
              let integer = a.data[1] + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              return (
                a.name + "：" + integer + "元"
              );
            } else if (a.data[1] < 100000000 && a.componentIndex == 0) {
              let integer = parseInt((a.data[1] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[1] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "" + "万";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + integer + decimals + "元";
            } else if (a.data[1] > 100000000 && a.componentIndex == 0) {
              let yi = parseInt(a.data[1] / 100000000) + "";
              yi = yi.replace(reg, (content) => {
                return content + ",";
              });
              let integer = parseInt((a.data[1] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[1] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + yi + "亿" + integer + decimals + "元";
            }

            if (a.data[2] < 10000 && a.componentIndex == 1) {
              console.log(a.data[2]);
              let integer = a.data[2] + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              return a.name + "：" + integer + "元";
            } else if (a.data[2] < 100000000 && a.componentIndex == 1) {
              let integer = parseInt((a.data[2] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[2] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "" + "万";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + integer + decimals + "元";
            } else if (a.data[2] > 100000000 && a.componentIndex == 1) {
              let yi = parseInt(a.data[2] / 100000000) + "";
              yi = yi.replace(reg, (content) => {
                return content + ",";
              });
              let integer = parseInt((a.data[2] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[2] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + yi + "亿" + integer + decimals + "元";
            }

            if (a.data[3] < 10000 && a.componentIndex == 2) {
              console.log(a.data[3]);
              let integer = a.data[3] + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              return a.name + "：" + integer + "元";
            } else if (a.data[3] < 100000000 && a.componentIndex == 2) {
              let integer = parseInt((a.data[3] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[3] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "" + "万";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + integer + decimals + "元";
            } else if (a.data[3] > 100000000 && a.componentIndex == 2) {
              let yi = parseInt(a.data[3] / 100000000) + "";
              yi = yi.replace(reg, (content) => {
                return content + ",";
              });
              let integer = parseInt((a.data[3] % 100000000) / 10000) + "";
              integer = integer.replace(reg, (content) => {
                return content + ",";
              });
              let decimals = (a.data[3] % 10000) / 10000;
              if (decimals === 0) {
                decimals = "";
              } else {
                decimals =
                  "." + String(decimals.toFixed(2)).split(".")[1] + "万";
              }
              if (integer === 0) {
                integer = "";
              }
              return a.name + "：" + yi + "亿" + integer + decimals + "元";
            }
          },
        },
        dataset: {
          source: _this.params.lineData,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 20, // 角度顺时针计算的
          },
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang='less' scoped>
.linechart {
  width: 100%;
  height: 350px;
}
</style>
