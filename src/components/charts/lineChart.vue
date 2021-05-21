<template>
<div class="body">
  <div class="discountChart" ref="discountChart" :style="{width: params.width, height: params.height, margin: 'auto'}"></div>
</div>
</template>

<script>

export default {
  name: 'discountChart',
  props: ['params'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chartData: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.drow()
    }, 1000)
  },
  watch: {
    params () {
      this.chartData = this.params[0]
      this.drow()
    }
  },
  methods: {
    drow () {
      const _this = this
      var asd = this.$refs.discountChart
      const myChart = this.$echarts.init(asd)
      const option = {
        tooltip: {
          show: true,
          // trigger: 'axis'
          formatter: '{b}: {c}元'
        },
        xAxis: {
          name: _this.params.xName,
          type: 'category',
          data: _this.params.xData,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1e1e1e',
              fontSize: 18
            }
          },
          axisLine: {
            lineStyle: {
              color: '#1e1e1e'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          // },
          // axisLine: { // y轴
          //   show: false
          }
        },
        grid: {
          left: 85
        },
        yAxis: {
          name: _this.params.yName,
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            formatter: `{value} ${_this.params.company}`,
            // formatter: (a) => {
            //   return (a) => {
            //     if (a >= 10000) {
            //       var str = (a / 10000) + ''
            //       var head = str.split('.')[0]
            //       var tail = str.split('.')[1].slice(0, 2)
            //       var reg = /\d(?=(\d{3})+$)/g
            //       head = head.replace(reg, (content) => {
            //         return content + ','
            //       })
            //       return head + '.' + tail + '万'
            //     } else {
            //       return a
            //     }
            //   }
            // },
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
          // },
          // axisLine: { // y轴
          //   show: false
          }
        },
        series: [{
          data: _this.params.data,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#2FEC38', // 改变折线点的颜色
              lineStyle: {
                color: '#2FEC38' // 改变折线颜色
              }
            }
          }
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
