const passport = require('passport')
const BearerStrategy = require("passport-http-bearer").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/users')

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec();
  done(null, user);
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/callback/google/redirect"
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

passport.use(
  new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

module.exports = passport