const mongoose = require("mongoose")
const events = require('./db/models/events')
const Event = require('./db/models/events')

/**
* 
* @param {array} newEvents - Array of new Events 
* @returns {array} - Array of new Events saved
*/
async function insertAll(newEvents) {
    const events = await Event.insertMany(newEvents)
    return events
}
/**
 * Get evets by Channel id
 * @param {string} channel_id - Channel id
 * @param {Date} from - Date form 
 * @param {Date} to - Date to
 * @param {number} skip - number of events skip 
 * @param {number} limit - number limit of events
 * @returns { array } Returns array of Events
 */
async function getEventByChannelId(channel_id, from, to, skip, limit){
    if(!channel_id) return []
    const events = Event.find({channel_id, date_end: { $gte: from}}).skip(skip).limit(limit)
    return events
}

async function getAllEvents(skip, limit, s){
    const events = await Event.find().populate({path: 'tmdb_media'}).limit(limit).skip(skip).sort({channel_id: s})
    return events
}

async function getAllEventsByChannelId(channel_id){
    const events = await Event.find({channel_id})
    if(events.length == 0){ throw new Error(`Channel id ${channel_id} doesn't exist`)}
    return events
}

async function getEventsByChannelId(channel_id) {
    const events = await Event.find({channel_id, date_end: { $gte: new Date()}})
    if(events.length == 0){ throw new Error(`Channel id ${channel_id} doesn't exist`)}
    return events
}
async function getEventsByChannelTitle(title_uri) {
    const events = await Event.find({title_uri, date_end: { $gte: new Date()}})
    if(events.length == 0){ throw new Error(`Channel id ${channel_id} doesn't exist`)}
    return events
}

async function addTmbdIdToAll(media){
    const name = media.event_called
    const updatedM = await Event.updateMany({name: name}, {tmdb_id: media._id, tmdb_media_type: media.media_type})
    return updatedM
}

async function getEventsPlaying(limit, skip, sort) {
    console.log(limit)
    const events = await Event.find({
        date_end: { $gte: new Date() }, date_begin: {$lte: new Date()}
    }).limit(limit).skip(skip).sort({tmdb_media_type: sort}).populate({path: "channel"})
    
    return events
}
async function getPlayingNowByMtype(mediaType){
    const events = await Event.find({
        tmdb_id: { $type: 7 }, 
        tmdb_media_type: mediaType, 
        date_end: { $gte: new Date() }, 
        date_begin: {$lte: new Date()}
    }).sort({date_end: 'desc'}).populate({
        path: 'tmdb_media'
    }).populate({
        path: 'channel'
    })

    //Query select all of tybe ObjectId
    return events
}

async function getPlayingNowByMtypeScore(mediaType, limit){
    const da = new Date(Date.now()+(12*60)*60*1000)
    const events = await Event.find({
        tmdb_id: { $type: 7 },
        tmdb_media_type: mediaType,  
        date_begin: {$gte: new Date()},
        date_end: {$lte: da}
    }).limit(limit).populate({
        path: 'tmdb_media'
    }).populate({
        path: 'channel'
    })
    a = events.sort((a, b) => b.tmdb_media.vote_average - a.tmdb_media.vote_average)
    //Query select all of tybe ObjectId
    return a
}

module.exports = {
    insertAll,
    getEventByChannelId,
    getAllEventsByChannelId,
    getAllEvents,
    getEventsByChannelId,
    getEventsByChannelTitle,
    addTmbdIdToAll,
    getEventsPlaying,
    getPlayingNowByMtype,
    getPlayingNowByMtypeScore
}