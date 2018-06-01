const faker = require('faker')
const createPhone = require('./createPhone')

faker.locale = 'es'
module.exports = function () {
  const { name, internet } = faker
  return {
    name: name.findName(),
    position: name.jobType(),
    email: internet.email(),
    phones: [
      createPhone()
    ]
  }
}
