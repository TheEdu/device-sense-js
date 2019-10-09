"use strict"
const db = require('../models')

exports.list = async (req, res) => {
  try {
    // Get all dataTypes
    let dataTypes = await db.DataType.findAll({
                      include: [{ model: db.Device }]
    })

    res.render('dataType/list.ejs', {
      dataTypes: dataTypes,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error : error.toString()})
  }
}

exports.createIndex = async (req, res) => {
  let devices = await db.Device.findAll()

  res.render('dataType/create.ejs', {devices: devices})
}

exports.create = async (req, res) => {
  const name = req.body.name
  const identifier = req.body.identifier
  const device = req.body.device
  const supported = req.body.supported
  let devices = await db.Device.findAll()

  const dataType = {
    name: name,
    identifier: identifier,
    device: device,
    supported: supported
  }

  // Check for restrictions
  if (!name || !identifier || !supported || !device) {
    return res.render('dataType/create.ejs', {
      params: dataType,
      devices: devices,
      error: 'Los Campos Nombre, Identificador, Dispositivo y Soportado deben tener contenido'
    })
  }

  try {
    // Insert New DataType
    await db.DataType.create({
      name: name,
      identifier: identifier,
      fk_deviceId: device,
      supported: supported
    })
    req.flash('success', 'Tipo de Datos Creado Exitosamente.')
    return res.redirect('/dataType/list')

  } catch (err) {

    return res.render('dataType/create.ejs', {
      params: dataType,
      devices: devices,
      error: `${err}`
    })

  }
}

exports.show = async (req, res) => {
  // Get URL params
  const dataType_id = req.params.id

  try {
    // Get dataType to Show
    let dataType = await db.DataType.findOne({
                          where: {id: dataType_id}
                        })
    return res.render('dataType/show.ejs', {dataType})
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataType/list')
  }
}

exports.updateIndex = async (req, res) => {
  // Get URL params
  const dataType_id = req.params.id
  
  try {
    // Get dataType to Update
    let dataType = await db.DataType.findOne({
                          where: {id: dataType_id},
                          include: [{ model: db.Device }]
                        })

    let devices = await db.Device.findAll()
    return res.render('dataType/update.ejs', {dataType, devices})
  } catch (err) {
    // Redirect to dataType List with the Error
    req.flash('error', err.toString())
    return res.redirect('/dataType/list')
  }
}


exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let dataType = null
  let devices = null
  const id = req.body.id

  const name = req.body.name
  const identifier = req.body.identifier
  const supported = req.body.supported
  const device = req.body.device

  // Get the dataType by the hidden form Id
  try {
    dataType = await db.DataType.findById(id)
    devices = await db.Device.findAll()
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataType/list')
  }

  // If the dataType could not be found, then redirect to dataType List
  if (dataType == null) {
    req.flash('error', 'No se pudo Actualizar el Tipo de Dato. Por favor inténtelo de nuevo en unos minutos.')
    return res.redirect('/dataType/list')
  }

  // Check for restrictions
  if (!name || !identifier || !supported || !device) {
    return res.render('dataType/update.ejs', {
      dataType: dataType,
      devices: devices,
      error: 'Los Campos Nombre, Identificador, Dispositivo y Soportado deben tener contenido'
    })
  }

  // Update dataType
  try {
    await dataType.update({
      name: name,
      identifier: identifier,
      supported: supported,
      fk_deviceId: device
    })

    req.flash('success', 'Tipo de Datos Actualizado Correctamente.')
    return res.redirect('/dataType/list')

  } catch (err) {
    return res.render('dataType/update.ejs', {
      dataType: dataType,
      devices: devices,
      error: err.toString()
    })
  }
  
}

exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let dataType = await db.DataType.findById(deleteId)
    await dataType.destroy()
    req.flash('success', 'Tipo de Datos Eliminado Correctamente.')
    return res.redirect('/dataType/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataType/list')
  }
}