const path = require('path')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  return sequelize.define('warehouse', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    } 
  })
};
