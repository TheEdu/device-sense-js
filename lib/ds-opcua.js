"use strict"
const opcua = require('node-opcua');
const async = require('async');

/* Return Status of the Device */
exports.status = (endpointUrl, callback) => {

  let the_session = null
  const client = new opcua.OPCUAClient({
    connectionStrategy: {
        maxRetry: 2
    }
  })

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
    }], callback
  )
}
