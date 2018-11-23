"use strict"
const home = require('../app/controllers/HomeController')
const user = require('../app/controllers/UserController')
const device = require('../app/controllers/DeviceController')

module.exports = (app, passport) => {

  /* Home Routes */
  app.get('/',      home.loggedIn, home.home)
  app.get('/home',  home.loggedIn, home.home)

  /* User Routes */
  app.get('/user/list', home.loggedIn, user.list)

  /* Login Routes */
  app.get('/login',   home.login)
  app.get('/logout',  home.loggedIn, home.logout)
  app.post('/login',  passport.authenticate('local-login', {
      successRedirect: '/home', // redirect to the secure profile section
      successFlash: true, // allow flash messages
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
  }))

  /* Devie Routes */
  app.get('/device/list',     home.loggedIn, device.list)
  // app.get('/device/:id',      home.loggedIn, device.show)
  app.get('/device/create',  home.loggedIn, device.createIndex)
  app.post('/device/create',  home.loggedIn, device.create)
  // app.put('/device/:id',      home.loggedIn, device.update)
  // app.delete('/device/:id',   home.loggedIn, device.delete)
  app.get('/json', device.json)
  app.get('/tree', (req, res) => {
    res.render('tree')
  })
  
}