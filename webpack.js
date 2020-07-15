const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    main: './src/scripts/create-ui.js',
    gather: './src/scripts/controller.js',
  },
  mode: 'production',
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, 'public/extension/dist'),
    libraryTarget: 'umd',
    library: 'gobble',
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('node_modules', 'svgo'),
        loader: 'transform-loader?brfs',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts'),
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
