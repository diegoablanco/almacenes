const faker = require('faker')

faker.locale = 'es'
module.exports = function () {
  const { lorem } = faker
  return {
    description: lorem.paragraph()
  }
}
