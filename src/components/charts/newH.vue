<template>
<div class="body">
  <!-- <span class="top">{{item.title}}</span> -->
  <div class="discountChart" ref="discountChart" :style="{width: offsetWidth ? offsetWidth * item.width + 'px' : '380px', height: '250px', margin: '30px auto'}"></div>
</div>
</template>

<script>

export default {
  name: 'discountChart',
  props: ['params', 'tabNow', 'item'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chartData: {
        groupSwarmsList: [],
        xAxisData: []
      }
    }
  },
  created () {
    setTimeout(() => {
      this.chartData = this.params[0]
      this.drow()
      console.log('created')
    }, 1000)
  },
  watch: {
    params () {
      this.chartData = this.params[0]
      this.drow()
    },
    tabNow () {
      this.chartData = this.params[0]
      this.drow()
    }
  },
  methods: {
    drow () {
      var asd = this.$refs.discountChart
      const seriesData = []
      const legendList = []
      for (let i = 0; i < this.chartData.groupSwarmsList.length; i++) {
        legendList.push(this.chartData.groupSwarmsList[i].groupName)
        seriesData.push({
          value: this.chartData.groupSwarmsList[i].groupValue,
          name: this.chartData.groupSwarmsList[i].groupName,
          count: this.chartData.groupSwarmsList[i].saleCount
        })
      }
      const myChart = this.$echarts.init(asd)
      const option = {
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '67%',
          bottom: '5%',
          data: legendList
        },
        tooltip: {
          trigger: 'item',
          position: function (p) { // 其中p为当前鼠标的位置
            return [p[0] + 10, p[1]]
          },
          extraCssText: 'height:20px;',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter: (a) => {
            return a.data.name + '：' + a.data.count + '人 ' + '(' + a.data.value + '%' + ')'
          },
          show: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            color: ['#76cbff', '#4ecb73', '#abdf99', '#fecb5f', '#f06b58', '#f8ecc9', '#ffc2d1', '#a294ee', '#7676d2', '#ccccff', '#a6eaf8', '99ccff', '#fa5d84', '#ff94aa', '#ffff99', '#a4ffcf', '#33c1c1', '#499ee7', '#0277a5', '#3399cc'],
            name: '',
            radius: ['55%', '75%'],
            type: 'pie',
            barWidth: '80%',
            data: seriesData,
            center: ['35%', '50%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.body{
  // position: relative;
  display: flex;
}
.top{
  // position: absolute;
  // top: 10px;
  // left: 0;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 8px;
  // width: 100px;
  // height: 20px;
}
// .discountChart{
//   margin-top: 25px;
// }
</style>
