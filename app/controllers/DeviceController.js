"use strict"
const db = require('../models')
const ds_opcua = require('../../lib/ds-opcua')

exports.list = async (req, res) => {
  try {
    // Get all Devices
    let devices = await db.Device.findAll({
                          include: [{ model: db.User }]
                        })

    res.render('device/list.ejs', {
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

      req.flash('success', 'Dispositivo Creado Exitosamente.')
      return res.redirect('/device/list')
    }
  } catch (err) {
    return res.render('device/create.ejs', {
      params,
      error: `${err}`
    })
  }
}

exports.show = async (req, res) => {
  // Get URL params
  const device_uuid = req.params.uuid

  try {
    // Get Device to Show
    let device = await db.Device.findOne({
                          where: {uuid: device_uuid},
                          include: [{ model: db.User }]
                        })
    return res.render('device/show.ejs', {device})
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }
}

exports.updateIndex = async (req, res) => {
  // Get URL params
  const device_uuid = req.params.uuid
  
  try {
    // Get Device to Update
    let device = await db.Device.findOne({
                          where: {uuid: device_uuid}
                        })
    return res.render('device/update.ejs', {device})
  } catch (err) {
    // Redirect to Device List with the Error
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }
}


exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let device = null
  const id = req.body.id
  const description = req.body.description
  const rootNode = req.body.rootNode
  const timeOut = req.body.timeOut
  const default_timeOut = 10000

  const params = {
    description: description,
    rootNode: rootNode,
    timeOut: timeOut
  }

  // Get the Device by the hidden form Id
  try {
    device = await db.Device.findById(id)
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }

  // If the Device could not be found, then redirect to Device List
  if (device == null) {
    req.flash('error', 'No se pudo Actualizar el Dispositivo. Por favor inténtelo de nuevo en unos minutos.')
    return res.redirect('/device/list')
  }

  // Check for restrictions
  if (!rootNode) {
    return res.render('device/update.ejs', {
      device: device,
      params: params,
      error: 'El Campo Nodo Raíz debe tener contenido'
    })
  }

  // Update Device
  try {
    await device.update({
      rootNode: rootNode,
      timeOut: timeOut || default_timeOut,
      description: description,
    })

    req.flash('success', 'Dispositivo Actualizado Correctamente.')
    return res.redirect('/device/list')

  } catch (err) {
    return res.render('device/update.ejs', {
      device: device,
      params: params,
      error: err.toString()
    })
  }
  
}

exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let device = await db.Device.findById(deleteId)
    await device.destroy()
    req.flash('success', 'Dispositivo Eliminado Correctamente.')
    return res.redirect('/device/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }
}

exports.json = async (req, res) => {
  const device_uuid = req.params.uuid
  try {
    const device = await db.Device.findOne({ where: {uuid: device_uuid} })
    const endpointUrl = device.endpointUrl
    const nodeId = device.rootNode
    const timeout_ms = device.timeOut
    const tree = await ds_opcua.addressSpace(endpointUrl, nodeId, timeout_ms)
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
    const tree = await ds_opcua.addressSpace(endpointUrl, nodeId, timeout_ms)
    return res.render('device/addressSpace.ejs', {
      addressSpace: tree
    })
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/device/list')
  }
}