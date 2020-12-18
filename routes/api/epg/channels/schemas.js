const { event } = require('../events/schemas')
const Channel = {
    title: 'Channel',
    $id: 'Channel',
    type: 'object',
    properties: {
        media:{
            type: 'object',
            properties: {
                image: { type: 'string' },
                image_base_horizontal: { type: 'string' },
                backgroundPhoto: { type: 'string'}
            }
        },
        _id: { type: 'string' },
        id: { type: 'string' },
        number: { type: 'string' },
        name: { type: 'string' },
        hd: { type: 'boolean' },
        group_id: { type: 'string' },
        title_uri: { type: 'string' },
        title_original: { type: 'string' },
    }   
}

const Channels = {
    title: 'Channels',
    $id: 'Channels',
    type: 'array',
    items: {
        $ref: 'Channel#'
    }
}

const ChannelWithEvents = {
    title: 'Channel with events',
    $id: 'ChannelWithEvents',
    type: 'object',
    properties: {
        media:{
            type: 'object',
            properties: {
                image: { type: 'string' },
                image_base_horizontal: { type: 'string' },
                backgroundPhoto: { type: 'string'}
            }
        },
        _id: { type: 'string' },
        id: { type: 'string' },
        number: { type: 'string' },
        name: { type: 'string' },
        hd: { type: 'boolean' },
        group_id: { type: 'string' },
        title_uri: { type: 'string' },
        title_original: { type: 'string' },
        events: {
            type: 'array',
            items: {
                properties: event.properties
            }
        }
    }   
    
}

const ChannelsWithEvents = {
    title: 'Channels with events',
    $id: 'ChannelsWithEvents',
    type: 'array',
    items: {
        $ref: 'ChannelWithEvents#'
    }
}




// ENDPOINT SERILIZATION --------------------------------------

const channelSchema = {
    schema: {
        description: 'Obtain an Array of Channels, optional filters: limit, skip, s[asc, desc]',
        tags: ['Channels'],
        summary: 'Get Channels',
        querystring: {
            limit: { type: 'integer' },
            skip: { type: 'integer' },
            s: { type: 'string', enum: ["asc", "desc"] }
        },
        response: {
            // The 200 body response is described
            // by the following schema
            200: {
                $ref: 'Channels#'
            }
        }
    }
}

const channeByIdSchema = {
    schema: {
        description: 'Obtain a Channel by title',
        tags: ['Channels'],
        summary: 'Get channel By title',
        params:{
            title_uri: { type: 'string' }
        },
        response:{
            200: {
                $ref: 'Channel#'
            },
            500: {
                type: 'object',
                properties: {
                    
                    statusCode: {type: 'integer'},
                    error: {type: 'string'},
                    message: {type: 'string'}
                }
            }
        }
    }
}

const channelsWithEventsSchema = {
    schema: {
        description: 'Obtain array of channels with events from now to 12 hours to go',
        tags: ['Channels and envents'],
        summary: 'Get Channels with events',
        querystring: {
            limit: { type: 'integer' },
            skip: { type: 'integer' },
            s: { type: 'string', enum: ["asc", "desc"] }
        },
        response:{
            200: {
                $ref: 'ChannelsWithEvents#'
            }
        }
    }
}

const channelByTitleWithEventsSchema = {
    description: 'Obtain a channels with events from now to 12 hours to go',
    tags: ['Channels and envents'],
    summary: 'Get a Channel by title with events',
    params: {
        title_uri: {type: 'string'}
    },
    schema: {
        response:{
            200: {
                $ref: 'ChannelWithEvents#'
            }
        }
    }
}


module.exports = {
    Channel,
    Channels,
    channelSchema,
    channeByIdSchema,
    ChannelWithEvents,
    ChannelsWithEvents,
    channelsWithEventsSchema,
    channelByTitleWithEventsSchema
}