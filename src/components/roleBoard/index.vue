<template>
  <div class="index">
    <div class="header">
      <img src="../../assets/logo/title.png" />角色看板
    </div>
    <div id="condition">
      <el-row>
        <el-form label-width="120px" class="conditionList">
          <el-col :span="6" v-if="orglOption[0].level === '2'"><el-form-item label="分公司：">
            <el-select class="formItem" clearable v-model="$store.state.role.orglResult" placeholder="请选择机构" filterable>
              <el-option
                clearable
                v-for="(res, index) in orglOption"
                :key="index"
                :label="res.name"
                :value="res.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"  v-if="orglOption[0].level === '3'"><el-form-item label="中支公司：">
            <el-select class="formItem" clearable v-model="$store.state.role.orglResult" placeholder="请选择机构" filterable>
              <el-option
                clearable
                v-for="(res, index) in orglOption"
                :key="index"
                :label="res.name"
                :value="res.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"  v-if="this.orglOption[0].level === '4'" ><el-form-item label="团队：">
            <el-select class="formItem" clearable v-model="$store.state.role.orglResult" placeholder="请选择机构" filterable>
              <el-option
                clearable
                v-for="(res, index) in orglOption"
                :key="index"
                :label="res.name"
                :value="res.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"><el-form-item label="渠道：">
            <el-select class="formItem" @change="handleChangeSalesChannelCode" clearable v-model="$store.state.role.channelResult" placeholder="请选择渠道" filterable>
              <el-option
              :clearable="clearable"
              v-for="(res, index) in channelOption"
              :key="index"
              :label="res.sales_channename"
              :value="res.sales_channelcode">
              </el-option>
            </el-select>
          </el-form-item></el-col>
          <el-col :span="6"><el-form-item label="月份：">
            <el-date-picker
              v-model="$store.state.role.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择月"
              :clearable="false">
            </el-date-picker>
          </el-form-item></el-col>
          <el-col :span="6">
            <el-form-item>
              <div class="btnList">
                <el-button @click='handleFind' ><img src="../../assets/logo/find.png" />查询</el-button>
                <el-button @click='handleReset'><img src="../../assets/logo/reSet.png" />重置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="roleBoardTabs">
      <div :class="cut === 'overView' ? 'tabBtnOn' : 'tabBtn'" @click="handleCut('overView')">总览</div>
      <div :class="cut === 'personnelInformation' ? 'tabBtnOn' : 'tabBtn'" @click="handleCut('personnelInformation')">人员信息</div>
      <div :class="cut === 'teamAssessment' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('teamAssessment')">团队考核</div>
      <div :class="cut === 'busineddStructure' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('busineddStructure')">业务结构</div>
      <div :class="cut === 'operate' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('operate')">客户运营</div>
      <div :class="cut === 'renewal' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('renewal')">续保情况</div>
      <div :class="cut === 'quotation' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('quotation')">报价情况</div>
      <div :class="cut === 'behavioral' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('behavioral')">行为信息</div>
      <div :class="cut === 'special111' ? 'tabBtnOn' : 'tabBtn'"  @click="handleCut('special111')">111专项</div>
    </div>
    <div id="content">
      <OverView v-if="cut === 'overView'" :overViewStatus='overViewStatus' />
      <PersonnelInformation v-if="cut === 'personnelInformation'" />
      <TeamAssessment v-if="cut === 'teamAssessment'" />
      <BusineddStructure v-if="cut === 'busineddStructure'" />
      <Operate v-if="cut === 'operate'" />
      <Renewal v-if="cut === 'renewal'" />
      <Quotation v-if="cut === 'quotation'" />
      <Behavioral v-if="cut === 'behavioral'" />
       <special111 v-if="cut === 'special111'" />
    </div>
  </div>
</template>
<script>
import special111 from './special111'
import OverView from './orverView'
import PersonnelInformation from './personnelInformation'
import TeamAssessment from './teamAssessment'
import BusineddStructure from './busineddStructure'
import Operate from './operate'
import Renewal from './renewal'
import Quotation from './quotation'
import Behavioral from './behavioral'
import { findChannelList, findOrglList } from '../../api/getApi'

export default {
  name: 'index',
  components: {
    OverView,
    PersonnelInformation,
    TeamAssessment,
    BusineddStructure,
    Operate,
    Renewal,
    Quotation,
    Behavioral,
    special111
  },
  data () {
    return {
      cut: 'overView',
      channelOption: [],
      channelResult: [],
      orglOption: [{
        level: ''
      }],
      orglResult: [],
      level: '',
      clearable: true,
      overViewStatus: false
    }
  },
  mounted: () => {
  },
  destroyed () {
    window.location.reload()
  },
  created () {
    setTimeout(() => {
      document.getElementsByClassName('el-aside little')[0].style.width = '40px'
    }, 100)
    const baseSize = 16
    function setRem () {
      const scale = document.documentElement.clientWidth / 1920
      document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }
    setRem()
    window.onresize = function () {
      setRem()
    }
    if (this.$store.state.flag) {
      setTimeout(() => {
        document.getElementsByClassName('open arrow')[0].style.paddingLeft = '140px'
        document.getElementsByClassName('open arrow')[0].style.paddingTop = '15px'
        for (let i = 0; i < document.getElementsByClassName('el-submenu__title').length; i++) {
          document.getElementsByClassName('el-submenu__title')[i].style.width = '180px'
          document.getElementsByClassName('el-submenu__title')[i].style.display = 'flex'
          document.getElementsByClassName('el-submenu__title')[i].style.alignItems = 'center'
        }
        // document.getElementsByClassName('el-aside big')[0].style.width = '180px'
        document.getElementsByClassName('el-aside')[0].style.width = '180px'
        for (let i = 0; i < document.getElementsByClassName('el-menu-item').length; i++) {
          document.getElementsByClassName('el-menu-item')[i].style.width = '180px'
          document.getElementsByClassName('el-menu-item')[i].style.height = '35px'
          document.getElementsByClassName('el-menu-item')[i].style.paddingLeft = '55px'
          document.getElementsByClassName('el-menu-item')[i].style.paddingRight = '45px'
          document.getElementsByClassName('el-menu-item')[i].style.lineHeight = '35px'
          document.getElementsByClassName('el-menu-item')[i].style.textAlign = 'center'
          document.getElementsByClassName('el-menu-item')[i].style.fontSize = '14px'
        }
        for (let i = 0; i < document.getElementsByClassName('el-menu-item-group__title').length; i++) {
          document.getElementsByClassName('el-menu-item-group__title')[i].style.paddingLeft = '80px!important'
        }
        document.getElementsByTagName('span')[4].style.fontSize = '14px'
        // document.getElementsByTagName('span')[4].style.height = '19px'
        document.getElementsByTagName('span')[5].style.fontSize = '14px'
        // document.getElementsByTagName('span')[5].style.height = '19px'
        document.getElementsByTagName('span')[6].style.fontSize = '14px'
        // document.getElementsByTagName('span')[6].style.height = '19px'
        document.getElementsByTagName('span')[7].style.fontSize = '14px'
        // document.getElementsByTagName('span')[7].style.height = '19px'
        document.getElementsByTagName('span')[8].style.fontSize = '14px'
        // document.getElementsByTagName('span')[8].style.height = '19px'
        document.getElementsByTagName('span')[9].style.fontSize = '14px'
        // document.getElementsByTagName('span')[9].style.height = '19px'
      }, 1000)
    } else {
      setTimeout(() => {
        // document.getElementsByClassName('el-aside little')[0].style.width = '35px'
        document.getElementsByClassName('el-aside')[0].style.width = '35px'
        document.getElementsByClassName('el-menu--collapse')[0].style.width = '35px'
        for (let i = 0; i < document.getElementsByClassName('el-menu-item').length; i++) {
          // document.getElementsByClassName('el-submenu__title')[i].style.paddingLeft = '15px'
          document.getElementsByClassName('el-menu-item')[i].style.width = '200px'
          document.getElementsByClassName('el-menu-item')[i].style.height = '40px'
          document.getElementsByClassName('el-menu-item')[i].style.lineHeight = '40px'
          document.getElementsByClassName('el-menu-item')[i].style.paddingLeft = '55px'
        }
      }, 500)
    }
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(document.getElementsByClassName('el-menu-item'))
        document.getElementsByClassName('tBox')[0].style.width = '2px'
        document.getElementsByClassName('tBox')[0].style.height = '20px'
        document.getElementsByClassName('tBox')[0].style.marginLeft = '24px'
        document.getElementsByClassName('tBox')[0].style.marginRight = '18px'
        document.getElementsByClassName('close')[0].style.width = '27px'
        document.getElementsByClassName('close')[0].style.height = '27px'
        document.getElementsByClassName('close')[0].style.paddingLeft = '7px'
        document.getElementsByClassName('close')[0].style.paddingTop = '18px'
        document.getElementsByClassName('close')[0].style.marginBottom = '5px'
        document.getElementsByClassName('open')[0].style.width = '27px'
        document.getElementsByClassName('open')[0].style.height = '27px'
        document.getElementsByTagName('img')[0].style.width = '121px'
        document.getElementsByTagName('img')[0].style.height = '28px'
        document.getElementsByTagName('img')[0].style.marginLeft = '35px'
        document.getElementsByTagName('img')[1].style.width = '18px'
        document.getElementsByTagName('img')[1].style.height = '17px'
        document.getElementsByTagName('img')[1].style.marginRight = '12px'
        document.getElementsByTagName('img')[1].style.marginTop = '2px'
        document.getElementsByTagName('img')[2].style.width = '19px'
        document.getElementsByTagName('img')[2].style.height = '18px'
        document.getElementsByTagName('img')[2].style.marginRight = '14px'
        document.getElementsByTagName('img')[3].style.width = '16px'
        document.getElementsByTagName('img')[3].style.height = '19px'
        document.getElementsByTagName('img')[3].style.marginLeft = '35px'
        document.getElementsByTagName('img')[3].style.marginRight = '10px'
        document.getElementsByTagName('img')[3].style.marginTop = '-1px'
        document.getElementsByTagName('img')[11].style.width = '21px'
        document.getElementsByTagName('img')[11].style.height = '21px'
        document.getElementsByTagName('img')[6].style.width = '21px'
        document.getElementsByTagName('img')[6].style.height = '21px'
        document.getElementsByTagName('img')[7].style.width = '21px'
        document.getElementsByTagName('img')[7].style.height = '21px'
        document.getElementsByTagName('img')[8].style.width = '21px'
        document.getElementsByTagName('img')[8].style.height = '21px'
        document.getElementsByTagName('img')[9].style.width = '21px'
        document.getElementsByTagName('img')[9].style.height = '21px'
        document.getElementsByTagName('img')[10].style.width = '21px'
        document.getElementsByTagName('img')[10].style.height = '21px'
        document.getElementsByTagName('img')[6].style.marginLeft = '-10px'
        document.getElementsByTagName('img')[7].style.marginLeft = '-10px'
        document.getElementsByTagName('img')[8].style.marginLeft = '-10px'
        document.getElementsByTagName('img')[9].style.marginLeft = '-10px'
        document.getElementsByTagName('img')[10].style.marginLeft = '-10px'
        document.getElementsByTagName('img')[11].style.marginLeft = '-10px'
        document.getElementsByClassName('el-submenu__title')[0].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[0].style.paddingTop = '2px'
        document.getElementsByClassName('el-submenu__title')[1].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[1].style.paddingTop = '2px'
        document.getElementsByClassName('el-submenu__title')[2].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[2].style.paddingTop = '2px'
        document.getElementsByClassName('el-submenu__title')[3].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[3].style.paddingTop = '2px'
        document.getElementsByClassName('el-submenu__title')[4].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[4].style.paddingTop = '2px'
        document.getElementsByClassName('el-submenu__title')[5].style.height = '40px'
        document.getElementsByClassName('el-submenu__title')[5].style.paddingTop = '2px'
        document.getElementsByClassName('header')[0].style.height = '49px'
        document.getElementsByTagName('b')[0].style.marginLeft = '10px'
        document.getElementsByTagName('b')[0].style.marginRight = '10px'
        document.getElementsByClassName('el-aside')[0].style.width = '35px'
        document.getElementsByClassName('little')[0].style.width = '35px'
      }, 500)
    })
    this.$store.state.role = {
      orglResult: '',
      channelResult: '',
      date: '',
      state: false,
      orglOption: '2',
      level: '',
      dateMonth: '',
      dateYear: '',
      channelOption: ''
    }
    const nowDate = new Date()
    this.$store.state.role.date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1)
    this.$store.state.role.dateMonth = nowDate.getMonth() + 1
    this.$store.state.role.dateYear = nowDate.getFullYear()
    // this.handleChangeSalesChannelCode()
    findChannelList().then(res => {
      console.log(this.channelResult)
      if (res.data.data.length === 1) {
        this.$store.state.role.channelResult = res.data.data[0].sales_channelcode
      }
      this.channelOption = res.data.data
    })
    findOrglList().then(res => {
      this.overViewStatus = true
      this.orglOption = res.data.data
      this.$store.state.role.orglOption = res.data.data[0].level
      if (res.data.data[0].parentId === '44') {
        this.$store.state.role.orglResult = '-1'
      }
      this.handleFind()
    })
  },
  computed: {},
  methods: {
    handleChangeSalesChannelCode (res) {
      // console.log(res !== '')
      // if (this.channelOption.length === 1) {
      //   console.log(this.channelOption)
      //   this.$store.state.role.channelResult = this.channelOption
      //   this.clearable = false
      // } else {
      //   this.clearable = true
      // }
    },
    handleCut (item) {
      setTimeout(() => {
        this.$store.state.role.state = !this.$store.state.role.state
      }, 0)
      // this.$store.state.flag = !this.$store.state.flag
      this.cut = item
      if (this.overViewStatus === true) {
        console.log(item)
        this.cut = item
      } else {
        this.$message.warning('用户信息获取中')
      }
    },
    handleFind () {
      this.$store.state.role.state = !this.$store.state.role.state
      this.$store.state.role.dateYear = this.$store.state.role.date.slice(0, 4)
      this.$store.state.role.dateMonth = this.$store.state.role.date.slice(5, 7)
      if (this.$store.state.role.dateMonth.slice(0, 1) !== '0' && this.$store.state.role.dateMonth.length === 1) {
        this.$store.state.role.dateMonth = '0' + this.$store.state.role.dateMonth
      }
      this.$store.state.findRole.channelResult = this.$store.state.role.channelResult
    },
    handleReset () {
      const nowDate = new Date()
      this.$store.state.role.orglResult = ''
      this.$store.state.role.channelResult = ''
      this.$store.state.role.date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1)
    }
  },
  watch: {
    '$store.state.flag' () {
      if (this.$store.state.flag) {
        setTimeout(() => {
          document.getElementsByClassName('open arrow')[0].style.paddingLeft = '140px'
          document.getElementsByClassName('open arrow')[0].style.paddingTop = '15px'
          for (let i = 0; i < document.getElementsByClassName('el-submenu__title').length; i++) {
            document.getElementsByClassName('el-submenu__title')[i].style.width = '180px'
            document.getElementsByClassName('el-submenu__title')[i].style.display = 'flex'
            document.getElementsByClassName('el-submenu__title')[i].style.alignItems = 'center'
          }
          // document.getElementsByClassName('el-aside big')[0].style.width = '180px'
          document.getElementsByClassName('el-aside')[0].style.width = '180px'
          for (let i = 0; i < document.getElementsByClassName('el-menu-item').length; i++) {
            document.getElementsByClassName('el-menu-item')[i].style.width = '180px'
            document.getElementsByClassName('el-menu-item')[i].style.height = '35px'
            document.getElementsByClassName('el-menu-item')[i].style.paddingLeft = '55px'
            document.getElementsByClassName('el-menu-item')[i].style.paddingRight = '45px'
            document.getElementsByClassName('el-menu-item')[i].style.lineHeight = '35px'
            document.getElementsByClassName('el-menu-item')[i].style.textAlign = 'center'
            document.getElementsByClassName('el-menu-item')[i].style.fontSize = '14px'
          }
          for (let i = 0; i < document.getElementsByClassName('el-menu-item-group__title').length; i++) {
            document.getElementsByClassName('el-menu-item-group__title')[i].style.paddingLeft = '80px!important'
          }
          document.getElementsByTagName('span')[4].style.fontSize = '14px'
          // document.getElementsByTagName('span')[4].style.height = '19px'
          document.getElementsByTagName('span')[5].style.fontSize = '14px'
          // document.getElementsByTagName('span')[5].style.height = '19px'
          document.getElementsByTagName('span')[6].style.fontSize = '14px'
          // document.getElementsByTagName('span')[6].style.height = '19px'
          document.getElementsByTagName('span')[7].style.fontSize = '14px'
          // document.getElementsByTagName('span')[7].style.height = '19px'
          document.getElementsByTagName('span')[8].style.fontSize = '14px'
          // document.getElementsByTagName('span')[8].style.height = '19px'
          document.getElementsByTagName('span')[9].style.fontSize = '14px'
          // document.getElementsByTagName('span')[9].style.height = '19px'
        }, 1000)
      } else {
        setTimeout(() => {
          // document.getElementsByClassName('el-aside little')[0].style.width = '35px'
          document.getElementsByClassName('el-aside')[0].style.width = '35px'
          document.getElementsByClassName('el-menu--collapse')[0].style.width = '35px'
          for (let i = 0; i < document.getElementsByClassName('el-menu-item').length; i++) {
            document.getElementsByClassName('el-menu-item')[i].style.width = '200px'
            document.getElementsByClassName('el-menu-item')[i].style.height = '40px'
            document.getElementsByClassName('el-menu-item')[i].style.lineHeight = '40px'
            document.getElementsByClassName('el-menu-item')[i].style.paddingLeft = '55px'
          }
        }, 500)
      }
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementsByClassName('close')[0].style.width = '27px'
          document.getElementsByClassName('close')[0].style.height = '27px'
          document.getElementsByClassName('close')[0].style.paddingLeft = '7px'
          document.getElementsByClassName('close')[0].style.paddingTop = '18px'
          document.getElementsByClassName('close')[0].style.marginBottom = '5px'
          document.getElementsByClassName('open')[0].style.width = '27px'
          document.getElementsByClassName('open')[0].style.height = '27px'
          document.getElementsByTagName('img')[0].style.width = '121px'
          document.getElementsByTagName('img')[0].style.height = '28px'
          document.getElementsByTagName('img')[0].style.marginLeft = '35px'
          document.getElementsByTagName('img')[1].style.width = '18px'
          document.getElementsByTagName('img')[1].style.height = '17px'
          document.getElementsByTagName('img')[1].style.marginRight = '12px'
          document.getElementsByTagName('img')[1].style.marginTop = '2px'
          document.getElementsByTagName('img')[2].style.width = '19px'
          document.getElementsByTagName('img')[2].style.height = '18px'
          document.getElementsByTagName('img')[2].style.marginRight = '14px'
          document.getElementsByTagName('img')[3].style.width = '16px'
          document.getElementsByTagName('img')[3].style.height = '19px'
          document.getElementsByTagName('img')[3].style.marginLeft = '35px'
          document.getElementsByTagName('img')[3].style.marginRight = '10px'
          document.getElementsByTagName('img')[3].style.marginTop = '-1px'
          document.getElementsByTagName('img')[11].style.width = '21px'
          document.getElementsByTagName('img')[11].style.height = '21px'
          document.getElementsByTagName('img')[6].style.width = '21px'
          document.getElementsByTagName('img')[6].style.height = '21px'
          document.getElementsByTagName('img')[7].style.width = '21px'
          document.getElementsByTagName('img')[7].style.height = '21px'
          document.getElementsByTagName('img')[8].style.width = '21px'
          document.getElementsByTagName('img')[8].style.height = '21px'
          document.getElementsByTagName('img')[9].style.width = '21px'
          document.getElementsByTagName('img')[9].style.height = '21px'
          document.getElementsByTagName('img')[10].style.width = '21px'
          document.getElementsByTagName('img')[10].style.height = '21px'
          document.getElementsByTagName('img')[6].style.marginLeft = '-10px'
          document.getElementsByTagName('img')[7].style.marginLeft = '-10px'
          document.getElementsByTagName('img')[8].style.marginLeft = '-10px'
          document.getElementsByTagName('img')[9].style.marginLeft = '-10px'
          document.getElementsByTagName('img')[10].style.marginLeft = '-10px'
          document.getElementsByTagName('img')[11].style.marginLeft = '-10px'
          document.getElementsByClassName('el-submenu__title')[0].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[0].style.paddingTop = '2px'
          document.getElementsByClassName('el-submenu__title')[1].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[1].style.paddingTop = '2px'
          document.getElementsByClassName('el-submenu__title')[2].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[2].style.paddingTop = '2px'
          document.getElementsByClassName('el-submenu__title')[3].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[3].style.paddingTop = '2px'
          document.getElementsByClassName('el-submenu__title')[4].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[4].style.paddingTop = '2px'
          document.getElementsByClassName('el-submenu__title')[5].style.height = '40px'
          document.getElementsByClassName('el-submenu__title')[5].style.paddingTop = '2px'
          document.getElementsByClassName('header')[0].style.height = '49px'
          document.getElementsByTagName('b')[0].style.marginLeft = '10px'
          document.getElementsByTagName('b')[0].style.marginRight = '10px'
          document.getElementsByClassName('el-aside')[0].style.width = '35px'
          document.getElementsByClassName('tBox')[0].style.width = '2px'
          document.getElementsByClassName('tBox')[0].style.height = '20px'
          document.getElementsByClassName('tBox')[0].style.marginLeft = '24px'
          document.getElementsByClassName('tBox')[0].style.marginRight = '18px'
        }, 500)
      })
    }
  }
}
</script>
<style lang="less" scoped>
div, span {
  font-size: 12px;
}
.index{
  width: 1800px;
  margin: auto;
  min-width: 1080px;
}
#condition{
  width: 100%;
  background: white;
  border-radius: 5px;
  height: 100px;
  padding-top: 26px;
  box-sizing: border-box;
}
#condition .el-select{
  width: 100%;
}
.header{
  height: 70px;
  display: flex;
  align-items: center;
  color: #5CBEDC;
  font-size: 16px;
  margin-left: 7px;
  font-weight: bold;
}
.header img {
  margin-right: 20px;
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
.btnList{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin-top: 5px;
  margin-right: 60px;
}
.btnList img{
  width: 21px;
  height: 21px;
}
.conditionList{
  display: flex;
  align-content: center;
}
.roleBoardTabs{
  width: 100%;
  background: white;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.tabBtn{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C2C2C2;
  font-size: 16px;
  border-bottom: 2px solid #C2C2C2;
  cursor: pointer;
}
.tabBtnOn{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #76CBFF;
  border-bottom: 2px solid #21A2F4;
  font-size: 16px;
  color: white;
}
.tabBtn:hover{
  background: #76CBFF;
  border-bottom: 2px solid #21A2F4;
  color: white;
}
#content{
  width: 100%;
  margin: auto;
}
/deep/ .el-form-item__label{
  font-size: 16px !important;
}
.el-form-item__content{
  font-size: 16px !important;
}
/deep/ .el-input__inner{
  font-size: 16px !important;
}
/deep/ .el-button span{
  font-size: 16px !important;
}
/deep/ .el-button{
  width: 126px;
  height: 35px;
}
</style>
