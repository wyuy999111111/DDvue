<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="top">
        <img class="tImg" src="../assets/home/symbolNew/logo.png" alt />
        <div class="tBox"></div>
        <div class="topHome" @click="backIndex">
          <!-- <i @click="backIndex"></i><span>首页</span> -->
          <img src="../assets/home/symbolNew/主页.png" alt="">
          <span style="marginTop: 2px">首页</span>
        </div>
      </div>
      <!-- <img src="../assets/indexImg/topIcon.png" alt=""> -->
      <div class="left">
        <img src="../assets/home/symbolNew/用户.png" alt class="user" />
        <span style="marginRight: 20px">{{ res.userName }}</span>
        <span>{{ res.codeName }}</span>
        <div class="layoutBox" @click="logout">
          <img src="../assets/home/symbolNew/退出.png" alt class="layout" />
          <span>退出</span>
        </div>
      </div>
    </div>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside :style="{'width':(isCollapse? '35px' : '180px')}">
      <!-- <el-aside :class="isCollapse ? 'little' : 'big'"> -->
        <el-menu
          text-color="white"
          active-text-color='white'
          :default-active="$route.path"
          @open="handleOpen"
          class="el-menu-vertical-demo"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <img src="../assets/home/symbolNew/开.png" alt class="close arrow" @click="goback" v-show="isCollapse" />
          <img src="../assets/home/symbolNew/合.png" alt class="open arrow" @click="goback" v-show="!isCollapse" />
          <el-submenu v-for="(menu, index) in $store.state.menuList" :index="index" :key="index" >
            <template slot="title" style="height: 35px; line-height: 35px; color: #47bcea;" class="el-title" >
              <img src='../assets/home/symbolNew/系统管理.png' alt id='title' v-if="menu.resName === '系统管理'" />
              <img src='../assets/home/symbolNew/标签管理.png' alt id='title' v-if="menu.resName === '标签管理'" />
              <img src='../assets/home/symbolNew/人员管理.png' alt id='title' v-if="menu.resName === '人员管理'" />
              <img src='../assets/home/symbolNew/策略管理.png' alt id='title' v-if="menu.resName === '策略管理'" />
              <img src='../assets/home/symbolNew/群组管理.png' alt id='title' v-if="menu.resName === '群组管理'" />
              <img src='../assets/home/symbolNew/业务监控.png' alt id='title' v-if="menu.resName === '运营中心'" />
              <span>{{menu.resName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item style='padding-left:55px' v-for="item in menu.children" :index="item.resIdentity" :name='item.resIdentity' @click="handleClick(item)"  :key="item.resIdentity" >{{item.resName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main ref='elMain'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { findUserRe, myinfo } from '@/api/getApi'

export default {
  data () {
    return {
      isCollapse: true,
      res: '',
      active: ''
    }
  },
  mounted: () => {
    // this.active = window.location.pathname
  },
  created () {
    this.active = this.$route.name
    findUserRe().then((res) => {
      this.$store.state.menuList = res.data.data
      console.log(res)
    })
    myinfo().then((res) => {
      this.res = res.data
      this.$store.state.user = res.data
    })
  },
  computed: {
    defaultIndex () {
      return this.$route.path.slice(1).split('-')[0]
    },
    defaultActive () {
      return '/' + this.$route.path.split('/').reverse()[0]
    }
  },
  methods: {
    backIndex () {
      this.$router.push('/')
    },
    handleClick (item, name) {
      // this.active = item.resIdentity
      // document.getElementByClass('.el-menu-item.is-active').style.backgroundColor = '#ecf5ff'
      // document.querySelector('.el-menu-item.is-active').style.backgroundColor = '#ecf5ff'
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    goback () {
      this.isCollapse = !this.isCollapse
      this.$store.state.flag = !this.$store.state.flag
      console.log(this.$store.state.flag)
    },
    logout () {
      this.$confirm('亲, 你确认要退出系统吗?', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const url = location.host
          window.location.href = `http://${url}/sit-web/logout`
        })
        .catch(() => {
          this.$message('退出已取消')
        })
    },
    resIdentity (item) {
      // this.$store.state.rights = item.prmsIdentity
    }
  }
}
</script>
<style lang="less" scoped>
// .el-submenu.is-active .el-submenu__title
// body{
//   overflow:hidden;
// }
// html{
//   overflow-y:scroll;
// }
// html{
//   overflow: auto;
// }
/deep/ .index .el-container .el-menu{
  box-shadow: 4px 4px 5px #999 !important;
}
.el-menu--collapse {
  width: 40px;
}
/deep/ .el-submenu__title{
  height: 40px;
  line-height: 40px;
}
/deep/ .is-active .el-submenu__title{
  background-color: #ecf5ff !important; // cebianlan
}
// /deep/ .el-menu-item:hover{
//   background: #47bcea;
// }
.el-menu-item-group__title{
  padding: 0!important;
}
*{
  padding: 0;
}
// .el-submenu{
//   height: 35px !important;
//   line-height: 35px !important;
// }
// .el-submenu li{
//   height: 35px !important;
//   line-height: 35px !important;
// }
// .el-menu .el-title:hover{
//   background: #73d7ff;
// }
.active {
   background:#007AFA;
 }
.el-submenu__title *{
  font-size: 14px;
  color: #47bcea;
}
/deep/  .el-submenu__title i{
  color:#47bcea !important;
}
.index .el-menu-item-group__title{
  padding: 110px !important;
  background-color: red;
}
.el-menu-item{
  background: #fff;
  height: 40px;
  line-height: 40px;
  color: #47bcea!important;
}
.el-menu-item.is-active {
  background-color: #ecf5ff !important;
}
/depp/ .el-submenu{
  height: 35px !important;
}
// .el-submenu .el-submenu__title:hover{
//     background-color: #47bcea !important;
// }
.el-submenu .el-menu-item{
  height: 35px;
  line-height: 35px;
  color: #47bcea !important;
}
// .el-submenu .el-menu-item:hover{
//   background:#47bcea;
// }
.index {
  height: 100%;
  .header {
    z-index: 1001;
    box-shadow: 4px 4px 3px #ccc;
    position: relative;
    height: 49px;
    width: 100%;
    background-color: #fff;
    // overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    // .top{
    //   width: 80px;
    //   height: 30px;
    //   background-color: lime;
    //   position: absolute;
    //   left: 180px;
    //   cursor: pointer;
    // b{
    //   width: 2px;
    //   height: 20px;
    //   background-color: #47bcea;
    //   // position: absolute;
    //   // top: 15px;
    //   // left: 180px;
    //   cursor: pointer;
    // }
    // i{
    //   content: '';
    //   width: 18px;
    //   height: 17px;
    //   // line-height: 30px;
    //   background: url('../assets/home/symbolNew/主页.png') no-repeat;
    //   position: absolute;
    //   // top: 17px;
    //   // left: 200px;
    //   // padding-left: 30px;
    //   cursor: pointer;
    //   background-size: cover;
    // }
    .tImg {
      margin-left: 35px;
      // margin-right: 20px;
      width: 121px;
      height: 28px;
      background-size: cover;
    }
    .left {
      float: right;
      margin-right: 35px;
      display: flex;
      height: 50px;
      align-items: center;
      white-space:nowrap;
      .user {
        width: 19px;
        height: 18px;
        margin-right: 14px;
      }
      span {
        color: #47bcea;
        font-size: 12px;
        &:nth-child(2) {
          margin-right: 20px;
        }
      }
      .layoutBox {
        cursor: pointer;
        display: flex;
        align-items: center;
        .layout {
          width: 16px;
          height: 19px;
          margin-right: 10px;
          margin-left: 35px;
        }
      }
    }
    // }
  }
  .el-container{
    height: 100%;
    background-color: #fff;
    .el-aside{
      z-index: 1002;
      box-shadow: 4px 4px 5px #ccc;
      position: relative;
      // width: 180px!important;
    }
    img{
      width: 27px;
      height: 27px;
      background-size: cover;
    }
    .img_a{
      width: 30px;
      height: 40px;
      position: absolute;
      top: 50px;
      left: 4px;
    }
    .el-menu {
      background-color: #fff;
      height: 100%;
      border: none;
      // /deep/ .el-submenu__title:hover{
      //   background-color: pink !important;
      // }
      .el-submenu .el-menu-item {
        min-width:180px;
      }
      .arrow {
        width: 27px;
        height: 27px;
      }
      .el-submenu img {
        margin-right: 8px;
        width: 21px;
        height: 21px;
        margin-left: -10px;
      }
    }
    .el-main {
      // padding: 20px 15px;
      background-color: #f7f5f5;
      width: 100%;
      height:100%;
      overflow-x: hidden;
      overflow-y: overlay;
    }
  }
}
.little{
  width: 35px;
}
.big{
  width: 180px;
}
.top{
  display: flex;
  align-items: center;
}
.tBox{
  width: 2px;
  height: 20px;
  background-color: #47bcea;
  margin: 0 18px 0 24px;
}
.topHome{
  width: 90px;
  height: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.topHome span{
  font-size: 12px;
  color: #47bcea;
  width: 54px;
  height: 20px;
}
.topHome img{
  width: 18px;
  height: 17px;
  margin-right: 12px;
  margin-top: 2px;
}
.close {
  padding: 18px 7px 0px 7px;
}
.open{
  padding: 18px 20px 0 140px;
}
</style>
