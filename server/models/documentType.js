const baseUneditable = require('./baseUneditable')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('documentType', {
    ...baseUneditable,
    type: {
      type: Sequelize.STRING
    }
  })
}
