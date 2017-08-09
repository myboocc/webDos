<template>
  <transition name="slide">
    <div class="dos">
      <div class="topWrapper">
        <i class="icon icon-play2"></i>
        <i class="icon icon-reply"></i>
        <span class="send">发送</span>
        <i class="icon icon-circle-left floatRight slideInfoBtn" :class="{'active': toggleInfoBtn}" @click="toggleShowInfo"></i>
      </div>
      <div class="commandWrapper">
        <div ref="scroll" class="command" :pullup="pullup" @scrollToEnd="refresh">
          <div>
            <div class="wrapperHook" ref="wrapperHook">
              <div class="item" v-for="(group,index) in groups">
                <div class="cmdWrapper">
                  <div class="cmd">
                    <span>[root@root]></span>
                  </div>
                  <div class="cmdInputWrapper">
                    <input type="text" @keyup.enter="submit(index)" class="cmdInput" ref="cmdInput" v-focus>
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
            <span class="item-tab">信息</span>
            <span class="item-tab">历史</span>
            <span class="item-tab">快捷</span>
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
            <span class="clear">清屏</span>
            <span class="zhuxiao">注销</span>
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
        response: ''
      }
    },
    computed: {
      toggleInfoBtn() {
        return this.isShow === true ? 'active icon-circle-right' : ''
      }
    },
//    created() {
//      this.probeType = 3
//      this.listenScroll = true
//    },
    methods: {
      submit: function (index) {
        let cmdGroup = {}
        this.$refs.cmdInput[index].readOnly = true
        this.request = this.$refs.cmdInput[index].value
        this.$refs.response[index].innerHTML = this.request
        this.groups.push(cmdGroup)
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
      }
    },
    watch: {
      request(newVal) {
        console.log(newVal)
//        this.$http.get('/someUrl', {requ: newVal}).then((response) => {
//          this.$refs.response[index].innerHTML = response.data
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
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
              flex: 0 0 90px
              width: 90px
            .cmdInputWrapper
              flex: 1
              .cmdInput
                width: 100%
                background-color: transparent
                border: 0
                color: #fff
                outline: none
                font-size: 14px
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
</style>
