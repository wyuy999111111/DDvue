 <template>
  <div class="body">
    <div class="productMix" ref='productMix' style="width: 200px; height: 200px; margin: auto"></div>
  </div>
</template>

<script>
export default {
  name: 'productMix',
  props: ['seriesData', 'color'],
  data () {
    return {
    }
  },
  mounted () {
    this.drowMix()
  },
  watch: {
    seriesData () {
      setTimeout(() => {
        this.drowMix()
      }, 1000)
    }
  },
  methods: {
    drowMix () {
      var productMix = this.$refs.productMix
      const myChart = this.$echarts.init(productMix)
      const option = {
        tooltip: {
          trigger: 'item'
          // formatter: (a) => {
          //   return a.
          // }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.seriesData,
            color: this.color
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
