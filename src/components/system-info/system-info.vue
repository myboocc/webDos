<template>
  <div class="systemInfo">
    <Info text="系统信息" ref="popWindow" confirmBtnText="确定">
      <div class="info">
        <p>这里是系统消息的一些信息</p>
      </div>
    </Info>
  </div>
</template>

<script type="text/ecmascript-6">
  import Info from 'base/info/info'
  export default {
    methods: {
      show() {
        this.$refs.popWindow.show()
      }
    },
    components: {
      Info
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .info
    text-align: center
    margin-bottom: 20px
</style>
