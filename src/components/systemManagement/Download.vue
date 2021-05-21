<template>
  <div class="download">
    <div id="top">
      <HeadTitle params="搜索条件" />
      <el-form  label-width="102px">
          <el-row class="topRow">
            <el-col :sm="{span: 11}" :md="{span: 11}" :lg="{span: 8}" :xl="{span: 6}" v-model="form">
              <el-form-item label="下载时间:">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  >
                </el-date-picker>
                <!-- <el-date-picker
                  v-model="time"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
                <span class="abc">~</span>
                <el-date-picker
                  v-model="time"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker> -->
              </el-form-item>
            </el-col>
            <div class="btnList">
              <el-button @click="handleFind('start')" ><img src="../../assets/logo/find.png" />查询</el-button>
              <el-button @click='handleReset'><img src="../../assets/logo/reSet.png" />重置</el-button>
            </div>
          </el-row>
      </el-form>
    </div>
    <div id="body">
      <HeadTitle params="文件下载历史列表" />
      <div class="border">
        <el-table
        :data="downList"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column prop="upTime" label="下载时间" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作功能" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.operator === '1'">人员查询-下载</span>
            <span v-if="scope.row.operator === '2'">群组创建-下载</span>
            <span v-if="scope.row.operator === '3'">群组修改-下载</span>
            <span v-if="scope.row.operator === '4'">群组查看-下载</span>
            <span v-if="scope.row.operator === '5'">策略报表-下载</span>
            <span v-if="scope.row.operator === '6'">策略报表明细-下载</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="下载文件名" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="res">
              <div class="alignItemOne" @click='down(res)'>
                <img src="../../assets/indexImg/下载.png" alt="">
                <span class="resetColorA">下载</span>
              </div>
          </template>
        </el-table-column>
      </el-table>
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
          layout="prev ,pager ,next , jumper, total"
        ></el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { uploadSales } from '@/api/getApi'

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      downList: '',
      totalCount: '',
      form: {
        startTime: '',
        endTime: '',
        pageSize: '10',
        pageNow: '1'
      },
      time: ['', '']
    }
  },
  created () {
    this.handleFind()
  },
  methods: {
    down (e) {
      // downLoadFile(e.row.fileName).then((res) => {
      //   console.log(res)
      // })
      console.log(e)
      const url = location.host
      window.open(
        `http://${url}/sit-web/sit/upLoad/downLoadFileFromS3?fileName=${e.row.fileName}`
      )
    },
    handleFind (e) {
      this.form.startTime = this.time && this.time[0].length > 3 ? this.time[0] + ' 00:00:00' : ''
      this.form.endTime = this.time && this.time[1].length > 3 ? this.time[1] + ' 23:59:59' : ''
      if (e === 'start') {
        this.form.pageNow = 1
      }
      uploadSales(this.form).then(res => {
        this.downList = res.data.data.list
        this.totalCount = res.data.data.totalCount
      })
    },
    handleCurrentChange (val) {
      this.form.pageNow = val
      this.handleFind()
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.hadnleFind()
    },
    handleReset () {
      this.time = ['', '']
    }
  }
}
</script>

<style lang='less' scoped>
.download{
  padding: 20px 15px 0;
}
#top{
  background: white;
  margin-bottom: 20px;
}
.topRow{
  // display: flex;
  // justify-content: space-between;
  padding: 10px 30px 0 10px;
}
/deep/ .el-form-item__content{
  display: flex;
}
.abc{
  width: 20px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}
.el-button{
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
}
/deep/ .el-button span{
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .el-button img{
  margin-right: 10px;
}
.el-button:active,
.el-button:focus,
.el-button:hover {
  color: #fff;
  border-color: #409EFF;
  background-color: #409EFF;
}
.btnList{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin-top: 5px;
  margin-right: 10px;
}
#body{
  background-color: #fff;
}
.border{
  margin-top: 20px;
  padding: 0 35px;
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
.alignItemOne{
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
</style>
