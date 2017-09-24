const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const commonHooks = require('feathers-hooks-common');
const { setCreatedAt, setUpdatedAt } = commonHooks;
const schema = require('../../../common/validation/warehouse.json')
const errorReducer = require('../../helpers/errorReducer')

module.exports = {
  before: {
    all: [
    ],
    find: [function(hook){
      hook.params.sequelize = {
        attributes: [ 'id', 'description' ]
      }
    }],
    get: [],
    create: [setCreatedAt()],
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
