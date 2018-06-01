const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { company, internet, phone } = faker
  return {
    name: company.companyName(),
    email: internet.email(),
    phone: phone.phoneNumber()
  }
}
