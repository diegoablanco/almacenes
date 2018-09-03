const auth = require('feathers-authentication').hooks
const Ajv = require('ajv')
const { validateSchema } = require('feathers-hooks-common')
const errors = require('feathers-errors')
const stockHoldSchema = require('../../../common/validation/stockHold.json')
const stockReleaseSchema = require('../../../common/validation/stockRelease.json')
const stockReferenceSchema = require('../../../common/validation/stockReference.json')
const stockIssueSchema = require('../../../common/validation/stockIssue.json')
const addressSchema = require('../../../common/validation/address.json')
const errorReducer = require('../../helpers/errorReducer')

function getValidatorByMovementType(movementType) {
  const ajv = Ajv({ allErrors: true, $data: true })
  if (movementType === 'issue') {
    ajv.addSchema(stockIssueSchema)
    ajv.addSchema(addressSchema)
    ajv.addSchema(stockReferenceSchema)
    return validateSchema(stockIssueSchema, ajv, {
      addNewError: errorReducer
    })
  } else if (movementType === 'release') {
    ajv.addSchema(stockReleaseSchema)
    ajv.addSchema(stockReferenceSchema)
    return validateSchema(stockReleaseSchema, ajv, {
      addNewError: errorReducer
    })
  } else if (movementType === 'hold') {
    ajv.addSchema(stockHoldSchema)
    return validateSchema(stockHoldSchema, ajv, {
      addNewError: errorReducer
    })
  }
  throw new errors.BadRequest('Invalid movement type');
}
function validateByMovementType(context) {
  const { data: { movementType } } = context
  const validate = getValidatorByMovementType(movementType)
  validate(context)
}

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [],
    get: [],
    create: [validateByMovementType],
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
};
