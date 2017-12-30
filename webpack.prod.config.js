const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OfflinePlugin = require("offline-plugin")
const { baseConfig, extractPlugin } = require("./webpack.config.js");
const Clean = require("clean-webpack-plugin");

const prodConfig = {
  entry: {
    app: path.resolve(__dirname, "src/entry")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  plugins: [
    extractPlugin,
    new Clean(path.resolve(__dirname, "dist")),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.png')
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      beautify: false,
      sourceMap: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        return module.resource && /node_modules/.test(module.resource)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client',
      async: 'chunk-vendor',
      children: true,
      minChunks: (module, count) => {
        return count >= 3
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime",
      minChunks: Infinity
    }),
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: '/'
      },
    })
  ]
};

module.exports = Object.assign(baseConfig, prodConfig);
