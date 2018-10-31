const config = require('./config/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// new express app and port setup
const app = express()
app.set('port', config.port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// view engine setup
app.use(express.static(config.root + '/public'))
app.set('view engine', 'ejs')
app.set('views', config.root + '/app/views/')

// create session
app.use(session({
    secret: 'I Love League Of Legent',
    resave: true,
    saveUninitialized: true
}))

// passport setup
require('./config/passport.js')(passport)
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// send user (from passport session) object to templates
app.use(function(req, res, next) {
  res.locals.session = req.session;
  // res.locals.user = req.session.passport ? req.session.passport.user : null
  next()
})

// load routes and pass in our app
require('./config/routes.js')(app, passport)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.error = config.env === 'development' ? error : {}
  res.status(error.status || 500)
  // render the error page
  res.render('error')
})

module.exports = app
