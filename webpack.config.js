const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },{
                    loader: "sass-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: [ ".js", ".css", ".scss" ]
    }
};