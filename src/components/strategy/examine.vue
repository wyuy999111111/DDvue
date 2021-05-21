<template>
  <div id="strategyUddate">
    <div class="strategyTitle"><img src="../../assets/logo/title.png" />策略审核</div>
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
    <span class="title"></span>
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
              <div class="flex alignItem">
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
                <el-option label="属性方式" value="1" v-if="$store.state.user.roleName === '系统管理员'"></el-option>
              <el-select v-model="$store.state.strategy.sendType" disabled>
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
        <div class="flex spaceBetween"><span><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略动作</span><span @click="addAction"></span></div>
        <div class="border"></div>
      </div>
      <Action v-for="(item, index) in $store.state.strategy.sitConditions" :key='index' :params='index' typeParams='readonly'/>
      <AdminSend :props='{typeParams: true}' />
      <div class="headTitle">
        <div class="flex spaceBetween"><span><img src="@/assets/indexImg/项目符.png" id="headLogo" alt="">策略关注指标</span><span @click="addStrategy"></span></div>
        <div class="border"></div>
      </div>
      <div class="sitStratrgyTegTags">
        <div class="sitStratrgyTegTag" v-for="(item, index) in $store.state.strategy.sitStratrgyTegTags" :key='index'>
          <el-form label-width="100px">
            <!-- <el-col></el-col> -->
            <!-- <span @click="deleteFactor(index)">删除</span> -->
            <el-form-item label="指标">
              <span>{{ item.name }}</span>
            </el-form-item>
            <el-form-item label="指标分组">
              <span v-if="item.tagValue !== '2'" @click="$store.state.strategy.sitStratrgyTegTags[index].factorDialogVisible = true" class="groupingSettings">查看分组</span>
              <span v-if="item.tagValue === '2'" class="groupingSettings">指标为枚举类型</span>
            </el-form-item>
          </el-form>
          <!-- 指标分组设置 -->
            <el-dialog :visible.sync="$store.state.strategy.sitStratrgyTegTags[index].factorDialogVisible" title='分组设置' class='dialog_footer fzClass' width="689px" :close-on-click-modal="false">
              <div class="logo_message"></div>
              <div class="footer_top">
                <p>指标： <span style='marginLeft: 45px'>{{ item.name }}</span></p>
              <!-- <p @click="addGroup(index)" class="addBtn" style='cursor: pointer;'> -->
                <!-- <img class="btnImg" src="../../assets/strategy/add.png"/>
                <span>添加组别</span> -->
              <!-- </p> -->
              </div>
              <el-form label-width="100px" class="zubie">
                <el-form-item
                  v-for="(item, itemIndex) in $store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags"
                  :key="itemIndex"
                  :label="'组别' + (itemIndex + 1) + '：'"
                >
                  <div class="alignItem">
                    <el-input v-model="$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags[itemIndex].groupName" readonly />
                    <div style="width: 40px;"></div>
                    <el-input v-model="$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags[itemIndex].startValue" readonly/>
                    <el-select v-model="$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags[itemIndex].leftOperator" disabled>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                    </el-select>
                    <p style="fontSize: 14px;" > 值 </p>
                    <el-select v-model="$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags[itemIndex].rightOperator" disabled>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                    </el-select>
                    <el-input v-model="$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags[itemIndex].endValue" readonly/>
                    <!-- <span
                      class="group_close cursor"
                      @click="groupClose(itemIndex)">×
                    </span> -->
                  </div>
                </el-form-item>
              </el-form>
              <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="$store.state.strategy.sitStratrgyTegTags[index].factorDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="setSitStrategyTags(index)">确 定</el-button>
              </span> -->
            </el-dialog>
          </div>
      </div>
      <div class="btnList">
        <el-button :loading='loading' @click="visible=true">审核</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <el-dialog :visible.sync='visible' title='审核' width='507px' class='audit_dialog' :close-on-click-modal="false">
      <div class="add_message"></div>
      <el-radio v-model="strategyStatus" label="4">通过</el-radio>
      <el-radio v-model="strategyStatus" label="2">未通过</el-radio>
      <p style="margin: 12px 0 8px 0;">备注：</p>
      <el-input type="textarea" v-model="$store.state.strategy.remarks" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="updateStatus()">确 定</el-button>
      </span>
    </el-dialog>
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
import AdminSend from './components/adminSend'
import {
  postGroupOld,
  getStrategySelectOne,
  cronParse,
  updateStatus,
  setStrategyReturnDate,
  getStrategyReturnDate
} from '@/api/getApi'

export default {
  name: 'asd',
  components: {
    HeadTitle, Action, CronUi, AdminSend
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
      strategyStatus: '4',
      visible: false,
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
      cron: '',
      loading: false
    }
  },
  created () {
    this.getData()
    if (this.$route.query.firId) {
      getStrategyReturnDate(this.$route.query.firId).then((res) => {
        this.$store.state.strategy = res.data.data
        this.message.list = res.data.data.tagEnumList
        if (res.data.data.tagEnumList[0]) {
          this.message.nowList = res.data.data.tagEnumList[0]
        }
        if (res.data.data.messageCronType === '1') { // 每周
          this.checkListWeek = res.data.data.sendDay.split(',')
          this.radio = 'week'
        } else if (res.data.data.messageCronType === '2') { // 每月
          this.checkListMonth = res.data.data.sendDay.split(',')
          this.radio = 'month'
        } else {
          this.radio = 'day'
        }
        this.sendFrequency()
        cronParse(this.$store.state.strategy.cron).then((res) => {
          this.cron = this.$store.state.strategy.cron + res.data.data
          console.log(this.cron)
        })
      })
    }
  },
  watch: {
    filterText (val) {
      this.$refs.treeStrategy.filter(val)
    },
    '$store.state.strategy.cron' () {
      cronParse(this.$store.state.strategy.cron).then((res) => {
        console.log(res)
        this.cron = this.$store.state.strategy.cron + res.data.data
        console.log(this.cron)
      })
    }
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
        this.$store.state.strategy.messageCronType = 1
        str += '根据策略频率每日发送'
      } else if (this.radio === 'month') {
        this.$store.state.strategy.messageCronType = 2
        this.$store.state.strategy.sendDay = this.checkListMonth.toString()
        str += '根据策略频率每月'
        str += '<' + this.$store.state.strategy.sendDay + '>' + '发送'
      } else {
        this.$store.state.strategy.messageCronType = 0
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
    goBack () {
      this.$router.push({ path: '/strategy/query' })
    },
    filterNode (value, data) {
      console.log(value, data)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    updateStatus () {
      const params = this.$store.state.strategy
      params.strategyStatus = this.strategyStatus
      console.log(params)
      // 4 通过 2 未通过
      this.loading = true
      updateStatus(params).then((res) => {
        this.loading = false
        console.log(res)
        if (res.data.code === 0) {
          this.$router.push({ path: '/strategy/query' })
        } else {
          this.$message.error(res.data.msg)
        }
      }).then(() => {
        this.loading = true
      })
      this.visible = false
    },
    setSitStrategyTags (e) {
      this.$store.state.strategy.sitStratrgyTegTags[e].factorDialogVisible = false
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
      console.log('cron结果', data)
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
          this.message.list = res.data.data.tagEnumList
          if (res.data.data.tagEnumList[0]) {
            this.message.nowList = res.data.data.tagEnumList[0]
          }
          this.form = res.data.data
          this.$store.state.strategy = res.data.data
          // console.log(res.data.data.cron)
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
        })
      }
      this.sendFrequency()
    },
    change (data) {
      this.newData = data
    },
    handleClick () {
      console.log(this.testInp)
    },
    addAction () { // 添加情况
      const arr = []
      console.log(this.$store.state.strategy)
      for (let i = 0; i < this.$store.state.strategy.tagEnumList.length; i++) {
        arr.push({
          enumValue: ''
        })
      }
      this.$store.state.strategy.sitConditions.push({
        sitConditionFactors: [],
        sitMessagev: '',
        messageVisible: false,
        factorDialogVisible: false,
        templateList: [],
        strategyTagEnumDtoList: arr
      })
      console.log(this.$store.state.strategy)
    },
    addStrategy () { // 弹出添加指标框
      // const _this = this
      this.$store.state.strategy.strategyVisible = true
      console.log(this.$store.state.strategy)
      const idArr = []
      for (let i = 0; i < this.$store.state.strategy.sitStratrgyTegTags.length; i++) {
        idArr.push(this.$store.state.strategy.sitStratrgyTegTags[i].id)
      }
      console.log(idArr)
      this.$nextTick(() => {
        console.log(this.$refs.treeStrategy)
        this.$refs.treeStrategy.setCheckedKeys(idArr)
      })
    },
    addStrategyTags () { // 添加关注指标
      const oldData = this.$store.state.strategy.sitStratrgyTegTags
      const ybData = this.$refs.treeStrategy.getCheckedNodes()
      const newData = []
      const resultList = []
      for (let i = 0; i < ybData.length; i++) {
        if (ybData[i].tagFieldName) {
          newData.push(ybData[i])
        }
      }
      for (let i = 0; i < newData.length; i++) {
        let num = -10
        for (let j = 0; j < oldData.length; j++) {
          if (newData[i].id === oldData[j].id) {
            num = j
          }
        }
        console.log(num)
        if (num !== -10) {
          resultList.push({
            id: oldData[num].id,
            name: oldData[num].name,
            sitStrategyTags: oldData[num].sitStrategyTags,
            factorDialogVisible: false
          })
        } else {
          console.log(i)
          resultList.push({
            id: newData[i].id,
            name: newData[i].name,
            sitStrategyTags: [],
            factorDialogVisible: false
          })
        }
      }
      console.log(resultList)
      this.$store.state.strategy.sitStratrgyTegTags = resultList
      this.$store.state.strategy.strategyVisible = false
    },
    deleteFactor (index) { // 删除指标
      this.$store.state.strategy.sitStratrgyTegTags.splice(index, 1)
    },
    gotoGroupManagement () {
      if (this.$store.state.strategy.strategyStartTime && this.$store.state.strategy.strategyStartTime.length < 15) {
        this.$store.state.strategy.strategyStartTime = this.$store.state.strategy.strategyStartTime + ' 00:00:00'
      }
      if (this.$store.state.strategy.strategyEndTime && this.$store.state.strategy.strategyEndTime.length < 15) {
        this.$store.state.strategy.strategyEndTime = this.$store.state.strategy.strategyEndTime + ' 23:59:59'
      }
      if (this.$store.state.strategy.groupId) {
        setStrategyReturnDate(this.$store.state.strategy).then((res) => {
          this.$router.push('/groupManagement/see?history=/strategy/examine&firId=' + res.data.data + '&groupId=' + this.$store.state.strategy.groupId)
        })
      } else {
        this.$message.error('先选择群组')
      }
    }
  }
}
</script>
<style scoped lang="less">
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
.el-button{
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 1px 16px;
}
.btnList{
  flex-direction: row-reverse;
  display: flex;
}
.groupingSettings{
  color: blue;
  cursor: pointer;
}
.sitStratrgyTegTags{
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.sitStratrgyTegTag{
  margin: 10px;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #D7D7D7;
  border-radius: 5px;
}
/deep/ .sitStratrgyTegTags{
  padding-left: 20px;
}
/deep/ .sitStratrgyTegTag{
  width: 317px;
  height: 98px;
  position: relative;
  margin-right: 1.5%;
}
/deep/ .sitStratrgyTegTag .delete{
  position: absolute;
  top: -5px;
  right: 10px;
  font-size: 28px;
  // z-index: 999999;
}
/deep/ .sitStratrgyTegTags .sitStratrgyTegTag .el-form-item{
  margin-bottom: 0;
}
/deep/ .sitStratrgyTegTag .el-form-item__content{
  height: 20px;
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
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0px 22px;
  box-sizing: border-box;
  font-size: 14px !important;
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
/deep/ .dialog_footer .el-dialog {
  position: relative;
  height: 406px;
}
/deep/ .dialog_footer .el-dialog .logo_message{
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url('../../assets/strategy/message.png') no-repeat;
}
/deep/ .dialog_footer .el-dialog__header{
  padding: 12px 10px 0 55px!important;
  background-color: #f2f2f2;
  height: 32px;
  color: #47bcea!important;
  font-size: 14px;
}
/deep/ .dialog_footer .el-dialog__header .el-dialog__headerbtn{
  top: 10px;
  right: 10px;
}
/deep/ .dialog_footer .el-dialog__header .el-dialog__headerbtn .el-dialog__close{
  font-size: 28px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__header .el-dialog__title{
  color: #47bcea!important;
  font-size: 14px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body{
  padding: 20px 40px;
  height: 268px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .footer_top{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .addBtn{
  margin-left: 20px;
}
.btnImg{
  margin-right: 3px;
  position: relative;
  top: 2px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .group_close{
  font-size: 20px;
  font-weight: normal;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .el-form-item__label{
  padding-left: 2px!important;
  font-size: 14px!important;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .el-form-item{
  margin-bottom: 12px!important;
}
// /deep/ .dialog_footer .el-dialog .el-dialog__body .el-form{
//   overflow-y:auto;
//   overflow-x:auto;
//   width:648px;
//   height:240px;
// }
/deep/ .audit_dialog .el-dialog{
  height: 311px!important;
  position: relative;
}
/deep/ .audit_dialog .el-dialog .el-dialog__header{
  padding: 12px 10px 0 55px!important;
  background-color: #f2f2f2;
  height: 32px;
  color: #47bcea!important;
  font-size: 14px;
}
/deep/ .audit_dialog .el-dialog .el-dialog__header .el-dialog__title{
  color: #47bcea!important;
  font-size: 14px;
}
/deep/ .audit_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
  top: 10px;
  right: 10px;
}
/deep/ .audit_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close{
  font-size: 28px;
}
.audit_dialog .el-dialog .add_message{
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url('../../assets/strategy/message.png') no-repeat;
}
/deep/ .audit_dialog .el-dialog .el-dialog__body{
  padding: 10px 50px 10px !important;
  height: 190px!important;
}
/deep/ .audit_dialog .el-dialog .el-dialog__body .el-textarea .el-textarea__inner{
  background-color: #f6f7fc;
  height: 130px;
}
/deep/ .audit_dialog .el-dialog .el-dialog__footer{
  text-align: center;
  padding-left: 30px!important;
}
/deep/ .audit_dialog .el-dialog .el-dialog__footer .el-button{
  width: 90px;
  height: 30px;
  margin-right: 20px;
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
.fzClass /deep/ .el-select>.el-input{
  width: 66px;
}
.fzClass /deep/ .el-select{
  width: 60%;
  margin-left: 10px;
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
.zubie{
  max-height: 300px;
  overflow: auto;
}
.msgBtn /deep/ .el-button{
  width: 110px;
}
</style>
