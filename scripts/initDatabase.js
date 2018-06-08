const getDatabase = require('../server/database')

const sequelize = getDatabase()

sequelize.sync({ force: true }).then(async () => {
  const {
    phoneType,
    stockMovementType,
    user,
    warehouseInstruction,
    stockItemDetailType,
    documentType,
    stockStatus,
    role,
    stockAccount } = sequelize.models
  await role.bulkCreate([
    { description: 'Administrador', code: 'admin' },
    { description: 'Usuario', code: 'user' }
  ])
  const adminRole = await role.findOne({ where: { code: 'admin' } })
  const adminUser = await user.create({
    name: 'diego',
    email: 'diegoablanco@gmail.com',
    username: 'diego',
    password: '$2a$10$dQy8UbosNI5J2OYtQ0QbyuqQ/Yim5upMI6YP3HGsYwfqQmEV.x1Si',
    isVerified: 1
  })
  adminUser.addRole(adminRole)
  await phoneType.bulkCreate([
    { description: 'Móvil', code: 'mobile' },
    { description: 'Oficina', code: 'work' },
    { description: 'Particular', code: 'home' }
  ])
  stockMovementType.bulkCreate([
    { description: 'Pre Alerta', code: 'preReceive', color: 'yellow' },
    { description: 'Alta', code: 'receive', color: 'green' },
    { description: 'Release', code: 'release', color: 'purple' },
    { description: 'Salida', code: 'issue', color: 'blue' },
    { description: 'Modificación', code: 'edit', color: 'grey' },
    { description: 'Hold', code: 'hold', color: 'grey' }
  ])
  stockStatus.bulkCreate([
    { description: 'PRE ALERTA', code: 'preReceive', color: 'yellow' },
    { description: 'ALTA', code: 'receive', color: 'green' },
    { description: 'ON HOLD', code: 'onHold', color: 'grey' },
    { description: 'LIBERADO', code: 'released', color: 'purple' },
    { description: 'COMPLETADO', code: 'fulfilled', color: 'black' }
  ])
  stockItemDetailType.bulkCreate([
    { description: 'Manipulación evidente', code: 'signOfHandling' },
    { description: 'Abolladas', code: 'crashed' },
    { description: 'Dañadas', code: 'damaged' },
    { description: 'Mojadas', code: 'wet' },
    { description: 'Abiertas', code: 'opened' },
    { description: 'Precintos originales', code: 'originalSeals' },
    { description: 'Reprecintadas', code: 'resealed' },
    { description: 'Números de serie en cada caja', code: 'serialNumbers' },
    { description: 'Con precinto', code: 'sealed' },
    { description: 'Sin precinto', code: 'unsealed' },

    { description: 'Mojados', code: 'wetpallet' },
    { description: 'Dañados', code: 'damagedpallet' },
    { description: 'Retractilados', code: 'shrinkWrapped' },
    { description: 'Precinto sobre retráctil', code: 'sealOverShrinkWrap' },
    { description: 'Fleje', code: 'hoopStrap' }
  ])
  documentType.bulkCreate([
    { description: 'CMR', code: 'cmr', type: 'stock' },
    { description: 'Albarán', code: 'albaran', type: 'stock' },
    { description: 'Packing List', code: 'packlist', type: 'stock' },
    { description: 'Documento de Salida de Stock Firmado', code: 'signedWithdrawal', type: 'stock' },
    { description: 'Company title', code: 'companyTitle', type: 'customer' },
    { description: 'VAT registration', code: 'vatRegistration', type: 'customer' },
    { description: 'Trade License', code: 'tradeLicense', type: 'customer' },
    { description: 'Otro', code: 'other' }
  ])
  warehouseInstruction.bulkCreate([
    { description: 'Verificar estado', code: 'checkCondition' },
    { description: 'Tomar fotos', code: 'takePictures' },
    { description: 'Contar unidades externamente', code: 'countExternaly' },
    { description: 'Abrir, contar, verificar modelos', code: 'openCountAndCheckModels' },
    { description: 'Lectura IMEIs / Serials', code: 'imeiSerialsReading' }
  ])
  stockAccount.bulkCreate([
    { }
  ])
})

