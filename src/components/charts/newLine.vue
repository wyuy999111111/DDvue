<template>
<div class="body">
  <!-- <span class="top">{{item.title}}</span> -->
  <div class="discountChart" ref="discountChart" :style="{width: offsetWidth ? offsetWidth * item.width + 'px' : '380px', height: '240px', margin: '30px 0 0 0px'}"></div>
</div>
</template>

<script>

export default {
  name: 'newZ',
  props: ['params', 'tabNow', 'item', 'offsetWidth'],
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
    },
    'item.width' () {
      var asd = this.$refs.discountChart
      const myChart = this.$echarts.init(asd)
      myChart.resize()
    }
  },
  methods: {
    drow () {
      const _this = this
      var posList = ['left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight']
      var app = {}
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          myChart.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          })
        }
      }
      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '',
        fontSize: 16,
        rich: {
          name: {
          }
        }
      }

      var asd = this.$refs.discountChart
      const seriesData = []
      const xAxisData = []
      if (this.chartData.flag === '0') {
        for (let i = 0; i < this.chartData.groupSwarmsList.length; i++) {
          seriesData.push({
            value: this.chartData.groupSwarmsList[i].groupValue,
            name: this.chartData.groupSwarmsList[i].groupname,
            count: this.chartData.groupSwarmsList[i].saleCount
          })
          xAxisData.push(this.chartData.groupSwarmsList[i].groupName)
        }
      } else {
        for (let i = 0; i < this.chartData.tempGroupName.length; i++) {
          seriesData.push({
            name: this.chartData.tempGroupName[i],
            barGap: 0,
            type: 'line',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [],
            saleCount: []
          })
        }
        for (let i = 0; i < this.chartData.groupSwarmsList.length; i++) {
          xAxisData.push(this.chartData.groupSwarmsList[i].groupName)
          for (let j = 0; j < this.chartData.groupSwarmsList[i].secondSitGroupSwarmList.length; j++) {
            seriesData[j].data.push({
              value: this.chartData.groupSwarmsList[i].secondSitGroupSwarmList[j].groupValue,
              saleCount: this.chartData.groupSwarmsList[i].secondSitGroupSwarmList[j].saleCount
            })
          }
        }
      }
      const myChart = this.$echarts.init(asd)
      const option = {
        color: ['#76cbff', '#4ecb73', '#abdf99', '#fecb5f', '#f06b58', '#f8ecc9', '#ffc2d1', '#a294ee', '#7676d2', '#ccccff', '#a6eaf8', '99ccff', '#fa5d84', '#ff94aa', '#ffff99', '#a4ffcf', '#33c1c1', '#499ee7', '#0277a5', '#3399cc'],
        legend: {
          type: 'scroll',
          data: seriesData.name
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (a) {
            let text = ''
            for (let i = 0; i < a.length; i++) {
              text += '<div>' + a[i].seriesName + '：' + a[i].data.saleCount + '人(' + a[i].data.value + '%)' + '<div>'
            }
            return text
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          top: '28%',
          containLabel: true
        },
        xAxis: [
          {
            name: _this.params[0].title,
            type: 'category',
            data: xAxisData,
            axisTick: {
              alignWithLabel: true,
              show: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            name: '人数比例' + '\n' + this.params[0].secondTagName,
            nameTextStyle: {
              align: 'left',
              padding: [0, 0, 0, -10]
            },
            type: 'value'
          }
        ],
        series: seriesData
      }
      myChart.setOption(option)
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
</style>
