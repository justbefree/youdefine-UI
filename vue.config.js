/*
* @Author: Just be free
* @Date:   2020-05-06 14:45:16
* @Last Modified by:   Just be free
* @Last Modified time: 2020-06-15 19:11:12
* @E-mail: justbefree@126.com
*/
process.env.VUE_APP_VERSION = require('./package.json').version;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].css`
      })
    ],
    performance: {
      hints: false
    }
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  },
  pages: {
    examples: {
      entry: "examples/main.js",
      template: "examples/example.html",
      filename: "example.html",
      title: "Examples for YD components"
    }
  }
};
