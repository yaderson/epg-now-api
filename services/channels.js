const mongoose = require("mongoose");

const Channel = require('./db/models/channel')
const Event = require('./db/models/events')
 

/**
 * 
 * @param {number} limit 
 * @param {number} skip
 * @param {string} sort - asc or desc
 * @returns {array} - array of channels 
 */
async function getAllChannels(limit, skip, sort){
    const channels = await Channel.find().limit(limit).skip(skip).sort({name: sort})
    return channels
}
/**
 * 
 * @param {string} title_uri - channelId
 */
async function getChannelById(title_uri){
    const channels = await Channel.findOne({title_uri})
    if(!channels){
        throw new Error(`The channel ${title_uri} doesn't exist`)
    }
    return channels
}

async function Bulk(channels){
    const ChannelsCreated = await Channel.insertMany(channels)
    return ChannelsCreated
}

async function getAllChannelsWithEvents(limit, skip, sort){
    const docs = await Channel.find()
    .limit(limit).skip(skip).sort({name: sort})
    .populate({path: 'events', match:{date_end: { $gte: new Date()}}, populate:{ path: 'tmdb_media'} });
    return docs
}

async function getChannelByIdWithEvents(id){
    const channel = await Channel.findOne({id}).populate({path: 'events', match:{date_end: { $gte: new Date()}} });
    if(!channel){
        throw new Error(`The channel id ${id} doesn't exist`)
    }
    return channel
}
async function getChannelByTitleWithEvents(title_uri) {
    const channel = await Channel.findOne({title_uri}).populate({path: 'events', match:{date_end: { $gte: new Date()} }, options: { sort: { date_begin: 'asc' } } ,populate:{ path: 'tmdb_media'}});
    if(!channel){
        throw new Error(`The channel ${title_uri} doesn't exist`)
    }
    return channel
}

async function createNewChannel(channel){
    const newC = new Channel(channel)
    const createdChannel = await newC.save()
    return createdChannel
}

async function createNewEvent(event){
    const newE = new Event(event)
    const createdEvent = await newE.save()
    return createdEvent
}

module.exports = {
    Bulk,
    createNewEvent,
    getAllChannels,
    createNewChannel,
    getAllChannelsWithEvents,
    getChannelById,
    getChannelByIdWithEvents,
    getChannelByTitleWithEvents
}