const express = require('express')
const router = express.Router()
const passport = require('passport')
const todoController = require('../controller/todo.controller')
console.log(' todo.routes.js loaded')

//  Create a new todo task
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  todoController.createTask
)

//  Get all todos
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  todoController.getTasks
)

//  Delete a todo by ID
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  todoController.deleteTask
)

//  Update a todo by ID 
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  todoController.updateTask
)

module.exports = router
