"use strict"
const home = require('../app/controllers/home');
const user = require('../app/controllers/user');

module.exports = (app) => {

  /* Home Routes */
  app.get('/', home.home)
  app.get('/home', home.home)

  /* User Routes */
  app.get('/user', user.user)
  app.get('/users', user.list)

}