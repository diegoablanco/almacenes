
const getDatabase = require('../server/database')
const getCustomerIncludes = require('../server/services/customers/helper')

const sequelize = getDatabase()

sequelize.sync({ force: true }).then(async () => {
  const {
    customer: customers,
    phoneType,
    stockMovementType,
    user } = sequelize.models
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
    { description: 'Prealerta', code: 'prealerta' },
    { description: 'Alta', code: 'alta' },
    { description: 'Release', code: 'release' },
    { description: 'Salida', code: 'salida' }
  ])
  const customer = {
    companyName: 'sabre',
    address: {
      line1: 'Honorio Pueyrredón 1713',
      zipCode: '1414',
      city: 'CABA',
      country: 'Argentina'
    },
    authorizedSignatory: {
      name: 'Diego Blanco',
      position: 'Developer',
      email: 'diegoablanco@gmail.com',
      phones: [
        {
          typeId: 1,
          number: '1132602055'
        }
      ]
    },
    account: {
      bankName: 'Piano',
      number: '12121-12313-23123'
    },
    authorizedPersons: [
      {
        name: 'Laura Blanco',
        phones: [
          {
            typeId: 1,
            number: '11112222'
          }
        ],
        position: 'Comercial',
        email: 'l@gmail.com'
      }
    ]
  }
  const customerIncludes = getCustomerIncludes(sequelize)
  await customers.create(customer, { include: [
    customerIncludes.address,
    customerIncludes.authorizedSignatory,
    customerIncludes.account,
    customerIncludes.authorizedPersons
  ] })
  // const address = await addresses.create({ line1: 'honorio pueyrredón', zipCode: '1414' })
  // const authorizedSignatory = await contacts.create()
  // customer.setAddress(address)
  // customer.setAuthorizedSignatory(authorizedSignatory)
})
