const Sequelize = require('sequelize')

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fileName: {
    type: Sequelize.STRING
  },
  hashName: {
    type: Sequelize.STRING
  }
}

