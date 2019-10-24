"use strict"
const db = require('../models')
const ds_opcua = require('../../lib/ds-opcua')

exports.list = async (req, res) => {
  try {
    // Get all subscriptionItems
    let subscriptionItems = await db.SubscriptionItem.findAll({
                          include: [{ model: db.Subscription }]
                        })

    res.render('subscriptionItem/list.ejs', {
      subscriptionItems: subscriptionItems,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error : error.toString()})
  }
}


exports.show = async (req, res) => {
  // Get URL params
  const subscriptionItem_id = req.params.id

  try {
    // Get subscriptionItem to Show
    let subscriptionItem = await db.SubscriptionItem.findOne({
                          where: { id: subscriptionItem_id },
                          include: [{ model: db.Subscription, include: [{ model: db.User }] }]
                        })
    return res.render('subscriptionItem/show.ejs', { subscriptionItem })
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscriptionitem/list')
  }
}


exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let subscriptionItem = await db.SubscriptionItem.findById(deleteId)
    await subscriptionItem.destroy()
    req.flash('success', 'Item Eliminado Correctamente.')
    return res.redirect('/subscriptionitem/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/subscriptionitem/list')
  }
}

exports.createIndex = async (req, res) => {
  const uuid = req.params.uuid

  try {

    let subscription = await db.Subscription.findOne({
                      where: {uuid: uuid},
                      include: [{ model: db.Device },
                                { model: db.DataStore },
                                { model: db.User },
                                { model: db.SubscriptionItem }]
                    })


    let dev = subscription.Device
    let availableDataTypes = await db.DataType.findAll({
                          where: {supported: 1, fk_deviceId: dev.id}
                        })

    let dataIdentifiers = availableDataTypes.map(dataType => dataType.identifier)
    console.log(dataIdentifiers)

    const tree = await ds_opcua.addressSpace(dev.endpointUrl, dev.rootNode, dev.timeOut, dataIdentifiers)

    let subscriptionItems = await db.SubscriptionItem.findAll({
                      where: {fk_subscriptionId: subscription.id}
                    })

    console.log(subscription)
    console.log(subscriptionItems)

    return res.render('subscriptionItem/create.ejs', {
          subscription: subscription,
          subscriptionItems: subscriptionItems,
          addressSpace: tree
        })

  } catch (err) {

    req.flash('error', err.toString())
    return res.redirect('/subscription/list')

  }
}

exports.create= async (req, res) => {
  const uuid = req.body.uuid
  const itemsSelected = JSON.parse(req.body.itemsSelected)
  const itemsToDelete = JSON.parse(req.body.itemsToDelete)
  const itemsResult = []

  let subscription = await db.Subscription.findOne({
    where: {uuid: uuid}
  })

  await Promise.all(
    itemsToDelete.map(async (item) => {
      item.id = item.nodeId
      item.text = item.name
      try {
        await db.SubscriptionItem.destroy({
          where: {
            nodeId: item.nodeId,
            fk_subscriptionId: subscription.id
          }
        })
        item.result = 0
        item.message = "Borrado"
      } catch (err) {
        item.result = 1
        item.message = err.toString()
      }
      itemsResult.push(item)
    })
  )

  await Promise.all(
    itemsSelected.map(async (item) => {
      try {

        let identifier_str = String(item.identifier)

        await db.SubscriptionItem.create({
          nodeId: item.id,
          name: item.text,
          identifier: identifier_str.replace(/\./g, "_"),
          fk_subscriptionId: subscription.id,
          tags: "{ \"suscripcion\": \"" + subscription.name + "\"}"
        })

        // Si la carga salio bien:
        item.result = 0
        item.message = "Creado"

      } catch (err) {
        // Si ocurrio algun error al guardar el punto:
        item.result = 1
        item.message = err.toString()
      }
      itemsResult.push(item)
    })
  )

  console.log(itemsResult)

  return res.render('subscriptionItem/result.ejs', {
    uuid: uuid,
    itemsSelected: itemsResult
  })
}