const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Account = sequelize.define('account', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true      
    }, 
    bankName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    iban: {
      type: Sequelize.STRING
    },
    swiftBic: {
      type: Sequelize.STRING
    },
  })
  Account.associate = function(models){
    Account.hasOne(models['address'])
    Account.hasMany(models['contact'], {as: 'authorizedPerson'})
  }

  return Account
}
