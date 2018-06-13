const faker = require('faker')

faker.locale = 'es'
module.exports = function ({ numberOfExistingCategories }) {
  const { commerce, random } = faker
  return {
    description: commerce.productName(),
    ean: random.number({ min: 1000000000000, max: 9999999999999 }),
    categoryId: random.number({ min: 1, max: numberOfExistingCategories })
  }
}
