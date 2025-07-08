require('dotenv').config() 
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { sequelize } = require('./model/Db')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const passport = require('passport')
require('./Authendications/Passport')

// Import Routers
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const mypocketRouter = require('./routes/Rvalid')
const todoRouter = require('./routes/todo.routes') 

const app = express()

//  Database Connection
sequelize
  .authenticate()
  .then(() => console.log(' Connected to MySQL database'))
  .catch((err) => console.error(' Database connection failed:', err))

sequelize
  .sync({ alter: true }) 
  .then(() => console.log(' Database and tables synced'))
  .catch((err) => console.error(' Sync error:', err))

//  Security Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use(limiter)

//  Standard Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

//  View Engine (optional)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/mypocket', mypocketRouter)
app.use('/api/todos', todoRouter) 

//  404 Handler
app.use((req, res, next) => {
  next(createError(404, 'Endpoint not found'))
})

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // JSON error for API routes
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    })
  }

  // Render error page for web routes
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
