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
    Customer.belongsTo(models['address'])
    Customer.belongsTo(models['account'])
    Customer.belongsTo(models['contact'], { as: 'authorizedSignatory'})
    Customer.belongsToMany(models['contact'], { as: 'authorizedPersons', through: 'customer_contacts', onDelete: 'CASCADE'})
  }
  return Customer
}
