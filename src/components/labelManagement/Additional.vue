<template>
  <div class="additional">
    <div class="header">
      <img src="../../assets/indexImg/资源 101.png" alt />标签信息
    </div>
    <div class="formaaa">
      <el-row class="form">
        <el-form :gutter="24" class="topRow" :rules="rules" status-icon :model="form" ref="form" label-width="120px" >
          <el-col :span="12">
            <el-form-item  label="标签名称："  prop="tagName">
              <el-input v-model="form.tagName" placeholder="请输入标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="标签字段名："  prop="tagFieldName">

              <el-input v-model="form.tagFieldName" placeholder="请输入标签字段名" :disabled='form.tagType==="3"'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="标签分类："  prop="tagClassIda">
              <el-cascader v-model="form.tagClassIda" :options="option" :props="defaultProps" placeholder="请选择标签分类" ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="标签类型："  prop="tagType">
              <el-select placeholder="请选择标签类型" v-model="form.tagType" @change="handleTagtypeChange">
                <el-option label="基础标签" value="0"></el-option>
                <el-option label="衍生标签" value="1"></el-option>
                <el-option label="自建标签" value="3"></el-option>
                <!-- <el-option label="自定义标签" value="2"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签值类型："   prop="tagValueType">
              <el-select placeholder="请选择标签值类型" v-model="form.tagValueType">
                <el-option label="枚举值" value="2"></el-option>
                <el-option label="数值型" value="1"></el-option>
                <el-option label="文本型" value="4"></el-option>
                <el-option label="日期型" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item  label="标签枚举值："  prop="tagEnum">
              <div style='display:flex; width: 100%'>
              <el-input class="only" v-model="form.tagEnum" readonly :required="form.tagValueType!=='2' ? true : false" ></el-input>
              <el-button @click="dialogVisible=true"
                :disabled="form.tagValueType!=='2'" :style="{backgroundColor:form.tagValueType==='2'  ? '': '#f6f7fc'}">编辑</el-button>
                </div >
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
            <el-form-item  label="有效性 ：" >
              <el-select  v-model="form.tagVal" disabled>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0" selected></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="标签描述：" >
              <el-input placeholder="请输入标签描述" type="textarea" v-model="form.tagDesc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="标签口径：" >
              <el-input placeholder="请输入标签口径" type="textarea" v-model="form.tagCal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="语义解释：" >
              <el-input placeholder="请选择输入语义解释" type="textarea" v-model="form.tagExplain"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态：" >
              <el-select v-model="form.tagAudit" disabled>
                <el-option label="审核通过" value="0"></el-option>
                <el-option label="审核未通过" value="1"></el-option>
                <el-option label="待审核" value="2" selected></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div id="operation">
        <el-button :loading='loading' @click="add()">确定</el-button>
        <el-button @click="goback">返回</el-button>
      </div>
    </div>
    <!--新增枚举值对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="480px" id="dialog" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>枚举值维护</span>
      </span>
      <p>枚举值：</p>
      <el-table :data=" enumerateData" max-height="150px" class="tableShow">
        <el-table-column prop="name" label="枚举名称" width="290"></el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button @click="del(scope)" class="deleteBtn">删除</el-button>
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
        <el-button @click="define">确定</el-button>
        <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
      </span>
    </el-dialog>
    <div class="footer"></div>
  </div>
</template>

<script>
import { queryAllTagClass, saveinsertTag } from '../../api/getApi'
export default {
  data () {
    return {
      loading: false,
      tagClassId: [],
      form: {
        tagName: '', // 标签名称
        tagFieldName: '', // 标签字段名
        tagClassId: '', // 标签分类
        tagClassIda: '', // 标签分类
        tagType: '', // 标签类型
        tagValueType: '', // 标签值类型
        tagEnum: '', // 标签枚举值
        tagDesc: '', // 标签描述
        tagCal: '', // 标签口径
        tagExplain: '', // 语义解释
        tagVal: '0', // 有效性
        tagAudit: '2', // 审核状态
        enumerateData: '',
        ifpercent: '0' // 是不是百分数
      },
      rules: {
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }
        ],
        tagFieldName: [
          { required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }
        ],
        tagClassIda: [
          { required: true, message: '标签分类不能为空', trigger: ['blur', 'change'] }

        ],
        tagType: [
          { required: true, message: '标签类型不能为空', trigger: ['blur', 'change'] }

        ],
        // tagEnum: [{ required: this.form.tagValueType === '2', message: '枚举型的枚举值不能为空', trigger: ['blur', 'change'] }],
        tagValueType: [
          { required: true, message: '标签值类型不能为空', trigger: ['blur', 'change'] }

        ]

      },
      dialogVisible: false,
      option: [
      ],
      defaultProps: {
        value: 'id',
        label: 'name',
        children: 'child'
      },
      asd: {
        arr: [1, 2]
      },
      enumerateData: [],
      enumerateForm: {

        name: ''
      }

    }
  },
  created () {
    this.getList()
    this.asd.arr = this.asd.arr[this.asd.arr.length]
    this.form.enumerateData = this.enumerateData
  },
  methods: {
    getList () {
      // 标签分类选项
      queryAllTagClass().then(res => {
        console.log(res)
        this.option = res.data.data
        // console.log(this.option)
      })
    },
    add () {
      console.log(this.form.tagClassId)
      this.form.tagClassId = this.form.tagClassIda[this.form.tagClassIda.length - 1]
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          saveinsertTag(this.form).then(res => {
            this.loading = false
            console.log(res.data.code)
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              this.$router.push('/labelManagement/Query')
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
    goback () {
      this.$router.push('/labelManagement/query')
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
          const obj = JSON.parse(JSON.stringify(this.enumerateForm))
          this.enumerateData.push(obj)
          this.enumerateForm = {
            name: ''
          }
        }
      } else {
        alert('该值已存在')
      }
      var str = ''
      this.enumerateData.map((obj) => {
        str += obj.name + ','
      })
      var str1 = str.substr(0, str.length - 1)
      console.log(str1)
      this.form.tagEnum = str1
    },
    del (e) {
      console.log(this.form.tagEnum)
      this.enumerateData.splice(e.$index, 1)
      var str = ''
      this.enumerateData.map((obj) => {
        str += obj.name + ','
      })
      var str1 = str.substr(0, str.length - 1)
      console.log(str1)
      this.form.tagEnum = str1
    },
    define () {
      this.dialogVisible = false
    },
    handleTagtypeChange () {
      if (this.form.tagType === '3') {
        this.form.tagFieldName = ''
        this.rules.tagFieldName[0].required = false
      } else {
        this.rules.tagFieldName[0].required = true
      }
    }
  }

}

</script>

<style lang="less" scoped>
.alignItem{
  display: flex;
  align-items: center;
}
/deep/ .el-textarea__inner{
  font-size: 12px !important;
}
.tableShow{
  margin-bottom: 10px;
}
.goIn{
  display: flex;
  align-items: center;
  margin-left: -10px;
}
/deep/ .alignItem .el-input__inner{
  width: 200px;
}
.goIn .el-form-item /deep/ .el-form-item__label{
  margin-top: 8px;
}
.addBtn{
  // margin-top: -6px;
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
  // margin-left: -20px;
}
/deep/ .el-dialog__body .el-button{
  margin-left: -20px;
}
.additional {
  margin: 20px 15px;
  height: 100%;
  .header {
    margin: 20px 20px;
    font-size: 14px;
    color: #33aed3;
    img {
      margin-right: 12px;
      vertical-align: text-bottom;
    }
  }
  .formaaa{
    background: white;
    padding-bottom: 10px;
  }
  .form {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    color: #333;
    /deep/ .el-input__inner{
        height: 35px !important;
        font-size: 12px;
        // padding-bottom: 12px !important;
        // margin-bottom: 12px !important;
      }
      /deep/ .el-form-item{
        margin-bottom: 12px !important;
      }
    .topRow {
      padding: 0 20px 20px 20px;

        .el-button {
          background-color: #02a4ff;
          width: 90px;
          height: 30px;
          color: #fff;
          line-height: 29px;
          padding: 0px 0px;
          position: relative;
          left: 10px;
          border:none;
        }
      }
      .el-button {
        float: right;
        left:-2%;
        top:5px;
        position: relative;
        background-color: #47bcea;
        color: #fff;
      }
   }
        /deep/ .el-input {
          .el-input__inner {
            background-color: #f6f7fc;
            // border: none;
          }
        }
        /deep/ .el-textarea .el-textarea__inner {
          background-color: #f6f7fc;
          // border:none;
          min-height: 136px !important;
          height: 100px;
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
   .el-textarea{
     width:100%;
   }
  #operation{
    text-align: right;
    margin-right: 40px;
      /deep/ .el-button{
        background-color:#02a4ff;
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
          margin-right: 10px;
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
      height: 200px;
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
</style>
