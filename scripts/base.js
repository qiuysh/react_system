const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: path.join(__dirname, "../src/app.tsx"),
  },

  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    filename: !isProd ? "[name].bundle.js" : "[name].[chunkhash:8].js",
    chunkFilename: !isProd ? "[name].bundle.js" : "[name].chunk_[chunkhash:8].js",
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
        exclude: /node_modules\/(!antd)/,
        use: [
          !isProd
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
          !isProd
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
        include: path.join(__dirname, "../public"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
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
      title: "Leekbox",
      filename: "index.html",
      template: path.join(
        __dirname,
        "..",
        "public",
        "index.html",
      ),
      favicon: path.join(
        __dirname,
        "..",
        "public",
        "images",
        "favicon.ico",
      ),
      inject: "body",
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
      "@public": path.join(__dirname, "../public"),
    },
  },
};
