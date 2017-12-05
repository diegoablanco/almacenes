const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const hydrate = require('feathers-sequelize/hooks/hydrate')
const stockSchema = require('../../../common/validation/stock.json')
const errorReducer = require('../../helpers/errorReducer')
function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(stockSchema)
  return validateSchema(stockSchema, ajv, {
    addNewError: errorReducer
  })
}
function getIncludes(database) {
  const {
    models: {
      customer,
      warehouse,
      carrier,
      warehouseInstruction
    }
  } = database
  return {
    customer: {
      model: customer,
      attributes: ['companyName']
    },
    targetCustomer: {
      model: customer,
      as: 'targetCustomer',
      attributes: ['companyName']
    },
    billingCustomer: {
      model: customer,
      as: 'billingCustomer',
      attributes: ['companyName']
    },
    warehouse: {
      model: warehouse
    },
    carrier: {
      model: carrier
    },
    warehouseInstruction: {
      model: warehouseInstruction,
      as: 'instructions',
      through: 'stock_instructions'
    }
  }
}
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function (hook) {
        const { customer, targetCustomer, warehouse } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [customer, targetCustomer, warehouse]
        }
      }
    ],
    get: [
      function (hook) {
        const { customer, targetCustomer, billingCustomer, warehouse, carrier, warehouseInstruction } = getIncludes(hook.app.get('database'))
        hook.params.sequelize = {
          raw: false,
          include: [
            { ...customer, attributes: ['id', 'companyName'] },
            { ...targetCustomer, attributes: ['id', 'companyName'] },
            { ...billingCustomer, attributes: ['id', 'companyName'] },
            { ...carrier, attributes: ['id', 'companyName'] },
            { ...warehouse, attributes: ['id', 'name'] },
            { ...warehouseInstruction, attributes: ['id'], through: { attributes: [] } }
          ]
        }
      }
    ],
    create: [
      validate(),
      setNow('createdAt')
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    create: [
      hydrate(),
      function (hook) {
        const { result, data: { instructions = [] } } = hook
        result.setInstructions(instructions.map(x => x.id))
      }
    ],
    find: [],
    get: [],
    update: [
      hydrate(),
      function (hook) {
        const { result, data: { instructions = [] } } = hook
        result.setInstructions(instructions.map(x => x.id))
      }
    ],
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
    remove: []
  }
}
