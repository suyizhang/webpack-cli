const webpack = require("webpack");

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理输出文件夹

const resolve = dir => path.join(__dirname, "../", dir);

module.exports = {
  mode: "development", // 开发模式

  devtool: "cheap-module-source-map", // source-map

  entry: {
    app: resolve("index.js")
  },

  output: {
    filename: "[name]-[hash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    path: resolve("dist"),
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        // options: {
        //   presets: ["@babel/preset-env", "@babel/preset-react"], // jsx转为js函数
        //   plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
        // }
      },

      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
        include: resolve("src")
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },

      {
        test: /\.svg/,
        use: [
          {
            loader: "svg-inline-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve("dist/index.html"),
      template: resolve("static/index.html")
    }),

    new CleanWebpackPlugin(), // 清空 输出目录原始文件

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    // dev server
    // 使用 node 运行该文件时 devServer失效
    host: "localhost",
    open: true
  }
};
