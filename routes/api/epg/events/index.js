'use strict'
const schemas = require('./schemas')
const { 
  getEventsByChannelId, 
  getAllEventsByChannelId, 
  getAllEvents, 
  getEventsPlaying,
  getPlayingNowByMtype,
  getPlayingNowByMtypeScore
} = require('../../../../services/events')

module.exports = async function (fastify, opts) {
  fastify.addSchema(schemas.event)
    .addSchema(schemas.events)

  fastify.get('/', schemas.allEvents, async function(request, reply){
    const  { skip, limit, s } = request.query
    reply.send(await getAllEvents(skip, limit, s))
  })
  fastify.get('/:channel_id', schemas.eventsByTitleSchema, async function(request, reply){
    const  { channel_id } = request.params
    reply.send(await getEventsByChannelId(channel_id))
  })

  fastify.get('/all/:channel_id', schemas.eventsByTitleSchema, async function(request, reply){
    const  { channel_id } = request.params
    reply.send(await getAllEventsByChannelId(channel_id))
  })

  fastify.get('/playing', async function(request, reply){//TODO: schema
    const { limit, skip, sort } = request.query
    reply.send(await getEventsPlaying(Number(limit)|| 30, Number(skip) || 0, sort || 'desc'))
  })

  fastify.get('/live/:mediaType', async function(request, reply){
    const { mediaType } = request.params
    reply.send(await getPlayingNowByMtype(mediaType))
  })

  fastify.get('/live/score/:mediaType', async function(request, reply){//TODO: schema
    const { mediaType } = request.params
    reply.send(await getPlayingNowByMtypeScore(mediaType))
  })
}
