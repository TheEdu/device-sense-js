'use strict'

var db = require('../app/models')
var bCrypt = require('bcrypt-nodejs')
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy


module.exports = (passport) => {
  passport.use('local-login', new LocalStrategy({
      usernameField: "email"
    }, function(email, password, done) {
        db.User.findOne({ where: {email: email} }).then( user => {
          if (!user) return done(null, false, { message: 'Incorrect username.' })

          // bCrypt.hashSync(user.password, bCrypt.genSaltSync(10))
          if (!bCrypt.compareSync(password, user.password))
            return done(null, false, { message: 'Incorrect password.' })
          return done(null, user, { message: 'Welcome'})
        }).catch( err => {
          return done(err)
        })
      }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    db.User.findById(id).then( user => {
      return done(null, user)
    }).catch( err => {
      return done(err, null)
    })
  })
}