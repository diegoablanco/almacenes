const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { setNow, validateSchema } = require('feathers-hooks-common')
const dehydrate = require('feathers-sequelize/hooks/dehydrate')
const validationSchema = require('../../../common/validation/stockAccountMovement.json')
const productSchema = require('../../../common/validation/product.json')
const errorReducer = require('../../helpers/errorReducer')
const debugHook = require('../hooks/debugHook')
const getIncludes = require('./includes')
const computeDetail = require('./computeDetail')
const stripProductInfo = require('./stripProductInfo')
const createOrUpdateAssociations = require('../../models/helpers/createOrUpdateAssociations')
const { processFilter } = require('../helpers')
const { validateProductRemoval } = require('./helpers')

function validate() {
  const ajv = Ajv({ allErrors: true })
  ajv.addSchema(productSchema)

  return validateSchema(validationSchema, ajv, {
    addNewError: errorReducer
  })
}
function includes(hook) {
  const { products, stockMovementType } = getIncludes(hook.app.get('database'))
  hook.params.sequelize = {
    raw: false,
    include: [products, stockMovementType]
  }
}
module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local']),
      debugHook()
    ],
    find: [
      includes,
      hook => {
        const stockMovementType = hook.params.sequelize.include.find(x => x.as === 'stockMovementType')
        if (hook.params.query.hasProduct) {
          hook.params.sequelize.include.find(x => x.as === 'products').where = { code: hook.params.query.hasProduct }
          delete hook.params.query.hasProduct
        }
        processFilter(hook, { stockMovementType })
      }
    ],
    get: [includes],
    create: [includes, stripProductInfo, setNow('createdAt'), validate()],
    update: [validate(),
      function (hook) {
        const {
          models: {
            stockAccountMovement
          }
        } = hook.app.get('database')
        const { products } = getIncludes(hook.app.get('database'))
        const filter = {
          where: {
            id: hook.data.id
          },
          include: [products]
        }
        stockAccountMovement.findOne(filter).then(m => {
          m.set(hook.data)
          createOrUpdateAssociations(m, hook.data, m._options.include)
        })
      }],
    patch: [],
    remove: [validateProductRemoval]
  },

  after: {
    all: [debugHook()],
    find: [
      dehydrate(),
      computeDetail],
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
