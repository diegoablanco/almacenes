const getDatabase = require('../server/database')
const { getIncludes } = require('../server/services/customers/helpers')
const { createCustomer, createCarrier, createWarehouse, createService } = require('./fakes')

const sequelize = getDatabase()

sequelize.sync({ force: false }).then(async () => {
  const {
    customer: customers,
    carrier,
    warehouse,
    service } = sequelize.models
  const customerIncludes = getIncludes(sequelize)
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
