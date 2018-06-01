const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { commerce, finance } = faker
  return {
    description: commerce.productName(),
    ean: finance.iban()
  }
}
