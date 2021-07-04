const path = require('path')

module.exports = {
    entry: {
        build: './src/build/index.tsx',
        find: './src/find/index.tsx'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'extension/dist'),
        libraryTarget: 'umd',
        library: 'gobble',
    },
}