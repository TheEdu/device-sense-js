"use strict"
const db = require('../models')
const ds_opcua = require('../../lib/ds-opcua')

exports.list = async (req, res) => {
  try {
    let devices = await db.Device.findAll({
                          include: [{ model: db.User }]
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

exports.create = async (req, res) => {
  // Get the form inputs from the request body
  const name = req.body.name
  const description = req.body.description
  const endpointUrl = req.body.endpointUrl

  const params = {
    name: name,
    description: description,
    endpointUrl: endpointUrl
  }

  // Check for restrictions
  if (!name || !description || !endpointUrl) {
    return res.render('device/create.ejs', {
      params,
      error: 'Los Campos Nombre, Descripción y EndpointUrl deben tener contenido'
    })
  }

  // Test Device Connection
  try {
    let test = await ds_opcua.status(endpointUrl)
    console.log(`test: ${test}`)
  } catch (err) {
    console.log(`${err}`)
  }

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