"use strict"
const db = require('../models')

/* User Info. */
exports.user = (req, res) => {
  res.send('User')
}

/* Users List. */
exports.list = (req, res) => {
  db.User.findAll().then((users) => {
    res.render('user/list.ejs', {
      title: 'Users List',
      users: users
    });
  });
}