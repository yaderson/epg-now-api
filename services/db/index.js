'use strict'

const mongoose = require('mongoose')
const db_url = process.env.DB_URL
async function startDB(){
    try{
        await mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true})
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    startDB
}