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
        done(null, user)
      } else {
        const newUser = await User.create({
          email: email,
          googleID: profile._json.sub,
          profilePic: profile._json.picture
        })
        console.log('new user')
        done(null, newUser)
      }
    }
  ));

module.exports = passport