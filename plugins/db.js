'use strict'

const fp = require('fastify-plugin')
const { startDB } = require('../services/db')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    await startDB()
    fastify.log.info('Data Base is connected!!')
})