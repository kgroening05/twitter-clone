const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const port = require('./utils/getPort')()

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

const server = http.createServer(app)
server.listen(port)
console.log(`Listening on port: ${port}`)

module.exports = app
