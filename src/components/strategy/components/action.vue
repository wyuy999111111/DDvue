<template>
  <div id="big_box">
    <div class="headControl">
      <div class="qingkuang">情况{{ params + 1 }}：</div>
      <div
        @click="addFactor"
        v-if="typeParams !== 'readonly'"
        class="cursor buttomBtn controlBtn"
      >
        <img class="btnImg" src="../../../assets/strategy/add.png" />
        添加条件因子
      </div>
      <div
        @click="deleteFactor"
        v-if="typeParams !== 'readonly'"
        class="cursor buttomBtn controlBtn"
      >
        <img class="btnImg" src="../../../assets/strategy/delete_2.png" /> 删除
      </div>
    </div>
    <div id="strategyUddate">
      <div class="factors">
        <Factor
          class="factor"
          v-for="(item, index) in $store.state.strategy.sitConditions[params]
            .sitConditionFactors"
          :key="index"
          :params="index"
          :num="params"
          :typeParams="typeParams"
          ref="factor"
        />
      </div>
      <div class="clearBoth"></div>
    </div>
    <!-- <div class="tips" v-if="$store.state.strategy.sitConditions[params].sitConditionFactors.length === 0">点击添加因子按钮增加条件因子</div> -->
    <div class="setMessage">
      <div class="messageShow">
        <div class="messageTitle">
          <p>消息模板</p>
          <img src="../../../assets/strategy/msg.png" alt="" />
        </div>
        <el-input
          type="textarea"
          class="messageTextarea"
          v-model="$store.state.strategy.sitConditions[params].sitMessagev"
          readonly
        />
        <div class="messageBtnList">
          <el-button class="block" @click="messageVisible">设置</el-button>
          <el-button class="block secBlock" @click="preview">预览</el-button>
        </div>
      </div>
      <div class="messageSet">
        <p>
          <img src="../../../assets/strategy/addlabel.png" alt="" />统计指标设置
        </p>
        <div class="messageSetOverflow">
          <div
            class="noListNow"
            v-if="$store.state.strategy.tagEnumList.length === 0"
          >
            暂无标签
          </div>
          <el-form label-width="130px" class="messageForm">
            <el-col :span="24">
              <el-form-item
                v-for="(item, index) in $store.state.strategy.tagEnumList"
                :key="index"
                :label="item.tagName + '：'"
              >
                <el-select
                  v-model="
                    $store.state.strategy.sitConditions[params]
                      .strategyTagEnumDtoList[index].enumValue
                  "
                  :disabled="typeParams"
                >
                  <el-option
                    v-for="(itemOption, indexOption) in $store.state.strategy
                      .tagEnumList[index].enumValueList"
                    :key="indexOption"
                    :label="itemOption"
                    :value="itemOption"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择因子"
      :visible.sync="
        $store.state.strategy.sitConditions[params].factorDialogVisible
      "
      class="divisor_dialog"
    >
      <div class="logo_logo"></div>
      <div class="add_message"></div>
      <el-input
        class="inputaaa"
        placeholder="输入关键字进行过滤"
        v-model="filterTree"
      >
      </el-input>
      <el-tree
        ref="tree"
        class="filter-tree treeOp"
        @node-click="handleNodeClickTree"
        :data="$store.state.strategy.groupListAll"
        :props="defaultProps"
        :filter-node-method="filterNode"
        node-key="id"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            $store.state.strategy.sitConditions[
              params
            ].factorDialogVisible = false
          "
          >确 定</el-button
        >
        <!-- <el-button type="primary" @click="addSubmit">确 定</el-button> -->
      </span>
    </el-dialog>
    <el-dialog
      class="message_dialog"
      title="消息模板"
      :visible.sync="$store.state.strategy.sitConditions[params].messageVisible"
      width="873px"
    >
      <div class="send_message"></div>
      <div class="msg_content" style="marginbottom: 10px">
        <span style="fontsize: 16px">消息内容：</span>
      </div>
      <div class="flex">
        <div class="textarea">
          <el-input
            type="textarea"
            v-model="$store.state.strategy.sitConditions[params].sitMessagev"
            :readonly="typeParams"
            @blur="getBlur"
            :id="'blur' + params"
          />
        </div>
        <div class="messageTree">
          <el-input
            v-if="typeParams !== 'readonly'"
            class="inputaaa"
            placeholder="输入关键字进行过滤"
            v-model="filterTreeMessage"
          >
          </el-input>
          <el-tree
            v-if="typeParams !== 'readonly'"
            @node-click="handleNodeClick"
            ref="treeMessage"
            class="filter-tree treeOp"
            :data="$store.state.strategy.messageList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
          >
          </el-tree>
        </div>  
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="$store.state.strategy.sitConditions[params].messageVisible = false">取 消</el-button> -->
        <div style="margin-top: -20px">
          <el-button type="primary" @click="addMessage">确 定</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="previewVisible"
      title="消息预览"
      class="previewDialog"
      width="686px"
      :close-on-click-modal="false"
    >
      <div class="send_message"></div>
      <div class="premsg"><p>消息：</p></div>
      <div class="premsg">
        <p>{{ message }}</p>
      </div>
      <span slot="footer" class="msgBtn">
        <el-button type="primary" @click="previewVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <div
      class="borderOne"
      v-if="$store.state.strategy.sitConditions.length !== params + 1"
    ></div>
  </div>
</template>

<script>
import Factor from "./factor";
import { viewMessage } from "@/api/getApi";
export default {
  name: "asd",
  props: ["params", "typeParams"],
  components: {
    Factor,
  },
  data() {
    return {
      message: "",
      filterTree: "",
      filterTreeMessage: "",
      previewVisible: false,
      defaultProps: {
        children: "child",
        label: "name",
      },
      blur: 0,
    };
  },
  created() {},
  computed: {},
  watch: {
    filterTree(val) {
      this.$refs.tree.filter(val);
    },
    filterTreeMessage(val) {
      this.$refs.treeMessage.filter(val);
    },
  },
  methods: {
    preview() {
      if (this.$store.state.strategy.groupId) {
        this.previewVisible = true;
      } else {
        this.$message.warning("请先选择群组");
      }
      const params = {
        groupId: this.$store.state.strategy.groupId,
        // sitMessagev: this.$store.state.strategy.sitConditions[this.params].sitMessagev
        sitConditions: [this.$store.state.strategy.sitConditions[this.params]],
      };
      viewMessage(params).then((res) => {
        this.message = res.data.data;
      });
    },
    getBlur() {
      this.blur = document.getElementById("blur" + this.params).selectionStart;
    },
    handleNodeClick(data) {
      if (data.tagFieldName) {
        // this.$store.state.strategy.sitConditions[this.params].templateList.push(data)
        // this.$store.state.strategy.sitConditions[this.params].sitMessagev += '#' + data.name + '#'
        if (
          this.$store.state.strategy.sitConditions[this.params].sitMessagev ===
          null
        ) {
          this.$store.state.strategy.sitConditions[this.params].sitMessagev =
            "#" + data.name + "#";
        } else {
          this.$store.state.strategy.sitConditions[this.params].sitMessagev =
            this.$store.state.strategy.sitConditions[
              this.params
            ].sitMessagev.slice(0, this.blur) +
            "#" +
            data.name +
            "#" +
            this.$store.state.strategy.sitConditions[
              this.params
            ].sitMessagev.slice(this.blur);
          this.blur += data.name.length + 2;
        }
        if (
          this.$store.state.strategy.sitConditions[this.params].tagFieldName
        ) {
          this.$store.state.strategy.sitConditions[this.params].tagFieldName +=
            "#" + data.tagFieldName + "#";
        } else {
          this.$store.state.strategy.sitConditions[this.params].tagFieldName =
            "#" + data.tagFieldName + "#";
        }
      }
    },
    handleNodeClickTree(res) {
      if (res.tagFieldName) {
      } else {
        return;
      }
      const newArr = this.$store.state.strategy.sitConditions[
        this.params
      ].sitConditionFactors.slice(0);
      newArr.push({
        id: res.id,
        name: res.name,
        sitOperator: res.sitOperator, // 运算符
        tagValue: res.tagValue,
        enumerateData: res.enumerateData,
        tagEnumValues: [],
        tagValueType: res.tagValueType,
        tagFieldName: res.tagFieldName,
        tagStyle: res.tagStyle,
        tagType: res.tagType,
      });
      this.$store.state.strategy.sitConditions[
        this.params
      ].sitConditionFactors = newArr;
    },
    messageVisible() {
      if (this.$store.state.strategy.groupId) {
        this.$store.state.strategy.sitConditions[
          this.params
        ].messageVisible = true;
        this.blur = this.$store.state.strategy.sitConditions[
          this.params
        ].sitMessagev.length;
      } else {
        this.$message.warning("请先选择群组");
      }
    },
    addMessage() {
      this.$store.state.strategy.sitConditions[
        this.params
      ].messageVisible = false;
    },
    addFactor() {
      if (this.$store.state.strategy.groupId) {
        this.$store.state.strategy.sitConditions[
          this.params
        ].factorDialogVisible = true;
        const idArr = [];
        for (
          let i = 0;
          i <
          this.$store.state.strategy.sitConditions[this.params]
            .sitConditionFactors.length;
          i++
        ) {
          idArr.push(
            this.$store.state.strategy.sitConditions[this.params]
              .sitConditionFactors[i].id
          );
        }
        setTimeout(() => {
          this.$refs.tree.setCheckedKeys(idArr);
        }, 0);
      } else {
        this.$message.warning("请先选择群组");
      }
    },
    deleteFactor() {
      this.$store.state.strategy.sitConditions.splice(this.params, 1);
    },
    addSubmit() {
      // const oldData = this.$store.state.strategy.sitConditions[this.params].sitConditionFactors
      // const ybData = this.$refs.tree.getCheckedNodes()
      // const newData = []
      // const resultList = []
      // for (let i = 0; i < ybData.length; i++) {
      //   if (ybData[i].tagFieldName) {
      //     newData.push(ybData[i])
      //   }
      // }
      // for (let i = 0; i < newData.length; i++) {
      //   let num = -10
      //   for (let j = 0; j < oldData.length; j++) {
      //     if (newData[i].id === oldData[j].id) {
      //       num = j
      //     }
      //   }
      //   if (num !== -10) {
      //     resultList.push({
      //       id: oldData[num].id,
      //       name: oldData[num].name,
      //       sitOperator: oldData[num].sitOperator, // 运算符
      //       tagValue: oldData[num].tagValue,
      //       tagValueType: newData[i].tagValueType
      //     })
      //   } else {
      //     resultList.push({
      //       id: newData[i].id,
      //       name: newData[i].name,
      //       sitOperator: '', // 运算符
      //       tagValue: '',
      //       tagValueType: newData[i].tagValueType
      //     })
      //   }
      // }
      this.$store.state.strategy.sitConditions[
        this.params
      ].factorDialogVisible = false;
      // this.$store.state.strategy.sitConditions[this.params].sitConditionFactors = resultList
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .el-button {
  background-color: #02a4ff !important;
}
.borderOne {
  width: 95%;
  margin: auto;
  height: 1px;
  background: #d0d0d0;
  margin-top: 30px;
}
#big_box {
  position: relative;
  margin: -18px 0;
  padding: 20px 0 30px 0;
}
.tips {
  margin-left: 152px;
  font-size: 14px;
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
  position: absolute;
  top: 19px;
  left: 0;
}
.buttomBtn {
  display: flex;
  align-items: flex-end;
  // margin-top: 200px;
}
.btnImg {
  margin-right: 10px;
}
.cursor {
  cursor: pointer;
  // display: flex;
  // align-items: center;
  height: 50%;
}
.operationBtn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
}
.two_btn {
  margin-top: 20px;
}
.addTop {
  // display: flex;
  align-self: start;
}
.addBottom {
  display: flex;
  align-self: end;
}
#strategyUddate {
  font-size: 14px;
}
.qingkuang {
  // width: 40px;
  height: 20px;
  margin-left: 50px;
  margin-right: 10px;
}
.flex {
  display: flex;
}
.textarea {
  width: 100%;
}
.messageTree {
  width: 40%;
  // margin: auto;
  text-align: center;
}
.factor {
  float: left;
}
.clearBoth {
  clear: both;
}
.factors {
  width: 85%;
  // margin: auto;
  margin: -12px 10px;
  margin-bottom: 20px;
  // border: 1px solid red;
  // height: 10px;
  // min-height: 350px;
}
.factor {
  // width: 31%;
  margin: 5px 1%;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
#strategyUddate {
  display: flex;
  justify-content: space-around;
}
/deep/ .divisor_dialog .el-dialog {
  width: 332px !important;
  height: 465px;
  position: relative;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__body {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  height: 350px !important;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__body .el-tree {
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: auto;
  width: 312px;
  height: 310px;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__footer {
  padding-bottom: 10px;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__header {
  padding: 12px 10px 0 55px !important;
  background-color: #f2f2f2;
  height: 32px;
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__header .el-dialog__title {
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .divisor_dialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .divisor_dialog .el-dialog .logo_logo {
  width: 13px;
  height: 14px;
  position: absolute;
  top: 63px;
  left: 30px;
  background: url("../../../assets/strategy/select.png") no-repeat;
  z-index: 99999;
}
/deep/ .divisor_dialog .el-dialog .add_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../../assets/strategy/message.png") no-repeat;
}
/deep/ .divisor_dialog .el-dialog .inputaaa .el-input__inner {
  padding-left: 33px;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__footer {
  text-align: center;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__footer .el-button--primary {
  width: 90px;
  height: 30px;
  background-color: #02a4ff;
  color: #fff;
}
/deep/ .divisor_dialog .el-dialog .el-dialog__footer .el-button {
  padding-top: 6px !important;
}
/deep/ .message_dialog .el-dialog {
  height: 486px;
}
/deep/ .message_dialog .el-dialog .el-dialog__header {
  height: 36px;
  width: 817px;
  background-color: #f2f2f2;
  padding: 10px 0 0 55px;
  position: relative;
}
/deep/ .message_dialog .el-dialog .send_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../../assets/strategy/message.png") no-repeat;
}
/deep/ .message_dialog .el-dialog .el-dialog__header .el-dialog__title {
  font-size: 14px;
  color: #47bcea !important;
  line-height: 28px;
}
/deep/ .message_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .message_dialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .message_dialog .el-dialog .el-dialog__body {
  padding-top: 20px;
  padding-bottom: 10px;
}
/deep/ .message_dialog .el-dialog .el-dialog__footer {
  padding-top: 0px;
}
/deep/ .message_dialog .el-dialog .el-dialog__footer .el-button--primary {
  width: 90px;
  height: 30px;
  padding-top: 7px;
}
// /deep/ .message_dialog .el-dialog .el-dialog__body .textarea{
//   padding-left: 20px;
// }
/deep/
  .message_dialog
  .el-dialog
  .el-dialog__body
  .textarea
  .el-textarea
  .el-textarea__inner {
  height: 330px !important;
}
/deep/ .message_dialog .el-dialog .el-dialog__body .messageTree {
  padding-left: 20px;
}
/deep/ .message_dialog .el-dialog .el-dialog__body .messageTree .el-tree {
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: auto;
  width: 240px;
  height: 270px;
}
.headControl {
  display: flex;
  height: 30px;
  align-items: center;
  margin-bottom: 20px;
}
.controlBtn {
  background: #f0f8ff;
  padding: 5px 20px;
  margin-right: 5px;
  border-radius: 10px;
}
.setMessage {
  width: 90%;
  margin: auto;
  height: 182px;
  border: 1px solid #e6e6e6;
  display: flex;
  border-radius: 5px;
}
.messageShow {
  width: 65%;
  background: #f6f7fc;
  display: flex;
}
.messageSet {
  width: 35%;
}
.messageSet img {
  margin-right: 10px;
}
.messageSet p {
  font-size: 14px;
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
}
.messageSet .el-form-item {
  margin-bottom: 4px !important;
}
.messageTextarea {
  // width: 72%;
  margin: 20px 20px 20px 0;
}
.messageTextarea /deep/.el-textarea__inner {
  background: white !important;
}
.setMessage /deep/ .el-textarea__inner {
  height: 160px !important;
}
.block {
  display: block;
}
.messageSetOverflow {
  max-height: 180px;
  overflow-y: auto;
  width: 100%;
  margin-top: 15px;
  height: 128px;
}
.messageTitle {
  font-size: 14px;
  margin: 20px 10px;
  width: 80px;
}
.messageTitle img {
  display: block;
  width: 45px;
  height: 52px;
  margin: 40px auto 0;
}
.messageBtnList {
  margin-top: 80px;
  margin-right: 20px;
}
.secBlock {
  margin-top: 24px !important;
}
.messageForm {
  width: 90%;
}
// 0113
/deep/ .previewDialog .el-dialog {
  height: 300px;
  position: relative;
}
/deep/ .previewDialog .el-dialog .el-dialog__header {
  height: 36px;
  // width: 468px;
  background-color: #f2f2f2;
  padding: 10px 0 0 55px;
  position: relative;
}
/deep/ .previewDialog .el-dialog .send_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../../assets/strategy/message.png") no-repeat;
}
/deep/ .previewDialog .el-dialog .el-dialog__header .el-dialog__title {
  font-size: 14px;
  color: #47bcea !important;
  line-height: 28px;
}
/deep/ .previewDialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .previewDialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .previewDialog .el-dialog .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
/deep/ .previewDialog .el-dialog__footer {
  // text-align: center;
  position: absolute;
  bottom: 0px;
  left: 286px;
}
/deep/ .previewDialog .el-dialog__footer .el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 1px 16px;
}
.noListNow {
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
.setMessage /deep/ .el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 1px 16px;
  margin: 0;
}
</style>
