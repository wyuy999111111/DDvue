<template>
  <div>
    <ButtonBlue :params="use.title" />
    <div class="linechart" ref="linechart"></div>
  </div>
</template>

<script>
import ButtonBlue from '../../common/ButtonBlue'
export default {
  components: {
    ButtonBlue
  },
  props: ['params', 'status'],
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
  },
  mounted () {
    setTimeout(() => {
      this.drowLineChart()
    }, 1000)
  },
  watch: {
    status () {
      this.drowLineChart()
      // if (this.$store.state.role.orglResult !== '' && this.$store.state.role.channelResult === '') {
      // }
    }
  },
  data () {
    return {
      use: [],
      GetWindowInfo: {
        width: ''
      },
      xSize: 18
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
    drowLineChart () {
      const _this = this
      this.use = _this.params
      var linechart = this.$refs.linechart
      const myChart = this.$echarts.init(linechart)
      console.log(_this.status)
      console.log(this.use)
      const option = {
        color: ['#629EFE', '#9BDBF7', '#FECA5C'],
        legend: {},
        tooltip: {},
        dataset: {
          source: this.use.lineData
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20 // 角度顺时针计算的
          }
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
.linechart {
  width: 100%;
  height: 200px;
}
</style>
