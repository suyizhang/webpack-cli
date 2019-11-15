const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev');

const devServerOptions = Object.assign({}, config.devServer, {

    open: true,

    compress: true, // 启用gzip

    contentBase: './dist',

    stats: {
        colors: true,
    },

    publicPath: '/',

    watchContentBase: true, // 文件更改将触发整个页面重新加载

    hot: true,// 启动模块热更新

    host: 'localhost',
});

webpackDevServer.addDevServerEntrypoints(config, devServerOptions); // node启动 热更新 需配置该项
 
const compiler = webpack(config);

const devServer = new webpackDevServer(compiler, devServerOptions);

devServer.listen(8080, 'localhost', () => {
    console.log('listen 8080 to beginning!');
})