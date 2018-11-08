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
      devices: devices,
      success: req.flash("success")
    })
  } catch (error) {
    console.log(error)
    res.render('home.ejs', {error :  error})
  }
}

exports.createIndex = (req, res) => {
  res.render('device/create.ejs', {})
}

exports.create = (req, res) => {
  const deviceName = req.body.name != 'undefined' ? req.body.name : 'Edu';
  console.log(deviceName)
  console.log(req.body.ipAdrress)
  console.log(req.body.descripcion)
  // req.flash('success', 'Dispositivo creado con Exito!')
  // res.redirect('/device/list')
}


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