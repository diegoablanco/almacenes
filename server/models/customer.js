const getAccount = require('./account')
const getAddress = require('./address')
const getContact = require('./contact')
const getPhone = require('./phone')
const Sequelize = require('sequelize')

module.exports = function (sequelize) {  
  const Customer = sequelize.define('customer', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    vat: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCount: (options) => { 
        options.raw = true 
      }
    }
  }
)
  Customer.associate = function(models){
    Customer.belongsTo(models['account'])
    Customer.belongsTo(models['address'])  
    Customer.hasOne(models['contact'], { as: 'authorizedSignatory', scope: { contactType: 'customerAuthorizedSignatory' }})
    Customer.hasMany(models['contact'], { as: 'authorizedPerson', scope: { contactType: 'customerAuthorizedPerson' }})
  }
  return Customer
}
