<template>
<div class="lineBarChartCard">
  <StarTitle class="starTitle" :params='params.title' />
  <div class="discountChart" ref="discountChart" ></div>
  <!-- :style="{width: params.width, height: params.height, margin: 'auto'}" -->
</div>
</template>

<script>
import StarTitle from '../../common/starTitle'
export default {
  name: 'discountChart',
  components: { StarTitle },
  props: ['params', 'status'],
  data () {
    return {
      GetWindowInfo: {
        width: ''
      },
      xSize: 18,
      barWidth: 14
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
    status () {
      this.drow()
    }
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      if (this.GetWindowInfo.width === 1366) {
        this.xSize = 14
        this.barWidth = 10
      }
      if (this.GetWindowInfo.width === 1600) {
        this.xSize = 16
        this.barWidth = 12
      }
      if (this.GetWindowInfo.width === 1920) {
        this.xSize = 18
        this.barWidth = 14
      }
    },
    drow () {
      let yAxis = ''
      const _this = this
      console.log(_this.status)
      let series = []
      if (this.params.type === 1) {
        series = [{
          name: _this.params.legendData[0],
          data: _this.params.barData,
          type: 'bar',
          barWidth: this.barWidth,
          itemStyle: {
            normal: {
              color: _this.params.barColor // 改变折线点的颜色
            }
          }
        }]
      } else if (this.params.type === 2) {
        series = [{
          name: _this.params.legendData[1],
          data: _this.params.barData,
          type: 'bar',
          // barWidth: '10',
          // barCategoryGap: 20,
          // barGap: '30%',
          itemStyle: {
            normal: {
              color: _this.params.barColor
            }
          }
        }, {
          name: _this.params.legendData[0],
          data: _this.params.barData2,
          type: 'bar',
          // barWidth: '16',
          // barCategoryGap: 20,
          barGap: '30%',
          itemStyle: {
            normal: {
              color: _this.params.normalColor // 改变折线点的颜色
            }
          }
        }]
      } else if (this.params.type === 3) {
        series = [{
          name: _this.params.legendData[0],
          data: _this.params.lineData,
          type: 'line',
          symbolSize: '6',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: _this.params.normalColor, // 改变折线点的颜色
              lineStyle: {
                color: _this.params.normalColor // 改变折线颜色
              }
            }
          },
          yAxisIndex: 1
        }, {
          name: _this.params.legendData[1],
          data: _this.params.barData,
          type: 'bar',
          barWidth: this.barWidth,
          itemStyle: {
            normal: {
              color: _this.params.barColor
            }
          },
          yAxisIndex: 0
        }]
      } else {
        series = [{
          name: _this.params.legendData[0],
          data: _this.params.lineData,
          type: 'line',
          symbolSize: '6',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: _this.params.normalColor, // 改变折线点的颜色
              lineStyle: {
                color: _this.params.normalColor // 改变折线颜色
              }
            }
          }
        }]
      }
      if (this.params.companyR && this.params.companyR !== '') {
        yAxis = [{
          name: _this.params.yName,
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            // formatter: `{value} ${_this.params.company}`,
            formatter: function (value, index) {
              if (value >= 100000000) {
                return value / 100000000 + '亿'
              } else if (value >= 10000) {
                return value / 10000 + '万'
              } else {
                return value
              }
            },
            textStyle: {
              color: '#aaa',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          }
        }, {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: `{value} ${_this.params.companyR}`,
            textStyle: {
              color: '#aaa',
              fontSize: 14
            }
          },
          min: 0,
          max: 100,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#000'
            },
            show: false
          }
        }]
      } else {
        yAxis = [{
          name: _this.params.yName,
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            formatter: `{value} ${_this.params.company}`,
            textStyle: {
              color: '#aaa',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          }
        }]
      }
      var asd = this.$refs.discountChart
      const myChart = this.$echarts.init(asd)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: a => {
            if (a.length === 1 && a[0].seriesName !== '人均产能') {
              return a[0].axisValue + '月' + '<br />' +
                a[0].seriesName + '：' + a[0].data + '%'
            } else if (a.length === 1 && a[0].seriesName !== 'CPR') {
              return a[0].axisValue + '月' + '<br />' +
                a[0].seriesName + '：' + a[0].data + '元'
            } else if (a.length === 1 && a.company !== '%') {
              return a[0].axisValue + '月' + '<br />' +
                a[0].seriesName + '：' + a[0].data
            } else if (a.length === 2 && a[0].seriesName !== '渠道转入人数') {
              return a[0].axisValue + '月' + '<br />' +
                a[0].seriesName + '：' + a[0].data + '%' + '<br />' +
                a[1].seriesName + '：' + a[1].data
            } else {
              return a[0].axisValue + '月' + '<br />' +
                a[0].seriesName + '：' + a[0].data + '<br />' +
                a[1].seriesName + '：' + a[1].data
            }
            // if (a.length === 2) {
            //   return a[0].axisValue + '月' + '<br />' +
            //     a[0].seriesName + '：' + a[0].data + '%' + '<br />' +
            //     a[1].seriesName + '：' + a[1].data + '%' + '<br />'
            // } else {
            //   return a[0].axisValue + '月' + '<br />' +
            //     a[0].seriesName + '：' + a[0].data + '%'
            // }
          }
        },
        grid: {
          top: '50px',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        legend: {
          data: _this.params.legendData
        },
        // tooltip: {
        //   show: true,
        //   formatter: '{b}:{c}元'
        // },
        xAxis: {
          // name: '月份',
          type: 'category',
          data: _this.params.xData,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1e1e1e',
              fontSize: this.xSize
            },
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: '#1e1e1e'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          }
        },
        yAxis: yAxis,
        series: series
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style scoped>
.starTitle{
  box-sizing: border-box;
  padding-top: 49px;
  margin-bottom: 42px;
  margin-left: 40px;
}
.lineBarChartCard{
  margin-top: 46px;
}
.discountChart{
  width: 504px;
  height: 301px;
  margin: auto;
}
</style>
