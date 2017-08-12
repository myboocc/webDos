<template>
  <transition name="slide">
    <div class="dos">
      <div class="topWrapper">
        <i class="icon icon-play2" @click="addArrow"></i>
        <i class="icon icon-reply"></i>
        <span class="send" @click="submit">发送</span>
        <i class="icon floatRight slideInfoBtn" :class="toggleInfoBtn" @click="toggleShowInfo"></i>
      </div>
      <div class="commandWrapper">
        <div ref="scroll" class="command">
          <div>
            <div class="wrapperHook" ref="wrapperHook">
              <div class="item" v-for="(group,index) in groups">
                <div class="cmdWrapper">
                  <div class="cmd">
                    <span>></span>
                  </div>
                  <div class="cmdInputWrapper">
                    <textarea class="cmdInput" ref="cmdInput" v-focus></textarea>
                  </div>
                </div>
                <div class="response" ref="response"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="commandInfoSlide">
        <div class="commandInfoWrapper" v-show="isShow">
          <div class="tab">
            <span class="item-tab" :class="{'active':selectType === 0}" @click="selectTab(0)">信息</span>
            <span class="item-tab" :class="{'active':selectType === 1}" @click="selectTab(1)">历史</span>
            <span class="item-tab" :class="{'active':selectType === 2}" @click="selectTab(2)">快捷</span>
          </div>
          <div class="infoContent">
            <ul>
              <li>[添加意见反馈]</li>
              <li>更多功能</li>
              <li>我的手机更换</li>
              <li>关于复制粘贴</li>
            </ul>
          </div>
          <div class="btns">
            <span class="info-btn clear" @click="clearScreen">清屏</span>
            <span class="info-btn zhuxiao" @click="logOut">注销</span>
          </div>
        </div>
      </transition>
      <Info :text="textInfo" ref="logoutWindow" confirmBtnText="确定" @confirm="confirm"></Info>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import autosize from 'autosize'
  import Info from 'base/info/info'

  const resp1 = '1-  GS7977  DS# YA BA HA KA LA MS XQ VQ NQ WQ  TSNKIX 0835   1205   32I 0 B  E'
  const ERROR_RESP = '指令错误'

  export default {
    data() {
      return {
        groups: [{}],
        request: '',
        isShow: false,
        response: '',
        selectType: 0,
        counter: 0,
        textInfo: ''
      }
    },
    computed: {
      toggleInfoBtn() {
        return this.isShow ? 'active icon-circle-right' : 'icon-circle-left'
      }
    },
    mounted() {
      autosize(document.querySelectorAll('textarea'))
    },
    methods: {
      submit: function () {
        let cmdGroup = {}
        let currIndex = this.counter
        if (currIndex >= 0) {
          let input = this.$refs.cmdInput[currIndex].value
          if (input.trim() !== '') {
            input === 'admin' ? this.request = resp1 : this.request = ERROR_RESP
          } else {
            this.request = '指令不能为空'
          }
          this.$refs.cmdInput[currIndex].readOnly = true
          this.$refs.response[currIndex].innerText = this.request
          this.groups.push(cmdGroup)
          this.counter ++
          this.$nextTick(() => {
            let ta = autosize(document.querySelectorAll('textarea'))
            autosize.update(ta)
          })
        }
      },
      toggleShowInfo() {
        this.isShow = !this.isShow
      },
      selectTab(type) {
        this.selectType = type
      },
      clearScreen() {
        this.counter = 0
        this.groups = [{}]
        this.request = ''
        this.$refs.cmdInput[0].readOnly = false
        this.$refs.cmdInput[0].value = ''
        this.$refs.response[0].innerText = ''
      },
      logOut() {
        this.textInfo = '确定要退出吗？'
        this.$refs.logoutWindow.show()
      },
      confirm() {
        this.$router.push({
          path: '/login'
        })
      },
      addArrow() { // 添加箭头
        this.counter += 1
        this.groups.push({})
      }
    },
    components: {
      Info
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .dos
    position: fixed
    top: 0
    bottom: 0
    padding: 10px
    width: 100%
    color: #fff
    background: $color-background
    .topWrapper
      position: fixed
      width: 100%
      height: 30px
      top: 0
      left: 0
      padding: 2px 10px
      line-height :30px
      .icon
        font-size :24px
        line-height :30px
        padding-right :20px
        &.floatRight
          float: right
        &.active
          position: fixed
          transition: all 0.3s
          right: 150px
      .send
        vertical-align :top
    .commandWrapper
      position: absolute
      top: 45px
      bottom: 0
      width: 100%
      .command
        height: 100%
        overflow: scroll
        .item
          margin-bottom: 5px
          .cmdWrapper
            display: flex
            margin-bottom: 5px
            .cmd
              flex: 0 0 5px
              width: 5px
              margin-right: 5px
              line-height: 20px
            .cmdInputWrapper
              flex: 1
              .cmdInput
                width: 95%
                background-color: transparent
                border: 0
                color: #fff
                outline: none
                font-size: 14px
                margin-right: auto;
                padding: 3px;
                outline: 0;
                word-wrap: break-word;
                overflow-x: hidden;
                overflow-y: auto;
                _overflow-y: visible;
                resize: none
    .commandInfoWrapper
      position: fixed
      width: 150px
      height: 100%
      right: 0
      top: 0
      color: #000
      border: 1px solid #fcf8e3
      background: rgba(254, 254, 200, 1)
      &.commandInfoSlide-enter-active, &.commandInfoSlide-leave-active
        transition: all 0.3s
      &.commandInfoSlide-enter, &.commandInfoSlide-leave-to
        right: -150px
      .tab
        width: 100%
        display: flex
        height: 30px
        .item-tab
          flex: 1
          line-height: 30px
          font-size: 14px
          background: rgb(61, 130, 21)
          text-align: center
          color: #fff
          border-right: 1px solid rgb(21, 66, 9)
          &.active
            background: rgb(21, 66, 9)
      .infoContent
        width: 100%
        ul
          padding: 5px 5px
          li
            border-bottom: 1px solid #E8E8E8
            padding-top: 10px

      .btns
        position: absolute
        width: 100%
        left: 0
        bottom: 20px
        text-align: center
        display: flex
        .info-btn
          display: inline-block
          color: #fff
          margin: 0 auto
          padding: 5px 10px
          font-size: 14px
          text-align: center
          background: #516128
</style>
