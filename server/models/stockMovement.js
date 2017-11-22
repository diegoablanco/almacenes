const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  return sequelize.define('stockMovement', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    }, 
    description: {
      type: Sequelize.STRING
    }
  })
};
