<template>
<div class="body">
  <div class="discountChart" ref="discountChart" ></div>
</div>
</template>

<script>

export default {
  name: 'discountChart',
  props: ['params', 'barWidth', 'barColor', 'xData', 'desc'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drow()
  },
  watch: {
    params () {
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
          formatter: _this.desc
        },
        grid: {
          top: '20%',
          left: '5%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.xData,
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: { // y轴
            show: false
          },
          axisLabel: {
            margin: 20,
            fontSize: 14,
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: { // y轴
            show: false
          }
        },
        series: [{
          data: this.params,
          type: 'bar',
          barWidth: this.barWidth,
          color: this.barColor
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    fixNumber (value) {
      var reg = /\d(?=(\d{3})+$)/g
      if (value < 10000) {
        let integer = value + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        return integer
      } else if (value < 100000000) {
        let integer = parseInt(value % 100000000 / 10000) + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        let decimals = (value % 10000 / 10000)
        if (decimals === 0) {
          decimals = '' + '万'
        } else {
          decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
        }
        if (integer === 0) {
          integer = ''
        }
        return integer + decimals
      } else if (value > 100000000) {
        let yi = parseInt(value / 100000000) + ''
        yi = yi.replace(reg, (content) => {
          return content + ','
        })
        let integer = parseInt(value % 100000000 / 10000) + ''
        integer = integer.replace(reg, (content) => {
          return content + ','
        })
        let decimals = (value % 10000 / 10000)
        if (decimals === 0) {
          decimals = ''
        } else {
          decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
        }
        if (integer === 0) {
          integer = ''
        }
        return yi + '亿' + integer + decimals
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.discountChart{
  width: 1264px;
  height: 204px;
}
</style>
