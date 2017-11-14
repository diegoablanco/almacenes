const auth = require('feathers-authentication').hooks;
const Ajv = require('ajv')
const { setNow } = require('feathers-hooks-common')
const errorReducer = require('../../helpers/errorReducer')

module.exports = {
  before: {
    all: [
    ],
    find: [function(hook){
      hook.params.sequelize = {
        attributes: [ 'id', 'description', 'rate' ]
      }
    }],
    get: [],
    create: [setNow('createdAt')],
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
