const passport = require('passport')
const BearerStrategy = require("passport-http-bearer");
const GitHubStrategy = require("passport-github2");
const GoogleStrategy = require("passport-google-oauth20");
const User = require('../models/users')

require('dotenv').config()

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/login/google/redirect",
  },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile._json.email
      const user = await User.findOne({ email: email }).exec()
      if (user){
        console.log('user exists')
        console.log(user)
        done(null, user)
      } else {
        console.log('no user')
        const newUser = await User.create({
          email: email,
          googleID: profile._json.sub,
        })
        console.log(newUser)
        done(null, newUser)
      }
    }
  ));

module.exports = passport