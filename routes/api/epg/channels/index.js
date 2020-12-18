'use strict'

const { getAllChannels, getChannelById, getAllChannelsWithEvents, getChannelByTitleWithEvents } = require('../../../../services/channels')
const schemas = require('./schemas')

module.exports = async function (fastify, opts) {
    fastify.addSchema(schemas.Channel)
        .addSchema(schemas.Channels)
        .addSchema(schemas.ChannelWithEvents)
        .addSchema(schemas.ChannelsWithEvents)  
        
    fastify.get('/',schemas.channelSchema, async function (request, reply) {
        const { limit, skip, s } = request.query
        reply.send(await getAllChannels(limit || 0, skip || 0, s || 'asc'))
    })
    
    fastify.get('/:title_uri',schemas.channeByIdSchema, async function(request, reply){
        const { title_uri } = request.params
        reply.send(await getChannelById(title_uri))
    })

    fastify.get('/events', schemas.channelsWithEventsSchema, async function(request, reply){
        const { limit, skip, s } = request.query
        const data = await getAllChannelsWithEvents(limit || 0, skip || 0, s || 'asc')
        reply.send(data)
    })
    fastify.get('/events/:title_uri', schemas.channelByTitleWithEventsSchema, async function(request, reply){
        const  { title_uri } = request.params

        reply.send(await getChannelByTitleWithEvents(title_uri))
    })
}
