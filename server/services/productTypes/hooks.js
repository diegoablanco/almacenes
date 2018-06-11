const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { setNow, validateSchema } = require('feathers-hooks-common')
const validationSchema = require('../../../common/validation/productType.json')
const errorReducer = require('../../helpers/errorReducer')
const getIncludes = require('./includes')
const { processSort, processFilter } = require('../helpers')

function validate() {
  const ajv = Ajv({ allErrors: true })

  return validateSchema(validationSchema, ajv, {
    addNewError: errorReducer
  })
}

function includes(hook) {
  const { category } = getIncludes(hook.app.get('database'))
  hook.params.sequelize = {
    raw: false,
    include: [category]
  }
}

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      includes,
      function (hook) {
        const { category } = getIncludes(hook.app.get('database'))
        processSort(hook, { category })
      }
    ],
    get: [],
    create: [setNow('createdAt'), validate()],
    update: [validate()],
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
};
