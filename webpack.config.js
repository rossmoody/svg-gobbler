const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'extension/dist')
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './testing-site',
    hot: true,
    open: true
  },
  node: {
    fs: 'empty' // webpack doesn't like fs or require modules and errors without this
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css' // needed to export separate css file to inject
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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // es-2015
          }
        }
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
