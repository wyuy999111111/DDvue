<template>
  <div class="all">
    <!-- <div class="top">
      <headTitle params="搜索条件" />
      <el-row :gutter="24" class="topRow flexBetween" >
        <el-col :span='12'>
          <div class="flex"><div class="label">标签名称：</div> <el-input placeholder="请选择标签名称" v-model="input1"> </el-input></div>
        </el-col>
        <el-col :span='12' class="operation">
          <el-button>重置</el-button>
          <el-button>查询</el-button>
        </el-col>
      </el-row>
    </div> -->
    <div class="top">
      <headTitle params="分类列表" />
      <div class="titles">
        <div class="titleText titleTextOne">一级</div>
        <div class="titleText titleTextTwo">二级</div>
        <!-- <div class="titleText titleTextThree"></div> -->
      </div>
      <div class="goCopy" :style="{height: goHeight}">
        <div class="goCopyMap" v-for="(copyMap, index) in refHeightArr" :key="index" :style="{height: copyMap.height - 2 + 'px'}">
          <div class="structureOne" :style="{height: copyMap.heightOne + 'px'}"></div>
        </div>
      </div>
      <div class="go" ref='go' :style="{top: '-' + goHeight}">
        <div class="border" v-for="(item, index) in newData" :key="item.id" ref='a'>
          <div class="levelOne flexs">
            <div class="value valueOne">
              <div class="valueText right" >
                <el-input v-model="item.name" @blur="onSubmit"/>
                <img v-if="item.show === 'block'" class="newBtn" src="../../assets/zk.png" @click="handleOne(index)" />
                <img v-if="item.show === 'none'" class="newBtn" src="../../assets/sh.png" @click="handleShowOne(index)" />

                <!-- <i v-if="item.show === 'block'" class='el-icon-remove' @click="handleOne(index)" />
                <i v-if="item.show === 'none'" class='el-icon-circle-plus' @click="handleShowOne(index)" />
              -->
                <i v-if="item.delete !== 1" class="el-icon-close onDelete finBtnqwe" @click="onDelete(index)" />
                <i v-if="item.delete === 1" class="el-icon-close nondIcon" />
              </div>
              <img src="../../assets/finChild.png" class="finBtn addBtn" @click="adda(index)" />
              <!-- <i class="el-icon-plus right addBtn"  @click="adda(index)" /> -->
            </div>
            <div class="contentRi" :style="{display: item.show}">
              <div class="levelTwo flexs" v-for="(res, resIndex) in item.child" :key="res.class">
                <div class="value valueTwo">
                  <div class="line"></div>
                  <div class="valueText secText">
                    <el-input v-model="res.name" @blur="onSubmit" />
                    <i v-if="res.delete !== 1" class="el-icon-close onDeleteSec" @click="onDeleteTwo(index, resIndex)" />
                    <i v-if="res.delete === 1" class="el-icon-close nondIcon" @click="onDeleteTwo(index, resIndex)" />
                  <!-- <i v-if="res.show === 'block'" class='el-icon-remove' @click="handleTwo(index, resIndex)" /> -->
                  <!-- <i v-if="res.show === 'none'" class='el-icon-circle-plus' @click="handleShowTwo(index, resIndex)" /> -->
                </div>
                  <!-- <i class="el-icon-plus" @click='addb(index, resIndex)' /> -->
                  <div class="lineB" :style="{ height: res.child.length * 30 - 30 + 'px' && res.show === 'block' ? res.child.length * 30 - 30 + 'px' : 0 + 'px'}"></div>
                </div>
                <div class="contentRic" :style="{display: res.show}">
                  <div class="levelThree" v-for="thr in res.child" :key="thr.id">
                    <div class="value valueThree">
                      <!-- <div class="line"></div>
                      <div class="valueText">{{thr.name}}</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <el-button class="addBtnTitle" @click='addTitle'>新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import headTitle from '../../common/HeadTitle'
import { findByTagClassName, deleteByTagClassId, addByTagClassId } from '../../api/getApi'
export default {
  name: 'asd',
  components: {
    headTitle
  },
  data () {
    return {
      obj: {
        id: 2,
        name: '123'
      },
      input1: '',
      goHeight: '',
      goHeightTop: '',
      refHeightArr: [],
      newData: [{
        id: 1,
        value: '基本信息',
        show: 'block',
        child: [{
          id: 11,
          value: '个人信息',
          show: 'block',
          child: [{
            id: 111,
            value: '考勤',
            show: 'block'
          }, {
            id: 112,
            value: '考勤2',
            show: 'block'
          }]
        }]
      }]
    }
  },
  mounted () {
    this.getData()
    this.handleChange()
  },
  methods: {
    getData () {
      findByTagClassName().then((res) => {
        this.newData = res.data.data
        this.handleChange()
      })
    },
    handleOne (e) {
      this.newData[e].show = 'none'
      this.handleChange()
    },
    handleShowOne (e) {
      this.newData[e].show = 'block'
      this.handleChange()
    },
    handleTwo (a, b) {
      this.newData[a].child[b].show = 'none'
      this.handleChange()
    },
    handleShowTwo (a, b) {
      this.newData[a].child[b].show = 'block'
      this.handleChange()
    },
    addTitle () {
      this.newData.push({ parendId: 0, value: '', show: 'block', child: [], add: 1 })
      this.handleChange()
    },
    onDelete (e) {
      this.newData[e].delete = 2
      deleteByTagClassId(this.newData).then((res) => {
        if (res.data.code === 0) {
          this.getData()
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onDeleteTwo (index, resIndex) {
      this.newData[index].child[resIndex].delete = 2
      deleteByTagClassId(this.newData).then((res) => {
        if (res.data.code === 0) {
          this.getData()
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSubmit () {
      for (let i = 0; i < this.newData.length; i++) {
        if (!this.newData[i].name) {
          this.$message.error('标签名为空')
          return
        }
        for (let j = 0; j < this.newData[i].child.length; j++) {
          if (!this.newData[i].child[j].name) {
            this.$message.error('标签名为空')
            return
          }
        }
      }
      addByTagClassId(this.newData).then((res) => {
        if (res.data.code === 0) {
          this.getData()
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    adda (e) {
      this.newData[e].child.push({ value: '', show: 'block', child: [], parentId: this.newData[e].id, add: 1, name: '' })
      this.handleChange()
    },
    addb (a, b) {
      this.newData[a].child[b].child.push({ id: a * 10 + b, value: 'da', show: 'block', child: [], name: '' })
      this.handleChange()
    },
    handleChange () {
      const refHeightArr = []
      setTimeout(() => {
        this.goHeight = this.$refs.go.offsetHeight + 'px'
        for (let i = 0; i < this.newData.length; i++) {
          let heightOne
          if (this.newData[i].child.length === 1) {
            heightOne = 0
          } else {
            let abc
            if (this.newData[i].child[this.newData[i].child.length - 1]) {
              abc = this.newData[i].child[this.newData[i].child.length - 1].child.length * 30 - 30
            } else {
              abc = 0
            }
            heightOne = this.$refs.a[i].offsetHeight - 50
            if (abc <= 0) {
            } else {
              heightOne = heightOne - abc
            }
            if (heightOne < 0) {
              heightOne = 0
            }
          }
          refHeightArr.push({ height: this.$refs.a[i].offsetHeight, heightOne })
        }
        this.refHeightArr = refHeightArr
      }, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newBtn{
  width: 20px;
  height: 20px;
  position: relative;
  top: 10px;
  left: -10px;
}
.finBtn{
  width: 20px;
  height: 20px;
  position: relative;
  top: 10px;
  left: 10px;
}
.titleText {
  width: 150px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  background: #F6F7FC;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DCDFE6;
}
.titleTextOne{
  margin-left: 87px;
  width: 167px;
  /* position: relative; */
  /* left: -35px; */
  /* width: 165px; */
}
.titleTextThree{
  border: 0;
  background: white;
}
.titleTextTwo{
  width: 167px;
  margin-left: 353px;
  /* position: relative; */
  /* left: -15px; */
  /* width: 145px; */
}
.secText{
  display: flex;
  align-items: center;
}
.onDeleteSec{
  position: relative;
  left: -30px;
}
.onDelete{
  position: relative !important;
  left: -50px !important;
}
.nondIcon{
  color: transparent;
}
.addBtn{
  font-size: 40px;
  position: relative;
  left: 100px;
}

.right{
  display: flex;
}
.addBtnTitle{
  width: 168px;
  margin-left: 90px;
}
.add
.right i {
  position: relative;
  top: 12px;
  left: -10px;
}
.line{
  height: 2px;
  width: 210px;
  background: #ECECEC;
  margin-top: 20px;
}
.lineB{
  margin-top: 20px;
  /* border-top: 1px solid blue; */
  /* border-right: 1px solid blue; */
  width: 235px;
  position: relative;
  top: -10px;
}
.structureOne{
    border-top: 2px solid #ECECEC;
    border-right: 2px solid #ECECEC;
    width: 222px;
    margin-top: 20px;
    margin-left: 174px;
    margin-bottom: 10px;
}
.goCopyMap{
  border: 1px solid transparent;
}
.go{
  position: relative;
  width: 800px;
  /* border: 1px solid black; */
}
.goCopy{
  border: 1px solid transparent;
  width: 800px;
}
.titles{
  display: flex;
  position: relative;
  top: -10px;
  /* justify-content: space-around; */
  margin-top: 20px;
}
.value{
  text-align: center;
  /* width: 100px; */
}
.valueText{
  width: 200px;
}
.levelTwo{
  margin-bottom: 10px;
}
.valueOne{
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  /* align-items: center; */
}
.contentRi{
  width: 50%;
}
.contentRic{
  width: 50%;
}
.valueTwo{
  /* width: 50%; */
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */

}
.valueThree{
  width: 100%;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}
.flexs{
  /* justify-content: space-between; */
  display: flex;
}
.all{
  margin: auto;
  width: 98%;
  box-sizing: border-box;
}
.top{
  border-radius: 5px;
  background: white;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
}
.flex{
  width: 80%;
  display: flex;
  align-items: center;
  margin: 5px auto;
}
.label{
  width: 120px;
  font-size: 15px;
}
.operation{
  width: 30%;
  text-align: right;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.el-button{
  /* width: 90px; */
  height: 30px;
  line-height: 1px;
}
.el-input{
  width: 166px;
}
.finBtnqwe{
  position: relative;
  top: 10px;
}
</style>
