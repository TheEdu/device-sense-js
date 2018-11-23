"use strict"
const opcua = require('node-opcua');
const async = require('async');

/* Leaft Class*/
class Leaft {
  constructor(id = null, text = null, nodeClass = null, children = []) {
    this.id = id;
    this.text = text;
    this.nodeClass = nodeClass;
    // this.browseName = browseName;
    this.children = children;
  }
}


/* Get Tree from seed */
function getTree(session, seedId, leaftCallback){
  // console.log("getTree called")
  const b = [
    {
        nodeId: seedId,
        referenceTypeId: "Organizes",
        includeSubtypes: true,
        browseDirection: opcua.browse_service.BrowseDirection.Forward,
        resultMask: 0x3f
    },
    {
        nodeId: seedId,
        referenceTypeId: "Aggregates",
        includeSubtypes: true,
        browseDirection: opcua.browse_service.BrowseDirection.Forward,
        resultMask: 0x3f
    }
  ]

  var leaft = new Leaft()
  var children = []

  async.series([
    function(callback) {
      //console.log("step 1 : complete attributes") // step 1 : complete attributes
      session.readAllAttributes(seedId, function (err, res) {
        if(!err){
          leaft.id = res.nodeId
          leaft.nodeClass = res.nodeClass
          leaft.text = res.displayName.text
          // leaft.browseName = res.browseName
        }
        callback(err)
      })
    },

    function(callback) {
      //console.log("step 2 : browse references") // step 2 : browse references
      session.browse(b, function (err, res) {
        if (!err) {
          let browseResult = res[0]
          for (let i = 0; i < browseResult.references.length; i++) {
            const ref = browseResult.references[i]
            children.push(ref.nodeId)
          }

          browseResult = res[1]
          for (let i = 0; i < browseResult.references.length; i++) {
            const ref = browseResult.references[i]
            children.push(ref.nodeId)
          }
        }
        callback(err)
      })
    },

    function(callback) {
      //console.log("step 3 : push childs (recursivity)"); // step 3 : push childs (recursivity)
      if (leaft.children == []){
        callback()
      }else{
        async.each(children,function(child,refCallback){
          getTree(session, child, function (err,res){
            if(!err){
              leaft.children.push(res)
            }
            refCallback(err)
          })
        }, function(err){
          callback(err)
        })
      }
    }

  ], function (err) {
    leaftCallback(err, leaft);
  });
}


exports.tree = (endpointUrl, nodeId) => {

  let tree =  new Promise((resolve, reject) => {

    const timeout_ms = 5000
    const options = {
        connectionStrategy: {
            maxRetry: 2
        }
    };

    const client = new opcua.OPCUAClient(options);
    let the_session;

    async.series([
        // step 1 : connect to
        function(callback)  {
            console.log("step 1 : connect to");
            client.connect(endpointUrl,function (err) {
                if(err) {
                    console.log(" cannot connect to endpoint :" , endpointUrl );
                } else {
                    console.log("connected !");
                }
                callback(err);
            });
        },

        // step 2 : createSession
        function(callback) {
            console.log("step 2 : createSession");
            client.createSession( function(err,session) {
                if(!err) {
                    the_session = session;
                    console.log("session created !");
                } else {
                    console.log(err);
                }
                callback(err);
            });
        },

        // step 3 : getTree
        function(callback) {
            console.log("step 3 : generateTree");
            getTree(the_session,nodeId,function (err,result){
                callback(err,result);
            });
        },

        // step 4 : close session
        function(callback) {
            console.log("step 4 : close session");
            the_session.close(function(err){
                if(err) {
                    console.log("session closed failed");
                } else {
                    console.log("session closed");
                }
                callback();
            });
        },

        // step 5 : client disconnected
        function(callback) {
            console.log("step 5 : client disconnected");
            client.disconnect(function(err){
                if(err) {
                    console.log("client disconnected failed");
                } else {
                    console.log("client disconnected");
                }
                callback();
            });
        }

        ], function (err,result) {
            if(!err){
                let treeResultIndex = 2; // Result of step 3 : generateTree
                resolve(result[treeResultIndex])
            }else{
                reject(err)
            }
        }
    )

    // Set up the timeout
    setTimeout(function() {
        reject('timed out after ' + timeout_ms + ' ms')
    }, timeout_ms)

  })

  return tree
}

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
