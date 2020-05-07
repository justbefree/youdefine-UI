/*
* @Author: Just be free
* @Date:   2020-05-06 14:45:16
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-07 15:47:03
* @E-mail: justbefree@126.com
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].css`
      })
    ]
  },
  css: {
    extract: false
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .include
  //     .add('/src/components/index.js')
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  //     .tap(options => {
  //       // 修改它的选项...
  //       return options
  //     })
  // },
  pages: {
    examples: {
      entry: "examples/main.js",
      template: "examples/example.html",
      filename: "example.html",
      title: "Examples for YD components"
    }
  }
};
