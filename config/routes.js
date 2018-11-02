"use strict"
const home = require('../app/controllers/HomeController')
const user = require('../app/controllers/UserController')

module.exports = (app, passport) => {

  /* Home Routes */
  app.get('/', home.loggedIn, home.home)
  app.get('/home', home.loggedIn, home.home)

  /* User Routes */
  app.get('/users', home.loggedIn, user.list)

  /*Log In*/
  app.get('/login', home.login);
  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/home', // redirect to the secure profile section
      successFlash: true, // allow flash messages
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
  }));

  /*Log Out*/
  app.get('/logout', home.loggedIn, home.logout)
  
}