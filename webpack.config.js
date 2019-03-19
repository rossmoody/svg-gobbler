const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'extension'),
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            // creates a separate css file to inject
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
}
