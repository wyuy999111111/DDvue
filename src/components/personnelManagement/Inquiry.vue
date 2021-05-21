<template>
  <div id="all">
    <div @click="handlexs">
    <div id="top">
      <CustomCondition @customConditionResult="customConditionResult" :salesTagMemberDto='salesTagMemberDto' :findGo='findGo' @loadingGo='loadingGo' :loading='loading' />
    </div>
    <div class="top">
      <div class="top_top">操作</div>
      <!-- <div class="top_inquiry"></div> -->
        <div class="headTitle">
          <div class="flexBetween">
            <div class="flex">
              <img src="../../assets/indexImg/项目符.png"  id="headLogo" alt="">
              人员列表
            </div>
            <div class="more" >
              <div class="result" @click="addResult">
              <img src="../../assets/indexImg/筛选.png" alt="">
              <span>结果列筛选</span>
              </div>
              <div class="load" @click="down"
              v-if='user.indexOf("下载") > -1'
              >
                <img src="../../assets/indexImg/下载.png" alt=""><span>下载</span></div>
              </div>
          </div>
          <div class="border"></div>
        </div>
        <el-table
          :cell-style="{height: '73px'}"
          :data="tableData"
          border
          style="margin: auto; width: 98%"
          :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
          stripe>
          <el-table-column width="120" label="工号" prop='sales_code'></el-table-column>
          <el-table-column width="120" label="姓名" prop='sales_name'></el-table-column>
          <el-table-column width="120" label="二级机构名称" prop='sales_comname2'></el-table-column>
          <el-table-column width="120" label="三级机构名称" prop='sales_comname3'></el-table-column>
          <el-table-column width="120" label="机构代码" prop='sales_comcode'></el-table-column>
          <el-table-column width="120" label="机构名称" prop='sales_comname'></el-table-column>
          <el-table-column width="120" label="渠道代码" prop='sales_channelcode'></el-table-column>
          <el-table-column width="120" label="渠道名称" prop='sales_channename'></el-table-column>
          <el-table-column
            v-for="(item, index) in resultList"
            width="120"
            :key="item.head"
            border
            :prop="item.tagFieldName"
            :render-header="() => renderHeaderDate(item.name, index)"
            >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="res">
              <div class="alignItemOne czBtnList">
                <span class="alignItemOne" @click='goPerson(res)'>
                  <span type="text" size="small" class="cour table_cz">
                  <img class="img_img" src="../../assets/indexImg/查看.png" alt="">查看</span>
                </span>
              </div>
            </template>
              <!-- <span class="imgsss"><img src="../../assets/indexImg/详情_1.png" alt /><span>查看</span></span> -->
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            ref='page'
            :pager-count="7"
            @current-change="handleCurrentChange"
            :page-size="10"
            background
            :total="totalCount"
            prev-text="上一页"
            next-text="下一页"
            layout="prev ,pager ,next, jumper, total"
          ></el-pagination>
        </div>
    </div>
    </div>
    <div class="fixed fixedaaa" :style="{left: fixedLeft, height: windowHeight + 'px', zIndex: 9999}">
      <div class="fixedHead">
        选择筛选标签
        <i @click="fixedNone" class="el-icon-close" id="deleteIconTwo"></i>
      </div>
      <div class="aaaa">
      <el-input
        class="inputaaa"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <div class="asd"></div>
      <div id="tree" :style="{height: windowHeight - 150 + 'px'}" >
        <el-tree
          ref="tree"
          class="filter-tree treeOp"
          :data="data"
          :default-checked-keys="arrTop"
          show-checkbox
          :props="defaultProps"
          :filter-node-method="filterNode"
          node-key="id"
          @check-change="handleCheckChange"
          >
        </el-tree>
      </div>
      </div>
    </div>
    <div class="fixedResult fixedaaa" :style="{left: fixedLeftResult, height: windowHeight + 'px', zIndex: 9999}">
      <div class="fixedHead">
        选择结果标签
        <i @click="fixedResultNone" class="el-icon-close" id="deleteIcon"></i>
      </div>
      <div class="aaaa">
      <el-input
        class="inputaaa"
        placeholder="输入关键字进行过滤"
        v-model="filterTextCopy">
      </el-input>
      <div class="asd"></div>
      <div id="treeTwo" :style="{height: windowHeight - 150 + 'px'}">
        <el-tree
          ref="treeCopy"
          class="filter-tree aaaa"
          :data="dataRe"
          show-checkbox
          :props="defaultProps"
          :filter-node-method="filterNode"
          node-key="id"
          @check-change="handleCheckChangeCopy"
          >
        </el-tree>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findUploadSales,
  getSalesReturnDate,
  setSalesReturnDate,
  findOrgByUser, findChannel, findUserRe, resultTagClassAndTag, findSalesTagMemberPage
} from '@/api/getApi'
import CustomCondition from '../../common/CustomCondition'

export default {
  name: 'asd',
  components: {
    CustomCondition
  },
  data () {
    return {
      loading: false,
      user: [],
      idArr: [],
      tableDataaaa: [],
      resultStr: '',
      filterText: '',
      checkList: ['姓名', '日期', '地址'],
      fixedLeft: '-300px',
      fixedLeftResult: '-300px',
      data: [],
      dataRe: [],
      resultList: [],
      inputList: [{}],
      tableData: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      totalCount: 0,
      pageSize: 10,
      pageNow: 1,
      ge: [1, 2],
      channelOption: [], // 渠道
      channelOptionCopy: [], // 渠道
      mechanismOption: [], // 机构
      channelResult: [], // 渠道结果
      mechanismResult: [],
      props: {
        multiple: true,
        children: 'child',
        label: 'name',
        value: 'id'
      },
      windowHeight: 0,
      arrTop: [],
      filterTextCopy: '',
      dropDownValue: '',
      salesTagMemberDto: [],
      findGo: false,
      disable: false
    }
  },
  created () {
    if (this.$route.query.operationId) {
      getSalesReturnDate(this.$route.query.operationId).then((res) => {
        console.log(res.data.data.salesTagMemberDto)
        const idArr = []
        for (let i = 0; i < res.data.data.resultList.length; i++) {
          idArr.push(res.data.data.resultList[i].id)
          this.$refs.treeCopy.setCheckedKeys(idArr)
        }
        this.salesTagMemberDto = res.data.data.salesTagMemberDto
        this.resultList = res.data.data.resultList
        this.findGo = !this.findGo
      })
    }
    this.windowHeight = document.documentElement.clientHeight - 80
    findOrgByUser().then((res) => {
      this.mechanismOption = res.data.data
    })
    findChannel().then((res) => {
      console.log('11111', res.data.data)
      this.channelOption = res.data.data
      this.channelOptionCopy = res.data.data
    })
    findUserRe().then((res) => {
      console.log(res.data.data)
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].resName === '人员管理') {
          for (let j = 0; j < res.data.data[i].children.length; j++) {
            if (res.data.data[i].children[j].resName === '人员查询') {
              console.log('xtgl')
              this.user = res.data.data[i].children[j].prmsIdentity
            }
          }
        }
      }
      console.log(this.user)
    })
    this.getData()
    this.checkChange()
    // this.find()
    this.handleCheckChange()
  },
  watch: {
    'checkList' () {
      this.checkChange()
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    filterTextCopy (val) {
      this.$refs.treeCopy.filter(val)
    }
  },
  methods: {
    goPerson (res) {
      const salesTagMemberDto = this.salesTagMemberDto.slice(0)
      const params = {
        salesTagMemberDto,
        resultList: this.resultList
      }
      setSalesReturnDate(params).then((ress) => {
        console.log(ress)
        if (ress.data.code === 0) {
          this.$router.push({ path: `/portrait?sales_code=${res.row.sales_code}&historySec=/personnelManagement/inquiry&operationId=${ress.data.data}` })
        }
      })
      this.$router.push({ path: `/portrait?sales_code=${res.row.sales_code}&historySec=/personnelManagement/inquiry` })
      // this.$router.push({ path: `/Portrait?${}` })
    },
    dropDownSearch () {
      const newArr = []
      console.log(this.channelResult)
      for (let i = 0; i < this.channelOptionCopy.length; i++) {
        if (this.channelOptionCopy[i].sales_channename.indexOf(this.dropDownValue) > -1) {
          newArr.push(this.channelOptionCopy[i])
        }
      }
      this.channelOption = newArr
    },
    handlexs () {
      this.fixedLeft = '-300px'
      this.fixedLeftResult = '-300px'
    },
    deleteOne (e) {
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].name === e.name) {
          this.inputList.splice(i, 1)
        }
      }
      const onArr = []
      for (let i = 0; i < this.inputList.length; i++) {
        onArr.push(this.inputList[i].id)
      }
      this.$refs.tree.setCheckedKeys(onArr)
    },
    startOn () {
      this.channelResult = []
      this.mechanismResult = ''
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].tagValueType === '2') {
          this.inputList[i].model = []
        } else {
          this.inputList[i].model = ''
        }
        this.inputList[i].modela = ''
        this.inputList[i].modelb = ''
      }
    },
    down () {
      const arr = []
      const paramsList = [{
        name: '工号',
        tagFieldName: 'sales_code'
      }, {
        name: '姓名',
        tagFieldName: 'sales_name'
      }, {
        name: '二级机构名称',
        tagFieldName: 'sales_comname2'
      }, {
        name: '三级机构名称',
        tagFieldName: 'sales_comname3'
      }, {
        name: '机构代码',
        tagFieldName: 'sales_comcode'
      }, {
        name: '机构名称',
        tagFieldName: 'sales_comname'
      }, {
        name: '渠道代码',
        tagFieldName: 'sales_channelcode'
      }, {
        name: '渠道名称',
        tagFieldName: 'sales_channename'
      }]
      for (let i = 0; i < this.resultList.length; i++) {
        paramsList.push(this.resultList[i])
      }
      const mechanismArr = []
      for (let i = 0; i < this.mechanismResult.length; i++) {
        mechanismArr.push(this.mechanismResult[i][1])
      }
      console.log(arr)
      const params = {
        salesTagMemberDto: this.salesTagMemberDto,
        resultList: paramsList
      }
      const url = location.host
      findUploadSales(params).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          console.log('cg')
          // window.open(`http://${url}/sit/salesTag/uploadSales?jId=${res.data.data}`)
          window.open(`http://${url}/sit-web/sit/salesTag/uploadSales?loadFlag=1&jId=${res.data.data}`)
        }
      })
      // const asd = encodeURI(JSON.stringify(params))
      // console.log(asd)
      // console.log(arr)
      // window.open(`http://${url}/sit/salesTag/uploadSales?jId=${asd}`)
    },
    handleCurrentChange (val) {
      this.pageNow = val
      findSalesTagMemberPage(this.pageNow, this.pageSize, this.salesTagMemberDto).then(
        res => {
          this.loading = false
          this.mapNum += 1
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
          console.log('123')
        }
      ).catch(() => {
        console.log('456')
        this.loading = false
      })
    },
    checkChange () {
      const arr = []
      this.resultList = arr
      console.log(this.resultList)
    },
    filterNode (value, data) {
      console.log(value, data)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getData () {
      // postGroup().then((res) => {
      //   this.data = res.data.data
      // })
      resultTagClassAndTag().then((res) => {
        this.dataRe = res.data.data
      })
    },
    renderHeaderDate (data, index) {
      const _this = this
      const name = this.resultList[index].name
      if (name !== '姓名' && name !== '工号' && name !== '机构代码' && name !== '渠道名称' && name !== '渠道代码' && name !== '机构名称') {
        return (<div class='flexBetween'>
          <span>{name}</span>
          <i onClick={() => { _this.deleteResult(index) }} class="el-icon-close cour"></i>
        </div>)
      } else {
        return (<div class='flexBetween'>
          <span>{name}</span>
          <i></i>
        </div>)
      }
    },
    deleteResult (e) {
      const arr = this.resultList.slice(0)
      arr.splice(e, 1)
      this.resultList = arr
      console.log(arr)
      const idArr = []
      for (let i = 0; i < this.resultList.length; i++) {
        idArr.push(this.resultList[i].id)
      }
      console.log(idArr)
      console.log(this.resultList)
      this.$refs.treeCopy.setCheckedKeys(idArr)
    },
    customConditionResult (data) {
      this.$refs.page.internalCurrentPage = 1
      this.pageNow = 1
      this.salesTagMemberDto = data
      findSalesTagMemberPage(this.pageNow, this.pageSize, data).then(
        res => {
          this.loading = false
          this.mapNum += 1
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
          console.log('123')
        }
      ).catch(() => {
        console.log('456')
        this.loading = false
      })
    },
    loadingGo (loading) {
      this.loading = loading
    },
    addInput () {
      setTimeout(() => {
        this.fixedLeft = '35px'
      }, 0)
    },
    fixedNone () {
      this.fixedLeft = '-300px'
    },
    handleCheckChange () {
      const dataOn = this.$refs.tree.getCheckedNodes()
      console.log(dataOn)
      var obj = []
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].tagFieldName) {
          if (dataOn[i].tagValueType === '1') {
            obj.push({
              tagFieldName: dataOn[i].tagFieldName,
              id: dataOn[i].id,
              tagId: dataOn[i].tagId,
              name: dataOn[i].name,
              tagValueType: dataOn[i].tagValueType,
              enumerateData: dataOn[i].enumerateData,
              ifPercent: dataOn[i].ifPercent,
              modala: '',
              modalb: ''
            })
          } else if (dataOn[i].tagValueType === '3') {
            obj.push({
              tagFieldName: dataOn[i].tagFieldName,
              tagId: dataOn[i].tagId,
              id: dataOn[i].id,
              name: dataOn[i].name,
              tagValueType: dataOn[i].tagValueType,
              enumerateData: dataOn[i].enumerateData,
              model: []
            })
          } else {
            obj.push({
              tagFieldName: dataOn[i].tagFieldName,
              id: dataOn[i].id,
              tagId: dataOn[i].tagId,
              name: dataOn[i].name,
              tagValueType: dataOn[i].tagValueType,
              enumerateData: dataOn[i].enumerateData,
              modal: ''
            })
          }
        }
      }
      this.inputList = obj
      console.log(this.inputList)
    },
    handleCheckChangeCopy () {
      const dataOn = this.$refs.treeCopy.getCheckedNodes()
      const arr = []
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].tagFieldName) {
          arr.push({
            name: dataOn[i].name,
            tagFieldName: dataOn[i].tagFieldName,
            id: dataOn[i].id
          })
        }
      }
      this.resultList = arr
    },
    addResult () {
      setTimeout(() => {
        this.fixedLeftResult = '35px'
      }, 0)
    },
    fixedResultNone () {
      this.fixedLeftResult = '-300px'
    }
  }
}
</script>
<style>
.el-form-item__content .el-input-group{
  width: 100px;
}
.formItemSelect{
  bottom: 1px solid #DCDFE6;
  border-radius: 5px;
}
.el-scrollbar {
  display: block !important;
}
.cour{
  cursor: pointer;
}
.hx{
  padding: 0 10px;
}
.el-cascader__tags {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
}
</style>
<style lang="less" scoped>
/deep/ .el-table td, .el-table th .el-table_2_column_18{
  padding: 6px 0 !important;
}
/deep/ .el-table th{
  padding: 6px 0 !important;
}
/deep/ .el-table_1_column_9{
  display: table-cell!important;
}
.img_img{
  width: 22px;
  height: 14px;
  position: absolute;
  top: 30px;
  right: 90px;
}
.table_cz{
  margin-left: 24px;
}
/deep/ .el-button:hover{
  color: #fff !important;
  border-color: none !important;
  background-color: #47bcea !important;
}
/deep/ .form_el-col{
  width: 230px !important;
}
/deep/ .el-form-item__content{
  display: flex;
  align-items: center;
}
/deep/ .el-table .cell {
  line-height: 20px !important;
}
/deep/ .el-table td {
  padding: 6px 0 !important;
}
/deep/ .el-form-item{
  margin-bottom: 8px;
}
/deep/ .el-input__inner{
  height: 35px !important;
  font-size: 12px;
}
.el-form-item /deep/ .el-form-item__label{
  line-height: none !important;
}
/deep/ .el-select__tags {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
}
.formTop .el-form-item__label{
  height: 40px;
  display: flex;
  line-height: none !important;
  text-align: left;
  align-items: center;
  padding-left: 20px !important;
}
.formTop{
  max-height: 200px;
  overflow: auto;
}
#tree{
  overflow-y: scroll;
}
#treeTwo{
  overflow-y: scroll;
  background: white;
}
#deleteIcon{
  padding-right: 10px;
}
#deleteIconTwo{
  padding-right: 10px;
}
.treeOp{
  height: 200px;
}
.formItem{
  width: 95%;
}
.formItem .spanFlex .el-input__inner{
  widows: 95%;
}
.abc{
  /deep/ .el-cascader{
    width: 95%;
  }
}
.el-range-editor.el-input__inner[data-v-dc6fca8a]{
  width: 95%;
}
.el-cascader__search-input{
  background: red;
}
.fixedaaa{
  background: #E9E9E9;
}
.aaaa{
  width: 95%;
  margin: auto;
  background: white;
}
.spanFlex{
  display: flex;
}
#all{
  margin: 20px 15px;
#top{
  border-radius: 5px;
  background: white;
  margin-bottom: 10px;
  .topRow{
    width: 100%;
  }
}
.top{
  border-radius: 5px;
  background: white;
  position: relative;
  .headTitle{
  width: 100%;
  border-radius: 5px;
  .topRow{
  padding: 0 20px 1000px 20px;
  .flex{
  display: flex;
  align-items: center;
  margin: 5px 0;
  .label{
  width: 100px;
  font-size: 15px;
  color: #333;
  font-weight: 400;
}
}
}
}
}
}
.el-cascader{
  width: 100%;
}
/deep/ .el-range-editor.el-input__inner{
  width: 100%;
  margin-top: 3px;
}
.flex{
  display: flex;
  font-size: 14px;
  color: #33aed3;
  font-weight: bold;
  align-items: center;
}

#headLogo{
  width: 14px;
  margin: 10px 20px;
}
.border{
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  margin-bottom: 10px;
  height: 1px;
}
.flexBetween{
  display: flex;
  justify-content: space-between;
  height: 48px;
  align-items: center;
}
.more{
  font-size: 14px;
  padding-right: 30px;
  cursor: pointer;
  color:#333;
display: flex;
    justify-content: space-between;
    align-items: center;
}
.result{
    width: 112px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 36px;
}
.result span{
  font-size: 14px;
}
.el-table .cell{
  font-size: 12px;
}
.load{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:55px;
}
.load span {
  font-size: 14px;
}
/* /deep/ .el-table__header-wrapper {
        background-color: #E6E9F2;
      } */
.fixed{
  position: fixed;
  z-index: 9;
  top: 0;
  width: 300px;
  height: 500px;
  top: 50px;
  background: #E9E9E9;
  transition: all 0.5s;
}
.asd{
  height: 10px;
  background: #E9E9E9;
}
.fixedResult{
  position: fixed;
  top: 0;
  width: 300px;
  top: 50px;
  transition: all 0.5s;
  z-index: 9;
}
.fixedTree{
  background: white;
  opacity: 1;
  min-height: 300px;
}
.fixedHead{
  margin: 10px 0 30px 10px;
  display: flex;
  justify-content: space-between;
}
.el-button {
  display: flex;
  background-color: #47bcea;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  padding: 0;
  // display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    vertical-align: text-bottom;
  }
}
.btnList{
  display: flex;
  align-items: flex-end;
  height: 40px;
  justify-content: flex-end;
  margin-right: 30px;
}
.btnList .el-button{
  padding: 12px 20px !important;
}
/deep/ .el-row--flex.is-justify-end{
  margin-right: 1%;
}
.top .top_top{
  width: 107px;
  height: 39px;
  background-color: #e6e9f2;
  position: absolute;
  top: 60px;
  right: 22px;
  z-index: 999;
  line-height: 39px;
  font-size: 12px;
  font-weight: 700;
}
// .top .top_inquiry{
//   width: 107px;
//   height: 39px;
//   background-color: #e6e9f2;
//   position: absolute;
//   top: 60px;
//   right: 22px;
//   z-index: 99998;
//   line-height: 39px;
//   font-size: 12px;
//   font-weight: 700;
// }
.alignItemOne{
  display: flex;
  align-items: center;
}
.alignItemOne {
  img{
    padding-left: 10px;
  }
}
.alignItemOne{
  span{
    cursor: pointer;
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
// ::-webkit-scrollbar {
//   width: 8px;
//   height: 6px;
// }
// ::-webkit-scrollbar-thumb {
//   background-color: #e7e7e7;
//   border-radius: 2px;
// }
</style>
