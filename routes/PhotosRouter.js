const express = require('express')
const PhotosRouter = express.Router()
const db = require('../models')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './public/images')
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + '--' + file.originalname)
  }
})

const uploadFilter = function (request, file, callback) {
  const fileType = file.mimetype.split('/')

  if (fileType[0] === 'image') {
    callback(null, true)
  } else {
    callback('You are trying to upload a file that is not an image. Go back and try again', false)
  }
}

const upload = multer({
  fileFilter: uploadFilter,
  storage: fileStorageEngine
})

PhotosRouter.route('/').get((request, response) => {
  db.photo
    .findAll()
    .then((photos) => {
      console.log('GET IMAGES')
      response.send(photos)
    })
    .catch(error => {
      response.send(error)
    })
})

PhotosRouter.route('/').post(upload.single('photo'), (request, response) => {
  const title = request.body.title
  const mediaLocation = request.file.filename
  db.photo
    .create({ title: title, mediaLocation: mediaLocation })
    .then(photo => {
      console.log('POST IMAGES')
      // response.send(photo);
      response.redirect('/');
    })
    .catch(error => {
      response.send(error)
    })
})

PhotosRouter.route('/:photoId').get(upload.single('photo'), (request, response) => {
  const photoId = request.params.photoId
  db.comment
    .findAll({ where: { photoId: photoId } })
    .then(comment => {
      response.send(comment)
    })
    .catch(error => {
      response.send(error)
    })
})

module.exports = PhotosRouter
