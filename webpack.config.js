const path = require("path");
const webpack = require("webpack");
const node_modules = path.resolve(__dirname, "node_modules");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = process.env.NODE_ENV;

function resolve (dir) {
  return path.join(__dirname, dir);
}

const extractPlugin = new ExtractTextPlugin({
  filename: "[name].[chunkhash].css",
  ignoreOrder: true, //禁用顺序检查
  allChunks: true
});

let cssrule = null

// 开发环境 不分离css文件
const dev_cssRule = [
  {
    test: /\.scss$/,
    include: resolve("./src"),
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[name]__[local]--[hash:base64:5]",
          Composing: true,
          sourceMap: true,
          importLoaders: 1
        }
      },
      { loader:"postcss-loader", options: { sourceMap: true } },
      { loader:"sass-loader", options: { sourceMap: true } }
    ]
  },
  {
    test: /\.css$/,
    include: resolve("./src"),
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[name]__[local]--[hash:base64:5]",
          Composing: true,
          sourceMap: true,
          importLoaders: 1
        }
      },
      { loader:"postcss-loader", options: { sourceMap: true } },
    ]
  }
]

// 开发环境 分离css文件
const prod_cssRule = [
  {
    test: /\.scss$/,
    include: resolve("./src"),
    use: extractPlugin.extract({
      use: [
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
            Composing: true,
            sourceMap: true,
            importLoaders: 1
          }
        },
        { loader: "postcss-loader" },
        { loader: "sass-loader" }
      ],
      fallback: "style-loader"
    })
  },
  {
    test: /\.css$/,
    include: resolve("./src"),
    use: extractPlugin.extract({
      use: [
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
            Composing: true,
            sourceMap: true,
            importLoaders: 1
          }
        },
        { loader: "postcss-loader" },
      ],
      fallback: "style-loader"
    })
  },
]

env === "development" ? (cssrule = dev_cssRule) : (cssrule = prod_cssRule)

const baseConfig = {
  resolve: { 
    extensions: [".jsx", ".js", ".json", ".scss", ".css"],
    alias: {
      '@': resolve('./src'),
    }
  },
  module: {
    rules: [
      ...cssrule,
      {
        loader: "eslint-loader",
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: resolve("./src"),
        use: {
          loader: "babel-loader?cacheDirectory=true",
        }
      },
      {
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader?classPrefix"
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      }
    ]
  }
}

module.exports = {
  baseConfig,
  extractPlugin
};
