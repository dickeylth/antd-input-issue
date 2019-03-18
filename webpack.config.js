const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入非 webpack 自带默认插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {

  const babelOptions = {
    presets: [
      ['@babel/preset-env', {
        "targets": ["last 2 Chrome versions", "iOS >= 12"],
        "modules": false,
      }],
      '@babel/preset-react',
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-proposal-decorators", {
        "legacy": true,
      }],
      ["@babel/plugin-proposal-class-properties", {
        "loose": true,
      }],
      ['babel-plugin-import', {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true,
      }],
      '@babel/plugin-proposal-export-default-from',
      "react-css-modules",
    ].concat(env.production ? [] : [
      "dva-core-hmr",
      // "dva-hmr",
      // "@babel/plugin-transform-runtime",
      // "react-hot-loader/babel",
    ]),
    cacheDirectory: true,
  };

  return {
    mode: env.development ? 'development' : 'production',
    context: path.resolve(__dirname),
    entry: {
      index: "./src/index.jsx",
    },
    output: {
      // webpack 如何输出结果的相关选项
      path: path.resolve(__dirname, "dist"), // string
      filename: '[id].[hash].bundle.js',
      chunkFilename: '[id].[chunkhash].async.js',
      "publicPath": '/',
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          // 只对项目根目录下的 src 目录中的文件采用 babel-loader
          include: path.resolve(__dirname, 'src'),
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: babelOptions,
          },
        },
        {
          test: /\.less$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: "style-loader",
          }, 'css-modules-typescript-loader', {
            loader: "css-loader",
            options: {
              modules: true,
            },
          }, {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          }],
        },
        {
          test: /\.less$/,
          include: /(node_modules|bower_components)/,
          use: [{
            loader: "style-loader",
          }, {
            loader: "css-loader",
            options: {
              modules: false,
            },
          }, {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          }],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          }],
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    target: "web",
    "devtool": "#source-map",
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      port: 8000,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
    plugins: [
      new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/,
      ]),
      new HtmlWebpackPlugin({
        template: "./src/index.ejs",
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].concat(env.development ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      // new MinifyPlugin(),
      // 构建优化插件
      new ExtractTextPlugin({
        filename: 'build.min.css',
        allChunks: true,
      }),
      // 编译时(compile time)插件
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    ]),
  }
};
