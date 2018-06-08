const Sequelize = require('sequelize')
const baseUneditable = require('./baseUneditable')

module.exports = function (sequelize) {
  return sequelize.define('stockMovementType', {
    ...baseUneditable,
    color: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}

