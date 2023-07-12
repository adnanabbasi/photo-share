const express = require('express')
const PageRouter = express.Router()
const db = require('../models')

// routes
PageRouter.get('/', (request, response) => {
  response.render('index')
})
PageRouter.get('/photo', (request, response) => {
  console.log('/photo')
  response.render('photo')
})

PageRouter.get('/login', (request, response) => {
  console.log("/LOGGING IN!")
  response.render("login")
})

PageRouter.get('/signUp', (request, response) => {
  console.log("/signUp!")
  response.render("signUp")
})

module.exports = PageRouter