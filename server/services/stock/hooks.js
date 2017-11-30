const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema, setNow } = require('feathers-hooks-common')
const carrierSchema = require('../../../common/validation/carrier.json')
const contactSchema = require('../../../common/validation/contact.json')
const phoneSchema = require('../../../common/validation/phone.json')
const addressSchema = require('../../../common/validation/address.json')
const accountSchema = require('../../../common/validation/account.json')
const errorReducer = require('../../helpers/errorReducer')

function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(carrierSchema)
  ajv.addSchema(contactSchema)
  ajv.addSchema(phoneSchema)
  ajv.addSchema(addressSchema)
  ajv.addSchema(accountSchema)
  return validateSchema(carrierSchema, ajv, {
    addNewError: errorReducer
  })
}

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
    ],
    get: [
      function (hook) {
        hook.params.sequelize = {
          raw: false
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
    find: [],
    get: [],
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
    remove: []
  }
}
