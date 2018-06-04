const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { setNow, validateSchema } = require('feathers-hooks-common')
const validationSchema = require('../../../common/validation/stockAccountIssue.json')
const errorReducer = require('../../helpers/errorReducer')

function validate() {
  const ajv = Ajv({ allErrors: true })

  return validateSchema(validationSchema, ajv, {
    addNewError: errorReducer
  })
}

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [],
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
