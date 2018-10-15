const config = require('./config/config');
const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()
app.set('port', config.port);

// view engine setup
app.use(express.static(config.root + '/public'))
app.set('views', config.root + '/app/views')
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.title = 'Error'
  res.locals.message = err.message
  res.locals.error = config.env === 'development' ? err : {}
  res.status(err.status || 500);

  // render the error page
  res.render('error');
});

module.exports = app
