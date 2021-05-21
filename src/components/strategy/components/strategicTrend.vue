<template>
  <div id="strategyUddate">
    <div class="head">
      <span class="tagName">{{this.props.tagName}}</span>
      展示间隔天数:<el-input v-model="dayNum" @change="handleChangeDay" class="days" style="width: 50px; margin: 0 10px" />天
    </div>
    <div id="charts" ref='charts'></div>
  </div>
</template>

<script>

export default {
  name: 'strategyUddate',
  props: ['props'],
  data () {
    return {
      dayNum: 0,
      timeList: []
    }
  },
  created () {
    this.handleChangeDay()
  },
  watch: {
    'props' () {
      this.handleChangeDay()
    }
  },
  methods: {
    drow () {
      const _this = this
      var asd = this.$refs.charts
      const myChart = this.$echarts.init(asd)
      const option = {
        color: ['#76cbff', '#4ecb73', '#abdf99', '#fecb5f', '#f06b58', '#f8ecc9', '#ffc2d1', '#a294ee', '#7676d2', '#ccccff', '#a6eaf8', '99ccff', '#fa5d84', '#ff94aa', '#ffff99', '#a4ffcf', '#33c1c1', '#499ee7', '#0277a5', '#3399cc'],
        legend: {
          bottom: '5%',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '50px',
          left: '50px',
          right: '50px',
          bottom: '50px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.timeList,
          name: '日期'
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      }
      myChart.setOption(option, true)
    },
    handleChangeDay () {
      if (parseInt(this.dayNum) > 0) {
        this.dayNum = parseInt(this.dayNum)
      } else {
        this.dayNum = 0
      }
      const _this = this
      const arr = []
      const timeList = []
      for (let i = 0; i < _this.props.dataList.length; i++) {
        arr[i] = { data: [], type: 'line', name: this.props.dataList[i].enumValueName }
        for (let j = 0; j < this.props.dataList[i].dataList.length; j++) {
          if (j === 0 || ((j % (_this.dayNum + 1)) === 0)) {
            arr[i].data.push(_this.props.dataList[i].dataList[j])
          }
        }
      }
      for (let i = 0; i < this.props.timeList.length; i++) {
        if (i === 0 || ((i % (this.dayNum + 1)) === 0)) {
          timeList.push(this.props.timeList[i])
        }
      }
      this.timeList = timeList
      this.series = arr
      setTimeout(() => {
        this.drow()
      }, 1000)
    }
  }
}
</script>
<style scoped lang="less">
#charts{
  width: 97%;
  height: 360px;
}
#strategyUddate{
  border: 1px solid #D6D6D6;
  margin: auto;
  margin-bottom: 50px;
}
.head{
  margin-top: 20px;
}
.tagName{
  font-size: 18px;
  font-weight: bold;
  margin-right: 50px;
  margin-left: 20px;
}
</style>
