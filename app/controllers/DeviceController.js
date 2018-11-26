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
      success: req.flash("success"),
      error: req.flash("error")
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
  const rootNode = req.body.rootNode
  const timeOut = req.body.timeOut
  const default_timeOut = 10000

  const params = {
    name: name,
    description: description,
    endpointUrl: endpointUrl,
    uuid: uuid,
    rootNode: rootNode,
    timeOut: timeOut
  }

  // Check for restrictions
  if (!name || !endpointUrl || !uuid || !rootNode) {
    return res.render('device/create.ejs', {
      params,
      error: 'Los Campos Nombre, UUID, Root Node y Endpoint Url deben tener contenido'
    })
  }

  // Test Device Connection Status
  try {
    const status = await ds_opcua.status(endpointUrl, timeOut || default_timeOut)
    if (status) {
      // Insert new Device to the Database
      await db.Device.create({
        name: name,
        description: description,
        endpointUrl: endpointUrl,
        fk_userId: user.id,
        uuid: uuid,
        rootNode: rootNode,
        timeOut: timeOut || default_timeOut
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
  const device_uuid = req.params.uuid
  try {
    const device = await db.Device.findOne({ where: {uuid: device_uuid} })
    const endpointUrl = device.endpointUrl
    const nodeId = device.rootNode
    const timeout_ms = device.timeOut
    const tree = await ds_opcua.addressSpace(endpointUrl, nodeId, timeout_ms*10)
    return res.send(tree)
  } catch (err) {
    return res.send(err)
  }
}

exports.getAddressSpace = async (req, res) => {
  const device_uuid = req.params.uuid
  try {
    const device = await db.Device.findOne({ where: {uuid: device_uuid} })
    const endpointUrl = device.endpointUrl
    const nodeId = device.rootNode
    const timeout_ms = device.timeOut
    const tree = await ds_opcua.addressSpace(endpointUrl, nodeId, timeout_ms*10)
    return res.render('device/addressSpace.ejs', {
      addressSpace: tree
    })
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }
}

exports.show = (req, res) => {
  res.render('device/show.ejs', {})
}

// exports.update = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.delete = (req, res) => {
//   res.render('device/index.ejs', {})
// }

// exports.test = (req, res) => {
//   res.render('device/index.ejs', {})
// }