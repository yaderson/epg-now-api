const fs = require('fs')
const path = require('path')


module.exports = {
    devConfig: {
        https: {
            key: fs.readFileSync(path.join(__dirname, '/ssl/private.key')),
            cert: fs.readFileSync(path.join(__dirname, '/ssl/certificate.cert'))
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