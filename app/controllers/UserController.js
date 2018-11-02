"use strict"
const db = require('../models')

/* Users List. */
exports.list = (req, res) => {
  db.User.findAll().then((users) => {
    res.render('user/list.ejs', {
      users: users
    });
  });
}