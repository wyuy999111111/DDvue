<template>
  <div>
    <div class="head">
      <HeadTitle class="headTitle" params="搜索条件" />
      <el-row>
        <el-form label-width="95px">
          <el-col
            :sm="{ span: 11 }"
            :md="{ span: 11 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
          >
            <el-form-item label="标签名称">
              <el-input v-model="params.tagName" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row type="flex" justify="end">
        <el-form>
          <el-col
            :sm="{ span: 20 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
          >
            <el-form-item>
              <div class="btnList">
                <el-button @click="find">
                  <img src="../../assets/logo/find.png" /> 查询
                </el-button>
                <el-button @click="start">
                  <img src="../../assets/logo/reSet.png" />重置
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="head">
      <div class="headTitle">
        <div class="flexBetween">
          <div class="flex">
            <img src="../../assets/indexImg/项目符.png" id="headLogo" alt="" />
            自建标签列表
          </div>
          <span class="download" @click="download">导入模板下载</span>
        </div>
        <div class="border"></div>
      </div>
      <!-- <HeadTitle class="headTitle" params='自建标签列表' /> -->
      <el-table
        :data="tableData"
        style="margin: auto; width: 95%; border: 1px solid #d0d0d0"
        show-header
        :header-cell-style="{
          background: '#E6E9F2',
          color: '#000',
          fontWeight: '400',
        }"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" prop="tagName" label="标签名称" />
        <el-table-column align="center" prop="tagClassName" label="标签分类" />
        <el-table-column
          align="center"
          prop="tagValueType"
          label="标签值类型"
          :formatter="tagValueTypeFormatter"
        />
        <el-table-column
          align="center"
          prop="importTime"
          label="最新导入时间"
        />
        <el-table-column align="center" prop="importStatus" label="导入状态">
          <template slot-scope="scope">
            <span v-if="scope.row.importStatus === '0'">成功</span>
            <span v-if="scope.row.importStatus === '2'">导入中</span>
            <span
              v-if="scope.row.importStatus === '1'"
              class="fail"
              @click="failWhy(scope)"
              >失败</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="importUser" label="导入人" />
        <el-table-column align="center" label="导入历史">
          <template slot-scope="res">
            <span class="underline" @click="see(res)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="res">
            <el-upload
              name="filename"
              :show-file-list="false"
              accept=".csv"
              class="upload-demo dataImport"
              :action="action"
              :on-success="uploadSuccess"
            >
              <div class="dataImport" @click="handleUpload(res)">
                <img src="../../assets/logo/dataImport.png" />导入数据
              </div>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          class="pageSet"
          :pager-count="7"
          @current-change="handleCurrentChange"
          :page-size="10"
          background
          :total="params.total"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next, jumper, total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      title="导入历史"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="900px"
      @close="delTemplate"
    >
      <div class="customLabelMessage"></div>
      <el-table
        :data="dialogTableData"
        style="margin: auto; width: 95%; border: 1px solid #d0d0d0"
        :header-cell-style="{
          background: '#E6E9F2',
          color: '#000',
          fontWeight: '400',
        }"
        stripe
      >
        <el-table-column align="center" prop="importTime" label="导入时间" />
        <el-table-column align="center" prop="importStatus" label="导入状态">
          <template slot-scope="scope">
            <span v-if="scope.row.importStatus === '0'">成功</span>
            <span v-if="scope.row.importStatus === '2'">导入中</span>
            <span
              v-if="scope.row.importStatus === '1'"
              class="fail underline"
              @click="failWhy(scope)"
              >失败</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="importUser" label="最近导入人" />
        <el-table-column align="center" prop="importFiles" label="导入文件">
          <template slot-scope="scope">
            <span class="cursor underline" @click="downFiles(scope)">{{
              scope.row.importFiles
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          class="pageSet"
          :pager-count="7"
          @current-change="handleCurrentChangeHistory"
          :page-size="10"
          background
          :total="history.total"
          prev-text="上一页"
          next-text="下一页"
          layout="prev ,pager ,next, jumper, total"
        ></el-pagination>
      </div>
    </el-dialog>
    <el-dialog
      title="失败原因"
      :visible.sync="dialogFail"
      width="900px"
      :close-on-click-modal="false"
    >
      <div class="customLabelMessage"></div>
      {{ faileReason }}
    </el-dialog>
  </div>
</template>

<script>
import HeadTitle from "../../common/HeadTitle";
import { findUserRe, findTagList, findTagHistory } from "../../api/getApi";
export default {
  components: {
    HeadTitle,
  },
  data() {
    return {
      expand: [],
      params: {
        tagName: "",
        pageSize: 10,
        pageNow: 1,
        total: 0,
      },
      tableData: [],
      action: "/sit-web/sit/customTag/CustomTagImport",
      dialogVisible: false,
      history: {
        tagId: "",
        pageSize: "10",
        pageNow: "1",
        total: "",
      },
      faileReason: "",
      dialogFail: false,
      dialogTableData: [],
    };
  },
  created() {
    this.find();
    findUserRe().then((res) => {
      this.expand = res.data.data[0].children[1].prmsIdentity;
      console.log(res.data.data[0].children[1].prmsIdentity);
    });
  },
  methods: {
    find() {
      findTagList(this.params).then((res) => {
        this.tableData = res.data.data.list;
        this.params.total = res.data.data.totalCount;
        console.log(res.data.data.list);
      });
    },
    handleCurrentChange(res) {
      this.params.pageNow = res;
      this.find();
    },
    handleCurrentChangeHistory(res) {
      this.history.pageNow = res;
      this.findHistory();
    },
    tagValueTypeFormatter(e) {
      let text = "";
      if (e.tagValueType === "1") {
        text = "数值型";
      } else if (e.tagValueType === "2") {
        text = "枚举型";
      } else if (e.tagValueType === "3") {
        text = "日期型";
      } else if (e.tagValueType === "4") {
        text = "文本型";
      }
      return text;
    },
    handleUpload(res) {
      this.action =
        "/sit-web/sit/customTag/CustomTagImport?tagId=" +
        res.row.tagId +
        "&tagValueType=" +
        res.row.tagValueType +
        "&tagFieldName=" +
        res.row.tagFieldName;
    },
    see(e) {
      this.history.tagId = e.row.tagId;
      this.dialogVisible = true;
      this.findHistory();
    },
    findHistory() {
      findTagHistory(this.history).then((res) => {
        this.dialogTableData = res.data.data.list;
        this.history.total = res.data.data.totalCount;
        console.log(res.data.data.list);
      });
    },
    download() {
      const url = location.host;
      window.open(`http://${url}/sit-web/sit/customTag/downloadFile`);
    },
    failWhy(e) {
      console.log(e.row.faileReason);
      this.dialogFail = true;
      this.faileReason = e.row.faileReason;
    },
    start() {
      this.params.tagName = "";
    },
    downFiles(e) {
      if (this.expand.indexOf("历史下载") > -1 === true) {
        const url = location.host;
        window.open(
          `http://${url}/sit-web/sit/customTag/downloadHistoryFile?fileName=${e.row.importFiles}`
        );
      } else {
        console.log(111)
      }
    },
    uploadSuccess(e) {
      console.log(e);
      if (e.code === 0) {
        this.find();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  margin: 20px 15px;
  background: white;
}
/deep/ .el-input {
  height: 20px;
}
/deep/ .el-input__inner {
  height: 35px;
}
.btnList {
  display: flex;
}
.btnList .el-button {
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 1px 16px;
}
.btnList .el-button span img {
  margin-right: 10px;
  vertical-align: text-bottom;
}
.flexBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
}
.headLogo {
  width: 14px;
  margin: 10px 20px;
}
.more {
  font-size: 14px;
  padding-right: 30px;
  cursor: pointer;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headTitle .flex {
  display: flex;
  height: 3rem;
  font-size: 0.875rem;
  color: #33aed3;
  font-weight: bold;
  align-items: center;
}
.headTitle {
  width: 100%;
  border-radius: 0.3125rem;
  background-color: #fff;
  padding: 0 1.375rem;
  box-sizing: border-box;
}
#headLogo {
  width: 14px;
  height: 14px;
  padding: 0px 12px 0px 5px;
}
.border {
  background: #d0d0d0;
  margin-bottom: 8px;
  height: 1px;
}
.download {
  font-size: 12px;
  color: blue;
  cursor: pointer;
}
.fail {
  color: blue;
  cursor: pointer;
}
/deep/ .customLabelMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
/deep/ .el-dialog__header .el-dialog__title {
  font-weight: 700 !important;
  color: #38afd3 !important;
  padding-left: 30px;
  font-size: 14px !important;
}
.cursor {
  cursor: pointer;
}
.dataImport {
  color: #29abe2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.underline {
  color: #29abe2;
  text-decoration: underline;
  cursor: pointer;
}
.page {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
  margin-right: 40px;
}
/deep/.el-table td {
  padding: 6px 0;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 28px;
}
</style>
