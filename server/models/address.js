const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  return sequelize.define('address', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    }, 
    line1: {
      type: Sequelize.STRING
    }, 
    line2: {
      type: Sequelize.STRING
    },  
    zipCode: {
      type: Sequelize.STRING
    }, 
    city: {
      type: Sequelize.STRING
    }, 
    country: {
      type: Sequelize.STRING
    }
  })
};
