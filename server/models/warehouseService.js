const path = require('path')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  return sequelize.define('warehouseService', {
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
      type: Sequelize.STRING,
      allowNull: false
    }
  })
};
