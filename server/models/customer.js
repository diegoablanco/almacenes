const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Customer = sequelize.define('customer', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
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
  Customer.associate = function ({ address, account, contact }){
    Customer.belongsTo(address)
    Customer.belongsTo(account)
    Customer.belongsTo(contact, { as: 'authorizedSignatory'})
    Customer.belongsToMany(contact, { as: 'authorizedPersons', through: 'customer_contacts', onDelete: 'CASCADE'})
  }
  return Customer
}
