const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: path.join(__dirname, "../src/app"),
  },

  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    filename: devMode ? "[name].bundle.js" : "[name].[chunkhash:8].js",
    chunkFilename: devMode ? "[name].bundle.js" : "[name].chunk_[chunkhash:8].js",
  },

  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        include: path.join(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, "../src"),
        use: [
          devMode
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules\/(!antd)/,
        use: [
          devMode
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?[tv]=[\d.]+)*$/,
        include: path.join(__dirname, "../src"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images",
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              // 压缩 jpeg 的配置
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
              optipng: {
                enabled: false,
              },
              // 使用 imagemin-pngquant 压缩 png
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              // 压缩 gif 的配置
              gifsicle: {
                interlaced: false,
              },
              // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              webp: {
                quality: 75
              }
            }
          }
        ],
      },
      {
        test: /\.ejs$/,
        use: ["ejs-loader"],
      },
    ],
  },

  plugins: [

    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /(zh-cn).js/,
    ),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: function() {
          return [
            autoprefixer({
              browsers: ["last 2 version"],
            }),
          ];
        },
      },
    }),

    new HtmlWebpackPlugin({
      title: "wolin 3C",
      filename: "index.html",
      template: path.join(
        __dirname,
        "..",
        "src",
        "template.ejs",
      ),
      favicon: path.join(
        __dirname,
        "..",
        "src",
        "assets",
        "images",
        "favicon.ico",
      ),
      inject: false,
      minify: true
    }),

    new HardSourceWebpackPlugin(),
  ],

  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json"],
    mainFields: ['jsnext:main', 'browser', 'main'],
    alias: {
      "@components": path.join(__dirname, "../src/components"),
      "@pages": path.join(__dirname, "../src/pages"),
      "@utils": path.join(__dirname, "../src/utils"),
      "@assets": path.join(__dirname, "../src/assets"),
    },
  },
};
