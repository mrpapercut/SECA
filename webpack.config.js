const path = require('path');

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
    }
});
