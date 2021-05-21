<template>
  <div class="additional">
    <div class="header">
      <img src="../../assets/indexImg/资源 101.png" alt />标签信息
    </div>
    <div class="formaaa">
      <el-row class="form">
        <el-form :gutter="24" class="topRow" label-width="120px" :model="form">
          <el-col :span="12">
            <el-form-item label="标签名称：">
              <el-input v-model="form.tagName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签字段名：">
              <el-input v-model="form.tagFieldName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签分类：">
              <el-input v-model="form.tagClassName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签类型：">
              <el-input v-model="form.tagType" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签值类型：">
              <el-input v-model="form.tagValueType" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签枚举值：">
              <div class="flex">
                <el-input v-model="form.tagEnum" readonly></el-input>
                <el-button @click="handleShow" :disabled='form.tagValueType === "枚举值" ? false : true' :style="{backgroundColor:form.tagValueType==='枚举值' ? '': 'rgb(246, 247, 252)', color:form.tagValueType==='枚举值' ? '': 'white', border: 'none'}">查看</el-button>
              </div>
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
            <el-form-item label="有 效 性:">
              <el-input type="text" v-model="form.tagVal" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签描述：">
              <el-input type="textarea" v-model="form.tagDesc" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签口径： ">
              <el-input type="textarea" v-model="form.tagCal" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="语义解释：">
              <el-input type="textarea" v-model="form.tagExplain" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态：">
              <el-input type="text" v-model="form.tagAudit" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
        <div id="operation">
          <el-button @click="dialogVisible = true">审核</el-button>
          <el-button @click="goback">返回</el-button>
        </div>
    </div>
    <!-- 审核对话框 -->
    <el-dialog :visible.sync="dialogVisibleB" width="480px" id="dialog" height="300px" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>枚举值维护</span>
      </span>
      <p>枚举值：</p>
      <el-table :data="enumerateData"  max-height="232px" class="tableShow">
        <el-table-column prop="name" label="枚举名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="define">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
     <!-- <el-dialog :visible.sync="dialogVisible" width="20%" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>审核</span>
      </span>
       <el-radio v-model="radio" label="0">通过</el-radio>
       <el-radio v-model="radio" label="1">未通过</el-radio>
       <p>备注：</p>
       <input type="textarea" v-model="reMarks">
      <span slot="footer" class="dialog-footer">
        <el-button :loading='loading' @click="verify">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog> -->
        <!--新版s ------------------------------------------------------- -->
    <el-dialog :visible.sync='dialogVisible' title='审核' width='507px' class='audit_dialog' :close-on-click-modal="false">
      <div class="add_message"></div>
      <el-radio v-model="radio" label="0">通过</el-radio>
      <el-radio v-model="radio" label="1">未通过</el-radio>
      <p style="margin: 12px 0 8px 0;">备注：</p>
      <el-input type="textarea" v-model="reMarks" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button :loading='loading' type="primary" @click="verify">确定</el-button>
      </span>
    </el-dialog>
    <div class="footer"></div>
  </div>
</template>

<script>
import { queryAllTagClass, saveCheckTagById } from '../../api/getApi'

export default {
  data () {
    return {
      loading: false,
      form: {
        tagId: '',
        tagName: '', // 标签名称
        tagFieldName: '', // 标签字段名
        tagClassId: '', // 标签分类
        tagType: '', // 标签类型
        tagValueType: '', // 标签值类型
        tagEnum: '', // 标签枚举值
        tagDesc: '', // 标签描述
        tagCal: '', // 标签口径
        tagExplain: '', // 语义解释
        tagVal: '', // 有效性
        tagAudit: '', // 审核状态
        ifpercent: '0',
        tagClassName: []
      },
      tagClassName: '',
      dialogVisible: false,
      radio: '0',
      reMarks: '',
      option: [],
      dialogVisibleB: false
    }
  },
  created () {
    this.option = this.$store.state.tagClassList
    console.log(this.option)
    this.form = this.$route.query
    if (this.form.tagType === '0') {
      this.form.tagType = '基础标签'
    } else if (this.form.tagType === '1') {
      this.form.tagType = '衍生标签'
    } else if (this.form.tagType === '2') {
      this.form.tagType = '自定义标签'
    } else if (this.form.tagType === '3') {
      this.form.tagType = '自建标签'
    }
    if (this.form.tagValueType === '1') {
      this.form.tagValueType = '数值型'
    } else if (this.form.tagValueType === '2') {
      this.form.tagValueType = '枚举值'
    } else if (this.form.tagValueType === '4') {
      this.form.tagValueType = '文本型'
    } else if (this.form.tagValueType === '3') {
      this.form.tagValueType = '日期型'
    }
    if (this.form.tagVal === '0') {
      this.form.tagVal = '无效'
    } else if (this.form.tagVal === '1') {
      this.form.tagVal = '有效'
    }
    if (this.form.tagAudit === '0') {
      this.form.tagAudit = '审核通过'
    } else if (this.form.tagAudit === '1') {
      this.form.tagAudit = '审核未通过'
    } else if (this.form.tagAudit === '2') {
      this.form.tagAudit = '待审核'
    }
    for (var i in this.$route.query.row) {
      if (this.form[i] === 'null' || this.form[i] === 'underfined') {
        this.form[i] = ''
      }
    }
    this.form.enumerateData = this.enumerateData
    const arr = this.form.tagEnum.split(',')
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        name: arr[i]
      })
    }
    for (const i in this.form) {
      if (this.form[i] === 'null' || this.form[i] === 'underfined') {
        this.form[i] = ''
      }
    }
    this.enumerateData = newArr
    console.log(newArr)
  },
  methods: {
    handleShow () {
      this.dialogVisibleB = true
    },
    getList () {
      queryAllTagClass().then(res => {
        this.option = res.data.data
      })
    },
    goback () {
      this.$router.push('/labelManagement/query')
    },
    verify () {
      this.dialogVisible = false
      console.log(this.radio)
      if (this.radio === 0) {
        this.form.tagVal = 0
        this.form.tagAudit = 1
      }
      const tagAudit = { tagAudit: this.radio, remarks: this.reMarks, tagId: this.form.tagId }
      this.loading = true
      saveCheckTagById(tagAudit).then((res) => {
        this.loading = false
        console.log(res)
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.$router.push('/labelManagement/Query')
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.loading = false
      })
    }
    // editDialog () {
    //   this.dialogVisible = true
    // }
  }
}

</script>

<style lang="less" scoped>
/deep/ .el-input__inner{
  font-size: 12px !important;
}
/deep/ .el-textarea__inner{
  font-size: 12px !important;
}
.flex{
  display: flex;
  align-items: center;
}
.formaaa{
  background: white;
  padding-bottom: 10px;
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
      /deep/ .el-input {
        .el-input__inner {
          background-color: #f6f7fc;
          // border: none;
        }
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
    /deep/ .el-textarea .el-textarea__inner {
      background-color: #f6f7fc;
      min-height: 136px !important;
      height: 100px;
      // border: none;
    }
  }
}
  #operation{
   text-align: right;
   margin-right: 40px;
 /deep/ .el-button{
     background-color: #02a4ff;
  //  margin-right: 40px;
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
      padding: 20px 30px;
      height: 270px;
      p {
    font-size:16px;
    }
    .el-radio {
    margin-right: 30px;
    width: 90px;
    height: 40px;
    }
   input{
     width:100%;
     height: 120px;
     background-color: #f6f7fc;
    //  border:none;
   }
    .el-input__icon {
          position: relative;
          left: 180px;
          font-weight: 700;
        }
      }
    }
    /deep/ .el-dialog__footer {
      .dialog-footer{
        display: flex;
        justify-content: space-around
      }
      text-align: center;
      .el-button {
        background-color:#02a4ff;
        width: 90px;
        height:30px;
        color: #fff;
        padding: 0px 0px;
        height: 28px;
        margin: 0px 20px;
      }
    }
.el-button {
    background-color: #02a4ff;
    width: 90px;
    height: 30px;
    color: #fff;
    line-height: 29px;
    margin: 0 10px;
    padding: 0px 0px;
}
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
.footer{
  width: 100%;
  height: 15px;
  background-color: #f7f5f5;
}
.el-button:hover{
  color: #fff;
  border-color: #409EFF;
  background-color: #409EFF;
}
.el-button:focus{
  color: #fff;
  border-color: #409EFF;
  background-color: #409EFF;
}
/deep/ .el-table--scrollable-y .el-table__body-wrapper{
  height: 200px!important;
}
</style>
