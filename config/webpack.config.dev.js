const webpack = require("webpack");

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理输出文件夹

const resolve = dir => path.join(__dirname, "../", dir);

module.exports = {
  mode: "development", // 开发模式
  devtool: "cheap-module-source-map", // source-map

  entry: {
    app: resolve("src/index.js")
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
        loader: require.resolve("babel-loader")

        // options: {
        //   presets: ["@babel/preset-env", "@babel/preset-react"], // jsx转为js函数
        //   plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
        // }
      },

      {
        test: /\.scss/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 2
            }
          },
          require.resolve("postcss-loader"),
          require.resolve("sass-loader")
        ],
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
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader"
      }
    ]
  },

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
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    // dev server
    host: "localhost",
    open: true
  }
};
