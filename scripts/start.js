const webpack = require("webpack");

const webpackDevServer = require("webpack-dev-server");

const config = require("../config/webpack.config.dev");
// 获取devServer基本配置
const devServerOptions = Object.assign({}, config.devServer, {
  // 是否打开默认浏览器
  open: true,
  // 启用gzip
  compress: true,

  contentBase: "./dist",

  stats: {
    colors: true
  },

  publicPath: "/",
  // 文件更改将触发整个页面重新加载
  watchContentBase: true,
  // 启动模块热更新
  hot: true,

  host: "localhost"
});
// node启动 热更新 需配置该项
webpackDevServer.addDevServerEntrypoints(config, devServerOptions);

const compiler = webpack(config);

const devServer = new webpackDevServer(compiler, devServerOptions);

devServer.listen(8080, "localhost", () => {
  console.log("listen to 8080!");
});
