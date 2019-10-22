"use strict"
var bCrypt = require('bcrypt-nodejs')
const db = require('../models')

exports.list = async (req, res) => {
  try {
    // Get all Users
    let users = await db.User.findAll({})

    res.render('user/list.ejs', {
      users: users,
      success: req.flash("success"),
      error: req.flash("error")
    })

  } catch (error) {
    res.render('home.ejs', {error : error.toString()})
  }
}

exports.createIndex = (req, res) => {
  res.render('user/create.ejs', {})
}

exports.create = async (req, res) => {
  // Get User
  const user = req.user

  // Get the form inputs from the request body
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const password2 = req.body.password2

  const params = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }

  // Check for restrictions
  if (password != password2) {
    return res.render('user/create.ejs', {
      params,
      error: 'Las Contraseñas Ingresadas no coinciden!'
    })
  }

  // Check for restrictions
  if (!firstName || !lastName || !email || !password) {
    return res.render('user/create.ejs', {
      params,
      error: 'Los Campos Nombres, Apellidos, Email y Contraseña deben tener contenido'
    })
  }

  try {
    // Insert new User to the Database
    await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })

    req.flash('success', 'Usuario Creado Exitosamente.')
    return res.redirect('/user/list')
  } catch (err) {
    return res.render('user/create.ejs', {
      params,
      error: `${err}`
    })
  }
}

exports.updateIndex = async (req, res) => {
  // Get URL params
  const user_id = req.params.id
  
  try {
    // Get User to Update
    let user = await db.User.findOne({
                          where: {id: user_id}
                        })
    return res.render('user/update.ejs', {user})
  } catch (err) {
    // Redirect to User List with the Error
    req.flash('error', err.toString())
    return res.redirect('/user/list')
  }
}

exports.update = async (req, res) => {
  // Get the form inputs from the request body
  let user = null
  const id = req.body.id

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const passwordNew = req.body.passwordNew
  const passwordNew2 = req.body.passwordNew2

  const params = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }
  // Get the User by the hidden form Id
  try {
    user = await db.User.findById(id)
  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/user/list')
  }

  // If the User could not be found, then redirect to User List
  if (user == null) {
    req.flash('error', 'No se pudo Actualizar el Usuario. Por favor inténtelo de nuevo en unos minutos.')
    return res.redirect('/user/list')
  }

  // Check for restrictions
  if (!firstName || !lastName || !email) {
    return res.render('user/update.ejs', {
      params,
      error: 'Los Campos Nombres, Apellidos, Email deben tener contenido'
    })
  }

  // Check for restrictions
  if (passwordNew) {
    if (!password || !bCrypt.compareSync(password, user.password)) {
      return res.render('user/update.ejs', {
        params,
        error: 'La Contraseña Actual ingresada no es válida'
      })
    }

    if (!passwordNew2 || (passwordNew2 != passwordNew)) {
      return res.render('user/update.ejs', {
        params,
        error: 'La Nueva Contraseña no coincide'
      })
    }
  }

  // Update User
  try {
    if (passwordNew) {
      await user.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bCrypt.hashSync(passwordNew, bCrypt.genSaltSync(10))
      })
    } else {
      await user.update({
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    }

    req.flash('success', 'Usuario Actualizado Correctamente.')
    return res.redirect('/user/list')

  } catch (err) {
    return res.render('user/update.ejs', {
      user: user,
      params: params,
      error: err.toString()
    })
  }
  
}

exports.delete = async (req, res) => {
  const deleteId = req.body.deleteId

  try {
    let user = await db.User.findById(deleteId)
    await user.destroy()
    req.flash('success', 'Usuario Eliminado Correctamente.')
    return res.redirect('/user/list')

  } catch (err) {
    req.flash('error', err.toString())
    return res.redirect('/user/list')
  }
}


exports.changePasswordIndex = async (req, res) => {
  console.log(req.user)
  return res.render('user/changePassword.ejs', {})
}

exports.changePassword = async (req, res) => {
  // Get the form inputs from the request body
  const password = req.body.password
  const passwordNew = req.body.passwordNew
  const passwordNew2 = req.body.passwordNew2
  const user_id = req.user.id
  let user = null
  
  try {
    // Get User to Update
    user = await db.User.findOne({
                          where: {id: user_id}
                        })
  } catch (err) {
    // Redirect to User List with the Error
    req.flash('error', err.toString())
    return res.redirect('/home')
  }

  // Check for restrictions
  if (passwordNew) {
    if (!password || !bCrypt.compareSync(password, user.password)) {
      return res.render('user/changePassword.ejs', {
        error: 'La Contraseña Actual ingresada no es válida'
      })
    }

    if (!passwordNew2 || (passwordNew2 != passwordNew)) {
      return res.render('user/changePassword.ejs', {
        error: 'La Nueva Contraseña no coincide'
      })
    }
  }

  // Update User
  try {
    await user.update({
      password: bCrypt.hashSync(passwordNew, bCrypt.genSaltSync(10))
    })

    req.flash('success', 'Contraseña Actualizada Correctamente.')
    return res.redirect('/home')

  } catch (err) {
    return res.render('user/changePassword.ejs', {
      error: err.toString()
    })
  }
  
}