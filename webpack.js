const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  mode: 'production',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'public/extension/dist'),
    library: 'gobble',
    libraryTarget: 'window',
    libraryExport: 'default',
  },
  node: {
    fs: 'empty', // webpack doesn't like fs or require modules and errors without this
  },
  // stats: 'minimal',
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css', // needed to export separate css file to inject
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts'),
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // creates a separate css file
          },
          'css-loader', // translates CSS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
}
