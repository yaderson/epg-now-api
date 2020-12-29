'use strict'

const REDIS_SERVER = process.env.REDIS_SERVER
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const Redis = require('ioredis')

module.exports = new Redis(REDIS_SERVER,{
    password: REDIS_PASSWORD
})