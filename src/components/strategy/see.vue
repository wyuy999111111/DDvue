<template>
  <div id="strategyUddate">
    <div class="strategyTitle"><img src="../../assets/logo/title.png" />策略查看</div>
      <!-- <div class="test">
        <h2>一次生成一个表达式</h2>
        <div>v
          <el-button @click="open">打开第一种cron表达式选择</el-button>
        </div>
        <p>最终生成的表达式为：{{ result }}</p>
        <h2>一次生成两个表达式</h2>
        <div>
          <el-button @click="open2">打开第二种cron表达式选择</el-button>
          <p>最终生成的开始时间表达式为：{{ resultForm.cpmEveryStartCron }}</p>
          <p>最终生成的结束时间表达式为：{{ resultForm.cpmEveryEndCron }}</p>
        </div>
      </div> -->
    <!-- <span class="title">策略创建</span> -->
    <div class="content">
      <HeadTitle params='基本信息' />
      <el-row>
        <el-form :gutter="24" label-width="120px" class="form" >
          <el-col :span="12">
            <el-form-item label="策略名称：">
              <el-input v-model="$store.state.strategy.strategyName" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择群组：">
              <div style="margin-top:0px" class="flex alignItem">
                <el-input v-model="$store.state.strategy.groupName" readonly />
                <el-button @click="gotoGroupManagement">查看群组</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略描述：">
              <el-input type="textarea" v-model="$store.state.strategy.strategyDesc" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期：">
              <el-date-picker
                readonly
                v-model="$store.state.strategy.strategyStartTime"
                type="date"
                placeholder="开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期：">
              <el-date-picker
                v-model="$store.state.strategy.strategyEndTime"
                readonly
                type="date"
                placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对接系统：">
              <el-select v-model="$store.state.strategy.dockSystems" disabled>
                <!-- <el-option value="1" label="大地行"></el-option> -->
                <el-option value="2" label="营销互动平台"></el-option>
                <!-- <el-option value="3" label="全部"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送字段：">
              <el-input type="textarea" v-model="$store.state.strategy.tagNames" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送方式：">
              <el-select v-model="$store.state.strategy.sendType" disabled>
                <el-option label="属性方式" value="1" v-if="$store.state.user.roleName === '系统管理员'"></el-option>
                <el-option label="事件方式" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略频率：">
              <div class="alignItem">
                <el-input v-model="cron" readonly />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息发送频率：">
              <div class="alignItem">
                <el-input v-model="sendShow" readonly />
              </div>
            </el-form-item>
          </el-col>

        </el-form>
      </el-row>
      <div class="headTitle">
        <div class="flex spaceBetween"><span style="fontSize: 14px;"><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略动作</span></div>
        <div class="border"></div>
      </div>
      <Action v-for="(item, index) in $store.state.strategy.sitConditions" :key='index' :params='index' typeParams='readonly' />
      <AdminSend :props='{typeParams: true}' />
      <div class="headTitle">
        <div class="flex spaceBetween"><span style="fontSize: 14px;"><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略关注指标</span></div>
        <div class="border"></div>
      </div>
      <div class="ConversionCharts">
        <ConversionChart v-for="(item, index) in $store.state.strategy.sitStratrgyTegTags" :key="index" :params='item' class="conversionChart" :selectData='selectData'/>
      </div>
      <div class="headTitle">
        <div class="flex spaceBetween"><span style="fontSize: 14px;"><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略日志</span></div>
        <div class="border"></div>
      </div>
      <el-table :data="dataSourse" border style="margin: auto; width: 98%" :header-cell-style="{ background: '#E6E9F2', color: '#000', fontWeight: '400'}">
        <el-table-column width="150" align="center" label="策略名称" prop='strategyName'></el-table-column>
        <!-- <el-table-column width="150" align="center" label="策略ID" prop='strategyId'></el-table-column> -->
        <!-- <el-table-column width="150" align="center" label="批次" prop='execuaction'></el-table-column> -->
        <el-table-column width="150" align="center" label="推送人数" prop='personCount'></el-table-column>
        <el-table-column width="150" align="center" label="发送系统" prop='sendSystem' :formatter="sendSystemFormatter"></el-table-column>
        <el-table-column width="150" align="center" label="状态" prop='status' :formatter="statusFormatter"></el-table-column>
        <!-- <el-table-column width="150" align="center" label="备注" prop='content'></el-table-column> -->
        <!-- <el-table-column width="150" align="center" label="创建时间" prop='createTime'></el-table-column> -->
        <!-- <el-table-column width="150" align="center" label="更新时间" prop='updateTime'></el-table-column> -->
        <el-table-column align="center" label="推送字段" prop='filedsName'></el-table-column>
        <el-table-column width="150" align="center" label="发送时间" prop='runTime'></el-table-column>
      </el-table>
        <div class="page">
          <el-pagination
            :pager-count="7"
            @current-change="handleCurrentChange"
            :page-size="10"
            background
            :total="totalCount"
            prev-text="上一页"
            next-text="下一页"
            layout="prev ,pager ,next , jumper, total"
          ></el-pagination>
        </div>
      <div class="btnList">
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <CronUi ref="CronUi" @cronResult="resultValue"></CronUi>
    <div class="footer"></div>

    <el-dialog :visible.sync='sendVisible' title='发送频率' class="sendDialog">
      <div>根据策略频率</div>
        <el-radio v-model="radio" label="day">每日</el-radio>
        <el-radio v-model="radio" label="week">每周</el-radio>
        <el-radio v-model="radio" label="month">每月</el-radio>
        <div v-if="radio === 'day'" class="sendList"></div>
        <div v-if="radio === 'week'" class="sendList">
            <el-checkbox-group v-model="checkListWeek">
              <el-checkbox label="1" value='1'>周一</el-checkbox>
              <el-checkbox label="2">周二</el-checkbox>
              <el-checkbox label="3">周三</el-checkbox>
              <el-checkbox label="4">周四</el-checkbox>
              <el-checkbox label="5">周五</el-checkbox>
              <el-checkbox label="6">周六</el-checkbox>
              <el-checkbox label="7">周日</el-checkbox>
            </el-checkbox-group>
        </div>
        <div v-if="radio === 'month'" class="sendList">
            <el-checkbox-group v-model="checkListMonth">
              <el-checkbox v-for="(item, index) in monthList" :key='index' :label="item"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div>
          <div>
            例外
          </div>
            <el-checkbox-group v-model="sendEles">
              <el-checkbox label="6">周六不发</el-checkbox>
              <el-checkbox label="7">周日不发</el-checkbox>
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sendFrequency">确 定</el-button>
          <el-button type="primary" @click="tageNameVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
    <el-dialog :visible.sync="messageSetVisible" title='统计指标设置' class='dialog_footer messageDialogDiv' width="689px" :close-on-click-modal="false">
      <div class="logo_message"></div>
      <div class="messageDialog">
        <div class="messageDialogLeft">
          <div class="messageListTitle">统计指标列表</div>
          <div class="messageListName"
            :style="{background: message.nowNum === index ? '#ECECEC' : '#F7F7F7'}"
            v-for="(item, index) in message.list"
            :key='index'
            @click="handleChangeMessage(index)"
            >
              {{item.tagName}}
              <img src="../../assets/logo/delete.png" class="deleteIcon" @click="handleDelete(index)" />
          </div>
          <div class="addMessageListBtn" @click="addMessageList">新增统计指标</div>
        </div>
        <div class="messageDialogRight">
          <el-form style="width: 100%" class="messageDialogForm">
            <el-form-item label="统计指标名称:">
              <el-input v-model="message.nowList.tagName" />
            </el-form-item>
            <el-table class="messageDialogTable" :data="message.nowList.enumValueList" height="200">
              <el-table-column label="枚举值">
                <template slot-scope="res">{{res.row}}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="res"><div @click='deleteMessageList(res)'>删除</div></template>
              </el-table-column>
            </el-table>
            统计指标名称：
            <span class="behand"><el-input v-model="message.nowList.nameAdd" /></span>
            <el-button @click="handleAddMessageList">添加</el-button>
            <el-button @click="handleSubMessageList">保存统计指标</el-button>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import Action from './components/action'
import CronUi from './components/cron/cron-ui/index'
import ConversionChart from './components/conversionChart'
import AdminSend from './components/adminSend'
import {
  postGroupOld,
  queryStrategyLog,
  cronParse,
  getStrategySelectOne,
  getStrategyReturnDate,
  setStrategyReturnDate
} from '@/api/getApi'
import { getGroupTemplates } from '@/api/nameList'

export default {
  name: 'asd',
  components: {
    HeadTitle, Action, CronUi, ConversionChart, AdminSend
  },
  data () {
    return {
      message: {
        nowNum: 0,
        nowList: {
          tagName: '',
          enumValueList: [],
          nameAdd: ''
        },
        list: []
      },
      messageSetVisible: false,
      sendShow: '',
      checkListWeek: [],
      checkListMonth: [],
      monthList: [],
      sendEles: [],
      radio: 'day',
      sendVisible: false,
      form: {}, // 条件数据
      situationList: [1], // 情况数据
      newData: '123',
      testInp: 123,
      result: '',
      resultForm: {
        cpmEveryStartCron: '',
        cpmEveryEndCron: ''
      },
      filterText: '',
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      totalCount: 1,
      pageNow: 1,
      dataSourse: [],
      cron: '',
      selectData: ''
    }
  },
  created () {
    if (this.$route.query.firId) {
      getStrategyReturnDate(this.$route.query.firId).then((res) => {
        if (res.data.data.messageCronType === '1') { // 每周
          this.checkListWeek = res.data.data.sendDay.split(',')
          this.radio = 'week'
        } else if (res.data.data.messageCronType === '2') { // 每月
          this.checkListMonth = res.data.data.sendDay.split(',')
          this.radio = 'month'
        } else {
          this.radio = 'day'
        }
        this.$store.state.strategy = res.data.data
        this.sendFrequency()
        this.message.list = res.data.data.tagEnumList
        if (res.data.data.tagEnumList[0]) {
          this.message.nowList = res.data.data.tagEnumList[0]
        }
        const params = {
          strategyId: this.$store.state.strategy.dataId,
          pageNow: this.pageNow
        }
        cronParse(this.$store.state.strategy.cron).then((res) => {
          this.cron = this.$store.state.strategy.cron + res.data.data
          console.log(this.cron)
        })
        queryStrategyLog(params).then((res) => {
          console.log(res)
          this.dataSourse = res.data.data.list
          this.totalCount = res.data.data.totalCount
          console.log(this.dataSourse)
        })
      })
    } else {
      this.getData()
    }
  },
  watch: {
    filterText (val) {
      this.$refs.treeStrategy.filter(val)
    },
    '$store.state.strategy.cron' () {
      cronParse(this.$store.state.strategy.cron).then((res) => {
        this.cron = this.$store.state.strategy.cron + res.data.data
      })
    }
    // '$store.state.strategy.cron' () {
    //   cronParse(this.$store.state.strategy.cron).then((res) => {
    //     this.cron = this.$store.state.strategy.cron + res.data.data
    //     console.log(this.cron)
    //   })
    // }
  },
  methods: {
    handleDelete (index) { // 删除列表
      const arr = this.message.list.slice(0)
      arr.splice(index, 1)
      this.message.list = arr
      this.message.nowNum = this.message.list.length
      this.message.nowList = {
        tagName: '',
        enumValueList: [],
        nameAdd: ''
      }
      this.$store.state.strategy.tagEnumList = arr
      for (let i = 0; i < this.$store.state.strategy.sitConditions.length; i++) {
        const arr = this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList.slice(0)
        arr.splice(index, 1)
        this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList = arr
      }
    },
    handleChangeMessage (index) { // 切换标签
      this.message.nowNum = index
      const arr = JSON.parse(JSON.stringify(this.message.list[index]))
      this.message.nowList = arr
    },
    handleSubMessageList () { // 保存标签
      let can = true
      for (let i = 0; i < this.message.list.length; i++) {
        if (this.message.list[i].tagName === this.message.nowList.tagName && this.message.nowNum !== i) {
          this.$message.warning('名称重复')
          can = false
          return
        }
      }
      if (!can) {
        return
      }
      if (this.message.nowList.tagName === '') {
        this.$message.warning('请输入统计指标名称')
      } else if (this.message.nowList.enumValueList.length === 0) {
        this.$message.warning('请添加枚举值')
      } else {
        for (let i = 0; i < this.$store.state.strategy.sitConditions.length; i++) {
          this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList.push({
            enumValue: ''
          })
        }
        const arr = this.message.list.slice(0)
        arr[this.message.nowNum] = this.message.nowList
        this.message.list = arr
        this.$store.state.strategy.tagEnumList = arr
        console.log(this.$store.state.strategy.tagEnumList)
      }
    },
    handleAddMessageList () { // 添加枚举值
      let canAdd = true
      for (let i = 0; i < this.message.nowList.enumValueList.length; i++) {
        if (this.message.nowList.nameAdd === this.message.nowList.enumValueList[i].value) {
          this.$message.warning('有重复')
          canAdd = false
          return
        }
      }
      if (canAdd) {
        const enumValueList = this.message.nowList.enumValueList
        enumValueList.push(this.message.nowList.nameAdd)
        this.message.nowList.enumValueList = enumValueList
        this.message.nowList.nameAdd = ''
      }
    },
    deleteMessageList (res) { // 删除枚举值
      this.message.nowList.enumValueList.splice(res.$index, 1)
    },
    addMessageList () { // 新增标签
      this.message.nowList = {
        tagName: '',
        enumValueList: [],
        nameAdd: ''
      }
      this.message.nowNum = this.message.list.length
    },
    messageSet () { // 标签弹窗
      this.messageSetVisible = true
    },
    sendFrequency () {
      let str = ''
      if (this.radio === 'day') {
        this.$store.state.strategy.messageCronType = 0
        str += '根据策略频率每日发送'
      } else if (this.radio === 'month') {
        this.$store.state.strategy.messageCronType = 2
        this.$store.state.strategy.sendDay = this.checkListMonth.toString()
        str += '根据策略频率每月'
        str += '<' + this.$store.state.strategy.sendDay + '>' + '发送'
      } else {
        this.$store.state.strategy.messageCronType = 1
        this.$store.state.strategy.sendDay = this.checkListWeek.toString()
        str += '根据策略频率每周'
        str += '<' + this.$store.state.strategy.sendDay + '>' + '发送'
      }
      if (this.sendEles.length === 1 && this.sendEles[0] === '6') {
        str += '<周六不发>'
      } else if (this.sendEles.length === 1 && this.sendEles[0] === '7') {
        str += '<周日不发>'
      } else if (this.sendEles.length === 2) {
        str += '<周末不发>'
      }
      this.sendVisible = false
      this.sendShow = str
      this.$store.state.strategy.exceptionDay = this.sendEles.length !== 0 ? this.sendEles.toString() : 0
    },
    // tagValueTypeFormatter (scope) {
    //   let content = ''
    //   if (scope.row.status === '1') {
    //     content = '待审核'
    //   } else if (scope.row.status === '2') {
    //     content = '待审核'
    //   }
    //   return scope.row
    // },
    statusFormatter (e) {
      console.log(e)
      if (e.status === '1') {
        return '成功'
      } else {
        return '失败'
      }
    },
    sendSystemFormatter (e) {
      let string = ''
      if (e.sendSystem === '1') {
        string = '大地行'
      } else {
        string = '营销互动'
      }
      return string
    },
    goBack () {
      console.log(this.$route.query)
      this.$router.push('/strategy/query')
    },
    filterNode (value, data) {
      console.log(value, data)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    open () {
      this.$refs.CronUi.dialogVisible = true
    },
    open2 () {
      this.$refs.CronUiSecond.dialogVisible = true
    },
    // 一次一个表达式---最终产生出来的cron表达式
    resultValue (data) {
      console.log(data)
      this.form.cron = data
      this.$store.state.strategy.cron = data
      console.log(this.form)
      // this.result = data
    },
    // 一次两个表达式---规则配置-确定
    confirmCron (data) {
      this.resultForm.cpmEveryStartCron = data.result
      this.resultForm.cpmEveryEndCron = data.resultEnd
    },
    getData () {
      const params = { strategyId: this.$route.query.strategyId }
      postGroupOld().then((res) => {
        this.$store.state.strategy.groupList = res.data.data
      })
      if (this.$route.query.strategyId) {
        getStrategySelectOne(params).then((res) => {
          cronParse(this.$store.state.strategy.cron).then((res) => {
            this.cron = this.$store.state.strategy.cron + res.data.data
          })
          this.selectData = res.data.data
          this.message.list = res.data.data.tagEnumList
          if (res.data.data.tagEnumList[0]) {
            this.message.nowList = res.data.data.tagEnumList[0]
          }
          this.form = res.data.data
          this.$store.state.strategy = res.data.data
          console.log(res.data.data.cron)
          this.$store.state.strategy.switch = true
          this.$store.state.switch = true
          console.log(res.data.data.messageCronType)
          if (res.data.data.messageCronType === '1') { // 每周
            console.log('每周')
            this.checkListWeek = res.data.data.sendDay.split(',')
            this.radio = 'week'
          } else if (res.data.data.messageCronType === '2') { // 每月
            this.checkListMonth = res.data.data.sendDay.split(',')
            this.radio = 'month'
          } else {
            console.log('每天')
            this.radio = 'day'
          }
          if (res.data.data.exceptionDay) {
            this.sendEles = res.data.data.exceptionDay.split(',')
          }
          for (let i = 0; i < this.$store.state.strategy.sitConditions.length; i++) {
            if (this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList.length !== this.$store.state.strategy.tagEnumList.length) {
              for (let j = 0; j < this.$store.state.strategy.tagEnumList.length; j++) {
                if (!this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList[j] || this.$store.state.strategy.tagEnumList[j].tagName !== this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList[j].tagName) {
                  this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList.splice(j, 0, {
                    enumValue: '',
                    tagName: this.$store.state.strategy.tagEnumList[j].tagName
                  })
                }
              }
            }
          }
          console.log(this.$store.state.strategy)
          this.sendFrequency()
          for (let i = 0; i < res.data.data.sitStratrgyTegTags.length; i++) {
            getGroupTemplates({ tagId: res.data.data.sitStratrgyTegTags[i].id }).then((res) => {
              this.$store.state.strategy.sitStratrgyTegTags[i].option = res.data.data
            })
          }
        })
      }
      this.find()
      this.sendFrequency()
    },
    find () {
      const params = {
        strategyId: this.$route.query.strategyId,
        pageNow: this.pageNow
      }
      queryStrategyLog(params).then((res) => {
        console.log(res)
        this.dataSourse = res.data.data.list
        this.totalCount = res.data.data.totalCount
        console.log(this.dataSourse)
      })
    },
    handleCurrentChange (res) {
      this.pageNow = res
      this.find()
    },
    gotoGroupManagement () {
      if (this.$store.state.strategy.strategyStartTime && this.$store.state.strategy.strategyStartTime.length < 15) {
        this.$store.state.strategy.strategyStartTime = this.$store.state.strategy.strategyStartTime + ' 00:00:00'
      }
      if (this.$store.state.strategy.strategyEndTime && this.$store.state.strategy.strategyEndTime.length < 15) {
        this.$store.state.strategy.strategyEndTime = this.$store.state.strategy.strategyEndTime + ' 23:59:59'
      }
      if (this.$store.state.strategy.groupId) {
        this.$store.state.strategy.dataId = this.$route.query.strategyId
        setStrategyReturnDate(this.$store.state.strategy).then((res) => {
          this.$router.push('/groupManagement/see?history=/strategy/see&firId=' + res.data.data + '&groupId=' + this.$store.state.strategy.groupId)
        })
      } else {
        this.$message.error('先选择群组')
      }
    }
  }
}
</script>
<style scoped lang="less">
.flex{
  display: flex;
  justify-content: space-around;
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
/deep/ .el-input__inner{
  height: 35px !important;
  font-size: 12px;
}
/deep/ .content .el-row .el-form-item{
  margin-bottom: 12px;
}
/deep/ .content .el-textarea__inner{
  height: 142px!important;
}
.btnList{
  flex-direction: row-reverse;
  display: flex;
}
.el-button{
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.groupingSettings{
  color: blue;
  cursor: pointer;
}
.sitStratrgyTegTags{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sitStratrgyTegTag{
  margin: 10px;
//  width: 30%;
//  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #D7D7D7;
  border-radius: 5px;
}
.clearBoth{
  clear: both;
}
.alignItem{
  display: flex;
  align-items: center;
}
.content{
  width: 96%;
  height: 100%;
  padding: 10px;
  background: white;
  margin: auto;
}
.form{
  padding: 10px;
  box-sizing: border-box;
}
.content /deep/ .el-textarea__inner{
  background: #F6F7FC;
  height: 160px;
}
.content /deep/ .el-select{
  width: 100%;
}
.headTitle{
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
.spaceBetween{
  justify-content: space-between;
}
.content /deep/ .el-date-editor.el-input{
  width: 100%;
}
.ConversionCharts{
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
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
.footer{
  width: 100%;
  height: 15px;
  background-color: #f7f5f5;
}
// 2021 0107
.messageDialog{
  display: flex;
}
.messageDialogLeft{
  width: 30%;
  background: #FAFAFA;
  height: 360px;
}
.messageDialogRight{
  height: 360px;
  width: 70%;
  background: white;
}
.messageDialogDiv /deep/ .el-dialog__body{
  padding: 0 !important;
  height: 360px !important;
}
.messageListTitle{
  width: 100%;
  background: #DADADA;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addMessageListBtn{
  width: 30%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #02A4FF;
  border-radius: 10px;
  color: white;
  position: absolute;
  top: 366px;
}
.messageDialogRight /deep/ .el-input{
  width: 100% - 30px;
}
.behand /deep/ .el-input{
  width: 55%;
}
.messageDialogForm{
  margin-top: 10px;
  margin-left: 20px;
}
.messageDialogTable{
  width: 95%;
  height: 200px;
}
.messageListName{
  background: #F7F7F7;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.deleteIcon{
  width: 20px;
  height: 20px;
  position: relative;
  left: 70px;
}
.msgBtn /deep/ .el-button{
  width: 110px;
}
</style>
