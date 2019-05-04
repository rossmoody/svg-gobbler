const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'extension/dist')
  },
  node: {
    fs: 'empty' // webpack doesn't like fs or require modules and errors without this
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css' // needed to export separate css file to inject
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // needed to correctly load svgo fs.readFileSync()
        include: path.resolve('node_modules', 'svgo'), // limits to only svgo dep
        loader: 'transform-loader?brfs' // adds transform-loader, brfs dependencies
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // creates a separate css file
          },
          'css-loader', // translates CSS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  }
}
