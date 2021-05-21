<template>
  <div class="user">
    <div id="top">
      <HeadTitle params="搜索条件" />
      <el-form label-width="120px">
        <el-row class="topRow">
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="群组名称：">
              <el-input v-model="form.groupName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="群组类型：" class='formItem'>
              <el-select multiple v-model="form.groupType" clearable>
                <el-option label='动态群组' value='1'></el-option>
                <el-option label='静态群组' value='0'></el-option>
              </el-select>

              <!-- <el-input v-model="form.name"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="是否被引用：" class='formItem'>
              <!-- <el-cascader
              :props="defaultProps"
              :options="option"
              v-model="form.comcode"
              clearable></el-cascader> -->
              <el-select placeholder="请选择" v-model="form.citations" clearable>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="创建人：" class='formItem'>
              <el-input v-model="form.createUser" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="创建时间：" class='formItem'>
              <el-date-picker
                v-model="times"
                clearable
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                format='yyyy-MM-dd'
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="有效性：" class='formItem'>
              <el-select placeholder="请选择标签值类型" v-model="form.tagVal" clearable>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" v-if="$store.state.user.codeName === '总公司'">
            <el-form-item label="权限机构：" class='formItem'>
              <el-select filterable v-model="form.dataComcode" clearable>
                <el-option v-for="item in option" :key='item.id' :label='item.name' :value='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div class="button">
            <el-button @click="getDataFind" :loading='loading'>
              <img src="../../assets/indexImg/查询_1.png" /> 查询
            </el-button>
            <el-button @click="startOn">
              <img src="../../assets/indexImg/重置_1.png" />重置
            </el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <div id="bottom">
      <headTitle params="群组列表" />
      <div class="right">
        <div class="addUsers" @click="dialogVisible=true" v-if='user.indexOf("修改创建人") > -1'>
        <img src="../../assets/indexImg/修改创建人.png" alt="">
        <span>修改创建人</span>
      </div>
      <div class="addUsers" v-if='user.indexOf("创建群组") > -1'>
        <img src="../../assets/indexImg/资源 82.png" alt />
        <span @click="goToCreate">创建群组</span>
      </div>
      </div>
      <el-table
        ref='dataSourse'
        :data="tableData"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <!-- <el-table-column align="center" type="index" width="20"></el-table-column> -->
        <el-table-column prop="groupName" label="群组名称" align="center"></el-table-column>
        <el-table-column prop="groupType" label="群组类型" align="center" :formatter="groupTypeFormatter"></el-table-column>
        <el-table-column prop='createTime' label="创建时间" align="center"></el-table-column>
        <el-table-column prop='createUser' label="创建人" align="center"></el-table-column>
        <el-table-column prop='comName' label="机构" align="center"></el-table-column>
        <el-table-column prop='citations' label="是否被引用" align="center" :formatter="citationsFormatter"></el-table-column>
        <el-table-column prop='tagVal' label="有效性" align="center" :formatter="statusFormatter"></el-table-column>
        <el-table-column label="操作" align="center" width="286px">
          <template slot-scope="scope">
            <div class="spanLogo">
              <!-- <div class="logo" @click="gotoShare(scope.row.groupId)" v-if="getUserName(scope.row.createUser) === $store.state.user.userName" ><img src="../../assets/logo/share.png" alt class="img" /><span>分享</span></div> -->
              <span v-for="item in user" :key="item">
                <div class="logo" @click="gotoUpdate(scope.row)" v-if="item === '修改' && scope.row.updateStatus === '1'"><img src="../../assets/indexImg/修改.png" alt class="img" /><span>{{item}}</span></div>
                <div class="logo" @click="gotoSee(scope.row)" v-if="item === '查看'"><img src="../../assets/indexImg/查看.png" alt class="img" /><span>{{item}}</span></div>
                <div class="logo" @click="gotoCopy(scope.row)" v-if="item === '复制'"><img src="../../assets/indexImg/复制.png" alt class="img" /><span>{{item}}</span></div>
                <div class="logo" @click="gotoShare(scope.row.groupId)" v-if="item === '分享' && getUserName(scope.row.createUser) === $store.state.user.userName"><img src="../../assets/logo/share.png" alt class="img" /><span>{{item}}</span></div>
                <!-- <div>{{scope.row.tagVal}}</div> -->
                <div class="logo" v-if="item === '禁用启用' && scope.row.tagVal === '1' && scope.row.updateStatus === '1'" @click="onEnd(scope)"><img src="../../assets/indexImg/禁用1.png" alt class="img" /><span>禁用</span></div>
                <div class="logo" v-if="item === '禁用启用' && scope.row.tagVal === '0' && scope.row.updateStatus === '1'" @click="onStart(scope)"><img src="../../assets/indexImg/启用1.png" alt class="img" /><span>启用</span></div>
            </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="totalCount"
        ></el-pagination>
      </div> -->
      <div class="page">
        <el-pagination
          ref='page'
          :pager-count="7"
          @current-change="handleCurrentChange"
          :page-size="10"
          background
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next, jumper, total"
        ></el-pagination>
      </div>
    </div>
    <!--用户修改对话框  -->
    <el-dialog :visible.sync="dialogVisible" width="35%" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>{{ title }}</span>
      </span>
      <el-form label-width="110px" label-position="left" :model="setRuleList" :rules="rules" ref="ruleForm">
        <el-form-item label="机构" prop='userName'>
          <el-select v-model="comcode">
            <el-option v-for="item in option" :key='item.id' :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配人员" prop='name'>
          <el-select v-model="createUser">
            <el-option v-for="item in createUserOption" :key='item.id' :label="item.userName" :value='item.userName' ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitOn">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 分享对话框 -->
    <el-dialog :visible.sync="shareVisible" id="dialog" :width='dialogWidth' :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>分享</span>
      </span>
      <div class="share">
        <tree-transfer style='width: 100%; height: 100%'
          :title="title"
          :from_data='fromData'
          :to_data='toData'
          :defaultProps="{label:'name', children: 'userChild'}"
          @addBtn='add'
          @removeBtn='remove'
          :mode='mode'
          filter
          openAll />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitOnShare">确定</el-button>
        <el-button @click="shareVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { getFindGroupList, getUpdateCreateUser, getCreateUser, updateGroupStatus, orgTree, findRoles, findUserRe, findUserList, groupShareUser, shareUserList, groupShare } from '@/api/getApi'
import treeTransfer from 'el-tree-transfer'
export default {
  components: {
    HeadTitle, treeTransfer
  },
  data () {
    return {
      loading: false,
      type: '',
      totalCount: '',
      set: {},
      setRuleList: {
        userName: '',
        name: '',
        comcode: '',
        dataComcode: '',
        partId: ''
      },
      form: {
        groupName: '',
        groupType: '',
        citations: '',
        createUser: '',
        tagVal: '1',
        beginTime: '',
        endTime: '',
        pageNow: 1,
        dataComcode: ''
      },
      pageNow: 1,
      checkList: ['1', '2'],
      tableData: [],
      currentPage4: 4,
      value: [],
      dialogVisible: false,
      option: [],
      defaultProps: {
        children: 'child',
        label: 'name',
        checkStrictly: true,
        value: 'id'
      },
      times: ['', ''],
      roleList: [],
      user: [],
      rules: {
        userName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        comcode: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        dataComcode: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        partId: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
      },
      comcode: '',
      createUser: '',
      createUserOption: [],
      mode: 'transfer', // transfer addressList
      fromData: [
        {
          id: '1',
          pid: 0,
          name: '一级 1',
          userChild: [
            {
              id: '2',
              pid: '1',
              name: '二级 1-1'
            },
            {
              id: '3',
              pid: '1',
              name: '二级 1-2'
            }
          ]
        }, {
          id: '4',
          pid: 0,
          name: '一级 1',
          userChild: [
            {
              id: '5',
              pid: '4',
              name: '二级 1-1'
            },
            {
              id: '6',
              pid: '4',
              name: '二级 1-2'
            }
          ]
        }
      ],
      toData: [],
      formDataBefore: [],
      toDataBefore: [],
      shareVisible: false,
      shareGroupId: 0,
      dialogWidth: 0
    }
  },
  created () {
    this.getData()
    this.getOption()
    findRoles().then((res) => { // 角色选项
      this.roleList = res.data.data
    })
    this.hadnleFind()
  },
  watch: {
    comcode () {
      getCreateUser(this.comcode).then((res) => {
        console.log(res.data.data)
        this.createUserOption = res.data.data
      })
    }
  },
  mounted () {
    this.getUser()
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    getUserName (e) {
      const str = e
      var regex = '\\((.+?)\\)'
      var arr = str.match(regex)
      return arr[1]
    },
    getOption () {
      if (this.$store.state.user !== '') {
        orgTree().then((res) => {
          const findCompany = (e) => {
            return e.name === this.$store.state.user.codeName
          }
          if (this.$store.state.user.codeName !== '总公司') {
            this.option = [res.data.data.find(findCompany)]
            console.log(res.data.data.find(findCompany))
          } else {
            this.option = res.data.data
          }
        })
      } else {
        setTimeout(() => {
          this.getOption()
        }, 1000)
      }
    },
    groupTypeFormatter (e) {
      if (e.groupType === '0') {
        return '静态群组'
      } else {
        return '动态群组'
      }
    },
    citationsFormatter (e) {
      if (e.citations === '1') {
        return '是'
      } else {
        return '否'
      }
    },
    getDataFind () {
      if (this.$refs.page) {
        this.$refs.page.internalCurrentPage = 1
      }
      this.pageNow = 1
      this.getData()
    },
    getData () {
      const startTime = this.times[0]
      const endTime = this.times[1]
      // const params = {
      //   groupName: this.form.groupName,
      //   groupType: this.form.groupType,
      //   citations: this.form.citations,
      //   createUser: this.form.createUser,
      //   tagVal: this.form.tagVal,
      //   beginTime: startTime,
      //   endTime: endTime,
      //   pageNow: this.form.pageNow
      // }
      this.loading = true
      const params = `groupName=${this.form.groupName}&groupType=${this.form.groupType}&citations=${this.form.citations}&createUser=${this.form.createUser}&tagVal=${this.form.tagVal}&beginTime=${startTime}&endTime=${endTime}&pageNow=${this.pageNow}&dataComcode=${this.form.dataComcode}`
      getFindGroupList(params).then((res) => {
        this.loading = false
        this.tableData = res.data.data.list
        this.totalCount = res.data.data.totalCount
      }).catch(() => {
        this.loading = false
      })
    },
    handleClose (e) {
      console.log(e)
    },
    getUser () {
      this.user = []
      findUserRe().then((res) => {
        console.log(res.data.data)
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].resName === '群组管理') {
            for (let j = 0; j < res.data.data[i].children.length; j++) {
              if (res.data.data[i].children[j].resName === '群组查询') {
                this.user = res.data.data[i].children[j].prmsIdentity
                console.log(this.user)
              }
            }
          }
        }
        console.log(this.user)
      })
    },
    startOn () {
      this.times = ['', '']
      this.form = {
        data2: '',
        data1: '',
        comcode: '',
        status: '',
        startTime: '',
        endTime: '',
        name: '',
        userName: '',
        groupName: '',
        groupType: '',
        citations: '',
        createUser: '',
        tagVal: '',
        pageNow: 1,
        dataComcode: ''
      }
    },
    onEnd (e) {
      console.log(e)
      // const params = `createUser=${e.row.createUser}&tagVal=0&groupId=${e.row.groupId}`
      const params = {
        createUser: e.row.createUser,
        groupId: e.row.groupId,
        tagVal: 0
      }
      console.log(params)
      updateGroupStatus(params).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 0) {
          this.getData()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onStart (e) {
      // const params = `createUser=${e.row.createUser}&tagVal=1&groupId=${e.row.groupId}`
      const params = {
        createUser: e.row.createUser,
        groupId: e.row.groupId,
        tagVal: 1
      }
      console.log(params)
      updateGroupStatus(params).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 0) {
          this.getData()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    submitOn () {
      const arr = this.$refs.dataSourse.selection
      const groupIds = []
      for (let i = 0; i < arr.length; i++) {
        groupIds.push(arr[i].groupId)
      }
      const params = {
        comcode: this.comcode,
        createUser: this.createUser,
        groupIds: groupIds
      }
      // const params = `comcode=${this.comcode}&createUser=${this.createUser}&groupIds=${groupIds}`
      getUpdateCreateUser(params).then((res) => {
        this.getData()
        this.dialogVisible = false
      })
    },
    hadnleFind () {
      let comcodeCopy = ''
      if (this.form.comcode[this.form.comcode.length - 1]) {
        comcodeCopy = this.form.comcode[this.form.comcode.length - 1]
      }
      if (this.times) {
        this.form.startTime = this.times[0] ? this.times[0] + ' 00:00:00' : ''
        this.form.endTime = this.times[1] ? this.times[1] + ' 23:59:59' : ''
      } else {
        this.form.startTime = ''
        this.form.endTime = ''
      }
      const params = `name=${this.form.name}&userName=${this.form.userName}&status=${this.form.status}&startTime=${this.form.startTime}&endTime=${this.form.endTime}&comcode=${comcodeCopy}&pageNow=${this.form.pageNow}`
      findUserList(params).then((res) => {
        this.tableData = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageNow = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    handleChange (value) {
      console.log(value)
    },
    showEditDialog (e) {
      this.title = '修改用户'
      console.log(e)
      this.set = e
      this.type = 'set'
      this.dialogVisible = true
    },
    goToCreate () {
      this.$router.push({ path: '/groupManagement/create' })
    },
    gotoSee (e) {
      if (this.$store.state.user.userName) {
        if (this.getUserName(e.createUser) === this.$store.state.user.userName || this.$store.state.user.roleName === '系统管理员') {
          this.$router.push({ path: `/groupManagement/see?groupId=${e.groupId}&history=/groupManagement/polling` })
        } else {
          this.$router.push({ path: `/groupManagement/see?groupId=${e.groupId}&history=/groupManagement/polling&share=true` })
        }
      } else {
        setTimeout(() => {
            this.gotoSee(e)
        }, 1000)
      }
    },
    gotoUpdate (e) {
      if (e.isrunning === '1') {
        this.$message.warning('该群组正被运行中的策略使用，暂不能修改')
      } else {
        if (this.$store.state.user.userName) {
          if (this.getUserName(e.createUser) === this.$store.state.user.userName || this.$store.state.user.roleName === '系统管理员') {
            this.$router.push({ path: `/groupManagement/upDate?groupId=${e.groupId}&history=/groupManagement/polling` })
          } else {
            this.$router.push({ path: `/groupManagement/upDate?groupId=${e.groupId}&history=/groupManagement/polling&share=true` })
          }
        } else {
          setTimeout(() => {
              this.gotoUpdate(e)
          }, 1000)
        }
      }
    },
    gotoCopy (e) {
      if (this.$store.state.user.userName) {
          if (this.getUserName(e.createUser) === this.$store.state.user.userName || this.$store.state.user.roleName === '系统管理员') {
            this.$router.push({ path: `/groupManagement/create?groupId=${e.groupId}&history=/groupManagement/polling` })
          } else {
            this.$router.push({ path: `/groupManagement/create?groupId=${e.groupId}&history=/groupManagement/polling&share=true` })
          }
        } else {
        setTimeout(() => {
            this.gotoCopy(e)
        }, 1000)
      }
    },
    statusFormatter (e) {
      let content = ''
      if (e.tagVal === '1') {
        content = '有效'
      } else {
        content = '无效'
      }
      return content
    },
    gotoShare (e) {
      this.setDialogWidth()
      this.shareGroupId = e
      this.shareVisible = true
      groupShareUser(e).then((res) => {
        this.fromData = JSON.parse(JSON.stringify(res.data.data))
        this.formDataBefore = JSON.parse(JSON.stringify(res.data.data))
      })
      shareUserList(e).then((res) => {
        this.toData = JSON.parse(JSON.stringify(res.data.data))
        this.toDataBefore = JSON.parse(JSON.stringify(res.data.data))
      })
    },
    toReasonAll () {},
    changeMode () {
      if (this.mode === 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    submitOnShare () {
      const addSalesCodeList = []
      const delSalesCodeList = []
      for (let i = 0; i < this.toData.length; i++) { // 左
        for (let j = 0; j < this.toData[i].userChild.length; j++) {
          addSalesCodeList.push(this.toData[i].userChild[j].name)
        }
      }
      for (let i = 0; i < this.fromData.length; i++) { // 右
        for (let j = 0; j < this.fromData[i].userChild.length; j++) {
          console.log(this.fromData[i].userChild[j].name)
          delSalesCodeList.push(this.fromData[i].userChild[j].name)
        }
      }
      const params = { addSalesCodeList, delSalesCodeList, groupId: this.shareGroupId, sourceSalesList: this.formDataBefore, shareSalesList: this.toDataBefore }
      groupShare(params).then((res) => {
        this.shareVisible = false
      })
    },
    setDialogWidth() {
      var val = document.body.clientWidth
      console.log(val)
      const def = 1625
      if (val > def) {
        this.dialogWidth = '35%'
      } else {
        this.dialogWidth =  '600px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item{
  margin-bottom: 12px;
}
/deep/ .el-input__inner{
  font-size: 12px !important;
  height: 35px;
}
.el-range-editor.el-input__inner{
  width: 100%;
}
.el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  // display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    vertical-align: text-bottom;
  }
}
.el-cascader{
  width: 100%;
}
.el-select{
  width: 100%;
}
.user {
  padding: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    .topRow {
      padding: 0 20px 20px 30px;
      .flex {
        display: flex;
        align-items: center;
        margin: 5px 15px;

        #first {
          margin-right: 25px;
        }
        .label {
          width: 102px;
          font-size: 15px;
          text-align: left;
          color: #333;
        }
        /deep/ .el-input__inner {
          background-color: #f6f7fc;
          // border: none;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 35%;
        }
        .el-select {
          width: 72%;
        }
        .el-cascader {
          height: 40px;
          width: 72%;
        }
      }
    }
    .button {
      display: flex;
      float: right;
      justify-content: space-between;
      margin-right: 2%;
      margin-top: 3px;
      .el-button {
        background-color: #02a4ff;
        width: 90px;
        height: 30px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-right: 10px;
          vertical-align: text-bottom;
        }
      }
    }
  }
  #bottom {
    margin-top: 20px;
    background: white;
    border-radius: 5px;
    // padding: 20px  24px 0px 22px;
    .right{
      float:right;
      margin-right: 4%;
      display: flex;
    }
    .addUsers {
      cursor: pointer;
      float: right;
      margin-right: 2%;
      margin-top: -46px;
      position: relative;
      img {
        margin-right: 10px;
        vertical-align: text-bottom;
      }
      span {
        color: #333;
        position: absolute;
        left: 45px;
        height: 28px;
        line-height: 26px;
      }
    }
    .el-table {
      border: 1px solid #ccc;
      // border-top: none;
      // border-bottom: none;
      margin: 0px 45px;
      width: 94% !important;
    /deep/ .el-table__header-wrapper {
        background-color: #E6E9F2;
      }
      .el-button {
        border: none;
        padding: 0px 6px;
        img {
          margin-right: 4px;
          vertical-align: text-bottom;
        }
      }
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
    // .page {
    //   background-color: #fff;
    //   height: 60px;
    //   margin-right: 40px;
    //   .el-pagination {
    //     float: right;
    //     margin-top: 20px;
    //     /deep/ button {
    //       text-align: center;
    //       span {
    //         padding: 6px;
    //         background-color: #fff;
    //         border: 1px solid #ccc;
    //         padding-top: 0px;
    //       }
    //     }
    //     /deep/ .el-pager li {
    //       border: 1px solid #ddd;
    //       background-color: #fff;
    //     }
    //     .el-input {
    //       margin: -3px 0px;
    //       box-sizing: border-box;
    //     }
    //     /deep/ .el-input--mini .el-input__inner {
    //       height: 24px;
    //       line-height: 24px;
    //     }
    //     /deep/ .el-input--mini .el-input__icon {
    //       line-height: 22px;
    //     }
    //   }
    // }
  }
  #dialog {
    /deep/ .el-dialog {
      border-radius: 12px;
      width: 35%;
    }
    /deep/ .el-dialog__header {
      background-color: #f6f7fc !important;
      border-radius: 12px 12px 0 0;
      padding: 10px 20px;
      /deep/ .dialog_title {
        color: #47bcea;
        display: flex;
        align-items: center;
        img {
          margin-right: 20px;
        }
        span {
          color: #47bcea;
        }
      }
      .el-dialog__headerbtn {
        font-size: 28px;
        color: #aaa;
        position: absolute;
        top: 7px;
      }
    }
  }
}
.dialog_title {
  color: #47bcea;
  display: flex;
  align-items: center;
  img {
    margin-right: 20px;
  }
  span {
    color: #47bcea;
  }
}
.user #top .topRow .flex .el-date-editor.el-input, .user #top .topRow .flex .el-date-editor.el-input__inner{
  width: 100%;
}
.logo{
  display: flex;
  align-items: center;
}
.img{
  padding: 0 5px;
}
.spanLogo{
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 10px;
  cursor: pointer;
}
.choose{
  border-top:1px solid #ccc;
  width: 100%;
  display:flex;
  justify-content: space-between;
  text-align: center;
  margin-top:10px;
  span{
     width:50%;
    height: 30px;
    line-height: 30px;
    &:first-child{
    background-color: #00f;
    color:#fff;
  }

  }

}
/deep/.el-select-dropdown__list {
  padding:6px 0px 0px;
}
/deep/.el-button{
  padding: 1px 16px;
}
.share{
  display: flex;
  justify-content: space-around;
}
.shareBox{
  width: 40%;
  height: 400px;
  background: #F6F7FC;
}
.shareLogo{
  width: 40px;
  margin: auto;
}
.share /deep/ .el-tree{
  background: #F6F7FC;
}
.shareBtn{
  width: 70px;
  height: 70px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
}
.share{
  width: 100%;
  height: 400px;
}
</style>
