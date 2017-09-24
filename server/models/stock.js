const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Stock = sequelize.define('stock', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    }, 
    name: {
      type: Sequelize.STRING
    }
  })
  Stock.associate = function(models){
    Stock.belongsTo(models['customer'])
    Stock.belongsTo(models['customer'], {as: 'targetCustomer'})
    Stock.belongsTo(models['customer'], {as: 'billingCustomer'})
  }
  return Stock
}
