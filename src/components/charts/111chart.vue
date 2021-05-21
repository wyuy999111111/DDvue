<template>
  <div class="roundChart" ref="roundChartc"></div>
</template>

<script>
export default {
  name: "111chart",
  props: ["params"],
  data() {
    return {
      GetWindowInfo: {
        width: "",
      },
      xSize: 18,
    };
  },
  created() {
    window.addEventListener("resize", this.GetWindowInfo);
    this.GetWindow();
    setTimeout(() => {
      this.drowRoundChart();
    }, 1000);
  },
  watch: {
    params() {
      this.drowRoundChart();
    },
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
    drowRoundChart() {
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
  },
};
</script>

<style lang='less' scoped>
.roundChart {
  width: 220px;
  height: 220px;
  margin: auto;
}
</style>
