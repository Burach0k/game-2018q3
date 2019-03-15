const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    game: "./src/app.js",
    landingPage: "./src/landingPage/landingPage.js"
  },
  output: {
    publicPath: "",
    filename: "./[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.eot$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: "file-loader",
            options: {
              regExp: /(\\src\\)(\S+)(\\\S+\.\S+)/,
              name: "[2]/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              regExp: /(\\src\\)(\S+)(\\\S+\.\S+)/,
              name: "[2]/[name].[ext]",
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./data/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      allChunks: true,
      enforce: true
    }),
    new CleanWebpackPlugin("./dist", {}),
    new HtmlWebpackPlugin({
      chunks: ["game"],
      filename: "/game.html",
      template: "src/template/template.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["landingPage"],
      excludeChunks: ["finalGame/dist/"],
      filename: "/index.html",
      template: "src/landingPage/landingPage.html"
    }),

    new CopyWebpackPlugin([
      {
        from: "src/screens/",
        to: "screens/"
      },
      {
        from: "src/sounds/",
        to: "sounds/"
      }
    ])
  ]
};
