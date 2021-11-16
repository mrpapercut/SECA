const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
    entry: './src/app.ts',
    mode: env && env.production ? 'production' : 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        env && env.production ? new Dotenv({
            systemvars: true
        }) : new Dotenv({
            path: '../.env'
        })
    ]
});
