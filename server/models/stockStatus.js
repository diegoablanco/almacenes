const Sequelize = require('sequelize')
const baseUneditable = require('./baseUneditable')

module.exports = function (sequelize) {
  return sequelize.define('stockStatus', {
    ...baseUneditable,
    color: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}

