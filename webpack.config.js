const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "./build");

const devMode = "development"

const allPlugins = [
  new CopyWebpackPlugin({
    patterns: [{ 
      from: 'src/pages',
      to: 'pages'
    }]
  }),

  new MiniCssExtractPlugin({
    filename: "styles.css",
  })
]

const mainConfig = {
  mode: devMode,
  target: 'electron-main',
  entry: './src/main.js',
  output: {
    path: buildPath,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: allPlugins
}

const preloadConfig = {
  mode: devMode,
  target: 'electron-preload',
  entry: './src/preload.js',
  output: {
    path: buildPath,
    filename: 'preload.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: allPlugins
}

const rendererConfig = {
  mode: devMode,
  target: 'electron-renderer',
  entry: './src/renderer.js',
  output: {
    path: buildPath,
    filename: 'renderer.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      }
    ]
  },
  plugins: allPlugins
}

module.exports = [mainConfig, preloadConfig, rendererConfig];
