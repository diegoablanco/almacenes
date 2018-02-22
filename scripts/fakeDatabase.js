const getDatabase = require('../server/database')
const getCustomerIncludes = require('../server/services/customers/helper')
const { createCustomer, createCarrier, createWarehouse, createService } = require('./fakes')

const sequelize = getDatabase()

sequelize.sync({ force: false }).then(async () => {
  const {
    customer: customers,
    user,
    carrier,
    warehouse,
    service } = sequelize.models
  await user.create({
    name: 'diego',
    email: 'diegoablanco@gmail.com',
    username: 'diego',
    password: '$2a$10$dQy8UbosNI5J2OYtQ0QbyuqQ/Yim5upMI6YP3HGsYwfqQmEV.x1Si',
    roles: 'superAdmin admin',
    isVerified: 1
  })
  const customerIncludes = getCustomerIncludes(sequelize)
  for (let index = 0; index < 51; index += 1) {
    customers.create(createCustomer(), { include: [
      customerIncludes.address,
      customerIncludes.authorizedSignatory,
      customerIncludes.account,
      customerIncludes.authorizedPersons
    ] })
  }

  for (let index = 0; index < 10; index += 1) {
    carrier.create(createCarrier(), { include: [
      customerIncludes.address,
      customerIncludes.authorizedSignatory,
      customerIncludes.account
    ] })
  }
  for (let index = 0; index < 10; index += 1) { warehouse.create(createWarehouse()) }
  for (let index = 0; index < 10; index += 1) { service.create(createService()) }
})
