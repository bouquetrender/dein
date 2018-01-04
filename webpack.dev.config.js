const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { baseConfig } = require("./webpack.config.js");

const PUBLIC_PATH = "http://localhost:3004/";
const PORT = 3004;

const devConfig = {
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?" + PUBLIC_PATH,
    "webpack/hot/only-dev-server",
    "./src/entry"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    host: "localhost",
    port: PORT,
    historyApiFallback: true,
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    }
  }
};

module.exports = Object.assign(baseConfig, devConfig);
