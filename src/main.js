import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'

// Vue.config.productionTip = false
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
