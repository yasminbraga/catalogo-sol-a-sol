const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
  async index(req, res) {
    const products = await Product.findAll()

    return res.render('products/index', {products})
  },
  async show(req, res) {
    const { id } = req.params

    const product = await Product.findOne({ where: { id }})

    return res.render('products/show', {product})
  },
  async store(req, res) {
    try {
      let { name, description, price, quantity} = req.body

      price = price.replace(/\D/g, "")
  
      const product = await Product.create({name, description, price, quantity})
  
      return res.send(price)
      
    } catch (error) {
      console.error(error)
    }
  },
  async create(req, res) {
    const categories = await Category.findAll()

    return res.render('products/create', {categories})
  },
  update(req, res) {

  },
  delete(req, res) {
    
  }
}