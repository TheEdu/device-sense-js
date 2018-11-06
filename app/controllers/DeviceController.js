"use strict"
const db = require('../models')

exports.list = async (req, res) => {
  // res.send('List')
  // res.render('device/index.ejs', {})
  try {
    let devices = await db.Device.findAll({
                          include: [
                                  { model: db.User }
                              ]
                        })
    console.log(devices)
    res.render('device/index.ejs', {
      devices: devices
    })
  } catch (error) {
    console.log(error)
    res.render('home.ejs', {error :  error})
  }
}

// exports.create = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.show = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.update = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.delete = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.test = (req, res) => {
//   res.render('device/index.ejs', {})
// }