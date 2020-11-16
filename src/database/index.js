const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Product = require('../app/models/Product')
const Category = require('../app/models/Category')

const connection = new Sequelize(dbConfig)

Product.init(connection)
Category.init(connection)

module.exports = connection