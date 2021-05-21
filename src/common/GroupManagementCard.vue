<template>
  <div class="resultCards" draggable="true" ref='resultCards'>
    <div
      v-for="(item, index) in resultList"
      :key="index"
      class="resultCard"
      :style="{width: item.width == 1 ? '30%' : item.width == 2 ? '63.2%' : '96.5%'}"
    >
      <span class="positionAb" v-if="item.type === false && type !== 'see'" >
        <img v-if="item.width !== 1" @click="handleChangeSize(index, 1)" src="../assets/logo/x1.png" title="一倍宽度" />
        <img v-if="item.width !== 2" @click="handleChangeSize(index, 2)" src="../assets/logo/x2.png" title="二倍宽度" />
        <img v-if="item.width !== 3" @click="handleChangeSize(index, 3)" src="../assets/logo/x3.png" title="三倍宽度" />
      </span>
      <span class="positionAbTwo" v-if="item.type === true || item.type === underfind">
        <img v-if="item.width !== 1" @click="handleChangeSize(index, 1)" src="../assets/logo/x1.png" title="一倍宽度" />
        <img v-if="item.width !== 2" @click="handleChangeSize(index, 2)" src="../assets/logo/x2.png" title="二倍宽度" />
        <img v-if="item.width !== 3" @click="handleChangeSize(index, 3)" src="../assets/logo/x3.png" title="三倍宽度" />
      </span>
        <i class="el-icon-close" @click="deleteMap(index)" v-if="type !== 'see'"></i>
      <el-form label-width="95px" v-if="item.type !== false" style="paddingLeft: 12px;">
        <el-form-item label="主标签：">
          <span :title="item.name" class="nameFirst">{{ item.name | ellipsisSmall }}</span>
          <span class="cursor" @click="handleGrouping(item, index, 'first')" v-if="item.valueType === '1'" style='color:blue; text-decoration:underline;' >分组设置</span>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="item.title" :disabled='type === "see"' />
        </el-form-item>
        <div style="margin: 0 0 24px 0px;">
          <span>
            <el-checkbox class="secondName" v-model="item.flag" true-label="1" false-label="0" @change="item.picType = ''"><span>组合标签:</span></el-checkbox>
          </span>
          <span v-if="!item.secondTagName" @click="addCombination(index, item)" :style="{color: item.flag === '1' ? 'blue' : 'black'}" style="color:blue;textDecoration: underline;cursor: pointer;paddingLeft: 50px;">选择标签</span>
          <span :title="item.secondTagName" style='paddingLeft: 25px'>{{ item.secondTagName | ellipsisSmall }}</span>
          <span
            @click="addCombination(index, item)"
            style="paddingRight: 20px;textDecoration: underline;cursor: pointer;paddingLeft: 22px;"
            :style="{color: item.flag === '1' ? 'blue' : 'black'}"
            v-if="item.secondTagName">重选标签</span>
          <span
            v-if="item.secondValueType === '1'"
            :style="{color: item.flag === '1' ? 'blue' : 'black'}"
            style="color:blue;textDecoration: underline;cursor: pointer"
            @click="handleGrouping(item, index, 'second')">分组设置</span>
        </div>
        <el-form-item label="图形：">
          <el-select v-model="item.picType" :disabled='type === "see"' v-if="item.flag!=='1'">
            <el-option
              v-for="(item, index) in optionChart"
              :value="item.value"
              :label="item.label"
              :key="index"
            />
          </el-select>
          <el-select v-model="item.picType" :disabled='type === "see"' v-if="item.flag==='1'">
            <el-option
              v-for="(item, index) in optionChartSecond"
              :value="item.value"
              :label="item.label"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <!-- <div class="noneBut">
          <el-form-item label="标签分组：" style=''>
          </el-form-item>
        </div> -->
        <el-button class="buttonSure" @click="hadnleSubmitSelf(item, index)">确定</el-button>
      </el-form>
      <div v-if="item.type === false" class="resultCard_s">
        <div class="res_top"><span style='fontSize: 14px; marginLeft: 10px;'>{{item.title}}</span></div>
        <span>
          <i class="el-icon-edit" @click="toWrite(item, index)" v-if="type !== 'see'"></i>
        </span>
        <div style="margin: auto">
          <newZ v-if="item.picType === '1'" :params="item.params" :item='item' :offsetWidth='offsetWidth' />
          <newT v-if="item.picType === '2'" :params="item.params" :item='item' :offsetWidth='offsetWidth' />
          <newB v-if="item.picType === '3'" :params="item.params" :item='item' :offsetWidth='offsetWidth' />
          <newH v-if="item.picType === '4'" :params="item.params" :item='item' :offsetWidth='offsetWidth' />
          <newLine v-if="item.picType === '5'" :params="item.params" :item='item' :offsetWidth='offsetWidth' />
        </div>
      </div>
    </div>
    <div class="none"></div>
    <el-dialog
      class="dialogAqua dialogAquaa"
      title="分组"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="900px"
      @close="delTemplate"
    >
      <div class="submitMessage"></div>
      <div class="top_body">
        <div class="bq_name" style="marginRight: 40px">
          标签名称： {{ groupingDetail.name }}
        </div>
        <div class="groupRight">
          <div @click="handleAddGroup" class="cursor add_group_add mr">
          <div class="Aqua_addlogo cursor"></div>
            添加组别</div>
            <p>分组模板：</p>
          <el-select v-model="groupingDetail.templateName" @change="handleChangeTemlateMap">
            <el-option v-for="(item, index) in templateNameOptionMap" :key='index' :label='item.templateName' :value='item.templateName' />
          </el-select>
        <div class="newTemplate" @click="handleAddTagGroupTemplateMap">另存为新模板</div>
        </div>
      </div>
      <el-form label-width="80px" class="fzClass">
        <el-form-item
          v-for="(item, index) in groupingDetail.groupSwarmsList"
          :key="index"
          :label="'组别' + (index + 1) + '：'"
        >
          <div class="alignItem selectDad">
            <el-input v-model="item.groupName" />
            <div style="width: 40px;"></div>
            <el-input v-model="item.startValue" />
            <el-select v-model="item.leftOperator">
              <el-option label="<" value="<"></el-option>
              <el-option label="<=" value="<="></el-option>
              <el-option label="=" value="="></el-option>
              <el-option label=">=" value=">="></el-option>
              <el-option label=">" value=">"></el-option>
            </el-select>
            <p style="fontSize: 14px;" > 值 </p>
            <el-select v-model="item.rightOperator">
              <el-option label="<" value="<"></el-option>
              <el-option label="<=" value="<="></el-option>
              <el-option label="=" value="="></el-option>
              <el-option label=">=" value=">="></el-option>
              <el-option label=">" value=">"></el-option>
            </el-select>
            <el-input v-model="item.endValue" />
            <span
              class="group_close cursor"
              @click="delDetail(index)"
              >×</span
            >
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDetailSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      class="dialogAqua dialogAquaa"
      title="次级分组"
      :close-on-click-modal="false"
      :visible.sync="dialogVisibleSecond"
      width="900px"
      @close="delTemplate"
    >
      <div class="submitMessage"></div>
      <div class="top_body">
        <div class="bq_name" style="marginRight: 40px">
          标签名称： {{ groupingDetail.secondTagName }}
        </div>
        <div class="groupRight">
          <div @click="handleAddGroup('second')" class="cursor add_group_add mr">
          <div class="Aqua_addlogo cursor"></div>
            添加组别</div>
            <p>分组模板：</p>
          <el-select v-model="groupingDetail.templateNameSecond" @change="(e) => handleChangeTemlateMap(e, 'second')">
            <el-option v-for="(item, index) in templateNameOptionMapSecond" :key='index' :label='item.templateName' :value='item.templateName' />
          </el-select>
        <div class="newTemplate" @click="handleAddTagGroupTemplateMap('second')">另存为新模板</div>
        </div>
      </div>
      <el-form label-width="80px" class="fzClass">
        <el-form-item
          v-for="(item, index) in groupingDetail.secondGroupSwarmsList"
          :key="index"
          :label="'组别' + (index + 1) + '：'"
        >
          <div class="alignItem selectDad">
            <el-input v-model="item.groupName" />
            <div style="width: 40px;"></div>
            <el-input v-model="item.startValue" />
            <el-select v-model="item.leftOperator">
              <el-option label="<" value="<"></el-option>
              <el-option label="<=" value="<="></el-option>
              <el-option label="=" value="="></el-option>
              <el-option label=">=" value=">="></el-option>
              <el-option label=">" value=">"></el-option>
            </el-select>
            <p style="fontSize: 14px;" > 值 </p>
            <el-select v-model="item.rightOperator">
              <el-option label="<" value="<"></el-option>
              <el-option label="<=" value="<="></el-option>
              <el-option label="=" value="="></el-option>
              <el-option label=">=" value=">="></el-option>
              <el-option label=">" value=">"></el-option>
            </el-select>
            <el-input v-model="item.endValue" />
            <span
              class="group_close cursor"
              @click="delDetail(index)"
              >×</span
            >
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDetailSure('second')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title='输入分组名称'
      class="dialogEnter"
      :close-on-click-modal="false"
      :visible.sync="templateNameVisible"
      width="700px"
      @close="delTemplate"
    >
      <div class="submitMessage"></div>
      <el-form>
        <el-form-item label="分组名称">
          <el-input v-model="addTemplateName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btns">
        <el-button @click="addTemplate">确定</el-button>
        <el-button @click="delTemplate">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGroupTemplates, addTagGroupTemplate } from '@/api/nameList'
import { checkAddGroup } from '@/api/getApi'
import newZ from '../components/charts/newZ'
import newH from '../components/charts/newH'
import newT from '../components/charts/newT'
import newB from '../components/charts/newB'
import newLine from '../components/charts/newLine'

export default {
  name: 'groupManagementCard',
  props: ['resultList', 'type'],
  components: {
    newZ,
    newH,
    newT,
    newB,
    newLine
  },
  data () {
    return {
      change: false,
      optionChart: [
        {
          label: '柱状图',
          value: '1'
        },
        {
          label: '条形图',
          value: '2'
        },
        {
          label: '饼图',
          value: '3'
        },
        {
          label: '环状图',
          value: '4'
        }
      ],
      optionChartSecond: [
        {
          label: '柱状图',
          value: '1'
        },
        {
          label: '条形图',
          value: '2'
        },
        {
          label: '折线图',
          value: '5'
        }
      ],
      templateNameOptionMap: [],
      dialogVisible: false,
      dialogVisibleSecond: false,
      groupingDetail: '',
      offsetWidth: 0,
      templateNameVisible: false,
      addTemplateName: '',
      num: '',
      templateNameOptionMapSecond: []
    }
  },
  created () {
    console.log(this.resultList)
    setTimeout(() => {
      this.offsetWidth = this.$refs.resultCards.offsetWidth
    }, 10)
    window.onresize = () => {
      this.offsetWidth = this.$refs.resultCards.offsetWidth
    }
  },
  methods: {
    addTemplate () {
      console.log(this.groupingDetail)
      console.log(this.num)
      if (this.num === 'first') {
        const params = {
          groupSwarmsList: this.groupingDetail.groupSwarmsList,
          tagId: this.groupingDetail.id,
          tagName: this.groupingDetail.name,
          templateName: this.addTemplateName
        }
        addTagGroupTemplate(params).then((res) => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.templateNameVisible = false
            getGroupTemplates({ tagId: params.tagId }).then((res) => {
              this.templateNameOptionMap = res.data.data
            })
            this.groupingDetail.templateName = this.addTemplateName
            this.addTemplateName = ''
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        const params = {
          groupSwarmsList: this.groupingDetail.secondGroupSwarmsList,
          tagId: this.groupingDetail.secondTagId,
          tagName: this.groupingDetail.secondTagName,
          templateName: this.addTemplateName
        }
        addTagGroupTemplate(params).then((res) => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.templateNameVisible = false
            getGroupTemplates({ tagId: params.tagId }).then((res) => {
              this.templateNameOptionMapSecond = res.data.data
            })
            this.groupingDetail.templateNameSecond = this.addTemplateName
            this.addTemplateName = ''
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    delTemplate () {
      this.addTemplateName = ''
      this.templateNameVisible = false
    },
    delDetail (index) {
      if (this.num === 'first') {
        const resultList = this.resultList.slice(0)
        const newArr = JSON.parse(JSON.stringify(this.groupingDetail))
        newArr.groupSwarmsList.splice(index, 1)
        this.groupingDetail = newArr
        // resultList[this.indexNow].groupSwarmsList.splice(index, 1)
        // this.resultList = resultList
      } else {
        const resultList = this.resultList.slice(0)
        const newArr = JSON.parse(JSON.stringify(this.groupingDetail))
        newArr.secondGroupSwarmsList.splice(index, 1)
        this.groupingDetail = newArr
        resultList[this.indexNow].secondGroupSwarmsList.splice(index, 1)
        this.resultList = resultList
      }
    },
    deleteMap (e) {
      this.$emit('deleteMap', e)
    },
    hadnleSubmitSelf (item, index) {
      this.$emit('hadnleSubmitSelf', item, index)
    },
    addCombination (index, item) {
      if (item.flag !== '1') {
        return
      }
      this.$emit('addCombination', index)
    },
    handleGrouping (item, index, num) {
      if (num === 'first') {
        this.num = 'first'
        this.indexNow = index
        this.groupingDetail = item
        this.tagIdMap = item.id
        this.dialogVisible = true
        getGroupTemplates({ tagId: this.tagIdMap }).then((res) => {
          this.templateNameOptionMap = res.data.data
        })
      } else {
        if (item.flag === '0') {
          return
        }
        console.log('2')
        this.num = 'second'
        this.indexNow = index
        this.groupingDetail = item
        this.tagIdMap = item.secondTagId
        this.dialogVisibleSecond = true
        getGroupTemplates({ tagId: item.secondTagId }).then((res) => {
          this.templateNameOptionMapSecond = res.data.data
        })
      }
    },
    handleAddGroup (num) {
      if (num !== 'second') {
        this.groupingDetail.groupSwarmsList.push({
          groupName: '',
          startValue: '',
          leftOperator: '<',
          rightOperator: '<=',
          endValue: ''
        })
      } else {
        this.groupingDetail.secondGroupSwarmsList.push({
          groupName: '',
          startValue: '',
          leftOperator: '<',
          rightOperator: '<=',
          endValue: ''
        })
      }
    },
    handleChangeTemlateMap (e, num) {
      if (num !== 'second') {
        for (let i = 0; i < this.templateNameOptionMap.length; i++) {
          if (e === this.templateNameOptionMap[i].templateName) {
            this.groupingDetail.groupSwarmsList = this.templateNameOptionMap[i].groupSwarmsList.slice(0)
          }
        }
      } else {
        for (let i = 0; i < this.templateNameOptionMapSecond.length; i++) {
          if (e === this.templateNameOptionMapSecond[i].templateName) {
            this.groupingDetail.secondGroupSwarmsList = this.templateNameOptionMapSecond[i].groupSwarmsList.slice(0)
          }
        }
      }
    },
    addDetailSure (num) {
      if (num !== 'second') {
        const paramsList = []
        for (let i = 0; i < this.groupingDetail.groupSwarmsList.length; i++) {
          paramsList.push({
            startValue: this.groupingDetail.groupSwarmsList[i].startValue,
            endValue: this.groupingDetail.groupSwarmsList[i].endValue,
            groupName: this.groupingDetail.groupSwarmsList[i].groupName,
            leftOperator: this.groupingDetail.groupSwarmsList[i].leftOperator,
            rightOperator: this.groupingDetail.groupSwarmsList[i].rightOperator
          })
          if (isNaN(this.groupingDetail.groupSwarmsList[i].endValue)) {
            this.$message.warning(`${i + 1}分组结束值不是数字`)
            return
          }
          if (isNaN(this.groupingDetail.groupSwarmsList[i].startValue)) {
            this.$message.warning(`${i + 1}分组开始值不是数字`)
            return
          }
          if (this.groupingDetail.groupSwarmsList[i].groupName === '') {
            this.$message.warning('未设置分组名')
            return
          }
          if (this.groupingDetail.groupSwarmsList[i].startValue === '' && this.groupingDetail.groupSwarmsList[i].endValue === '') {
            this.$message.warning('至少设置一个值')
            return
          }
        }
        checkAddGroup(paramsList).then((res) => {
          if (res.data.code !== 0) {
            this.$message.warning(res.data.msg)
          } else {
            this.dialogVisible = false
            this.resultList[this.indexNow] = this.groupingDetail
          }
        })
      } else {
        const paramsList = []
        for (let i = 0; i < this.groupingDetail.secondGroupSwarmsList.length; i++) {
          paramsList.push({
            startValue: this.groupingDetail.secondGroupSwarmsList[i].startValue,
            endValue: this.groupingDetail.secondGroupSwarmsList[i].endValue,
            groupName: this.groupingDetail.secondGroupSwarmsList[i].groupName,
            leftOperator: this.groupingDetail.secondGroupSwarmsList[i].leftOperator,
            rightOperator: this.groupingDetail.secondGroupSwarmsList[i].rightOperator
          })
          if (isNaN(this.groupingDetail.secondGroupSwarmsList[i].endValue)) {
            this.$message.warning(`${i + 1}分组结束值不是数字`)
            return
          }
          if (isNaN(this.groupingDetail.secondGroupSwarmsList[i].startValue)) {
            this.$message.warning(`${i + 1}分组开始值不是数字`)
            return
          }
          if (this.groupingDetail.secondGroupSwarmsList[i].groupName === '') {
            this.$message.warning('未设置分组名')
            return
          }
          if (this.groupingDetail.secondGroupSwarmsList[i].startValue === '' && this.groupingDetail.secondGroupSwarmsList[i].endValue === '') {
            this.$message.warning('至少设置一个值')
            return
          }
        }
        checkAddGroup(paramsList).then((res) => {
          if (res.data.code !== 0) {
            this.$message.warning(res.data.msg)
          } else {
            this.dialogVisibleSecond = false
            this.resultList[this.indexNow] = this.groupingDetail
          }
        })
      }
    },
    handleAddTagGroupTemplateMap (num) {
      if (num !== 'second') {
        if (this.groupingDetail.groupSwarmsList.length === 0) {
          this.$message.warning('至少添加一个分组')
          return
        }
        for (let i = 0; i < this.groupingDetail.groupSwarmsList.length; i++) {
          if (isNaN(this.groupingDetail.groupSwarmsList[i].endValue)) {
            this.$message.warning(`${i + 1}分组结束值不是数字`)
            return
          }
          if (isNaN(this.groupingDetail.groupSwarmsList[i].startValue)) {
            this.$message.warning(`${i + 1}分组开始值不是数字`)
            return
          }
          if (this.groupingDetail.groupSwarmsList[i].groupName === '') {
            this.$message.warning('未设置分组名')
            return
          }
          if (this.groupingDetail.groupSwarmsList[i].startValue === '' && this.groupingDetail.groupSwarmsList[i].endValue === '') {
            this.$message.warning('至少设置一个值')
            return
          }
        }
        const paramsList = []
        for (let i = 0; i < this.groupingDetail.groupSwarmsList.length; i++) {
          paramsList.push({
            startValue: this.groupingDetail.groupSwarmsList[i].startValue,
            endValue: this.groupingDetail.groupSwarmsList[i].endValue,
            groupName: this.groupingDetail.groupSwarmsList[i].groupName,
            leftOperator: this.groupingDetail.groupSwarmsList[i].leftOperator,
            rightOperator: this.groupingDetail.groupSwarmsList[i].rightOperator
          })
        }
        checkAddGroup(paramsList).then((res) => {
          if (res.data.code !== 0) {
            this.$message.warning(res.data.msg)
          } else {
            this.templateNameVisible = true
            this.addType = 'map'
          }
        })
      } else {
        if (this.groupingDetail.secondGroupSwarmsList.length === 0) {
          this.$message.warning('至少添加一个分组')
          return
        }
        for (let i = 0; i < this.groupingDetail.secondGroupSwarmsList.length; i++) {
          if (isNaN(this.groupingDetail.secondGroupSwarmsList[i].endValue)) {
            this.$message.warning(`${i + 1}分组结束值不是数字`)
            return
          }
          if (isNaN(this.groupingDetail.secondGroupSwarmsList[i].startValue)) {
            this.$message.warning(`${i + 1}分组开始值不是数字`)
            return
          }
          if (this.groupingDetail.secondGroupSwarmsList[i].groupName === '') {
            this.$message.warning('未设置分组名')
            return
          }
          if (this.groupingDetail.secondGroupSwarmsList[i].startValue === '' && this.groupingDetail.secondGroupSwarmsList[i].endValue === '') {
            this.$message.warning('至少设置一个值')
            return
          }
        }
        const paramsList = []
        for (let i = 0; i < this.groupingDetail.secondGroupSwarmsList.length; i++) {
          paramsList.push({
            startValue: this.groupingDetail.secondGroupSwarmsList[i].startValue,
            endValue: this.groupingDetail.secondGroupSwarmsList[i].endValue,
            groupName: this.groupingDetail.secondGroupSwarmsList[i].groupName,
            leftOperator: this.groupingDetail.secondGroupSwarmsList[i].leftOperator,
            rightOperator: this.groupingDetail.secondGroupSwarmsList[i].rightOperator
          })
        }
        checkAddGroup(paramsList).then((res) => {
          if (res.data.code !== 0) {
            this.$message.warning(res.data.msg)
          } else {
            this.templateNameVisible = true
            this.addType = 'map'
          }
        })
      }
    },
    handleChangeSize (index, e) {
      this.resultList[index].width = e
    },
    toWrite (e, index) {
      const arr = this.resultList.slice(0)
      arr[index].type = true
      this.resultList = arr
    }
  }
}
</script>

<style scoped lang="less">
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
.dialogAquaa /deep/ .el-select {
  width: 35%;
}
.resultCards .resultCard{
  position: relative;
}
.resultCards .resultCard .el-icon-close {
  cursor: pointer;
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
  height: 283px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  float: left;
  margin: 10px 1.56%;
  display: flex;
}
/deep/ .resultCard .el-button{
  position: absolute;
  bottom: 8px;
  right: 10px;
}
.resultCard_s {
  width: 100%;
  font-size: 20px;
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
  cursor: pointer;
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
  background: url("../assets/indexImg/资源 98.png");
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
  height:240px;
}
/deep/ .dialogAqua .el-dialog__body .top_body {
  display: flex;
  margin: 15px 0 20px 20px;
  position: relative;
  align-items: center;
  justify-content: space-between;
}
/deep/ .dialogAqua .el-dialog__body .top_body {
  display: flex;
  margin: 15px 0 20px 20px;
  position: relative;
  align-items: center;
  justify-content: space-between;
}
.groupRight{
  display: flex;
  align-items: center;
}
.groupRight p{
  color: #000;
  margin-right: 10px;
}
.Aqua_addlogo {
  margin-right: 8px;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  background: url("../assets/indexImg/添加.png") no-repeat;
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
  background: url("../assets/indexImg/资源 98.png");
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
  // width:678px;
  height:240px;
}
/deep/ .dialogAqua .el-dialog__footer {
  text-align: center;
  margin-left: 60px;
}
/deep/ .dialogAqua .el-dialog__footer .el-button[data-v-4164c939] {
  margin-right: 30px;
}
.newTemplate{
  margin-right: 25px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
.mr{
  margin-right: 30px;
}
.add_group_add{
  display: flex;
  justify-content: center;
}
.positionAb{
  width: 30px;
  display: flex;
  position: absolute;
  right: 95px;
  top: 8px;
  z-index: 99;
}
.positionAb img {
  width: 20px;
  height: 20px;
  padding: 0 5px;
  z-index: 99;
  cursor: pointer;
}
.positionAbTwo{
  width: 30px;
  display: flex;
  position: absolute;
  right: 60px;
  z-index: 99;
  top: 8px;
}
.positionAbTwo img {
  width: 20px;
  height: 20px;
  padding: 0 5px;
  z-index: 99;
  cursor: pointer;
}
.nameFirst{
  padding-right: 20px;
  padding-left: 3px;
}
.findName{
  color: blue;
  padding-right: 20px;
  text-decoration: underline;
  cursor: pointer;
}
.fzClass /deep/ .el-select>.el-input{
  width: 66px;
}
.fzClass /deep/ .el-select{
  // width: 60%;
  margin: 0 10px;
}
/deep/ .el-checkbox__label{
  padding-left: 3px;
}
.buttonSure{
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 1px 16px;
  justify-content: center;
}
</style>
