const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('stockMovementType', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  })
};
