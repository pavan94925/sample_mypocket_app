const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const mypocketcontroller = require('../controller/mpa.controller')
const passport = require('passport')
const todosController = require('../controller/todo.controller')

// Validation rules
const registrationValidationRules = [
  body('fullname')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Name must contain only letters and spaces'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
    .withMessage('Email must be in lowercase only'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character'),
]

// Login validation rules
const loginValidationRules = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email'),

  body('password').notEmpty().withMessage('Password is required'),
]

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Routes
router.post(
  '/register',
  registrationValidationRules,
  validateRequest,
  mypocketcontroller.createmypocketinfo
)

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  todosController.createTask
)

router.post(
  '/login',
  loginValidationRules,
  validateRequest,
  mypocketcontroller.loginmypocketinfo
)
router.post('/forgot-password', mypocketcontroller.forgotPassword)

// Existing route
router.get('/', mypocketcontroller.getmypocketinfo)
router.get('/:id', mypocketcontroller.getbyidmypocketinfo)
router.get(
  '/secure-data',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({ message: 'Secure access granted', user: req.user })
  }
)

module.exports = router
