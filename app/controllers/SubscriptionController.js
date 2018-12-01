"use strict"
const db = require('../models')
const ds_opcua = require('../../lib/ds-opcua')

exports.list = async (req, res) => {
  try {
    // Get all subscription
    let subscriptions = await db.Subscription.findAll({
                          include: [{ model: db.Device },
                                    { model: db.DataStore },
                                    { model: db.User }]
                        })

    res.render('subscription/list.ejs', {
      subscriptions: subscriptions,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error :  error.toString()})
  }
}

exports.createIndex = async (req, res) => {
  try {
    const devices = await db.Device.findAll()
    const dataStores = await db.DataStore.findAll()

    if (devices == '' || dataStores == '') {
      req.flash('error', 'Para realizar el Alta de una Suscripción debe Existir al menos un Dispositivo y una Base de Datos')
      return res.redirect('/subscription/list')
    }

    return res.render('subscription/create.ejs', {
      devices: devices,
      dataStores: dataStores,
      error: req.flash('error')
    })
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }
}

exports.create = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const uuid = req.body.uuid
  const name = req.body.name
  const description = req.body.description
  const device = req.body.device
  const dataStore = req.body.dataStore

  // Get Devices and DataStore for the Select (if create fails)
  let devices = null
  let dataStores = null
  try {
    devices = await db.Device.findAll()
    dataStores = await db.DataStore.findAll()
    if (devices == '' || dataStores == '') {
      req.flash('error', 'Para realizar el Alta de una Suscripción debe Existir al menos un Dispositivo y una Base de Datos')
      return res.redirect('/subscription/list')
    }
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }

  const params = {
    uuid: uuid,
    name: name,
    description: description,
    device: device,
    dataStore: dataStore
  }

  // Check for restrictions
  if (!uuid || !name || !device || !dataStore) {
    return res.render('subscription/create.ejs', {
      params,
      error: 'Los Campos UUID, Nombre, Dispositivo y Base de Datos deben tener contenido',
      devices,
      dataStores
    })
  }

  try {
    // Insert new subscription to the Database
    await db.Subscription.create({
      uuid: uuid,
      name: name,
      description: description,
      fk_userId: user.id,
      fk_deviceId: device,
      fk_dataStoreId: dataStore,
    })

    req.flash('success', 'Suscripción Creada Exitosamente.')
    return res.redirect('/subscription/list')
  } catch (err) {
    return res.render('subscription/create.ejs', {
      params,
      error: `${err}`,
      devices,
      dataStores
    })
  }
}

exports.show = async (req, res) => {
  // Get URL params
  const subscription_uuid = req.params.uuid

  try {
    // Get subscription to Show
    let subscription = await db.Subscription.findOne({
                          where: {uuid: subscription_uuid},
                          include: [{ model: db.Device },
                                    { model: db.DataStore },
                                    { model: db.User }]
                        })
    return res.render('subscription/show.ejs', {subscription})
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }
}

exports.updateIndex = async (req, res) => {
  // Get URL params
  const subscription_uuid = req.params.uuid
  
  try {
    // Get subscription to Update
    let subscription = await db.Subscription.findOne({
                          where: {uuid: subscription_uuid}
                        })
    return res.render('subscription/update.ejs', {subscription})
  } catch (err) {
    // Redirect to subscription List with the Error
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }
}


exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let subscription = null
  const id = req.body.id
  const description = req.body.description

  const params = {
    description: description
  }

  // Get the subscription by the hidden form Id
  try {
    subscription = await db.Subscription.findById(id)
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }

  // If the subscription could not be found, then redirect to subscription List
  if (subscription == null) {
    req.flash('error', 'No se pudo Actualizar la Suscripción. Por favor inténtelo de nuevo en unos minutos.')
    return res.redirect('/subscription/list')
  }

  // Check for restrictions
  if (!description) {
    return res.render('subscription/update.ejs', {
      subscription: subscription,
      params: params,
      error: 'El Campo description debe tener contenido'
    })
  }

  // Update subscription
  try {
    await subscription.update({
      description: description
    })

    req.flash('success', 'Suscripción Actualizada Correctamente.')
    return res.redirect('/subscription/list')

  } catch (err) {
    return res.render('subscription/update.ejs', {
      subscription: subscription,
      params: params,
      error: err.toString()
    })
  }
  
}

exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let subscription = await db.Subscription.findById(deleteId)
    await subscription.destroy()
    req.flash('success', 'Suscripciones Eliminada Correctamente.')
    return res.redirect('/subscription/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }
}

exports.create1 = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const uuid = req.body.uuid
  const name = req.body.name
  const description = req.body.description
  const device = req.body.device
  const dataStore = req.body.dataStore

  // Get Devices and DataStore for the Select (if create fails)
  let devices = null
  let dataStores = null
  try {
    devices = await db.Device.findAll()
    dataStores = await db.DataStore.findAll()
    if (devices == '' || dataStores == '') {
      req.flash('error', 'Para realizar el Alta de una Suscripción debe Existir al menos un Dispositivo y una Base de Datos')
      return res.redirect('/subscription/list')
    }
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
  }

  const params = {
    uuid: uuid,
    name: name,
    description: description,
    device: device,
    dataStore: dataStore
  }

  // Check for restrictions
  if (!uuid || !name || !device || !dataStore) {
    return res.render('subscription/create.ejs', {
      params,
      error: 'Los Campos UUID, Nombre, Dispositivo y Base de Datos deben tener contenido',
      devices,
      dataStores
    })
  }

  try {
    // Check for unique restrictions
    const subscriptions = await db.Subscription.findAll({
      where: {
        $or: [
          { uuid: {$eq: uuid} }, 
          { name: {$eq: name}}
        ]
      }
    })

    if (subscriptions == null || (subscriptions != null && subscriptions.length == 0)) {
      // No existe ningun registro con el uuid y el nombre de la nueva suscripcion.
      // Entonces puedo proceder con el Alta de la Misma
      const dev = await db.Device.findById(device)
      const tree = await ds_opcua.addressSpace(dev.endpointUrl, dev.rootNode, dev.timeOut)
      return res.render('subscription/create2.ejs', {
        addressSpace: tree
      })
    } else {
      return res.render('subscription/create.ejs', {
        error: 'Los Campos UUID y/o Nombre, deben ser unicos en la Base de Datos',
        params,
        devices,
        dataStores
      })
    }
    
  } catch (err) {
    return res.render('subscription/create.ejs', {
      params,
      error: `${err}`,
      devices,
      dataStores
    })
  }
}

exports.create2 = async (req, res) => {
  const itemsSelected = req.body.itemsSelected.split(';')
  return res.render('subscription/create3.ejs', {
    itemsSelected: itemsSelected
  })
}

exports.create3 = async (req, res) => {
  res.send('create3')
}