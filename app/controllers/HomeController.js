"use strict"

/* Visit Home. */
exports.home = (req, res) => {
  res.render('home.ejs', {
    error :  req.flash("error"),
    success: req.flash("success")
  })
}

/* Dash. */
exports.dash = (req, res) => {
  res.render('dash.ejs', {
    error :  req.flash("error"),
    success: req.flash("success"),
    showDash: 1
  })
}

/* Login. */
exports.login = (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('auth/login.ejs', {
      error :  req.flash("error"),
      success: req.flash("success")
    })
  } else {
    res.redirect('/home')
  }
}

/* Logout */
exports.logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/login')
}

/* Check is user is Logged In */
exports.loggedIn = (req, res, next) => {
  // return next() // loggedIn defuse(?)
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}