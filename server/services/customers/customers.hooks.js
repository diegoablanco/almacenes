const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const dehydrate = require('feathers-sequelize/hooks/dehydrate')
const customerSchema = require('../../../common/validation/customer.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')
const { processSort } = require('../helpers')
const { getIncludes } = require('./helpers')

function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(customerSchema)
  ajv.addSchema(contactSchema)
  ajv.addSchema(phoneSchema)
  ajv.addSchema(addressSchema)
  ajv.addSchema(accountSchema)

  return validateSchema(customerSchema, ajv, {
    addNewError: errorReducer
  })
}
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function (hook) {
        const { authorizedSignatory } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [
            { ...authorizedSignatory, attributes: ['name', 'email'] }
          ],
          attributes: ['id', 'companyName', 'authorizedSignatoryId'] }
        processSort(hook, { authorizedSignatory })
      }
    ],
    get: [
      function (hook) {
        const { account, address, authorizedSignatory, authorizedPersons, documents } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [account, address, authorizedSignatory, authorizedPersons, documents]
        }
      }
    ],
    create: [
      validate(),
      setNow('createdAt'),
      function (hook) {
        const { account, address, authorizedSignatory, authorizedPersons, documents } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [account, address, authorizedSignatory, authorizedPersons, documents]
        }
      }
    ],
    update: [
      validate(),
      setNow('updatedAt'),
      function (hook) {
        const {
          models: {
            customer
          }
        } = hook.app.get('database')
        const { account, address, authorizedSignatory, authorizedPersons, documents } = getIncludes(hook.app.get('database'))
        const filter = {
          where: {
            id: hook.data.id
          },
          include: [account, address, authorizedSignatory, authorizedPersons, documents]
        }
        customer.findOne(filter).then((c) => {
          c.set(hook.data)
          createOrUpdateAssociations(c, hook.data, c._options.include)
        })
      }],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      function (context) {
        if (context.result.dataValues.address === null) { delete context.result.dataValues.address }
        if (context.result.dataValues.authorizedSignatory === null) { delete context.result.dataValues.authorizedSignatory }
        if (context.result.dataValues.account === null) { delete context.result.dataValues.account } else if (context.result.dataValues.account.address === null) { delete context.result.dataValues.account.address }
      },
      dehydrate(),
      context => {
        context.result.services = [
          { id: 3, serviceId: 4, rate: 859.13 }]
      }],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      context => {
        var a = 1
       // The DELETE statement conflicted with the REFERENCE constraint (".+"). The conflict occurred in database (".+"), table (".+"), column ('.+')
      }
    ]
  }
}
