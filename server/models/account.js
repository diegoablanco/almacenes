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
      allowNull: false
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
    }
  })
  Account.associate = function ({ address, contact }) {
    Account.belongsTo(address)
    Account.belongsToMany(contact, { as: 'authorizedPerson', through: 'account_contacts', scope: { contactType: 'accountAuthorizedPerson' } })
  }

  return Account
}
