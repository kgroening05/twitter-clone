const express = require('express')
const http = require('http')
const port = require('./utils/getPort')()
const routes = require('./routes')
require('dotenv').config()
require('./utils/dbConnect')();
const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/api/posts', routes.posts);
app.use('/api/users', routes.users);
app.use('/api/login', routes.login);

const server = http.createServer(app)
server.listen(port)
console.log(`Listening on port: ${port}`)

module.exports = app
