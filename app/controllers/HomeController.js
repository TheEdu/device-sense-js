"use strict"

/* Visit Home. */
exports.home = (req, res) => {
  res.render('home.ejs', {
    error :  req.flash("error"),
    success: req.flash("success")
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
  res.redirect('/')
}

/*Is logged?*/
exports.loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}