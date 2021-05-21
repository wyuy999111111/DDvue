<template>
  <div id="strategyUddate">
    <div class="top">
      <HeadTitle params='搜索条件' />
        <el-form label-width="110px">
          <el-row>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}"><el-form-item label="策略名称："><el-input v-model="form.strategyName" clearable/></el-form-item></el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}"><el-form-item label="策略编码："><el-input v-model="form.strategyId" clearable/></el-form-item></el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}"><el-form-item label="群组：">
              <el-select clearable v-model="form.groupIds" multiple filterable>
                <el-option v-for="(item, index) in option" :key='index' :label='item.groupName' :value='item.groupId'></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}"><el-form-item label="创建人："><el-input v-model="form.createUser" clearable/></el-form-item></el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="创建时间：">
              <el-date-picker
                clearable
                v-model="time"
                class="formItem"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
              <el-form-item label="策略状态：">
                <el-select v-model="form.strategyStatus" clearable>
                  <el-option value="1" label="待审核"></el-option>
                  <el-option value="2" label="审核未通过"></el-option>
                  <el-option value="3" label="已暂停"></el-option>
                  <el-option value="4" label="运行中"></el-option>
                  <el-option value="5" label="已取消"></el-option>
                  <el-option value="6" label="强制结束"></el-option>
                  <el-option value="7" label="已完成"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" v-if="$store.state.user.codeName === '总公司'">
              <el-form-item label="权限机构：" class='formItem'>
                <el-select filterable v-model="form.dataComcode" @change="handleGetRoleId" clearable>
                  <el-option v-for="item in optionTwo" :key='item.id' :label='item.name' :value='item.id'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" class="form_el-col">
            <el-form>
            <el-form-item>
              <div class="btnList">
                <el-button @click="find"><img src="../../assets/indexImg/查询_1.png" />查询</el-button>
                <el-button @click="start"><img src="../../assets/indexImg/重置_1.png" />重置</el-button>
              </div>
            </el-form-item>
            </el-form>
          </el-col>
          </el-row>
        </el-form>
    </div>
    <div class="top">
      <div class="headTitle">
        <div class="flexBetween">
          <div class="flex">
            <img src="../../assets/indexImg/项目符.png"  id="headLogo" alt="">
            策略列表
          </div>
          <div class="spans">
          <div class="addUsers" @click="setCreate" v-if='user.indexOf("修改创建人") > -1'>
            <div class="addSpan" :style="{color: selectList.length !== 0 ? 'black' : 'white'}"><span style='color: #000'>修改创建人</span></div>
          </div>
            <div class="creatSpan" @click="gotoCreate" v-if='user.indexOf("创建策略") > -1'>创建策略</div>
          </div>
        </div>
        <div class="border"></div>
      </div>
      <!-- <div @click="handleClick">点击</div> -->
      <el-table @selection-change="handleSelectionChange" ref="multipleTable" class="table" :data="dataSourse" style="width: 100%" show-header :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}" :highlight-current-row="true" stripe>
        <el-table-column
          type="selection"
          align="center"
          width="60">
        </el-table-column>
        <!-- <el-table-column align="center" type="index" width="50"></el-table-column> -->
        <el-table-column prop="strategyId" label="策略编码" align="center"></el-table-column>
        <el-table-column prop="strategyName" label="策略名称" align="center"></el-table-column>
        <el-table-column prop="groupName" label="群组" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <!-- <el-table-column prop="endCreateTime" label="结束时间" align="center"></el-table-column> -->
        <el-table-column prop="createUser" label="创建人" align="center"></el-table-column>
        <el-table-column prop="comcodeName" label="机构" align="center"></el-table-column>
        <el-table-column prop="strategyStatusName" label="策略状态" align="center" scope="scope" >
          <template slot-scope="scope">
            <div @click="hadnleClick(scope)" :class=" scope.row.strategyStatusName === '审核未通过' ? 'statusError' : 'statusSuccess'" >{{scope.row.strategyStatusName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <div class="alignItem czBtnList">
              <span v-for="(item, index) in user" :key="index">
                <span v-if="item === '查看'" class="alignItem" @click="gotoSee(scope)"><img src="../../assets/indexImg/查看.png" alt />查看</span>
                <span v-if="item === '修改'" class="alignItem"><span class="alignItem" v-if="scope.row.updateStatus === '1'" @click="gotoUpdate(scope)"><img src="../../assets/indexImg/修改.png" alt />修改</span></span>
                <span v-if="item === '复制'" class="alignItem" @click="gotoCreate(scope)"><img src="../../assets/indexImg/复制.png" alt />复制</span>
                <span v-if="item === '审核'" class="alignItem"><span v-if="scope.row.strategyStatusName === '待审核'" class="alignItem" @click="gotoExamine(scope)"><img src="../../assets/indexImg/审核.png" alt />审核</span></span>

              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          ref='page'
          @size-change="handleSizeChange"
          :current-page="form.pageNow"
          @current-change="handleCurrentChange"
          :page-size="form.pagesize"
          background
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next , jumper, total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync='changeVisible' title='修改创建人' :close-on-click-modal="false" >
      <el-form label-width="110px" label-position="left" ref="ruleForm">
        <el-form-item label="机构" prop='userName'>
          <el-select v-model="comcode">
            <el-option v-for="(item, index) in optionTwo" :key='index' :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配人员" prop='name'>
          <el-select v-model="createUser">
            <el-option v-for="(item, index) in createUserOption" :key='index' :label="item.userName" :value='item.userName' ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeCreate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync='visible' title='审核未通过' width='507px' class='audit_dialog' :close-on-click-modal="false">
      <div class="add_message"></div>
      <p style="margin: 0px 0 8px 0;">策略：{{ strategyName }}</p>
      <p>备注：</p>
      <el-input type="textarea" v-model="remarks" readonly class="inputRemarks" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import {
  strategyQuery,
  selectGroup,
  orgTree,
  updateCreatUser,
  getCreateUser,
  findUserRe
} from '@/api/getApi'

export default {
  name: 'asd',
  components: {
    HeadTitle
  },
  data () {
    return {
      remarks: '',
      visible: false,
      comcode: '',
      changeVisible: false,
      dataSourse: [],
      option: [],
      form: {
        strategyName: '',
        strategyId: '',
        groupId: '',
        groupIds: [],
        createUser: '',
        strategyStatus: '',
        beginCreateTime: '',
        endCreateTime: '',
        pageNow: 1,
        pageSize: 10,
        dataComcode: ''
      },
      totalCount: '',
      selectList: [],
      createUserOption: [],
      createUser: '',
      optionTwo: [],
      time: [],
      strategyName: '',
      user: ''
    }
  },
  created () {
    this.getData()
    selectGroup().then((res) => {
      console.log(res.data.data)
      this.option = res.data.data
    })
    this.getOption()
    findUserRe().then((res) => {
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].resName === '策略管理') {
          for (let j = 0; j < res.data.data[i].children.length; j++) {
            if (res.data.data[i].children[j].resName === '策略查询') {
              this.user = res.data.data[i].children[j].prmsIdentity
              console.log(this.user)
            }
          }
        }
      }
    })
  },
  watch: {
    comcode () {
      console.log(this.comcode)
      getCreateUser(this.comcode).then((res) => {
        console.log(res.data.data)
        this.createUserOption = res.data.data
      })
    }
  },
  methods: {
    getOption () {
      if (this.$store.state.user !== '') {
        orgTree().then((res) => {
          const findCompany = (e) => {
            return e.name === this.$store.state.user.codeName
          }
          if (this.$store.state.user.codeName !== '总公司') {
            this.optionTwo = [res.data.data.find(findCompany)]
            console.log(res.data.data.find(findCompany))
          } else {
            this.optionTwo = res.data.data
          }
        })
      } else {
        setTimeout(() => {
          this.getOption()
        }, 1000)
      }
    },
    setCreate () {
      if (this.selectList.length !== 0) {
        this.changeVisible = true
      }
    },
    changeCreate () { // 修改创建人
      console.log(this.optionTwo, this.comcode)
      console.log(this.optionTwo[this.comcode])
      this.changeVisible = false
      const arr = []
      for (let i = 0; i < this.selectList.length; i++) {
        arr.push(this.selectList[i].strategyId)
      }
      let comcode = ''
      let comcodeName = ''
      for (let i = 0; i < this.optionTwo.length; i++) {
        if (this.optionTwo[i].id === this.comcode) {
          comcode = this.optionTwo[i].id
          comcodeName = this.optionTwo[i].name
        }
      }
      console.log(comcode, comcodeName)
      const params = {
        createUser: this.createUser,
        strategyIds: arr,
        comcode,
        comcodeName
      }
      updateCreatUser(params).then(() => {
        this.getData()
      })
    },
    gotoUpdate (e) {
      this.$router.push({ path: `/strategy/update?strategyId=${e.row.strategyId}` })
    },
    gotoCreate (e) {
      console.log(e)
      if (e.row) {
        this.$router.push({ path: `/strategy/create?strategyId=${e.row.strategyId}` })
      } else {
        this.$router.push({ path: '/strategy/create?strategy' })
      }
    },
    gotoSee (e) {
      this.$router.push({ path: `/strategy/see?strategyId=${e.row.strategyId}` })
    },
    gotoExamine (e) {
      this.$router.push({ path: `/strategy/examine?strategyId=${e.row.strategyId}` })
    },
    find () {
      this.$refs.page.internalCurrentPage = 1
      // this.form.pageNow = 1
      this.getData()
    },
    start () {
      this.form = {
        strategyName: '',
        strategyId: '',
        groupId: '',
        createUser: '',
        strategyStatus: '',
        beginCreateTime: '',
        endCreateTime: '',
        pageNow: 1,
        pageSize: 10,
        dataComcode: ''
      }
      this.time = []
    },
    getData () {
      this.form.beginCreateTime = this.time ? this.time[0] : ''
      this.form.endCreateTime = this.time ? this.time[1] : ''
      strategyQuery(this.form).then((res) => {
        this.dataSourse = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    handleCurrentChange (val) {
      this.form.pageNow = val
      this.find()
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.find()
    },
    handleSelectionChange (e) {
      console.log(e)
      this.selectList = e
    },
    hadnleClick (e) {
      console.log(e)
      if (e.row.strategyStatusName === '审核未通过') {
        this.visible = true
        this.remarks = e.row.remarks
        this.strategyName = e.row.strategyName
      }
    }
  }
}
</script>
<style scoped lang="less">
.audit_dialog .el-dialog .add_message{
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url('../../assets/strategy/message.png') no-repeat;
}
.inputRemarks{
  margin-top: 10px;
  // width: 403px;
  text-align: center;
  margin: auto;
  // height: 130px;
}
.audit_dialog /deep/ .el-dialog__body{
  width: 403px;
  margin: auto;
}
.audit_dialog /deep/ .el-dialog__title{
  margin-left: 20px;
  position: relative;
  top: -8px;
  left: 5px;
  color: #47BCEA;
}
.audit_dialog /deep/ .el-textarea__inner{
  background: #F6F7FC;
  margin: auto;
  border: none;
  width: 403px;
  height: 130px;
}
/deep/ .el-dialog__header{
  background: #F2F2F2;
  border-radius: 5px;
}
.czBtnList{
  justify-content: space-around;
}
#strategyUddate{
  width: 98%;
  margin: 10px auto;
  height: 100%;
}
.spans{
  display: flex;
}
.addSpan{
  background: url(../../assets/indexImg/修改创建人.png);
  background-size: 100% 100%;
  width: 113px;
  height: 28px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 40px;
  line-height: 28px;
  cursor: pointer;
  margin-right: 10px;
}
.creatSpan{
  background: url(../../assets/indexImg/修改创建人.png);
  background-size: 100% 100%;
  width: 113px;
  height: 28px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 40px;
  cursor: pointer;
  line-height: 28px;
}
.top{
  background: white;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0 20px;
}
.table{
  margin: auto;
}
.top /deep/ .el-select{
  width: 100%;
}
.top /deep/ .el-range-editor.el-input__inner{
  width: 100%;
  height: 35px!important;
  font-size: 12px!important;
  margin-top: 3px!important;
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
.btnList{
  display: flex;
  align-items: flex-end;
  height: 32px;
  justify-content: flex-end;
  margin-right: 30px;
}
.alignItem{
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
}
.alignItem {
  img{
    padding-left: 10px;
  }
}
.alignItem{
  span{
    cursor: pointer;
  }
}
.flexBetween{
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
}
.border{
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  height: 1px;
  margin-bottom: 10px;
}
#headLogo{
  width: 14px;
  margin: 10px 20px;
}
.flex{
  display: flex;
  font-size: 14px;
  color: #33aed3;
  font-weight: bold;
  align-items: center;
}
.headTitle{
  padding: 0 !important;
}
/deep/ .el-input--suffix .el-input__inner{
  height: 35px;
  font-size: 12px;
}
/deep/ .top[data-v-a1418988] .el-range-editor.el-input__inner{
  height: 35px;
  font-size: 12px;
  // width: 90%;
}
/deep/ .el-form-item{
  margin-bottom: 12px;
}
.statusError{
  color: #FF88A0;
  cursor: pointer;
  text-decoration: underline;
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
</style>
