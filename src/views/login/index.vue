<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" label-position="left" :model="loginForm" :rules="rules">
      <!-- 背景图片 -->
      <div class="form-container">
        <div class="title-container">
          <img src="@/assets/images/logo.png" alt="">
        </div>
        <el-form-item prop="mobile">
          <span class="svg-container">
            <i class="el-icon-user" />
          </span>
          <el-input v-model="loginForm.mobile" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input ref="pwdInput" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" />
          <span class="svg-container">
            <!-- passwordType 为 password  icon-class="eye"
            passwordType 为 ''  icon-class="eye-open" -->
            <svg-icon
              :icon-class="`${passwordType=== 'password'?'eye':'eye-open'}`"
              @click="changePwd"
            />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <el-row type="flex" justify="center" align="center">
            <el-col :span="1">
              <i class="el-icon-open" />
            </el-col>
            <el-col>
              <el-input v-model="loginForm.code" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="7">
              <el-image :src="imgSrc" style="width: 100%; height: 100%;" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="loginBtn"
          style="width:100%;margin-bottom:30px;"
          @click="login"
        >登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { imageCodeApi } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      loginForm: {
        mobile: '13000000000',
        password: 'admin',
        code: '',
        loginName: 'admin',
        clientToken: '',
        loginType: '0',
        account: '13000000000'
      },
      loading: false,
      rules: {
        mobile: [
          { required: true, message: '账号为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 5, max: 16, message: '密码不正确', trigger: 'blur' }
        ],
        validation: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码不正确', trigger: 'blur' }
        ]
      },
      imgSrc: ''
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    changePwd() {
      this.passwordType === 'password'
        ? this.passwordType = '' : this.passwordType = 'password'
      // 输入框focus
      this.$nextTick(() => {
        this.$refs.pwdInput.focus()
      })
    },
    async getCode() {
      const radomNum = Math.round(Math.random() * 10000)
      const res = await imageCodeApi(radomNum)
      console.log(res)
      // const imgObj = URL.createObjectURL(res.data)
      // this.imgSrc = imgObj
      this.imgSrc = res.request.responseURL
      this.loginForm.clientToken = radomNum
      // console.log(this.clientToken)
      // console.log(this.imgSrc)
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.form-container {
  position: absolute;
  width: 518px;
  height: 388px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 76px 35px 0;
  background: #fff;
  box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
  border-radius: 10px;
  .title-container {
    position: absolute;
    top: -46px;
    left: 50%;
    transform: translateX(-50%);
    width: 96px;
    height: 96px;
    img {
      width: 100%;
    }
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background-color: transparent;
      border: 5px;
      border-color: black;
      -webkit-a0pearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      caret-color: $cursor;
      color: black;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
    padding: 0px 0px 0px 15px;
  }
  .el-form-item__error{
    color: red;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url('~@/assets/images/login-logo.png');
  background-position: center;
}
.loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
</style>
