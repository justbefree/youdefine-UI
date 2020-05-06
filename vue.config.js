/*
* @Author: Just be free
* @Date:   2020-05-06 14:45:16
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-06 16:04:05
* @E-mail: justbefree@126.com
*/
module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  css: {
    extract: true
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/src/components/index.js')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  pages: {
    examples: {
      entry: "src/examples/main.js",
      template: "src/examples/example.html",
      filename: "example.html",
      title: "Examples for YN components"
    }
  }
};
