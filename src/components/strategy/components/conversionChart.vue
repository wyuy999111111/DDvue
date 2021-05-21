<template>
  <div class='conversionChart'>
    <div class="form">
      <el-row>
        <el-form label-width="100px">
          <el-col>
            <el-form-item label="指标：">
              <div class="formToChart">
                {{ params.name }}
                <el-button @click="chartShow" v-if="showSwitch === 'form'">确定</el-button>
                <img src="../../../assets/logo/upDate.png" v-if="showSwitch === 'chart'" @click="showSwitch = 'form'" class="drowImg" />
              </div>
            </el-form-item>
            <div v-if="showSwitch === 'form'">
              <el-form-item label="展示方式：" class="formShow">
                <el-select v-model="form.presidentEunm">
                  <el-option label="按日" value="1"></el-option>
                  <el-option label="按半月" value="2"></el-option>
                  <el-option label="按月" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期区间：" class="formShow" v-if="form.presidentEunm === '1'">
                <el-date-picker
                  :picker-options="pickerTime"
                  type="daterange"
                  v-model="timeList"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item label="显示方式：" class='formShow'>
                <el-select v-model="showType">
                  <el-option label="人数" value="1" />
                  <el-option label="比率" value="0" />
                </el-select>
              </el-form-item>
            </div>
            <div class="charts" v-if="showSwitch === 'chart'">
              <SmoothLine :params='chartData' v-if="chartData.datalist.length" :watch='watch' :showType='showType' />
              <div class="warning" v-if="chartData.datalist.length === 0">暂无数据</div>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  findStrategyPresident
} from '@/api/getApi'
import SmoothLine from '../../charts/smoothLine'

export default {
  name: 'asd',
  props: ['params', 'selectData'],
  components: {
    SmoothLine
  },
  data () {
    return {
      pickerTime: {
        disabledDate (time) {
          return time.getTime() > this.dataRange.strategyEndtime.parse('2021-01-22') || time.getTime() < this.dataRange.strategyStarttime.parse('2021-01-20')
        }
      },
      form: {
        strategyId: '', // 策略id
        id: '', // 标签id
        startDate: '',
        endDate: '',
        presidentEunm: '3' // 展示方式
      },
      timeList: [],
      showSwitch: 'form',
      chartData: '',
      watch: false,
      startTime: '',
      endTime: '',
      showType: '0'
    }
  },
  watch: {
    'params' () { // 筛选框变化 返回表单模式
      this.showSwitch = 'form'
      this.form.presidentEunm = '3'
      this.showType = '0'
      // this.chartShow()
    }
  },
  created () {
    const a = Date.parse(this.selectData.strategyEndTime)
    const b = Date.parse(this.selectData.strategyStartTime)
    this.pickerTime = {
      disabledDate (time) {
        return time.getTime() > a || time.getTime() < b - 86400000
      }
    }
  },
  methods: {
    chartShow () {
      this.form.strategyId = this.$route.query.strategyId ? this.$route.query.strategyId : this.$store.state.strategy.dataId
      this.form.id = this.params.id
      this.form.startDate = this.timeList[1] ? this.timeList[0] + ' 00:00:00' : ''
      this.form.endDate = this.timeList[1] ? this.timeList[1] + ' 23:59:59' : ''
      this.showSwitch = 'chart'
      findStrategyPresident(this.form).then((res) => {
        this.chartData = res.data.data
        this.watch = !this.watch
      })
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .el-button{
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// .conversionChart{
//   display: flex;
// }
.formToChart{
  display: flex;
  justify-content: space-between;
}
.formShow{
  width: 80%;
}
.conversionChart /deep/ .el-input__inner{
  width: 100%;
}
.drowImg{
  width: 20px;
  height: 20px;
}
.warning{
  width: 100%;
  margin-top: 20px;
  font-size: 20px;
  color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  text-align: center;
  font-weight: bold;
}
</style>
