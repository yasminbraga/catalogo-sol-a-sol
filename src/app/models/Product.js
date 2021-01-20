const { Model, DataTypes } = require('sequelize')

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}

module.exports = Product