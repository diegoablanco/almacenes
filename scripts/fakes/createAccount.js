const faker = require('faker')
const createContact = require('./createContact')
const createAddress = require('./createAddress')

faker.locale = 'es'
module.exports = function () {
  const { finance } = faker
  return {
    bankName: finance.accountName(),
    number: finance.account(),
    iban: finance.iban(),
    swiftBic: finance.bic(),
    address: createAddress(),
    authorizedPerson: [createContact()]
  }
}
