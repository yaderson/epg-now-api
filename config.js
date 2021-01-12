const fs = require('fs')
const path = require('path')


module.exports = {
    devConfig: {
        logger: {
            prettyPrint: true
        },
        pluginTimeout: 10000
    },

    prodConfig: {
        logger: true,
        pluginTimeout: 10000
    }
}