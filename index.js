const express = require('express')
const https = require('https')
const fs = require('fs')
const port = require('./utils/getPort')()
const routes = require('./routes')
const passport = require('./utils/passportStrategies')
const user = require('./utils/passportSerialize')
const session = require("express-session");
const helmet = require('helmet')
const path = require('path')
const { store, connectDb } = require('./utils/dbConnect')

connectDb()
require('dotenv').config()
const app = express()
app.use(helmet())
app.set('trust proxy', 1);
app.set('port', process.env.PORT || 3000)
app.set('httpsPort', 3001)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.ALLOWEDORIGIN_3}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTION')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    next()
}) 

app.use (function (req, res, next) {
    if(req.get("X-Forwarded-Proto")=="http") {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

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
        secure: true,
        sameSite: 'none',
    },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser)
passport.deserializeUser(user.deserializeUser)

app.use('/api/posts', routes.posts);
app.use('/api/user', routes.users);
app.use('/api/login', routes.login);
app.use('/api/logout', routes.logout);

https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(app.get('httpsPort'), ()=>{
        console.log('server is runing at port 443')
    });

app.listen(app.get('port'), () => {console.log(`Listening on port: ${port}`)})

module.exports = app
