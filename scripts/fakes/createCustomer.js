const faker = require('faker')
const createContact = require('./createContact')
const createAddress = require('./createAddress')
const createAccount = require('./createAccount')

faker.locale = 'es'
module.exports = function () {
  return {
    companyName: faker.company.companyName(),
    authorizedSignatory: createContact(),
    address: createAddress(),
    account: createAccount(),
    authorizedPersons: [
      createContact()
    ]
  }
}
