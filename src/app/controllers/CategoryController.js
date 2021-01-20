const Category = require('../models/Category')

module.exports = {
  create(req, res) {
    return res.render('categories/create')
  },
  async store(req, res) {
    try {
      
      const {name} = req.body
      
      const category = await Category.create({name})
      
      return res.send(category)
    } catch (error) {
      console.error(error)      
    }
  }
}