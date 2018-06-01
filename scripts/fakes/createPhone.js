const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { phone } = faker
  return {
    typeId: 1,
    number: phone.phoneNumber()
  }
}
