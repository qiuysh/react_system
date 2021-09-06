const merge = require("webpack-merge");
const base = require("./base.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const os = require("os");

module.exports = merge(base, {

  mode: "production",

  // devtool: "cheap-module-source-map",
  
  optimization: {
    // runtimeChunk: true,
    minimizer: [
      // 用于配置 minimizers 和选项
      new TerserPlugin({
        // 加快构建速度
        cache: true,
        // 开启多线程
        parallel: os.cpus().length - 1,
        extractComments: false,
        terserOptions: {
          format: {
            // 删除注释
            comments: false,
          },
          output: { 
            comments: false 
          },
          // 打包时将无用代码去除
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
            reduce_vars: true,
          }
        }
      }),

      new OptimizeCSSAssetsPlugin({}),
    ],
    
    splitChunks: {
      minSize: 100000,
      maxSize: 300000,
      chunks: "all",
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          chunks: "all",
          priority: 10,
          enforce: true,
        },
        default: {
          name: 'vendors-ui', // 打包后的文件名
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          chunks: 'initial',
          priority: 20,
          enforce: true,
          reuseExistingChunk: true
        },
        common: {
          name: 'chunk-common',
          chunks: 'initial',
          priority: -2,
          minChunks: 2, // 重复2次才能打包到此模块
          enforce: true,
          reuseExistingChunk: true
        },
      },
    },
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "assets/styles/[name].[chunkhash:8].css"
    }),
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),

    new webpack.HashedModuleIdsPlugin(), // 实现持久化缓存
  ],
});
