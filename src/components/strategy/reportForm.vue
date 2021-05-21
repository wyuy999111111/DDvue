<template>
  <div id="reportForm">
    <div class="top">
      <HeadTitle params='策略筛选' />
      <el-form label-width="130px">
        <el-row>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="策略名称：">
              <el-select v-model="result.num" @change="handleChangeStrategy" filterable clearable>
                <el-option v-for="(item, index) in strategyList" :key='index' :label="item.strategyName" :value="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="background: white;padding: 0 20px">
      <div class="headTitle">
        <div class="flex spaceBetween"><span style="fontSize: 14px;"><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略关注指标</span></div>
        <div class="border"></div>
      </div>
      <div class="ConversionCharts">
        <ConversionChart v-for="(item, index) in sitStratrgyTegTags" :key="index" :params='item' class="conversionChart" :selectData='selectData' />
      </div>
    </div>
    <!-- 策略趋势 -->
    <div class="top secTop">
      <HeadTitle params='策略趋势'/>
        <el-form label-width="130px" v-if="tableDisplay">
          <el-row>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="日期">
                <el-date-picker v-model="strategicTrends.startTime"
                  format="yyyy-MM-dd"
                  :picker-options="pickerTime"
                  value-format="yyyy-MM-dd" />
                <el-date-picker v-model="strategicTrends.endTime"
                  format="yyyy-MM-dd"
                  :picker-options="pickerTime"
                  value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item :label="conpamyTitle">
                <el-select v-model="strategicTrends.companyCode" clearable filterable>
                  <el-option v-for="(item, index) in orgList" :key='index' :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="渠道">
                <el-select v-model="strategicTrends.salesChannelcode" clearable filterable>
                  <el-option v-for="(item, index) in channelList" :key='index' :label="item.sales_channename" :value="item.sales_channelcode" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" class="form_el-col">
              <el-form>
                <el-form-item>
                  <div class="btnList">
                    <el-button @click="handlefindStrategicTrends" :loading='loadingStrategicTrends'><img src="../../assets/indexImg/查询_1.png" />查询</el-button>
                    <el-button @click="startStrategicTrends"><img src="../../assets/indexImg/重置_1.png" />重置</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <StrategicTrend v-for="(item, index) in strategicTrendsDataSourse" :key='index' :props='item' />
    </div>
    <div class="top">
      <div class="headTitle">
        <div class="flex spaceBetween">
          <span style="fontSize: 14px;"><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">查询结果</span>
          <div class="flex">
          <span @click="handleDown" class="cursor downBtn" style="marginRight: 10px;"><img src='../../assets/logo/downOne.png' />报表下载</span>
          <span @click="handleDownTwo" class="cursor downBtn"><img src='../../assets/logo/downTwo.png' />明细下载</span>
          </div>
        </div>
        <div class="border"></div>
      </div>
      <div v-if="tableDisplay">
        <el-form label-width="130px">
          <el-row>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="日期">
                <el-date-picker v-model="result.strategyDate"
                  format="yyyy-MM-dd"
                  :picker-options="pickerTime"
                  value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item :label="conpamyTitle">
                <el-select v-model="result.companyCode" clearable filterable>
                  <el-option v-for="(item, index) in orgList" :key='index' :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="渠道">
                <el-select v-model="result.salesChannelcode" clearable filterable>
                  <el-option v-for="(item, index) in channelList" :key='index' :label="item.sales_channename" :value="item.sales_channelcode" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" class="form_el-col">
              <el-form>
                <el-form-item>
                  <div class="btnList">
                    <el-button @click="handlefind" :loading='loading'><img src="../../assets/indexImg/查询_1.png" />查询</el-button>
                    <el-button @click="start"><img src="../../assets/indexImg/重置_1.png" />重置</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          :data="dataSourse"
          class="anyHead"
          :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        >
          <el-table-column prop='salesComname' :label="conpamyTitle" align="center" />
          <el-table-column v-for="(item, index) in rules" :key='index' :label="item.name" align="center">
            <el-table-column
              v-for="(child, childIndex) in item.child"
              :prop="child.key"
              :key='childIndex'
              :label='child.name'
              align="center"
            >
            <template slot-scope="scope">
              <!-- 123 -->
              <!-- {{scope.row.length}} -->
              <div v-if="scope.row.length">{{scope.row[handleConsole(index, childIndex)].countNum}}</div>
              <div v-if="!scope.row.length" >{{ scope.row[child.key] || scope.row[handleConsole(index, childIndex)] || 0 }}</div>
            </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      <div class="page">
        <el-pagination
          ref='page'
          @size-change="handleSizeChange"
          :current-page="result.pageNow"
          @current-change="handleCurrentChange"
          :page-size="result.pagesize"
          :page-sizes="[10,20,30,40,50]"
          background
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next ,sizes, jumper, total"
        ></el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  findStrategyList,
  findStrategyReportChannelList,
  findStrategyReportOrgList,
  // findStrategyReportListByStrategyList,
  findStrategyReportList,
  getStrategySelectOne,
  findStrategyListTotal,
  findStrategyTrendChart
} from '@/api/getApi'

import ConversionChart from './components/conversionChart'
import HeadTitle from '../../common/HeadTitle'
import StrategicTrend from './components/strategicTrend'

export default {
  name: 'reportForm',
  components: {
    HeadTitle,
    ConversionChart,
    StrategicTrend
  },
  data () {
    return {
      loading: false,
      pickerTime: {
        disabledDate (time) {
          return time.getTime() > this.dataRange.strategyEndtime.parse('2021-01-22') || time.getTime() < this.dataRange.strategyStarttime.parse('2021-01-20')
        }
      },
      dataSourse: [],
      strategyList: [],
      result: {
        companyCode: '',
        salesChannelcode: '',
        strategyId: '',
        strategyName: '',
        pageNow: '1',
        pageSize: '10',
        strategyDate: '',
        level: '',
        num: ''
      },
      strategicTrends: {
        companyCode: '',
        salesChannelcode: '',
        strategyId: '',
        startTime: '',
        endTime: '',
        level: ''
      },
      strategicTrendsDataSourse: [],
      totalCount: '',
      dateRange: {
        strategyStarttime: '',
        strategyEndtime: ''
      },
      conpamyTitle: '',
      channelList: [],
      orgList: [],
      rules: [],
      tableDisplay: false,
      sitStratrgyTegTags: [],
      selectData: '',
      allData: [],
      allDataStatus: false,
      loadingStrategicTrends: false
    }
  },
  created () {
    this.getStrategyList()
    this.getChannelList()
    this.getOrgList()
  },
  watch: {
  },
  methods: {
    getStrategyList () {
      findStrategyList().then((res) => {
        this.strategyList = res.data.data
      })
    },
    getChannelList () {
      findStrategyReportChannelList().then((res) => {
        this.channelList = res.data.data
      })
    },
    getOrgList () {
      findStrategyReportOrgList().then((res) => {
        this.result.level = res.data.data[0].level
        this.strategicTrends.level = res.data.data[0].level
        if (res.data.data[0].level === '2') {
          this.conpamyTitle = '分公司'
        } else if (res.data.data[0].level === '3') {
          this.conpamyTitle = '中支公司'
        } else if (res.data.data[0].level === '4') {
          this.conpamyTitle = '团队'
        }
        this.orgList = res.data.data
      })
    },
    handleChangeStrategy (e) {
      this.result.strategyId = this.strategyList[this.result.num].strategyId
      this.result.strategyName = this.strategyList[this.result.num].strategyName
      this.$store.state.strategy.dataId = this.result.strategyId
      this.setDateRange(this.strategyList[this.result.num].strategyId)
      getStrategySelectOne({ strategyId: this.result.strategyId }).then((res) => {
        this.sitStratrgyTegTags = res.data.data.sitStratrgyTegTags
        this.selectData = res.data.data
        this.handlefindStrategicTrends()
      })
      this.dataSourse = []
      this.result.pageNow = 0
      this.totalCount = 0
      this.rules = []
    },
    getTableCallback (res) {
      console.log(res)
      this.allDataStatus = false
      const arr = []
      arr[0] = this.allData
      var arr1 = arr.concat(res.data.data.list)
      arr1[0].salesComname = '总数'
      this.dataSourse = arr1
      this.totalCount = res.data.data.totalCount
      const newArr = []
      const nameArr = []
      if (res.data.data.list.length !== 0) {
        const rules = res.data.data.list[0].mapTagName
        for (const obj in rules) {
          console.log(obj, rules)
          console.log(rules[obj])
          if (nameArr.indexOf(rules[obj][0]) !== -1) {
            for (let i = 0; i < newArr.length; i++) {
              if (newArr[i].name === rules[obj][0]) {
                newArr[i].child.push({
                  name: rules[obj][1],
                  key: obj
                })
              }
            }
          } else {
            nameArr.push(rules[obj][0])
            newArr.push({
              name: rules[obj][0],
              child: [{
                name: rules[obj][1],
                key: obj
              }]
            })
          }
        }
      }
      this.rules = newArr
      console.log(this.rules, this.dataSourse)
      setTimeout(() => {
        var obj = document.getElementsByClassName('el-table__row')
        obj[0].style.background = '#F5F7FA'
      }, 0)
    },
    handleConsole (index, childIndex) {
      let length = 0
      for (let i = 0; i < index; i++) {
        length += this.rules[i].child.length
      }
      return length + childIndex
    },
    setDateRange (e) {
      var myDate = new Date()
      let month = myDate.getMonth() + 1
      let day = myDate.getDate()
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      const nowDate = myDate.getFullYear() + '-' + month + '-' + day
      // this.strategicTrends.endTime = nowDate
      if (e) {
        this.tableDisplay = true
      }
      for (let i = 0; i < this.strategyList.length; i++) {
        if (this.strategyList[i].strategyId === e) {
          const a = Date.parse(this.strategyList[i].strategyEndtime)
          const b = Date.parse(this.strategyList[i].strategyStarttime)
          if (this.strategyList[i].strategyEndtime >= nowDate && nowDate >= this.strategyList[i].strategyStarttime) {
            this.result.strategyDate = nowDate
            this.strategicTrends.endTime = nowDate
          } else {
            this.result.strategyDate = this.strategyList[i].strategyEndtime
            this.strategicTrends.endTime = this.strategyList[i].strategyEndtime
          }
          this.strategicTrends.startTime = this.strategyList[i].strategyStarttime
          this.pickerTime = {
            disabledDate (time) {
              return time.getTime() > a || time.getTime() < b - 86400000
            }
          }
        }
      }
    },
    handlefind () {
      this.loading = true
      this.result.pageNow = 1
      if (this.$refs.page) {
        this.$refs.page.internalCurrentPage = 1
      }
      findStrategyListTotal(this.result).then((res) => {
        this.allData = res.data.data
        this.allDataStatus = true
        findStrategyReportList(this.result).then((res) => {
          this.loading = false
          this.getTableCallback(res)
        })
      })
    },
    start () {
      this.result.companyCode = ''
      this.result.salesChannelcode = ''
    },
    handleSizeChange (e) {
      this.result.pageSize = e
      findStrategyReportList(this.result).then((res) => {
        this.loading = false
        this.getTableCallback(res)
      })
    },
    handleCurrentChange (e) {
      this.result.pageNow = e
      findStrategyReportList(this.result).then((res) => {
        this.loading = false
        this.getTableCallback(res)
      })
    },
    getNum () {
    },
    handlefindStrategicTrends () {
      this.loadingStrategicTrends = true
      this.strategicTrends.strategyId = this.result.strategyId
      findStrategyTrendChart(this.strategicTrends).then((res) => {
        this.strategicTrendsDataSourse = res.data.data
        this.loadingStrategicTrends = false
      }).catch(() => {
        this.loadingStrategicTrends = false
      })
    },
    startStrategicTrends () {
      this.strategicTrends.companyCode = ''
      this.strategicTrends.salesChannelcode = ''
    },
    handleDown () {
      const url = location.host
      window.open(
        `http://${url}/sit-web/sit/strategyReport/uploadSales?companyCode=${this.result.companyCode}&salesChannelcode=${this.result.salesChannelcode}&strategyId=${this.result.strategyId}&strategyDate=${this.result.strategyDate}&level=${this.result.level}&strategyName=${this.result.strategyName}`
      )
    },
    handleDownTwo () {
      const url = location.host
      window.open(
        `http://${url}/sit-web/sit/strategyReport/uploadSalesDetail?companyCode=${this.result.companyCode}&salesChannelcode=${this.result.salesChannelcode}&strategyId=${this.result.strategyId}&strategyDate=${this.result.strategyDate}&level=${this.result.level}&strategyName=${this.result.strategyName}`
      )
    }
  }
}
</script>
<style scoped lang="less">
#reportForm{
  width: 98%;
  margin: 10px auto;
  height: 100%;
}
.top{
  background: white;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0 20px;
}
.anyHead /deep/ .el-table__header-wrapper {
  background-color: #e6e9f2;
  height: 80px !important;
  display: flex;
  align-items: center;
}
/deep/ .el-button:hover{
  color: #fff !important;
  border-color: none !important;
  background-color: #02a4ff !important;
}
.el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  padding: 0;
  // display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    vertical-align: text-bottom;
  }
}
.el-select{
  width: 95%;
}
.el-input{
  width: 95%;
}
.btnList{
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 32px;
  justify-content: flex-end;
  margin-right: 30px;
}
.page {
  background-color: #fff;
  height: 60px;
  margin-right: 40px;
  .el-pagination {
    float: right;
    margin-top: 20px;
    /deep/ button {
      text-align: center;
      span {
        padding: 6px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding-top: 0px;
      }
    }
  }
  /deep/ .el-pagination .el-select .el-input .el-input__inner{
    height: 28px!important;
  }
  /deep/ .el-pagination__editor.el-input .el-input__inner {
    height: 28px !important;
  }
}
.headTitle{
  margin-top: 20px;
  font-size: 14px;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0px 22px;
  box-sizing: border-box;
  .flex{
    display: flex;
    height: 48px;
    font-size: 14px;
    color: #33aed3;
    font-weight: bold;
    align-items: center;
    #headLogo{
      width: 14px;
      height: 14px;
      padding: 0px 12px 0px 5px;
    }
  }
  .border{
    // width: calc(100% - 20px);
    background: #d0d0d0;
    margin-bottom:26px;
    height: 1px;
  }
}
.ConversionCharts{
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  background: white;
}
.strategyTitle{
  // width: 100%;
  height: 70px;
  color: #5CBEDC;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 45px;
  box-sizing: border-box;
}
.strategyTitle img {
  margin-right: 20px;
}
.conversionChart{
  width: 532px;
  height: 275px;
  border: 1px solid #D7D7D7;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px 20px;
}
.top /deep/ .el-form-item__content{
  display: flex;
}
.spaceBetween{
  justify-content: space-between;
}
.cur{
  cursor: pointer;
}
.secTop{
  padding-bottom: 20px;
}
.downBtn{
  display: flex;
  align-items: center;
  color: black;
  font-size: 12px;
  cursor: pointer;
  font-weight: normal;
  img{
    margin-right: 5px;
  }
}
</style>
