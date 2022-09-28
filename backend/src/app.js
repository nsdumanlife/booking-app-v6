require('dotenv').config({ debug: process.env.DEBUG })
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./models/user')

const secret = process.env.SECRET || 'thisshouldbeabettersecret'
const validateSecret = process.env.VALIDATE_SECRET || 'thisshouldbeabettersecret'

require('./database-connection')

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

const indexRouter = require('./routes/index')
const accountRouter = require('./routes/account')
const bookingsRouter = require('./routes/bookings')
const bungalowsRouter = require('./routes/bungalows')
const usersRouter = require('./routes/users')

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: [secret, validateSecret],
    store: MongoStore.create({ clientPromise, stringify: false }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV === 'production',
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/bookings', bookingsRouter)
app.use('/api/bungalows', bungalowsRouter)
app.use('/api/users', usersRouter)
app.use('/api/account', accountRouter)
app.use('/api/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
