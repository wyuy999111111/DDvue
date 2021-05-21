<template>
  <div class="customCondition">
    <div class="headTitle">
    <div class="flexBetween">
      <div class="flex alignItem title">
        <img src="../assets/logo/titleLogo.png" id="headLogo" alt />
        <span>标签选值</span>
      </div>
      <div class="more" @click="addInput" v-if="!noFind">
        <img src="../assets/logo/addMini.png" style="margin-right:8px" alt />添加
      </div>
    </div>
    <div class="border"></div>
  </div>
  <el-row :gutter="32" class="topRow">
    <el-form label-width="130px" class="formTop" v-if="size === 'mini'">
      <el-col :sm="{span: 10}" :md="{span: 10}" :lg="{span: 10}" :xl="{span: 10}" >
        <el-form-item label="渠道" class="formItem noDelete">
          <el-select clearable class="formItem" multiple v-model="channelResult" placeholder="请选择渠道" filterable :disabled='noFind' @change="$store.state.isFind = true">
            <el-option
              v-for="res in channelOption"
              :key="res.sales_channelcode"
              :label="res.sales_channename"
              :value="res.sales_channelcode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="{span: 10}" :md="{span: 10}" :lg="{span: 10}" :xl="{span: 10}" >
        <el-form-item label="机构" class="formItem noDelete">
          <el-cascader
            clearable
            :disabled='noFind'
            v-model="mechanismResultList"
            :options="mechanismOption"
            :props="props"
            @change="$store.state.isFind = true"
            placeholder="请选择机构"
          ></el-cascader>
        </el-form-item>
          </el-col>
      <el-col :sm="{span: 10}" :md="{span: 10}" :lg="{span: 10}" :xl="{span: 10}"
        v-for="(item, index) in inputList"
        :key="index"
      >
        <el-form-item :label="item.name" class="formItem">
          <div class="spanFlex" :style="{width: noFind ? '95%' : '100%'}" v-if="item.tagValueType === '1'">
            <el-input clearable placeholder="请输入" v-model="item.startFiledName" :disabled='noFind' @change="$store.state.isFind = true">
              <i slot="suffix" style="font-style:normal;margin-right: 2px;" v-if="item.ifPercent === '1'">%</i>
            </el-input>
            <span class="db_hx">-</span>
            <el-input clearable placeholder="请输入" v-model="item.endFiledName" :disabled='noFind' @change="$store.state.isFind = true">
              <i slot="suffix" style="font-style:normal;margin-right: 2px;" v-if="item.ifPercent === '1'">%</i>
            </el-input>
          </div>
          <el-select
            clearable
            filterable
            :disabled='noFind'
            class="formItem"
            v-if="item.tagValueType === '2'"
            multiple
            v-model="item.list"
            placeholder="请选择"
            @change="$store.state.isFind = true"
          >
            <el-option v-for="(res, index) in item.enumerateData" :key="index" :label="res" :value="res"></el-option>
          </el-select>
          <el-date-picker
            clearable
            :picker-options="pickerOptions"
            :disabled='noFind'
            v-if="item.tagValueType === '3'"
            v-model="item.dateValue"
            @change="handleChangeDate(index)"
            unlink-panels
            class="formItem"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
          <el-input clearable class="formItem" v-if="item.tagValueType === '4'" v-model="item.value" :disabled='noFind'></el-input>
          <i class="el-icon-close" v-if="item.name && !noFind" @click="deleteOne(item)" />
        </el-form-item>
      </el-col>
    </el-form>
    <el-form label-width="130px" class="formTop" v-if="!size">
      <el-col :sm="{span: 20}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}" >
        <el-form-item label="渠道" class="formItem noDelete">
          <el-select clearable class="formItem" multiple v-model="channelResult" placeholder="请选择渠道" filterable @change="$store.state.isFind = true">
            <el-option
              v-for="res in channelOption"
              :key="res.sales_channelcode"
              :label="res.sales_channename"
              :value="res.sales_channelcode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="{span: 20}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}" >
        <el-form-item label="机构" class="formItem noDelete">
          <el-cascader
            @change="$store.state.isFind = true"
            v-model="mechanismResultList"
            :options="mechanismOption"
            :props="props"
            placeholder="请选择机构"
            clearable
          ></el-cascader>
        </el-form-item>
          </el-col>
      <el-col :sm="{span: 20}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}"
        v-for="(item, index) in inputList"
        :key="index"
      >
        <el-form-item :label="item.name" class="formItem">
          <div class="spanFlex" :style="{width: noFind ? '95%' : '100%'}" v-if="item.tagValueType === '1'">
            <el-input clearable placeholder="请输入" v-model="item.startFiledName" @change="$store.state.isFind = true">
              <i slot="suffix" style="font-style:normal;margin-right: 2px;" v-if="item.ifPercent === '1'">%</i>
            </el-input>
            <span class="db_hx">-</span>
            <el-input clearable placeholder="请输入" v-model="item.endFiledName" @change="$store.state.isFind = true">
              <i slot="suffix" style="font-style:normal;margin-right: 2px;" v-if="item.ifPercent === '1'">%</i>
            </el-input>
          </div>
          <el-select
            class="formItem"
            v-if="item.tagValueType === '2'"
            filterable
            multiple
            v-model="item.list"
            placeholder="请选择"
            clearable
            @change="$store.state.isFind = true"
          >
            <el-option v-for="(res, index) in item.enumerateData" :key="index" :label="res" :value="res"></el-option>
          </el-select>
          <el-date-picker
            :picker-options="pickerOptions"
            v-if="item.tagValueType === '3'"
            v-model="item.dateValue"
            @change="handleChangeDate(index)"
            class="formItem"
            type="daterange"
            format="yyyy-MM-dd"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            clearable
          ></el-date-picker>
          <el-input clearable class="formItem" v-if="item.tagValueType === '4'" v-model="item.value"></el-input>
          <i class="el-icon-close" v-if="item.name" @click="deleteOne(item)" />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
  <el-row type="flex" justify="end">
  <el-form v-if="!noFind">
    <el-col :sm="{span: 20}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}">
      <el-form-item>
        <div class="btnList">
          <el-button @click="find" :loading="loading" >
            <img src="../assets/logo/find.png" /> 查询
          </el-button>
          <el-button @click="startOn">
            <img src="../assets/logo/reSet.png" />重置
          </el-button>
        </div>
      </el-form-item>
    </el-col>
  </el-form>
</el-row>
    <div class="fixed" :style="{left: fixedLeft, height: windowHeight + 'px', zIndex: 9999}">
      <div class="fixedHead">
        选择筛选标签
        <i @click="fixedNone" class="el-icon-close" id="deleteIconTwo"></i>
      </div>
      <div class="aaaa">
      <el-input
        clearable
        class="inputaaa"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <div class="asd"></div>
      <div id="tree" class="tree" :style="{height: windowHeight - 150 + 'px'}" >
        <el-tree
          clearable
          ref="customCondotion"
          class="filter-tree treeOp"
          :data="treeData"
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
  </div>
</template>

<script>
import {
  postGroupOld, findChannel, findOrgByUser
} from '@/api/getApi'
export default {
  name: 'customCondition',
  props: ['salesTagMemberDto', 'findGo', 'loading', 'size', 'noFind', 'updateList'],
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      windowHeight: 0,
      treeData: [],
      fixedLeft: '-300px',
      inputList: [],
      filterText: '',
      channelOption: [],
      mechanismOption: [],
      mechanismResult: [],
      channelResult: '',
      props: {
        multiple: true,
        children: 'child',
        label: 'name',
        value: 'id'
      },
      spanSize: '',
      mechanismResultList: []
    }
  },
  created () {
    this.getData()
    this.windowHeight = document.documentElement.clientHeight - 80
  },
  watch: {
    'salesTagMemberDto' () {
      const inputList = []
      const idList = []
      for (let i = 0; i < this.salesTagMemberDto.length; i++) {
        if (this.salesTagMemberDto[i].filedName === 'sales_channelcode') {
          this.channelResult = this.salesTagMemberDto[i].list
        } else if (this.salesTagMemberDto[i].filedName === 'sales_comcode') { // 机构
          this.mechanismResultList = this.salesTagMemberDto[i].mechanismResultList
        } else {
          idList.push(this.salesTagMemberDto[i].id)
          inputList.push({
            id: this.salesTagMemberDto[i].id,
            name: this.salesTagMemberDto[i].name,
            tagValueType: this.salesTagMemberDto[i].tagValueType,
            filedName: this.salesTagMemberDto[i].filedName,
            startFiledName: this.salesTagMemberDto[i].startFiledName,
            endFiledName: this.salesTagMemberDto[i].endFiledName,
            list: this.salesTagMemberDto[i].list,
            listData: this.salesTagMemberDto[i].listData,
            startDate: this.salesTagMemberDto[i].startDate,
            endDate: this.salesTagMemberDto[i].endDate,
            dateValue: this.salesTagMemberDto[i].dateValue,
            value: this.salesTagMemberDto[i].value,
            enumerateData: this.salesTagMemberDto[i].enumerateData,
            ifPercent: this.salesTagMemberDto[i].ifPercent
          })
        }
      }
      this.inputList = inputList
      this.$refs.customCondotion.setCheckedKeys(idList)
      setTimeout(() => {
        this.handleCheckChange()
      }, 3000)
    },
    filterText (val) {
      this.$refs.customCondotion.filter(val)
    },
    findGo () {
      this.find()
    }
  },
  mounted () {
    const _this = this
    document.addEventListener('click', function (e) {
      if (e.target.className !== 'fixed' && e.target.className !== 'more' && e.target.className !== 'asd' && e.target.className !== 'inputaaa' && e.target.className !== 'aaaa' && e.target.className !== 'fixedHead' && e.target.className !== 'el-input__inner' && e.target.className !== 'tree' && e.target.className !== 'el-tree__empty-block') {
        _this.fixedNone()
      }
    })
    // this.find()
  },
  methods: {
    getData () {
      postGroupOld().then((res) => {
        this.treeData = res.data.data
      })
      findChannel().then(res => {
        this.channelOption = res.data.data
      })
      findOrgByUser().then(res => {
        this.mechanismOption = res.data.data
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheckChange () {
      this.$store.state.isFind = true
      const dataOn = this.$refs.customCondotion.getCheckedNodes()
      const newData = []
      const oldData = this.inputList.slice(0)
      console.log(this.inputList)
      const inputList = []
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].filedName) {
          newData.push({
            id: dataOn[i].id,
            name: dataOn[i].name,
            tagValueType: dataOn[i].tagValueType,
            filedName: dataOn[i].filedName,
            startFiledName: '',
            endFiledName: '',
            list: [],
            listData: [],
            startDate: '',
            endDate: '',
            dateValue: [],
            value: '',
            enumerateData: dataOn[i].enumerateData,
            ifPercent: dataOn[i].ifPercent,
            sortNum: i
          })
        }
      }
      for (let i = 0; i < newData.length; i++) {
        let num = -10
        for (let j = 0; j < oldData.length; j++) {
          if (newData[i].id === oldData[j].id) {
            num = j
          }
        }
        if (num !== -10) { // 有重复的
          inputList.push({
            id: oldData[num].id,
            name: oldData[num].name,
            tagValueType: oldData[num].tagValueType,
            filedName: oldData[num].filedName,
            startFiledName: oldData[num].startFiledName,
            endFiledName: oldData[num].endFiledName,
            list: oldData[num].list,
            listData: oldData[num].listData,
            startDate: oldData[num].startDate,
            endDate: oldData[num].endDate,
            dateValue: oldData[num].dateValue,
            value: oldData[num].value,
            enumerateData: newData[i].enumerateData,
            sortNum: i,
            ifPercent: oldData[num].ifPercent
          })
        } else { // 没有重复的
          inputList.push({
            id: newData[i].id,
            name: newData[i].name,
            tagValueType: newData[i].tagValueType,
            filedName: newData[i].filedName,
            startFiledName: '',
            endFiledName: '',
            list: [],
            listData: [],
            startDate: '',
            endDate: '',
            dateValue: [],
            value: '',
            enumerateData: newData[i].enumerateData,
            sortNum: i,
            ifPercent: newData[i].ifPercent
          })
        }
      }
      function object (a, b) {
        return b.sortNum - a.sortNum
      }
      inputList.sort(object)
      inputList.reverse()
      this.inputList = inputList
      this.$store.state.inputList = inputList
    },
    addInput () {
      this.fixedLeft = '35px'
    },
    fixedNone () {
      this.fixedLeft = '-300px'
    },
    deleteOne (e) {
      this.$store.state.isFind = true
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].name === e.name) {
          this.inputList.splice(i, 1)
        }
      }
      const onArr = []
      for (let i = 0; i < this.inputList.length; i++) {
        onArr.push(this.inputList[i].id)
      }
      this.$refs.customCondotion.setCheckedKeys(onArr)
      this.$store.state.inputList = onArr
    },
    find () {
      this.$store.state.isFind = false
      this.loading = true
      const mechanismResult = []
      const mechanismResultList = this.mechanismResultList.slice(0)
      for (let i = 0; i < this.mechanismResultList.length; i++) {
        if (this.mechanismResultList[i].length === 2) {
          mechanismResult.push(this.mechanismResultList[i][1])
        } else {
          mechanismResult.push(this.mechanismResultList[i][0])
        }
      }
      const inputList = this.inputList.slice(0)
      inputList.push({
        filedName: 'sales_channelcode',
        name: '渠道',
        list: this.channelResult,
        tagValueType: '2'
      }, {
        filedName: 'sales_comcode',
        name: '机构',
        list: mechanismResult,
        tagValueType: '2',
        mechanismResultList
      })
      this.$emit('customConditionResult', inputList)
      this.$emit('loadingGo', this.loading)
    },
    startOn () {
      if (this.updateList) {
        const inputList = []
        const idList = []
        for (let i = 0; i < this.updateList.length; i++) {
          if (this.updateList[i].filedName === 'sales_channelcode') {
            this.channelResult = this.updateList[i].list
          } else if (this.updateList[i].filedName === 'sales_comcode') { // 机构
            this.mechanismResultList = this.updateList[i].mechanismResultList
          } else {
            idList.push(this.updateList[i].id)
            inputList.push({
              id: this.updateList[i].id,
              name: this.updateList[i].name,
              tagValueType: this.updateList[i].tagValueType,
              filedName: this.updateList[i].filedName,
              startFiledName: this.updateList[i].startFiledName,
              endFiledName: this.updateList[i].endFiledName,
              list: this.updateList[i].list,
              listData: this.updateList[i].listData,
              startDate: this.updateList[i].startDate,
              endDate: this.updateList[i].endDate,
              dateValue: this.updateList[i].dateValue,
              value: this.updateList[i].value,
              enumerateData: this.updateList[i].enumerateData
            })
          }
        }
        this.inputList = inputList
        this.$refs.customCondotion.setCheckedKeys(idList)
      } else {
        const inputList = this.inputList.slice(0)
        for (let i = 0; i < this.inputList.length; i++) {
          inputList[i].startFiledName = ''
          inputList[i].endFiledName = ''
          inputList[i].list = []
          inputList[i].listData = []
          inputList[i].startDate = ''
          inputList[i].endDate = ''
          inputList[i].dateValue = []
          inputList[i].value = ''
        }
        this.channelResult = []
        this.mechanismResultList = []
        this.inputList = inputList
      }
    },
    handleChangeDate (index) {
      this.$store.state.isFind = true
      if (this.inputList[index].dateValue) {
        this.inputList[index].startDate = this.inputList[index].dateValue[0]
        this.inputList[index].endDate = this.inputList[index].dateValue[1]
      } else {
        this.inputList[index].startDate = ''
        this.inputList[index].endDate = ''
      }
    },
    mechanidmChange (index) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.customCondition{
  height: 100%;
}
.headTitle{
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0px 22px;
  box-sizing: border-box;
  .flex{
    display: flex;
    height: 48px;
    font-size: 14px;
    color: #33aed3;
    font-weight: bold;
    align-items: center;
    #headLogo{
      width: 14px;
      height: 14px;
      padding: 0px 12px 0px 5px;
    }
  }
  .border{
    // width: calc(100% - 20px);
    background: #d0d0d0;
    margin-bottom: 8px;
    height: 1px;
  }
}
.fixedaaa{
  display: none;
}
.flexBetween{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more{
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 3;
}
.fixed{
  position: fixed;
  top: 50px;
  box-sizing: border-box;
  padding: 10px;
  z-index: 1003;
  background: #E9E9E9;
  transition: all 0.5s;
  width: 300px;
}
.spanFlex{
  display: flex;
}
#tree{
  overflow: auto;
  background: white;
}
.topRow{
  max-height: 200px;
  overflow: auto;
  margin: 0!important;
}
.customCondition .el-select{
  width: 100%;
}
.customCondition .el-cascader{
  width: 100%;
}
.customCondition .el-range-editor.el-input__inner{
  width: 100%;
}
.btnList {
  display: flex;
}
.btnList .el-button{
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 1px 16px;
}
.btnList .el-button span img{
  margin-right: 10px;
  vertical-align: text-bottom;
}
.fixedHead{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.noDelete .el-select{
  width: ceil(100% - 5px);
}
.noDelete .el-cascader{
  width: ceil(100% - 5px);
}
.alignItem{
  align-items: center;
}
.title span{
  font-size: 14px;
}
/deep/ .el-form-item{
  margin-bottom: 8px;
}
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #e7e7e7;
  border-radius: 2px;
}
.asd{
  height: 10px;
}
/deep/ .el-form-item__label{
  line-height: 16px;
}
</style>
