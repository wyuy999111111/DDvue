<template>
  <div class="role">
    <div id="top">
      <HeadTitle params="搜索条件" />
      <el-form  label-width="102px">
        <el-row class="topRow">
        <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" v-model="form">
          <el-form-item label="角色名">
            <el-input placeholder="请输入角色名称" id="only" v-model="form.partName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
          <el-form-item label="有效性">
            <el-select placeholder="请选择有效性" v-model="form.partStatus" clearable>
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
          <el-form-item label='分公司管理员是否可见'>
            <el-select v-model="form.flag">
              <el-option label="是" value='1' />
              <el-option label='否' value='0' />
            </el-select>
          </el-form-item>
        </el-col>
        <div class="button">
          <el-button @click="hadnleQuery">
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
      <headTitle params="角色列表" />
      <div class="addUsers" @click="dialogVisible = true" v-if='user.indexOf("创建角色") > -1'>
        <img src="../../assets/indexImg/资源 82.png" alt />
        <span>创建角色</span>
      </div>

      <el-table
        :data="roleList"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column prop="partName" label="角色名" align="left"></el-table-column>
        <el-table-column prop="partDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="有效性" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.partStatus==1">有效</span>
            <span v-if="scope.row.partStatus==0">无效</span>
          </template>
        </el-table-column>
        <el-table-column prop='flag' label='分公司管理员是否可见' align='center'>
          <template slot-scope='scope'>
            <span v-if="scope.row.flag=='1'">是</span>
            <span v-if="scope.row.flag=='0'">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="286px">
          <template slot-scope="scope">
            <div class="logo">
              <span v-for="(item, index) in user" :key="index" @click="hadnleOperation(item, scope)" class="spanLogo">
                <div v-if="item === '修改'" class="flexAlign"><img src="../../assets/indexImg/修改.png" alt class="img" /><span>{{item}}</span></div>
                <div v-if="item === '查看'" class="flexAlign"><img src="../../assets/indexImg/修改.png" alt class="img" /><span>{{item}}</span></div>
                <div class="flexAlign" v-if="item === '禁用启用' && scope.row.partStatus === '1' && scope.row.partName !== '系统管理员' && scope.row.partName !== '分公司管理员'" @click="onEnd(scope)"><img class="img" src="../../assets/indexImg/禁用1.png" alt /><span>禁用</span></div>
                <div class="flexAlign" v-if="item === '禁用启用' && scope.row.partStatus === '0' && scope.row.partName !== '系统管理员' && scope.row.partName !== '分公司管理员'" @click="onStart(scope)"><img class="img" src="../../assets/indexImg/启用1.png" alt /><span>启用</span></div>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          :pager-count="7"
          ref='page'
          @current-change="handleCurrentChange"
          :page-size="10"
          background
          :total="totalCount"
          prev-text="上一页"
            next-text="下一页"
            layout="prev ,pager ,next , jumper, total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建角色对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="1050px" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>角色创建</span>
      </span>
      <el-form :model="ruleForm" label-width="120px" label-position="left" :rules="rules" ref='refadd'>
        <el-form-item label="角色名：" prop='partName'>
          <input type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" value="roleList." v-model="submitList.partName" />
        </el-form-item>
        <el-form-item label="角色描述：" prop='partDesc'>
          <input type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" v-model="submitList.partDesc"/>
        </el-form-item>
        <el-form-item label="分公司管理员是否可见：" prop='flag'>
          <el-select v-model="submitList.flag">
            <el-option value="1" label="是" />
            <el-option value="0" label="否" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px" class="nbs">
          <el-tree
            :data="createdRoleList"
            node-key="id"
            ref='treeNew'
            :props="defaultProps"
            default-expand-all
            :render-content="renderContentAdd"
            :expand-on-click-node="false">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading='loading' @click="handleFalse">确定</el-button>
        <el-button @click="hadnleFalseTwo">取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="changeVisible" width="1050px" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>角色修改</span>
      </span>
      <el-form label-width="120px" label-position="left" ref='refchange' :model="ruleForms" :rules="ruleschange">
        <el-form-item label="角色名：" prop='name'>
          <input type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" value="roleList." v-model="changeData.partName" />
        </el-form-item>
        <el-form-item label="角色描述：" prop='ms'>
          <input type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" v-model="changeData.partDesc"/>
        </el-form-item>
        <el-form-item label="分公司管理员是否可见：" prop='flag'>
          <el-select v-model="changeData.flag">
            <el-option value="1" label="是" />
            <el-option value="0" label="否" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px" >
          <el-tree
            :data="changeList"
            node-key="id"
            ref='tree'
            :props="defaultProps"
            :render-content="renderContentSet"
            default-expand-all
            :expand-on-click-node="false">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="setPartName !== '系统管理员'" :loading='loading' @click="handleChange">确定</el-button>
        <el-button @click="handleChangeFalse">取消</el-button>
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog :visible.sync="seeVisible" width="1050px" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>角色查看</span>
      </span>
      <el-form label-width="120px" label-position="left" ref='refchange' :model="ruleForms" :rules="ruleschange">
        <el-form-item label="角色名：" prop='name'>
          <input disabled type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" value="roleList." v-model="changeData.partName" />
        </el-form-item>
        <el-form-item label="角色描述：" prop='ms'>
          <input disabled type="text" style="border:none;height:35px;width:95%;background-color:#f6f7fc" v-model="changeData.partDesc"/>
        </el-form-item>
        <el-form-item label="分公司管理员是否可见：" prop='flag'>
          <el-select v-model="changeData.flag" disabled>
            <el-option value="1" label="是" />
            <el-option value="0" label="否" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px" >
          <el-tree
            :data="changeList"
            ref='tree'
            :props="defaultProps"
            :render-content="renderContentSee"
            default-expand-all
            :expand-on-click-node="false">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="seeVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { findRoleList, findResource, postSaveRole, findUserRe, updateRole, updateRoleStatus, updateRoleStatusEnd, findRoleDetail } from '../../api/getApi'
export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      loading: false,
      changeNum: 0,
      pdStatus: true,
      getStatus: '',
      num: 0,
      x: -1,
      y: -1,
      partId: '', // 选中id
      scope: '', // 选中的信息对象
      changeVisible: false,
      seeVisible: false,
      changeList: [],
      checkList: [],
      asd: '',
      // 搜索表单
      form: {
        partName: '',
        partStatus: '',
        pageNow: '1',
        flag: ''
      },
      dialogVisible: false,
      totalCount: '', // 总条数
      arr: [1],
      roleList: [],
      createdRoleList: [],
      defaultProps: {
        children: 'children',
        label: 'resName',
        checkStrictly: true,
        getId: 'getId'
      },
      role: {},
      rightsArr: [],
      submitList: {
        partName: '',
        partDesc: '',
        resource: [],
        flag: '1'
      },
      arrabc: [],
      changeData: { // 修改的名称备注
        partName: '',
        partDesc: '',
        flag: ''
      },
      user: [],
      // 创建角色
      ruleForm: {
        partName: '',
        partDesc: '',
        flag: ''
      },
      // 修改
      ruleForms: {
        name: '',
        ms: '',
        flag: ''
      },
      // 创建角色校验
      rules: {
        partName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        partDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: '请输入分公司管理员是否可见', trigger: 'blur' }
        ]
      },
      // 修改角色校验
      ruleschange: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        ms: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: '请输入分公司管理员是否可见', trigger: 'blur' }
        ]
      },
      abc: '',
      setPartName: ''
    }
  },

  created () {
    this.query()
    this.getUser()
    this.addRoles()
    setTimeout(() => {
      this.dialogVisible = false
    }, 0)
  },
  watch: {
    '$store.state.menuList' () {
      this.getUser()
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    renderContentAdd (h, { node, data }) {
      let a = 0
      for (let i = 0; i < this.submitList.resource.length; i++) {
        if (this.submitList.resource[i].resName === data.resName) {
          a = i
        }
      }
      if (data.top === '2' && node.data.prmsIdentity.length > 0) {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.submitList.resource[a].children} style='marginLeft: 10px' >
            <el-checkbox label='查询' value='查询'>菜单</el-checkbox>
            <span class="kj">控件</span>
            {data.prmsIdentity.map((res) => {
                return (
                  <el-checkbox label={res} ></el-checkbox>
                )
              // if (index === 4) {
              //   return (
              //     <el-checkbox label={res} ></el-checkbox>
              //   )
              // } else {
              //   return (
              //     <el-checkbox label={res} ></el-checkbox>
              //   )
              // }
            })}
          </el-checkbox-group>
        </div>)
      } else if (data.top === '2') {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.submitList.resource[a].children} style='marginLeft: 10px' >
            <el-checkbox label='查询' value='查询'>菜单</el-checkbox>
            {data.prmsIdentity.map((res) => {
              return (
                <el-checkbox label={res} ></el-checkbox>
              )
            })}
          </el-checkbox-group>
        </div>)
      } else {
        return (<div> {data.resName} </div>)
      }
    },
    renderContentSet (h, { node, data }) {
      let a = 0
      for (let i = 0; i < this.arrabc.length; i++) {
        if (this.arrabc[i].resName === data.resName) {
          a = i
        }
      }
      if (data.top === '2' && node.data.prmsIdentity.length > 0) {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.arrabc[a].children} style='marginLeft: 10px'>
            <el-checkbox label='查询' value='查询'>菜单</el-checkbox>
            <span class="kj" v-if="node.data.top === '2' && node.data.prmsIdentity.length > 1">控件</span>
            {data.prmsIdentity.map((res) => {
              return (
                <el-checkbox label={res} ></el-checkbox>
              )
            })}
          </el-checkbox-group>
        </div>)
      } else if (data.top === '2') {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.arrabc[a].children} style='marginLeft: 10px'>
            <el-checkbox label='查询' value='查询'>菜单</el-checkbox>
            {data.prmsIdentity.map((res) => {
              return (
                <el-checkbox label={res} ></el-checkbox>
              )
            })}
          </el-checkbox-group>
        </div>)
      } else {
        return (<div> {data.resName} </div>)
      }
    },
    renderContentSee (h, { node, data }) {
      let a = 0
      for (let i = 0; i < this.arrabc.length; i++) {
        if (this.arrabc[i].resName === data.resName) {
          a = i
        }
      }
      if (data.top === '2' && node.data.prmsIdentity.length > 0) {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.arrabc[a].children} style='marginLeft: 10px'>
            <el-checkbox label='查询' value='查询' disabled>菜单</el-checkbox>
            <span class="kj" v-if="node.data.top === '2' && node.data.prmsIdentity.length > 1">控件</span>
            {data.prmsIdentity.map((res) => {
              return (
                <el-checkbox label={res} disabled></el-checkbox>
              )
            })}
          </el-checkbox-group>
        </div>)
      } else if (data.top === '2') {
        return (<div class='spanFlex' style='display: flex'>
          {data.resName}
          <el-checkbox-group v-model={this.arrabc[a].children} style='marginLeft: 10px'>
            <el-checkbox label='查询' value='查询' disabled>菜单</el-checkbox>
            {data.prmsIdentity.map((res) => {
              return (
                <el-checkbox label={res} disabled></el-checkbox>
              )
            })}
          </el-checkbox-group>
        </div>)
      } else {
        return (<div> {data.resName} </div>)
      }
    },
    handleGetData (node, data) {
    },
    getUser () {
      this.user = []
      findUserRe().then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].resName === '系统管理') {
            for (let j = 0; j < res.data.data[i].children.length; j++) {
              if (res.data.data[i].children[j].resName === '功能角色') {
                this.user = res.data.data[i].children[j].prmsIdentity
              }
            }
          }
        }
      })
    },
    hadnleClose () {
      // this.$router.go(0)
    },
    startOn () { // 重置
      this.form = {
        partName: '',
        partStatus: '',
        pageNow: '1',
        flag: ''
      }
    },
    handleChangeFalse () {
      this.changeVisible = false
    },
    handleChange () { // 修改提交
      this.ruleForms.name = this.changeData.partName
      this.ruleForms.ms = this.changeData.partDesc
      this.ruleForms.flag = this.changeData.flag
      this.$refs.refchange.validate((valid) => {
        if (valid) {
          const params = {
            partId: this.partId,
            resource: this.arrabc,
            partName: this.changeData.partName,
            partDesc: this.changeData.partDesc,
            flag: this.changeData.flag
          }
          this.loading = true
          updateRole(params).then((res) => {
            this.loading = false
            this.query()
            if (res.data.code === 0) {
              this.changeVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    onEnd (e) {
      updateRoleStatus(e.row.partId).then(() => {
        this.query()
      })
    },
    onStart (e) {
      updateRoleStatusEnd(e.row.partId).then(() => {
        this.query()
      })
    },
    hadnleOperation (e, scope) {
      if (this.$store.state.user.codeName) {
        this.setPartName = scope.row.partName
        this.changeData.partName = scope.row.partName
        this.changeData.partStatus = scope.row.partStatus
        this.changeData.partDesc = scope.row.partDesc
        this.changeData.flag = scope.row.flag
        this.scope = scope
        this.changeList = []
        this.arrabc = []
        console.log(e)
        if (e === '修改') {
          this.partId = scope.row.partId
          this.changeNum++
          this.changeVisible = true
          let status = ''
          if (this.$store.state.user.codeName === '总公司') {
            status = '1'
          } else {
            status = '2'
          }
          const params = `partId=${scope.row.partId}&status=${status}`
          findRoleDetail(params).then(res => {
            this.changeList = res.data.data
            const arr = []
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                id: res.data.data[i].resId,
                children: [],
                resName: res.data.data[i].resName
              })
              for (let j = 0; j < res.data.data[i].children.length; j++) {
                arr.push({
                  id: res.data.data[i].children[j].resId,
                  children: res.data.data[i].children[j].child,
                  resName: res.data.data[i].children[j].resName
                })
              }
            }
            this.arrabc = arr
          })
        } else if (e === '查看') {
          this.getStatus = 'xiugai'
          this.partId = scope.row.partId
          this.seeVisible = true
          let status = ''
          if (this.$store.state.user.codeName === '总公司') {
            status = '1'
          } else {
            status = '2'
          }
          const params = `partId=${scope.row.partId}&status=${status}`
          findRoleDetail(params).then(res => {
            this.changeList = res.data.data
            const arr = []
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                id: res.data.data[i].resId,
                children: [],
                resName: res.data.data[i].resName
              })
              for (let j = 0; j < res.data.data[i].children.length; j++) {
                arr.push({
                  id: res.data.data[i].children[j].resId,
                  children: res.data.data[i].children[j].child,
                  resName: res.data.data[i].children[j].resName
                })
              }
            }
            this.arrabc = arr
          })
        }
      } else {
        this.$message.warning('用户信息请求中')
      }
    },
    hadnleFormatter () {
    },
    handleCurrentChange (res) {
      this.form.pageNow = res
      this.query()
    },
    handleFalse () {
      this.ruleForm.partName = this.submitList.partName
      this.ruleForm.partDesc = this.submitList.partDesc
      this.ruleForm.flag = this.submitList.flag
      this.$refs.refadd.validate((valid) => {
        if (valid) {
          this.loading = true
          postSaveRole(this.submitList).then((res) => {
            this.query()
            this.loading = false
            if (res.data.code === 0) {
              this.dialogVisible = false
              this.$message.success(res.data.data)
              this.submitList = {
                partName: '',
                partDesc: '',
                resource: [],
                flag: '1'
              }
              this.addRoles()
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    hadnleFalseTwo () {
      this.dialogVisible = false
    },
    asdasd (a, b) {
    },
    hadnleQuery () {
      this.$refs.page.internalCurrentPage = 1
      this.form.pageNow = 1
      const params = `partName=${this.form.partName}&partStatus=${this.form.partStatus}&pageSize=10&pageNow=${this.form.pageNow}&flag=${this.form.flag}`
      findRoleList(params).then(res => {
        this.roleList = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    query () {
      const params = `partName=${this.form.partName}&partStatus=${this.form.partStatus}&pageSize=10&pageNow=${this.form.pageNow}&flag=${this.form.flag}`
      findRoleList(params).then(res => {
        this.roleList = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    addRoles () {
      if (this.$store.state.user.codeName) {
        let params = ''
        if (this.$store.state.user.codeName === '总公司') {
          params = 'status=1'
        } else {
          params = 'status=2'
        }
        findResource(params).then(res => {
          this.createdRoleList = res.data.data
          this.submitList = {
            partName: '',
            partDesc: '',
            resource: [],
            flag: '1'
          }
          for (let i = 0; i < res.data.data.length; i++) {
            this.submitList.resource.push({
              id: res.data.data[i].resId,
              children: [],
              resName: res.data.data[i].resName
            })
            for (let j = 0; j < res.data.data[i].children.length; j++) {
              this.submitList.resource.push({
                id: res.data.data[i].children[j].resId,
                children: [],
                resName: res.data.data[i].children[j].resName
              })
            }
          }
        })
      } else {
        setTimeout(() => {
          this.addRoles()
        }, 1000)
      }
    },
    handleNodeClick (data) {
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-select {
  width: 100% !important;
}
#dialog /deep/ .el-select {
  width: 95% !important;
}
#dialog /deep/.el-dialog__body .el-input__icon{
  left: 0 !important;
}
#dialog /deep/ .el-input__inner{
  padding: 0;
}
/deep/ .topRow .el-input__inner{
  font-size: 12px !important;
  height: 35px;
}
/deep/ .el-table .cell {
  line-height: 20px !important;
}
/deep/ .el-table td {
  padding: 6px 0 !important;
}
// .nbs{
//   // background: red;
// }
// .el-checkbox{
//   background: red !important;
// }
.el-button{
  padding: 0;
}
.kj{
  padding: 0 20px;
  margin: 0 20px;
  color: red;
  border: 1px solid red;
}
.optionList{
  margin-left: 20px;
}
.role #top .topRow .flex .label[data-v-09546b53]{
  font-size: 12px;
}
.img{
  margin: 0 5px;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexAlign{
  display: flex;
  align-items: center;
}
.spanLogo{
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  justify-content: center;
}
.flexaaa {
  display: flex;
}
.role {
  margin: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    .topRow {
      padding: 0 20px 20px 30px;
      .flex {
        display: flex;
        align-items: center;
        margin: 5px 15px;

        .label {
          width: 102px;
          font-size: 12px;
          text-align: left;
          color: #333;
        }
        /deep/ .el-input__inner {
          background-color: #f6f7fc;
          // border: none;
        }
        .el-select {
          width: 100%;
        }
      }
    }
    .button {
      display: flex;
      float: right;
      justify-content: space-between;
      margin-right: 2%;
      margin-top: 20px;
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
        background-color: #e6e9f2;
      }
      .el-button {
        border: none;
        padding:0;
        background-color: #02a4ff;
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
    /deep/ .el-dialog__body {
      padding: 20px 20px 0px;
      /deep/ .el-form-item {
        margin-bottom: 23px;
      }

      .el-input__inner {
        background-color: #f6f7fc;
        // width: 185%;
        border: none;
      }
      .el-input__icon {
        position: relative;
        left: 180px;
        font-weight: 700;
      }
    }
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    .el-button {
      background-color: #02a4ff;
      width: 90px;
      color: #fff;
      padding: 0px 0px;
      height: 28px;
      margin: 40px 36px 10px;
    }
  }
}
/deep/ .el-form-item__label{
  line-height: 16px;
}
/deep/.el-tree-node__content{
  height: 35px;
}
</style>
