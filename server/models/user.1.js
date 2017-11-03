const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const User = sequelize.define('user', {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    username: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    roles: {
      type: Sequelize.STRING
    }, 
    isVerified: {
      type: Sequelize.BOOLEAN
    }, 
    verifyToken: {
      type: Sequelize.STRING
    },   
    verifyShortToken: {
      type: Sequelize.STRING
    }, 
    verifyExpires: {
      type: Sequelize.DATE
    },     
    resetToken: {
      type: Sequelize.STRING
    }, 
    resetShortToken: {
      type: Sequelize.STRING
    }, 
    resetExpires: {
      type: Sequelize.DATE
    }, 
    verifyChanges: {
      type: Sequelize.JSON
    }
  })
  return User
}
