const {media} = require("../media/schemas")

const event = {
    title: 'Event',
    $id: 'Event',
    type: 'object',
    properties: {
        channel_id: { type: 'string' },
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        talent: { type: 'string' },
        date_begin: { type: 'string' },
        date_end: { type: 'string' },
        ext_eventimage_name_base: { type: 'string' },
        ext_year: { type: 'string' },
        ext_original_name: { type: 'string' },
        dvb_content: { type: 'string' },
        tmdb_id: {type: 'string'},
        tmdb_media_type: { type: ['string', 'null']},
        tmdb_media: {
            type: ['object', 'null'],
            properties: media.properties
        }
    }
}
// properties:{
//     adult: {type: 'boolean'},
//     backdrop_path: { type: 'string'},
//     homepage: { type: 'string'},
//     id: { type: 'string'},
//     imdb_id: { type: 'string'},
//     original_title: { type: 'string'},
//     overview: { type: 'string'},
//     poster_path: { type: 'string'},
//     release_date: { type: 'string'},
//     tagline: { type: 'string'},
//     title: { type: 'string'},
//     vote_average: { type: 'string'}
// }
const events = {
    title: 'Events',
    $id: 'Events',
    type: 'array',
    items: {
        $ref: 'Event#'
    }
}
//----------------------
const eventsByTitleSchema = {
    description: 'Obtain Events by title',
    tags: ['events'],
    summary: 'Get events by title',
    schema: {
        params: {
            channel_id: { type: 'string'}
        },
        response: {
            200: {
                $ref: 'Events#'
            }
        }
    }
}

const allEvents = {
    schema: {
        description: 'Obtain all Events',
        tags: ['events'],
        summary: 'Get all events',
        querystring: {
            limit: { type: 'integer' },
            skip: { type: 'integer' },
            s: { type: 'string', enum: ["asc", "desc"], message: { required: 'Allowed values asc, desc'} }
        },
        response: {
            200: {
                $ref: 'Events#'
            }
        }
    }
}


const getPlayingNowByMtypeScoreSchema = {
    schema: {
        description: 'Obtain top by media :type',
        querystring: {
            limit: { type: 'integer'}
        }
    }
}

module.exports = {
    event,
    events,
    eventsByTitleSchema,
    allEvents,
    getPlayingNowByMtypeScoreSchema
}