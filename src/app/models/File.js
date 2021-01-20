const {Model, DataTypes} = require('sequelize')

class File extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      path: DataTypes.STRING,
      product_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}

module.exports = File