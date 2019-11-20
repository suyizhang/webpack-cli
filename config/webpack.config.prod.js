// const webpack = require("webpack");

const path = require("path");

const merge = require('webpack-merge');

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理输出文件夹

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const baseWebpackConfig = require('./webpack.config.base');


const resolve = dir => path.join(__dirname, "../", dir);

module.exports = merge(baseWebpackConfig, {
  mode: "production", // 生产模式

  devtool: "source-map", // source-map

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve("dist/index.html"),
      template: resolve("static/index.html")
    }),

    new CleanWebpackPlugin(), // 清空输出文件夹

    new BundleAnalyzerPlugin(),

    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.(scss|css)$/g
    })
  ],

  //splitChunks 默认配置
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      // name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        styles: {
          name: "styles",
          test: /\.(scss|css)$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
});
