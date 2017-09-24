const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const { validateSchema, setCreatedAt, setUpdatedAt } = commonHooks;
const schema = require('../../../common/validation/customer.json')
const errorReducer = require('../../helpers/errorReducer')

module.exports = {
  before: {
    all: [
      auth.authenticate(['jwt', 'local'])
    ],
    find: [
      function(hook){
        const { models: { address}} = hook.app.get('database')
        hook.params.sequelize = {
           raw: false,
           include: [ address ]
        }
      }
    ],
    get: [
      function(hook){
        const { models: { address}} = hook.app.get('database')
        hook.params.sequelize = {
           raw: false,
           include: [ address ]
        }
      }
    ],
    create: [validateSchema(schema, Ajv, {addNewError: errorReducer}), setCreatedAt()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [function(hook){
      var a
    }],
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
