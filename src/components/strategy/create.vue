<template>
  <div id="strategyUddate" ref="132">
    <div class="strategyTitle">
      <img src="../../assets/logo/title.png" />策略创建
    </div>
    <div class="content">
      <HeadTitle params="基本信息" />
      <el-row>
        <el-form :gutter="24" label-width="120px" class="form">
          <el-col :span="12">
            <el-form-item label="策略名称：">
              <el-input
                id="inputGet"
                v-model="$store.state.strategy.strategyName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择群组：">
              <div class="flex alignItem">
                <el-select v-model="$store.state.strategy.groupId" filterable>
                  <el-option
                    clearable
                    v-for="(item, index) in option"
                    :key="index"
                    :label="item.groupName"
                    :value="item.groupId"
                  ></el-option>
                </el-select>
                <el-button @click="gotoGroupManagement">查看群组</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略描述：">
              <el-input
                type="textarea"
                v-model="$store.state.strategy.strategyDesc"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期：">
              <el-date-picker
                v-model="$store.state.strategy.strategyStartTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期：">
              <el-date-picker
                v-model="$store.state.strategy.strategyEndTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对接系统：">
              <el-select v-model="$store.state.strategy.dockSystems">
                <!-- <el-option value="1" label="大地行"></el-option> -->
                <el-option value="2" label="营销互动平台"></el-option>
                <!-- <el-option value="3" label="全部"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送字段：">
              <el-input
                type="textarea"
                v-model="$store.state.strategy.tagNames"
                readonly
              />
              <el-button @click="editTagName">编辑</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送方式：">
              <el-select v-model="$store.state.strategy.sendType">
                <el-option
                  label="属性方式"
                  value="1"
                  v-if="$store.state.user.roleName === '系统管理员'"
                ></el-option>
                <el-option label="事件方式" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略频率：">
              <div class="alignItem">
                <el-input v-model="cron" readonly />
                <el-button @click="open">设置</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息发送频率：">
              <div class="alignItem">
                <el-input v-model="sendShow" readonly />
                <el-button @click="sendOpen">设置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="headTitle">
        <div class="flex spaceBetween">
          <span class="bigSize"
            ><img
              src="@/assets/indexImg/项目符.png"
              id="headLogo"
              alt=""
            />策略动作</span
          >
          <div class="messageControl">
            统计信息发送:
            <div
              v-for="(item, index) in $store.state.strategy.managerMessageList"
              :key="index"
            >
              <el-checkbox-group
                v-model="
                  $store.state.strategy.managerMessageList[index].manageIdList
                "
              >
                <el-checkbox
                  style="margin-left: 10px"
                  :label="(index + 1).toString()"
                  >{{ item.text }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <span class="cursor backSpan" @click="messageSet"
              ><img
                class="btnImg"
                src="../../assets/strategy/addlabel.png"
              />统计指标编辑</span
            >
            <span class="cursor backSpan" @click="addAction"
              ><img
                class="btnImg"
                src="../../assets/strategy/abc.png"
              />添加规则</span
            >
          </div>
        </div>
        <div class="border"></div>
      </div>
      <Action
        v-for="(item, index) in $store.state.strategy.sitConditions"
        :key="index"
        :params="index"
        ref="action"
      />
      <AdminSend :props="{ typeParams: false }" />
      <div class="headTitle">
        <div class="flex spaceBetween">
          <span class="bigSize"
            ><img
              src="@/assets/indexImg/项目符.png"
              id="headLogo"
              alt=""
            />策略关注指标</span
          ><span class="cursor backSpan" @click="addStrategy"
            ><img
              class="btnImg"
              src="../../assets/strategy/vbn.png"
            />添加指标</span
          >
        </div>
        <div class="border"></div>
      </div>
      <div class="sitStratrgyTegTags">
        <div
          class="sitStratrgyTegTag"
          v-for="(item, index) in $store.state.strategy.sitStratrgyTegTags"
          :key="index"
        >
          <el-form label-width="100px">
            <!-- <el-col></el-col> -->
            <span class="delete cur" @click="deleteFactor(index)">×</span>
            <el-form-item label="指标">
              <span>{{ item.name }}</span>
            </el-form-item>
            <el-form-item label="指标分组"
              >{{ item.valueType }} {{ item.tagValueType }}
              <span
                v-if="item.tagValue !== '2'"
                @click="getFenZu(index, item)"
                class="groupingSettings"
                >分组设置</span
              >
              <span v-if="item.tagValue === '2'" class="groupingSettings"
                >指标为枚举类型</span
              >
            </el-form-item>
          </el-form>
          <!-- 指标分组设置 -->
          <el-dialog
            :visible.sync="
              $store.state.strategy.sitStratrgyTegTags[index]
                .factorDialogVisible
            "
            title="分组设置"
            class="dialog_footer"
            width="900px"
            :close-on-click-modal="false"
          >
            <div class="logo_message"></div>
            <div class="footer_top">
              <p>
                指标： <span style="fontsize: 14px">{{ item.name }}</span>
              </p>
              <div class="addBtn">
                <div
                  @click="addGroup(index)"
                  class="addBtn"
                  style="cursor: pointer"
                >
                  <img
                    class="btnImg"
                    style="padding-bottom: 2px"
                    src="../../assets/indexImg/添加.png"
                  />
                  <p style="fontsize: 14px; marginright: 30px">添加组别</p>
                </div>
                <p>分组模板：</p>
                <el-select
                  v-model="
                    $store.state.strategy.sitStratrgyTegTags[index].optionIndex
                  "
                  @change="(e) => handleChangeTemplates(e, index)"
                >
                  <el-option
                    v-for="(item, index) in $store.state.strategy
                      .sitStratrgyTegTags[index].option"
                    :key="index"
                    :value="item.templateName"
                    :label="item.templateName"
                  />
                </el-select>
                <span class="newTemplate" @click="handleAddTagGroupTemplate"
                  >另存为新模板</span
                >
              </div>
            </div>
            <el-form label-width="100px" class="fzClass">
              <el-form-item
                v-for="(item, itemIndex) in $store.state.strategy
                  .sitStratrgyTegTags[index].sitStrategyTags"
                :key="itemIndex"
                :label="'组别' + (itemIndex + 1) + '：'"
              >
                <div class="alignItem">
                  <el-input
                    v-model="
                      $store.state.strategy.sitStratrgyTegTags[index]
                        .sitStrategyTags[itemIndex].groupName
                    "
                  />
                  <div style="width: 40px"></div>
                  <el-input
                    v-model="
                      $store.state.strategy.sitStratrgyTegTags[index]
                        .sitStrategyTags[itemIndex].startValue
                    "
                  />
                  <el-select
                    v-model="
                      $store.state.strategy.sitStratrgyTegTags[index]
                        .sitStrategyTags[itemIndex].leftOperator
                    "
                  >
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                    <el-option label="=" value="="></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label=">" value=">"></el-option>
                  </el-select>
                  <p style="fontsize: 14px">值</p>
                  <el-select
                    v-model="
                      $store.state.strategy.sitStratrgyTegTags[index]
                        .sitStrategyTags[itemIndex].rightOperator
                    "
                  >
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                    <el-option label="=" value="="></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label=">" value=">"></el-option>
                  </el-select>
                  <el-input
                    v-model="
                      $store.state.strategy.sitStratrgyTegTags[index]
                        .sitStrategyTags[itemIndex].endValue
                    "
                  />
                  <span
                    class="group_close cursor"
                    @click="groupClose(itemIndex)"
                    >×
                  </span>
                </div>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="
                  $store.state.strategy.sitStratrgyTegTags[
                    index
                  ].factorDialogVisible = false
                "
                >取 消</el-button
              >
              <el-button type="primary" @click="setSitStrategyTags(index)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
        <!-- 添加指标 -->
        <el-dialog
          :visible.sync="$store.state.strategy.strategyVisible"
          title="添加指标"
          width="317"
          class="add_dialog"
          :close-on-click-modal="false"
        >
          <div class="logo_logo"></div>
          <div class="add_message"></div>
          <el-input
            class="inputaaa"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
          >
          </el-input>
          <el-tree
            ref="treeStrategy"
            class="filter-tree treeOp"
            :data="$store.state.strategy.groupListNumEnum"
            show-checkbox
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
          >
          </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="$store.state.strategy.strategyVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="addStrategyTags(index)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="tageNameVisible"
          title="发送字段"
          width="873px"
          class="send_dialog"
          :close-on-click-modal="false"
        >
          <div class="send_message"></div>
          <div class="el-dialog-div">
            <div class="rules">
              <span style="color: red; marginright: 15px">* </span>
              固定字段
            </div>
            <div class="rules_db">
              <p
                style="
                  width: 55px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                工号
              </p>
              <p
                style="
                  width: 55px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                姓名
              </p>
              <p
                style="
                  width: 100px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                分公司代码
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                三级机构代码
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                三级机构名称
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                归属机构代码
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                归属机构名称
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                从人渠道代码
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                从人渠道名称
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                所属团队代码
              </p>
              <p
                style="
                  width: 120px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                所属团队名称
              </p>
              <p
                style="
                  width: 80px;
                  height: 35px;
                  lineheight: 35px;
                  color: #000;
                  textalign: center;
                "
              >
                岗位名称
              </p>
            </div>
            <div class="flex">
              <div class="textarea">
                <el-input
                  type="textarea"
                  readonly
                  v-model="$store.state.strategy.tagNames"
                />
              </div>
              <div class="messageTree">
                <el-input
                  class="inputaaa"
                  placeholder="输入关键字进行过滤"
                  v-model="filterTree"
                />
                <el-tree
                  @check-change="handleNodeClick"
                  ref="treeMessage"
                  show-checkbox
                  class="filter-tree treeOp"
                  :data="$store.state.strategy.groupList"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  node-key="id"
                >
                </el-tree>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tageNameVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="getTemplateNameVisible"
          title="输入分组名称"
          class="dialogEnter"
          :close-on-click-modal="false"
          width="700px"
          @close="delTemplate"
        >
          <div class="submitMessage"></div>
          <el-form>
            <el-form-item label="分组名称：">
              <el-input v-model="templateName" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="btns">
            <el-button @click="addOne">确定</el-button>
            <el-button @click="delTemplate">取消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="btnList">
        <el-button @click="create" :loading="loading">提交审核</el-button>
      </div>
    </div>
    <CronUi ref="CronUi" @cronResult="resultValue"></CronUi>
    <div class="footer"></div>
    <el-dialog :visible.sync="sendVisible" title="发送频率" class="sendDialog">
      <div class="send_message"></div>
      <div class="basis"><p>根据策略频率</p></div>
      <el-radio v-model="radio" label="day">每日</el-radio>
      <el-radio v-model="radio" label="week">每周</el-radio>
      <el-radio v-model="radio" label="month">每月</el-radio>
      <div v-if="radio === 'day'" class="sendList"></div>
      <div v-if="radio === 'week'" class="sendList">
        <el-checkbox-group v-model="checkListWeek">
          <el-checkbox label="1" value="1">周一</el-checkbox>
          <el-checkbox label="2">周二</el-checkbox>
          <el-checkbox label="3">周三</el-checkbox>
          <el-checkbox label="4">周四</el-checkbox>
          <el-checkbox label="5">周五</el-checkbox>
          <el-checkbox label="6">周六</el-checkbox>
          <el-checkbox label="7">周日</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="radio === 'month'" class="sendList">
        <el-checkbox-group v-model="checkListMonth">
          <el-checkbox
            v-for="(item, index) in monthList"
            :key="index"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <div class="exc">
          <p>例外</p>
        </div>
        <div class="excb">
          <el-checkbox-group v-model="sendEles">
            <el-checkbox label="6">周六不发</el-checkbox>
            <el-checkbox label="7">周日不发</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendFrequency">确 定</el-button>
        <el-button type="primary" @click="tageNameVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="messageSetVisible"
      title="统计指标设置"
      class="dialog_footer messageDialogDiv"
      width="689px"
      :close-on-click-modal="false"
    >
      <div class="logo_message"></div>
      <div class="messageDialog">
        <div class="messageDialogLeft">
          <div class="messageListTitle">统计指标列表</div>
          <div
            class="messageListName"
            :style="{
              background: message.nowNum === index ? '#ECECEC' : '#F7F7F7',
            }"
            v-for="(item, index) in message.list"
            :key="index"
            @click="handleChangeMessage(index)"
          >
            <p class="msgP">{{ item.tagName }}</p>
            <img
              src="../../assets/logo/delete.png"
              class="deleteIcon"
              @click="handleDelete(index)"
            />
          </div>
          <div class="addMessageListBtn" @click="addMessageList">
            新增统计指标
          </div>
        </div>
        <div class="messageDialogRight">
          <el-form style="width: 100%" class="messageDialogForm">
            <el-form-item label="统计指标名称:">
              <el-input v-model="message.nowList.tagName" />
            </el-form-item>
            <el-table
              border="true"
              class="messageDialogTable"
              :data="message.nowList.enumValueList"
              height="200"
            >
              <el-table-column label="枚举值">
                <template slot-scope="res">{{ res.row }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="res"
                  ><div class="msgDel" @click="deleteMessageList(res)">
                    <img src="../../assets/strategy/delete.png" alt="" />
                    <p>删除</p>
                  </div></template
                >
              </el-table-column>
            </el-table>
          </el-form>
          <div>
            <div style="margintop: 10px; marginleft: 20px">
              枚举值名称：
              <span class="behand"
                ><el-input v-model="message.nowList.nameAdd"
              /></span>
              <el-button @click="handleAddMessageList">添加</el-button>
            </div>
            <div class="msgBtn">
              <el-button @click="handleSubMessageList">保存统计指标</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from "../../common/HeadTitle";
import Action from "./components/action";
import CronUi from "./components/cron/cron-ui/index";
import AdminSend from "./components/adminSend";
import {
  myinfo,
  findAllTagClassAndTagCustom,
  findAllTags,
  selectGroup,
  findStrategyTagClassAndTag,
  getStrategySelectOne,
  setStrategyReturnDate,
  getStrategyReturnDate,
  checkAddGroup,
  cronParse,
  strategyAdd,
  findAllTagsMessage,
} from "@/api/getApi";
import {
  getGroupTemplates,
  addTagGroupTemplate,
  getGroupId,
} from "@/api/nameList";

export default {
  name: "asd",
  components: {
    HeadTitle,
    Action,
    CronUi,
    AdminSend,
  },
  data() {
    return {
      message: {
        nowNum: 0,
        nowList: {
          tagName: "",
          enumValueList: [],
          nameAdd: "",
        },
        list: [],
      },
      messageSetVisible: false,
      sendShow: "",
      checkListWeek: [],
      checkListMonth: [],
      monthList: [],
      sendEles: [],
      radio: "day",
      sendVisible: false,
      templateName: "",
      getFenZuNum: 0,
      getTemplateNameVisible: false,
      loading: false,
      filterTree: "",
      cron: "",
      tagNamesList: [],
      tageNameVisible: false,
      option: [],
      form: {}, // 条件数据
      situationList: [1], // 情况数据
      newData: "123",
      testInp: 123,
      result: "",
      resultForm: {
        cpmEveryStartCron: "",
        cpmEveryEndCron: "",
      },
      filterText: "",
      defaultProps: {
        children: "child",
        label: "name",
      },
      jishiNum: 0,
      error: false,
      finAddError: false,
    };
  },
  created() {
    for (let i = 1; i < 32; i++) {
      this.monthList.push(i.toString());
    }
    if (
      this.$store.state.strategy.dockSystems === "3" ||
      this.$store.state.strategy.dockSystems === "2"
    ) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    this.getData();
    this.$store.state.strategy = {
      // 策略部分
      groupList: [], // 弹出框选项树
      switch: false,
      sitConditions: [], // 策略动作
      sitStratrgyTegTags: [], // 关注指标
      strategyName: "",
      groupId: "",
      strategyDesc: "",
      strategyStartTime: "",
      strategyEndTime: "",
      dockSystems: "",
      tagNames: [],
      tagIds: [],
      cron: "",
      sendType: "",
      strategyVisible: false,
      getFenZuNum: "",
      disabled: false,
      sendDay: "",
      tagEnumList: [],
      managerMessageList: [
        {
          messageContent: "",
          managerMessage: "",
          manageIdList: [],
          text: "总公司",
          sendMethod: "1",
        },
        {
          messageContent: "",
          managerMessage: "",
          manageIdList: [],
          text: "分公司",
          sendMethod: "1",
        },
        {
          messageContent: "",
          managerMessage: "",
          manageIdList: [],
          text: "中支公司",
          sendMethod: "1",
        },
      ],
    };
    selectGroup().then((res) => {
      this.option = res.data.data;
    });
    if (this.$route.query.firId) {
      getStrategyReturnDate(this.$route.query.firId).then((res) => {
        this.$store.state.strategy = res.data.data;
        if (res.data.data.messageCronType === "1") {
          // 每周
          this.checkListWeek = res.data.data.sendDay.split(",");
          this.radio = "week";
        } else if (res.data.data.messageCronType === "2") {
          // 每月
          this.checkListMonth = res.data.data.sendDay.split(",");
          this.radio = "month";
        } else {
          this.radio = "day";
        }
        if (res.data.data.exceptionDay) {
          this.sendEles = res.data.data.exceptionDay.split(",");
        }
        this.message.list = res.data.data.tagEnumList;
        if (res.data.data.tagEnumList[0]) {
          this.message.nowList = res.data.data.tagEnumList[0];
        }
        this.sendFrequency();
      });
    }
    setTimeout(() => {
      this.sendFrequency();
    }, 1000);
  },
  mounted() {
    myinfo().then((res) => {
      this.res = res.data;
      this.$store.state.user = res.data;
      console.log(this.$store.state.user.codeName);
      if (this.$store.state.user.codeName !== "总公司") {
        const newArr = this.$store.state.strategy.managerMessageList.slice(0);
        newArr.shift();
        this.$store.state.strategy.managerMessageList = newArr;
        console.log(this.$store.state.strategy.managerMessageList);
      } else if (this.$store.state.user.codeName === "总公司") {
        this.$store.state.strategy.managerMessageList = managerMessageList;
        console.log(this.$store.state.strategy.managerMessageList);
      }
    });
  },
  watch: {
    filterText(val) {
      this.$refs.treeStrategy.filter(val);
    },
    "$store.state.strategy.dockSystems"() {
      if (
        this.$store.state.strategy.dockSystems === "3" ||
        this.$store.state.strategy.dockSystems === "2"
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    "$store.state.strategy.groupId"() {
      findAllTagClassAndTagCustom(this.$store.state.strategy.groupId).then(
        (res) => {
          this.$store.state.strategy.groupList = res.data.data;
        }
      );
      // let newArr = this.$store.state.strategy.sitConditions.slice(0)
      // let newArrT = this.$store.state.strategy.sitStratrgyTegTags.slice(0)
      // newArr = []
      // newArrT = []
      // this.$store.state.strategy.sitConditions = newArr
      // this.$store.state.strategy.sitStratrgyTegTags = newArrT
      findAllTags(this.$store.state.strategy.groupId).then((res) => {
        this.$store.state.strategy.groupListAll = res.data.data;
      });
      findAllTagsMessage(this.$store.state.strategy.groupId).then((res) => {
        this.$store.state.strategy.messageList = res.data.data;
      });
    },
    filterTree(val) {
      this.$refs.treeMessage.filter(val);
    },
    "$store.state.strategy.cron"() {
      cronParse(this.$store.state.strategy.cron).then((res) => {
        console.log(res);
        this.cron = this.$store.state.strategy.cron + res.data.data;
        console.log(this.cron);
      });
    },
  },
  methods: {
    addOne() {
      const paramsList = [];
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        paramsList.push({
          startValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].startValue,
          endValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].endValue,
          groupName: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].groupName,
          leftOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].leftOperator,
          rightOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].rightOperator,
        });
      }
      const params = {
        groupSwarmsList: paramsList,
        tagId: this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .id,
        tagName: this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .name,
        templateName: this.templateName,
      };
      addTagGroupTemplate(params).then((ress) => {
        if (ress.data.code === 0) {
          this.$message.success(ress.data.msg);
          this.getTemplateNameVisible = false;
          this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].optionIndex = this.templateName;
          this.templateName = "";
          console.log("456");
          getGroupTemplates({
            tagId: this.$store.state.strategy.sitStratrgyTegTags[
              this.getFenZuNum
            ].id,
          }).then((res) => {
            const arr = this.$store.state.strategy.sitStratrgyTegTags.slice(0);
            arr[this.getFenZuNum].option = res.data.data;
            this.$store.state.strategy.sitStratrgyTegTags = arr;
          });
        } else {
          this.$message.error(ress.data.msg);
        }
      });
    },
    handleDelete(index) {
      // 删除列表
      const arr = this.message.list.slice(0);
      arr.splice(index, 1);
      this.message.list = arr;
      this.message.nowNum = this.message.list.length;
      this.message.nowList = {
        tagName: "",
        enumValueList: [],
        nameAdd: "",
      };
      this.$store.state.strategy.tagEnumList = arr;
      for (
        let i = 0;
        i < this.$store.state.strategy.sitConditions.length;
        i++
      ) {
        const arr = this.$store.state.strategy.sitConditions[
          i
        ].strategyTagEnumDtoList.slice(0);
        arr.splice(index, 1);
        this.$store.state.strategy.sitConditions[
          i
        ].strategyTagEnumDtoList = arr;
      }
    },
    handleChangeMessage(index) {
      // 切换标签
      this.message.nowNum = index;
      const arr = JSON.parse(JSON.stringify(this.message.list[index]));
      this.message.nowList = arr;
    },
    handleSubMessageList() {
      // 保存标签
      this.$store.state.adminSendState = !this.$store.state.adminSendState;
      let can = true;
      for (let i = 0; i < this.message.list.length; i++) {
        if (
          this.message.list[i].tagName === this.message.nowList.tagName &&
          this.message.nowNum !== i
        ) {
          this.$message.warning("名称重复");
          can = false;
          return;
        }
      }
      if (!can) {
        return;
      }
      if (this.message.nowList.tagName === "") {
        this.$message.warning("请输入统计指标名称");
      } else if (this.message.nowList.enumValueList.length === 0) {
        this.$message.warning("请添加枚举值");
      } else {
        for (
          let i = 0;
          i < this.$store.state.strategy.sitConditions.length;
          i++
        ) {
          this.$store.state.strategy.sitConditions[
            i
          ].strategyTagEnumDtoList.push({
            enumValue: "",
          });
        }
        const arr = this.message.list.slice(0);
        arr[this.message.nowNum] = this.message.nowList;
        this.message.list = arr;
        this.$store.state.strategy.tagEnumList = arr;
      }
    },
    handleAddMessageList() {
      // 添加枚举值
      let canAdd = true;
      const str = this.message.nowList.nameAdd.replace(/\s*/g, "");
      console.log(str);
      if (str.length === 0) {
        this.$message.warning("枚举值不能为空");
        return;
      } else {
        this.message.nowList.nameAdd = str;
      }
      for (let i = 0; i < this.message.nowList.enumValueList.length; i++) {
        if (
          this.message.nowList.nameAdd === this.message.nowList.enumValueList[i]
        ) {
          this.$message.warning("枚举值有重复");
          canAdd = false;
          return;
        }
      }
      if (canAdd) {
        const enumValueList = this.message.nowList.enumValueList;
        enumValueList.push(this.message.nowList.nameAdd);
        this.message.nowList.enumValueList = enumValueList;
        this.message.nowList.nameAdd = "";
      }
    },
    deleteMessageList(res) {
      // 删除枚举值
      this.message.nowList.enumValueList.splice(res.$index, 1);
    },
    addMessageList() {
      // 新增标签
      this.message.nowList = {
        tagName: "",
        enumValueList: [],
        nameAdd: "",
      };
      this.message.nowNum = this.message.list.length;
    },
    messageSet() {
      // 标签弹窗
      this.messageSetVisible = true;
    },
    sendFrequency() {
      let str = "";
      if (this.radio === "day") {
        this.$store.state.strategy.messageCronType = 0;
        str += "根据策略频率每日发送";
        this.$store.state.strategy.sendDay = "";
      } else if (this.radio === "month") {
        this.$store.state.strategy.messageCronType = 2;
        this.$store.state.strategy.sendDay = this.checkListMonth.toString();
        str += "根据策略频率每月";
        str += "<" + this.checkListMonth.toString() + ">" + "发送";
      } else {
        this.$store.state.strategy.messageCronType = 1;
        this.$store.state.strategy.sendDay = this.checkListWeek.toString();
        str += "根据策略频率每周";
        str += "<" + this.checkListWeek.toString() + ">" + "发送";
      }
      if (this.sendEles.length === 1 && this.sendEles[0] === "6") {
        str += "<周六不发>";
      } else if (this.sendEles.length === 1 && this.sendEles[0] === "7") {
        str += "<周日不发>";
      } else if (this.sendEles.length === 2) {
        str += "<周末不发>";
      }
      this.sendVisible = false;
      this.sendShow = str;
      this.$store.state.strategy.exceptionDay =
        this.sendEles.length !== 0 ? this.sendEles.toString() : 0;
    },
    sendOpen() {
      this.sendVisible = true;
    },
    handleChangeTemplates(e, index) {
      for (
        let i = 0;
        i < this.$store.state.strategy.sitStratrgyTegTags[index].option.length;
        i++
      ) {
        if (
          e ===
          this.$store.state.strategy.sitStratrgyTegTags[index].option[i]
            .templateName
        ) {
          this.$store.state.strategy.sitStratrgyTegTags[
            index
          ].sitStrategyTags = this.$store.state.strategy.sitStratrgyTegTags[
            index
          ].option[i].groupSwarmsList;
        }
      }
    },
    editTagName() {
      if (this.$store.state.strategy.groupId) {
        this.tageNameVisible = true;
        console.log(this.$store.state.strategy.tagIds);
        setTimeout(() => {
          this.$refs.treeMessage.setCheckedKeys(
            this.$store.state.strategy.tagIds
          );
        }, 0);
      } else {
        this.$message.warning("请先选择群组");
      }
    },
    gotoGroupManagement() {
      if (
        this.$store.state.strategy.strategyStartTime &&
        this.$store.state.strategy.strategyStartTime.length < 15
      ) {
        this.$store.state.strategy.strategyStartTime =
          this.$store.state.strategy.strategyStartTime + " 00:00:00";
      }
      if (
        this.$store.state.strategy.strategyEndTime &&
        this.$store.state.strategy.strategyEndTime.length < 15
      ) {
        this.$store.state.strategy.strategyEndTime =
          this.$store.state.strategy.strategyEndTime + " 23:59:59";
      }
      if (this.$store.state.strategy.groupId) {
        setStrategyReturnDate(this.$store.state.strategy).then((res) => {
          this.$router.push(
            "/groupManagement/see?history=/strategy/create&firId=" +
              res.data.data +
              "&groupId=" +
              this.$store.state.strategy.groupId
          );
        });
      } else {
        this.$message.error("先选择群组");
      }
    },
    getFenZu(index, item) {
      this.getFenZuNum = index;
      this.$store.state.strategy.sitStratrgyTegTags[
        index
      ].factorDialogVisible = true;
    },
    groupClose(index) {
      // this.$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags = this.$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags.filter(item => item.itemIndex !== this.itemIndex)
      const newArr = this.$store.state.strategy.sitStratrgyTegTags.slice(0);
      newArr[this.getFenZuNum].sitStrategyTags.splice(index, 1);
      this.$store.state.strategy.sitStratrgyTegTags = newArr;
    },
    addGroup(index) {
      this.$store.state.strategy.sitStratrgyTegTags[index].sitStrategyTags.push(
        {
          startValue: "",
          endValue: "",
          leftOperator: "<",
          rightOperator: "<=",
          groupName: "",
        }
      );
    },
    handleNodeClick(data) {
      const dataOn = this.$refs.treeMessage.getCheckedNodes();
      const arrName = [];
      const arrTagFieldName = [];
      const arrId = [];
      this.$store.state.strategy.sitStrategySendTagfields = [];
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].tagFieldName) {
          arrName.push(dataOn[i].name);
          arrTagFieldName.push(dataOn[i].tagFieldName);
          arrId.push(dataOn[i].id);
          this.$store.state.strategy.sitStrategySendTagfields.push({
            tagChinaName: dataOn[i].name,
            tagFieldName: dataOn[i].tagFieldName,
            id: dataOn[i].id,
          });
        }
      }
      this.$store.state.strategy.tagNames = arrName;
      this.$store.state.strategy.tagFieldName = arrTagFieldName;
      this.$store.state.strategy.tagIds = arrId;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    create(e) {
      function findEnumvalue(e) {
        return e.enumValue === "";
      }
      for (
        let i = 0;
        i < this.$store.state.strategy.sitConditions.length;
        i++
      ) {
        if (
          this.$store.state.strategy.sitConditions[i].sitMessagev === "" &&
          this.$store.state.strategy.sitConditions[
            i
          ].strategyTagEnumDtoList.findIndex(findEnumvalue) === 0
        ) {
          this.$message.error("消息模板和标签设置不能同时为空");
          return;
        }
      }
      if (this.$store.state.strategy.messageCronType !== "0") {
        if (this.$store.state.strategy.sendDay.length === "0") {
          this.$message.warning("消息发送频率频率至少添加一个日期");
          return;
        }
      }
      for (
        let i = 0;
        i < this.$store.state.strategy.sitConditions.length;
        i++
      ) {
        for (
          let j = 0;
          j < this.$store.state.strategy.tagEnumList.length;
          j++
        ) {
          for (
            let k = 0;
            k <
            this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList
              .length;
            k++
          ) {
            if (j === k) {
              this.$store.state.strategy.sitConditions[
                i
              ].strategyTagEnumDtoList[
                k
              ].tagName = this.$store.state.strategy.tagEnumList[j].tagName;
            }
          }
        }
      }
      console.log(this.$store.state.strategy.sitConditions);
      for (
        let i = 0;
        i < this.$store.state.strategy.sitConditions.length;
        i++
      ) {
        this.$store.state.strategy.sitConditions[
          i
        ].tagFieldName = this.$store.state.strategy.sitConditions[
          i
        ].sitMessagev;
        console.log(this.$store.state.strategy.sitConditions[i].sitMessagev);
      }
      if (this.$store.state.strategy.strategyName === "") {
        this.$message.warning("请输入策略名称");
        this.error = true;
        return;
      }
      if (this.$store.state.strategy.groupId === "") {
        this.$message.warning("请输入策略群组");
        this.error = true;
        return;
      }
      if (this.$store.state.strategy.strategyStartTime === "") {
        this.$message.warning("请输入开始日期");
        this.error = true;
        return;
      }
      if (this.$store.state.strategy.strategyEndTime === "") {
        this.$message.warning("请输入结束日期");
        this.error = true;
        return;
      }
      if (
        this.$store.state.strategy.strategyStartTime >=
        this.$store.state.strategy.strategyEndTime
      ) {
        this.$message.warning("开始时间要小于结束时间");
        return;
      }
      if (this.$store.state.strategy.dockSystems === "") {
        this.$message.warning("请输入对接系统");
        this.error = true;
        return;
      }
      if (
        this.$store.state.strategy.dockSystems === "2" ||
        this.$store.state.strategy.dockSystems === "3"
      ) {
        if (this.$store.state.strategy.sendType === "") {
          this.$message.warning("请输入发送方式");
          this.error = true;
          return;
        }
      }
      if (this.$store.state.strategy.cron === "") {
        this.$message.warning("请输入频率");
        this.error = true;
        return;
      }
      for (
        let i = 0;
        i < this.$store.state.strategy.sitConditions.length;
        i++
      ) {
        for (
          let j = 0;
          j <
          this.$store.state.strategy.sitConditions[i].sitConditionFactors
            .length;
          j++
        ) {
          if (
            this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
              .tagValueType !== "2"
          ) {
            if (
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagValue === undefined ||
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagValue === ""
            ) {
              this.$message.warning(
                `情况${i + 1}里${
                  this.$store.state.strategy.sitConditions[i]
                    .sitConditionFactors[j].name
                }因子没写值`
              );
              this.error = true;
              return;
            }
            if (
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .sitOperator === undefined ||
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .sitOperator === ""
            ) {
              if (
                this.$store.state.strategy.sitConditions[i].sitConditionFactors[
                  j
                ].tagValueType !== "2"
              ) {
                this.$message.warning(
                  `情况${i + 1}里${
                    this.$store.state.strategy.sitConditions[i]
                      .sitConditionFactors[j].name
                  }因子没写运算符`
                );
                this.error = true;
                return;
              }
            }
            if (
              isNaN(
                this.$store.state.strategy.sitConditions[i].sitConditionFactors[
                  j
                ].tagValue
              ) &&
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagValueType === "1"
            ) {
              this.$message.warning(
                `情况${i + 1}里${
                  this.$store.state.strategy.sitConditions[i]
                    .sitConditionFactors[j].name
                }因子值不是数字`
              );
              this.error = true;
              return;
            }
          } else if (
            this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
              .tagValueType === "2"
          ) {
            if (
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagEnumValues.length === 0
            ) {
              this.$message.warning(
                `情况${i + 1}里${
                  this.$store.state.strategy.sitConditions[i]
                    .sitConditionFactors[j].name
                }因子没写值`
              );
              this.error = true;
              return;
            }
          } else {
            if (
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagEnumValues === undefined ||
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .tagEnumValues === ""
            ) {
              this.$message.warning(
                `情况${i + 1}里${
                  this.$store.state.strategy.sitConditions[i]
                    .sitConditionFactors[j].name
                }因子没写值`
              );
              this.error = true;
              return;
            }
            if (
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .sitOperator === undefined ||
              this.$store.state.strategy.sitConditions[i].sitConditionFactors[j]
                .sitOperator === ""
            ) {
              if (
                this.$store.state.strategy.sitConditions[i].sitConditionFactors[
                  j
                ].tagValueType !== "2"
              ) {
                this.$message.warning(
                  `情况${i + 1}里${
                    this.$store.state.strategy.sitConditions[i]
                      .sitConditionFactors[j].name
                  }因子没写运算符`
                );
                this.error = true;
                return;
              }
            }
          }
        }
        this.error = false;
      }
      console.log("2");
      for (
        let i = 0;
        i < this.$store.state.strategy.sitStratrgyTegTags.length;
        i++
      ) {
        if (this.$store.state.strategy.sitStratrgyTegTags[i].tagValue === "2") {
          for (
            let j = 0;
            j <
            this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags
              .length;
            j++
          ) {
            if (
              this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags[
                j
              ].groupName === ""
            ) {
              this.$message.warning(`指标里${i + 1}里分组${j + 1}名称为空`);
              this.error = true;
              return;
            }
            if (
              this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags[
                j
              ].startValue === "" &&
              this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags[
                j
              ].endValue === ""
            ) {
              this.$message.warning(
                `指标里${i + 1}里分组${j + 1}至少填写一个值`
              );
              this.error = true;
              return;
            }
            if (
              isNaN(
                this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].startValue
              )
            ) {
              this.$message.warning(
                `指标里${i + 1}里分组${j + 1}开始值不是数字`
              );
              this.error = true;
            }
            if (
              isNaN(
                this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].endValue
              )
            ) {
              this.$message.warning(
                `指标里${i + 1}里分组${j + 1}结束值不是数字`
              );
              this.error = true;
            }
            if (
              this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags
                .length === 0
            ) {
              this.$message.warning(`指标里${i + 1}里分组数为0`);
              this.error = true;
              return;
            }
          }
        }
        this.error = false;
      }
      const params = this.$store.state.strategy;
      // if (params.sitConditions) {
      //   for (let i = 0; i < params.sitConditions.length; i++) {
      //     if (params.sitConditions[i].sitMessagev === '') {
      //       const num = i + 1
      //       this.$message.error('情况' + num + '未设置消息模板')
      //       return
      //     }
      //   }
      // }
      if (params.sitStratrgyTegTags) {
        for (let i = 0; i < params.sitStratrgyTegTags.length; i++) {
          if (
            params.sitStratrgyTegTags[i].tagValue !== "2" &&
            params.sitStratrgyTegTags[i].sitStrategyTags.length === 0
          ) {
            this.$message.error(
              params.sitStratrgyTegTags[i].name + "未设置分组"
            );
            return;
          }
        }
      }
      console.log(this.$store.state.strategy);
      if (this.$store.state.strategy.sitStratrgyTegTags.length === 0) {
        this.$confirm("还没添加关注指标 是否继续提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            if (this.$store.state.strategy.strategyStartTime) {
              this.$store.state.strategy.strategyStartTime =
                this.$store.state.strategy.strategyStartTime + " 00:00:00";
            }
            if (this.$store.state.strategy.strategyEndTime) {
              this.$store.state.strategy.strategyEndTime =
                this.$store.state.strategy.strategyEndTime + " 23:59:59";
            }
            this.loading = true;
            strategyAdd(params).then((res) => {
              this.loading = false;
              if (res.data.code === 0) {
                this.$router.push({ path: "/strategy/query" });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.loading = false;
            console.log("catch");
          });
      } else {
        for (
          let i = 0;
          i < this.$store.state.strategy.sitStratrgyTegTags.length;
          i++
        ) {
          const paramsList = [];
          if (
            this.$store.state.strategy.sitStratrgyTegTags[i].tagValue !== "2"
          ) {
            for (
              let j = 0;
              j <
              this.$store.state.strategy.sitStratrgyTegTags[i].sitStrategyTags
                .length;
              j++
            ) {
              console.log(this.$store.state.strategy.sitStratrgyTegTags[i]);
              paramsList.push({
                // groupType: this.$store.state.strategy.sitStratrgyTegTags[i].name,
                startValue: this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].startValue,
                endValue: this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].endValue,
                groupName: this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].groupName,
                leftOperator: this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].leftOperator,
                rightOperator: this.$store.state.strategy.sitStratrgyTegTags[i]
                  .sitStrategyTags[j].rightOperator,
              });
            }
          }
          checkAddGroup(paramsList).then((res) => {
            if (res.data.code && res.data.code !== 0) {
              this.$message.warning(res.data.msg);
              this.finAddError = true;
            } else if (!this.finAddError) {
              if (
                i ===
                this.$store.state.strategy.sitStratrgyTegTags.length - 1
              ) {
                if (this.$store.state.strategy.strategyStartTime) {
                  this.$store.state.strategy.strategyStartTime =
                    this.$store.state.strategy.strategyStartTime + " 00:00:00";
                }
                if (this.$store.state.strategy.strategyEndTime) {
                  this.$store.state.strategy.strategyEndTime =
                    this.$store.state.strategy.strategyEndTime + " 23:59:59";
                }
                this.loading = true;
                strategyAdd(params)
                  .then((res) => {
                    this.loading = false;
                    if (res.data.code === 0) {
                      this.$router.push({ path: "/strategy/query" });
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  })
                  .catch(() => {
                    this.loading = false;
                  });
              }
            }
          });
        }
      }
    },
    setSitStrategyTags(e) {
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        if (
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].groupName === ""
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}名称为空`
          );
          this.error = true;
          return;
        }
        if (
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].startValue === "" &&
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].endValue === ""
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}至少填写一个值`
          );
          this.error = true;
          return;
        }
        if (
          isNaN(
            this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
              .sitStrategyTags[j].startValue
          )
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}开始值不是数字`
          );
          this.error = true;
        }
        if (
          isNaN(
            this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
              .sitStrategyTags[j].endValue
          )
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}结束值不是数字`
          );
          this.error = true;
        }
      }
      if (
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length === 0
      ) {
        this.$message.warning(`指标里${this.getFenZuNum + 1}里分组数为0`);
        this.error = true;
        return;
      }
      this.error = false;
      const paramsList = [];
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        paramsList.push({
          startValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].startValue,
          endValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].endValue,
          groupName: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].groupName,
          leftOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].leftOperator,
          rightOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].rightOperator,
        });
      }
      checkAddGroup(paramsList).then((res) => {
        if (res.data.code !== 0) {
          this.$message.warning(res.data.msg);
          this.error = true;
          return false;
        } else {
          this.jishiNum += 1;
          this.$store.state.strategy.sitStratrgyTegTags[
            e
          ].factorDialogVisible = false;
        }
      });
    },
    handleAddTagGroupTemplate() {
      console.log(
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
      );
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        if (
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].groupName === ""
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}名称为空`
          );
          this.error = true;
          return;
        }
        if (
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].startValue === "" &&
          this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
            .sitStrategyTags[j].endValue === ""
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}至少填写一个值`
          );
          this.error = true;
          return;
        }
        if (
          isNaN(
            this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
              .sitStrategyTags[j].startValue
          )
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}开始值不是数字`
          );
          this.error = true;
        }
        if (
          isNaN(
            this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
              .sitStrategyTags[j].endValue
          )
        ) {
          this.$message.warning(
            `指标里${this.getFenZuNum + 1}里分组${j + 1}结束值不是数字`
          );
          this.error = true;
        }
      }
      if (
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length === 0
      ) {
        this.$message.warning(`指标里${this.getFenZuNum + 1}里分组数为0`);
        this.error = true;
        return;
      }
      this.error = false;
      const paramsList = [];
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        paramsList.push({
          startValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].startValue,
          endValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].endValue,
          groupName: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].groupName,
          leftOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].leftOperator,
          rightOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].rightOperator,
        });
      }
      checkAddGroup(paramsList).then((res) => {
        if (res.data.code === 0) {
          this.getTemplateNameVisible = true;
          return false;
        } else {
          this.$message.warning(res.data.msg);
          this.jishiNum += 1;
        }
      });
    },
    delTemplate() {
      this.templateName = "";
      this.getTemplateNameVisible = false;
    },
    O() {
      const paramsList = [];
      for (
        let j = 0;
        j <
        this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .sitStrategyTags.length;
        j++
      ) {
        paramsList.push({
          startValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].startValue,
          endValue: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].endValue,
          groupName: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].groupName,
          leftOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].leftOperator,
          rightOperator: this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].sitStrategyTags[j].rightOperator,
        });
      }
      const params = {
        groupSwarmsList: paramsList,
        tagId: this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .id,
        tagName: this.$store.state.strategy.sitStratrgyTegTags[this.getFenZuNum]
          .name,
        templateName: this.templateName,
      };
      addTagGroupTemplate(params).then((ress) => {
        if (ress.data.code === 0) {
          this.$message.success(ress.data.msg);
          this.getTemplateNameVisible = false;
          this.$store.state.strategy.sitStratrgyTegTags[
            this.getFenZuNum
          ].optionIndex = this.templateName;
          this.templateName = "";
          console.log("456");
          getGroupTemplates({
            tagId: this.$store.state.strategy.sitStratrgyTegTags[
              this.getFenZuNum
            ].id,
          }).then((res) => {
            const arr = this.$store.state.strategy.sitStratrgyTegTags.slice(0);
            arr[this.getFenZuNum].option = res.data.data;
            this.$store.state.strategy.sitStratrgyTegTags = arr;
          });
        } else {
          this.$message.error(ress.data.msg);
        }
      });
    },
    open() {
      this.$refs.CronUi.dialogVisible = true;
    },
    open2() {
      this.$refs.CronUiSecond.dialogVisible = true;
    },
    // 一次一个表达式---最终产生出来的cron表达式
    resultValue(data) {
      this.$store.state.strategy.cron = data;
    },
    // 一次两个表达式---规则配置-确定
    confirmCron(data) {
      this.resultForm.cpmEveryStartCron = data.result;
      this.resultForm.cpmEveryEndCron = data.resultEnd;
    },
    getData() {
      if (this.$route.query.strategyId) {
        const params = { strategyId: this.$route.query.strategyId };
        getStrategySelectOne(params).then((res) => {
          getGroupId().then((ress) => {
            this.$store.state.strategy.strategyId = ress.data.data;
          });
          cronParse(this.$store.state.strategy.cron).then((res) => {
            this.cron = this.$store.state.strategy.cron + res.data.data;
          });
          this.message.list = res.data.data.tagEnumList;
          if (res.data.data.tagEnumList[0]) {
            this.message.nowList = res.data.data.tagEnumList[0];
          }
          this.form = res.data.data;
          this.$store.state.strategy = res.data.data;
          this.$store.state.strategy.switch = true;
          this.$store.state.switch = true;
          if (res.data.data.messageCronType === "1") {
            // 每周
            this.checkListWeek = res.data.data.sendDay.split(",");
            this.radio = "week";
          } else if (res.data.data.messageCronType === "2") {
            // 每月
            this.checkListMonth = res.data.data.sendDay.split(",");
            this.radio = "month";
          } else {
            this.radio = "day";
          }
          if (res.data.data.exceptionDay) {
            this.sendEles = res.data.data.exceptionDay.split(",");
          }
          for (
            let i = 0;
            i < this.$store.state.strategy.sitConditions.length;
            i++
          ) {
            if (
              this.$store.state.strategy.sitConditions[i].strategyTagEnumDtoList
                .length !== this.$store.state.strategy.tagEnumList.length
            ) {
              for (
                let j = 0;
                j < this.$store.state.strategy.tagEnumList.length;
                j++
              ) {
                if (
                  !this.$store.state.strategy.sitConditions[i]
                    .strategyTagEnumDtoList[j] ||
                  this.$store.state.strategy.tagEnumList[j].tagName !==
                    this.$store.state.strategy.sitConditions[i]
                      .strategyTagEnumDtoList[j].tagName
                ) {
                  this.$store.state.strategy.sitConditions[
                    i
                  ].strategyTagEnumDtoList.splice(j, 0, {
                    enumValue: "",
                    tagName: this.$store.state.strategy.tagEnumList[j].tagName,
                  });
                }
              }
            }
          }
          this.sendFrequency();
          for (let i = 0; i < res.data.data.sitStratrgyTegTags.length; i++) {
            getGroupTemplates({
              tagId: res.data.data.sitStratrgyTegTags[i].id,
            }).then((res) => {
              this.$store.state.strategy.sitStratrgyTegTags[i].option =
                res.data.data;
            });
          }
        });
      } else {
        getGroupId().then((ress) => {
          this.$store.state.strategy.strategyId = ress.data.data;
        });
      }
      findStrategyTagClassAndTag().then((res) => {
        this.$store.state.strategy.groupListNumEnum = res.data.data;
      });
    },
    change(data) {
      this.newData = data;
    },
    handleClick() {},
    addAction() {
      // 添加情况
      const arr = [];
      console.log(this.$store.state.strategy);
      for (let i = 0; i < this.$store.state.strategy.tagEnumList.length; i++) {
        arr.push({
          enumValue: "",
        });
      }
      this.$store.state.strategy.sitConditions.push({
        sitConditionFactors: [],
        sitMessagev: "",
        messageVisible: false,
        factorDialogVisible: false,
        previewVisible: false,
        templateList: [],
        strategyTagEnumDtoList: arr,
      });
      console.log(this.$store.state.strategy);
    },
    addStrategy() {
      // 弹出添加指标框
      if (this.$store.state.strategy.groupId) {
        // const _this = this
        this.$store.state.strategy.strategyVisible = true;
        const idArr = [];
        for (
          let i = 0;
          i < this.$store.state.strategy.sitStratrgyTegTags.length;
          i++
        ) {
          idArr.push(this.$store.state.strategy.sitStratrgyTegTags[i].id);
        }
        this.$nextTick(() => {
          this.$refs.treeStrategy.setCheckedKeys(idArr);
        });
      } else {
        this.$message.warning("请先选择群组");
      }
    },
    addStrategyTags() {
      // 添加关注指标
      const oldData = this.$store.state.strategy.sitStratrgyTegTags;
      const ybData = this.$refs.treeStrategy.getCheckedNodes();
      const newData = [];
      const resultList = [];
      for (let i = 0; i < ybData.length; i++) {
        if (ybData[i].tagFieldName) {
          newData.push(ybData[i]);
        }
      }
      for (let i = 0; i < newData.length; i++) {
        let num = -10;
        for (let j = 0; j < oldData.length; j++) {
          if (newData[i].id === oldData[j].id) {
            num = j;
          }
        }
        console.log(num);
        if (num !== -10) {
          resultList.push({
            id: oldData[num].id,
            name: oldData[num].name,
            tagValue: newData[i].tagValueType,
            optionIndex: oldData[i].optionIndex,
            tagType: newData[i].tagType,
            sitStrategyTags: oldData[num].sitStrategyTags,
            factorDialogVisible: false,
            sortNum: oldData[num].sortNum,
          });
        } else {
          resultList.push({
            id: newData[i].id,
            tagValue: newData[i].tagValueType,
            optionIndex: "",
            name: newData[i].name,
            tagType: newData[i].tagType,
            sitStrategyTags: [],
            factorDialogVisible: false,
            sortNum: Date.parse(new Date()),
          });
        }
      }
      function object(a, b) {
        return b.sortNum - a.sortNum;
      }
      resultList.sort(object);
      resultList.reverse();
      this.$store.state.strategy.sitStratrgyTegTags = resultList;
      this.$store.state.strategy.strategyVisible = false;
      for (let i = 0; i < resultList.length; i++) {
        getGroupTemplates({ tagId: resultList[i].id }).then((res) => {
          this.$store.state.strategy.sitStratrgyTegTags[i].option =
            res.data.data;
        });
      }
    },
    deleteFactor(index) {
      // 删除指标
      const newArr = this.$store.state.strategy.sitStratrgyTegTags.slice(0);
      newArr.splice(index, 1);
      this.$store.state.strategy.sitStratrgyTegTags = newArr;
      // this.$store.state.strategy.sitStratrgyTegTags.splice(index, 1)
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .add_dialog .el-dialog {
  width: 332px !important;
  height: 465px;
  position: relative;
}
/deep/ .add_dialog .el-dialog .el-dialog__body {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  height: 350px !important;
}
/deep/ .add_dialog .el-dialog .el-dialog__body .el-tree {
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: auto;
  width: 312px;
  height: 310px;
}
/deep/ .add_dialog .el-dialog .el-dialog__footer {
  padding-bottom: 10px;
}
/deep/ .add_dialog .el-dialog .el-dialog__header {
  padding: 12px 10px 0 55px !important;
  background-color: #f2f2f2;
  height: 32px;
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .add_dialog .el-dialog .el-dialog__header .el-dialog__title {
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .add_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .add_dialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .add_dialog .el-dialog .logo_logo {
  width: 13px;
  height: 14px;
  position: absolute;
  top: 63px;
  left: 30px;
  background: url("../../assets/strategy/select.png") no-repeat;
  z-index: 99999;
}
/deep/ .add_dialog .el-dialog .add_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../assets/strategy/message.png") no-repeat;
}
/deep/ .add_dialog .el-dialog .inputaaa .el-input__inner {
  padding-left: 33px;
}
/deep/ .add_dialog .el-dialog .el-dialog__footer {
  text-align: center;
}
/deep/ .dialog_footer .el-dialog {
  position: relative;
  height: 406px;
}
/deep/ .dialog_footer .el-dialog .logo_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../assets/strategy/message.png") no-repeat;
}
/deep/ .dialog_footer .el-dialog__header {
  padding: 12px 10px 0 55px !important;
  background-color: #f2f2f2;
  height: 32px;
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .dialog_footer .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .dialog_footer
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__header .el-dialog__title {
  color: #47bcea !important;
  font-size: 14px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body {
  padding: 0 30px 0 10px;
  height: 290px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .footer_top {
  display: flex;
  align-items: center;
  margin: 15px 0 20px 20px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px !important;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .addBtn {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .group_close {
  font-size: 20px;
  font-weight: normal;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .el-form-item__label {
  // padding-left: 20px!important;
  font-size: 12px !important;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .el-form-item {
  // margin-bottom: 12px!important;
  margin: 5px 0;
}
/deep/ .dialog_footer .el-dialog .el-dialog__body .el-form {
  overflow-y: auto;
  overflow-x: auto;
  // width:648px;
  height: 250px;
}
/deep/ .messageDialogDiv .el-dialog .el-dialog__body .el-form {
  overflow-y: auto;
  overflow-x: auto;
  // width:648px;
  height: auto;
}
/deep/ .dialog_footer .el-dialog .el-dialog__footer {
  padding: 24px 20px 20px;
  text-align: center;
  box-sizing: border-box;
  margin-left: 60px;
}
/deep/ .dialog_footer .el-dialog .el-dialog__footer .el-button {
  margin-right: 30px;
}
/deep/ .sitStratrgyTegTags {
  padding-left: 20px;
}
/deep/ .sitStratrgyTegTag {
  width: 317px;
  height: 98px;
  position: relative;
  margin-right: 1.5%;
}
/deep/ .sitStratrgyTegTag .delete {
  position: absolute;
  top: -5px;
  right: 10px;
  font-size: 28px;
  z-index: 999;
}
// /deep/ .sitStratrgyTegTags[data-v-ca6a4590] .sitStratrgyTegTag[data-v-ca6a4590] .el-form-item{
//   width: 280px;
//   height: 20px;
// }
/deep/ .sitStratrgyTegTags .sitStratrgyTegTag .el-form-item {
  margin-bottom: 0;
}
/deep/ .sitStratrgyTegTag .el-form-item__content {
  height: 20px;
}
/deep/ .send_dialog .el-dialog {
  height: 486px;
}
/deep/ .send_dialog .el-dialog .el-dialog__header {
  height: 36px;
  width: 817px;
  background-color: #f2f2f2;
  padding: 10px 0 0 55px;
  position: relative;
}
/deep/ .send_dialog .el-dialog .send_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../assets/strategy/message.png") no-repeat;
}
/deep/ .send_dialog .el-dialog .el-dialog__header .el-dialog__title {
  font-size: 14px;
  color: #47bcea !important;
  line-height: 28px;
}
/deep/ .send_dialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
/deep/
  .send_dialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  font-size: 28px;
}
/deep/ .send_dialog .el-dialog .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
/deep/ .send_dialog .el-dialog .el-dialog__footer {
  padding-top: 0px;
}
/deep/ .send_dialog .el-dialog .el-dialog__body .rules {
  padding-left: 30px;
}
/deep/ .send_dialog .el-dialog .el-dialog__body .rules_db {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 30px 0 20px;
}
/deep/ .send_dialog .el-dialog .el-dialog__body .rules_db p {
  background-color: #cde7ff;
  margin-right: 10px;
  margin-bottom: 10px;
}
/deep/ .send_dialog .el-dialog .el-dialog__body .textarea {
  padding-left: 20px;
}
/deep/
  .send_dialog
  .el-dialog
  .el-dialog__body
  .textarea
  .el-textarea
  .el-textarea__inner {
  height: 252px !important;
}
/deep/ .send_dialog .el-dialog .el-dialog__body .messageTree {
  padding-left: 20px;
}
/deep/ .content .el-textarea__inner {
  height: 142px !important;
}
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
/deep/ .el-input__inner {
  height: 35px !important;
  font-size: 12px;
}
/deep/ .content .el-row .el-form-item {
  margin-bottom: 12px;
}
.bigSize {
  font-size: 14px;
}
.el-dialog-div {
  height: 372px;
  overflow: auto;
}
.btnImg {
  position: relative;
  top: 1px;
}
.btnList {
  flex-direction: row-reverse;
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
  padding: 1px 16px;
}
.msgBtn /deep/ .el-button {
  width: 110px;
}
.backSpan {
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin-left: 10px;
}
.btnImg {
  margin-right: 3px;
}
#strategyUddate {
  font-size: 12px;
}
.groupingSettings {
  color: blue;
  cursor: pointer;
}
.cur {
  cursor: pointer;
}
.cursor {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.sitStratrgyTegTags {
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
}
.sitStratrgyTegTag {
  margin: 10px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
}
.clearBoth {
  clear: both;
}
.alignItem {
  display: flex;
  align-items: center;
  // margin-top: 20px;
}
/deep/ .body_body {
  width: 80px !important;
}
.content {
  width: 96%;
  height: 100%;
  padding: 10px;
  background: white;
  margin: auto;
}
.form {
  padding: 10px;
  box-sizing: border-box;
}
.content /deep/ .el-textarea__inner {
  background: #f6f7fc;
  height: 160px;
}
.content /deep/ .el-select {
  width: 100%;
}
.headTitle {
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0px 22px;
  box-sizing: border-box;
  .flex {
    display: flex;
    height: 48px;
    font-size: 14px;
    color: #33aed3;
    font-weight: bold;
    align-items: center;
    #headLogo {
      width: 14px;
      height: 14px;
      padding: 0px 12px 0px 5px;
      font-size: 14px;
    }
  }
  .border {
    // width: calc(100% - 20px);
    background: #d0d0d0;
    margin-bottom: 26px !important;
    height: 1px;
  }
}
#headLogo {
  width: 14px;
  height: 14px;
  padding: 0px 12px 0px 5px;
  font-size: 14px;
}
.spaceBetween {
  justify-content: space-between;
}
.content /deep/ .el-date-editor.el-input {
  width: 100%;
}
.flex {
  display: flex;
}
.textarea {
  width: 70%;
}
.messageTree {
  width: 30%;
  // margin: auto;
  text-align: center;
  height: 250px;
  overflow: auto;
  border: 1px solid #f9f9f9;
  border-radius: 3px;
}
.strategyTitle {
  // width: 100%;
  height: 70px;
  color: #5cbedc;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 45px;
  box-sizing: border-box;
}
.strategyTitle img {
  margin-right: 20px;
}
.fzClass /deep/ .el-select > .el-input {
  width: 66px;
}
.fzClass /deep/ .el-select {
  width: auto;
  margin: 0 10px;
}
.footer {
  width: 100%;
  height: 15px;
  background-color: #f7f5f5;
}
.footer_top /deep/ .el-select > .el-input {
  width: 200px;
}
.footer_top /deep/ .el-select {
  width: 200px;
  margin: 0 10px;
}
.newTemplate {
  margin-right: 10px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}
.sendDialog /deep/ .el-dialog {
  height: 390px;
  width: 618px;
}
.sendDialog /deep/ .el-dialog__footer {
  text-align: center;
}
.sendList {
  height: 130px;
  margin-top: 10px;
}
.messageControl {
  display: flex;
}
// 2021 0107
.messageDialog {
  display: flex;
}
.messageDialogLeft {
  width: 30%;
  background: #fafafa;
  height: 360px;
}
.messageDialogRight {
  height: 360px;
  width: 70%;
  background: white;
}
.messageDialogDiv /deep/ .el-dialog__body {
  padding: 0 !important;
  height: 360px !important;
}
.messageDialogDiv /deep/ .el-table__header-wrapper {
  // border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #ebeef5;
}
// .messageDialogDiv /deep/ .el-table td{
//   border: 1px solid #d7d7d7!important;
// }
// .messageDialogDiv /deep/ .el-table th.is-leaf{
//   border: 1px solid #d7d7d7!important;
// }
.messageDialogDiv /deep/ .el-table__body-wrapper {
  width: 434px;
  height: 157px !important;
  overflow-y: auto;
}
.messageDialogDiv /deep/ .el-table th > .cell {
  text-align: center;
  color: #000;
  font-size: 14px;
}
.messageDialogDiv /deep/ .el-table .cell {
  text-align: center;
}
// .messageDialogDiv /deep/ .el-table::before{
//   height: 0;
// }
.messageListTitle {
  width: 100%;
  background: #dadada;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addMessageListBtn {
  width: 30%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #02a4ff;
  border-radius: 10px;
  color: white;
  position: absolute;
  top: 366px;
  cursor: pointer;
}
.messageDialogRight /deep/ .el-input {
  width: 100% - 30px;
}
.behand /deep/ .el-input {
  width: 53%;
  margin-right: 10px;
}
.messageDialogForm {
  margin-top: 10px;
  margin-left: 20px;
}
.messageDialogTable {
  width: 90%;
  height: 200px;
}
.messageListName {
  background: #f7f7f7;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.msgP {
  width: 150px;
  text-align: center;
}
.deleteIcon {
  width: 20px;
  height: 20px;
  position: relative;
  left: 12px;
}
/deep/ .sendDialog .el-dialog__header {
  background-color: #f2f2f2;
  position: relative;
  padding: 0 20px 10px;
  height: 35px;
}
/deep/ .sendDialog .el-dialog .send_message {
  width: 27px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 15px;
  background: url("../../assets/strategy/message.png") no-repeat;
}
/deep/ .sendDialog .el-dialog__header .el-dialog__title {
  line-height: 46px;
  font-size: 14px;
  color: #33aed3;
  margin-left: 30px;
}
/deep/ .sendDialog .el-dialog__header .el-dialog__headerbtn {
  font-size: 28px;
  margin-top: -10px;
}
/deep/ .sendDialog .el-dialog__body {
  padding: 0 30px 20px 30px;
}
.basis {
  margin: 10px 0 10px 0;
}
.basis p {
  color: #000;
}
/deep/ .sendDialog .el-dialog__body .el-checkbox {
  width: 49px;
  margin-bottom: 5px;
}
.exc {
  margin-bottom: 10px;
}
.exc p {
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
/deep/ .excb .el-checkbox {
  width: 80px !important;
  margin-right: 10px;
}
.msgDel {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.msgBtn {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  margin-right: 20px;
}
// .msBtn /deep/ .el-button{
//   width: 500px !important;
// }
/deep/ .dialogEnter .el-dialog {
  height: 200px;
}
/deep/ .dialogEnter .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
/deep/ .dialogEnter .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 28px;
}
/deep/ .dialogEnter .el-dialog__header .el-dialog__title {
  font-weight: 700 !important;
  color: #38afd3 !important;
  padding-left: 30px;
  font-size: 14px !important;
}
.dialogEnter .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogEnter .el-dialog__body {
  padding: 5px 30px 0 0px !important;
}
/deep/ .dialogEnter .el-dialog__body .el-form-item__content {
  display: flex;
  align-items: center;
}
/deep/ .dialogEnter .el-dialog__footer {
  padding: 10px 20px 20px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 40px;
}
</style>
