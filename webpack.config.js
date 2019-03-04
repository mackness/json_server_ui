const path = require('path')
const _ = require('lodash')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const isProduction = process.argv.some(a => a === '--production');

const base = {
    devtool: isProduction ? 'none' : 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    externals: {
        electron: 'electron'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-typescript',
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-proposal-object-rest-spread'],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(otf|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: isProduction,
        minimizer: [
            new MinifyPlugin(undefined, {
                exclude: new RegExp('/[\\/]node_modules[\\/]/')
            })
        ],
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({ filename: 'index.css' })
    ],
}

const client = _.assign(
    {
        entry: './src/client/index.tsx',
        mode: 'development',
        target: 'web',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'client.bundle.js',
        },
    },
    base
)

const server = _.assign(
    {
        entry: './src/server/index.ts',
        mode: 'development',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.bundle.js',
        },
    },
    base
)

// module.exports = [
//     server,
//     client
// ];

module.exports = client
