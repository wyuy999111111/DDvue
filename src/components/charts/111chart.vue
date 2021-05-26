<template>
  <div>
    <div class="roundChart" ref="roundChart"></div>
    <div class="productMixDetail_t flex">
      <div class="detailLeft_t">
        <div class="detailCor_t">
          <div class="colorblue_c"></div>
          标准型
        </div>
        <div class="detailCor_t">
          <div class="colorblue_b"></div>
          经典型
        </div>
        <div class="detailCor_t">
          <div class="colorblue_a"></div>
          豪华型
        </div>
      </div>
      <div class="detailRight_t">
        <div class="flex">
          <el-button>保费</el-button> <el-button>保单数</el-button>
        </div>
        <div class="detailList_t">
          <div class="leftPart">
            <div
              v-for="(item, index) in use.chartData"
              :key="index"
              class="detailNum_t"
            >
              <span align="right">{{ item.value | fixNumber }}元</span>
            </div>
          </div>
          <div class="rightPart">
            <div
              v-for="(item, index) in use.chartAll"
              :key="index"
              class="detailNum_t"
            >
              <span align="right">{{ item | fixNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'specailChart',
  props: ['params', 'status'],
  data () {
    return {
      use: [],
      GetWindowInfo: {
        width: ''
      },
      xSize: 18
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
  },
  mounted () {
    setTimeout(() => {
      this.roundChart()
    }, 1100)
  },
  watch: {
    status () {
      this.roundChart()
    }
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      if (this.GetWindowInfo.width === 1366) {
        this.xSize = 14
      }
      if (this.GetWindowInfo.width === 1600) {
        this.xSize = 16
      }
      if (this.GetWindowInfo.width === 1920) {
        this.xSize = 18
      }
    },
    roundChart () {
      var roundChart = this.$refs.roundChart
      const myChart = this.$echarts.init(roundChart)
      const _this = this
      this.use = _this.params
      console.log(_this.status)
      const option = {
        color: _this.params.color,
        grid: {
          top: '0px',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item'
          // formatter: (a) => {
          //   return a.data.name + "：" + a.data.value + "%";
          // },
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'inner',
              formatter: '{b}: {d}%',
              color: '#000'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '12'
                // fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: _this.params.chartData
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

<style lang='less' scoped>
.roundChart {
  float: left;
  width: 200px;
  height: 200px;
  margin-top: 30px;
  margin-left: -35px;
}
.productMixDetail_t {
  float: right;
  width: 380px;
  height: 250px;
  margin-top: 20px;
  // padding-left: 40px;
}
.flex {
  display: flex;
  margin-top: 30px;
}
.detailLeft_t {
  width: 80px;
  height: 280px;
  font-size: 18px;
  margin-top: 65px;
  // margin-left: 30px;
}
.detailCor_t {
  width: 235px;
  height: 9px;
  display: flex;
  align-items: center;
  margin: 35px auto;
  font-size: 14px;
}
.detailRight_t {
  width: 180px;
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
  width: 14.725rem;
  background: #f6f7fc;
  border-radius: 10px;
  // margin-left: 20px;
  margin-top: 10px;
}
.detailNum_t {
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  flex-direction: row-reverse;
}
.leftPart {
  float: left;
}
.leftRight {
  float: right;
}
.rightPart {
  padding: 0 0 0 0;
}
</style>
