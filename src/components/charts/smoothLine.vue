<template>
<div>
  <div class="smoonthLine" ref="discountChart"></div>
</div>
</template>

<script>

export default {
  name: 'smoonthLine',
  props: ['params', 'watch', 'showType'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chartData: {
        groupSwarmsList: [],
        xAxisData: []
      }
    }
  },
  watch: {
  },
  created () {
    setTimeout(() => {
      this.drow()
    }, 1000)
  },
  methods: {
    drow () {
      console.log(this.params.datalist, this.showType)
      const series = []
      if (this.showType === '0') { // 比率
        for (let i = 0; i < this.params.datalist.length; i++) {
          series.push({
            name: this.params.datalist[i].groupName,
            data: this.params.datalist[i].value,
            type: 'line',
            smooth: true
          })
        }
      } else { // 人数
        for (let i = 0; i < this.params.datalist.length; i++) {
          series.push({
            name: this.params.datalist[i].groupName,
            data: this.params.datalist[i].num,
            type: 'line',
            smooth: true
          })
        }
      }

      var asd = this.$refs.discountChart
      const myChart = this.$echarts.init(asd)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'scroll',
          data: this.params.partList
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.params.dateList,
          name: '日期'
        },
        yAxis: {
          type: 'value',
          name: this.showType === '1' ? '人数' : '比率',
          axisLabel: {
            show: true,
            formatter: `{value}${this.showType === '1' ? '人' : '%'}`
          }
        },
        series
      }
      myChart.setOption(option, true)
    }
  }
}
</script>
<style lang='less' scoped>
.body{
  display: flex;
}
.top{
  font-size: 14px;
  margin-top: 10px;
  margin-left: 8px;
}
.smoonthLine{
  width: 490px;
  height: 200px;
}
</style>
