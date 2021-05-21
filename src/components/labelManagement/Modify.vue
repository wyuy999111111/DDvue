<template>
  <div class="additional">
    <div class="header">
      <img src="../../assets/indexImg/资源 101.png" alt />标签信息
    </div>
    <div class="formaaa">
      <el-row class="form">
        <el-form :gutter="24" class="topRow" label-width="120px" :model="form" :rules="rules" status-icon ref="form">
          <el-col :span="12">
            <el-form-item label="标签名称：" prop="tagName">
              <el-input v-model="form.tagName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签字段名："  prop="tagFieldName">
              <el-input v-model="form.tagFieldName" :disabled='form.tagType === "3"'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签分类：" prop="tagClassNamea">
              <el-cascader v-model="form.tagClassNamea"
              :options="option" :props="defaultProps"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签类型："  prop="tagType">
              <el-select placeholder="请选择标签类型" v-model="form.tagType" disabled>
                <el-option label="基础标签" value="0"></el-option>
                <el-option label="衍生标签" value="1"></el-option>
                <el-option label="自建标签" value="3"></el-option>
                <!-- <el-option label="自定义标签" value="2"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签值类型：" prop="tagValueType">
              <el-select placeholder="请选择标签类型" v-model="form.tagValueType">
                <el-option label="枚举值" value="2"></el-option>
                <el-option label="数值型" value="1"></el-option>
                <el-option label="文本型" value="4"></el-option>
                <el-option label="日期型" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签枚举值：" prop="tagEnum">
              <div style='display:flex; width: 100%'><el-input v-model="form.tagEnum" readonly></el-input>
              <el-button
                @click="dialogVisible=true"
                :disabled="form.tagValueType!=='2'"
                :style="{backgroundColor:form.tagValueType==='2'  ? '': '#f6f7fc'}"
              >编辑</el-button></div>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="是否百分数："  prop="tagEnum">
              <el-select v-model="form.ifpercent" :disabled="form.tagValueType!=='1' ? true : false">
                <el-option value="1" label="是"></el-option>
                <el-option value="0" label="否"></el-option>
              </el-select>
              <!-- <el-input class="only" v-model="form.ifpercent" readonly :required="form.tagValueType!=='2' ? true : false" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有 效 性 ：">
              <el-input v-if="form.tagAudit === '待审核'" v-model="tagVal" readonly></el-input>
              <el-input v-if="form.tagAudit === '审核未通过'" v-model="tagVal" readonly>222</el-input>
              <el-select v-model="form.tagVal"  v-if="form.tagAudit === '审核通过'">
                <el-option label="无效" value="0"></el-option>
                <el-option label="有效" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-button @click="editDialog">修改</el-button> -->
          <el-col :span="12">
            <el-form-item label="标签描述：">
              <el-input type="textarea" v-model="form.tagDesc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签口径：">
              <el-input type="textarea" v-model="form.tagCal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="语义解释：">
              <el-input type="textarea" v-model="form.tagExplain"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态：">
              <el-input  v-model="form.tagAudit" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div id="operation">
        <el-button :loading='loading' @click="modify">确定</el-button>
        <el-button @click="goback">返回</el-button>
      </div>
    </div>
    <!-- 修改枚举值对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="25%" id="dialog" height="300px" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>枚举值</span>
      </span>
      <el-table :data="enumerateData"  max-height="163px" class="tableShow">
        <el-table-column prop="name" label="枚举名称" width="290"></el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button @click="del(e)">删除</el-button> -->
      <span slot="footer" class="dialog-footer">
        <el-form ref="EnumerateForm" :model="enumerateForm" class="goIn">
          <el-form-item label="枚举名称">
            <div class="alignItem">
            <el-input v-model="enumerateForm.name"></el-input>
            <el-button @click="addEnumerateForm" class="addBtn">添加</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-button @click="define">关闭</el-button>
      </span>
    </el-dialog>
    <div class="footer"></div>
  </div>
</template>

<script>
import { queryAllTagClass, saveupdateTagById } from '../../api/getApi'
export default {
  data () {
    return {
      tagVal: '',
      form: {
        tagName: '', // 标签名称
        tagFieldName: '', // 标签字段名
        tagClassId: '', // 标签分类后台传值
        tagClassIda: '',
        tagType: '', // 标签类型
        tagValueType: '', // 标签值类型
        tagEnum: '', // 标签枚举值
        tagDesc: '', // 标签描述
        tagCal: '', // 标签口径
        tagExplain: '', // 语义解释
        tagVal: '', // 有效性
        tagAudit: '', // 审核状态
        enumerateData: [],
        tagClassNamea: [],
        ifpercent: '0',
        tagClassName: [] // 标签分类前台显示
      },
      rules: {
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }
        ],
        tagFieldName: [
          { required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }
        ],
        tagClassNamea: [
          { required: true, message: '标签分类不能为空', trigger: ['blur', 'change'] }

        ],
        tagType: [
          { required: true, message: '标签类型不能为空', trigger: ['blur', 'change'] }

        ],
        tagEnum: [{ required: false, message: '枚举型的枚举值不能为空', trigger: ['blur', 'change'] }],
        tagValueType: [
          { required: true, message: '标签值类型不能为空', trigger: ['blur', 'change'] }

        ]

      },
      option: [],
      defaultProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      dialogVisible: false,
      enumerateData: [],
      enumerateForm: {
        name: ''
      },
      outTagAudit: '',
      loading: false
    }
  },
  created () {
    this.getList()
    this.option = this.$store.state.tagClassList
    this.form = this.$route.query
    if (this.form.tagVal === '1') {
      this.tagVal = '有效'
      this.form.tagVal = '1'
    } else if (this.form.tagVal === '0') {
      this.tagVal = '无效'
      this.form.tagVal = '0'
    }
    this.outTagAudit = this.form.tagAudit
    if (this.form.tagAudit === '0') {
      this.form.tagAudit = '审核通过'
    } else if (this.form.tagAudit === '1') {
      this.form.tagAudit = '审核未通过'
    } else if (this.form.tagAudit === '2') {
      this.form.tagAudit = '待审核'
    }
    for (var i in this.form) {
      if (this.form[i] === 'null' || this.form[i] === 'underfined') {
        this.form[i] = ''
      }
    }
    this.form.tagClassNamea = [
      this.$route.query.parentId,
      this.$route.query.tagClassId
    ]
    this.getList()
    const arr = this.form.tagEnum.split(',')
    for (let i = 0; i < arr.length; i++) {
      this.enumerateData.push({
        name: arr[i]
      })
    }
  },
  methods: {
    getList () {
      queryAllTagClass().then(res => {
        this.option = res.data.data
      })
    },
    goback () {
      this.$router.push('/labelManagement/query')
    },
    modify () {
      this.form.tagClassId = this.form.tagClassNamea[
        this.form.tagClassNamea.length - 1
      ]
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.tagAudit = this.outTagAudit
          console.log(this.outTagAudit)
          this.loading = true
          saveupdateTagById(this.form).then(res => {
            this.loading = false
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              this.$router.push('/labelManagement/query')
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    addEnumerateForm () {
      console.log(this.enumerateForm)
      let a = true
      for (let i = 0; i < this.enumerateData.length; i++) {
        if (this.enumerateData[i].name === this.enumerateForm.name) {
          a = false
        }
      }
      if (a) {
        if (this.enumerateForm.name.trim() !== '') {
          this.enumerateData.push(this.enumerateForm)
          this.enumerateForm = {
            name: ''
          }
        }
      } else {
        alert('该值已存在')
      }
      var str = ''
      this.enumerateData.map(obj => {
        str += obj.name + ','
      })
      var str1 = str.substr(0, str.length - 1)
      console.log(str1)
      this.form.tagEnum = str1
    },
    del (e) {
      this.enumerateData.splice(e.$index, 1)
      console.log(this.enumerateData)
      var str = ''
      this.enumerateData.map(obj => {
        str += obj.name + ','
      })
      var str1 = str.substr(0, str.length - 1)
      console.log(str1)
      this.form.tagEnum = str1
    },
    define () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.alignItem{
  display: flex;
  align-items: center;
}
/deep/ .el-input__inner{
  font-size: 12px !important;
}
/deep/ .el-textarea__inner{
  font-size: 12px !important;
}
.formaaa{
  background: white;
  padding-bottom: 10px;
}
.dialog_title{
  display: flex;
  align-items: center;
}
.tableShow{
  margin-bottom: 10px;
}
.goIn{
  display: flex;
  align-items: center;
  margin-left: -10px;
}
.goIn .el-input{
  width: 100%;
}
/deep/ .alignItem .el-input__inner{
  width: 200px;
}
.goIn .el-form-item /deep/ .el-form-item__label{
  margin-top: 8px;
}
.addBtn{
  // margin-top: -6px;
  margin-left: 10px;
  width: 142px!important;
}
.el-button {
  background-color: #02a4ff;
  width: 63px;
  height: 30px;
  color: #fff;
  line-height: 29px;
  padding: 0px 0px;
  position: relative;
  left: 10px;
  border: none;
}
.additional {
  margin: 20px 15px;
  height: 100%;
  .header {
    margin: 20px 20px;
    color: #33aed3;
    img {
      margin-right: 12px;
      vertical-align: text-bottom;
    }
  }
  .form {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    // height: 100%;
    color: #333;
    .topRow {
      padding: 0 20px 20px 20px;

      .el-button {
        background-color:#02a4ff;
        width: 90px;
        height: 30px;
        color: #fff;
        line-height: 29px;
        padding: 0px 0px;
        position: relative;
        left: 10px;
        border: none;
      }
    }
      .el-button {
        float: right;
        position: relative;
        left: -2%;
        top:5px;
        background-color: #02a4ff;
        color: #fff;
      }
      /deep/ .el-input {
        .el-input__inner {
          background-color: #f6f7fc;
          // border: none;
        }
      }
      /deep/ .el-textarea .el-textarea__inner {
        background-color: #f6f7fc;
        min-height: 136px !important;
        height: 100px;
        // border: none;
      }
      .el-input {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      .el-textarea {
        width: 100%;
      }
  }

  #operation{
   text-align: right;
   margin-right: 40px;
    /deep/ .el-button{
      background-color: #02a4ff;
      // margin-right: 40px;
      width: 90px;
      height: 30px;
      color: #fff;
      line-height: 29px;
      padding: 0px 0px;
  }
}
  #dialog {
    /deep/ .el-dialog {
      border-radius: 12px;
      height: 413px;
      min-width: 430px;
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
          color:c;
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
      height: 200px;
      .el-button{
          width:63px;
          height: 30px;
          background-color: #02a4ff;
          padding: 0px 0px;
          color:#fff;
          margin-left: -20px;
        }
      .el-table{
        td{
          padding: 5px 0px;
        }
      }
      /deep/ .el-form-item {
        margin-bottom: 8px;
      }

      .el-input__inner {
        background-color: #f6f7fc;
        // border: none;
      }
      .el-input__icon {
        position: relative;
        left: 180px;
        font-weight: 700;
      }
    }
  /deep/ .el-dialog__footer {
    text-align: center;
    .el-button {
      background-color: #02a4ff;
      width: 90px;
      color: #fff;
      padding: 0px 0px;
      height: 30px;
      margin: 15px 10px 10px;
    }
  }
  }
}
.footer{
  width: 100%;
  height: 15px;
  background-color: #f7f5f5;
}
</style>
