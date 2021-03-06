'use strict'

// const { saveEvents } = require('../../../../services/workers')

const redis = require('../../../../services/redis') 
const { getLasReport } = require('../../../../services/task')
const { taskSchema } = require('./schema')

function timeDuration(dateBeging, dateEnd){
  let seconds = (dateEnd - dateBeging)/1000
  let hoursf = Math.floor(seconds/3600)
  let hours = Math.floor(seconds/3600)
  return hours
}

module.exports = async function (fastify, opts) {
  fastify.get('/', {taskSchema},async function (request, reply) {
    const { days } = request.query

    const report = await getLasReport()
    const started_date = new Date()

    if(days == 0){//Default hours is: 24
      if(timeDuration(new Date(report.started_date), new Date()) > 12){
        redis.publish('task/events',JSON.stringify({started_date, days, last_to_event_fetch: report.last_to_event_fetch}))
        return reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
      }
    }

    console.log(report)
    if(!report) {
      redis.publish('task/events',JSON.stringify({started_date, days}))
      return reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
    }
    
    if(timeDuration(new Date(report.started_date), new Date()) > 12){
      redis.publish('task/events',JSON.stringify({started_date, days}))
      return reply.send({message: `Task Was started successful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: true})
    }


    reply.send({message: `Task Was started unsuccessful at (${started_date}) report will send to admin@yader.dev and telegram @epgNow`, success: false})
  
  })
}