<template>
<div class="body">
  <!-- <span class="top">{{item.title}}</span> -->
  <div class="discountChart" ref="discountChart"></div>
</div>
</template>

<script>

export default {
  name: 'discountChart',
  props: ['params', 'tabNow', 'item', 'status'],
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
    },
    'status' () {
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
          left: '60%',
          bottom: '5%',
          data: legendList
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        tooltip: {
          trigger: 'item',
          position: function (p) { // 其中p为当前鼠标的位置
            return [p[0] + 10, p[1]]
          },
          formatter: (a) => {
            return a.name + '：' + a.value + '人' + '(' + a.percent + '%' + ')'
          },
          extraCssText: 'height:20px;',
          show: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
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
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.body{
  display: flex;
}
.top{
  font-size: 14px;
  margin-top: 10px;
  margin-left: 8px;
}
.discountChart{
  width: 380px;
  height: 250px;
  margin: 30px 0 0 0px;
}
</style>
