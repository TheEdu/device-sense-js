"use strict"

/* Visit Home. */
exports.home = (req, res) => {
  res.render('home.ejs', { title: 'Device Sense' })
}