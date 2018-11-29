"use strict"
const home = require('../app/controllers/HomeController')
const user = require('../app/controllers/UserController')
const device = require('../app/controllers/DeviceController')
const dataStore = require('../app/controllers/DataStoreController')

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
  app.get('/device/list', home.loggedIn, device.list)
  app.get('/device/create', home.loggedIn, device.createIndex)
  app.post('/device/create', home.loggedIn, device.create)
  app.get('/device/show/:uuid', home.loggedIn, device.show)
  app.get('/device/update/:uuid', home.loggedIn, device.updateIndex)
  app.post('/device/update', home.loggedIn, device.update)
  app.post('/device/delete', home.loggedIn, device.delete)
  app.get('/json/:uuid', home.loggedIn, device.json)
  app.get('/device/addressSpace/:uuid', home.loggedIn, device.getAddressSpace)

  /* DataStore Routes */
  app.get('/datastore/list', home.loggedIn, dataStore.list)
  app.get('/datastore/create', home.loggedIn, dataStore.createIndex)
  app.post('/datastore/create', home.loggedIn, dataStore.create)
  app.get('/datastore/show/:uuid', home.loggedIn, dataStore.show)
  app.get('/datastore/update/:uuid', home.loggedIn, dataStore.updateIndex)
  app.post('/datastore/update', home.loggedIn, dataStore.update)
  app.post('/datastore/delete', home.loggedIn, dataStore.delete)
  
}