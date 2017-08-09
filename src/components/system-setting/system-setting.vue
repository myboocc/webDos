<template>
  <div class="systemSetting">
    <Info text="系统设置" ref="popWindow" confirmBtnText="确定">
      <div class="settingForm">
        <input type="text" value="10.3.20.8">
        <input type="text" value="345">
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
  .settingForm
    text-align: center
    margin-bottom: 10px
    input
      width: 70%
      padding: 5px
      margin-bottom: 10px
</style>
