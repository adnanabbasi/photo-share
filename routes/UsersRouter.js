const express = require('express')
const UsersRouter = express.Router()
const db = require('../models')
const bodyParser = require('body-parser')
UsersRouter.use(bodyParser.urlencoded())
UsersRouter.use(bodyParser.json())

UsersRouter.route('/login').post((request, response) => {
  const username = request.body.username
  const password = request.body.password
  db.user.findOne(
    { where: { username: username, password: password } }
      .then(user => {
        //response.send(user)
        response.redirect('/')
      })
      .catch(error => {
        response.send('You do not have an account. Try signing up!')
      })
  )
})

UsersRouter.route('/signup').post((request, response) => {
  const email = request.body.email
  const username = request.body.username
  const password = request.body.password
  db.user
    .create({ email: email[0], username: username, password: password })
    .then(user => {
      //response.send(user)
      response.redirect('/login')
    })
    .catch(error => {
      response.send('You do not have an account. Try signing up!')
    })
})

module.exports = UsersRouter
