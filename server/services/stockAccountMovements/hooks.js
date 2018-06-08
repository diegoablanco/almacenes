const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { setNow, validateSchema } = require('feathers-hooks-common')
const validationSchema = require('../../../common/validation/stockAccountMovement.json')
const productSchema = require('../../../common/validation/product.json')
const errorReducer = require('../../helpers/errorReducer')
const debugHook = require('../hooks/debugHook')
const getIncludes = require('./includes')

function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(productSchema)

  return validateSchema(validationSchema, ajv, {
    addNewError: errorReducer
  })
}
function includes(hook) {
  const { products } = getIncludes(hook.app.get('database'))
  hook.params.sequelize = {
    raw: false,
    include: [products]
  }
}
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local']),
      debugHook()
    ],
    find: [],
    get: [includes],
    create: [includes, setNow('createdAt'), validate()],
    update: [validate()],
    patch: [],
    remove: []
  },

  after: {
    all: [debugHook()],
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
};
