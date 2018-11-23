"use strict"
const db = require('../models')
const ds_opcua = require('../../lib/ds-opcua')

exports.list = async (req, res) => {
  try {
    // Get all Devices
    let devices = await db.Device.findAll({
                          include: [{ model: db.User }]
                        })

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
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const name = req.body.name
  const description = req.body.description
  const endpointUrl = req.body.endpointUrl
  const uuid = req.body.uuid

  const params = {
    name: name,
    description: description,
    endpointUrl: endpointUrl,
    uuid: uuid
  }

  // Check for restrictions
  if (!name || !endpointUrl || !uuid) {
    return res.render('device/create.ejs', {
      params,
      error: 'Los Campos Nombre, UUID y EndpointUrl deben tener contenido'
    })
  }

  // Test Device Connection Status
  try {
    const status = await ds_opcua.status(endpointUrl)
    if (status) {
      // Insert new Device to the Database
      await db.Device.create({
        name: name,
        description: description,
        endpointUrl: endpointUrl,
        fk_userId: user.id,
        uuid: uuid
      })
      
      return res.render('device/create.ejs', {
        success: `Dispositivo creado Exitosamente!`
      })
    }
  } catch (err) {
    return res.render('device/create.ejs', {
      params,
      error: `${err}`
    })
  }
}

exports.json = async (req, res) => {
  const endpointUrl = "opc.tcp://DESKTOP-9FGRFUJ:48020"
  const nodeId = "ns=4;s=Demo.Static.Arrays"
  const tree = await ds_opcua.tree(endpointUrl, nodeId)
  res.send(tree)
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