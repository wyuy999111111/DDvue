<template>
  <div class="behavioralChart" ref="behavioralChart" >
  </div>
</template>

<script>
export default {
  name: 'behavioralChart',
  props: ['params'],
  data () {
    return {
      GetWindowInfo: {
        width: ''
      },
      xSize: 18
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    setTimeout(() => {
      this.drow()
    }, 1000)
  },
  watch: {
    params () {
      this.drow()
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
    drow () {
      const _this = this
      var abc = this.$refs.behavioralChart
      const myChart = this.$echarts.init(abc)
      const option = {
        grid: {
          left: _this.params.left,
          right: _this.params.right,
          bottom: _this.params.bottom,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: a => {
            return a[0].axisValue + '月' + '<br />' +
            a[0].seriesName + '：' + a[0].data + '次' + '<br />' +
            a[1].seriesName + '：' + a[1].data + '次' + '<br />' +
            a[2].seriesName + '：' + a[2].data + '次'
          }
        },
        legend: {
          data: _this.params.legendData
        },
        xAxis: {
          name: '月份',
          nameTextStyle: {
            fontSize: 16
          },
          type: 'category',
          data: _this.params.xData,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: this.xSize
            },
            margin: 20
          }
        },
        yAxis: {
          name: '次数',
          nameTextStyle: {
            fontSize: 16
          },
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: this.xSize
            }
          }
        },
        series: [
          {
            color: _this.params.seriesColorA,
            name: _this.params.seriesAname,
            data: _this.params.seriesA,
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            color: _this.params.seriesColorB,
            name: _this.params.seriesBname,
            data: _this.params.seriesB,
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            color: _this.params.seriesColorC,
            name: _this.params.seriesCname,
            data: _this.params.seriesC,
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            color: _this.params.seriesColorD,
            name: _this.params.seriesDname,
            data: _this.params.seriesD,
            type: 'line',
            symbol: 'none',
            smooth: true
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
.behavioralChart{
  width: 1432px;
  height: 400px;
}
</style>
