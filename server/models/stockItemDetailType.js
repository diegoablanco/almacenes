const baseUneditable = require('./baseUneditable')

module.exports = function (sequelize) {
  return sequelize.define('stockItemDetailType', baseUneditable)
}

