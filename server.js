const express = require('express')
const app = new express()
const db = require('./models')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

const PhotosRouter = require('./routes/PhotosRouter')
const UsersRouter = require('./routes/UsersRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const PageRouter = require('./routes/PageRouter')
app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)
app.use('/', PageRouter)

//db
const sqlPort = 3307 // 3306 or 3307
db.sequelize
  .sync({})
  .then(() => {
    app.listen(sqlPort, () => {
      console.log(`Mariadb Connection Successful - http://localhost:${sqlPort}.`)
    })
  })
  .catch(error => {
    console.error('Unable to connect to the database', error)
  })
//server
const port = 8080
app.listen(port, () => {
  console.log(`Serving photo app on http://localhost:${port}`)
})

