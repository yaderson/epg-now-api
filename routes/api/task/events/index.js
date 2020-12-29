'use strict'

// const { saveEvents } = require('../../../../services/workers')

const redis = require('../../../../services/redis') 
const { getLasReport } = require('../../../../services/task')

function timeDuration(dateBeging, dateEnd){
  let seconds = (dateEnd - dateBeging)/1000
  let hoursf = Math.floor(seconds/3600)
  let hours = Math.floor(seconds/3600)
  return hours
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    const report = await getLasReport()
    const started_date = new Date()
    console.log(report)
    if(!report) {
      redis.publish('task/events',JSON.stringify({started_date}))
      return reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
    }
    
    if(timeDuration(new Date(report.started_date), new Date()) > 12){
      redis.publish('task/events',JSON.stringify({started_date}))
      reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
    }


    reply.send({message: `Task Was started unsuccessful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: false})
    

    // redis.publish('task/events',JSON.stringify({started_date}))
    // reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
  })
}