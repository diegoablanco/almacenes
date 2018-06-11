const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { commerce } = faker
  return {
    description: commerce.product()
  }
}
