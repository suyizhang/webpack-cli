const webpack = require("webpack");
const config = require("../config/webpack.config.prod");

const compiler = webpack(config);

compiler.run((err, stats) => {

  if (err) {
    throw err;
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );
  
});
