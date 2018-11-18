"use strict"
const opcua = require('node-opcua');
const async = require('async');

/* Return Status of the Device */
exports.status = (endpointUrl) => {

  let getStatus =  new Promise((resolve, reject) => {

    const timeout_ms = 2000
    const client = new opcua.OPCUAClient({
      connectionStrategy: { maxRetry: 2 }
    })
    let the_session = null

    // Getting the device status
    async.series([
      function (callback) {
        console.log("step 1: Connect to the Server") // step 1: Connect to the Server
        client.connect(endpointUrl, function (err) {
          callback(err)
        })
      },

      function(callback) {
        console.log("step 2 : createSession") // step 2 : createSession
        client.createSession( function(err,session) {
          if(!err) the_session = session
          callback(err)
        })
      },

      function(callback) {
        console.log("step 3 : close session") // step 3 : close session
        the_session.close(function(err){
          callback(err)
        })
      },

      function (callback) {
        console.log("step 4 : Disconnect to the Server") // step 4 : Disconnect to the Server
        client.disconnect(function (err) {
          callback(err)
        })
      }], function(err) {
        if (!err) {
          // console.log(`Promesa Aceptada`)
          resolve(true)
        } else {
          // console.log(`Promesa Rechazada --> ${err}`)
          reject(err)
        }
      }
    )

    // Set up the timeout
    setTimeout(function() {
        reject('timed out after ' + timeout_ms + ' ms')
    }, timeout_ms)

  })

  return getStatus

}
