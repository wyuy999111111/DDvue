import Vue from 'vue'
import axios from 'axios'

const axiosservice = axios.create({
  // baseURL: 'http://192.168.1.127:8007',
  timeout: 50000,
  withCredentials: true
})

axiosservice.interceptors.request.use(
  config => {
    config.headers.common = {
      // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'X-Requested-With': 'XMLHttpRequest'
    }
    return config
  },
  error => Promise.reject(error)
)
axiosservice.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let msg = '未知错误，请刷新页面或重新登录'
    if (error.response.status === 500) {
      msg = '服务器错误'
    } else if (error.response.status === 401) {
      msg = '没有权限'
      // const url = location.host
      // window.location.href = `http://${url}/sit-web/logout`
    } else if (error.response.status === 101) {
      const url = location.host
      window.location.href = `http://${url}/sit-web/logout`
    }
    Vue.prototype.$message({
      message: msg,
      type: 'error',
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default axiosservice
