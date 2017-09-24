const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Shipper = sequelize.define('shipper', {
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

  Shipper.associate = function(models){
    Shipper.hasOne(models['address'])
  }

  return Shipper
}
