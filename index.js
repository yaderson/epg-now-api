'use strict'

// Read the .env file.
require('dotenv').config()

//Config

const {devConfig, prodConfig} = require('./config')

// Require the framework
const Fastify = require('fastify')

// Instantiate Fastify with some config
console.log('Runnig on %o mode',process.env.NODE_ENV)
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig
const app = Fastify(config)

// Register your application as a normal plugin.
app.register(require('./app.js'))

// Start listening.
app.listen(process.env.PORT || 3000, '0.0.0.0',(err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})