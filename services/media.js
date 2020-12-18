'use strict'

const Media =  require('./db/models/media')
const { getTMDB } = require('./fetch')

async function saveMedia(media){
    const exist = await Media.findOne({ id: media.id , media_type: media.media_type})
    if(!exist){
        const newMedia = new Media(media)
        const saved = await newMedia.save()
        return saved 
    }
    return exist
}
async function updateMedia(media){
    const { event_called } = media
    await Media.deleteMany({event_called})
    const saved = await saveMedia(media)
    return saved
}
async function savedByTMDB(id, media_type, event_called){
    let tmdb_media = await getTMDB(id, media_type);
    if(tmdb_media.success == false ) throw new Error(tmdb_media.status_message)

    tmdb_media.media_type = media_type
    tmdb_media.event_called = event_called
    const saved = await updateMedia(tmdb_media)
    return saved
}

async function getByTitle(title){
    const media = await Media.findOne({event_called: title})
    return media
}

module.exports = {
    saveMedia,
    savedByTMDB,
    getByTitle
}