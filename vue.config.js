// var path = require('path')
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 16
})

module.exports = {
  publicPath: './',
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    proxy: {
      '/sit': {
        target:
        // 'http://10.100.124.119:8091', // /dh
        'http://10.100.125.91:8091', // zxxBU
        // 'http://10.1.14.76:8091', // fwq0
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/sit': '/sit'
        }
      }
    }
  },
  pwa: {
    iconPaths:
    {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  assetsDir: './',
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}
