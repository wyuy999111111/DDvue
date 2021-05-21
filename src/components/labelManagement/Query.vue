<template>
  <div class="query">
    <!-- <div @click="asd">点击</div>{{this.$store.state.asd}} -->
    <div id="top">
      <HeadTitle params="搜索条件" />
      <el-row class="topRow">
        <el-form :model="form"  label-width="110px">
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="标签名称：">
              <el-input clearable placeholder="请输入标签名称" v-model="form.tagName" style='cursor:pointer' filterable></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="标签分类：">
              <el-cascader
                clearable
                filterable
                placeholder="请选择标签分类"
                v-model="tagClassName"
                :options="options"
                :props="props"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="标签类型：">
              <el-select clearable placeholder="请选择标签类型" v-model="form.tagType" filterable>
                <el-option label="基础标签" value="0"></el-option>
                <el-option label="衍生标签" value="1"></el-option>
                <el-option label="自建标签" value="3"></el-option>
                <!-- <el-option label="自定义标签" value="2"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="标签值类型：">
              <el-select clearable placeholder="请选择标签值类型" v-model="form.tagValueType" filterable>
                <el-option label="文本型" value="4"></el-option>
                <el-option label="数值型" value="1"></el-option>
                <el-option label="日期型" value="3"></el-option>
                <el-option label="枚举型" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="上线时间：">
              <el-date-picker
                v-model="time"
                filterable
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="有效性：">
              <el-select clearable placeholder="请选择有效性" v-model="form.tagVal" filterable>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}">
            <el-form-item label="审核状态：">
              <el-select clearable placeholder="请选择审核状态" v-model="form.tagAudit" filterable>
                <el-option label="审核通过" value="0"></el-option>
                <el-option label="审核未通过" value="1"></el-option>
                <el-option label="待审核" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div class="button">
            <el-button @click="hadnleFind('start')">
              <img src="../../assets/indexImg/查询_1.png" /> 查询
            </el-button>
            <el-button @click="hadnleDelete">
              <img src="../../assets/indexImg/重置_1.png" />重置
            </el-button>
          </div>
        </el-form>
      </el-row>
    </div>
    <div id="bottom">
      <headTitle params="标签列表" />
      <el-table
        :data="tableData"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="tagFieldName" label="标签字段名" align="center"></el-table-column>
        <el-table-column label="标签分类" align="center" prop="tagClassName"></el-table-column>
        <el-table-column label="标签类型" align="center" prop="tagType" :formatter="tagTypeFormatter"></el-table-column>
        <el-table-column
          label="标签值类型"
          align="center"
          prop="tagValueType"
          :formatter="tagValueTypeFormatter"
        ></el-table-column>
        <el-table-column label="有效性" align="center" prop="tagVal" :formatter="tagValFormatter" ></el-table-column>
        <el-table-column label="上线时间" align="center" prop="upTime"></el-table-column>
        <el-table-column label="审核状态" align="center" prop="tagAudit">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.tagAudit==='1'? 'red': ''}"
              v-if="scope.row.tagAudit ==='1'"
              @click="refuse(scope.row)"
            >审核未通过</span>
            <span v-else-if="scope.row.tagAudit ==='0'">审核通过</span>
            <span
              v-else-if="scope.row.tagAudit ==='2'"
              :style="{color:scope.row.tagAudit==='2'? 'red': ''}"
            >待审核</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="286px">
          <template slot-scope="scope">
            <span v-for="item in arr" :key="item" @click="hadnleOperation(item,scope.row)">
              <img src="../../assets/indexImg/详情_1.png" v-if="item === '详情'" alt />
              <img src="../../assets/indexImg/修改.png" v-if="item === '修改'" alt />
              <img src="../../assets/indexImg/审核.png" v-if="item === '审核'" alt />
              <img src="../../assets/indexImg/禁用1.png" v-if="item === '禁用'" alt />
              <img src="../../assets/indexImg/启用1.png" v-if="item === '启用'" alt />
              {{item}}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="240px">
          <template slot-scope="scope">
            <div class="btnsss">
              <span class="spanLogo" v-for="item in user" :key="item" @click="hadnleOperation(item, scope.row)">
                <span class="imgsss" v-if="item === '详情'"><img src="../../assets/indexImg/详情_1.png" alt /><span>{{item}}</span></span>
                <span class="imgsss" v-if="item === '修改'"><img src="../../assets/indexImg/修改.png" v-if="item === '修改'" alt /><span>{{item}}</span></span>
                <span class="imgsss" v-if="item === '审核'&& scope.row.tagAudit === '2'"><img src="../../assets/indexImg/审核.png" alt /><span>{{item}}</span></span>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
        background
        @size-change="handleSizeChange"
        :current-page="form.pageNow"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :total="totalCount"
          :page-sizes="[10,20,30,40]"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next ,sizes, jumper, total"
        ></el-pagination>
      </div>
      <!-- <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="totalCount"
        ></el-pagination>
      </div> -->
    </div>
    <!-- 审核未通过对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="25%" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>审核未通过</span>
      </span>
      <el-form v-model="detail" disabled>
        <el-form-item label="标签名称：" label-width="120px">
          <el-input
            type="text"
            style="border:none;height:35px;width:100%;"
            v-model="detail.tagName"
          />
        </el-form-item>
        <el-form-item label="备注：">
          <br />
          <el-input
            type="textarea"
            name
            id
            cols="30"
            rows="10"
            style="background-color:#f6f7fc;border:none;width:100%"
            v-model="detail.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goback">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import HeadTitle from '../../common/HeadTitle'
// import { stringify } from 'querystring'
import { queryAllTagClass, findUserRe, queryAllTag } from '../../api/getApi'
export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      totalCount: '',
      tagClassName: '',
      form: {
        tagName: '', // 标签名称
        tagClassName: '', // 标签分类
        tagType: '', // 标签类型
        tagValueType: '', // 标签值类型
        startTime: '',
        endTime: '',
        tagAudit: '', // 审核状态
        pageSize: '10',
        pageNow: '1',
        upTime: '', // 上线时间
        tagDesc: '', // 标签描述
        tagCal: '', // 标签口径
        tagExplain: '', // 语义解释
        tagVal: '', // 有效性
        tagEnum: '', // 标签枚举值
        remarks: '', // 审核备注
        tagClassIds: '',
        tagClassId: '' // 标签分类ID
      },
      time: [' ', ''],

      // 表格数据
      tableData: [],
      value: [],
      options: [],
      detail: {
        tagName: '',
        remarks: ''
      },
      props: {
        children: 'child',
        value: 'name',
        label: 'name',
        multiple: true
      },
      dialogVisible: false,
      arr: ['详情', '修改', '审核', '禁用', '启用'],
      user: []
    }
  },
  created () {
    this.hadnleFind()
    this.getUser()
    queryAllTagClass().then(res => {
      this.$store.state.tagClassList = res.data.data
      this.options = this.$store.state.tagClassList
      console.log(this.options)
    })
  },
  watch: {
    '$store.state.menuList' () {
      console.log(this.$store.state.menuList)
      for (let i = 0; i < this.$store.state.menuList.length; i++) {
        if (this.$store.state.menuList[i].resName === '标签管理') {
          for (let j = 0; j < this.$store.state.menuList[i].children.length; j++) {
            if (this.$store.state.menuList[i].children[j].resName === '标签查询') {
              this.$store.state.rights = this.$store.state.menuList[i].children[j].prmsIdentity
              console.log(this.$store.state.menuList[i].children[j].prmsIdentity)
            }
          }
        }
      }
    }
  },
  methods: {
    getUser () {
      console.log('123')
      this.user = []
      findUserRe().then((res) => {
        console.log(res.data.data)
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].resName === '标签管理') {
            for (let j = 0; j < res.data.data[i].children.length; j++) {
              if (res.data.data[i].children[j].resName === '标签查询') {
                console.log('xtgl')
                this.user = res.data.data[i].children[j].prmsIdentity
              }
            }
          }
        }
        console.log(this.user)
      })
    },
    asd () {
      this.$store.state.asd = '234'
      console.log(this.$store.state)
    },
    hadnleOperation (e, row) {
      // console.log(e)
      // console.log(row)
      // console.log(stringify(row))
      // console.log(e, row + 'fdgdfgdfgdfgdsgdfgd')
      // if (e === '详情') {
      //   this.$router.push({ path: '/labelManagement/detail', query: { row } })
      // } else if (e === '修改') {
      //   this.$router.push({ path: '/labelManagement/modify', query: { row } })
      // } else if (e === '审核') {
      //   this.$router.push({ path: '/labelManagement/verify', query: { row } })
      // }
      // console.log(e, row)
      const params = `remarks=${row.remarks}&tagId=${row.tagId}&tagEnum=${row.tagEnum}&tagVal=${row.tagVal}&tagCal=${row.tagCal}&tagExplain=${row.tagExplain}&tagDesc=${row.tagDesc}&createTime=${row.createTime}&upTime=${row.upTime}&tagClassName=${row.tagClassName}&tagName=${row.tagName}&tagType=${row.tagType}&tagValueType=${row.tagValueType}&tagAudit=${row.tagAudit}&tagFieldName=${row.tagFieldName}&tagClassId=${row.tagClassId}&parentId=${row.parentId}&ifpercent=${row.ifpercent}`
      console.log(e, row)
      if (e === '详情') {
        // const params = JSON.stringify(row)
        // console.log(params)
        this.$router.push('/labelManagement/detail?' + params)
        console.log(this.$route.query)
      } else if (e === '修改') {
        this.$router.push('/labelManagement/modify?' + params)
      } else if (e === '审核') {
        this.$router.push('/labelManagement/verify?' + params)
      } else if (e === '禁用') {

      } else if (e === '启用') {

      }
    },
    hadnleFind (e) {
      console.log(e)
      this.form.startTime = this.time[0].length > 3 ? this.time[0] + ' 00:00:00' : ''
      this.form.endTime = this.time[1].length > 3 ? this.time[1] + ' 23:59:59' : ''
      const arr = []
      console.log(this.tagClassName)
      for (let i = 0; i < this.tagClassName.length; i++) {
        arr.push(this.tagClassName[i][this.tagClassName[i].length - 1])
      }
      console.log(arr)
      console.log(this.form.tagClassName)
      this.form.tagClassIds = arr
      // this.form.tagClassName = ''
      if (e === 'start') {
        this.form.pageNow = 1
      }
      queryAllTag(this.form).then(res => {
        this.tableData = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    hadnleDelete () {
      this.time = ['', '']
      this.tagClassName = ''
      this.form = {
        tagName: '', // 标签名称
        tagClassName: '',
        tagType: '', // 标签类型
        tagValueType: '', // 标签值类型
        startTime: '',
        endTime: '',
        tagAudit: '', // 审核状态
        pageSize: '10',
        pageNow: '1'
      }
    },
    handleCurrentChange (val) {
      console.log(val)
      this.form.pageNow = val
      this.hadnleFind()
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.hadnleFind()
    },
    showAuditDialog () {
      this.dialogVisible = true
    },
    goback () {
      console.log(2344)
      this.dialogVisible = false
    },
    tagTypeFormatter (e) {
      // 标签类型
      let str = ''
      if (e.tagType === '0') {
        str = '基础标签'
      } else if (e.tagType === '1') {
        str = '衍生标签'
      } else if (e.tagType === '2') {
        str = '自定义标签'
      } else if (e.tagType === '3') {
        str = '自建标签'
      } else {
        str = '暂无'
      }
      return str
    },
    tagValueTypeFormatter (e) {
      // 标签值类型
      let str = ''
      if (e.tagValueType === '1') {
        str = '数值型'
      } else if (e.tagValueType === '2') {
        str = '枚举型'
      } else if (e.tagValueType === '3') {
        str = '日期型'
      } else if (e.tagValueType === '4') {
        str = '文本型'
      } else {
        str = '暂无'
      }
      return str
    },
    tagValFormatter (e) {
      // 有效性
      let str = ''
      if (e.tagVal === '0') {
        str = '无效'
      } else if (e.tagVal === '1') {
        str = '有效'
      } else {
        str = '暂无'
      }
      return str
    },
    tagAuditFormatter (e) {
      // 审核状态
      let str = ''
      if (e.tagAudit === '0') {
        str = <span class="red">同意</span>
      } else if (e.tagAudit === '1') {
        str = '拒绝'
      } else if (e.tagAudit === '2') {
        str = '待审核'
      } else {
        str = '暂无'
      }
      return str
    },
    refuse (row) {
      this.dialogVisible = true
      console.log(row)
      this.detail.tagName = row.tagName
      this.detail.remarks = row.remarks
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-table .cell {
  line-height: 20px !important;
}
/deep/ .el-table td {
  padding: 6px 0 !important;
}
/deep/ .el-range-input{
  font-size: 12px !important;
}
.cursor{
  cursor: pointer;
}
.red {
  color: red;
}
.btnsss{
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.imgsss{
  display: flex;
  align-items: center;
}
.imgsss img{
  margin-right: 5px;
}
.spanLogo{
  margin: 0 5px;
  display: flex;
  align-items: center;
}
.query {
  margin: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    .topRow {
      padding: 0 20px 12px 30px;
     /deep/ .el-input__inner{
        // border:none;
        background-color: #f6f7fc;
        height: 35px !important;
        font-size: 12px;
      }
     /deep/ .el-form-item{
       margin-bottom: 12px;
      }
    .el-input{
      width: 100%;
    }
    .el-cascader {
      width:100%;
    }
    .el-select {
      width:100%;
    }
    .el-range-editor{
      width:100%;
    }
      }
    }
    .button {
      display: flex;
      float: right;
      justify-content: space-between;
      margin-right: 2%;
      margin-top: 8px;
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
    .el-table {
      // height: 45px;
      // line-height: 40px;
      border: 1px solid #ccc;
      margin: 0px 45px;
      width: 94% !important;
      /deep/ .el-table__header-wrapper {
        background-color: #e6e9f2;
        height: 40px !important;
        display: flex;
        align-items: center;
      }
    }
  }

.el-button {
  border: none;
  padding: 0px 6px;
  img {
    margin-right: 4px;
    vertical-align: text-bottom;
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
    /deep/ .el-pager li {
      border: 1px solid #ddd;
      background-color: #fff;
    }
    .el-input {
      margin: -3px 0px;
      box-sizing: border-box;
    }
    /deep/ .el-input--mini .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
    /deep/ .el-input--mini .el-input__icon {
      line-height: 22px;
    }
  }
}
#dialog {
  /deep/ .el-dialog {
    border-radius: 12px;
    /deep/ .el-form-item__label {
      text-align: left;
    }
  }
  /deep/ .el-dialog__header {
    background-color: #f6f7fc !important;
    border-radius: 12px 12px 0 0;
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
    /deep/ .el-dialog__headerbtn {
      font-size: 28px;
      color: #aaa;
      position: absolute;
      top: 16px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 20px 20px 0px;
    /deep/ .el-form-item {
      margin-bottom: 0px;
    }
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    .el-button {
      background-color:#02a4ff;
      width: 90px;
      height: 30px;
      color: #fff;
    }
  }
}
</style>
