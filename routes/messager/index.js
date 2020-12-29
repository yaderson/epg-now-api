const redis = require("../../services/redis")

module.exports = async function (fastify, opts) {
    fastify.get('/', async (request, reply) => {
        const {message} = request.query
        redis.publish('task/message', JSON.stringify({message} || { message: 'Empty Message'}))
        reply.send({
            ok: true
        })
    })
}