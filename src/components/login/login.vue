<template>
  <div class="login">
    <div class="formWrapper">
      <div class="content">
        <div class="logo"></div>
        <div class="form clearfix">
          <input type="text" class="input userName" v-model="username">
          <input type="password" class="input password" v-model="password">
          <input type="checkbox" class="rememberBtn">
          <span>记住密码</span>
          <button class="loginBtn" @click="login">登录</button>
          <div class="menuWrapper">
            <i class="icon icon-info" @click="showInfo"></i>
            <i class="icon icon-coin-yen"></i>
            <i class="icon icon-cog" @click="showSetting"></i>
          </div>
        </div>
      </div>
    </div>
    <SystemSetting ref="systemSetting"></SystemSetting>
    <SystemInfo ref="SystemInfo"></SystemInfo>
    <Info text="账号密码错误" ref="errorWindow" confirmBtnText="确定"></Info>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SystemSetting from 'components/system-setting/system-setting'
  import SystemInfo from 'components/system-info/system-info'
  import Info from 'base/info/info'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (this.username === 'admin' && this.password === '1') {
          this.$router.push({
            path: '/login/1'
          })
        } else {
          this.$refs.errorWindow.show()
        }
      },
      showInfo() {
        this.$refs.SystemInfo.show()
      },
      showSetting() {
        this.$refs.systemSetting.show()
      }
    },
    components: {
      SystemInfo,
      SystemSetting,
      Info
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    width: 100%
    height: 100%
    .formWrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      .content
        display: flex
        /*border: 1px solid #FFFACD*/
        .logo
          flex: 0 0 80px
          width: 80px
          height: 80px
          background: #FFFACD
          border-radius : 10px
          border: 1px solid #3cc51f
          margin-right: 20px
        .form
          flex: 1
          input
            margin-bottom : 10px
          .input
            display: block
            padding: 3px 5px
          .loginBtn
            -webkit-appearance: none
            background: #fff
            padding: 3px 10px
            font-size :14px
            border-radius : 5px
            float: right
          .menuWrapper
            display: flex
            margin-top :50px
            .icon
              flex: 1
              text-align :center
              font-size: 22px
</style>
