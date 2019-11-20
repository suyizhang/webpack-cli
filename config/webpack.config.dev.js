const webpack = require("webpack");

const merge = require('webpack-merge');

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理输出文件夹
const baseWebpackConfig = require('./webpack.config.base');

const resolve = dir => path.join(__dirname, "../", dir);

module.exports = merge(baseWebpackConfig, {
  mode: "development", // 开发模式

  devtool: "cheap-module-source-map", // source-map

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve("dist/index.html"),
      template: resolve("static/index.html")
    }),
    // 清空 输出目录原始文件
    new CleanWebpackPlugin(),
    // 热模块替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 使用模块的路径，而不是数字标识符作为ID，避免解析顺序引起的 hash 变化
    new webpack.NamedModulesPlugin(),
    // 编译出现错误时,跳过输出阶段,确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    // dev server
    host: "localhost",
    open: true
  }
});
