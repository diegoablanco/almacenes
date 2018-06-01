const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { address } = faker
  return {
    line1: address.streetAddress(),
    line2: address.secondaryAddress(),
    zipCode: address.zipCode(),
    city: address.city(),
    country: address.country()
  }
}
