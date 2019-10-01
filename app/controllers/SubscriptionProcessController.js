"use strict"
const db = require('../models')
const { spawn } = require('child_process')
const dataLoggerPath = '/home/edu/nodejs/node-opcua-logger'

exports.list = async (req, res) => {
    try {
        // Get all subscriptionProcesses
        let subscriptionProcesses = await db.SubscriptionProcess.findAll({
                              where: {current: 1},
                              include: [{ model: db.Subscription, include: [{ model: db.User }] }]
                            })
        console.log(subscriptionProcesses[0].Subscription.User)

        res.render('subscriptionProcess/list.ejs', {
          subscriptionProcesses: subscriptionProcesses,
          success: req.flash("success"),
          error: req.flash("error")
        })
    } catch (error) {
        res.render('home.ejs', {error : error.toString()})
    }
}

exports.start = async (req, res) => {
    const subscription_uuid = req.params.uuid
    let subprocess = null

    try {
        let subscription = await db.Subscription.findOne({
            where: {uuid: subscription_uuid},
            include: [{ model: db.SubscriptionItem }]
        })

        let subscriptionProcess = await db.SubscriptionProcess.findOne({
            where: {
                $and: [
                  { fk_subscriptionId: {$eq: subscription.id} },
                  { current: {$eq: 1}}
                ]
            }
        })

        if (subscription != null && subscription.SubscriptionItem != null) {
            subprocess = spawn('/usr/bin/nodejs', [dataLoggerPath, '-s', subscription_uuid], {
                detached: true,
                stdio: 'ignore'
            });
            subprocess.unref();

            await subscriptionProcess.update({ current: 0 })
            await db.SubscriptionProcess.create({ pid: subprocess.pid, status: "running", current: 1, fk_subscriptionId: subscription.id})

            req.flash('success', 'Proceso Lanzado con Exito!')
            return res.redirect('/subscription/list')
        } else {
            req.flash('error', 'La Suscription debe tener al menos un Item.')
            return res.redirect('/subscription/list')
        }

    } catch (error) {
        req.flash('error', 'No fue posible Iniciar el Poceso (Data Logger). Error: ' + error.toString())
        return res.redirect('/subscription/list')
    }
}

exports.stop = async (req, res) => {
    const subscription_uuid = req.params.uuid
}

exports.restart = async (req, res) => {
    const subscription_uuid = req.params.uuid
}

exports.history = async (req, res) => {
    // Get URL params
    const subscription_uuid = req.params.uuid

    try {
        // Get subscriptionProcess History to Show
        let subscriptionProcesses = await db.SubscriptionProcess.findAll({
                              where: {fk_subscriptionId: uuid},
                              include: [{ model: db.Subscription }]
                            })
        return res.render('subscriptionProcess/history.ejs', {subscriptionProcesses})
    } catch (err) {
        req.flash('error', err.toString())
        return res.redirect('/subscriptionprocess/list')
    }
}