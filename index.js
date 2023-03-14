const express = require('express')
const http = require('http')
const port = require('./utils/getPort')()
const routes = require('./routes')
const passport = require('./utils/passportStrategies')
const user = require('./utils/passportSerialize')
const session = require("express-session");
const { store, connectDb } = require('./utils/dbConnect')
const { json } = require('express')

connectDb()
require('dotenv').config()
const app = express()

app.set('port', process.env.PORT || 3000)

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
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser)
passport.deserializeUser(user.deserializeUser)

app.use('/api/posts', routes.posts);
app.use('/api/users', routes.users);
app.use('/api/login', routes.login);

const server = http.createServer(app)
server.listen(app.get('port'))
console.log(`Listening on port: ${port}`)

module.exports = app
