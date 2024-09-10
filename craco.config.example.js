const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@core': path.resolve(__dirname, 'src/core/'),
            '@framework': path.resolve(__dirname, 'src/framework/'),
        },
    },
    devServer: {
        port: 5000,
    },
};
