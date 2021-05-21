import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'swiper/swiper-bundle.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

window.addEventListener('popstate', function () {
  history.pushState(null, null, document.URL)
})

// Vue.filter('NumFormat', function (value) {
//   if (!value) return ' '
//   var intPart = Number(value).toFixed(0)
//   var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
//   return intPartFormat
// })

Vue.filter('fixNumber', function (value) {
  var reg = /\d(?=(\d{3})+$)/g
  if (value < 10000) {
    let integer = value + ''
    integer = integer.replace(reg, (content) => {
      return content + ','
    })
    return integer
  } else if (value < 100000000) {
    let integer = parseInt(value % 100000000 / 10000) + ''
    integer = integer.replace(reg, (content) => {
      return content + ','
    })
    let decimals = (value % 10000 / 10000)
    if (decimals === 0) {
      decimals = '' + '万'
    } else {
      decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
    }
    if (integer === 0) {
      integer = ''
    }
    return integer + decimals
  } else if (value > 100000000) {
    let yi = parseInt(value / 100000000) + ''
    yi = yi.replace(reg, (content) => {
      return content + ','
    })
    let integer = parseInt(value % 100000000 / 10000) + ''
    integer = integer.replace(reg, (content) => {
      return content + ','
    })
    let decimals = (value % 10000 / 10000)
    if (decimals === 0) {
      decimals = ''
    } else {
      decimals = '.' + String(decimals.toFixed(2)).split('.')[1] + '万'
    }
    if (integer === 0) {
      integer = ''
    }
    return yi + '亿' + integer + decimals
  }
})

Vue.filter('oldNumber', function (value) {
  if (Math.abs(value) >= 10000) {
    var reg = /\d(?=(\d{3})+$)/g
    var str = (value / 10000) + ''
    if (str.indexOf('.') === -1) {
      str = str.replace(reg, (content) => {
        return content + ','
      })
      return str + '万'
    } else {
      var head = str.split('.')[0]
      var tail = str.split('.')[1].slice(0, 2)
      head = head.replace(reg, (content) => {
        return content + ','
      })
      return head + '.' + tail + '万'
    }
  } else if (Math.abs(value) >= 1000) {
    const str = value + ''
    const obj = str.slice(0, 1) + ',' + str.slice(1, 4)
    return obj
  } else {
    return value
  }
})

Vue.filter('ellipsis', function (value) {
  if (!value) {
    return ''
  }
  if (value.length > 4) {
    return value.slice(0, 4) + '...'
  } else {
    return value
  }
})

Vue.filter('ellipsisSmall', function (value) {
  if (!value) {
    return ''
  }
  if (value.length > 8) {
    return value.slice(0, 8) + '...'
  } else {
    return value
  }
})
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
