const { unlinkSync } = require('fs')

const Product = require('../models/Product')
const Category = require('../models/Category')
const File = require('../models/File')

const { formatPrice } = require('../../lib/utils')


module.exports = {
  async index(req, res) {
    const products = await Product.findAll()

    return res.render('products/index', {products})
  },
  async show(req, res) {
    const { id } = req.params

    const product = await Product.findByPk(id)
    product.dataValues.price = formatPrice(product.dataValues.price)

    const category = await Category.findByPk(product.dataValues.category_id)

    return res.render('products/show', {product, category})
  },
  async create(req, res) {
    const categories = await Category.findAll()

    return res.render('products/create', {categories})
  },
  async store(req, res) {
    try {
      let { name, description, price, quantity, category_id} = req.body
      let {filename, path } = req.file

      price = price.replace(/\D/g, "")
  
      const product = await Product.create({
        name, 
        description, 
        price, 
        quantity, 
        category_id
      })

      const file = await File.create({
        name: filename,
        path,
        product_id: product.id
      })
  
      return res.redirect(`/products/${product.id}`)
      
    } catch (error) {
      console.error(error)
    }
  },
  
  async edit(req, res) {
    try {
      let product = await Product.findByPk(req.params.id)

      const categories = await Category.findAll()

      let productImage = await File.findOne({
        where: {
          product_id: req.params.id
        }
      })

      productImage = {
        ...productImage,
        id: productImage.dataValues.id,
        src: `${productImage.path.replace('public', '')}`
      }

      return res.render('products/edit', {product, categories, productImage})
    } catch (error) {
      console.error(error)
    }
    
  },
  async update(req, res) {
    try {

      const {id, name, description, price, category_id} = req.body

      if (req.file) {
        await File.create({
          name: req.file.filename,
          path: req.file.path,
          product_id: req.body.id
        })
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(id => File.destroy({
          where: {
            id: id
          }
        }))
        await Promise.all(removedFilesPromise)
      }

      await Product.update({
        name,
        description,
        price,
        category_id
      }, {
        where: {
          id: req.body.id
        }
      })

      return res.redirect(`/products/${id}`)

    } catch (error) {
      console.error(error)
    }
  },
  async delete(req, res) {
    try {
      const productImage = await File.findOne({
        where: {
          product_id: req.body.id
        }
      })
      
      unlinkSync(productImage.dataValues.path)
  
      await Product.destroy({
        where: {
          id: req.body.id
        }
      })
  
      return res.redirect('/products/create')
    } catch (error) {
      console.error(error)
    }
    
  }
}