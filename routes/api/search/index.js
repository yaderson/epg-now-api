'use strict'

const Media = require("../../../services/db/models/media")
const Events = require("../../../services/db/models/events")

module.exports = async function (fastify, opts) {
  
  fastify.get('/', async function (request, reply) {
    const { q } = request.query
    let results = await Media.aggregate(
      [
        {
          $search: {
            "index": "SearchIndex1",
            "text": {
              "query": q,
              "path": "event_called"
            }
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            event_called: 1,
            poster_path: 1,
            id: 1,
            overview: 1,
            t: "media"
          }
        }
      ]
    )
    const e = await Events.aggregate(
      [
        {
          $search: {
            "compound": {
              "must": [
                {
                  "phrase": {
                    "path": "name",
                    "query": q,
                  },
                },
                {
                  "range": {
                    "path": "date_end",
                    "gte": new Date()
                  }
                }
              ]
            } 
          }
        },
        {
          $sort: {
            date_begin: 1
          }
        },  
        {
          $limit: 10
        },
        {
          $project: {
            channel_id: 1,
            name: 1,
            date_begin: 1,
            description: 1,
            ext_eventimage_name_base: 1,
            date_end: 1,
            t: "evento",
            "score": { "$meta": "searchScore" }
          }
        }
      ]
    )
    const events = await Events.populate(e, {path: 'channel'})
    return [...results, ...events] 
  })
}
