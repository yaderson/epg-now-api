'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  //fastify.register(require('fastify-helmet'))
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'Epg-now Swagger DOC',
        description: 'epg now swager docs v0.0.1',
        version: '0.0.1'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true,
    routePrefix: '/documentation'
  })
  fastify.register(require('fastify-cors'), {
    origin: ['localhost','https://epg-now.web.app'],
    //'access-control-allow-origin': '*'
  })
  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  
  // This loads all plugins defined in routes
  // define your routes in one of these
  
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
