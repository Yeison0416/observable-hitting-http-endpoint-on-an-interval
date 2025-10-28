const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        watchFiles: './src/**/*.html',
        static: './dist',
        port: 8080, // <— define a port
        open: true, // <— auto open browser
        hot: true, // <— enable HMR
        client: {
            overlay: true, // <— show build errors in the browser
        },
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                    {
                        loader: 'sass-loader',
                        options: { api: 'modern-compiler', sourceMap: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});
