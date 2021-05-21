<template>
  <div class="login" ref="login">
    <div class="head" :class="navBarFixed ? 'fixed' : '' ">
      <div class="headTitle">
        <div class="headLeft">
          <img src="../../assets/portraitImg/IMG/个人画像.png" alt />个人画像
        </div>
        <ul class="headRight" >
          <li class="topBtn" @click='topTitleOne' :class="activeTop === '1' ? 'active' : '' "><a>个人信息</a></li>
          <li class="topBtn" @click='topTitletwo' :class="activeTop === '2' ? 'active' : '' "><a>日常考核</a></li>
          <li class="topBtn" @click='topTitleThree' :class="activeTop === '3' ? 'active' : '' "><a>业务结构</a></li>
          <li class="topBtn" @click='topTitleFour' :class="activeTop === '4' ? 'active' : '' "><a>客户结构</a></li>
          <li class="topBtn" @click='topTitleFive' :class="activeTop === '5' ? 'active' : '' "><a>续保结构</a></li>
          <li class="topBtn" @click='topTitleSix' :class="activeTop === '6' ? 'active' : '' "><a>行为信息</a></li>
        </ul>
      </div>
      <div class="topBack" @click='goBack' style='cursor: pointer;'>
        <img src="../../assets/portraitImg/IMG/返回.png" alt />返回
      </div>
    </div>
    <div id="contents">
      <information ref="information" name='information'/>
      <assessment ref="assessment" name="assessment"/>
      <business ref="business" name="business"/>
      <customer ref="customer" name="customer"/>
      <insurance ref="insurance" name="insurance"/>
      <behaviors ref="behaviors" name="behaviors"/>
    </div>
  </div>
</template>

<script>
import { findSalesPortrayByTagDataDate } from '../../api/getApi'
import information from './information'
import assessment from './assessment'
import business from './business'
import insurance from './insurance'
import behaviors from './behaviors'
import customer from './customer'
// import '../../utils/rem'

export default {
  name: 'portrait',
  components: {
    information,
    assessment,
    business,
    behaviors,
    customer,
    insurance
  },
  data () {
    return {
      navBarFixed: false,
      loginTop: 0,
      activeTop: '1',
      GetWindowInfo: {
        width: ''
      }
    }
  },
  mounted () {
    this.$refs.login.addEventListener('scroll', this.watchScroll)
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
          document.getElementsByClassName('tBox')[0].style.width = '2px'
          document.getElementsByClassName('tBox')[0].style.height = '20px'
          document.getElementsByClassName('tBox')[0].style.marginLeft = '24px'
          document.getElementsByClassName('tBox')[0].style.marginRight = '18px'
          document.getElementsByClassName('el-aside')[0].style.width = '35px'
        }, 500)
      })
    },
    loginTop: {
      handler (val, oldVal) {
        if (this.GetWindowInfo.width === 1366) {
          if (val >= this.$refs.information.$el.clientHeight - 870) {
            this.activeTop = '1'
          }
          if (val >= this.$refs.assessment.$el.clientHeight + 162) {
            this.activeTop = '2'
          }
          if (val >= this.$refs.business.$el.clientHeight + 458) {
            this.activeTop = '3'
          }
          if (val >= this.$refs.customer.$el.clientHeight + 1245) {
            this.activeTop = '4'
          }
          if (val >= this.$refs.insurance.$el.clientHeight + 1865) {
            this.activeTop = '5'
          }
          if (val >= this.$refs.behaviors.$el.clientHeight + 2880) {
            this.activeTop = '6'
          } else {
            if (val === 0) {
              this.activeTop = '1'
            }
          }
        }
        if (this.GetWindowInfo.width === 1600) {
          if (val >= this.$refs.information.$el.clientHeight - 850) {
            this.activeTop = '1'
          }
          if (val >= this.$refs.assessment.$el.clientHeight + 192) {
            this.activeTop = '2'
          }
          if (val >= this.$refs.business.$el.clientHeight + 533) {
            this.activeTop = '3'
          }
          if (val >= this.$refs.customer.$el.clientHeight + 1460) {
            this.activeTop = '4'
          }
          if (val >= this.$refs.insurance.$el.clientHeight + 2190) {
            this.activeTop = '5'
          }
          if (val >= this.$refs.behaviors.$el.clientHeight + 3380) {
            this.activeTop = '6'
          } else {
            if (val === 0) {
              this.activeTop = '1'
            }
          }
        }
        if (this.GetWindowInfo.width === 1920) {
          if (val >= this.$refs.information.$el.clientHeight - 870) {
            this.activeTop = '1'
          }
          if (val >= this.$refs.assessment.$el.clientHeight + 232) {
            this.activeTop = '2'
          }
          if (val >= this.$refs.business.$el.clientHeight + 638) {
            this.activeTop = '3'
          }
          if (val >= this.$refs.customer.$el.clientHeight + 1745) {
            this.activeTop = '4'
          }
          if (val >= this.$refs.insurance.$el.clientHeight + 2625) {
            this.activeTop = '5'
          }
          if (val >= this.$refs.behaviors.$el.clientHeight + 4050) {
            this.activeTop = '6'
          } else {
            if (val === 0) {
              this.activeTop = '1'
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
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
          document.getElementsByClassName('el-menu-item')[i].style.width = '200px'
          document.getElementsByClassName('el-menu-item')[i].style.height = '40px'
          document.getElementsByClassName('el-menu-item')[i].style.lineHeight = '40px'
          document.getElementsByClassName('el-menu-item')[i].style.paddingLeft = '55px'
        }
      }, 500)
    }
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(document.getElementsByClassName('el-submenu__icon-arrow el-icon-arrow-down'))
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
        document.getElementsByClassName('tBox')[0].style.width = '2px'
        document.getElementsByClassName('tBox')[0].style.height = '20px'
        document.getElementsByClassName('tBox')[0].style.marginLeft = '24px'
        document.getElementsByClassName('tBox')[0].style.marginRight = '18px'
        document.getElementsByClassName('el-aside')[0].style.width = '35px'
      }, 500)
    })
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
    findSalesPortrayByTagDataDate(this.$route.query.sales_code).then(res => {
      console.log(res)
      console.log(res.data.data.salesTagMemberDto)
      // 画像侧边信息
      this.$store.state.salesTagMemberDto = res.data.data.salesTagMemberDto
      // 图表数据
      this.$store.state.salesPortrayDto = res.data.data.salesPortrayDto
      this.$store.state.histogram = res.data.data
    })
  },
  destroyed () {
    window.location.reload()
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
    },
    watchScroll () {
      this.$nextTick(() => {
        var scrollTop = this.$refs.login.scrollTop
        //  当滚动超过 50 时，实现吸顶效果
        if (scrollTop > 46) {
          this.navBarFixed = true
        } else {
          this.navBarFixed = false
        }
        this.loginTop = scrollTop
      })
    },
    topTitleOne () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.information.$el.clientHeight - 870
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.information.$el.clientHeight - 850
      } else {
        this.$refs.login.scrollTop = this.$refs.information.$el.clientHeight - 870
      }
      this.activeTop = '1'
    },
    topTitletwo () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.assessment.$el.clientHeight + 162
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.assessment.$el.clientHeight + 192
      } else {
        this.$refs.login.scrollTop = this.$refs.assessment.$el.clientHeight + 232
      }
      this.activeTop = '2'
    },
    topTitleThree () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.business.$el.clientHeight + 458
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.business.$el.clientHeight + 533
      } else {
        this.$refs.login.scrollTop = this.$refs.business.$el.clientHeight + 638
      }
      console.log(this.$refs.business)
      this.activeTop = '3'
    },
    topTitleFour () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.customer.$el.clientHeight + 1245
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.customer.$el.clientHeight + 1460
      } else {
        this.$refs.login.scrollTop = this.$refs.customer.$el.clientHeight + 1745
      }
      this.activeTop = '4'
    },
    topTitleFive () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.insurance.$el.clientHeight + 1865
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.insurance.$el.clientHeight + 2190
      } else {
        this.$refs.login.scrollTop = this.$refs.insurance.$el.clientHeight + 2625
      }
      // console.log(this.$refs.insurance)
      this.activeTop = '5'
    },
    // topTitleFive () {
    //   // console.log(this.$refs.insurance)
    //   this.$refs.login.scrollTop = this.$refs.insurance.$el.clientHeight + 1575
    //   this.activeTop = '5'
    // },
    topTitleSix () {
      if (this.GetWindowInfo.width === 1366) {
        this.$refs.login.scrollTop = this.$refs.behaviors.$el.clientHeight + 2880
      } else if (this.GetWindowInfo.width === 1600) {
        this.$refs.login.scrollTop = this.$refs.behaviors.$el.clientHeight + 3380
      } else {
        this.$refs.login.scrollTop = this.$refs.behaviors.$el.clientHeight + 4050
      }
      // console.log(this.$refs.behaviors)
      this.activeTop = '6'
    },
    goBack () {
      console.log(this.$route.query)
      if (this.$route.query.historySec === '/groupManagement/see') {
        this.$router.push(this.$route.query.historySec + '?groupId=' + this.$route.query.groupId + '&history=' + this.$route.query.history + '&firId=' + this.$route.query.firId + '&share=' + this.$route.query.share)
      } else {
        this.$router.push(this.$route.query.historySec + '?operationId=' + this.$route.query.operationId + '&history=' + this.$route.query.history + '&firId=' + this.$route.query.firId + '&groupId=' + this.$route.query.groupId + '&share=' + this.$route.query.share)
      }
      // if (this.$route.query.strategyHistory) {
      //   this.$router.push(this.$route.query.history + '?strategyId=' + this.$route.query.strategyId + '&history=' + this.$route.query.history + '&groupManagementId=' + this.$route.query.groupManagementId + '&groupId=' + this.$route.query.groupId + '&strategyIdBack=' + this.$route.query.strategyIdBack + '&strategyHistory=' + this.$route.query.strategyHistory)
      // } else {
      //   this.$router.push(this.$route.query.history + '?salesId=' + this.$route.query.salesId)
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// body{
//   overflow:hidden;
// }
// html{
//   overflow-y:scroll;
// }
// html{
//   overflow: auto;
// }
.active {
  color:#61afff !important;
  // background-color: #fff;
  border-bottom: 4px solid #61afff;
}
a {
  text-decoration: none;
}
.login {
  // width: 1813px;
  min-width: 1400px;
  padding: 27px;
  overflow: scroll;
  // height: ceil(100% - 10px);
  height: 94%;
}
.fixed{
  // position: fixed;
  position: sticky;
  position: -webkit-sticky;
  top: -27px;
  display: none;
  width: 1810px;
  height: 70px;
  background: #f7f5f5;
  z-index: 1000;
}
.head {
  height:70px;
  display: flex;
  align-items: center;
}
.headTitle {
  width: 95%;
  height: 70px;
  display: flex;
  align-items: center;
}
.headLeft {
  width: 15%;
  min-width: 200px;
  display: flex;
  align-items: center;
  height: 14px;
  font-size: 20px;
  color: #33aed3;
  img {
    margin-right: 12px;
  }
}
.headRight {
  margin-left: -20px;
  width: 45%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  li {
    cursor: pointer;
    line-height: 70px;
    font-size: 14px;
    padding: 0px 5px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    a{
      font-size: 20px;
      text-decoration: none;
      // color: #b0b0b0;
    }
    &:link {
      background-color: #fff;
      border-bottom: 4px solid #21a2f4;
      color: #21a2f4;
    }
    &:hover {
      border-bottom: 4px solid #21a2f4;
      color: #21a2f4;
    }
  }
}
.topBtn {
  //   height: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   margin: 0 30px;
  //   font-size: 14px;
  //   font-family: Microsoft YaHei;
  //   font-weight: 400;
  //   color: #999999;
  cursor: pointer;
}
.topBack {
  width: 90px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  display: flex;
  align-items: flex-end;
  img {
    margin-right: 12px;
    // margin-bottom: 10px;
  }
}
</style>
