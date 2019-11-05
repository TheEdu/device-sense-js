"use strict"
const home = require('../app/controllers/HomeController')
const user = require('../app/controllers/UserController')
const device = require('../app/controllers/DeviceController')
const dataStore = require('../app/controllers/DataStoreController')
const dataType = require('../app/controllers/DataTypeController')
const subscription = require('../app/controllers/SubscriptionController')
const subscriptionProcess = require('../app/controllers/SubscriptionProcessController')
const subscriptionItem = require('../app/controllers/SubscriptionItemController')

module.exports = (app, passport) => {

  /* Home Routes */
  app.get('/',      home.loggedIn, home.home)
  app.get('/home',  home.loggedIn, home.home)
  app.get('/dash', home.loggedIn, home.dash)

  /* User Routes */
  app.get('/user/list', home.loggedIn, user.list)
  app.get('/user/create', home.loggedIn, user.createIndex)
  app.post('/user/create', home.loggedIn, user.create)
  app.get('/user/update/:id', home.loggedIn, user.updateIndex)
  app.post('/user/update', home.loggedIn, user.update)
  app.post('/user/delete', home.loggedIn, user.delete)
  app.get('/user/changepassword', home.loggedIn, user.changePasswordIndex)
  app.post('/user/changepassword', home.loggedIn, user.changePassword)

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

  /* Subscription Routes */
  app.get('/subscription/list', home.loggedIn, subscription.list)
  app.get('/subscription/create', home.loggedIn, subscription.createIndex)
  app.post('/subscription/create', home.loggedIn, subscription.create)
  app.get('/subscription/show/:uuid', home.loggedIn, subscription.show)
  app.get('/subscription/update/:uuid', home.loggedIn, subscription.updateIndex)
  app.post('/subscription/update', home.loggedIn, subscription.update)
  app.post('/subscription/delete', home.loggedIn, subscription.delete)

  /* DataType Routes */
  app.get('/datatype/list', home.loggedIn, dataType.list)
  app.get('/datatype/create', home.loggedIn, dataType.createIndex)
  app.post('/datatype/create', home.loggedIn, dataType.create)
  app.get('/datatype/show/:id', home.loggedIn, dataType.show)
  app.get('/datatype/update/:id', home.loggedIn, dataType.updateIndex)
  app.post('/datatype/update', home.loggedIn, dataType.update)
  app.post('/datatype/delete', home.loggedIn, dataType.delete)

  /* SubscriptionpProcess Routes */
  app.get('/subscriptionprocess/list', home.loggedIn, subscriptionProcess.list)
  app.get('/subscriptionprocess/:uuid/history', home.loggedIn, subscriptionProcess.history)
  app.get('/subscriptionprocess/:uuid/start', home.loggedIn, subscriptionProcess.start)
  app.get('/subscriptionprocess/:uuid/stop', home.loggedIn, subscriptionProcess.stop)
  app.get('/subscriptionprocess/:uuid/restart', home.loggedIn, subscriptionProcess.restart)
 
  /* SubscriptionpItem Routes */
  app.get('/subscriptionitem/list', home.loggedIn, subscriptionItem.list)
  app.get('/subscriptionitem/show/:id', home.loggedIn, subscriptionItem.show)
  app.post('/subscriptionitem/delete', home.loggedIn, subscriptionItem.delete)
  app.get('/subscription/:uuid/subscriptionitem/create', home.loggedIn, subscriptionItem.createIndex)
  app.post('/subscription/:uuid/subscriptionitem/create', home.loggedIn, subscriptionItem.create)

}