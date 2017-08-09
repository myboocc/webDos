<template>
  <transition name="slide">
    <div class="dos">
      <div class="topWrapper">
        <i class="icon icon-play2"></i>
        <i class="icon icon-reply"></i>
        <span>发送</span>
      </div>
      <div class="command" v-for="(group,index) in groups">
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
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        message: 'Hello Vue!',
        groups: [{}],
        request: '',
        response: ''
      }
    },
    methods: {
      submit: function (index) {
        let cmdGroup = {}
        this.$refs.cmdInput[index].readOnly = true
        this.request = this.$refs.cmdInput[index].value
        this.$refs.response[index].innerHTML = this.request
        this.groups.push(cmdGroup)
      }
    },
    watch: {
      request(newVal) {
        console.log(newVal)
        this.$http.get('/someUrl', {requ: newVal}).then((response) => {
//          this.$refs.response[index].innerHTML = response.data
        })
          .catch(function (response) {
            console.log(response)
          })
      }
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
    height: 100%
    color: #fff
    overflow: hidden
    background: $color-background
    .command
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
</style>
