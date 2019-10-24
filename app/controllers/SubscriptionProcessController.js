"use strict"
const db = require('../models')
const { spawn } = require('child_process')
const exec = require('await-exec')
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

        if (subscription != null
            && subscriptionProcess != null
            && subscriptionProcess.status != "running"
            && subscription.SubscriptionItems != null 
            && subscription.SubscriptionItems.length > 0) {
            
            subprocess = spawn('/usr/bin/nodejs', [dataLoggerPath, '-s', subscription_uuid], {
                detached: true,
                stdio: 'ignore'
            });
            subprocess.unref();

            await subscriptionProcess.update({ current: 0 })
            await db.SubscriptionProcess.create({ pid: subprocess.pid, status: "running", current: 1, fk_subscriptionId: subscription.id})

            req.flash('success', 'Proceso Lanzado con Exito!')
            return res.redirect('/subscriptionprocess/list')
        } else if (subscriptionProcess != null && subscriptionProcess.status == "running") {
            req.flash('error', 'La Suscription ya se Encuentra Activa (Si observa algun problema, procesa a Reiniciarla)')
            return res.redirect('/subscriptionprocess/list')
        } else {
            req.flash('error', 'La Suscription debe tener al menos un Item.')
            return res.redirect('/subscriptionprocess/list')
        }

    } catch (error) {
        req.flash('error', 'No fue posible Iniciar el Proceso (Data Logger). Error: ' + error.toString())
        return res.redirect('/subscriptionprocess/list')
    }
}

exports.stop = async (req, res) => {
    const subscription_uuid = req.params.uuid

    try {
        let subscription = await db.Subscription.findOne({
            where: {uuid: subscription_uuid}
        })

        let subscriptionProcess = await db.SubscriptionProcess.findOne({
            where: {
                $and: [
                  { fk_subscriptionId: {$eq: subscription.id} },
                  { current: {$eq: 1}}
                ]
            }
        })

        if (subscriptionProcess != null && subscriptionProcess.pid > 0 && subscriptionProcess.status == "running") {

            await exec(`kill -2 ${subscriptionProcess.pid}`)
            await subscriptionProcess.update({ current: 0 })
            await db.SubscriptionProcess.create({ pid: 0, status: "stopped", current: 1, fk_subscriptionId: subscription.id})

            req.flash('success', 'Proceso Detenido con Exito!')
            return res.redirect('/subscriptionprocess/list')
        } else {
            req.flash('error', 'La Suscription debe tener un PID asociado.')
            return res.redirect('/subscriptionprocess/list')
        }

    } catch (error) {
        req.flash('error', 'No fue posible Detener el Proceso (Data Logger). Error: ' + error.toString())
        return res.redirect('/subscriptionprocess/list')
    }
}

exports.restart = async (req, res) => {
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

        if (subscriptionProcess != null) {

            // Try to kill the Process
            if (subscriptionProcess.pid > 0) {
                try {
                    await exec(`kill -2 ${subscriptionProcess.pid}`)
                } catch (err) {
                    console.log(err.toString())
                }
            }

            if (subscription.SubscriptionItems != null && subscription.SubscriptionItems.length > 0) {
                // Run new process
                subprocess = spawn('/usr/bin/nodejs', [dataLoggerPath, '-s', subscription_uuid], {
                    detached: true,
                    stdio: 'ignore'
                });
                subprocess.unref();
                await subscriptionProcess.update({ current: 0 })
                await db.SubscriptionProcess.create({ pid: subprocess.pid, status: "running", current: 1, fk_subscriptionId: subscription.id})

                req.flash('success', 'Proceso Reiniciado con Exito!')
                return res.redirect('/subscriptionprocess/list')
            } else {
                await subscriptionProcess.update({ current: 0 })
                await db.SubscriptionProcess.create({ pid: 0, status: "stopped", current: 1, fk_subscriptionId: subscription.id})

                req.flash('error', 'Para Iniciar el Proceso la Suscription debe tener al menos un Item.')
                return res.redirect('/subscriptionprocess/list')
            }


        } else {
            req.flash('error', 'La Suscription debe tener un PID asociado.')
            return res.redirect('/subscriptionprocess/list')
        }

    } catch (error) {
        req.flash('error', 'No fue posible Reiniciar el Proceso (Data Logger). Error: ' + error.toString())
        return res.redirect('/subscriptionprocess/list')
    }
}

exports.history = async (req, res) => {
    // Get URL params
    const subscription_uuid = req.params.uuid
    let subscription = null

    try {
        subscription = await db.Subscription.findOne({
            where: {uuid: subscription_uuid},
            include: [{ model: db.SubscriptionProcess }, { model: db.User }]
        })

        console.log(subscription)

        return res.render('subscriptionProcess/history.ejs', {subscription : subscription})
    } catch (err) {
        req.flash('error', err.toString())
        return res.redirect('/subscriptionprocess/list')
    }
}