const path = require('path')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const WarehouseInstruction = sequelize.define('warehouseInstruction', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    }, 
    description: {
      type: Sequelize.STRING
    }
  })
  WarehouseInstruction.associate = function(models){
    WarehouseInstruction.belongsTo(models['stockMovement'])
  }
  
  return WarehouseInstruction
};
