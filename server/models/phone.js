const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Phone = sequelize.define('phone', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    }, 
    number: {
      type: Sequelize.STRING
    }
  })
  Phone.associate = function(models){
    Phone.belongsTo(models['phoneType'], {as: 'type'})
  }
  return Phone
};
