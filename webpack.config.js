/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /tests/],
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@api': path.resolve(__dirname, 'src/api/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@constants': path.resolve(__dirname, 'src/constants')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        })
    ],
    devServer: {
        host: '0.0.0.0',
        hot: true,
        inline: true,
        port: 3000,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};