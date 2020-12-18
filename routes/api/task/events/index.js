'use strict'

const { saveEvents } = require('../../../../services/workers')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    saveEvents()
    reply.send({
      message: `Working on it now: < ${new Date()} > !! when then a emain will send to admin email with a report`,
    })
  })
}