"use strict"
const opcua = require('node-opcua')
const async = require('async')

/*******************************************************************************************/
/*********************** Status: Return true if the Device is listening ********************/
/*******************************************************************************************/
exports.status = (endpointUrl, timeout_ms) => {

  let getStatus =  new Promise((resolve, reject) => {

    const client = new opcua.OPCUAClient({
      connectionStrategy: { maxRetry: 2 }
    })
    let the_session = null

    // Getting the device status
    async.series([
      callback => {
        console.log("step 1: Connect to the Server") // step 1: Connect to the Server
        client.connect(endpointUrl, function (err) {
          callback(err)
        })
      },

      callback => {
        console.log("step 2 : createSession") // step 2 : createSession
        client.createSession( function(err,session) {
          if(!err) the_session = session
          callback(err)
        })
      },

      callback => {
        console.log("step 3 : close session") // step 3 : close session
        the_session.close(function(err){
          callback(err)
        })
      },

      callback => {
        console.log("step 4 : Disconnect to the Server") // step 4 : Disconnect to the Server
        client.disconnect(function (err) {
          callback(err)
        })
      }], err => {
        if (!err) {
          resolve(true)
        } else {
          reject(err)
        }
      }
    )

    // Set up the timeout
    setTimeout(() => {
        reject('timed out after ' + timeout_ms + ' ms')
    }, timeout_ms)

  })

  return getStatus

}


/* NodeOPCUA Class*/
class NodeOPCUA {
  constructor(id = null, text = null, nodeClass = null, children = [], state = false) {
    this.id = id
    this.text = text
    this.nodeClass = nodeClass
    this.children = children
    this.state = {
      'disabled': state
    }
  }
}


/* Get Address Space from OPC-UA Server from a seed node (seedId)*/
const getAddressSpace = (session, seedId, NodeCallback) => {
  // console.log("getAddressSpace called")
  const b = [
    {
        nodeId: seedId,
        referenceTypeId: "Organizes",
        includeSubtypes: true,
        browseDirection: opcua.browse_service.BrowseDirection.Forward,
        nodeClassMask: 0, /* Con 0 Trae todos los nodos sin importar el valor de la Clase */
        resultMask: 0x3f
    },
    {
        nodeId: seedId,
        referenceTypeId: "Aggregates",
        includeSubtypes: true,
        browseDirection: opcua.browse_service.BrowseDirection.Forward,
        nodeClassMask: 0, /* Con 0 Trae todos los nodos sin importar el valor de la Clase */
        resultMask: 0x3f /* Specifies the fields in the ReferenceDescription structure that should be returned */
    }
  ]

  var nodeOPCUA = new NodeOPCUA()
  var children = []

  async.series([
    // step 1 : complete attributes
    callback => {
      session.readAllAttributes(seedId, function (err, res) {
        if (!err) {
          nodeOPCUA.id = res.nodeId
          nodeOPCUA.nodeClass = res.nodeClass
          nodeOPCUA.text = res.displayName ? res.displayName.text : 'Sin Nombre'
        }
        callback(err)
      })
    },
    // step 2 : browse references
    callback => {
      /* Solo Busco las referencias de los Nodos Clase 1 (Objects).
         Lo hago para evitar traer las properties de los Varibles a monitorear (Clases 2) y
         tambien para evitar traer los argumentos de los metodos
      */
      if (nodeOPCUA.nodeClass == 1) {
        session.browse(b, function (err, res) {
          if (!err) {
            // "Organizes" references
            let organizesBrowseResult = res[0]
            if (typeof organizesBrowseResult != 'undefined') {
              for (let i = 0; i < organizesBrowseResult.references.length; i++) {
                const ref = organizesBrowseResult.references[i]
                children.push(ref.nodeId)
              }
            }
            
            // "Aggregate" references
            let aggregatesBrowseResult = res[1]
            if (typeof aggregatesBrowseResult != 'undefined') {
              for (let i = 0; i < aggregatesBrowseResult.references.length; i++) {
                const ref = aggregatesBrowseResult.references[i]
                children.push(ref.nodeId)
              }
            }
          }
          callback(err)
        })
      } else {
        console.log(`nodeid: ${nodeOPCUA.id} and nodeClass ${nodeOPCUA.nodeClass}`)
        callback(null)
      }
    },

    callback => {
      //console.log("step 3 : push childs (recursivity)") // step 3 : push childs (recursivity)
      if (children.length == 0){
        switch(nodeOPCUA.nodeClass) {
          case 2:
            nodeOPCUA.state.disabled = false
            break
          default:
            nodeOPCUA.state.disabled = true
        }
        callback()
      }else{
        async.each(children, function (child,refCallback) {
          getAddressSpace(session, child, function (err,res){
            if(!err){
              nodeOPCUA.children.push(res)
            }
            refCallback(err)
          })
        }, function(err){
          if (!err) {
            /* Si todos los hijos estan deshabilitados, entonces deshabilito al padre */
            const childs_number = nodeOPCUA.children.length
            let childs_disabled_number = 0
            for (let i = 0; i < childs_number; i++) {
              if (nodeOPCUA.children[i].state.disabled) {
                childs_disabled_number = childs_disabled_number + 1
              }
            }
            if (childs_number == childs_disabled_number && childs_number > 0) {
              nodeOPCUA.state.disabled =  true
            }
            console.log(`nodeid: ${ nodeOPCUA.id}, childs_numbers: ${childs_number}, childs_disabled_number: ${childs_disabled_number}`)
          }
          callback(err)
        })
      }
    }

  ], err => {
    NodeCallback(err, nodeOPCUA)
  })
}

/*******************************************************************************************/
/********* addressSpace: Return the addressSpace of the device (in json format) ************/
/*******************************************************************************************/
exports.addressSpace = (endpointUrl, nodeId, timeout_ms) => {

  let addressSpace =  new Promise((resolve, reject) => {

    const options = {
        connectionStrategy: {
            maxRetry: 2
        }
    }

    const client = new opcua.OPCUAClient(options)
    let the_session

    async.series([
        // step 1 : connect to
        callback =>  {
            console.log("step 1 : connect to")
            client.connect(endpointUrl,function (err) {
                if(err) {
                    console.log(" cannot connect to endpoint :" , endpointUrl )
                } else {
                    console.log("connected !")
                }
                callback(err)
            })
        },

        // step 2 : createSession
        callback => {
            console.log("step 2 : createSession")
            client.createSession( function(err,session) {
                if(!err) {
                    the_session = session
                    console.log("session created !")
                } else {
                    console.log(err)
                }
                callback(err)
            })
        },

        // step 3 : getAddressSpace
        callback => {
            console.log("step 3 : generateTree")
            getAddressSpace(the_session,nodeId,function (err,result){
                callback(err,result)
            })
        },

        // step 4 : close session
        callback => {
            console.log("step 4 : close session")
            the_session.close(function(err){
                if(err) {
                    console.log("session closed failed")
                } else {
                    console.log("session closed")
                }
                callback()
            })
        },

        // step 5 : client disconnected
        callback => {
            console.log("step 5 : client disconnected")
            client.disconnect(function(err){
                if(err) {
                    console.log("client disconnected failed")
                } else {
                    console.log("client disconnected")
                }
                callback()
            })
        }

        ], (err,result) => {
            if(!err){
                let treeResultIndex = 2 // Result of step 3 : generateTree
                resolve(result[treeResultIndex])
            }else{
                reject(err)
            }
        }
    )

    // Set up the timeout
    setTimeout(() => {
        reject('timed out after ' + timeout_ms + ' ms')
    }, timeout_ms)

  })

  return addressSpace
}
