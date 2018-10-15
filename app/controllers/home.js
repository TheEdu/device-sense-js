"use strict"

/* Visit Home. */
exports.home = (req, res) => {
  res.render('index.ejs', { title: 'Express' })
}