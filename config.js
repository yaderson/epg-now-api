const fs = require('fs')
const path = require('path')


module.exports = {
    devConfig: {
        https: {
            http2: true,
            port: 8443,
            key: fs.readFileSync(path.join(__dirname, '/ssl/private.key')),
            cert: fs.readFileSync(path.join(__dirname, '/ssl/yader_dev.crt'))
        },
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