"use strict"
const db = require('../models')

exports.list = async (req, res) => {
  try {
    // Get all dataTypes
    let dataTypes = await db.DataType.findAll()

    res.render('dataType/list.ejs', {
      dataTypes: dataTypes,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error : error.toString()})
  }
}

exports.createIndex = (req, res) => {
  res.render('dataType/create.ejs', {})
}

exports.create = async (req, res) => {
  const name = req.body.name
  const identifier = req.body.identifier
  const supported = req.body.supported

  const dataType = {
    name: name,
    identifier: identifier,
    supported: supported
  }

  // Check for restrictions
  if (!name || !identifier || !supported) {
    return res.render('dataType/create.ejs', {
      params: dataType,
      error: 'Los Campos Nombre, Identificador, y Soportado deben tener contenido'
    })
  }

  try {

    // Insert New DataType
    await db.DataType.create(dataType)
    req.flash('success', 'Tipo de Datos Creado Exitosamente.')
    return res.redirect('/dataType/list')

  } catch (err) {

    return res.render('dataType/create.ejs', {
      params: dataType,
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
                          where: {id: dataType_id}
                        })
    return res.render('dataType/update.ejs', {dataType})
  } catch (err) {
    // Redirect to dataType List with the Error
    req.flash('error', err.toString())
    return res.redirect('/dataType/list')
  }
}


exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let dataType = null
  const id = req.body.id

  const name = req.body.name
  const identifier = req.body.identifier
  const supported = req.body.supported

  const params = {
    name: name,
    identifier: identifier,
    supported: supported
  }

  // Get the dataType by the hidden form Id
  try {
    dataType = await db.DataType.findById(id)
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
  if (!name || !identifier || !supported) {
    return res.render('dataType/update.ejs', {
      dataType: dataType,
      params: params,
      error: 'Los Campos Nombre, Identificador, y Soportado deben tener contenido'
    })
  }

  // Update dataType
  try {
    await dataType.update(params)

    req.flash('success', 'Tipo de Datos Actualizado Correctamente.')
    return res.redirect('/dataType/list')

  } catch (err) {
    return res.render('dataType/update.ejs', {
      dataType: dataType,
      params: params,
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