const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Contact = sequelize.define('contact', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    position: {
      type: Sequelize.STRING
    }, 
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    contactType: {
      type: Sequelize.STRING
    }     
  })
  Contact.associate = function(models){
    Contact.hasMany(models['phone'])
  }
  return Contact
}
