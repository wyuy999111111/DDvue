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
              <el-input v-model="form.tagClassName" readonly />
              <!-- <el-cascader v-model="form.tagClassName" :options="option" :props="defaultProps"></el-cascader> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签类型：">
              <el-input v-model="form.tagType" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签值类型：">
              <div class="alignItem" style="display:flex; width: 100%; alignItem: center">
                <el-input v-model="form.tagValueType" readonly />
                <el-button @click="customLabelVisible = true">分组模板</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签枚举值：">
              <div class="alignItem" style="display:flex; width: 100%; alignItem: center">
                <el-input v-model="form.tagEnum" readonly></el-input>
                <el-button @click="handleShow"
                :style="{backgroundColor:form.tagValueType==='枚举值' ? '': 'rgb(246, 247, 252)', color:form.tagValueType==='枚举值' ? '': 'white', border: 'none'}"
                :disabled='form.tagValueType === "枚举值" ? false : true' >查看</el-button>
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
              <el-form-item label="有 效 性 ：">
                <el-input v-if="form.tagAudit === '待审核'" v-model="tagVal" readonly></el-input>
                <el-input v-if="form.tagAudit === '审核未通过'" v-model="tagVal" readonly>222</el-input>
                <el-select v-model="form.tagVal"  v-if="form.tagAudit === '审核通过'">
                  <el-option label="无效" value="0"></el-option>
                  <el-option label="有效" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="标签描述：">
              <el-input type="textarea" v-model="form.tagDesc" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签口径：">
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
              <el-input v-model="form.tagAudit" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div id="operation">
        <el-button @click="goback">返回</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="480px" id="dialog" height="300px" :close-on-click-modal="false">
      <span slot="title" class="dialog_title">
        <img src="../../assets/indexImg/资源 98.png" alt />
        <span>枚举值</span>
      </span>
      <el-table :data="enumerateData"  max-height="280px" class="tableShow">
        <el-table-column prop="name" label="枚举名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <div class="footer"></div>
    <el-dialog
      class="dialogAdd"
      title="自定义分组模板"
      :close-on-click-modal="false"
      :visible.sync="customLabelVisible"
      width="901px"
    >
      <div class="customLabelMessage"></div>
      <div class="customLabelDialog">
        <div class="customLabelDialog_left">
          <div class="customLabelList">
            <div class="customLabelTitle">{{ form.tagName }}</div>
            <div class="bqs">
              <div v-for="(item, index) in tagList" :key="index" @click="handleClick(index, item)" class="bq" :style="{ background: (customNow === index) && item.tagName !== '' ? '#CDE7FF' : '' }" >
                {{ item.templateName }}
                <div v-if="item.templateName !== '' && item.templateName !== '通用模板一' && item.templateName !== '通用模板二' && item.templateName !== '通用模板三' && item.templateName" class="rubbish" @click="deleteTagList(index)"></div>
              </div>
            </div>
          </div>
          <div class="addNewPatch" @click="handleAddTag">添加分组模板</div>
        </div>
        <div class="customLabelDialog_right">
          <div class="customLabelContent" v-if="tagList.length !== 0">
            <div class="customLabelTop">
              模板名称：
              <el-input class="customInp" style="width: 140px" v-model="tagList[customNow].templateNameBefore"/>
            </div>
            <div class="group_add">
              <span @click="addBasicLabel" class="cursor alignCenter" style='fontSize: 14px'>
                <img class="add_logo cursor" src="../../assets/indexImg/添加.png" style='margin-right: 10px;' />
                <span class="add_group">添加组别</span>
              </span>
              <div class="hx"></div>
              <el-form label-width="80px">
                <el-form-item
                  v-for="(item, index) in tagList[customNow].groupSwarmsList"
                  :key="index"
                  :label="'组别' + (index + 1) + '：'"
                  id="buds"
                >
                  <el-input v-model="item.groupName" :disabled='disableGroup' />
                  <div style="width: 40px;"></div>
                  <el-input v-model="item.startValue" :disabled='disableGroup' />
                  <div style="height: 40px; padding: auto 10px; display: flex;" class="operator fzClass">
                    <!-- <p class="el-icon-arrow-left" style="lineHeight: 40px; marginLeft: 10px; fontWeight: 700; fontSize: 16px;"></p> -->
                    <el-select v-model="item.leftOperator" :disabled='disableGroup'>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label="=" value="="></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label=">" value=">"></el-option>
                    </el-select>
                    <p style="fontSize: 14px;" > 值 </p>
                    <el-select v-model="item.rightOperator" :disabled='disableGroup'>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label="=" value="="></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label=">" value=">"></el-option>
                    </el-select>
                  </div>
                  <el-input v-model="item.endValue" :disabled='disableGroup' />
                  <!-- v-if="index !== 0" -->
                  <span
                    v-if="disableGroup === false"
                    class="group_close cursor"
                    @click="groupClose(index)"
                    >×</span
                  >
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleAddTagGroupTemplate">保存模板</el-button>
            </div>
            <div class="groupAdd"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import { addTagGroupTemplate, getGroupTemplates, delTemplate } from '@/api/nameList'
import {
  findNumTagClassAndTag, checkAddGroup
} from '@/api/getApi'
export default {
  data () {
    return {
      disableGroup: false,
      templateNameOption: [],
      filterTextCopyThree: '',
      dataReThreee: [],
      fixedLeftResultBq: '-300px',
      windowHeight: 0,
      customLabelVisible: false,
      tagList: [],
      customNow: 0,
      form: {
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
        tagClassName: ''
      },
      defaultProps: {
        label: 'name',
        children: 'child'
      },
      dialogVisible: false,
      enumerateData: []
    }
  },
  created () {
    findNumTagClassAndTag().then((res) => {
      this.dataReGs = res.data.data
      this.dataReThreee = res.data.data
    })
    console.log(this.$route.query)
    this.option = this.$store.state.tagClassList
    this.form = this.$route.query
    if (this.form.tagVal === '1') {
      this.form.tagVal = '有效'
    } else if (this.form.tagVal === '0') {
      this.form.tagVal = '无效'
    }
    if (this.form.tagAudit === '0') {
      this.form.tagAudit = '审核通过'
    } else if (this.form.tagAudit === '1') {
      this.form.tagAudit = '审核未通过'
    } else if (this.form.tagAudit === '2') {
      this.form.tagAudit = '待审核'
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
    if (this.form.tagType === '0') {
      this.form.tagType = '基础标签'
    } else if (this.form.tagType === '1') {
      this.form.tagType = '衍生标签'
    } else if (this.form.tagType === '3') {
      this.form.tagType = '自建标签'
    }
    for (var i in this.form) {
      if (this.form[i] === 'null' || this.form[i] === 'underfined') {
        this.form[i] = ''
      }
    }
    console.log(this.form.tagEnum)
    const arr = this.form.tagEnum.split(',')
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        name: arr[i]
      })
    }
    this.enumerateData = newArr
    getGroupTemplates({ tagId: this.$route.query.tagId }).then((res) => {
      if (res.data.data) {
        this.tagList = res.data.data
        this.handleClick(0, res.data.data[0])
        for (let i = 0; i < res.data.data.length; i++) {
          this.tagList[i].templateNameBefore = this.tagList[i].templateName
        }
      } else {
        this.tagList = []
      }
    })
  },
  watch: {
    filterTextCopyThree (val) { // 1
      this.$refs.treeCopyThree.filter(val)
    }
  },
  methods: {
    handleClick (e, item) {
      this.customNow = e
      console.log(item)
      if (item.templateName === '通用模板一' || item.templateName === '通用模板二' || item.templateName === '通用模板三') {
        this.disableGroup = true
        console.log(this.disableGroup)
      } else {
        this.disableGroup = false
      }
    },
    goback () {
      this.$router.push('/labelManagement/query')
    },
    handleShow () {
      this.dialogVisible = true
    },
    handleAddTag () {
      let can = true
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].tagName === '') {
          can = false
        }
      }
      if (can) {
        this.tagList.push({
          groupFields: '',
          tagName: '',
          ifpercent: '0',
          tagFieldName: '',
          tagType: '1', // 1公式 2分组
          groupSwarmsList: [
            {
              groupName: '',
              startValue: '',
              leftOperator: '<',
              rightOperator: '<=',
              endValue: ''
            }
          ],
          groupValue: '', // 公式
          labelForm: '',
          grouping: [], // 分组
          name: ''
        })
        this.customNow = this.tagList.length - 1
      } else {
        this.$message.error('请先对当前标签进行编辑')
      }
    },
    addBasicLabel () {
      this.tagList[this.customNow].groupSwarmsList.push({
        groupName: '',
        startValue: '',
        leftOperator: '<',
        rightOperator: '<=',
        endValue: ''
      })
    },
    handleAddTagGroupTemplate () {
      if (this.tagList[this.customNow].groupSwarmsList.length === 0) {
        this.$message.warning('至少添加一个分组')
        return
      }
      for (let i = 0; i < this.tagList[this.customNow].groupSwarmsList.length; i++) {
        if (isNaN(this.tagList[this.customNow].groupSwarmsList[i].endValue)) {
          this.$message.warning(`${i + 1}分组结束值不是数字`)
          return
        }
        if (isNaN(this.tagList[this.customNow].groupSwarmsList[i].startValue)) {
          this.$message.warning(`${i + 1}分组开始值不是数字`)
          return
        }
        if (this.tagList[this.customNow].groupSwarmsList[i].groupName === '') {
          this.$message.warning('未设置分组名')
          return
        }
        if (this.tagList[this.customNow].groupSwarmsList[i].startValue === '' && this.tagList[this.customNow].groupSwarmsList[i].endValue === '') {
          this.$message.warning('至少设置一个值')
          return
        }
      }
      const paramsList = []
      for (let i = 0; i < this.tagList[this.customNow].groupSwarmsList.length; i++) {
        paramsList.push({
          minValue: this.tagList[this.customNow].groupSwarmsList[i].startValue,
          maxValue: this.tagList[this.customNow].groupSwarmsList[i].endValue,
          groupNu: this.tagList[this.customNow].groupSwarmsList[i].groupName,
          leftSymbol: this.tagList[this.customNow].groupSwarmsList[i].leftOperator,
          rightSymbol: this.tagList[this.customNow].groupSwarmsList[i].rightOperator
        })
      }
      checkAddGroup(paramsList).then((res) => {
        if (res.data.code !== 0) {
          this.$message.warning(res.data.msg)
        } else {
          const params = {
            groupSwarmsList: this.tagList[this.customNow].groupSwarmsList,
            tagId: this.$route.query.tagId,
            tagName: this.$route.query.tagName,
            templateName: this.tagList[this.customNow].templateNameBefore
          }
          addTagGroupTemplate(params).then((res) => {
            console.log(res.data.code)
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              getGroupTemplates({ tagId: this.$route.query.tagId }).then((res) => {
                if (res.data.data) {
                  this.tagList = res.data.data
                  for (let i = 0; i < res.data.data.length; i++) {
                    this.tagList[i].templateNameBefore = this.tagList[i].templateName
                  }
                } else {
                  this.tagList = []
                }
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    groupClose (index) {
      const newArr = this.tagList.slice(0)
      newArr[this.customNow].groupSwarmsList.splice(index, 1)
      this.tagList = newArr
    },
    deleteTagList (index) {
      console.log(this.tagList)
      const params = {
        tagId: this.$route.query.tagId,
        modelName: this.tagList[index].templateName
      }
      delTemplate(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          getGroupTemplates({ tagId: this.$route.query.tagId }).then((res) => {
            if (res.data.data) {
              this.tagList = res.data.data
              for (let i = 0; i < res.data.data.length; i++) {
                this.tagList[i].templateNameBefore = this.tagList[i].templateName
              }
            } else {
              this.tagList = []
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
      // console.log(index)
    }
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
.formaaa{
  background: white;
  padding-bottom: 10px;
}
.alignItem{
  align-items: center;
}
.dialog_title{
  display: flex;
  align-items: center;
}
.dialog_title span{
  font-size: 14px;
  margin-left: 10px;
  color: #33aed3;
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

#operation {
  text-align: right;
  margin-right: 40px;
  /deep/ .el-button {
    background-color: #02a4ff;
    width: 90px;
    height: 30px;
    color: #fff;
    line-height: 29px;
    padding: 0px 0px;
  }
}
.el-button {
    background-color:#02a4ff;
    width: 90px;
    height: 30px;
    color: #fff;
    line-height: 29px;
    margin: 0 10px;
    padding: 0px 0px;
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
#dialog {
  /deep/ .el-dialog {
    border-radius: 12px;
    height: 413px;
  }
  /deep/ .el-dialog__body {
      padding: 20px 30px;
      height: 265px;
  }
  /deep/ .el-dialog__headerbtn{
    font-size: 28px;
  }
}

/deep/ .el-table td, .el-table th .el-table_1_column_9{
  padding: 6px 0 !important;
}
/deep/ .el-table td, .el-table th .el-table_2_column_18{
  padding: 6px 0 !important;
}
/deep/ .el-table th{
  padding: 6px 0 !important;
}
/deep/ .el-row--flex.is-justify-end{
  margin-right: 1%;
}
// /deep/ [data-v-4164c939] .dialogSave .el-dialog__body .el-select .el-input__inner{
//   width: 100%!important;
// }
// /deep/ #buds .el-form-item__content .el-input .el-input__inner{
//   margin: 0 10px 8px 0;
// }
// /deep/ .formItem[data-v-4164c939]{
//   width: 95%;
// }
/deep/ .el-button:hover {
  background-color: #02a4ff;
  color: #fff;
}
/deep/ .el-input__inner {
  font-size: 12px !important;
  height: 35px !important;
}
.customLabelTitle {
  background: #E6E9F2;
  font-weight: bold;
  font-size: 14px;
  width: 225px;
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
}
.customLabelList {
  width: 225px;
  height: 100%;
  text-align: center;
}
/deep/ .el-dialog__body {
  padding: 0 !important;
}
.bq {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
}
// .rubbishImg{
//   width: 15px;
//   height: 15px;
// }
.rubbish {
  width: 15px;
  height: 15px;
  background: url("../../assets/indexImg/删除.png");
  position: absolute;
  right: 10px;
  background-size: 100% 100%;
}
.group_add {
  margin-top: 25px;
  margin-left: 20px;
}
/deep/ .group_add .el-form{
  margin-right: 15px;
  overflow-y:auto;
  overflow-x:auto;
  width:600px;
  height:170px;
}
/deep/ .group_add .el-form .el-input__inner{
  width: 95%;
}
.spaceBetween {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.add_logo {
  width: 16px;
  height: 16px;
}
.add_logoY {
  width: 16px;
  height: 16px;
}
.fourNew{
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.fourNew /deep/ .el-select{
  width: 125px;
  margin-right: 10px;
}
.newTemplate{
  margin-right: 10px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
.operationList {
  display: flex;
  align-items: center;
}
.alignCenter{
  display: flex;
  align-items: center;
}
.add_group{
  font-size: 14px;
  font-weight: normal!important;
}
.Tname{
  width: 70px;
  top: 0px;
  font-size: 14px;
  font-weight: normal!important;
  margin-right: 10px;
}
.addNewPatch {
  position: absolute;
  bottom: 0px;
  width: 25%;
  background: #02a4ff;
  height: 40px;
  display: flex;
  color: white;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  cursor: pointer;
}
.hx {
  width: 95%;
  height: 1px;
  background: black;
  margin: 10px 0 10px 0;
}
.group_close {
  font-size: 20px;
  // margin-left: 10px;
  font-weight: normal;
}
.customLabelContent {
  width: 93%;
  padding: 20px 0 0 20px;
}
.customLabelTop{
  margin-left: 30px;
}
.customLabelContent .dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  right: 222px;
}
.customLabelContent .customLabelTop .el-input {
  margin-right: 50px;
}
.customLabelContent .el-button {
  margin-left: 40px;
}
.Tbase {
  margin: 20px 0 10px 20px;
  position: relative;
}
.Tbase_bp {
  padding-left: 30px;
  display: flex;
}
.bp_add {
  position: absolute;
  top: 2px;
  left: 10px;
  width: 16px;
  height: 16px;
  background: url("../../assets/indexImg/添加.png");
}
.bp_CH {
  margin-right: 20px;
}
.bp_symbol {
  margin: auto 3px;
}
.customLabelDialog {
  display: flex;
  width: 100%;
}
.customLabelDialog_left {
  display: flex;
  width: 225px;
  height: 357px;
  background-color: #fafafa;
}
.customLabelDialog_right {
  display: flex;
  width: 675px;
  height: 100%;
}
.el-form-item {
  margin: 5px 0;
}
/deep/ .el-form-item__content {
  display: flex;
  align-items: center;
}
.resultCards {
  width: 100%;
  height: 100%;
}
.resultCards .el-input {
  width: 94%;
}
.resultCards .el-select {
  width: 94%;
}
.resultCards .resultCard{
  position: relative;
}
.resultCards .resultCard .el-icon-close {
  font-size: 20px;
  color: #47bcea;
  position: absolute;
  top: 8px;
  right: 10px;
}
.cursor {
  cursor: pointer;
}
.none {
  clear: both;
}
.resultCard {
  position: relative;
  margin: 10px 0;
  width: 385px;
  height: 283px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  float: left;
  margin: 10px 1.56%;
  display: flex;
    text-align: right;
    // align-items: center;
    // justify-content: center;
}
/deep/ .resultCard .el-button{
  // margin-top: 65px;
  position: absolute;
  bottom: 8px;
  right: 10px;
}
.resultCard_s {
  width: 100%;
  // position: relative;
  font-size: 20px;
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
}
.resultCard_s .res_top{
  position: absolute;
  left: 0;
  top: 0;
}
.resultCard_s .el-icon-edit {
  font-size: 20px;
  color: #47bcea;
  position: absolute;
  top: 8px;
  right: 40px;
}
.resultCard_s .el-icon-close {
  font-size: 20px;
  color: #47bcea;
  position: absolute;
  top: 8px;
  right: 10px;
}
.el-form-item /deep/ .el-form-item__label {
  line-height: none !important;
}
/deep/ .el-select__tags {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
}
.formTop .el-form-item__label {
  height: 40px;
  display: flex;
  line-height: none !important;
  text-align: left;
  align-items: center;
  padding-left: 20px !important;
}
.formTop {
  max-height: 200px;
  overflow: auto;
}
#tree {
  overflow-y: scroll;
}
#treeTwo {
  overflow-y: scroll;
  background: white;
}
#deleteIcon {
  padding-right: 10px;
}
#deleteIconTwo {
  padding-right: 10px;
}
.treeOp {
  height: 200px;
}
.formItem {
  width: 95%;
}
.el-cascader[data-v-4164c939]{
  width: 95%;
}
// /deep/ #db_form .spanFlex .el-input__inner{
//   width: 95%;
// }
.fixedaaa {
  background: #e9e9e9;
}
.aaaa {
  width: 95%;
  margin: auto;
  background: white;
}
.spanFlex {
  display: flex;
}
// .formItem .SF-hx{
//   width: 20px!important;
//   height: 1px!important;
//   background-color: #000;
// }
#all {
  margin: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    margin-bottom: 10px;
  }
  .top {
    border-radius: 5px;
    background: white;
    position: relative;
    .top_top{
      width: 107px;
      height: 39px;
      background-color: #e6e9f2;
      position: absolute;
      top: 77px;
      right: 22px;
      z-index: 999;
      line-height: 39px;
      font-size: 12px;
      font-weight: 700;
    }
    .head {
      width: 100%;
      padding: 5px 0px;
      border-radius: 5px;
      .topRow {
        padding: 0 20px 20px 20px;
        .flex {
          display: flex;
          align-items: center;
          margin: 5px 0;
          .label {
            width: 100px;
            font-size: 15px;
            color: #333;
            font-weight: 400;
          }
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
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #33aed3;
  color: #303133;
}
.el-cascader {
  width: 100%;
}
/deep/ .el-range-editor.el-input__inner {
  width: 100%;
  margin-top: 3px;
}
.flex {
  display: flex;
  font-size: 14px;
  font-weight: bold;
}

#headLogo {
  width: 14px;
  margin: 10px 20px;
}
.border {
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  margin-bottom: 10px;
  height: 1px;
}
// position: relative;
// top:-25px;
.border1 {
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  margin-bottom: 10px;
  height: 1px;
  position: relative;
  top: -5px;
}
.FFFF span{
  padding-top: 7px!important;
  font-size: 14px!important;
  color: #47bcea!important;
}
.flexBetween {
  display: flex;
  justify-content: space-between;
  height: 48px;
  align-items: center;
}
.flexBetween span {
  padding-top: 0px;
  // color: #000!important;
}
.more {
  font-size: 14px;
  padding-right: 30px;
  cursor: pointer;
  color: #333;
  display: flex;
  height: 48px;
  justify-content: space-between;
  align-items: center;
}
.result {
  width: 100px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
}
.result span {
  font-size: 14px;
}
.result_t {
  width: 115px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result_t span {
  font-size: 14px;
}
.result_r {
  width: 102px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result_r span {
  font-size: 14px;
}
.el-table .cell {
  font-size: 12px;
}
.load {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55px;
  margin-left: 25px;
}
.load span {
  font-size: 14px;
}
// .echarts{
//   background-color: pink;
//   width: 96%;
//   height: 100px;
//   margin: auto;
// }
.salesperson {
  height: 48px;
  text-align: center;
  .info {
    cursor: pointer;
    position: absolute;
    color: #33aed3;
    //  top:50%;
    //  left:50%;
    //  transform:translate(-50%,-50%);
    position: relative;
    top: -40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      margin-left: -30px;
    }
    p:hover {
      color: #445678;
    }
    span {
      font-size: 22px;
    }
    span:hover {
      color: #445678;
    }
  }
}
/* /deep/ .el-table__header-wrapper {
        background-color: #E6E9F2;
      } */
.fixed {
  position: fixed;
  z-index: 999999;
  top: 0;
  width: 300px;
  height: 500px;
  top: 50px;
  background: #e9e9e9;
  transition: all 0.5s;
}
.asd {
  height: 10px;
  background: #e9e9e9;
}
.fixedResult {
  position: fixed;
  top: 0;
  width: 300px;
  top: 50px;
  transition: all 0.5s;
  z-index: 999999;
}
.fixedTree {
  background: white;
  opacity: 1;
  min-height: 300px;
}
.fixedHead {
  margin: 10px 0 30px 10px;
  display: flex;
  justify-content: space-between;
}
.btnList .el-button {
  display: flex;
}
.el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  // margin: 0 0 0 440px;
  img {
    margin-right: 10px;
    vertical-align: text-bottom;
  }
}
.btnList {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
}
.group {
  display: flex;
  justify-content: space-between;
  height: 54px;
  .el-tabs {
    padding: 10px 1%;
    span {
      font-size: 14px;
      img {
        vertical-align: text-bottom;
        padding-right: 6px;
      }
    }
  }
}
.el-tabs__nav-wrap {
  padding-top: 5px;
}
/deep/ .el-tabs__item {
  color: #aaa;
}
/deep/ .el-tabs__item:hover {
  color: #33aed3;
}
/deep/ .el-tabs__item.is-active {
  color: #33aed3;
}
/deep/ .el-tabs__active-bar {
  background-color: #33aed3;
}
// /deep/.el-tabs__nav {
//   padding-bottom:5px;
// }
/deep/ .dialogAdd .el-dialog {
  height: 401px;
}
/deep/ .dialogAdd .el-dialog__header {
  background: #f2f2f2 !important;
  padding-bottom: 10px;
  padding-top: 10px;
}
/deep/ .dialogAdd .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .customLabelMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .el-dialog__header .el-dialog__title {
  font-weight: 700 !important;
  color: #38afd3 !important;
  padding-left: 30px;
  font-size: 14px!important;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 28px;
}
.customLabelTitle[data-v-4164c939] {
  font-size: 14px;
}
/deep/ .dialogSave .el-dialog {
  height: 406px;
}
/deep/ .dialogSave .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
.dialogSave .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogSave .el-dialog__body {
  padding: 5px 30px 0 10px !important;
}
/deep/ .dialogSave .el-dialog__body .el-textarea__inner {
  background-color: #f6f7fc;
  min-height: 136px !important;
  height: 100px;
}
/deep/ .dialogSave .el-dialog__body .el-select .el-input__inner {
  width: 529px;
}
/deep/ .dialogSave .el-dialog__footer {
  text-align: center;
  margin-left: 60px;
  margin-top: 30px;
}
/deep/ .dialogSave .el-dialog__footer .el-button {
  margin-right: 30px;
  padding: 1px 16px;
}
.el-form-item /deep/ .el-form-item__label {
  font-size: 16px;
}
/deep/ .dialogAqua .el-dialog {
  height: 406px;
}
/deep/ .dialogAqua .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
.dialogAqua .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogAqua .el-dialog__body {
  padding: 0px 30px 0 10px !important;
  height: 290px;
}
/deep/ .dialogAquaa .el-dialog__body .el-form{
  overflow-y:auto;
  overflow-x:auto;
  width:678px;
  height:240px;
}
/deep/ .dialogAqua .el-dialog__body .top_body {
  display: flex;
  margin: 15px 0 20px 20px;
  position: relative;
}
.add_group_add{
  display: flex;
  justify-content: center;
}
.Aqua_addlogo {
  margin-right: 8px;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  background: url("../../assets/indexImg/添加.png") no-repeat;
}
/deep/ .dialogAqua .el-dialog__footer {
  text-align: center;
  margin-left: 60px;
}
/deep/ .dialogAqua .el-dialog__footer .el-button[data-v-4164c939] {
  margin-right: 30px;
}
/deep/ .resultCard [data-v-4164c939] .el-input__inner{
  width: 248px;
}
.alignItemOne{
  display: flex;
  align-items: center;
}
.alignItemOne {
  img{
    padding-left: 10px;
    margin-right: 5px;
  }
}
.alignItemOne{
  span{
    cursor: pointer;
  }
}
.fzClass /deep/ .el-select>.el-input{
  width: 66px;
}
.fzClass /deep/ .el-select{
  width: 60%;
  margin: 0 10px;
}
.blackSpan{
  width: 180px;
  padding-left: 10px;
  color: blue;
  text-decoration: underline;
}
.nameListBtn{
  margin: 0 5px;
}
.nameListForm{
  background: #F5F5F5;
}
.nameListHx{
  height: 1px;
  margin: auto;
  width: 98%;
  background: #F5F5F5;
}
.nameListTitle img{
  padding: 0 10px;
}
/deep/.el-table th.is-leaf{
  background: #E6E9F2;
}
.nameListFind{
  position: relative;
  top: 7px;
  cursor: pointer;
}
.pageSet /deep/ .el-input__inner {
  font-size: 12px !important;
  height: 28px !important;
}
.deleteNameList{
  float: right;
}
.deleteNameList img{
  position: relative;
  left: 72px;
}
.deleteAll{
  padding-right: 20px;
}
/deep/ .nameList .el-dialog {
  height: 726px;
}
.bqs{
  height: 77%;
  overflow-y: auto;
}
</style>
