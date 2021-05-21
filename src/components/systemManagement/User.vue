<template>
  <div class="user">
    <div id="top">
      <HeadTitle params="搜索条件" />
        <el-row class="topRow">
          <el-form label-width="120px">
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="工号：">
              <el-input  v-model="form.userName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="姓名：" class='formItem'>
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="归属机构：" class='formItem'>
              <el-select filterable v-model="form.comcode" clearable>
                <el-option v-for="item in option" :key='item.id' :label='item.name' :value='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" v-if="$store.state.user.codeName === '总公司'">
            <el-form-item label="权限机构：" class='formItem'>
              <el-select filterable v-model="form.dataComcode" @change="handleGetRoleId" clearable>
                <el-option v-for="item in option" :key='item.id' :label='item.name' :value='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" >
            <el-form-item label="角色：" class='formItem'>
              <el-select v-model="form.roleId" filterable clearable>
                <el-option v-for="(item, index) in roleIdOption" :key='index' :label="item.partName" :value='item.partId'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="有效性：" class='formItem'>
              <el-select placeholder="请选择标签值类型" v-model="form.status" clearable>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <div class="button">
            <el-button @click="hadnleFindPage">
              <img src="../../assets/indexImg/查询_1.png" /> 查询
            </el-button>
            <el-button @click="startOn">
              <img src="../../assets/indexImg/重置_1.png" />重置
            </el-button>
          </div> -->
        </el-form>
      </el-row>
      <el-row type="flex" justify="end">
        <el-form>
          <el-col :sm="{span: 20}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item>
              <div class="btnList">
              <el-button @click="hadnleFindPage">
                <img src="../../assets/indexImg/查询_1.png" /> 查询
              </el-button>
              <el-button @click="startOn">
                <img src="../../assets/indexImg/重置_1.png" />重置
              </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div id="bottom">
      <headTitle params="标签列表" />
      <div class="addUsers" v-if='user.indexOf("添加用户") > -1'>
        <img src="../../assets/indexImg/资源 82.png" alt />
        <span @click="showCreateDialog">创建用户</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column prop="userName" label="工号" align="left"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop='comname' label="归属机构" align="center"></el-table-column>
        <el-table-column prop='dataComname' label="权限机构" align="center"></el-table-column>
        <el-table-column prop='createTime' label="创建时间" align="center"></el-table-column>
        <el-table-column prop='partName' label="角色" align="center"></el-table-column>
        <el-table-column prop='status' label="有效性" align="center" :formatter="statusFormatter"></el-table-column>
        <!-- <el-table-column label="操作" align="center" width="286px">
          <template slot-scope="scope">
            <el-button @click="showEditDialog(scope.row)">
              <img src="../../assets/indexImg/修改.png" alt />修改
            </el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)">
              <img src="../../assets/indexImg/禁用1.png" alt />禁用
              <img src="../../assets/indexImg/启用1.png" alt />启用
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="286px">
          <template slot-scope="scope">
            <div class="spanLogo">
              <span v-for="item in user" :key="item">
                <div class="logo" @click="showEditDialog(scope.row)" v-if="item === '修改'"><img src="../../assets/indexImg/修改.png" alt class="img" /><span>{{item}}</span></div>
                <div class="logo" v-if="item === '禁用启用' && scope.row.status === '1'" @click="onEnd(scope)"><img src="../../assets/indexImg/禁用1.png" alt class="img" /><span>禁用</span></div>
                <div class="logo" v-if="item === '禁用启用' && scope.row.status === '0'" @click="onStart(scope)"><img src="../../assets/indexImg/启用1.png" alt class="img" /><span>启用</span></div>
            </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          ref='page'
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next, jumper, total"
        ></el-pagination>
      </div>
    </div>
    <!--用户修改对话框  -->
    <el-dialog :visible.sync="dialogVisible" width="35%" id="dialog" :close-on-click-modal="false" @close="close()">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>{{ title }}</span>
      </span>
      <el-form label-width="110px" label-position="left" :model="setRuleList" :rules="rules" ref="ruleForm">
        <el-form-item label="工号：" prop='userName'>
          <el-input v-model="set.userName" @change="handleBlur" :disabled='type === "set"? true : false' clearable />
        </el-form-item>
        <el-form-item label="姓名：" prop='name'>
          <el-input v-model="set.name" type="text" disabled />
        </el-form-item>
        <el-form-item label="归属机构:" prop='comcode'>
          <el-cascader
            disabled
            :props="defaultProps"
            :options="organizationTreeOption"
            v-model="set.comcode"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label='岗位'>
          <el-input v-model="set.positionName" readonly />
        </el-form-item>
        <el-form-item label="权限机构:" prop='dataComcode'>
          <el-cascader
            ref='cascaderRef'
            clearable
            v-model="set.dataComcode"
            :options="mechanismOption"
            :props="propsCascader"
            placeholder="请选择机构"
            @change="handleChangeDataComcode"
          ></el-cascader>
          <!-- <el-cascader v-model="set.dataComcode" @change="hadnleChangeDataComcode" clearable :options="option" :props="defaultProps" /> -->
          <!-- <el-select v-model="set.dataComcode" filterable @change="hadnleChangeDataComcode" clearable>
            <el-option v-for="item in option" :key='item.id' :value='item.id' :label='item.name'></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="渠道权限" prop='partQd'>
          <el-select v-model="set.salesChannelcodeList" multiple @change="handleChangeSalesChannelCode" clearable>
            <el-option
              v-for="(res, index) in channelOption"
              :key="index"
              :label="res.sales_channename"
              :value="res.sales_channelcode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能权限:" prop='partId'>
          <el-select v-model="set.partId" placeholder="请选择" clearable :disabled='$store.state.user.codeName !== "总公司" && set.partName === "分公司管理员"'>
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.partName" :value="item.partId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色看板权限" prop='chacterview'>
          <el-select v-model="set.chacterview" clearable>
            <el-option label="渠道总监/渠道助理" value="1"></el-option>
            <el-option label="业务部总监/业务部助理" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading='loading' @click="submitOn">确定</el-button>
        <el-button @click="dialogVisible = false;close()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { getFindUserOrg, orgTree, findRoles, findUserRe, updateUserStatus, findUserList, saveUser, updateUser, salesTagFindChannelList, organizationTree, findUserComcodeResultList } from '@/api/getApi'

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      roleIdOption: [],
      organizationTreeOption: [],
      loading: false,
      type: '',
      totalCount: '',
      set: {
        salesChannelcodeList: [],
        chacterview: '',
        name: '',
        dataComcode: [],
        comcode: '',
        positionName: ''
      },
      setRuleList: {
        userName: '',
        name: '',
        comcode: '',
        dataComcode: [],
        partId: '',
        partQd: '',
        chacterview: ''
      },
      form: {
        data2: '',
        data1: '',
        comcode: '',
        status: '',
        startTime: '',
        endTime: '',
        name: '',
        userName: '',
        pageNow: 1,
        dataComcode: '',
        roleId: ''
      },
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
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        dataComcode: [
          { required: true, message: '请选择权限机构', trigger: 'blur' }
        ],
        partId: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ],
        partQd: [
          { required: true, message: '请选择渠道', trigger: 'blur' }
        ],
        chacterview: [
          { required: true, message: '请选择渠道', trigger: 'blur' }
        ]
      },
      channelOption: [],
      props: {
        multiple: true,
        children: 'child',
        label: 'sales_channename',
        value: 'sales_channelcode'
      },
      propsCascader: {
        multiple: true,
        children: 'child',
        label: 'name',
        value: 'id'
      },
      mechanismOption: [],
      allId: []
    }
  },
  created () {
    if (this.$store.state.user.codeName) {
      this.getRoleIdOption()
    }
    orgTree().then((res) => {
      this.option = res.data.data
    })
    organizationTree().then((res) => {
      this.organizationTreeOption = res.data.data
    })
    salesTagFindChannelList().then(res => {
      this.channelOption = [{
        sales_channelcode: 'all',
        sales_channename: '全选'
      }]
      this.channelOption.push(...res.data.data)
      const allId = []
      for (let i = 0; i < res.data.data.length; i++) {
        allId.push(res.data.data[i].sales_channelcode)
      }
      this.allId = allId
    })
  },
  mounted () {
    this.handleGetRoleId()
    this.getUser()
  },
  watch: {
    '$store.state.user.codeName'  () {
      this.getRoleIdOption()
    }
  },
  methods: {
    getRoleIdOption () {
      if (this.$store.state.user.codeName !== '总公司') {
        this.form.dataComcode = this.$store.state.user.dataComcode
        this.hadnleFind()
        findRoles(this.$store.state.user.dataComcode).then((res) => {
          this.roleIdOption = res.data.data
        })
      } else {
        this.form.dataComcode = ''
        this.hadnleFind()
      }
    },
    handleGetRoleId () {
      this.form.roleId = ''
      findRoles('31000000').then((res) => {
        console.log(res)
        this.roleIdOption = res.data.data
      })
    },
    handleChangeDataComcode (e) {
      const arr = this.mechanismOption.slice(0)
      if (e.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i].id, e)
          if (arr[i].id !== e[0][0]) {
            arr[i].disabled = true
          }
        }
        findRoles(e[0][0]).then((res) => { // 角色选项
          if (this.$store.state.user.roleName === '分公司管理员') {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].partName === '分公司管理员') {
                res.data.data.splice(i, 1)
              }
            }
          }
          this.roleList = res.data.data
        })
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].disabled = false
        }
      }
      this.mechanismOption = arr
    },
    handleChangeSalesChannelCode (res) {
      if (res.length === this.allId.length + 1) {
        this.set.salesChannelcodeList = []
      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i] === 'all') {
            this.set.salesChannelcodeList = this.allId
          }
        }
      }
    },
    hadnleChangeDataComcode (res) {
      if (res === '31000000') {
        this.rules = {
          userName: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          dataComcode: [
            { required: true, message: '请选择权限机构', trigger: 'blur' }
          ],
          partId: [
            { required: true, message: '请选择用户角色', trigger: 'blur' }
          ],
          chacterview: [
            { required: true, message: '请选择角色看板权限', trigger: 'blur' }
          ],
          partQd: [
            { required: true, message: '请选择渠道', trigger: 'blur' }
          ]
        }
      } else {
        this.rules = {
          userName: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          dataComcode: [
            { required: true, message: '请选择权限机构', trigger: 'blur' }
          ],
          partId: [
            { required: true, message: '请选择用户角色', trigger: 'blur' }
          ],
          partQd: [
            { required: true, message: '请选择渠道', trigger: 'blur' }
          ]
        }
      }
      setTimeout(() => {
        this.close()
      }, 0)
    },
    close () {
      this.$refs.cascaderRef.$refs.panel.clearCheckedNodes()
      this.$refs.cascaderRef.$refs.panel.activePath = []
      this.$refs.ruleForm.clearValidate()
      this.mechanismOption = []
    },
    handleBlur () {
      this.setRuleList.userName = this.set.userName
      if (this.type === 'set') {
        findUserComcodeResultList(this.set.userName).then((res) => {
          findRoles(res.data.data.dataComcode).then((res) => { // 角色选项
            if (this.$store.state.user.roleName === '分公司管理员' && this.set.partName !== '分公司管理员') {
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].partName === '分公司管理员') {
                  res.data.data.splice(i, 1)
                }
              }
            }
            this.roleList = res.data.data
          })
          this.mechanismOption = res.data.data.comcodeObjList
          this.set.dataComcode = res.data.data.comcodeResultList
          const arr = this.mechanismOption.slice(0)
          if (res.data.data.comcodeResultList.length !== 0) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].id !== res.data.data.comcodeResultList[0][0]) {
                arr[i].disabled = true
              }
            }
          } else {
            for (let i = 0; i < arr.length; i++) {
              arr[i].disabled = false
            }
          }
          this.mechanismOption = arr
          if (res.data.code !== 0) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      } else {
        getFindUserOrg(this.set.userName).then((res) => {
          if (res.data.code !== 0) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            })
          }
          this.set.name = res.data.data.name
          this.set.dataComcode = res.data.data.dataComcode
          this.set.comcode = res.data.data.comcode
          this.set.positionName = res.data.data.positionName
          this.set.salesChannelcodeList = res.data.data.salesChannelcodeList
          this.mechanismOption = res.data.data.comcodeObjList
          // this.set.chacterview = '1'
          // this.set.chacterview = res.data.data.chacterview ? res.data.data.chacterview : ''
        })
      }
    },
    handleClose (e) {
    },
    getUser () {
      this.user = []
      findUserRe().then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].resName === '系统管理') {
            for (let j = 0; j < res.data.data[i].children.length; j++) {
              if (res.data.data[i].children[j].resName === '用户管理') {
                this.user = res.data.data[i].children[j].prmsIdentity
              }
            }
          }
        }
      })
    },
    startOn () {
      this.times = ['', '']
      this.roleIdOption = []
      this.form = {
        data2: '',
        data1: '',
        comcode: '',
        status: '',
        dataComcode: '',
        startTime: '',
        endTime: '',
        name: '',
        userName: '',
        roleId: '',
        pageNow: 1
      }
      if (this.$store.state.user.codeName !== '总公司') {
        this.form.dataComcode = this.$store.state.user.dataComcode
      }
    },
    onEnd (e) {
      const params = {
        userId: e.row.userId,
        status: 0
      }
      updateUserStatus(params).then((res) => {
        this.hadnleFind()
      })
    },
    onStart (e) {
      const params = {
        userId: e.row.userId,
        status: 1
      }
      updateUserStatus(params).then((res) => {
        this.hadnleFind()
      })
    },
    submitOn () {
      const arr = []
      for (let i = 0; i < this.set.dataComcode.length; i++) {
        arr.push(this.set.dataComcode[i][1])
      }
      const comcode = this.set.comcode ? this.set.comcode.toString() : ''
      const params = {
        partId: this.set.partId,
        userId: this.set.userId,
        name: this.set.name,
        userName: this.set.userName,
        comcode,
        dataComcode: this.set.dataComcode[0][0],
        dataComcodeList: arr,
        positionName: this.set.positionName,
        salesChannelcode: this.set.salesChannelcode,
        chacterview: this.set.chacterview,
        salesChannelcodeList: this.set.salesChannelcodeList
      }
      this.setRuleList.userName = this.set.userName
      this.setRuleList.name = this.set.name
      this.setRuleList.comcode = this.set.comcode
      this.setRuleList.dataComcode = this.set.dataComcode
      this.setRuleList.partId = this.set.partId
      this.setRuleList.partQd = this.set.salesChannelcodeList
      this.setRuleList.chacterview = this.set.chacterview
      this.setRuleList.salesChannelcodeList = []
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.type === 'add') {
            saveUser(params).then(() => {
              this.loading = false
              this.dialogVisible = false
              this.hadnleFind()
            }).catch(() => {
              this.loading = false
            })
          } else {
            updateUser(params).then(() => {
              this.$refs.cascaderRef.$refs.panel.clearCheckedNodes()
              this.$refs.cascaderRef.$refs.panel.activePath = []
              this.loading = false
              this.dialogVisible = false
              this.hadnleFind()
            }).catch(() => {
              this.loading = false
            })
          }
        }
      })
    },
    hadnleFindPage () {
      this.$refs.page.internalCurrentPage = 1
      this.form.pageNow = 1
      const params = `name=${this.form.name}&userName=${this.form.userName}&status=${this.form.status}&comcode=${this.form.comcode}&pageNow=${this.form.pageNow}&dataComcode=${this.form.dataComcode}&roleId=${this.form.roleId}`
      findUserList(params).then((res) => {
        this.tableData = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    hadnleFind () {
      const params = `name=${this.form.name}&userName=${this.form.userName}&status=${this.form.status}&comcode=${this.form.comcode}&pageNow=${this.form.pageNow}&dataComcode=${this.form.dataComcode}&roleId=${this.form.roleId}`
      findUserList(params).then((res) => {
        this.tableData = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.form.pageNow = val
      this.hadnleFind()
    },
    handleChange (value) {
    },
    showEditDialog (e) {
      this.title = '修改用户'
      this.set = e
      this.type = 'set'
      this.dialogVisible = true
      this.handleBlur()
    },
    showCreateDialog () {
      this.title = '用户新增'
      this.dialogVisible = true
      this.type = 'add'
      this.set = {
        name: '',
        userName: '',
        comName: '',
        partId: '',
        comcode: '',
        partName: '',
        dataComcode: '',
        partQd: '',
        salesChannelcodeList: []
      }
    },
    statusFormatter (e) {
      let content = ''
      if (e.status === '1') {
        content = '有效'
      } else {
        content = '无效'
      }
      return content
    }
  }
}
</script>

<style lang="less" scoped>
.el-button{
  padding: 0;
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
.btnList {
  display: flex;
}
.btnList .el-button{
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 1px 16px;
}
.btnList .el-button span img{
  margin-right: 10px;
  vertical-align: text-bottom;
}
.user {
  padding: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    /deep/ .el-input__inner{
        height: 35px !important;
        font-size: 12px;
      }
      /deep/ .el-form-item{
        margin-bottom: 12px !important;
      }
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
          border: none;
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
  }
  #bottom {
    margin-top: 20px;
    background: white;
    border-radius: 5px;
    // padding: 20px  24px 0px 22px;
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
        left: 50px;
        height: 28px;
        line-height: 26px;
      }
    }
    .el-table {
      border: 1px solid #ccc;
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
.user #top .topRow .flex .el-date-editor.el-input[data-v-09562428], .user #top .topRow .flex .el-date-editor.el-input__inner[data-v-09562428]{
  width: 100%;
}
.logo{
  display: flex;
  align-items: center;
  margin: 0 5px;
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
/deep/ .el-form-item__label{
  line-height: 16px;
}
</style>
