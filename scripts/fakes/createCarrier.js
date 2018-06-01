const faker = require('faker')
const createCustomer = require('./createCustomer')

faker.locale = 'es'
module.exports = function () {
  const { companyName, address, account, authorizedSignatory } = createCustomer()
  return {
    companyName,
    address,
    account,
    authorizedSignatory
  }
}
