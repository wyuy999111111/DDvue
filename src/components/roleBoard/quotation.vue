<template>
  <div class="quotation">
    <PointerTitle params='报价情况' class="PointerTitle" />
    <div class="quotationTitle">
      <div class="abc"></div>
      <p>新转保、续保报价次数趋势图</p>
    </div>
    <div class="quoChart" ref="quoChart">
      <!-- <div ></div> -->
    </div>
    <div class="quotationTitle">
      <div class="abc"></div>
      <p>新转保、续保报价成功率趋势图</p>
    </div>
    <div class="quoChartA" ref="quoChartA">
      <!-- <div ></div> -->
    </div>
  </div>
</template>
<script>
import PointerTitle from '../../common/pointerTitle'
import { RoleshowBjqk } from '../../api/getApi'
export default {
  data () {
    return {
      list: [],
      GetWindowInfo: {
        width: ''
      },
      xSize: 18
    }
  },
  components: {
    PointerTitle
  },
  mounted () {
    this.drowColumn()
    this.drowLine()
  },
  watch: {
    'list' () {
      this.drowColumn()
      this.drowLine()
    },
    '$store.state.role.state' () {
      this.getRoleshowBjqk()
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    // this.getRoleshowBjqk()
  },
  computed: {},
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
    getRoleshowBjqk () {
      const params = {
        id: this.$store.state.role.orglResult,
        sales_channelcode: this.$store.state.role.channelResult,
        year: this.$store.state.role.dateYear,
        month: this.$store.state.role.dateMonth,
        dataDate: this.$store.state.role.date,
        level: this.$store.state.role.orglOption
      }
      RoleshowBjqk(params).then(res => {
        this.list = res.data.data.secondcompanyRoleshowBjqk[0]
      })
    },
    fixNum (value) {
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
    },
    drowColumn () {
      var asd = this.$refs.quoChart
      const myChart = this.$echarts.init(asd)
      const option = {
        legend: {
          data: ['新转保', '续保']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (a) => {
            console.log(a)
            return a[0].axisValue + '月' + '<br />' + a[0].seriesName + '：' + this.fixNum(a[0].data) + '次' + '<br />' + a[1].seriesName + '：' + this.fixNum(a[1].data) + '次'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '月份',
            nameTextStyle: {
              fontSize: 16
            },
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: this.xSize
              },
              margin: 20
            }
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            color: ['#66a1fd'],
            name: '新转保',
            type: 'bar',
            barWidth: '20%',
            data: this.list.dm_reinsur_quonumGdp
          },
          {
            color: ['#8ee498'],
            name: '续保',
            type: 'bar',
            barWidth: '20%',
            data: this.list.dm_renew_quonumGdp
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drowLine () {
      var asd = this.$refs.quoChartA
      const myChart = this.$echarts.init(asd)
      const option = {
        legend: {
          data: ['新转保', '续保']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (a) => {
            return a[0].axisValue + '月' + '<br />' + a[0].seriesName + '：' + a[0].data + '%' + '<br />' + a[1].seriesName + '：' + a[1].data + '%'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '月份',
            nameTextStyle: {
              fontSize: 16
            },
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: this.xSize
              },
              margin: 20
            }
          }
        ],
        yAxis: [
          {
            name: '%',
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
              formatter: '{value}%',
              textStyle: {
                fontSize: this.xSize
              }
            }
          }
        ],
        series: [
          {
            color: ['#66a1fd'],
            name: '新转保',
            type: 'line',
            barWidth: '20%',
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2
                }
              }
            },
            data: this.list.dm_reinsur_quosuc_vinnumGdp
          },
          {
            color: ['#8ee498'],
            name: '续保',
            type: 'line',
            barWidth: '20%',
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2
                }
              }
            },
            data: this.list.dm_renew_quosuc_vinnumGdp
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
<style lang="less" scoped>
.quotation{
  width: 1740px;
  height: 100%;
  padding: 30px;
  background-color: #fff;
}
.quotationTitle{
  width: 400px;
  height: 39px;
  line-height: 39px;
  display: flex;
  border: 1px solid #ccc;
  background-color: #fff;
  align-items: center;
  margin-top: 50px;
  margin-left: 20px;
}
.abc{
  width: 5px;
  height: 24px;
  background-color: #ff6a00;
  margin-left: 20px;
}
.quotationTitle p{
  font-size: 20px;
  margin-left: 15px;
}
.quoChart{
  width: 1632px;
  height: 360px;
  // margin: 30px auto 0;
}
.quoChartA{
  width: 1632px;
  height: 360px;
  // margin: 30px auto 0;
}
#pointerTitle{
  margin-bottom: 65px;
}
</style>
