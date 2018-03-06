const baseUneditable = require('./baseUneditable')

module.exports = function (sequelize) {
  const Role = sequelize.define('role', baseUneditable)
  return Role
}
