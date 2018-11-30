"use strict"
const db = require('../models')

exports.list = async (req, res) => {
  try {
    // Get all dataStores
    let dataStores = await db.DataStore.findAll({
                          include: [{ model: db.User }]
                        })

    res.render('dataStore/list.ejs', {
      dataStores: dataStores,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error : error.toString()})
  }
}

exports.createIndex = (req, res) => {
  res.render('dataStore/create.ejs', {})
}

exports.create = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const uuid = req.body.uuid
  const name = req.body.name
  const description = req.body.description
  const type = req.body.type
  const host = req.body.host
  const port = req.body.port
  const protocol = req.body.protocol
  const username = req.body.username
  const password = req.body.password
  const database = req.body.database
  const failoverTimeout = req.body.failoverTimeout
  const bufferMaxSize = req.body.bufferMaxSize
  const writeInterval = req.body.writeInterval
  const writeMaxPoints = req.body.writeMaxPoints
  const default_failoverTimeout = 10000
  const default_bufferMaxSize = 64
  const default_writeInterval = 3000
  const default_writeMaxPoints = 1000

  const params = {
    uuid: uuid,
    name: name,
    description: description,
    type: type,
    host: host,
    port: port,
    protocol: protocol,
    username: username,
    password: password,
    database: database,
    failoverTimeout: failoverTimeout,
    bufferMaxSize: bufferMaxSize,
    writeInterval: writeInterval,
    writeMaxPoints: writeMaxPoints
  }

  // Check for restrictions
  if (!uuid || !name || !type || !host || !protocol || !database) {
    return res.render('dataStore/create.ejs', {
      params,
      error: 'Los Campos UUID, Nombre, Tipo, Host, Protocolo, y Base de Datos deben tener contenido'
    })
  }

  try {
    // Insert new dataStore to the Database
    await db.DataStore.create({
      uuid: uuid,
      name: name,
      description: description,
      type: type,
      host: host,
      port: port,
      protocol: protocol,
      username: username,
      password: password,
      database: database,
      failoverTimeout: failoverTimeout || default_failoverTimeout,
      bufferMaxSize: bufferMaxSize || default_bufferMaxSize,
      writeInterval: writeInterval || default_writeInterval,
      writeMaxPoints: writeMaxPoints || default_writeMaxPoints,
      fk_userId: user.id,
    })

    req.flash('success', 'Base de Datos Creada Exitosamente.')
    return res.redirect('/dataStore/list')
  } catch (err) {
    return res.render('dataStore/create.ejs', {
      params,
      error: `${err}`
    })
  }
}

exports.show = async (req, res) => {
  // Get URL params
  const dataStore_uuid = req.params.uuid

  try {
    // Get dataStore to Show
    let dataStore = await db.DataStore.findOne({
                          where: {uuid: dataStore_uuid},
                          include: [{ model: db.User }]
                        })
    return res.render('dataStore/show.ejs', {dataStore})
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataStore/list')
  }
}

exports.updateIndex = async (req, res) => {
  // Get URL params
  const dataStore_uuid = req.params.uuid
  
  try {
    // Get dataStore to Update
    let dataStore = await db.DataStore.findOne({
                          where: {uuid: dataStore_uuid}
                        })
    return res.render('dataStore/update.ejs', {dataStore})
  } catch (err) {
    // Redirect to dataStore List with the Error
    req.flash('error', err.toString())
    return res.redirect('/dataStore/list')
  }
}


exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let dataStore = null
  const id = req.body.id
  const description = req.body.description
  const username = req.body.username
  const password = req.body.password
  const failoverTimeout = req.body.failoverTimeout
  const bufferMaxSize = req.body.bufferMaxSize
  const writeInterval = req.body.writeInterval
  const writeMaxPoints = req.body.writeMaxPoints
  const default_failoverTimeout = 10000
  const default_bufferMaxSize = 64
  const default_writeInterval = 3000
  const default_writeMaxPoints = 1000

  const params = {
    description: description,
    username: username,
    password: password,
    failoverTimeout: failoverTimeout,
    bufferMaxSize: bufferMaxSize,
    writeInterval: writeInterval,
    writeMaxPoints: writeMaxPoints
  }

  // Get the dataStore by the hidden form Id
  try {
    dataStore = await db.DataStore.findById(id)
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataStore/list')
  }

  // If the dataStore could not be found, then redirect to dataStore List
  if (dataStore == null) {
    req.flash('error', 'No se pudo Actualizar la Base de Datos. Por favor inténtelo de nuevo en unos minutos.')
    return res.redirect('/dataStore/list')
  }

  // Check for restrictions
  if (!username || !password) {
    return res.render('dataStore/update.ejs', {
      dataStore: dataStore,
      params: params,
      error: 'Los Campos Usuario y Contraseña deben tener contenido'
    })
  }

  // Update dataStore
  try {
    await dataStore.update({
      description: description,
      username: username,
      password: password,
      failoverTimeout: failoverTimeout || default_failoverTimeout,
      bufferMaxSize: bufferMaxSize || default_bufferMaxSize,
      writeInterval: writeInterval || default_writeInterval,
      writeMaxPoints: writeMaxPoints || default_writeMaxPoints
    })

    req.flash('success', 'Base de Datos Actualizada Correctamente.')
    return res.redirect('/dataStore/list')

  } catch (err) {
    return res.render('dataStore/update.ejs', {
      dataStore: dataStore,
      params: params,
      error: err.toString()
    })
  }
  
}

exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let dataStore = await db.DataStore.findById(deleteId)
    await dataStore.destroy()
    req.flash('success', 'Bases de Datos Eliminada Correctamente.')
    return res.redirect('/dataStore/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/dataStore/list')
  }
}