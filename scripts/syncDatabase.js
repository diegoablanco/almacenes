const getDatabase = require('../server/database')
const getCustomerIncludes = require('../server/services/customers/helper')
const { createCustomer, createCarrier, createWarehouse, createService } = require('./fakes')

const sequelize = getDatabase()

sequelize.sync({ force: true }).then(async () => {
  const {
    customer: customers,
    phoneType,
    stockMovementType,
    user,
    carrier,
    warehouse,
    warehouseInstruction,
    service,
    stockItemDetailType } = sequelize.models
  await user.create({
    name: 'diego',
    email: 'diegoablanco@gmail.com',
    username: 'diego',
    password: '$2a$10$dQy8UbosNI5J2OYtQ0QbyuqQ/Yim5upMI6YP3HGsYwfqQmEV.x1Si',
    roles: 'superAdmin admin',
    isVerified: 1
  })
  await phoneType.bulkCreate([
    { description: 'Móvil' },
    { description: 'Oficina' },
    { description: 'Particular' }
  ])
  stockMovementType.bulkCreate([
    { description: 'Prealerta', code: 'preReceive' },
    { description: 'Alta', code: 'receive' },
    { description: 'Release', code: 'release' },
    { description: 'Salida', code: 'salida' }
  ])
  stockItemDetailType.bulkCreate([
    { description: 'Manipulación evidente', code: 'signOfHandling' },
    { description: 'Abolladas', code: 'crashed' },
    { description: 'Dañadas', code: 'damaged' },
    { description: 'Mojadas', code: 'wet' }
  ])
  warehouseInstruction.bulkCreate([
    { description: 'Verificar estado', code: 'checkCondition' },
    { description: 'Tomar fotos', code: 'takePictures' },
    { description: 'Contar unidades externamente', code: 'countExternaly' },
    { description: 'Abrir, contar, verificar modelos', code: 'openCountAndCheckModels' },
    { description: 'Lectura IMEIs / Serials', code: 'imeiSerialsReading' }
  ])
  const customerIncludes = getCustomerIncludes(sequelize)
  for (let index = 0; index < 10; index += 1)
    {customers.create(createCustomer(), { include: [
      customerIncludes.address,
      customerIncludes.authorizedSignatory,
      customerIncludes.account,
      customerIncludes.authorizedPersons
    ] })}

  for (let index = 0; index < 10; index += 1)
  {
 carrier.create(createCarrier(), { include: [
    customerIncludes.address,
    customerIncludes.authorizedSignatory,
    customerIncludes.account
  ] }) 
}
  for (let index = 0; index < 10; index += 1) { warehouse.create(createWarehouse()) }
  for (let index = 0; index < 10; index += 1) { service.create(createService()) }
})
