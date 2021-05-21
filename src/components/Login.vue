<template>
  <div class="login">
    <img src="../assets/loginImg/登录背景.jpg" alt="" class="bgc">
    <p>销售画像和赋能管理系统</p>
    <el-form status-icon :model="formList" :rules="rules">
      <img src="../assets/loginImg/资源 44.png" alt="" class="logo">
      <el-form-item  prop="username">
        <img src="../assets/loginImg/USER.png" alt="" class="user">
        <input type="text">
      </el-form-item >
      <el-form-item  prop="password">
        <img src="../assets/loginImg/LOCK.png" alt="" class="user">
        <input type="text">
      </el-form-item>
      <el-form-item label-width="14px">
        <input type="text">
        <input type="text" placeholder="获取验证码">
      </el-form-item>
      <el-form-item label-width="10px">
        <el-button>登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formList: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { message: '请输入用户密码', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 6 到 12个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .bgc{
    width: 100%;
    height: 100%;
  }
  p{
    position: absolute;
    top:30%;
    left:20%;
    font-size: 40px;
    font-family:Microsoft YaHei;
    color:#fff;
  }
  .el-form{
    width:360px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top:23%;
    right:15%;
    box-sizing: border-box;
    text-align: center;
    .logo{
      width: 200px;
      height: 46px;
      margin: 14px 65px 45px 57px;
    }
    .el-form-item{
      position: relative;
      .user{
        width: 21px;
        height: 21px;
        position: absolute;
        left:20px;
        top:12px;
      }
      input{
        width: 90%;
        height: 40px;
        border:1px solid #e6e6e6;
        background-color: #f6f7fc;
      }
      &:nth-last-child(2){
        margin-bottom: 30px;
        & input{
          float: left;
          &:first-child{
            width:60%;
            height: 40px;
          }
           &:last-child{
             width: 32%;
          }
        }

      }
      &:last-child .el-button{
        height: 40px;
        &:first-child{
          width:60%;
          color:#fff;
          float: left;
          background-color: #47bbea;
        }
        &:last-child{
          color:#000;
          float: right;
          margin-right: 14px;
        }
      }

    }

  }

}

</style>
