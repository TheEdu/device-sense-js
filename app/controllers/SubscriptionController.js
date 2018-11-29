"use strict"
const db = require('../models')

exports.list = async (req, res) => {
  try {
    // Get all subscription
    let subscriptions = await db.Subscription.findAll({
                          include: [{ model: db.Device },
                                    { model: db.User }]
                        })
    console.log(subscriptions)

    res.render('subscription/list.ejs', {
      subscriptions: subscriptions,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    console.log(error)
    res.render('home.ejs', {error :  error.toString()})
  }
}

exports.createIndex = (req, res) => {
  res.render('subscription/create.ejs', {})
}

exports.create = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const uuid = req.body.uuid
  const name = req.body.name
  const description = req.body.description

  const params = {
    uuid: uuid,
    name: name,
    description: description
  }

  // Check for restrictions
  if (!uuid || !name) {
    return res.render('subscription/create.ejs', {
      params,
      error: 'Los Campos uuid y name deben tener contenido'
    })
  }

  try {
    // Insert new subscription to the Database
    await db.Subscription.create({
      uuid: uuid,
      name: name,
      description: description,
      fk_userId: user.id,
      fk_deviceId: 1
    })

    req.flash('success', 'Suscripción Creada Exitosamente.')
    return res.redirect('/subscription/list')
  } catch (err) {
    return res.render('subscription/create.ejs', {
      params,
      error: `${err}`
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
                          include: [{ model: db.User },
                                    { model: db.Device}]
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