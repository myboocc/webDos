<template>
  <transition name="slide">
    <div class="dos">
      <div class="topWrapper">
        <i class="icon icon-play2" @click="counter += 1"></i>
        <i class="icon icon-reply"></i>
        <span class="send" @click="counter += 1">发送</span>
        <i class="icon floatRight slideInfoBtn" :class="toggleInfoBtn" @click="toggleShowInfo"></i>
      </div>
      <div class="commandWrapper">
        <div ref="scroll" class="command" :pullup="pullup" @scrollToEnd="refresh">
          <div>
            <div class="wrapperHook" ref="wrapperHook">
              <div class="item" v-for="(group,index) in groups">
                <div class="cmdWrapper">
                  <div class="cmd">
                    <span>></span>
                  </div>
                  <div class="cmdInputWrapper">
                    <!--<input type="text" @keyup.enter="submit(index)" class="cmdInput" ref="cmdInput" v-focus>-->
                    <!--<textarea class="cmdInput" ref="cmdInput" v-focus style='overflow-y: hidden;height:20px' @onpropertychange="propertychange" @oninput="changeHeight"></textarea>-->
                    <!--<div contenteditable="true" class="cmdInput" ref="cmdInput" v-focus></div>-->
                    <textarea name="textarea" id="textarea" style='overflow-y: hidden;height:20px;width: 100%;' onpropertychange="this.style.height = this.scrollHeight + 'px';" oninput="this.style.height = this.scrollHeight + 'px';">我是内容
真的不会随内容变化吗？
其实不是的，只是楼主没有动脑筋而已</textarea>
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
            <span class="info-btn clear">清屏</span>
            <span class="info-btn zhuxiao">注销</span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        message: 'Hello Vue!',
        groups: [{}],
        request: '',
        pullup: true,
        isShow: false,
        response: '',
        selectType: 0,
        counter: 0
      }
    },
    computed: {
      toggleInfoBtn() {
        return this.isShow ? 'active icon-circle-right' : 'icon-circle-left'
      }
    },
    mounted() {
      console.log(this.$refs.cmdInput)
//      this.$refs.cmdInput.clientHeight = this.$refs.cmdInput.scrollHeight + 10 + 'px'
      document.getElementById('textarea').style.height = document.getElementById('textarea').scrollHeight + 10 + 'px'
//      this.probeType = 3
//      this.listenScroll = true
    },
    methods: {
      submit: function (index) {
        let cmdGroup = {}
//        this.$refs.cmdInput[index].readOnly = true
        this.request = this.$refs.cmdInput[0].innerHTML
        console.log(this.request)
        this.$refs.response[0].innerHTML = this.request
        this.groups.push(cmdGroup)
      },
      changeHeight() {
        this.$refs.cmdInput.clientHeight = this.$refs.cmdInput.scrollHeight + 'px'
      },
      propertychange() {
        this.$refs.cmdInput.clientHeight = this.$refs.cmdInput.scrollHeight + 'px'
      },
      refresh(maxScrollY) {
        console.log('maxScrollY=======  ' + maxScrollY)
        let contentHeight = this.$refs.wrapperHook.clientHeight
        console.log('contentHeight=======  ' + contentHeight)
        if (contentHeight > maxScrollY) {
          this.$refs.scroll.refresh()
          console.log('refresh。。。')
        }
      },
      toggleShowInfo() {
        this.isShow = !this.isShow
      },
      selectTab(type) {
        this.selectType = type
      }
    },
    watch: {
      request(newVal) {
        console.log(newVal)
        if (newVal.length > 60) {
          window.alert('da yu 60 le')
        }
//        this.$http.get('/someUrl', {requ: newVal}).then((response) => {
//          this.$refs.response[index].innerHTML = response.data
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
      },
      counter(index) {
        let cmdGroup = {}
        let currIndex = index - 1
//        this.$refs.cmdInput[currIndex].removeAttribute('contenteditable')
        this.request = this.$refs.cmdInput[currIndex].value
        this.$refs.response[currIndex].innerText = this.request
        this.groups.push(cmdGroup)
      }
    },
    components: {
      Scroll
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
      /*border: 1px solid #b5d592*/
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
                width: 94%
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
                border: 1px solid #ffbe00
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
