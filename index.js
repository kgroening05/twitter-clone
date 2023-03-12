const express = require('express')
const http = require('http')
const port = require('./utils/getPort')()
const routes = require('./routes')
const passport = require('./utils/passportStrategies')
const session = require("express-session");
const { store, connectDb } = require('./utils/dbConnect')

connectDb()
require('dotenv').config()
const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(session({
    secret: process.env.SESSIONSECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
    store: store,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/posts', routes.posts);
app.use('/api/users', routes.users);
app.use('/api/login', routes.login);
app.use('/callback', routes.authCallback);

const server = http.createServer(app)
server.listen(port)
console.log(`Listening on port: ${port}`)

module.exports = app
