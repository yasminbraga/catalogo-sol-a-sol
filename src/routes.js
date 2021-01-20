const express = require('express')
const multer = require('./app/middlewares/multer')

const ProductController = require('./app/controllers/ProductController')
const CategoryController = require('./app/controllers/CategoryController')

const routes = express.Router()

routes.get('/', ProductController.index)
routes.get('/products', ProductController.index)
routes.get('/products/create', ProductController.create)
routes.post('/products', multer.single("image"), ProductController.store)
routes.get('/products/:id/edit', ProductController.edit)
routes.put('/products', multer.single("image"), ProductController.update)
routes.get('/products/:id', ProductController.show)


routes.get('/categories/create', CategoryController.create)
routes.post('/categories', CategoryController.store)

module.exports = routes