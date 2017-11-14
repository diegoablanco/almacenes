const path = require('path')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  return sequelize.define('service', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    rate: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  })
};
