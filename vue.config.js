module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js'
    }

  },
  lintOnSave: false,//关闭语法检查
  // devServer: {
  //   proxy: 'http://localhost:5000'//这种方法会优先本地文件
  // }
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        //pathRewrite:{'^/api':''}//后台地址端口都带了api，不需要重写为空
         ws: false,
        // changeOrigin: true//用于控制请求头中的host值 true为端口5000 false为端口8080
      },
      
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
}