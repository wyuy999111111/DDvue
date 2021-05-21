<template>
  <div>
    <div
      v-for="(item, index) in $store.state.strategy.managerMessageList"
      :key="index"
    >
      <div v-if="$store.state.user.codeName !== '总公司' || index !== 0">
        <div
          class="borderTop"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList[0] ===
            '1' && $store.state.user.codeName !== '总公司'
          "
        >
          分公司管理者统计信息配置 :
        </div>
        <div
          class="borderTop"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList[0] ===
            '2' && $store.state.user.codeName !== '总公司'
          "
        >
          中支公司管理者统计信息配置 ：
        </div>
        <div
          class="setMessage"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList
              .length !== 0 && $store.state.user.codeName !== '总公司'
          "
        >
          <div class="messageShow">
            <div class="messageTitle">
              <p>消息模板</p>
              <img src="../../../assets/strategy/msg.png" alt="" />
            </div>
            <el-input
              type="textarea"
              class="messageTextarea"
              readonly
              v-model="
                $store.state.strategy.managerMessageList[index].messageContent
              "
            />
            <div class="messageBtnList">
              <el-button class="block" @click="messageVisibleShow(index)"
                >设置</el-button
              >
              <el-button class="block secBlock" @click="preview(index)"
                >预览</el-button
              >
            </div>
          </div>
          <div class="messageSet">
            <div class="flex uploadBtn">
              <img src="../../../assets/logo/dataImport.png" />
              <span class="sendUser relative">发送人员</span>
              <span class="relative">
                <el-upload
                  v-if="!props.typeParams"
                  name="filename"
                  :show-file-list="false"
                  accept=".csv"
                  :on-success="onSuccess"
                  class="upload-demo"
                  :action="action[index]"
                >
                  <span
                    class="spanA"
                    size="smspanll"
                    type="primary"
                    @click="setUploadNum(index)"
                    >导入名单</span
                  >
                </el-upload>
              </span>
            </div>
            <el-table
              :data="$store.state.strategy.managerMessageList[index].manageList"
              height="150"
              :header-cell-style="{
                background: '#E6E9F2',
                color: '#000',
                fontWeight: '400',
              }"
              border
            >
              <el-table-column prop="salesCode" label="工号" />
              <el-table-column prop="salesName" label="姓名" />
              <el-table-column prop="salesComname2" label="二级机构" />
              <el-table-column prop="salesChannelName" label="渠道" />
            </el-table>
          </div>
        </div>
      </div>
      <div v-if="$store.state.user.codeName === '总公司' || index !== 0">
        <div
          class="borderTop"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList[0] ===
            '1' && $store.state.user.codeName === '总公司'
          "
        >
          总公司管理者统计信息配置 :
        </div>
        <div
          class="borderTop"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList[0] ===
            '2' && $store.state.user.codeName === '总公司'
          "
        >
          分公司管理者统计信息配置 :
        </div>
        <div
          class="borderTop"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList[0] ===
            '3' && $store.state.user.codeName === '总公司'
          "
        >
          中支公司管理者统计信息配置 ：
        </div>
        <div
          class="setMessage"
          v-if="
            $store.state.strategy.managerMessageList[index].manageIdList
              .length !== 0   && $store.state.user.codeName === '总公司'
          "
        >
          <div class="messageShow">
            <div class="messageTitle">
              <p>消息模板</p>
              <img src="../../../assets/strategy/msg.png" alt="" />
            </div>
            <el-input
              type="textarea"
              class="messageTextarea"
              readonly
              v-model="
                $store.state.strategy.managerMessageList[index].messageContent
              "
            />
            <div class="messageBtnList">
              <el-button class="block" @click="messageVisibleShow(index)"
                >设置</el-button
              >
              <el-button class="block secBlock" @click="preview(index)"
                >预览</el-button
              >
            </div>
          </div>
          <div class="messageSet">
            <div class="flex uploadBtn">
              <img src="../../../assets/logo/dataImport.png" />
              <span class="sendUser relative">发送人员</span>
              <span class="relative">
                <el-upload
                  v-if="!props.typeParams"
                  name="filename"
                  :show-file-list="false"
                  accept=".csv"
                  :on-success="onSuccess"
                  class="upload-demo"
                  :action="action[index]"
                >
                  <span
                    class="spanA"
                    size="smspanll"
                    type="primary"
                    @click="setUploadNum(index)"
                    >导入名单</span
                  >
                </el-upload>
              </span>
            </div>
            <el-table
              :data="$store.state.strategy.managerMessageList[index].manageList"
              height="150"
              :header-cell-style="{
                background: '#E6E9F2',
                color: '#000',
                fontWeight: '400',
              }"
              border
            >
              <el-table-column prop="salesCode" label="工号" />
              <el-table-column prop="salesName" label="姓名" />
              <el-table-column prop="salesComname2" label="二级机构" />
              <el-table-column prop="salesChannelName" label="渠道" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="previewDialog"
      title="消息预览"
      :visible.sync="messageListVisible"
      width="686px"
      :close-on-click-modal="false"
    >
      <div class="send_message"></div>
      <div class="premsg"><p>消息：</p></div>
      <div class="premsg">
        <p>{{ message }}</p>
      </div>
      <span slot="footer" class="msgBtn">
        <el-button type="primary" @click="messageListVisible = false"
          >关 闭</el-button
        >
      </span></el-dialog
    >
    <el-dialog
      class="message_dialog"
      title="消息模板"
      :visible.sync="messageVisible"
      width="873px"
      :close-on-click-modal="false"
    >
      <div class="send_message"></div>
      <div class="msg_content between" style="marginbottom: 10px">
        <span style="fontsize: 16px">消息内容：</span>
        <span>
          <el-radio
            v-model="$store.state.strategy.managerMessageList[num].sendMethod"
            label="1"
            :disabled="props.typeParams"
            >循环结构</el-radio
          >
          <el-radio
            v-model="$store.state.strategy.managerMessageList[num].sendMethod"
            label="2"
            :disabled="props.typeParams"
            >统计结构</el-radio
          >
        </span>
      </div>
      <div class="flex">
        <div class="textarea">
          <el-input
            type="textarea"
            v-model="
              $store.state.strategy.managerMessageList[num].messageContent
            "
            :readonly="props.typeParams"
            @blur="getBlur"
            :id="'blur' + params"
          />
        </div>
        <div class="messageTree">
          <el-input
            v-if="!props.typeParams"
            class="inputaaa"
            placeholder="输入关键字进行过滤"
            v-model="filterTreeMessage"
          >
          </el-input>
          <el-tree
            v-if="!props.typeParams"
            @node-click="handleNodeClick"
            ref="treeMessage"
            class="filter-tree treeOp"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
          >
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMessage">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div @click="asd">111</div> -->
  </div>
</template>

<script>
import { managerTagClass, viewManagerMessage } from "@/api/getApi";

export default {
  name: "strategyUddate",
  props: ["props"],
  data() {
    return {
      filterTreeMessage: "",
      checkList: [],
      messageVisible: false,
      num: 0,
      params: "",
      defaultProps: {
        children: "child",
        label: "tagName",
      },
      treeData: [],
      arr: [],
      action: ["", "", ""],
      messageListVisible: false,
      message: "",
      blur: 0,
    };
  },
  watch: {
    "$store.state.adminSendState"() {
      managerTagClass({
        tagEnumList: this.$store.state.strategy.tagEnumList,
      }).then((res) => {
        this.treeData = res.data.data;
      });
      for (
        let i = 0;
        i < this.$store.state.strategy.managerMessageList.length;
        i++
      ) {
        this.$store.state.strategy.managerMessageList[i].messageContent = "";
      }
    },
    filterTreeMessage(val) {
      this.$refs.treeMessage.filter(val);
    },
  },
  created() {
  },
  methods: {
    setUploadNum(index) {
      this.uploadNum = index;
      const action = [];
      for (let i = 1; i < 4; i++) {
        action.push(
          `/sit-web/sit/strategy/uploadFile?strategyId=${this.$store.state.strategy.strategyId}&managerMessage=${i}`
        );
      }
      this.action = action;
    },
    onSuccess(res) {
      const arr = JSON.parse(
        JSON.stringify(this.$store.state.strategy.managerMessageList)
      );
      arr[this.uploadNum].manageList = res.data;
      this.$store.state.strategy.managerMessageList = arr;
    },
    getBlur() {
      this.blur = document.getElementById("blur" + this.params).selectionStart;
    },
    addMessage() {
      this.messageVisible = false;
    },
    messageVisibleShow(index) {
      this.messageVisible = true;
      this.num = index;
      this.blur = this.$store.state.strategy.managerMessageList[
        index
      ].messageContent.length;
      managerTagClass({
        tagEnumList: this.$store.state.strategy.tagEnumList,
      }).then((res) => {
        this.treeData = res.data.data;
      });
    },
    preview(index) {
      const params = {
        strategyId: this.$store.state.strategy.strategyId,
        managerMessageList: [
          this.$store.state.strategy.managerMessageList[index],
        ],
        sitConditions: this.$store.state.strategy.sitConditions,
        groupId: this.$store.state.strategy.groupId,
        strategyName: this.$store.state.strategy.strategyName,
      };
      viewManagerMessage(params).then((res) => {
        this.message = res.data.data;
      });
      this.messageListVisible = true;
    },
    handleNodeClick(data) {
      if (data.tagFieldName) {
        if (
          this.$store.state.strategy.managerMessageList[this.num]
            .messageContent === null
        ) {
          this.$store.state.strategy.managerMessageList[
            this.num
          ].messageContent = "#" + data.tagName + "#";
        } else if (data.pname) {
          this.$store.state.strategy.managerMessageList[
            this.num
          ].messageContent =
            this.$store.state.strategy.managerMessageList[
              this.num
            ].messageContent.slice(0, this.blur) +
            "#" +
            data.pname +
            "," +
            data.tagName +
            "#" +
            this.$store.state.strategy.managerMessageList[
              this.num
            ].messageContent.slice(this.blur);
          this.blur += data.tagName.length + 3 + data.pname.length;
        } else {
          this.$store.state.strategy.managerMessageList[
            this.num
          ].messageContent =
            this.$store.state.strategy.managerMessageList[
              this.num
            ].messageContent.slice(0, this.blur) +
            "#" +
            data.tagName +
            "#" +
            this.$store.state.strategy.managerMessageList[
              this.num
            ].messageContent.slice(this.blur);
          this.blur += data.tagName.length + 2;
        }
        if (
          this.$store.state.strategy.managerMessageList[this.num].tagFieldName
        ) {
          this.$store.state.strategy.managerMessageList[
            this.num
          ].tagFieldName += "#" + data.tagFieldName + "#";
        } else {
          this.$store.state.strategy.managerMessageList[this.num].tagFieldName =
            "#" + data.tagFieldName + "#";
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.tagName.indexOf(value) !== -1;
    },
  },
};
</script>
<style scoped lang="less">
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
.secBlock {
  margin-top: 24px !important;
}
.messageBtnList {
  margin-top: 80px;
  margin-right: 20px;
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
/deep/ .el-button {
  background-color: #02a4ff !important;
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
.messageTextarea /deep/.el-textarea__inner {
  background: white !important;
}
.setMessage /deep/ .el-textarea__inner {
  height: 160px !important;
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
/deep/
  .message_dialog
  .el-dialog
  .el-dialog__body
  .textarea
  .el-textarea
  .el-textarea__inner {
  height: 330px !important;
}
.textarea {
  width: 100%;
}
.messageTree {
  width: 40%;
  text-align: center;
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
.flex {
  display: flex;
}
.between {
  display: flex;
  justify-content: space-between;
  width: 68%;
}
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
.spanA {
  color: blue;
  text-decoration: underline;
}
.uploadBtn {
  margin: 8px;
}
.sendUser {
  margin-right: 10px;
}
.relative {
  position: relative;
  top: 3px;
}
.borderTop {
  margin-left: 3.2rem;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
