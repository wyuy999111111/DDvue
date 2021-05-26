<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.cookie = 'JSESSIONID=C67E4EE871E3460A6C0013AB9B5CC71A'
    const backCommon = function () {
      history.pushState(null, null, document.URL)
    }
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', backCommon)
  }
}
</script>
<style lang="less">
.el-input__inner{
  font-size: 12px;
}
.el-textarea__inner{
  font-size: 12px !important;
}
// body{
//   overflow:hidden;
// }
// html{
//   overflow-y:scroll;
// }
// html{
//   overflow: auto;
// }
.nbs{
  .el-checkbox{
    width: 80px;
  }
}
/deep/ .el-table .cell {
  line-height: 20px !important;
}
/deep/ .el-table td {
  padding: 6px 0 !important;
}
.el-range-input{
  font-size: 12px !important;
}
.el-date-editor .el-range-separator{
  line-height: 26px !important;
}
.el-date-editor .el-range__icon{
  line-height: 26px !important;
}
.el-menu-item-group__title{
  padding: 0!important;
}
.el-menu--popup{
  padding: 0!important;
}
.el-table__header-wrapper {
  background-color: #e6e9f2;
  height: 40px !important;
  display: flex;
  align-items: center;
}
// .el-table__body-wrapper {
//   height: 45px !important;
//   display: flex;
//   align-items: center;
// }
.el-main{
  padding: 1px!important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  color: black !important;
}
.el-cascader__search-input{
  background: #F6F7FC;
}
.el-form-item /deep/ .el-form-item__label{
  line-height: 15px !important;
}
.el-form-item__label{
  line-height: 15px !important;
}
.el-table .cell{
  font-size: 12px;
}
/deep/ .el-select__tags {
  white-space: nowrap !important;
  overflow: hidden;
  flex-wrap: nowrap !important;
}
.el-table th>.cell{
  font-weight: bold;
}
*{
  padding: none;
}
.el-submenu__title i{
  color: white !important;
}
.el-form-item__label{
  font-size: 12px !important;
}
.index .el-container .el-main[data-v-82b7485c]{
  padding: none;
}
textarea {
  font-family: Arial, Helvetica, sans-serif;
}
html,body{
  width: 100%;
  height: 100%;
  // overflow-x: hidden;
  // overflow-y: overlay;
}
html,body,div,p,ul,li,dl,dt,img{
  margin: 0;
  padding: none;
  list-style: none;
}
body::-webkit-scrollbar { width: 0 !important; display: none; }
body { -ms-overflow-style: none; }
body { overflow: -moz-scrollbars-none; }
// ::-webkit-scrollbar{
//   display:none;
// }
span{
  font-size: 12px;
}
.el-form-item__label{
  height: 40px;
  display: flex;
  line-height: none !important;
  text-align: left !important;
  align-items: center;
  padding-left: 20px !important;
}
#app{
  width: 100%;
  // font-size: 10px;
  height: calc(100% - 50px);
}
.index .el-menu-item-group__title{
  padding: 0px !important;
}
.el-input__inner {
  background: #F6F7FC !important;
}
.el-range-editor .el-range-input{
  background: #F6F7FC !important;
}
.el-input--suffix .el-input__inner{
  background: #F6F7FC !important;
}
</style>
