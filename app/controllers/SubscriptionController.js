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
    const collectionTypes = await db.CollectionType.findAll()

    if (devices == '' || dataStores == '') {
      req.flash('error', 'Para realizar el Alta de una Suscripción debe Existir al menos un Dispositivo y una Base de Datos')
      return res.redirect('/subscription/list')
    }

    return res.render('subscription/create.ejs', {
      devices: devices,
      dataStores: dataStores,
      collectionTypes: collectionTypes,
      error: req.flash('error')
    })
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscription/list')
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

exports.create = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const uuid = req.body.uuid
  const name = req.body.name
  const description = req.body.description
  const device = req.body.device
  const dataStore = req.body.dataStore
  const collectionType = req.body.collectionType
  const collectionRate = req.body.collectionRate

  // Get Devices and DataStore for the Select (if create fails)
  let devices = null
  let dataStores = null
  let collectionTypes = null
  try {
    devices = await db.Device.findAll()
    dataStores = await db.DataStore.findAll()
    collectionTypes = await db.CollectionType.findAll()
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
    dataStore: dataStore,
    collectionType: collectionType,
    collectionRate: collectionRate
  }

  // Check for restrictions
  if (!uuid || !name || !device || !dataStore) {
    return res.render('subscription/create.ejs', {
      params,
      error: 'Los Campos UUID, Nombre, Dispositivo y Base de Datos deben tener contenido',
      devices,
      dataStores,
      collectionTypes
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
      // Insert new Suscription to the Database
      await db.Subscription.create({
        uuid: uuid,
        name: name,
        description: description,
        collectionRate: collectionRate,
        fk_userId: user.id,
        fk_deviceId: device,
        fk_dataStoreId: dataStore,
        fk_collectionType: collectionType
      })

      // Traigo la suscripcion recien creada con las referencias a los modelos
      let subscription = await db.Subscription.findOne({
                          where: {uuid: uuid},
                          include: [{ model: db.Device },
                                    { model: db.DataStore },
                                    { model: db.User }]
                        })

      try {
        // Trato de Obtener el AddressSpace del Dispositivo
        const dev = await db.Device.findById(device)
        const tree = await ds_opcua.addressSpace(dev.endpointUrl, dev.rootNode, dev.timeOut)

        // Si lo obtengo procedo con la carga de items para la misma
        return res.render('subscription/items/add.ejs', {
          subscription: subscription,
          addressSpace: tree,
          success: 'Suscripcion Creada Exitosamente.'
        })
      } catch (err) {
        // Si no puedo obtener el AddressSpace, Informo de la situación
        req.flash('success','Suscripcion Creada Exitosamente.')
        req.flash('error', 'La carga de items no es posible de realizar en estos momentos. Error: ' + err.toString())
        return res.redirect('/subscription/list')
      }

    } else {

      return res.render('subscription/create.ejs', {
        error: 'Los Campos UUID y/o Nombre, deben ser unicos en la Base de Datos',
        params,
        devices,
        dataStores,
        collectionTypes
      })

    }
    
  } catch (err) {

    return res.render('subscription/create.ejs', {
      params,
      error: `${err}`,
      devices,
      dataStores,
      collectionTypes
    })

  }
}

exports.itemsAdd = async (req, res) => {
  const uuid = req.params.uuid

  try {

    let subscription = await db.Subscription.findOne({
                      where: {uuid: uuid},
                      include: [{ model: db.Device },
                                { model: db.DataStore },
                                { model: db.User }]
                    })

    let dev = subscription.Device
    const tree = await ds_opcua.addressSpace(dev.endpointUrl, dev.rootNode, dev.timeOut)

    return res.render('subscription/items/add.ejs', {
          subscription: subscription,
          addressSpace: tree
        })

  } catch (err) {

    req.flash('error', err.toString())
    return res.redirect('/subscription/list')

  }
}

exports.itemsSave= async (req, res) => {
  const uuid = req.body.uuid
  const itemsSelected = JSON.parse(req.body.itemsSelected)

  await itemsSelected.forEach(async (item) => {
    try {
      let subscription = await db.Subscription.findOne({
        where: {uuid: uuid}
      })

      await db.SubscriptionItem.create({
        nodeId: item.id,
        name: item.text,
        identifier: item.identifier,
        fk_subscriptionId: subscription.id,
        tags: "{ suscripcion = \"" + subscription.name + "\"}"
      })

      // Si se guardo correctamente el punto
      item.result = 0
      item.message = "OK"
    } catch (err) {
      // Si ocurrio algun error al guardar el punto
      item.result = 1
      item.message = err.toString()
    }

    console.log(item)
  })

  console.log(itemsSelected)

  return res.render('subscription/create3.ejs', {
    itemsSelected: itemsSelected
  })
}