const HtmlWebpackPlugin = require("html-webpack-plugin"); // 根据模板生成 HTML
const path = require("path");

const resolve = dir => path.join(__dirname, "../", dir);

module.exports = {
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
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          require.resolve("style-loader"),
          require.resolve("css-loader"),
          require.resolve("postcss-loader"),
          {
            loader: require.resolve("less-loader"),
            options: {
              modules: false,
              modifyVars: {
                // "@primary-color": "#f9c700"
              }
            }
          }
        ]
      },

      // {
      //   test: /\.scss/,
      //   use: [
      //     require.resolve("style-loader"),
      //     {
      //       loader: require.resolve("css-loader"),
      //       options: {
      //         importLoaders: 2
      //       }
      //     },
      //     require.resolve("postcss-loader"),
      //     require.resolve("sass-loader")
      //   ],
      //   exclude: /node_modules/,
      //   include: resolve("src")
      // },

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
    })
  ]
};
