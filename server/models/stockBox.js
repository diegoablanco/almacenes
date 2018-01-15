const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const StockBox = sequelize.define('stockBox', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    opened: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    originalSeals: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    resealed: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    serialNumbers: {
      type: Sequelize.BOOLEAN, defaultValue: false
    },
    shrinkWapped: {
      type: Sequelize.STRING
    },
    individualWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalWeight: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  })
  StockBox.associate = function ({ stockItemDetail }) {
    StockBox.belongsToMany(stockItemDetail, { as: 'details', through: 'stockBox_details' })
  }
  return StockBox
}
