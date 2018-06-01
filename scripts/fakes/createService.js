const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { finance, random } = faker
  return {
    description: random.words(),
    rate: finance.amount()
  }
}
