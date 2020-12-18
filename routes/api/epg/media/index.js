'use strict'

const { addTmbdIdToAll } = require('../../../../services/events')
const { saveMedia, savedByTMDB, getByTitle } = require('../../../../services/media')
const schemas =  require('./schemas')

module.exports = async function (fastify, opts) {
    fastify.addSchema(schemas.media).addSchema(schemas.medias)

    fastify.get('/', schemas.geMedias,async function (request, reply) {
        
    })
    fastify.get('/:title', schemas.geMedias,async function (request, reply) {
        const { title } = request.params
        const media = await getByTitle(title)
        if(!media) throw new Error('Not Found')
        reply.send(media)
    })
    fastify.post('/',async function (request, reply){
        const { id, media_type, event_called } = request.body
        console.log(id, media_type, event_called)
        const savedMedia = await savedByTMDB(id, media_type, event_called)
        const allUpdated = await addTmbdIdToAll(savedMedia)

        reply.send(allUpdated)
    })
    // fastify.post('/update', async function (request, reply){
    //     const { name, media_type } = request.body
    // })
}